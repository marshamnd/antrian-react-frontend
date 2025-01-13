import React from "react";

// Warna berdasarkan poliklinik
const polyclinicColors = {
  anak: "bg-blue-100 border-blue-500",
  mata: "bg-pink-100 border-pink-500",
  umum: "bg-green-100 border-green-500",
  gigi: "bg-yellow-100 border-yellow-500",
};

function QueueCard({ queue, onTakeQueue }) {
  const colorClass =
    polyclinicColors[queue.value] || "bg-gray-100 border-gray-500"; // Default warna jika poliklinik tidak dikenal

  return (
    <div
      className={`border p-6 rounded-xl cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ${colorClass}`}
      onClick={() => onTakeQueue(queue)}
    >
      <h2 className="text-xl font-bold text-gray-700">{queue.name}</h2>
    </div>
  );
}

export default QueueCard;
