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
    <section className="bg-white py-24 px-4">
      <div className={`max-w-7xl mx-auto flex flex-col ${layoutClass} items-center justify-between`}>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-black">
            {title} <br />
            <span className="text-gold">{highlight}</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0 mb-6">
            {description}
          </p>
          {buttons && <div className="flex justify-center md:justify-start gap-4">{buttons}</div>}
        </div>
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <img src={image} alt="Hero visual" className="w-full rounded-lg shadow-md" />
        </div>
      </div>
    </section>
  );
}