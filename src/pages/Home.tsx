import { Link } from "react-router-dom";
import heroImg from "../assets/camera1.jpg";
export default function Home() {
  return (
    <>
  <section
  className="relative bg-cover bg-center text-white"
  style={{ backgroundImage: `url(${heroImg})` }}
>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center py-40 px-6">
          <h1 className="text-5xl font-serif mb-4">Orfeo Guest House</h1>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Comfort moderno e accoglienza mediterranea nel cuore di Bari.
          </p>
          <Link
            to="/booking"
            className="bg-accent text-white px-6 py-3 rounded-md hover:bg-orange-500 transition font-medium"
          >
            Prenota Ora
          </Link>
        </div>
      </section>

      <section className="bg-background py-16">
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
          Servizi in evidenza
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          {[
            "Wi-Fi gratuito",
            "Aria condizionata",
            "Parcheggio privato",
            "Animali ammessi",
            "Cassaforte",
            "Check-in contactless",
            "Colazione inclusa",
            "Lavanderia",
          ].map((s) => (
            <div
              key={s}
              className="p-4 rounded-lg bg-white shadow hover:shadow-md transition text-gray-700"
            >
              {s}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
