"use client";

import { useEffect, useRef, useState } from "react";
import Star from "../star";

export default function Testimonials() {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  const testimonials = useRef([
    {
      text: "Sehr empfehlenswert. Arbeitet sauber und ordentlich. Mein Wunschmotiv wurde mit ihm zusammen erarbeitet und ist dadurch einfach perfekt geworden. Ich komme wieder",
      author: "Waldemar M.",
      value: 5,
    },
    {
      text: "Jederzeit wieder! Freundlich, super sauber, professionell - bin rundum zufrieden mit meinem kleinen, aber feinen Tattoo.",
      author: "Ursula S.",
      value: 5,
    },
    {
      text: "Einfach Top von A bis Z ... super Beratung, sauber, freundlich und Mega Arbeit. Ich komme wieder 👍",
      author: "Christoph S.",
      value: 5,
    },
  ]).current;

  useEffect(() => {
    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map(
        (_: JSX.Element, idx: number) => {
          return <Star isFilled={idx < currentRating} key={idx} />;
        }
      );
      setRatingArray(updatedArray);
    };

    constructRating(5);
  }, []);

  return (
    <section
      id="testimonials"
      className="show-onscroll h-full w-screen h-full bg-[url('/testimonials/testimonials_1024.jpg')] bg-cover bg-fixed bg-no-repeat z-10 text-white"
    >
      <div className="py-8 px-4 lg:px-8 bg-red-700/50 h-full w-full">
        <div className="container mx-auto">
          <h2 className="text-xl text-center underline underline-offset-4 mb-8 font-semibold">
            Kundenbewertungen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            {testimonials.map((testimonial: any) => {
              return (
                <div key={testimonial.author}>
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.author}</h3>

                    <div className="flex py-2">
                    {ratingArray.map((r: JSX.Element, idx) => (
                      <span key={idx}>{r}</span>
                    ))}
                    </div>
                    <p className="text-normal">{testimonial.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
