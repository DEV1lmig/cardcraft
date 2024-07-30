import MemoryGame from "@/components/MemoryGame";

export default function Animals() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-full justify-center items-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Animals</h1>
        <p className="text-lg text-gray-700">
         Bienvenido al juego de memoria de animales.
        </p>
        <MemoryGame cardType="animal" />
      </div>
    </div>
  );
}