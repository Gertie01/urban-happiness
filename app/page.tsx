import ImageStudio from '../components/ImageStudio';

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Gemini 2.0 Image Studio
        </h1>
        <p className="text-neutral-400 mt-2">Endless creation & refinement powered by Flash-Exp</p>
      </header>
      <ImageStudio />
    </main>
  );
}
