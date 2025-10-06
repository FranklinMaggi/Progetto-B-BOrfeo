import { Link } from "react-router-dom";

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
}

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      <img
        src={room.img}
        alt={room.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {room.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {room.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-blue-700">
            €{room.price}/notte
          </span>
          <Link
            to="/booking"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Prenota
          </Link>
        </div>
      </div>
    </div>
  );
}
