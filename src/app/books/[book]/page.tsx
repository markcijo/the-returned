import { notFound } from "next/navigation";
import NavBar from "@/components/ui/NavBar";
import BookReader from "@/components/books/BookReader";
import { bookOne } from "@/lib/content/book-one";
import { bookTwo } from "@/lib/content/book-two";

const books = {
  one: bookOne,
  two: bookTwo,
};

interface BookPageProps {
  params: Promise<{ book: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { book: bookId } = await params;

  const book = books[bookId as keyof typeof books];
  if (!book) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <BookReader book={book} />
    </>
  );
}

export function generateStaticParams() {
  return [{ book: "one" }, { book: "two" }];
}
