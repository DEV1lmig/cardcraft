import { Link } from "next-view-transitions"

export const metadata = {
  title: 'CartCraft - Collectible Card Game',
  description: 'Join CartCraft, the ultimate collectible card game experience!'
}

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold text-blue-700">
            Welcome to <span className="text-green-500">CartCraft</span>
          </h1>
          <p className="mt-3 text-2xl">
            The ultimate collectible card game experience
          </p>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div className="p-6 mt-6 text-left border w-96 rounded-xl bg-gray-900 shadow-lg">
              <h3 className="text-2xl font-bold">Discover New Cards &rarr;</h3>
              <p className="mt-4 text-xl">
                Explore and collect a variety of unique and powerful cards.
              </p>
            </div>

            <div className="p-6 mt-6 text-left border w-96 rounded-xl bg-gray-900 shadow-lg">
              <h3 className="text-2xl font-bold">Build Your Deck &rarr;</h3>
              <p className="mt-4 text-xl">
                Customize your deck to create unbeatable strategies.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/register" className="px-8 py-4 bg-blue-600 text-white text-2xl font-bold rounded-full hover:bg-blue-700 transition duration-300">
              Register Now
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
