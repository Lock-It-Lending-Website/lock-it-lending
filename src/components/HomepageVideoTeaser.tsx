import React, { useState } from 'react';
import VideoModal from '../components/VideoModal';

type VideoItem = {
  title: string;
  speaker: string;
  language: 'English' | 'Spanish' | 'Vietnamese';
  thumbnail: string;
  videoSrc: string;
};

const videos: VideoItem[] = [
  {
    title: 'FHA vs Conventional Loans',
    speaker: 'Aron & Valeria',
    language: 'Spanish',
    thumbnail: '/video thumbnails/fha-conventional.png',
    videoSrc: '/videos/Aron - FHA or Conventional Loan.mp4',
  },
  {
    title: 'VA Loans Explained',
    speaker: 'Kent',
    language: 'English',
    thumbnail: '/video thumbnails/va-loans.png',
    videoSrc: '/videos/Kent - VA loan.mp4',
  },
  {
    title: 'What is HELOC?',
    speaker: 'Kevin',
    language: 'Vietnamese',
    thumbnail: '/video thumbnails/heloc.png',
    videoSrc: '/videos/Kevin - HELOC.mp4',
  },
];

export default function HomepageVideoTeaser() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <>
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-5xl font-extrabold mb-6">Mortgage Education, Made Simply</h2>
            <p className="text-2xl text-gray-600 mb-12 font-semibold">
              Short videos from our loan experts explaining loan programs and mortgage terms
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Available in English, Spanish, and Vietnamese
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={() => setActiveVideo(video)}
                className="text-left rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black">{video.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-[#cca249] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      {video.language}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{video.speaker}</p>
                </div>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="/glossary"
              className="inline-block px-8 py-3 text-lg rounded-full bg-[#cca249] text-white font-semibold shadow hover:opacity-90"
            >
              View All Mortgage Terms
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </>
  );
}
