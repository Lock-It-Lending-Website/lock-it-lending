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
                  title: 'School Ratings',
                  description: 'Find top-rated schools in your area.',
                  image: `${process.env.PUBLIC_URL}/Be-Aware-of-Predatory-Lending-Practices.jpg`,
                },
                {
                  title: 'Home Listings',
                  description: 'Browse homes currently for sale nearby.',
                  image: `${process.env.PUBLIC_URL}/What-are2-1Temporar-Rate-Buydowns.png`,
                },
                {
                  title: 'Local Amenities',
                  description: 'Explore parks, shops, and more around you.',
                  image: `${process.env.PUBLIC_URL}/Making-Homeownership-More-Accessible.png`,
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
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
                    <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                    <p className="text-sm">{card.description}</p>
                  </div>
                </motion.div>
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
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-700 font-semibold mb-6">
                  I’d like to thank Ann and Ella who have been involved in the process of getting me
                  into my new home. This has been a seamless, pleasant and positive experience which
                  I attribute to the very professional team.
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gold">Bill</p>
                  <p className="text-sm text-gray-500">May 11, 2024</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-700 font-semibold mb-6">
                  My husband and I are first time home buyer and we had the pleasure of working with
                  Tiana, Lyn and Oliver. They are very professional, attentive and knowledgeable...
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gold">Thi</p>
                  <p className="text-sm text-gray-500">April 19, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-white py-24 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2">
              <img
                src={`${process.env.PUBLIC_URL}/Lock-It-Lending-Home1-1.jpg`}
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
                Apply ↗
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
