import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const reviews = [
  {
    name: 'David',
    date: 'May 15, 2024',
    image: `${process.env.PUBLIC_URL}/david-review.png`,
    text: 'If I could give them 10 stars, I would! I initially started my loan process with another provider, but their slow communication and a high rate of 7.5% were major drawbacks. I then switched to Lock it Lending, and it was a fantastic decision. Ms. Hanh, Ms. Emily, Kaden, and Ella were extremely professional and supportive throughout the process. They not only expedited the loan closure but also secured a $6,000 grant for me and a lower rate of 6.6%. I am thoroughly impressed and will definitely recommend Lock it Lending to anyone in need of loan services.',
  },
  {
    name: 'Nick',
    date: 'May 14, 2024',
    image: `${process.env.PUBLIC_URL}/nick-review.png`,
    text: 'We recently worked with Thomas Stubblefield and Winter Huynh as our loan officer, and we couldn’t have been more satisfied with the experience. They was incredibly helpful, responsive, and knowledgeable throughout the entire loan process. They took the time to explain everything clearly, ensuring that I felt confident and informed every step of the way. They both are was proactive in addressing any concerns and worked tirelessly to secure the best possible terms for my loan. We highly recommend Lock It Lending to anyone in need of financing. Thank you both for your excellent work and exceptional service! We are really really appreciate it!',
  },
  {
    name: 'Bill',
    date: 'May 11, 2024',
    image: `${process.env.PUBLIC_URL}/bill-review.png`,
    text: 'I’d like to thank Ann and Ella who have been involved in the process of getting me into my new home. This has been a seamless, pleasant and positive experience which I attribute to the very professional team. Thanks again for all of your help and support in answering all of my question and getting me to closing!',
  },
  {
    name: 'Thi',
    date: 'April 19, 2024',
    image: `${process.env.PUBLIC_URL}/thi-review.png`,
    text: 'My husband and I are first time home buyer and we had the pleasure of working with Tiana, Lyn and Oliver. They are very professional, attentive and knowledgeable. They assisted us with many questions that we have and explained everything in details that made everything very easy to understand. The process went very smoothly. I would highly recommend them!! Thank you for assisting us throughout this process and for the beautiful gift on our closing day!',
  },
  {
    name: 'Quoc',
    date: 'April 13, 2024',
    image: `${process.env.PUBLIC_URL}/quoc-review.png`,
    text: 'I had the privilege of working with Mrs Lyn and Ella who facilitated my first home purchase through a loan, and I couldn’t be more satisfied with the experience. From the initial consultation to the final closing, Mrs Lyn and Ella demonstrated exceptional professionalism, expertise, and support. They patiently guided me through the loan process, ensuring I understood every step along the way. Thanks to them diligent efforts and dedication, I secured the financing I needed to purchase my dream home. I highly recommend Mrs Lyn and Ella to anyone seeking loan assistance. Thank you for making my home-buying journey a seamless and successful one!',
  },
];

export default function Reviews() {
  return (
    <div className="font-sans bg-[#f7f9fb]">
      <Header />
      <main>
        <HeroSection
          title="Customer Reviews"
          highlight="Voices of Satisfaction"
          description="Real Reviews from Real Customers: Hear What Our Clients Are Saying About Lock It Lending."
          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Reviews.png`}
        />

        <section className="max-w-6xl mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-[120px]">
          {reviews.map((review, idx) => (
            <div key={idx} className="relative bg-white rounded-2xl p-6 pb-20 shadow-md">
              <div className="absolute bottom-[-10px] left-10 w-0 h-0 border-t-[20px] border-t-white border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent" />
              <div className="text-gold text-2xl mb-3">❝</div>
              <p className="text-gray-700 leading-relaxed mb-6">{review.text}</p>
              <div className="flex items-center gap-4 absolute bottom-[-80px] left-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
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
