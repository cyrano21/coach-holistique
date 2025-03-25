declare module '@/data/needs.json' {
  interface NeedPoint {
    name: string
    image: string
    phrase: string
    audio: string
  }

  interface Need {
    id: string
    title: string
    points: NeedPoint[]
  }

  const needs: Need[]
  export default needs
}