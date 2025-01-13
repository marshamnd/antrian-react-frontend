import React, { useState } from "react";
import api from "../services/api";
import QueueCard from "../components/QueueCard";
import Swal from "sweetalert2";
import useTrigger from "../hooks/useTrigger";

const queues = [
  { id: 1, name: "Poliklinik Anak", value: "anak" },
  { id: 2, name: "Poliklinik Gigi", value: "gigi" },
  { id: 3, name: "Poliklinik Umum", value: "umum" },
  { id: 4, name: "Poliklinik Mata", value: "mata" },
];

function TakeQueuePage() {
  const [selectedQueue, setSelectedQueue] = useState(null);
  const [queueNumber, setQueueNumber] = useState(null);
  const { setTrigger } = useTrigger();
  const handleTakeQueue = async (queue) => {
    setSelectedQueue(queue);

    try {
      Swal.showLoading();

      const response = await api.post("/queues", {
        polyclinic: queue.value,
      });

      Swal.close();
      console.log(response);
      setQueueNumber(response.data.data.queue_number);
      setTrigger((prev) => prev + 1);
      Swal.fire({
        title: "Success!",
        text: `You have taken a queue for ${queue.name}. Your queue number is ${response.data.data.queue_number}.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.close();

      Swal.fire({
        title: "Failed!",
        text:
          error.response?.data?.message ||
          "Failed to take a queue. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-xl  mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Ambil Antrian</h1>
      <div className="grid grid-cols-2 gap-4">
        {queues.map((queue) => (
          <QueueCard
            key={queue.id}
            queue={queue}
            onTakeQueue={handleTakeQueue}
          />
        ))}
      </div>
      {queueNumber && (
        <p className="mt-4 text-white">Nomor Antrian Anda: {queueNumber}</p>
      )}
    </div>
  );
}

export default TakeQueuePage;
