import { BookPageParams } from "@/types/pages.types"

export default function BookPage({ params }: BookPageParams) {
  console.log(`fetching ${params.id}`)

  return <div>Book: {params.id}</div>
}