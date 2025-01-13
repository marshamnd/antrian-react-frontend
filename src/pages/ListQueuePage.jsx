import React, { useEffect, useState } from "react";
import api from "../services/api";

import ListQueueCard from "../components/ListQueueCard";

function ListQueuePage() {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await api.get("/queues");

        const data = response.data.data.filter((v) => v.status !== "completed");
        setQueues(data);
      } catch (error) {
        console.error("Error fetching queues:", error);
      }
    };

    fetchQueues(); // Initial fetch when component mounts

    const interval = setInterval(() => {
      fetchQueues(); // Fetch data every 1 second
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, []);

  return (
    <div className="max-w-xl  mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List Antrian</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Element pertama akan menempati seluruh row */}
        {queues.length > 0 ? (
          <>
            <div className="col-span-4">
              <ListQueueCard key={queues[0]?.id} queue={queues[0]} />
            </div>

            <div className="grid grid-cols-3 col-span-4 gap-4">
              {queues.slice(1).map((queue) => (
                <ListQueueCard key={queue.id} queue={queue} />
              ))}
            </div>
          </>
        ) : (
          <div className="col-span-4 text-center">
            <h2 className="text-xl font-bold text-white">Antrian Kosong</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListQueuePage;
