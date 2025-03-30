export interface ResourceArticle {
  title: string;
  slug: string;
  author: string;
  tags: string[];
  readTime: string;
  date: string;
  excerpt: string;
  thumbnailUrl: string;
}

export const resourcesData: ResourceArticle[] = [
  {
    title: 'Be Aware of Predatory Lending Practices',
    slug: 'predatory-lending-practices',
    author: 'Hanh Dao',
    tags: ['Purchase', 'RedFind'],
    readTime: '1 min read',
    date: '2024-05-13',
    excerpt:
      'Learn how to protect yourself from Predatory Lending from Scotsman Guide Rising Star Hanh Dao...',
    thumbnailUrl: '/images/resources/resource-1.webp',
  },
  {
    title: 'What are 2-1 Temporary Rate Buydowns?',
    slug: 'what-are-2-1-temporary-rate-buydowns',
    author: 'admin',
    tags: ['Purchase', 'Temporary Rate Buydowns'],
    readTime: '3 min read',
    date: '2024-05-13',
    excerpt:
      '2-1 Temporary Rate Buydowns: A Win-Win for Borrowers and Sellers Navigating the world of mortgages...',
    thumbnailUrl: '/images/resources/resource-2.webp',
  },
  {
    title: 'Conventional 1% Down: Making Homeownership More Accessible',
    slug: 'conventional-1-percent-down',
    author: 'admin',
    tags: ['1%', 'Purchase', 'Rates'],
    readTime: '2 min read',
    date: '2024-05-13',
    excerpt:
      'Conventional 1% Down: Making Homeownership More Accessible. In the realm of homeownership, one of the...',
    thumbnailUrl: '/images/resources/resource-3.webp',
  },
];
