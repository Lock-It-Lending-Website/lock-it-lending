import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import {
  CalendarCheck2,
  FileText,
  Home,
  Lock,
  PenLine,
  Search,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

const steps = [
  {
    title: 'Pre-Approval',
    icon: <UserCheck className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        Begin by scheduling a call with one of our expert <Link to="/meet-lock-it-lending" className="text-yellow-700 underline">Loan Officers</Link>
        . They&apos;ll help identify the <Link to="/loan-programs" className="text-yellow-700 underline">Loan Programs</Link> that best suits your needs. 
        At this stage, we perform a soft credit pull, ensuring your
        credit score remains unaffected. We meticulously prepare your application and have it
        reviewed by our in-house underwriter. Curious about potential loan rates and fees?{' '}
        <Link to="/rates" className="text-yellow-700 underline">
          Get a personalized estimate here
        </Link>
        .
      </>
    ),
  },
  {
    title: 'Home Search',
    icon: <Search className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        Work with your real estate agent to begin searching for your dream home. If you don&apos;t
        already have an agent, let us know — we&apos;ll connect you with someone who best fits your
        needs. Interested in locking your rate before finding a house? It&apos;s possible! Discuss
        the conditions with your Loan Officer to understand the specifics.
      </>
    ),
  },
  {
    title: 'Making an Offer',
    icon: <PenLine className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        Once you&apos;ve found the perfect home, your real estate agent will help you prepare and
        submit a competitive offer.
      </>
    ),
  },
  {
    title: 'Offer Accepted',
    icon: <CalendarCheck2 className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        Congratulations! With an accepted offer, we proceed to submit your loan application to the
        lender.
      </>
    ),
  },
  {
    title: 'Loan Submission & Initial Disclosures',
    icon: <FileText className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        We’ll select the most suitable lender based on your unique situation and submit your file.
        You’ll receive disclosures for e-signature and may be asked for additional documentation.
      </>
    ),
  },
  {
    title: 'Conditional Approval',
    icon: <ShieldCheck className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        The lender reviews your file and issues a conditional approval, indicating that your loan is
        close to finalization, pending a few additional conditions.
      </>
    ),
  },
  {
    title: 'Rate Lock',
    icon: <Lock className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        We’ll monitor interest rates for you and send daily updates so you can stay informed. Once
        you spot the option that works best for you, we’ll guide you through locking in the most
        competitive rate for your loan. Locking the rate is essential to finalize your loan terms
        before closing.
      </>
    ),
  },
  {
    title: 'Final Approval & Clear to Close',
    icon: <ShieldCheck className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        Once all conditions are met, you&apos;ll receive final approval and the &quot;Clear to
        Close&quot;— the green light to schedule your closing.
      </>
    ),
  },
  {
    title: 'Closing Day',
    icon: <Home className="w-10 h-10 text-yellow-600" />,
    content: (
      <>
        It&apos;s time to sign the final documents and officially become a homeowner.
        Congratulations!
      </>
    ),
  },
];

const Purchase: React.FC = () => {
  return (
    <div className="home-page font-sans bg-gray-50 min-h-screen">
      <Header />
      <main className="main-content">
        <HeroSection
          title="Shop For Your New Home"
          highlight="With Confidence"
          highlightColor="gold"
          description="Whether you are looking for your first home, your forever home, an investment property or a second home, we have all the options for you. Our client-first mentality puts the power in your hands."
          image={`${process.env.PUBLIC_URL}/Lock-It-Lending-buy-a-home.png`}
        />

        <section className="relative max-w-5xl mx-auto px-4 py-6 mt-12 md:px-6 md:py-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-left md:text-center">
            Step-by-Step Guide to Buying a Home
          </h2>
          <p className="text-xl text-gray-600 mb-10 text-left md:text-center max-w-3xl mx-auto mb-20">
            Before diving into the housing market, ensure you&apos;re fully prepared. At Lock It
            Lending, we believe an informed buyer is a confident buyer. Our easy-to-follow guide
            walks you through the 9 essential steps of purchasing your dream home - from
            pre-approval to closing day.
          </p>

          <div className="relative">
            <div className="absolute left-1/2 top-0 w-[2px] h-full bg-yellow-500 transform -translate-x-1/2 z-0 border-l border-dashed" />
            <div className="space-y-6 md:space-y-12 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:gap-8`}
                >
                  <div
                    className={`relative w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    <div
                      className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse text-left' : 'md:flex-row text-left'}`}
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-yellow-600 bg-white shadow flex items-center justify-center shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          Step {index + 1}: {step.title}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed text-left max-w-md">
                          {step.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Let Lock It Lending Be Your Guide
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Buying a home is a major milestone, and we&apos;re here for every step. Whether
              it&apos;s your first purchase or you&apos;re moving up, our expert loan advisors make
              the mortgage process simple and stress-free.
            </p>
            <Link
              to="/meet-lock-it-lending"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Ready to Get Started?
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Purchase;
