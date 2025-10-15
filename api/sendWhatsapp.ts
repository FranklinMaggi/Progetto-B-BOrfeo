console.log("WHATSAPP_TOKEN:", token.slice(0, 8), "...");
console.log("WHATSAPP_PHONE_ID:", phoneId);
console.log("ADMIN_WHATSAPP:", admin);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    const { firstName, lastName, email, adults, children, checkIn, checkOut, message } = req.body;

    // ✅ Dati da Meta Developer
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN!;
    const PHONE_ID = process.env.WHATSAPP_PHONE_ID!; // ottenuto da Meta Developer
    const ADMIN_NUMBER = process.env.ADMIN_WHATSAPP!; // il tuo numero (es. "393271234567")

    // 📦 Messaggio di prenotazione
    const text = `
📩 *Nuova prenotazione Orfeo Guest House!*
👤 ${firstName} ${lastName}
📧 ${email}
👪 Adulti: ${adults} - Bambini: ${children}
📅 Check-in: ${checkIn || 'N/D'} | Check-out: ${checkOut || 'N/D'}
💬 Messaggio: ${message || 'Nessun messaggio'}
    `.trim();

    // 🌍 Chiamata API WhatsApp Cloud
    const response = await fetch(`https://graph.facebook.com/v20.0/${PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: `+${ADMIN_NUMBER}`,
        type: 'text',
        text: { body: text },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Errore WhatsApp:', data);
      return res.status(500).json({ error: 'Errore invio WhatsApp', details: data });
    }

    console.log('✅ Messaggio WhatsApp inviato:', data);
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('❌ Errore generale:', err);
    res.status(500).json({ error: 'Errore durante l\'invio del messaggio', details: err });
  }
}
