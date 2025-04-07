import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="home-page font-sans">
      <Header />

      <main className="main-content">
        <HeroSection
          title="Welcome to"
          highlight="Lock It Lending"
          description="Offering industry-leading expertise and aggressive pricing, ensuring the best solution for home buyers before the need ever arises"
          image={`${process.env.PUBLIC_URL}/banner-952x952px.jpg`}
          buttons={
            <>
              <Link
                to="/purchase"
                className="bg-gold text-white font-semibold px-5 py-2 rounded-full shadow"
              >
                Purchase
              </Link>
              <Link
                to="/refinance"
                className="border border-gold text-gold font-semibold px-5 py-2 rounded-full shadow"
              >
                Refinance
              </Link>
            </>
          }
        />

        {/* Neighborhood Section */}
        <section className="py-24 bg-[#f7fbfd] px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-4">See What’s New in the Neighborhood</h2>
            <p className="text-lg text-gray-600 mb-10 font-semibold">
              Learn about products, events, and many other great offering from Lock It Lending
            </p>
            <div className="grid md:grid-cols-3 gap-8">
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
                {
                  title: 'Conventional 1% Down: Making Homeownership More Accessible',
                  slug: 'conventional-1-down-making-homeownership-more-accessible',
                  description: 'Conventional 1% Down: Making Homeownership More Accessible...',
                  image: `${process.env.PUBLIC_URL}/Making-Homeownership-More-Accessible.png`,
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
                      className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white p-6">
                      <h3 className="text-2xl font-bold mb-2 text-center">{card.title}</h3>
                      <p className="text-sm text-center">{card.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-gray-50 py-24 px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-2">Unlocking Homeownership Happiness</h2>
            <p className="text-lg text-gray-600 mb-6 font-semibold">
              Learn from Our reviews how lock it lending transformed lives with tailored mortgage
              solutions
            </p>
            <div className="flex justify-center items-center gap-2 mb-8">
              <span className="text-2xl">⭐⭐⭐⭐⭐</span>
              <span className="text-lg font-bold">457 Google Reviews</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="bg-white rounded-2xl shadow-lg flex flex-col justify-between overflow-hidden relative pb-32 px-6 pt-10 text-center min-h-[450px]"
                >
                  <p className="text-gray-800 font-medium text-base leading-relaxed">
                    {review.text}
                  </p>

                  {/* Footer Curve + Profile */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="bg-gold h-[90px] w-full rounded-t-[50%] relative">
                      {/* Avatar */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-16 h-16 rounded-full border-4 border-white object-cover"
                        />
                      </div>

                      {/* Name + Date */}
                      <div
                        className="text-white text-sm font-semibold flex flex-col items-center justify-center pt-7
          "
                      >
                        <div className="text-base">{review.name}</div>
                        <div className="text-xs">{review.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://www.google.com/search?q=lock+it+lending+houston#lrd=0x8640c35d2a7a4eab:0xb5736063dbda6db6,1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-bold hover:underline mt-10 inline-block"
            >
              SEE ALL REVIEWS →
            </a>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-white py-24 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2">
              <img
                src={`${process.env.PUBLIC_URL}/Lock-It-Lending-Home1.png`}
                alt="Modern house"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-10 text-center md:text-left">
              <h2 className="text-3xl font-extrabold mb-4">Want to work with Lock It Lending</h2>
              <p className="text-gray-700 mb-6">
                If you’re either Purchasing or refinancing, have the confidence to know you are
                working with the right team. Click Apply to sign up as one of Lock It Lending’s
                Neighbors in our Neighborhood. Whether you are in process with a loan or have
                questions, Lock It Lending will make you feel like a neighbor by answering all your
                financing questions.
              </p>
              <a
                href="/"
                className="inline-block bg-gold text-white px-6 py-2 rounded-full font-semibold shadow hover:opacity-90"
              >
                Apply
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
