import React from 'react';

type HeroSectionProps = {
  title: string;
  highlight: string;
  description: string;
  image: string;
  reverseLayout?: boolean;
  buttons?: React.ReactNode;
};

export default function HeroSection({
  title,
  highlight,
  description,
  image,
  reverseLayout = false,
  buttons,
}: HeroSectionProps) {
  const layoutClass = reverseLayout ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <section className="w-full h-screen bg-white overflow-hidden">
      <div className={`flex flex-col ${layoutClass} md:flex-row h-full`}>
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 z-10">
          <div className="ml-auto text-left max-w-[520px] w-full">
            <h1 className="text-5xl md:text-[3.25rem] leading-tight md:leading-[3.75rem] font-extrabold text-black mb-4">
              {title} <br />
              <span className="text-gold">{highlight}</span>
            </h1>   
            <p className="text-base md:text-lg text-slate-600 mb-6">
              {description}
            </p>
            {buttons && <div className="flex gap-4 flex-wrap">{buttons}</div>}
          </div>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <img
            src={image}
            alt="Hero visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
