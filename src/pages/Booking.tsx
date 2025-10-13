import { useState } from "react";
import emailjs from "emailjs-com";
import CalendarView from "../components/CalendarView";

type BookingData = {
  firstName: string;
  lastName: string;
  email: string;
  adults: number;
  children: number;
  checkIn: string;
  checkOut: string;
  message: string;
};

export default function Booking() {
  const [formData, setFormData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    email: "",
    adults: 1,
    children: 0,
    checkIn: "",
    checkOut: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const totalGuests = formData.adults + formData.children;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "adults" || name === "children" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSent(false);

    try {
      // 1️⃣ EmailJS - invia l'email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          ...formData,
          totalGuests,
          checkIn: formData.checkIn
            ? new Date(formData.checkIn).toLocaleDateString("it-IT")
            : "Non specificato",
          checkOut: formData.checkOut
            ? new Date(formData.checkOut).toLocaleDateString("it-IT")
            : "Non specificato",
          message: formData.message || "Nessun messaggio",
          year: new Date().getFullYear(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2️⃣ WhatsApp API via Vercel
      const response = await fetch("/api/sendWhatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          totalGuests,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Errore WhatsApp:", data);
      }

      // Reset form e conferma
      setSent(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        adults: 1,
        children: 0,
        checkIn: "",
        checkOut: "",
        message: "",
      });
    } catch (err) {
      console.error("Errore invio:", err);
      setError("Errore durante l'invio. Controlla la connessione e riprova.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Richiedi una prenotazione
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="Nome"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Cognome"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-md p-2 w-full"
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

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <label className="text-gray-600 text-sm">Adulti</label>
            <select
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Bambini</label>
            <select
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center">
            <label className="text-gray-600 text-sm">Totale</label>
            <span className="text-lg font-semibold text-gray-800">
              {totalGuests}
            </span>
          </div>
        </div>

        <textarea
          name="message"
          placeholder="Richieste particolari (opzionale)"
          value={formData.message}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
          rows={3}
        />

        <button
          type="submit"
          disabled={sending}
          className={`w-full py-2 rounded-md text-white font-medium transition ${
            sending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {sending ? "Invio in corso..." : "Invia richiesta"}
        </button>

        {sent && (
          <p className="text-green-600 text-center mt-3">
            ✅ Prenotazione inviata con successo! Ti contatteremo a breve.
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center mt-3">⚠️ {error}</p>
        )}
      </form>
    </section>
  );
}
