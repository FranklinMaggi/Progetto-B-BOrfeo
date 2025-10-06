export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
  
    const { firstName, lastName, email, checkIn, checkOut, adults, children, totalGuests, message } = req.body;
  
    const accessToken = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_ID;
  
    const text = `
  📩 Nuova prenotazione da ${firstName} ${lastName}
  👥 ${adults} adulti, ${children} bambini (totale ${totalGuests})
  🗓️ Check-in: ${checkIn}
  🗓️ Check-out: ${checkOut}
  💬 ${message || "Nessun messaggio"}
  📧 ${email}
  `;
  
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "393801888965", // tuo numero WhatsApp con prefisso
          type: "text",
          text: { body: text },
        }),
      }
    );
  
    const data = await response.json();
    res.status(200).json({ ok: true, data });
  }
  