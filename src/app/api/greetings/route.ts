export type Greeting = {
  id: number
  text: string
}

export async function GET() {
  return Response.json(
      [
          { id: 1, text: "Hello" },
          { id: 2, text: "Hallo" },
          { id: 3, text: "Hola" },
          { id: 4, text: "Ciao" },
          { id: 5, text: "こんにちは" }
      ]
  )
}
