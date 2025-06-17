import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type HeroSectionProps = {
  title: string;
  highlight: string;
  highlightColor?: 'black' | 'gold';
  description: string;
  image: string;
  reverseLayout?: boolean;
  buttons?: React.ReactNode;
  showAdRotator?: boolean;
};

const ads = [
  `${process.env.PUBLIC_URL}/top producer may size web.jpg`,
  `${process.env.PUBLIC_URL}/fthb class size web.jpg`,
];

const AdRotator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ads.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentImage = ads[currentIndex];

  return (
    <div className="relative overflow-hidden h-full w-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={currentImage}
          alt=""
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default function HeroSection({
  title,
  highlight,
  description,
  image,
  highlightColor = 'black',
  reverseLayout = false,
  buttons,
  showAdRotator = false,
}: HeroSectionProps) {
  const layoutClass = reverseLayout ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <section className="w-full min-h-screen bg-white overflow-hidden">
      <div className={`flex flex-col ${layoutClass} md:flex-row flex-wrap`}>
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12">
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

        <div className="w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] relative">
          {showAdRotator ? (
            <AdRotator />
          ) : (
            <img src={image} alt="Hero visual" className="w-full h-full object-cover" />
          )}
        </div>
      </div>
    </section>
  );
}
