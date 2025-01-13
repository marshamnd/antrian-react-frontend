import React from "react";
import Sidebar from "../../components/Sidebar";

function DashboardPage() {
  const authors = [
    {
      name: "Adhis M.A",
      bio: "siapa aja.",
      email: "ashafaatadhis@gmail.com",
      avatar: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
      name: "Fadhli",
      bio: "Orang paling ganteng.",
      email: "fadhli@gmail.com",
      avatar: "https://www.w3schools.com/w3images/avatar5.png",
    },
    {
      name: "Ananta",
      bio: "Anak BEM idaman.",
      email: "ananta@gmail.com",
      avatar: "https://www.w3schools.com/w3images/avatar1.png",
    },
  ];
  return (
    <div className="flex-1 flex flex-col lg:pt-0 pt-10  min-h-screen ml-0 lg:ml-64 transition-all">
      <header className="  text-white p-4">
        <h1 className="text-xl">Welcome to Dashboard</h1>
      </header>
      <main className="flex-1 p-6">
        <h1 className=" font-bold mb-6">About the Authors</h1>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Biography</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Avatar</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 hover:text-slate-800"
              >
                <td className="px-4 py-2 text-start border-b">{author.name}</td>
                <td className="px-4 py-2 text-start border-b">{author.bio}</td>
                <td className="px-4 py-2 text-start border-b">
                  {author.email}
                </td>
                <td className="px-4 py-2 text-start border-b">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default DashboardPage;
