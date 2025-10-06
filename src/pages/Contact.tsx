export default function Contact() {
  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-primary">
        Contattaci
      </h2>

      <p className="text-center text-gray-600 mb-10">
        Per qualsiasi informazione o richiesta di prenotazione, siamo sempre disponibili.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* --- INFO --- */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">📍 Indirizzo</h3>
            <p className="text-gray-600">
              Via Caposcardicchio, 103<br />
              70132 Bari, Italia
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">📞 Telefono / WhatsApp</h3>
            <p className="text-gray-600">
              <a
                href="https://api.whatsapp.com/send?phone=393273318400&text=Ciao%20Orfeo%20Guest%20House!%20Vorrei%20informazioni%20su%20una%20prenotazione."
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                +39 327 3318400
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">✉️ Email</h3>
            <p className="text-gray-600">
              <a
                href="mailto:info@orfeoguesthouse.it"
                className="text-blue-600 hover:underline"
              >
                info@orfeoguesthouse.it
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">🕒 Orari</h3>
            <p className="text-gray-600">
              Check-in: 14:00 – 22:00<br />
              Check-out: entro le 10:00
            </p>
          </div>
        </div>

        {/* --- MAPPA --- */}
        <div className="w-full h-80 rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Orfeo Guest House - Mappa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234.5678901234567!2d16.8555!3d41.1180!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347fdf34c8b6e4f%3A0xabcdef123456789!2sVia%20Caposcardicchio%2C%20103%2C%2070132%20Bari%20BA!5e0!3m2!1sit!2sit!4v1695900000000!5m2!1sit!2sit"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
