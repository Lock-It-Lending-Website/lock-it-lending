import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const allReviews = [
  {
    name: "D Hayden",
    date: "21st April 2025",
    image: "/default-avatar.png",
    text: "Absolutely Fantastic!!! • Rate, •Service, •Professionalism •Perseverance. I cannot sing the praises of Lock It Lending enough, especially of Luke Robers and Ayesha Khan! I had six mortgage lenders pitching for my business, and I let all of them compete with one another, until Lock It Lending was the last man standing. Their competitors just could not match their offer (and not for the want of trying)! Luke, the young, gentle giant, was with me for 6 whole months, through offers, rejections, more offers, acceptance - followed by hiccups, all the way to the very end, He always made himself available, be it to answer questions or revise his offer based on the market. He was there even after passing the baton on to the very capable and charming Ayesh - who does not take 'no' for an answer, and gets the job done! I HIGHLY, HIGHLY RECOMMEND them!!!"
  },
  {
    name: "Malcolm Gaines",
    date: "2nd May 2025",
    image: "/default-avatar.png",
    text: "Words can't explain how hard they work to get me in my home when no one else could do it they did they deserve a 10"
  },
  {
    name: "MAURICIO VALDES",
    date: "28th April 2025",
    image: "/default-avatar.png",
    text: "Although I represented the seller in this transaction, I was extremely impressed with the buyer's lender. They were efficient, responsive, and kept the process moving smoothly from start to finish. Communication was clear and timely, which made for a stress-free experience on all sides. It's always a pleasure to work with professionals who understand the importance of teamwork in a successful closing. Highly recommend!"
  },
  {
    name: "Ana Rodriguez",
    date: "15th April 2025",
    image: "/default-avatar.png",
    text: "Working with Lock-it Lending was an absolute pleasure! From start to finish, the entire team Kent & Ayesha was incredibly helpful, kind, and professional. They made what could have been a stressful process feel smooth and easy. What really stood out to me was how communicative they were—always quick to respond, super informative, and happy to answer any questions I had along the way. I never felt out of the loop, and they went above and beyond to make sure I understood every step. If you're looking for a lending company that truly cares about its clients and delivers top-notch service, I highly recommend Lock-it Lending."
  },
  {
    name: "Amy Dolma",
    date: "29th April 2025",
    image: "/default-avatar.png",
    text: "Kevin did an extraordinary job guiding me through the loan process! He patiently broke down the calculations, answered all of my questions, and used his expertise to secure the best possible rate. I felt confident and supported every step of the way. A big thank you as well to Philip for his support as part of the team. I highly recommend Kevin if you're looking for a knowledgeable and dedicated loan officer who truly goes above and beyond!"
  },
  {
    name: "Megan lemons",
    date: "30th April 2025",
    image: "/default-avatar.png",
    text: "Ayesha was my loan processor and I was beyond impressed and pleased with her work. She made me feel calm and comfortable through this whole process. I truly don't know how I would have gone through this without her! She worked so hard for us and never left us hanging. Even during a stressful situation of buying a house Ayesha made it stress-free for us! Thank you so much Lock it Lending!"
  },
  {
    name: "Yensi Gutiérrez",
    date: "5th May 2025",
    image: "/default-avatar.png",
    text: "Nuestra experiencia con Lock It Lending fue maravillosa gracias a su profesionalismo y dedicación todo fluyó de una manera increíble. Mi familia y yo nos sentimos muy felices de haber compartido esta maravillosa experiencia con tan excelente equipo. Mis felicitaciones por su gran trabajo."
  }
];

function getShuffledReviews(seed: number) {
  const shuffled = [...allReviews];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    seed = (seed * 16807) % 2147483647;
  }
  return shuffled.slice(0, 5);
}

const now = new Date();
const seed = Math.floor(now.getTime() / 1000);
const reviews = getShuffledReviews(seed);

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
