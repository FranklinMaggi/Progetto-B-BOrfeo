import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { fetchBookingsFromICS } from "../services/icalService";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({
  onDateChange,
}: {
  onDateChange?: (dateRange: [Date, Date]) => void;
}) {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [value, setValue] = useState<[Date, Date] | Date>(new Date());

  useEffect(() => {
    const load = async () => {
      const urls = [
        "https://admin.booking.com/hotel/12345.ics", // booking
        "https://www.airbnb.com/calendar/ical/6789.ics", // airbnb
      ];
      const allBookings = (
        await Promise.all(urls.map((url) => fetchBookingsFromICS(url)))
      ).flat();

      // Crea array di giorni occupati
      const days: Date[] = [];
      allBookings.forEach(({ start, end }) => {
        const curr = dayjs(start);
        const last = dayjs(end);
        for (let d = curr; d.isBefore(last, "day"); d = d.add(1, "day")) {
          days.push(d.toDate());
        }
      });

      setBookedDates(days);
    };

    load();
  }, []);

  const isBooked = (date: Date) =>
    bookedDates.some(
      (b) => dayjs(b).isSame(dayjs(date), "day")
    );

  return (
    <div className="flex flex-col items-center space-y-4">
      <Calendar
        onChange={(v) => {
          setValue(v as [Date, Date]);
          if (onDateChange) onDateChange(v as [Date, Date]);
        }}
        value={value}
        selectRange={true}
        tileDisabled={({ date }) => isBooked(date)}
        tileClassName={({ date }) =>
          isBooked(date)
            ? "bg-red-300 text-gray-600 line-through rounded-md"
            : ""
        }
      />
      <p className="text-sm text-gray-600">
        Le date in <span className="text-red-500 font-semibold">rosso</span> sono occupate
      </p>
    </div>
  );
}
