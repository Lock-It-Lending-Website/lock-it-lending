import React from 'react';
import { useCanonical } from '../hooks/useCanonical';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const SocialOutreach = () => {
  useCanonical('https://www.lockitlending.com/social-outreach');
  return (
    <div className="font-sans bg-gray-50">
      <Header />
      <main>
        <HeroSection
          title="Lock It Lending"
          highlight="Community Outreach"
          highlightColor="gold"
          description="See how Lock It Lending supports communities through disaster relief, charitable giving, and social responsibility efforts across Texas and beyond."
          image={`${process.env.PUBLIC_URL}/social-outreach-page.jpg`}
        />
        <section className="py-24 px-6 pb-4">
          <div className="text-6xl text-center mb-10">
            <h2 className="text-6xl font-bold text-center mb-10">Lock It Cares</h2>
            <p className="text-center text-gray-600 text-2xl max-w-=3xl mx-auto mb-16">
              Hill Country Flood Relief | Lock It Lending Supports Kerrville
            </p>
            <div className="text-center text-gray-800 mb-10w-full max-w-4xl mx-auto mb-16">
              <p className="text-base text-gray-800 font-bold text-left max-w-7xl mx-auto mb-16">
                Kerrville, TX - July 2025
              </p>
              <p className="text-base text-gray-800 font-normal italic text-left max-w-7xl mx-auto mb-10">
                When one mother cries, all mothers cry.
              </p>
              <p className="text-base text-gray-800 font-normal text-left max-w-7xl mx-auto mb-10">
                <strong>The Texas Hill Country flood </strong> which struck{' '}
                <strong> Kerrville over the 4th of July weekend </strong> brought heartbreak to
                families across the region. At <strong> Lock it Lending </strong>, this tragedy hit
                especially close to home. Our team heard the news through a personal connection. My
                daughter Natalie told me one of the girls affected was the little sister of her
                soccer teammate. For the past two summers, both of our kids, Ty and Natalie,
                attended a beloved <strong> Texas summer camp near Kerrville </strong>. I remember
                watching the camp’s photo app like a hawk, spotting them kayak, swimming, dancing,
                and making lifelong friends. Every pickup day was filled with joy, hugs, and “I
                don’t want to go home” smiles on their sun-kissed faces. That’s why this loss is so
                deeply personal. Parents send their kids to camp to experience joy, growth, and
                connection, not tragedy. The pain these families are experiencing is unimaginable.
              </p>

              <div className="max-w-3xl mx-auto px-4 mb-10">
                {/* Dynamic Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="col-span-2 md:col-span-3 row-span-2">
                    <img
                      src={`${process.env.PUBLIC_URL}/lock-it-cares/kerrville1.jpg`}
                      alt="Large image 1"
                      className="w-full h-full object-cover rounded-lg shadow"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-3 row-span-2">
                    <img
                      src={`${process.env.PUBLIC_URL}/lock-it-cares/kerrville2.jpg`}
                      alt="Large image 2"
                      className="w-full h-full object-cover rounded-lg shadow"
                    />
                  </div>
                  {[
                    '/lock-it-cares/kerrville3.jpg',
                    '/lock-it-cares/kerrville4.jpg',
                    '/lock-it-cares/kerrville5.jpg',
                  ].map((src, index) => (
                    <div key={index} className="col-span-1 md:col-span-2">
                      <img
                        src={src}
                        alt={`Kerrville image ${index + 3}`}
                        className="w-full h-full object-cover rounded-lg shadow"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center text-gray-800 mb-10 w-full max-w-4xl mx-auto">
              <p className="text-base text-gray-800 font-bold text-left max-w-7xl mx-auto mb-16">
                A Day of Prayer for Kerrville Flood Victims
              </p>
              <p className="text-base text-gray-800 font-normal text-left max-w-7xl mx-auto mb-10">
                On <strong> July 6, 2025 </strong>, a <strong> Texas Day of Prayer </strong>was
                observed across the state to honor flood victims and uplift the families, first
                responders, and volunteers. It was a powerful moment of statewide and national
                solidarity. One grieving family’s words reminded us of the strength found even in
                sorrow:
              </p>
              <p className="text-base text-gray-800 font-normal italic text-left max-w-7xl mx-auto mb-10">
                “Our family was shocked to hear of the horrific, tragic flooding in the Hill
                Country, and we were devastated to learn that our precious was among the victims…
                While we know that her joy is now eternal and her faith has become sight, our hearts
                are shattered by this loss… We thank you for your prayers and support.”
              </p>
              <p className="text-base text-gray-800 font-bold text-left max-w-7xl mx-auto mb-16">
                Texans Show Up: H-E-B and Local Heroes
              </p>
              <p className="text-base text-gray-800 text-left max-w-7xl mx-auto">
                Just days after the <strong> Kerrville flood </strong>, residents shared images of
                long lines of <strong> H-E-B trucks </strong> heading to the disaster zone. It was a
                powerful symbol of Texas businesses and communities rallying together. At{' '}
                <strong> Lock It Lending </strong>, we felt called to help however we could. One of
                our own, <strong> Loan Officer Travis Spencer </strong>, is currently on the ground
                in Kerrville. He has been working 14 to 16 hour days to support cleanup and recovery
                efforts. His passion for service goes beyond the mortgage industry. Travis leads a
                nonprofit organization, <strong> SteeleCroft </strong>, a registered{' '}
                <strong> 501(c)(3) </strong>focused on disaster relief and community rebuilding. To
                support Travis and the Kerrville community, Lock It Lending has donated{' '}
                <strong> $3,000 </strong>to <strong> SteeleCroft’s flood relief mission. </strong>
                This is just a small step in the much larger effort to help families rebuild their
                lives. If you’d like to contribute, donations can be made{' '}
                <a
                  href="https://steelecroft.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  here.
                </a>
              </p>
            </div>
          </div>

          <div className="text-center text-gray-800 mb-10w-full max-w-4xl mx-auto mb-16">
            <p className="text-base text-gray-800 font-bold text-left max-w-7xl mx-auto mb-16">
              Lock It Lending Community Support
            </p>
            <p className="text-base text-gray-800 text-left max-w-7xl mx-auto">
              At <strong> Lock It Lending </strong>, we believe in showing up for our communities,
              not just during the good times, but especially when tragedy strikes. Supporting the{' '}
              <strong> Kerrville flood recovery efforts </strong> is part of our mission to serve,
              give back, and uplift. Whether it’s through donations, volunteer work, or simply
              spreading awareness, every act of kindness counts.{' '}
              <strong> Together, we rebuild. Together, we stay strong. </strong>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SocialOutreach;
