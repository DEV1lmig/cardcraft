"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hub() {
  const router = useRouter();

  const staticData = [
    {
      title: "Memory Game de Animales",
      description: "Memory game de animales bien divertido.",
      image: "/images/animal1.webp",
      link: "/games/animals", // Add the link for redirection
    },
    {
      title: "Memory Game de Carros",
      description: "Memory game de carros bien divertido.",
      image: "/images/carro1.webp",
      link: "/games/cars", // Add the link for redirection
    },
    // Add more static data as needed
  ];

  const handleRedirect = (link) => {
    router.push(link);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-6">
        <div className="flex flex-col items-center justify-center w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
            Bienvenido al <span className="text-green-500">Hub</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {staticData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-2xl font-bold text-blue-700 mt-4">{item.title}</h2>
                <p className="text-gray-700 mt-2">{item.description}</p>
                <button
                  onClick={() => handleRedirect(item.link)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Ir a {item.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

