import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const reviews = [
  {
    name: 'H Doan',
    date: 'April 10, 2025',
    image: `${process.env.PUBLIC_URL}/hdoan-review.png`,
    text: 'I had a great experience with Lock It Lending for my mortgage. From start to finish, they took excellent care of the entire process. I worked with Lyn and Oliver, and both were amazing. Lyn helped me find the best rate, gave me daily updates on interest rates and closing costs, and even helped with price matching to make sure I got the best possible deal. Oliver guided me through all the paperwork and patiently answered every question I had. What impressed me most was that his support didn’t stop at closing—he continued to help afterward. There was an issue with the title company that had been pending for almost a month after closing. Oliver stepped in, coordinated with everyone involved, and followed through until it was resolved. That level of care and responsibility meant a lot to me. What really stood out was their outstanding customer service and responsiveness. Whether by phone or email, they always replied quickly and clearly explained everything I needed to know. I would definitely recommend Lock It Lending to my friends and family, and I’ll absolutely return to them the next time I buy a home or refinance. With their professionalism, dedication, and heart, I believe they’ll continue to grow and succeed.',
  },
  {
    name: 'Tracy Le',
    date: 'April 4, 2025',
    image: `${process.env.PUBLIC_URL}/tracy-review.png`,
    text: 'I’m so grateful to the amazing team at Lock It Lending for helping me secure a loan for my new home! A special thank you to Lyn, Vivi, and Tina—you three were with me every step of the way and made this entire journey so much smoother than I ever imagined. From helping me fix my credit score to getting me approved by the lender, you guided me through every back-and-forth with patience, professionalism, and care. The whole process went smoothly and right on time. The team was incredibly responsive, always answering my questions no matter how small, and making sure I fully understood everything. I truly felt supported throughout the entire experience. I couldn’t have asked for a better lending team—thank you Lock It Lending for making my dream of owning a home come true!',
  },
  {
    name: 'Sandro Arrua',
    date: 'April 8, 2025',
    image: `${process.env.PUBLIC_URL}/sandro-review.png`,
    text: 'Buying our first home was an incredible experience, thanks to the team at Lock It Lending. From the outset, they guided us through every step, making the entire process smoother than we had anticipated. They were always available to answer our questions, providing clear and honest information. With our rental lease nearing its end, we were on a tight schedule to close the deal, but they ensured everything was completed on time. A special thanks to Melissa, Philips, and Matt for their unwavering support. We wholeheartedly recommend Lock It Lending and their fantastic team. Thank you so much!​',
  },
  {
    name: 'Sarah Michie',
    date: 'March 19, 2025',
    image: `${process.env.PUBLIC_URL}/thi-review.png`,
    text: 'The team made the mortgage process incredibly smooth and stress-free! Alex, the processor, kept everything organized and on track, while Henry, the loan officer, was knowledgeable and always available to answer questions. They made the entire experience seamless from start to finish. Highly recommend!',
  },
  {
    name: 'Brianna Nguyen',
    date: 'February 13, 2025',
    image: `${process.env.PUBLIC_URL}/brianna-review.png`,
    text: 'We had an outstanding experience with Lock It Lending! From start to finish, the process was seamless, and we truly appreciate the professionalism and dedication of everyone involved. A special thanks to Kaden, Emily, and Philip for going above and beyond to make this happen—they ensured everything was smooth and stress-free. The beautiful flowers on closing day were such a thoughtful touch and meant so much to us. We are incredibly grateful for their support and highly recommend Lock It Lending to anyone looking for a top-notch mortgage experience!',
  },
];

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
