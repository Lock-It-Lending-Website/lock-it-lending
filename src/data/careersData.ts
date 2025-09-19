export interface CareerOpportunity {
  title: string;
  subtitle?: string;
  status: string;
  slug: string;
  company: string;
  location: string[];
  type: string;
  postedDate: string;
  summary: string;
  overview: string;
  hideResponsibilitiesTitle?: boolean;
  responsibilities?: string;
  qualifications?: string;
  benefits: string;
  additionalDetail: string;
  content?: string; // full HTML content or markdown
}

export const careersData: CareerOpportunity[] = [
  {
    company: 'Lock It Lending (Powered by Swift Home Loans)',
    title: 'Outbound call Loan Officer- NMLS Required - Leads provided!',
    subtitle: `Company: Lock It Lending (Powered by Swift Home Loans)
    Location: Houston, TX – Westchase Area
    Job Type: Full-Time (In-Person Only)
    schedule: 8 hour shift
    Compensation: Commission-Based | Estimated Annual Earnings: A minimum $36,000.00 – $350,000.00+`,
    status: 'Ongoing',
    summary: `<p>About Lock It Lending
      Lock It Lending, powered by Swift Home Loans, is one of the fastest-growing brokerages in the country. We combine industry-leading tools with a hustle mentality and high-energy culture focused on growth and success. It's not about where you are, it's about who you're with.
      Because of our proprietary technology (for efficiency and speed), low rates due to volume, and relationships with all the top wholesale lenders in the nation, on average, each of our Loan Officers is closing 10+ loans per month.
      Thanks to our proprietary technology, our processors can process 5x faster. Everything is on the cloud, and processors are in control. On average, each of our processors is closing 12+ loans a month.</p>
      <p>• New LOs often close their first loan in the first month.</p>
      <p>• Many reach 5+ closings per month within just 3 months.</p>
      <p>Please check our 1000 5-star reviews on Google and follow us on social media.</p>`,

    slug: 'Mortgage-Loan-Officer',
    location: ['Houston, TX (Westchase area)'],
    type: 'Full-Time, In-Person',
    postedDate: '2025-07-19',
    overview: `Lock It Lending is hiring a driven and motivated Loan Officer to help clients secure fast, competitive mortgage solutions. In this in-person role, you’ll guide borrowers from application to closing, present tailored loan options, and work with our top-tier processing team to ensure smooth, compliant approvals.`,
    responsibilities: `<p>• Make 60+ high-volume outbound calls per day to leads and potential clients (5+ hours on the phone daily).</p>
      <p>• Work inbound leads — we provide unlimited leads to help you succeed quickly.</p>
      <p>• No prior Loan Officer experience required — learn on the job training (no official training) with support from top-producing LOs.</p>
      <p>• Follow up persistently with potential borrowers and present competitive rates and flexible loan options.</p>
      <p>• Saturday availability may be required when needed.</p>
      <p>• Evaluate loan applications and assess creditworthiness.</p>
      <p>• Guide clients through document collection and loan submission.</p>
      <p>• Ensure compliance with all lending laws and TILA regulations.</p>
      <p>• Collaborate with our processing and underwriting teams.</p>
      <p>• Stay up to date with industry guidelines and market trends.</p>
      `,
    qualifications: `<p>• Active NMLS License (Required)</p>
      <p>• Strong work ethic and high determination for growth and success</p>
      <p>• Positive team player</p>
      <p>• Mindset for long term growth — Self driven</p>`,
    benefits: `<p>• Health, Dental & Vision Insurance</p>
      <p>• Life Insurance</p>`,
    additionalDetail: `<p>• This is an in-person role based at our Houston, TX office (Westchase area).</p>
      <p>• This is not a remote position</p>`,
    content: `
      <p>Let’s lock in your next big opportunity.</p>
      <p>Join Lock It Lending and be part of a team driving the future of home financing. Apply now and see what we’re all about.</p>
      `,
  },
  {
    company: 'Lock It Lending (Powered by Swift Home Loans)',
    title: 'Independent Loan Officer (Self-Generated Business)',
    subtitle: `Company: Lock It Lending (Powered by Swift Home Loans)
Location: Remote – Nationwide
Job Type: Independent / 1099`,
    status: 'Ongoing',
    summary: `
   <p>• <strong>Competitive Compensation Structure</strong><br />
Pay only a flat $750 administrative fee per funded loan.<br />
Retain the remainder of your revenue to reinvest in marketing, staffing, and business growth.</p>

<p>• <strong>Top Broker in the Nation</strong><br />
Benefit from best-in-class pricing with access to all major lenders.<br />
Competitive edge in securing favorable loan terms for your clients.</p>

<p>• <strong>Proprietary Technology</strong><br />
Access to a custom-built $4M+ CRM platform designed exclusively for Lock It Lending.<br />
Dedicated software development team continuously enhancing tools with input from our Loan Officers.</p>

<p>• <strong>Nationwide Licensing</strong><br />
Currently licensed in over 40 states, allowing you to serve clients and grow your footprint without restriction.</p>

<p>• <strong>Platform for Growth</strong><br />
Comprehensive infrastructure built to support both individual producers and teams.<br />
Resources and support designed to help Loan Officers achieve scalable, sustainable growth.</p>

      <p>Please check our 1000 5-star reviews on Google and follow us on social media.</p>`,
    slug: 'Independent-Loan-Officer',
    location: ['Remote, Nationwide'],
    type: 'Full-Time, Remote',
    postedDate: '2025-9-18',
    overview: `
    Lock It Lending is seeking experienced, self-generating Independent Loan Officers to join our growing nationwide platform. This role is designed for high-producing professionals who are ready to maximize earnings, access industry-leading technology, and expand their business with the support of one of the top mortgage brokers in the nation.
  `,
    hideResponsibilitiesTitle: true,
    qualifications: `
<p>• Active NMLS license</p>
<p>• Proven history of self-generated production</p>
<p>• Entrepreneurial mindset with a focus on long-term business growth</p>
<p>• Ability to operate independently in a remote environment</p>
  `,
    benefits: `
    <p><strong>Compensation Illustration</strong></p>
    <p>To provide transparency, here is a sample breakdown of potential earnings under our flat-fee structure:</p>
<p>• Loan Amount: $400,000<br />
Compensation: 200 bps ($8,000)<br />
Admin Fee: $750<br />
<strong>Net to Loan Officer: $7,250</strong></p>

<p>• Loan Amount: $600,000<br />
Compensation: 200 bps ($12,000)<br />
Admin Fee: $750<br />
<strong>Net to Loan Officer: $11,250</strong></p>

    <p>This model allows you to keep the majority of your revenue, giving you the flexibility to reinvest in your business and accelerate growth.</p>
  `,
    additionalDetail: `<p>If you are ready to elevate your career and expand your business with the support of a leading mortgage platform, we invite you to connect with us today. Send us an email or schedule a call.</p>`,
    content: `
    <p>At Lock It Lending, we provide more than competitive rates and technology. We offer a true platform for independent Loan Officers to thrive. By minimizing overhead and maximizing resources, we enable our partners to focus on building their business while keeping more of what they earn.</p>
  `,
  },
  {
    company: 'Lock It Lending (Powered by Swift Home Loans)',
    title: 'Mortgage Loan Processor – Processing Experience Required',
    subtitle: `Company: Lock It Lending (Powered by Swift Home Loans)
    Location: Houston, TX – Westchase Area
    Job Type: Full-Time (In-Person Only)
    Schedule: Monday–Friday
    Compensation: A minimum $50,000 and up per year (based on experience and performance)`,
    status: 'Temporarily paused',
    summary: `<p>Lock It Lending, powered by Swift Home Loans, is one of the fastest-growing brokerages in the country. We combine industry-leading tools with a hustle mentality and high-energy culture focused on growth and success. It's not about where you are, it's about who you're with.
    Because of our proprietary technology (for efficiency and speed), low rates due to volume, and relationships with all the top wholesale lenders in the nation, on average, each of our Loan Officers is closing 10+ loans per month.
    Thanks to our proprietary technology, our processors can process 5x faster. Everything is on the cloud, and processors are in control. On average, each of our processors is closing 12+ loans a month.
    Please check our 1,000 5-star reviews on Google and follow us on social media.</p>`,
    slug: 'Mortgage-Loan-Processor',
    location: ['Houston, TX (Westchase area)'],
    type: 'Full-Time, In-Person',
    postedDate: '2025-07-19',
    overview: `We are hiring a motivated and detail-driven Mortgage Loan Processor to join our in-house team. This role is essential to ensuring smooth, efficient, and compliant loan processing from start to finish. You’ll work directly with borrowers, loan officers, and underwriters to keep things moving and get deals to the finish line. This is a full-time, in-person role based at our Houston, TX office.`,
    responsibilities: `<p>• Every file must be worked on daily and documented with notes.</p>
    <p>• Contact every borrower each day unless noted otherwise.</p>
    <p>• Take full ownership of each assigned file — responsible for ensuring fast, smooth closings and a great customer experience.</p>
    <p>• Follow our internal Processing Policy thoroughly.</p>
    <p>• Use strong problem-solving skills and underwriting knowledge to work with Account Executives and underwriters to clear conditions quickly.</p>
    <p>• Monitor timelines to meet expectations: CTC 3 business days before closing, final CD 2 business days before closing.</p>
    <p>• Maintain accurate records and stay organized under pressure.</p>
    <p>• Provide regular updates to clients, loan officers, and internal teams.</p>`,
    qualifications: `<p>• Prior experience in mortgage processing is required.</p>
    <p>• Strong work ethic — no one leaves the office until the job is done.</p>
    <p>• Underwriting knowledge to understand and clear most conditions independently.</p>
    <p>• Excellent communication skills — clear explanations of borrower conditions and realistic expectation setting.</p>
    <p>• Must be able to commute to our Houston, TX office (Westchase area).</p>`,
    benefits: `<p>• 401(k)</p>
    <p>• Health, Dental & Vision Insurance</p>
    <p>• Life Insurance</p>
    <p>• Up to 15 days of PTO</p>`,
    additionalDetail: `<p>• This is an on-site role based in our Houston, TX office (Westchase area).</p>
    <p>• This is not a remote position.</p>`,
    content: `
    <p>Let’s lock in your next big opportunity.</p>
    <p>Join Lock It Lending and be part of a high-performance, all-A-player team driving the future of home financing. Apply now and grow with us.</p>
`,
  },
];
