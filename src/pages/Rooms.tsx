import RoomCard from "../components/RoomCard";

export default function Rooms() {
  const rooms = [
    {
      id: 1,
      name: "Camera Luna",
      description: "Ampia e luminosa, perfetta per due persone.",
      price: 85,
      img: "https://placehold.co/400x250?text=Camera+Luna",
    },
    {
      id: 2,
      name: "Camera Sole",
      description: "Vista panoramica e comfort totale.",
      price: 95,
      img: "https://placehold.co/400x250?text=Camera+Sole",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center">Le nostre camere</h2>
      <div className="grid sm:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}
