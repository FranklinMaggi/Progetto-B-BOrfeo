export default function Footer() {
  return (
    <footer className="bg-primary text-gray-200 py-10">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 px-4">
        <div>
          <h3 className="font-serif text-lg text-white mb-3">Orfeo Guest House</h3>
          <p>
            Via Caposcardicchio, 103 Piano Terra
            <br />
            Bari, Italia
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg text-white mb-3">Contatti</h3>
          <p>
            📞{" "}
            <a
              href="tel:+393273318400"
              className="hover:text-accent underline-offset-2 hover:underline"
            >
              +39 327 3318400
            </a>
          </p>
          <p>
            💬{" "}
            <a
              href="https://api.whatsapp.com/send?phone=393273318400&text=Ciao%20Orfeo%20Guest%20House!%20Vorrei%20informazioni."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent underline-offset-2 hover:underline"
            >
              WhatsApp
            </a>
          </p>
          <p>
            ✉️{" "}
            <a
              href="mailto:info@webonday.it"
              className="hover:text-accent underline-offset-2 hover:underline"
            >
              info@webonday.it
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg text-white mb-3">Seguici</h3>
          <p className="space-x-4">
            <a href="#" className="hover:text-accent">Instagram</a>
            <a href="#" className="hover:text-accent">Facebook</a>
          </p>
        </div>
      </div>

      <p className="text-center text-sm mt-10 text-gray-400">
        © {new Date().getFullYear()} Orfeo Guest House — Tutti i diritti riservati
      </p>
    </footer>
  );
}
