export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'FinancialService'],
  '@id': 'https://www.lockitlending.com/#organization',
  name: 'Lock It Lending',
  url: 'https://www.lockitlending.com/',
  logo: 'https://www.lockitlending.com/logo.svg',
  image: 'https://www.lockitlending.com/breaking%20news%20size%20web.jpg',
  description:
    'Mortgage experts assist with homebuying and refinancing, and offer friendly support.',
  telephone: '(866) 400-6789',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11111 Richmond Ave. #250',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77082',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/lockitlendingofficial',
    'https://www.instagram.com/lockitlending/?hl=en',
    'https://www.linkedin.com/company/lock-it-lending-all-stars',
    'https://www.tiktok.com/@lockitlendinghouston',
    'https://www.youtube.com/@LockITLending-Official',
  ],
} as const;
