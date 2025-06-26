export const allReviews = [
  {
    name: 'Dewayne Thomas',
    date: '16 June, 2025',
    image: '/reviews/Dewayne Thomas.png',
    text: 'This was a great company to work with. Luke was our representative and he helped us tremendously. I will indeed refer this company to friends and family. 5 stars!!',
  },
  {
    name: 'Mariam Hussain',
    date: '5 June, 2025',
    image: '/reviews/Mariam Hussain.png',
    text: 'I’ve had the pleasure of working with Maria at Lock It Lending on two deals, and she has truly gone above and beyond each time! As someone who works for a builder, I’m used to outside lenders lacking urgency or responsiveness — but not Maria. She’s incredibly attentive, proactive, and communicates consistently throughout the process. What stands out most is how she presents loan options clearly to the buyer and keeps her processing and underwriting teams accountable to ensure a smooth and timely closing. I highly recommend working with her! You will not be disappointed.',
  },
  {
    name: 'Rick Shi',
    date: '19 June, 2025',
    image: '/reviews/Rick Shi.png',
    text: 'Great experience with Lock It Lending both Kevin and Phillips were helpful through each step of the way. Would highly recommend if looking to become a first time homeowner!',
  },
  {
    name: 'Eric Caliendo',
    date: '3 June, 2025',
    image: '/reviews/Eric Caliendo.png',
    text: 'I had a great experience with Lock-It Lending. Their team, especially Lyn Ha and Philips Nguyen, worked with me tirelessly to get me the best rate for my mortgage. They were very available to answer all of my questions and ensure I felt comfortable with the process. They were courteous and professional. I sincerely enjoyed working with them. They have multiple different mortgage options, ensure you fully explain your financial situation to help them match you with their best product.',
  },
  {
    name: 'Abel Restituyo',
    date: '12 June, 2025',
    image: '/reviews/Abel Restituyo.png',
    text: 'The most extraordinary thing that has happened to my wife and me is having the opportunity to purchase our home through Lock it Lending. We are deeply grateful to Maria Torres Vazquez for all her support and professionalism in providing us with the best guidance and willingness to always answer our questions and concerns as first-time buyers. Her patience and promptness are excellent, fielding so many calls from us, which she always responded to with pleasure and precise solutions. We can therefore recommend Maria and her entire team for their excellent service.',
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
