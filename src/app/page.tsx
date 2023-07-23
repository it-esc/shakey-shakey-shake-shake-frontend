import Card from '@/components/Card';

export default function Home() {
  return (
    <main className="grid min-h-screen w-full grid-cols-2 gap-4 px-8 py-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} i={i} />
      ))}
    </main>
  );
}
