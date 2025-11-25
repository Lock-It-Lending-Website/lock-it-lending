import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const WhyLockItLending = () => {
  return (
    <>
      <div className="font-sans bg-gray-50">
        <Header />
        <main>
          <section className="bg-[#cca249] text-white px-6 py-10 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Left - Responsive cascade heading */}
              <div className="flex items-center md:justify-end justify-center text-center md:text-right">
                <h1
                  className="
          font-extrabold leading-none [text-wrap:balance]
          /* Fluid size on mobile so it scales with viewport */
          text-[clamp(2.25rem,9.5vw,3.75rem)]
          sm:text-[clamp(2.75rem,7.5vw,4.5rem)]
          md:text-7xl lg:text-8xl xl:text-9xl
        "
                >
                  {/* 0.62x the size of the main line, stays locked at all breakpoints */}
                  <span className="block text-[0.62em] tracking-wide mb-2">We are</span>
                  <span className="block">Lock It Lending</span>
                </h1>
              </div>

              {/* Top Right - Image */}
              <div className="h-56 sm:h-64 md:h-80 rounded-xl overflow-hidden">
                <img
                  src="/why-lock-it-lending/team1.jpg"
                  alt="Team 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Left - Image */}
              <div className="h-56 sm:h-64 md:h-80 rounded-xl overflow-hidden">
                <img
                  src="/why-lock-it-lending/team2.jpg"
                  alt="Team 2"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Right - Image */}
              <div className="h-56 sm:h-64 md:h-80 rounded-xl overflow-hidden">
                <img
                  src="/why-lock-it-lending/team3.jpg"
                  alt="Team 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <Link
                to="/careers"
                className="inline-block bg-white text-[#cca249] font-semibold px-6 py-3 rounded-full shadow hover:bg-[#a7812f] hover:text-white transition"
              >
                Join Lock It Lending Family
              </Link>
            </div>
          </section>
          <section className="bg-white px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="relative md:pl-0 md:pb-[190px]">
                {/* Image card */}
                <div className="rounded-xl overflow-hidden shadow-lg md:w-[68%]">
                  <img
                    src="/why-lock-it-lending/team4.jpg"
                    alt="Team 4"
                    className="w-full aspect-[16/9] object-cover object-center"
                  />
                </div>

                {/* Overlay card */}
                <div
                  className="
          bg-[#cca249] text-white rounded-xl shadow-xl
          p-6 md:p-8
          md:max-w-[520px]
          mt-6 sm:mt-8 md:mt-0        /* ← add top spacing on mobile/tablet */
          md:absolute md:right-0 md:bottom-[-80px] md:translate-x-4
          md:z-10
        "
                >
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                    Why Join Lock It Lending?
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    At Lock It Lending, we’re more than a mortgage company — we’re a team of
                    innovators, industry leaders, and top-performing professionals shaping the
                    future of home financing. Based in Texas and recognized nationally, our team
                    thrives on excellence, collaboration, and growth, making Lock It Lending the
                    ideal place to build a rewarding career in mortgage lending.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
            <div className="max-w-6xl mx-auto">
              {/* Grid: 1 col on mobile, 2 cols on md+ */}
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                {/* LEFT: image fills column */}
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/why-lock-it-lending/speaking.png"
                    alt="Speaking at major industry events"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* RIGHT: content */}
                <div className="bg-white flex flex-col">
                  {/* Text content */}
                  <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#cca249] mb-3 sm:mb-4">
                      Industry-Leading Leadership
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4 sm:mb-5">
                      Learn from the best in the business. Our leaders are consistently recognized
                      among the nation’s top loan officers.
                    </p>

                    <ul className="space-y-3 text-gray-900">
                      <li className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#cca249] shrink-0" />
                        <span>
                          <strong>Hanh Dao</strong> – Speaker at AIME FUSE 2023 &amp; UWM Live 2024
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#cca249] shrink-0" />
                        <span>
                          <strong>Ann Luu</strong> – Ranked among the Top 200 Loan Officers in the
                          Nation
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#cca249] shrink-0" />
                        <span>
                          <strong>Lyn Ha</strong> – Recognized as a Top 400 Loan Officer in the
                          Nation
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Awards */}
                  <div className="mt-auto p-5 sm:p-6 md:p-8 lg:p-10">
                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="aspect-[3/4] overflow-hidden rounded-t-xl">
                          <img
                            src="/why-lock-it-lending/top200.png"
                            alt="Top 200 LO award"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="aspect-[3/4] overflow-hidden rounded-t-xl">
                          <img
                            src="/why-lock-it-lending/top400.png"
                            alt="Top 400 LO award"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-[#2e2e2e] text-white py-10 sm:py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Left: text panel */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4">
                    Strategic Partnerships
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-200 max-w-prose">
                    We partner with Redfin, the #1 real estate brokerage site in the U.S., providing
                    buyers &amp; our team with access to cutting-edge tools, market insights, and
                    unparalleled opportunities for growth.
                  </p>
                </div>

                {/* Right: image inside grey box */}
                <div className="w-full">
                  <img
                    src="/why-lock-it-lending/redfin.png"
                    alt="Collaboration with Redfin"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Text box */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#cca249] mb-4">
                  National Recognition &amp; Results
                </h3>
                <p className="text-gray-700 mb-4 max-w-prose">
                  Lock It Lending consistently ranks among the top mortgage professionals and
                  organizations in the country, including:
                </p>
                <ul className="space-y-2 text-gray-900 text-base sm:text-lg">
                  <li>• #10 Top Emerging Stars 2025</li>
                  <li>• #62 Top Dollar Volume 2024</li>
                  <li>• #9 Most Loans Closed 2024</li>
                  <li>• #75 Top Non-QM Volume 2024</li>
                  <li>• #62 Top Purchase Volume 2024</li>
                  <li>• #81 Top Mortgage Brokers 2024</li>
                </ul>
              </div>

              {/* Right: Overlapping images */}
              <div className="relative h-[320px] sm:h-[380px] md:h-[420px]">
                {/* Back image */}
                <div className="absolute top-0 right-2 sm:right-6 w-[58%] h-[78%] rounded-xl overflow-hidden">
                  <img
                    src="/why-lock-it-lending/UWM.jpg"
                    alt="Awards board"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Front image (overlapping on top-left) */}
                <div className="absolute -bottom-20 left-2 sm:left-6 w-[56%] h-[72%] rounded-xl overflow-hidden">
                  <img
                    src="/why-lock-it-lending/front.jpg"
                    alt="Team recognition"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl mx-auto text-center">
              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#cca249]">
                Why You’ll Love Working Here
              </h2>

              {/* Gold body card */}
              <div className="mt-6 sm:mt-8 bg-[#cca249] text-white rounded-xl px-5 sm:px-7 md:px-8 py-6 sm:py-7 md:py-8 shadow">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Joining Lock It Lending means being part of a culture that values innovation,
                  collaboration, and professional development. From high-quality leads to advanced
                  technology and ongoing training, we empower our team to succeed and maximize
                  earning potential.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white px-6 py-16">
            <div className="max-w-6xl mx-auto">
              {/* Reserve space for the overhang on md+ */}
              <div className="relative md:pb-[220px]">
                {/* Image card (right-aligned) */}
                <div className="rounded-xl overflow-hidden shadow-lg md:w-[68%] md:ml-auto">
                  <img
                    src="/why-lock-it-lending/growth.png"
                    alt="Team 4"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Overlay card: centered on mobile, bottom-left on md+ */}
                <div
                  className="
          bg-[#cca249] text-white rounded-xl 
          p-6 md:p-6
          md:max-w-[560px]
          mx-auto text-center
          mt-6 sm:mt-8 md:mt-0          /* ← space ABOVE the box on mobile/tablet */
          md:mx-0 md:text-left
          md:absolute md:left-10 md:bottom-24 md:translate-x-10
          md:z-10
        "
                >
                  <h3
                    className="
            font-semibold tracking-tight
            text-lg xs:text-xl sm:text-3xl md:text-[34px] lg:text-[40px] xl:text-[44px]
            leading-[1.12] sm:leading-[1.15]
            flex flex-col space-y-0
            mb-3 sm:mb-4 md:mb-5
          "
                  >
                    <span>New Loan Officer:</span>
                    <span>From Zero to Hero</span>
                    <span>with Lock It Lending</span>
                  </h3>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white px-6 py-12">
            <div className="max-w-6xl mx-auto">
              <div
                className="
        grid gap-4 sm:gap-6
        grid-cols-2 md:grid-cols-2
        /* Masonry only from md+ */
        md:auto-rows-[150px] lg:auto-rows-[170px]
      "
              >
                {/* TL — uniform on mobile; MEDIUM at md+ */}
                <figure className="overflow-hidden rounded-xl h-full md:col-start-1 md:row-start-1 md:row-span-2">
                  <img
                    src="/why-lock-it-lending/tile1.jpg"
                    alt="Top left"
                    className="w-full aspect-[4/3] md:aspect-auto h-auto md:h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </figure>

                {/* TR — uniform on mobile; LARGE at md+ */}
                <figure className="overflow-hidden rounded-xl h-full md:col-start-2 md:row-start-1 md:row-span-3">
                  <img
                    src="/why-lock-it-lending/tile2.jpg"
                    alt="Top right"
                    className="w-full aspect-[4/3] md:aspect-auto h-auto md:h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </figure>

                {/* BL — uniform on mobile; LARGE at md+ */}
                <figure className="overflow-hidden rounded-xl h-full md:col-start-1 md:row-start-3 md:row-span-3">
                  <img
                    src="/why-lock-it-lending/tile3.jpg"
                    alt="Bottom left"
                    className="w-full aspect-[4/3] md:aspect-auto h-auto md:h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>

                {/* BR — uniform on mobile; MEDIUM at md+ */}
                <figure className="overflow-hidden rounded-xl h-full md:col-start-2 md:row-start-4 md:row-span-2">
                  <img
                    src="/why-lock-it-lending/tile4.jpg"
                    alt="Bottom right"
                    className="w-full aspect-[4/3] md:aspect-auto h-auto md:h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WhyLockItLending;
