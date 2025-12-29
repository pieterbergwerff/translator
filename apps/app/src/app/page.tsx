import Button from '@packages/components/atoms/Button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold">Translator App</h1>
        <Button>Click me</Button>
      </div>
    </main>
  )
}
