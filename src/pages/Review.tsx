import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const reviews = [
  {
    name: 'Bill',
    date: 'May 11, 2024',
    text: `I’d like to thank Ann and Ella who have been involved in the process of getting me into my new home. This has been a seamless, pleasant and positive experience which I attribute to the very professional team.`,
  },
  {
    name: 'Thi',
    date: 'April 19, 2024',
    text: `My husband and I are first time home buyers and we had the pleasure of working with Tiana, Lyn and Oliver. They are very professional, attentive and knowledgeable...`,
  },
  {
    name: 'Kelly',
    date: 'March 4, 2024',
    text: `The whole process was smooth and fast. Lock It Lending made my refinance experience incredibly easy and stress-free.`,
  },
];

export default function Reviews() {
  return (
    <div className="font-sans">
      <Header />
      <main>
        <HeroSection
          title="Voices of Satisfaction:"
          highlight="Comprehensive Customer Reviews"
          description="Real Reviews from Real Customers: Hear What Our Clients Are Saying About Lock It Lending."

          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Reviews.png`}
        />

        <section className="bg-white py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-2xl">⭐⭐⭐⭐⭐</span>
              <span className="text-lg font-bold text-gray-800">911 Google Reviews</span>
            </div>
            <p className="text-gray-600 font-medium mb-8">
              We’re proud to have earned the trust of hundreds of homeowners. Here's what a few had to say:
            </p>

            <div className="grid gap-6">
              {reviews.map((review) => (
                <div
                  key={review.name + review.date}
                  className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm text-left"
                >
                  <div className="mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-6 h-6 text-gold mb-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.17 6.998c-1.13 0-2.17.57-2.94 1.48A4.932 4.932 0 0 0 3 11.498c0 1.36.54 2.6 1.23 3.52.68.91 1.81 1.48 2.94 1.48.72 0 1.38-.22 1.92-.59l.05-.05c-.38-.39-.7-.85-.94-1.34-.28-.56-.45-1.18-.45-1.86 0-1.62.89-3.06 2.23-3.92-.62-.56-1.44-.89-2.61-.89Zm9.66 0c-1.13 0-2.17.57-2.94 1.48a4.932 4.932 0 0 0-1.23 3.02c0 1.36.54 2.6 1.23 3.52.68.91 1.81 1.48 2.94 1.48.72 0 1.38-.22 1.92-.59l.05-.05c-.38-.39-.7-.85-.94-1.34-.28-.56-.45-1.18-.45-1.86 0-1.62.89-3.06 2.23-3.92-.62-.56-1.44-.89-2.61-.89Z" />
                    </svg>
                    <p className="text-gray-800 font-medium">{review.text}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="font-bold text-gold">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://www.google.com/search?q=lock+it+lending+houston#lrd=0x8640c35d2a7a4eab:0xb5736063dbda6db6,1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-semibold hover:underline mt-10 inline-block"
            >
              SEE ALL REVIEWS →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
