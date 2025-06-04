export interface ResourceArticle {
  title: string;
  slug: string;
  author: string;
  tags: string[];
  readTime: string;
  date: string;
  excerpt: string;
  mediaType?: "image" | "video";
  mediaUrl?: string;
  thumbnailUrl: string;
  content?: string;
}

export const resourcesData: ResourceArticle[] = [
  {
    title: '5% Down Payment Assistance Program Review',
    slug: '5%-down-payment-assistance-program-review',
    author: 'Hanh Dao',
    tags: ['Purchase', 'RedFind'],
    readTime: '15 mins read',
    date: '2025-06-02',
    excerpt:
      'Learn how to protect yourself from Predatory Lending from Scotsman Guide Rising Star Hanh Dao...',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/embed/aSakKrb4fE8',
    thumbnailUrl: `${process.env.PUBLIC_URL}/DPA-review.jpg`,
    content: `<p class="chakra-text css-2a5fp1">This training video details a lender's in-house down payment assistance program for FHA loans. The program offers two options: 3.5% assistance covering the down payment, or 5% assistance covering both the down payment and some closing costs. A minimum 600 credit score is required, but there's no income limit, and buyers don't need to be first-time homebuyers. The assistance can be combined with seller credits (up to 6% for FHA loans), potentially resulting in money back at closing. Two types of second liens are available: a forgivable option after 30 years of homeownership, and a repayable option over 5 or 10 years. The repayable option results in a small additional monthly payment. The video uses a case study of a buyer who received $1,065 back at closing after utilizing both down payment assistance and seller credits to cover closing costs and back taxes. The program's processing time is approximately 3-4 weeks, and borrowers must complete a homebuyer education course. While the 3.5% option is more lenient regarding repayment, both options are available depending on the borrower's needs and financial situation. The video emphasizes the importance of clear communication with clients and realtors to maximize the benefits of the program.</p>
              <h2><strong>What is a Down Payment Assistance (DPA) Program?</strong></h2>
              <p>Down Payment Assistance programs help homebuyers cover the initial costs of purchasing a home. These programs may offer grants, forgivable loans, or repayable second liens that offset the required down payment and sometimes closing costs.</p>
              <p>&nbsp;</p>

              <h2><strong>Who qualifies for Down Payment Assistance?</strong></h2>
              <p>Eligibility varies by program, but most require a minimum credit score of 600. There are typically no income limits, and buyers do not need to be first-time homebuyers to qualify.</p>
              <p>&nbsp;</p>

              <h2><strong>What types of Down Payment Assistance are available?</strong></h2>
              <p>There are two main types:</p>
              <p><strong>Forgivable Loans:</strong> These loans are forgiven after a specified term (usually 30 years) if the borrower remains in the home.</p>
              <p><strong>Repayable Loans:</strong> Offered on 5- or 10-year terms, these come with a monthly payment in addition to your mortgage.</p>
              <p>&nbsp;</p>

              <h2><strong>Can I use DPA with an FHA loan?</strong></h2>
              <p>Yes. These programs are often designed to complement FHA loans, helping you meet the 3.5% down payment requirement and even cover some or all closing costs.</p>
              <p>&nbsp;</p>

              <h2><strong>Can DPA cover closing costs?</strong></h2>
              <p>Yes. Programs offering 5% assistance can be used for both the down payment and closing costs, especially when paired with seller credits.</p>
              <p>&nbsp;</p>

              <h2><strong>What’s the difference between 3.5% and 5% assistance?</strong></h2>
              <p>The 3.5% option typically covers only the down payment. The 5% option provides additional funds to help with closing costs, giving buyers more flexibility at closing.</p>
              <p>&nbsp;</p>

              <h2><strong>Do I have to repay the assistance?</strong></h2>
              <p>If the assistance is forgivable, repayment is not required as long as you meet the program conditions (e.g., living in the home for 30 years). Repayable options involve scheduled payments or a lump sum upon sale or refinance.</p>
              <p>&nbsp;</p>

              <h2><strong>Can I combine DPA with other credits or programs?</strong></h2>
              <p>Yes. Down payment assistance can be combined with seller credits and rate buydown programs like the 2-1 buydown, maximizing your savings and potentially even resulting in a cash-back scenario at closing.</p>
              <p>&nbsp;</p>

              <h2><strong>Can DPA help me pay off debt or taxes?</strong></h2>
              <p>In some cases, yes. If structured correctly and approved by underwriting, DPA funds and seller credits may be used to pay off back taxes or credit card debt at closing.</p>
              <p>&nbsp;</p>

              <h2><strong>What is the processing time for DPA loans?</strong></h2>
              <p>The typical processing time is 3 to 4 weeks. Timely completion of required steps, including the homebuyer education course, is key to a smooth closing.</p>
              <p>&nbsp;</p>

              <h2><strong>Is this program only for first-time homebuyers?</strong></h2>
              <p>No. While many programs are geared toward first-time buyers, this specific lender's program is open to all eligible borrowers.</p>
              <p>&nbsp;</p>

              <h2><strong>How do seller credits work with DPA?</strong></h2>
              <p>Seller credits can cover up to 6% of the purchase price on FHA loans. These credits can be applied toward closing costs or used with DPA to minimize out-of-pocket expenses.</p>
              <p>&nbsp;</p>

              <h2><strong>What happens if I sell or refinance early?</strong></h2>
              <p>If you received a forgivable loan, selling or refinancing before the forgiveness term ends will trigger repayment. For repayable loans, any outstanding balance must be paid upon sale or refinance.</p>
              <p>&nbsp;</p>

              <h2><strong>Can I use DPA with adjustable-rate or short-term loans?</strong></h2>
              <p>No. This program requires a 30-year fixed loan. If you refinance into a shorter term or an ARM, you must repay the assistance.</p>
              <p>&nbsp;</p>

              <h2><strong>Is there a minimum assistance amount?</strong></h2>
              <p>Yes. The minimum down payment assistance offered is $600, available through either forgivable or repayable options.</p>
              <p>&nbsp;</p>

              <h2><strong>Can I make extra payments on a second lien?</strong></h2>
              <p>Yes. Borrowers can make additional payments to reduce the balance. However, the second lien payment still counts toward the debt-to-income (DTI) calculation for loan qualification.</p>
              <p>&nbsp;</p>

              <h2><strong>Will a second lien affect future financing?</strong></h2>
              <p>It can. For example, in Texas, a home equity line of credit (HELOC) is not allowed if a second lien exists. Borrowers would need to pay off the second lien before opening a HELOC.</p>
              <p>&nbsp;</p>
              `,
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
    title: 'Conventional 1% Down: Making Homeownership More Accessible',
    slug: 'conventional-1-down-making-homeownership-more-accessible',
    author: 'admin',
    tags: ['1%', 'Purchase', 'Rates'],
    readTime: '2 min read',
    date: '2024-05-13',
    excerpt:
      'Conventional 1% Down: Making Homeownership More Accessible. In the realm of homeownership, one of the...',
    mediaType: 'image',
    thumbnailUrl: `${process.env.PUBLIC_URL}/Making-Homeownership-More-Accessible.png`,
    content: `	<h2><strong>Conventional 1% Down: Making Homeownership More Accessible</strong></h2>
<p>In the realm of homeownership, one of the most significant hurdles many prospective homeowners face is the initial down payment. Traditionally, saving for this lump sum can be challenging. But thanks to innovative lending programs, like the “Conventional 1% Down,” there are now alternative avenues for homeownership. Let’s delve into the details and benefits of this groundbreaking initiative.</p>
<p>&nbsp;</p>
<h2><strong>Understanding the Conventional 1% Down Program</strong></h2>
<p>The Conventional 1% Down is a lender-paid down payment assistance grant. It’s designed to pave the way for income-qualified borrowers, making it feasible for them to place just 1% down on their new home. The lender steps in to cover an additional 2% toward the down payment, up to $4,000. This collaboration ensures that borrowers can achieve a total of 3% down, a significant reduction in the initial financial burden.</p>
<p>&nbsp;</p>
<h2><strong>Who Benefits?</strong></h2>
<p>The central theme of this initiative is accessibility. Here’s a look at the advantages:</p>
<p>Democratizing Homeownership: The program is tailored for borrowers with incomes up to 80% of the Area Median Income. This emphasis ensures that more people, especially those in middle and lower income brackets, have a realistic path to homeownership.</p>
<p>Aligned with HomeReady and Home Possible Guidelines: These loans adhere to both the HomeReady and Home Possible guidelines. This alignment is significant as it allows borrowers to capitalize on LLPA (Loan-Level Price Adjustment) caps. The LLPA caps are particularly instrumental in underserved areas, enabling borrowers in these regions to have a fair shot at owning a home.</p>
<p>&nbsp;</p>
<p>A Competitive Edge for Business: For those in the mortgage and real estate sectors, this program can be a game-changer. By offering the Conventional 1% Down product, businesses can stand out, offering something uniquely tailored for affordability. Real estate agents, in particular, can benefit immensely by presenting this option to potential homeowners, ensuring an edge in a competitive market.</p>
<p>&nbsp;</p>
<h2><strong>In Conclusion</strong></h2>
<p>The journey to homeownership, for many, can seem like an insurmountable challenge. With rising property prices and the traditional barriers of hefty down payments, many feel left out of the dream of owning a home. But with initiatives like the Conventional 1% Down, the horizon looks promising. By reducing the financial strain and aligning with established homeownership guidelines, this program is not just a pathway to homeownership; it’s a testament to the industry’s commitment to inclusivity.</p>`,
  },
];
