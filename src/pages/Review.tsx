import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { getShuffledReviews } from '../data/reviewData';

const now = new Date();
const seed = Math.floor(now.getTime() / (1000 * 60 * 60 * 6));
const reviews = getShuffledReviews(seed, 5);

export default function Reviews() {
  return (
    <div className="font-sans bg-[#f7f9fb]">
      <Header />
      <main>
        <HeroSection
          title="Voices of Satisfaction:"
          highlight="Comprehensive Customer Reviews"
          highlightColor="gold"
          description="Real Reviews from Real Customers: Hear What Our Clients Are Saying About Lock It Lending."
          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Reviews.png`}
        />

        <section className="max-w-[1500px] mx-auto px-8 py-20 grid sm:grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="relative w-full max-w-[720px] bg-white rounded-3xl p-10 pb-28 shadow-xl"
            >
              <div className="absolute bottom-[-10px] left-10 w-0 h-0 border-t-[20px] border-t-white border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent" />
              <div className="text-gold text-4xl mb-4">❝</div>
              <p className="text-gray-700 leading-relaxed text-xl mb-10">{review.text}</p>
              <div className="flex items-center gap-6 absolute bottom-[-100px] left-10">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gold"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900 text-xl">{review.name}</p>
                  <p className="text-base text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="text-center pb-16 mt-20">
          <Link
            to="https://www.google.com/search?q=lock+it+lending+houston#lrd=0x8640c35d2a7a4eab:0xb5736063dbda6db6,1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-bold text-lg hover:underline"
          >
            SEE ALL REVIEWS ➤
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
