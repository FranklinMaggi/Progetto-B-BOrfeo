import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Metodo non consentito" });
    }

    const { firstName, lastName, checkIn, checkOut, adults, children, message } = req.body || {};
    const totalGuests = req.body?.totalGuests ?? 1;

    const adminPhone = process.env.ADMIN_WHATSAPP;
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;

    console.log("WHATSAPP_TOKEN:", token);
    console.log("WHATSAPP_PHONE_ID:", phoneId);
    console.log("ADMIN_WHATSAPP:", adminPhone);

    if (!token || !phoneId || !adminPhone) {
      return res.status(500).json({
        error: "Variabili d'ambiente mancanti per WhatsApp",
      });
    }

    const text = `📩 Nuova richiesta da ${firstName || "Sconosciuto"} ${lastName || ""}:
📅 Check-in: ${checkIn || "-"}
📅 Check-out: ${checkOut || "-"}
👨‍👩‍👧‍👦 Ospiti: ${totalGuests} (Adulti: ${adults}, Bambini: ${children})
💬 Messaggio: ${message || "Nessun messaggio"}`;

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: adminPhone.replace("+", ""), // qui serve +, ma la proteggiamo
          type: "text",
          text: { body: text },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Errore WhatsApp API:", errorData);
      return res.status(500).json({ error: "Errore invio WhatsApp", details: errorData });
    }

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("❌ Errore generale:", err);
    res.status(500).json({ error: "Errore generale", details: err.message });
  }
}
