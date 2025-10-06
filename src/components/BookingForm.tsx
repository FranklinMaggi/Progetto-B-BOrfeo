import { useState } from "react";
import emailjs from "emailjs-com";
import CalendarView from "./CalendarView";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    adults: 1,
    children: 0,
    checkIn: "",
    checkOut: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const totalGuests = formData.adults + formData.children;
    const templateParams = { ...formData, totalGuests };

    try {
      // 1️⃣ Invia la mail con EmailJS
      await emailjs.send(
        "service_fu3nzgf", // <-- Service ID
        "template_33c1pje", // <-- Template ID
        templateParams,
        "YOUR_PUBLIC_KEY" // <-- Public key
      );

      // 2️⃣ Invia il messaggio WhatsApp via API Vercel
      await fetch("/api/sendWhatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          totalGuests,
        }),
      });

      alert("Prenotazione inviata con successo!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        adults: 1,
        children: 0,
        checkIn: "",
        checkOut: "",
      });
    } catch (err) {
      console.error(err);
      alert("Errore durante l'invio della prenotazione.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="Nome"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
          className="border p-2 rounded-md"
        />
        <input
          name="lastName"
          placeholder="Cognome"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
          className="border p-2 rounded-md"
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        required
        className="border p-2 rounded-md w-full"
      />

      <CalendarView
        onDateChange={([start, end]) =>
          setFormData({
            ...formData,
            checkIn: start.toISOString().split("T")[0],
            checkOut: end.toISOString().split("T")[0],
          })
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          min={1}
          name="adults"
          placeholder="Adulti"
          value={formData.adults}
          onChange={(e) =>
            setFormData({ ...formData, adults: +e.target.value })
          }
          className="border p-2 rounded-md"
        />
        <input
          type="number"
          min={0}
          name="children"
          placeholder="Bambini"
          value={formData.children}
          onChange={(e) =>
            setFormData({ ...formData, children: +e.target.value })
          }
          className="border p-2 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition w-full"
      >
        Invia prenotazione
      </button>
    </form>
  );
}
