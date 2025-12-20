export interface ResourceArticle {
  title: string;
  slug: string;
  author: string;
  tags: string[];
  readTime: string;
  date: string;
  excerpt: string;
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  thumbnailUrl: string;
  content?: string;
  isExpired?: boolean;
}

export const resourcesData: ResourceArticle[] = [
  {
    title: 'What are 2-1 Temporary Rate Buydowns?',
    slug: 'what-are-2-1-temporary-rate-buydowns',
    author: 'admin',
    tags: ['Purchase', 'Temporary Rate Buydowns'],
    readTime: '3 min read',
    date: '2024-05-13',
    excerpt:
      '2-1 Temporary Rate Buydowns: A Win-Win for Borrowers and Sellers Navigating the world of mortgages...',
    mediaType: 'image',
    thumbnailUrl: `${process.env.PUBLIC_URL}/What-are2-1Temporar-Rate-Buydowns.png`,
    content: `
      	<h2><strong>2-1 Temporary Rate Buydowns: A Win-Win for Borrowers and Sellers</strong></h2>
        <p>Navigating the world of mortgages can sometimes feel like treading through treacherous waters. But, understanding the options available can mean the difference between a stressful journey and smooth sailing. One such avenue available is the 2-1 Temporary Rate Buydown, an innovative program designed to benefit both sellers and borrowers. Let’s break it down.</p>
        <p>&nbsp;</p>
        <h2><strong>What is a Temporary Rate Buydown?</strong></h2>
        <p>A Temporary Rate Buydown is an offering that allows borrowers to lower their interest rate for the initial 12 to 36 months of their mortgage. Think of it as an introductory rate to help homeowners ease into their mortgage responsibilities.</p>
        <p>&nbsp;</p>
        <h2><strong>There are two primary options to fund this buydown:</strong></h2>
        <p>Seller-Paid Buydown: Here, any seller concessions can be directed to cover the upfront fee associated with the temporary rate buydown.</p>
        <p>Lender-Paid LLPA Option: This option caters to covering the buydown cost when it’s lender-financed.</p>
        <p>&nbsp;</p>
        <h2><strong>Who stands to benefit?</strong></h2>
        <p>Borrowers who either have seller concessions at their disposal or are keen on benefiting from a reduced interest rate during the onset of their mortgage are the primary beneficiaries. Notably, the borrower needs to qualify based on the initial note rate, ensuring their ability to manage the payments once the buydown period concludes.</p>
        <p>&nbsp;</p>
        <h2><strong>Why Consider a Temporary Rate Buydown?</strong></h2>
        <p>Seller Advantage: It’s a remarkable tool for sellers, especially if they’re having difficulty moving a property. By offering a temporary rate buydown, sellers can make their property more enticing without tampering with the listed price. It’s particularly useful in a market scenario where interest rates are soaring.</p>
        <p>&nbsp;</p>
        <h3><strong>Untapped Potential:</strong></h3>
        <p>Often, borrowers don’t fully utilize their seller concessions. This buydown provides an avenue to maximize these concessions to the borrower’s advantage.</p>
        <p>&nbsp;</p>
        <h3><strong>Immediate Savings:</strong></h3>
        <p>A reduced interest rate, even if only for 1-3 years, equates to lower monthly payments. This immediate relief can help the borrower manage other costs associated with moving into a new home.</p>
        <p>Invest in the Home: With the money saved from lowered monthly payments, borrowers have the flexibility to invest in their new property. Whether it’s sprucing up the kitchen, adding a fresh coat of paint, or purchasing that dream couch, the possibilities are endless.</p>
        <p>&nbsp;</p>
        <h3><strong>Future Refinancing Prospects:</strong></h3>
        <p>In situations where the prevailing interest rates are high, the odds are favorable that borrowers might secure a refinancing deal at a rate lower than the one they’d transition to post the buydown period.</p>
        <p>&nbsp;</p>
        <h3><strong>Smooth Transition:</strong></h3>
        <p>For those transitioning from renting to buying, the initial reduced payments make the shift more manageable. It’s a cushioned start to the homeownership journey.</p>
        <p>&nbsp;</p>
        <h2><strong>In conclusion:</strong></h2>
        <p>The 2-1 Temporary Rate Buydown is a mutually beneficial program that can substantially improve the homeownership experience. It’s a strategic tool in the mortgage world that, when used judiciously, can pave the way for a secure and financially sound future.</p>
  `,
  },
  {
    title: "Unlock Homeownership with Lock It Lending's 1% Down Program",
    slug: 'Unlock-Homeownership-with-Lock-It-Lendings-1-percent-Down-Program',
    author: 'admin',
    tags: ['1%', 'Purchase', 'Rates'],
    readTime: '2 min read',
    date: '2024-05-13',
    excerpt:
      'Conventional 1% Down: Making Homeownership More Accessible. In the realm of homeownership, one of the...',
    mediaType: 'image',
    thumbnailUrl: `${process.env.PUBLIC_URL}/Conventional1Down.png`,
    content: `<h2><strong>Conventional 1% Down: Making Homeownership More Accessible</strong></h2>
<p>At Lock It Lending, we’re passionate about making homeownership accessible. That’s why we’re proud to offer an incredible opportunity for eligible buyers: the 1% Down Program. This program allows qualified homebuyers to put just 1% down, with lender contributing an additional 2% (up to $7,000) helping you secure a 3% total down payment toward your dream home. </p>
<p>&nbsp;</p>
<p>Whether you’re a first-time buyer or someone looking for an affordable path to owning a home, our 1% Down Program is designed to help you save money and move in sooner.</p>
<p>&nbsp;</p>
<h2><strong>What is the 1% Down Payment Assistance Program? </strong></h2>
<p>The 1% Down Program by Lock It Lending provides eligible homebuyers with a unique opportunity to put just 1% down on their new home. But that's not all, we cover an additional 2% <strong>up to $7,000</strong>, bringing the total down payment to 3%. This program is perfect for those who want to save money for other expenses like furniture, move-in costs, or unexpected fees. </p>
<p>&nbsp;</p>
<h2><strong>Eligibility Guidelines</strong></h2>
<p>To qualify for this incredible program, you must meet the following criteria:</p>
<p><strong>Income:</strong> Your income should be at or below 80% of the Area Median Income (AMI).<br><strong>Purchase Type:</strong> This program is for purchase transactions only.<br><strong>Loan-to-Value (LTV):</strong> The loan must have a 97% LTV; UWM will cover the lesser of 2% or up to $7,000 of the total 3% down payment.<br><strong>Credit Score:</strong> A minimum FICO score of 620 is required.<br><strong>Down Payment:</strong> The borrower is responsible for paying 1% of the down payment (or the remaining down payment needed if 2% exceeds $7,000).<br><strong>Loan Limits:</strong> The program is available up to conforming loan limits.<br><strong>Eligibility Check:</strong> Use LPA or DU to determine eligibility.<br><strong>Program Guidelines:</strong> The program follows Home Possible® and HomeReady® guidelines.</p>
<p>&nbsp;</p>
<h2><strong>Why Choose Lock It Lending's 1% Down Program?</strong></h2>
<h3><strong>Affordable Homeownership</strong></h3>
<p>With the 1% Down Program, you can own a home with a significantly lower upfront cost. This makes homeownership more accessible and affordable, allowing you to keep more money in your pocket for other essential expenses.</p>
<h3><strong>Financial Flexibility</strong></h3>
<p>By covering a substantial portion of the down payment, we give you the financial flexibility to focus on other important aspects of your move, such as furnishing your new home or covering moving expenses.</p>
<h3><strong>Expert Support</strong></h3>
<p>Our team at Lock It Lending is dedicated to guiding you through the homebuying process. We ensure that you understand every step and feel confident in your decision to become a homeowner.</p>
<p>&nbsp;</p>
<h2><strong>Take the First Step Towards Homeownership</strong></h2>
<p>Don’t let the down payment be a barrier to your homeownership dreams. Contact Lock It Lending today to learn more about our 1% Down Program and how we can help you achieve your goal of owning a home. Our expert team is here to support you every step of the way. </p>`,
    isExpired: true,
  },
];
