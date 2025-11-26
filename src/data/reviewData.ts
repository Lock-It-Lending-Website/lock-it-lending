export const allReviews = [
  {
    name: 'David Howland',
    date: 'November 19, 2025',
    image: '/reviews/David Howland.png',
    text: 'I like working with Lock It Lending. We have used them on several deals and they come through for us every time. They always get us the best rates. Thanks to Jake, who took my calls after hours and weekends, and our loan processor Ayesha, who worked hard and got it done. I hope to do more deals with them in the future. -DH',
  },
  {
    name: 'Devin Roy',
    date: 'November 20, 2025',
    image: '/reviews/Devin Roy.png',
    text: 'We worked with Phillips and Jake at Lock It Lending on our home loan, and they did a great job. They were quick, efficient, and kept everything moving so we could close on time. Really solid experience—would recommend.',
  },
  {
    name: 'Elizabeth Kouffalis',
    date: 'November 11, 2025',
    image: '/reviews/Elizabeth Kouffalis.png',
    text: 'Philips and Hanh were so wonderful. They answered all my questions quickly and they know everything about mortgages. I wish I found them sooner. I would recommend them to anyone.',
  },
  {
    name: 'Maria Andrea Criollo',
    date: 'November 4, 2025',
    image: '/reviews/Maria Andrea Criollo.png',
    text: 'Muy profesionales! Me ayudaron con la compra de mi casa. Estoy muy a gusto y conforme con su trabajo. Mi loan officer fue María Torres Vázquez, no duden en contactarla!',
  },
  {
    name: 'Mehdi Rahimi.a',
    date: 'November 1, 2025',
    image: '/reviews/Mehdi Rahimi.a.png',
    text: 'I recently refinanced my home loan with Lending and the experience was absolutely fantastic from start to finish! The team was professional, responsive, and made the entire process smooth and stress-free. They explained every detail clearly, answered all my questions, and kept me informed every step of the way. I’m extremely happy with the rate and how quickly everything was completed. I highly recommend Lending to anyone looking to refinance or get a new mortgage — they truly go above and beyond!',
  },
  {
    name: 'Pedro Castaneda',
    date: 'November 18, 2025',
    image: '/reviews/Pedro Castaneda.png',
    text: 'Lock It Lending was amazing in helping me purchase my first home. Melinda Mazzola, the Loan Processor, was amazing in the whole process, communicative, and most importantly HONEST. Thank you Melinda. Will be coming back for my next home purchase!',
  },
  {
    name: 'Rosemary Onyenaucheya',
    date: 'November 21, 2025',
    image: '/reviews/Rosemary Onyenaucheya.png',
    text: 'Lock it lending is a very good company that do their best to make sure their customers get their wish house with satisfaction. Lock it Lending Rock. Thank you all for your help and support.',
  },
];

export function getShuffledReviews(seed: number, count: number) {
  const shuffled = [...allReviews];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    seed = (seed * 16807) % 2147483647;
  }
  return shuffled.slice(0, count);
}
