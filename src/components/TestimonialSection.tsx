import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoModal from '../components/VideoModal';

type TestimonialVideo = {
  title: string;
  videoSrc: string;
  thumbnail: string;
};

const testimonialVideo: TestimonialVideo = {
  title: 'Client Testimonial',
  videoSrc: '/videos/Testimonial video.mp4',
  thumbnail: '/video thumbnails/testimonial_kristin.png',
};

export default function TestimonialSection() {
  const [activeVideo, setActiveVideo] = useState<TestimonialVideo | null>(null);

  return (
    <>
      <section className="bg-white px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="flex justify-center md:justify-end">
              <button
                type="button"
                onClick={() => setActiveVideo(testimonialVideo)}
                className="group w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] text-left "
                aria-label="Play client testimonial video"
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-white shadow-2xl transition-shadow group-hover:shadow-xl">
                  <img
                    src={testimonialVideo.thumbnail}
                    alt="Watch client testimonial"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="text-center md:text-left">
              <p className="text-lg font-bold tracking-wide text-gold uppercase">
                Client Testimonial
              </p>

              <h2 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight">
                A real homeowner’s experience with Lock It Lending
              </h2>

              <p className="mt-4 text-xl text-gray-700 font-semibold">
                Hear directly from a client about what it was like working with our team—from first
                questions to closing day.
              </p>

              <ul className="mt-6 space-y-3 text-lg text-gray-700">
                <li className="flex gap-3 justify-center md:justify-start">
                  <span className="text-gold font-bold">•</span> Clear communication and guidance
                </li>
                <li className="flex gap-3 justify-center md:justify-start">
                  <span className="text-gold font-bold">•</span> Simple, transparent process
                </li>
                <li className="flex gap-3 justify-center md:justify-start">
                  <span className="text-gold font-bold">•</span> Fast answers and confident next
                  steps
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  to="/purchase"
                  className="inline-block bg-gold text-white text-lg px-8 py-3 rounded-full font-semibold shadow hover:opacity-90"
                >
                  Get Started
                </Link>

                {/*<a
                  href="https://www.google.com/search?q=lock+it+lending+houston#lrd=0x8640c35d2a7a4eab:0xb5736063dbda6db6,1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-gold text-gold text-lg px-8 py-3 rounded-full font-semibold shadow hover:bg-gold hover:text-white transition-colors"
                >
                  See All Reviews
                </a>*/}
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoModal
          video={{ title: activeVideo.title, videoSrc: activeVideo.videoSrc }}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
