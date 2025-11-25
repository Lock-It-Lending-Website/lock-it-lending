import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { motion, AnimatePresence } from 'framer-motion';
import { getShuffledReviews } from '../data/reviewData';

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'FinancialService'],
  '@id': 'https://www.lockitlending.com/#organization',
  name: 'Lock It Lending',
  url: 'https://www.lockitlending.com/',
  logo: 'https://www.lockitlending.com/logo.svg',
  image: 'https://www.lockitlending.com/breaking%20news%20size%20web.jpg',
  description:
    'Mortgage experts assist with homebuying and refinancing, and offer friendly support.',
  telephone: '(866) 400-6789',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11111 Richmond Ave. #250',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77082',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/your-page',
    'https://www.linkedin.com/company/your-company',
    'https://www.instagram.com/your-handle',
    // add Google Business Profile URL here if you have one
  ],
};

declare global {
  interface Window {
    FB: any;
  }
}
const seed = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 6));
const homepageReviews = getShuffledReviews(seed, 2);

const ads = [
  `${process.env.PUBLIC_URL}/closing/1.jpg`,
  `${process.env.PUBLIC_URL}/closing/2.jpg`,
  `${process.env.PUBLIC_URL}/closing/3.png`,
  `${process.env.PUBLIC_URL}/closing/4.jpg`,
  `${process.env.PUBLIC_URL}/closing/5.jpg`,
  `${process.env.PUBLIC_URL}/closing/6.jpg`,
  `${process.env.PUBLIC_URL}/closing/7.jpg`,
  `${process.env.PUBLIC_URL}/closing/8.jpg`,
  `${process.env.PUBLIC_URL}/closing/9.jpg`,
  `${process.env.PUBLIC_URL}/closing/10.jpg`,
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
            className="w-full h-full object-cover rounded-xl object-top"
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <>
      {' '}
      <div className="home-page font-sans">
        <Header />

        <main className="main-content">
          <HeroSection
            title="Welcome to"
            highlight="Lock It Lending"
            description="Rated the #1 mortgage broker in TX with the most top producing Loan Officers"
            image={`${process.env.PUBLIC_URL}/homepagehero.jpg`}
            showAdRotator={true}
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
          {/* Live From Lock it Lending Section*/}
          <section className="py-14 bg-gray-50 px-8">
            <div className="max-w-7xl mx-auto text-center"></div>
          </section>

          {/* Updates That Move You Section */}
          <section className="py-27 bg-[#f7fbfd] px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-5xl font-extrabold mb-6">Updates That Move You—Literally 🏡</h2>
              <p className="text-2xl text-gray-600 mb-12 font-semibold">
                Learn about products, events, and many other great offerings from Lock It Lending
              </p>

              <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center">
                {[
                  {
                    title: 'What are 2-1 Temporary Rate Buydowns?',
                    slug: 'what-are-2-1-temporary-rate-buydowns',
                    description:
                      '2-1 Temporary Rate Buydowns: A Win-Win for Borrowers and Sellers...',
                    image: `${process.env.PUBLIC_URL}/What-are2-1Temporar-Rate-Buydowns.png`,
                  },
                  {
                    title: "Unlock Homeownership with Lock It Lending's 1% Down Program",
                    slug: 'Unlock-Homeownership-with-Lock-It-Lendings-1-percent-Down-Program',
                    description:
                      'The Conventional 1% Down is a lender-paid down payment assistance..',
                    image: `${process.env.PUBLIC_URL}/Conventional1Down.png`,
                  },
                ].map((card, index) => (
                  <Link
                    key={index}
                    to={`/resources/${card.slug}`}
                    className="block w-full max-w-[420px]"
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg group w-full aspect-[5/3]"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.5 }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white p-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                          {card.title}
                        </h3>
                        <p className="text-lg text-center">{card.description}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-gray-50 px-4 sm:px-6 md:px-8 pt-20 pb-28 text-center">
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="w-full font-extrabold mb-6 leading-tight break-words text-[clamp(2.5rem,6vw,3.25rem)] max-w-full mx-auto">
                Unlocking Homeownership Happiness
              </h2>
              <p className="text-2xl text-gray-600 mb-8 font-semibold">
                Learn from our reviews how Lock It Lending transformed lives with tailored mortgage
                solutions
              </p>
              <div className="grid md:grid-cols-3 gap-10 mb-12">
                <div className="md:col-span-3 flex justify-center">
                  <motion.div
                    className="relative overflow-hidden rounded-xl shadow-lg group w-full max-w-[400px]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, delay: 0.6 }}
                  >
                    <div className="w-full h-auto max-h-[300px] object-cover sm:object-contain">
                      <AdRotator />
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 mb-10">
                <span className="text-3xl">⭐⭐⭐⭐⭐</span>
                <span className="text-xl font-bold">1000+ Google Reviews</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {homepageReviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl shadow-xl flex flex-col justify-between overflow-hidden relative pb-36 px-10 pt-12 text-center min-h-[500px]"
                  >
                    <p className="text-gray-800 font-medium text-lg leading-relaxed">
                      {review.text}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0">
                      <div className="bg-gold h-[100px] w-full rounded-t-[50%] relative">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-20 h-20 rounded-full border-4 border-white object-cover"
                          />
                        </div>
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
                  working with the right team. Click Apply to sign up. Whether you are in process
                  with a loan or have questions, Lock It Lending will make you feel like a neighbor
                  by answering all your financing questions.
                </p>
                <Link
                  to="/careers"
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
    </>
  );
};

export default Home;
