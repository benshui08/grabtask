export default function Home() {
  return (
    <section className="bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Simple Ways to Make Money Online
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Turn your spare time into earnings today. Play games, take surveys, and explore other easy ways to make money online with GrabTask.
        </p>
        <a
          href="/earn"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          Start Making Money Now
        </a>
      </div>
    </section>
  );
}