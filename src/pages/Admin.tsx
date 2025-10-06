import { useState } from "react";

export default function Admin() {
  const [reservations] = useState([
    { id: 1, name: "Mario Rossi", checkIn: "2025-10-10", checkOut: "2025-10-12", status: "Confermata" },
    { id: 2, name: "Giulia Bianchi", checkIn: "2025-10-15", checkOut: "2025-10-17", status: "In attesa" },
  ]);

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Pannello Amministratore</h2>
      <p className="text-center text-gray-600 mb-10">
        Gestisci le prenotazioni e controlla la disponibilità delle camere.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Ospite</th>
              <th className="border p-2">Check-in</th>
              <th className="border p-2">Check-out</th>
              <th className="border p-2">Stato</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td className="border p-2">{res.name}</td>
                <td className="border p-2 text-center">{res.checkIn}</td>
                <td className="border p-2 text-center">{res.checkOut}</td>
                <td className="border p-2 text-center">{res.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
