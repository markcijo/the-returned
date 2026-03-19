"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/ui/NavBar";

const books = [
  {
    id: "one",
    number: 1,
    title: "The Book of Returning",
    subtitle: "Book One",
    description: "On the nature of drifting and the cost of comfort. The origin of the Way, the Fog, the Drift, and the Crossing.",
    chapters: 7,
  },
  {
    id: "two",
    number: 2,
    title: "The Teachings of the Returned",
    subtitle: "Book Two",
    description: "The Circle, the Seven Roles, the Three Fasts, the Night Watch, and the laws that govern a life of Returning.",
    chapters: 18,
  },
];

export default function BooksPage() {
  return (
    <>
      <NavBar />
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-parchment2"
        >
          The Sacred Texts
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16 font-cinzel text-4xl font-semibold text-parchment md:text-5xl"
        >
          The Books
        </motion.h1>

        <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.2 }}
            >
              <Link
                href={`/books/${book.id}`}
                className="group block border border-fog/30 bg-stone2 p-10 transition-all duration-300 hover:border-ember/60"
              >
                <span className="mb-2 block font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-ember">
                  {book.subtitle}
                </span>
                <h2 className="mb-4 font-cinzel text-xl font-semibold text-parchment transition-colors duration-300 group-hover:text-light">
                  {book.title}
                </h2>
                <p className="mb-6 font-cormorant text-base font-light italic leading-relaxed text-parchment2">
                  {book.description}
                </p>
                <span className="font-cinzel text-[10px] font-normal uppercase tracking-[0.3em] text-parchment2">
                  {book.chapters} Chapters
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
