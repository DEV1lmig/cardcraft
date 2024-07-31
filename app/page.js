import { Link } from "next-view-transitions"

export const metadata = {
  title: 'CardCraft - Memory card games',
  description: 'Unete a CardCraft'
}

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold text-blue-700">
            Bienvenido a <span className="text-green-500">CardCraft</span>
          </h1>
          <p className="mt-3 text-2xl">
            El juego de memoria mas divertido de todos
          </p>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div className="p-6 mt-6 text-left border w-96 rounded-xl bg-gray-900 shadow-lg">
              <h3 className="text-2xl font-bold">Descubre lo que tenemos para ofrecerte &rarr;</h3>
              <p className="mt-4 text-xl">
                Explora las cartas de nuestro divertido juego de memoria
              </p>
            </div>

          </div>

          <div className=" flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <Link href="/register" className="px-8 py-4 bg-blue-600 text-white text-2xl font-bold rounded-full hover:bg-blue-700 transition duration-300">
              Registrate ahora
            </Link>
            <Link href="/login" className="px-8 py-4 bg-blue-600 text-white text-2xl font-bold rounded-full hover:bg-blue-700 transition duration-300">
              Iniciar Sesión
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
