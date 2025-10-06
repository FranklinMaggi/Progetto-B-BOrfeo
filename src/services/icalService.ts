import IcalExpander from "ical-expander";

export async function fetchBookingsFromICS(url: string) {
  const res = await fetch(url);
  const icsData = await res.text();

  const icalExpander = new IcalExpander({
    ics: icsData,
    maxIterations: 100,
  });

  const events = icalExpander.between(
    new Date("2025-01-01"),
    new Date("2026-12-31")
  );

  return events.events.map((event) => ({
    start: event.startDate.toJSDate(),
    end: event.endDate.toJSDate(),
    title: event.summary,
  }));
}
