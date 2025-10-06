export default function Footer() {
    return (
        <footer className="bg-primary text-gray-200 py-10">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 px-4">
          <div>
            <h3 className="font-serif text-lg text-white mb-3">Orfeo Guest House</h3>
            <p>Via Caposcardicchio, 103 Piano Terra<br />Bari, Italia</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-white mb-3">Contatti</h3>
            <p>📞 +39 333 1234567</p>
            <p>✉️ info@orfeoguesthouse.it</p>
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
  