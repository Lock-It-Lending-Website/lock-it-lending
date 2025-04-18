import React from 'react';

type HeroSectionProps = {
  title: string;
  highlight: string;
  highlightColor?: 'black' | 'gold';
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
  highlightColor = 'black',
  reverseLayout = false,
  buttons,
}: HeroSectionProps) {
  const layoutClass = reverseLayout ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <section className="w-full h-screen bg-white overflow-hidden">
      <div className={`flex flex-col ${layoutClass} md:flex-row flex-wrap h-full`}>
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12 z-10">
          <div className="ml-auto text-left max-w-[650px] w-full ">
            <h1 className="text-5xl md:text-[4.75rem] leading-tight md:leading-[4.75rem] font-bold text-black mb-5 py-4">
              {title} <br />
              <span
                className={`whitespace-normal xl:break-words ${
                  highlightColor === 'gold' ? 'text-gold' : 'text-black'
                }`}
              >
                {highlight}
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 font-bold mb-6">{description}</p>
            {buttons && (
              <div className="flex gap-4 flex-wrap [&>button]:font-bold [&>button]:text-lg [&>button]:px-6 [&>button]:py-2 [&>a]:font-bold [&>a]:text-lg [&>a]:px-6 [&>a]:py-2">
                {buttons}
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full">
          <img src={image} alt="Hero visual" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
