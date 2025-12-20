export const allReviews = [
  {
    name: 'Bry',
    date: 'December 16, 2025',
    image: '/reviews/Bry.png',
    text: 'As a first time home buyer I was nervous and had a bunch of questions. Lyn and Phillips made the process so easy with their help and guidance through the entire process. I couldn’t be more thankful and recommend them enough for making everything so smooth.',
  },
  {
    name: 'Xinlin Zhao',
    date: 'December 12, 2025',
    image: '/reviews/Xinlin Zhao.png',
    text: 'Jake and Phillips are very detailed and professional! Respond quickly with all of our questions and provided a super smooth process.',
  },
  {
    name: 'Scottie Bryant',
    date: 'December 12, 2025',
    image: '/reviews/scottie bryant.png',
    text: 'I can’t say enough good things about the Lockitlending team. They were sharp, organized, and on top of every detail from the very beginning. Each step was explained clearly, every question I had was answered fast, and they made a stressful process feel straightforward.\n\nTheir communication was consistent, their professionalism was obvious, and they treated my situation like it actually mattered—not just another file on a desk.\n\nI genuinely appreciate the effort they put in to make sure everything moved smoothly and on time. If you want a team that actually knows what they’re doing and takes care of you properly, this is the one.',
  },
  {
    name: 'Catherine Do',
    date: 'December 2, 2025',
    image: '/reviews/Catherine Do.png',
    text: 'I would like to give a big Thanks to the Lock It Lending - Hanh Dao / Lyn Ha team. I worked with many loan officers / lenders / mortgage brokers before. Hanh Dao / Lyn Ha team won me over with your professionalism, friendliness, and cooperation. There is always up and down but you worked with me through the humps. Thank you and cannot wait to do more loans with you. ❤️',
  },
  {
    name: 'Rosemary Onyenaucheya',
    date: 'December 2, 2025',
    image: '/reviews/Rosemary Onyenaucheya.png',
    text: 'Lock it lending is a very good company that do their best to make sure their customers get their wish house with satisfaction. Lock it Lending Rock. Thank you all for your help and support.',
  },
  {
    name: 'James Nguyen',
    date: 'November 18, 2025',
    image: '/reviews/James Nguyen.png',
    text: '"Professional and exceeded all expectations!"\n\nI was very impressed with Kaden Nguyen, Ella Van, and Kevin Nguyen. They were extremely professional, knowledgeable, and made a complicated process feel smooth and straightforward. They were always available to answer my questions and kept me updated every step. They went above and beyond to secure the best loan for my situation. We are so pleased with the outcome and would like to express our thank you for making the experience of buying our first home so positive. We are thrilled with our new home and I would highly recommend Kaden, Ella, and Kevin to anyone in a need of a mortgage.\n\nThank you again for your outstanding work.',
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
