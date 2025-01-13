import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import useTrigger from "../../hooks/useTrigger";

function PanggilAntrianPage() {
  const [antrian, setAntrian] = useState([]);
  const { trigger, setTrigger } = useTrigger();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const speak = (queue_number) => {
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find((voice) => voice.lang === "id-ID");

    if (indonesianVoice) {
      let text = `Antrian untuk nomor ${queue_number}, harap ke loket`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = indonesianVoice;
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    } else {
      let text = `Queue number ${queue_number}, please proceed to the counter`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = indonesianVoice;
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }

    // Menyuarakan teks
  };

  const handlerCall = async (id, text) => {
    try {
      await api.put(
        `/queues/${id}`,
        { status: "called" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLoading(false);
      setTrigger((prev) => prev + 1);

      speak(text);
      Swal.fire({
        title: "Success!",
        text: "Berhasil Memanggil.",
        icon: "success",
        confirmButtonText: "Proceed",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      Swal.fire({
        title: "Failed!",

        text: error.response?.data?.message || "Gagal Memanggil.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  const handlerDone = async (id) => {
    try {
      await api.put(
        `/queues/${id}`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLoading(false);
      setTrigger((prev) => prev + 1);

      Swal.fire({
        title: "Success!",
        text: "Berhasil Selesai.",
        icon: "success",
        confirmButtonText: "Proceed",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      Swal.fire({
        title: "Failed!",

        text: error.response?.data?.message || "Gagal Selesai.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // // Ambil data antrian dari backend
  // useEffect(() => {
  //   const fetchAntrian = async () => {
  //     try {
  //       const response = await api.get("/queues");
  //       setAntrian(response.data.data); // Sesuaikan dengan struktur data dari backend
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAntrian();
  // }, [trigger]);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await api.get("/queues");
        const data = response.data.data.filter((v) => v.status !== "completed");

        setAntrian(data);
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
    <div className="flex-1 flex flex-col lg:pt-0 pt-10 min-h-screen ml-0 lg:ml-64 transition-all">
      <header className="text-white p-4">
        <h1 className="text-xl">Welcome to Dashboard</h1>
      </header>
      <main className="flex-1 p-6">
        <h1 className="font-bold mb-6">Daftar Antrian</h1>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Poliklinik</th>
              <th className="px-4 py-2 border-b text-left">Nomor Antrian</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {antrian &&
              antrian.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-start border-b">
                    {item.polyclinic}
                  </td>
                  <td className="px-4 py-2 text-start border-b">
                    {item.queue_number}
                  </td>
                  <td className="px-4 py-2 text-start border-b">
                    {item.status}
                  </td>
                  <td className="px-4 py-2 text-start border-b">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          handlerCall(item.id, item.queue_number);
                        }}
                        disabled={item.status === "called"}
                        className={`bg-green-500 p-2 rounded-md ${
                          item.status === "called"
                            ? "opacity-80"
                            : "hover:opacity-90"
                        }`}
                      >
                        Panggil
                      </button>
                      <button
                        onClick={() => {
                          speak(item.queue_number);
                        }}
                        disabled={item.status !== "called"}
                        className={`bg-orange-500 p-2 rounded-md ${
                          item.status !== "called"
                            ? "opacity-80"
                            : "hover:opacity-90"
                        }`}
                      >
                        Panggil Ulang
                      </button>
                      <button
                        onClick={() => {
                          handlerDone(item.id);
                        }}
                        disabled={
                          item.status === "waiting" ||
                          item.status === "completed"
                        }
                        className={`bg-red-500 p-2 rounded-md ${
                          item.status === "waiting" ||
                          item.status === "completed"
                            ? "opacity-80"
                            : "hover:opacity-90"
                        }`}
                      >
                        Selesai
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default PanggilAntrianPage;
