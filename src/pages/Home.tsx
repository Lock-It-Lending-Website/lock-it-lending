import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { motion, AnimatePresence } from 'framer-motion';

const ads = [
  `${process.env.PUBLIC_URL}/closing/2024-10-04.webp`,
  `${process.env.PUBLIC_URL}/closing/314897428_126237133569021_8560092186124881211_n.webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed (1).webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed (2).webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed (3).webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed (4).webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed (5).jpg`,
  `${process.env.PUBLIC_URL}/closing/unnamed (5).webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed (6).webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed (7).webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed (8).webp`,
  `${process.env.PUBLIC_URL}/closing/unnamed.webp`,
];

const AdRotator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ads.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentImage = ads[currentIndex];

  return (
    <section className="block">
      <div className="relative overflow-hidden rounded-xl shadow-lg h-64">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={currentImage}
            alt=""
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-64 object-cover"
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="home-page font-sans">
      <Header />

      <main className="main-content">
        <HeroSection
          title="Welcome to"
          highlight="Lock It Lending"
          description="Rate the #1 mortgage broker in TX with the most top producing Loan Officers"
          image={`${process.env.PUBLIC_URL}/banner-952x952px.jpg`}
          buttons={
            <>
              <Link
                to="/purchase"
                className="bg-gold text-white font-semibold text-lg px-6 py-3 rounded-full shadow"
              >
                Purchase
              </Link>
              <Link
                to="/refinance"
                className="border border-gold text-gold font-semibold text-lg px-6 py-3 rounded-full shadow"
              >
                Refinance
              </Link>
            </>
          }
        />

        {/* Neighborhood Section */}
        <section className="py-28 bg-[#f7fbfd] px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-extrabold mb-6">See What’s New in the Neighborhood</h2>
            <p className="text-2xl text-gray-600 mb-12 font-semibold">
              Learn about products, events, and many other great offerings from Lock It Lending
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              {/* First two static cards */}
              {[
                {
                  title: 'Be Aware of Predatory Lending Practices',
                  slug: 'be-aware-of-predatory-lending-practices',
                  description: 'Learn how to protect yourself...',
                  image: `${process.env.PUBLIC_URL}/Be-Aware-of-Predatory-Lending-Practices.jpg`,
                },
                {
                  title: 'What are 2-1 Temporary Rate Buydowns?',
                  slug: 'what-are-2-1-temporary-rate-buydowns',
                  description:
                    '2-1 Temporary Rate Buydowns: A Win-Win for Borrowers and Sellers...',
                  image: `${process.env.PUBLIC_URL}/What-are2-1Temporar-Rate-Buydowns.png`,
                },
              ].map((card, index) => (
                <Link key={index} to={`/resources/${card.slug}`} className="block">
                  <motion.div
                    className="relative overflow-hidden rounded-xl shadow-lg group"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white p-6">
                      <h3 className="text-2xl font-bold mb-2 text-center">{card.title}</h3>
                      <p className="text-lg text-center">{card.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}

              {/* Animated Ad */}
              <AdRotator />
            </div>
          </div>
        </section>
        {/* Reviews Section */}
        <section className="bg-gray-50 py-28 px-8 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-4">Unlocking Homeownership Happiness</h2>
            <p className="text-2xl text-gray-600 mb-8 font-semibold">
              Learn from our reviews how Lock It Lending transformed lives with tailored mortgage
              solutions
            </p>
            <div className="flex justify-center items-center gap-3 mb-10">
              <span className="text-3xl">⭐⭐⭐⭐⭐</span>
              <span className="text-xl font-bold">1000+ Google Reviews</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  name: 'Bill',
                  date: 'May 11, 2024',
                  image: `${process.env.PUBLIC_URL}/bill-review.png`,
                  text: `I’d like to thank Ann and Ella who have been involved in the process of getting me into my new home. This has been a seamless, pleasant and positive experience which I attribute to the very professional team. Thanks again for all of your help and support in answering all of my questions and getting me to closing!`,
                },
                {
                  name: 'Thi',
                  date: 'April 19, 2024',
                  image: `${process.env.PUBLIC_URL}/thi-review.png`,
                  text: `My husband and I are first time home buyer and we had the pleasure of working with Tiana, Lyn and Oliver. They are very professional, attentive and knowledgeable. They assisted us with many questions and explained everything in detail that made everything very easy to understand. The process went very smoothly. I would highly recommend them!! Thank you for assisting us throughout this process and for the beautiful gift on our closing day!`,
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl flex flex-col justify-between overflow-hidden relative pb-36 px-10 pt-12 text-center min-h-[500px]"
                >
                  <p className="text-gray-800 font-medium text-lg leading-relaxed">{review.text}</p>

                  {/* Footer Curve + Profile */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="bg-gold h-[100px] w-full rounded-t-[50%] relative">
                      {/* Avatar */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-20 h-20 rounded-full border-4 border-white object-cover"
                        />
                      </div>

                      {/* Name + Date */}
                      <div className="text-white text-base font-semibold flex flex-col items-center justify-center pt-8">
                        <div className="text-lg">{review.name}</div>
                        <div className="text-sm">{review.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="https://www.google.com/search?q=lock+it+lending+houston#lrd=0x8640c35d2a7a4eab:0xb5736063dbda6db6,1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-bold text-lg hover:underline mt-12 inline-block"
            >
              SEE ALL REVIEWS →
            </Link>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-white py-28 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-1/2">
              <img
                src={`${process.env.PUBLIC_URL}/Lock-It-Lending-Home1.png`}
                alt="Modern house"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
              <h2 className="text-4xl font-extrabold mb-6">Want to work with Lock It Lending</h2>
              <p className="text-xl text-gray-700 mb-8">
                If you’re either Purchasing or refinancing, have the confidence to know you are
                working with the right team. Click Apply to sign up as one of Lock It Lending’s
                Neighbors in our Neighborhood. Whether you are in process with a loan or have
                questions, Lock It Lending will make you feel like a neighbor by answering all your
                financing questions.
              </p>
              <Link
                to="/"
                className="inline-block bg-gold text-white text-lg px-8 py-3 rounded-full font-semibold shadow hover:opacity-90"
              >
                Apply
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
