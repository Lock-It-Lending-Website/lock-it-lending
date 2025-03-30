import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FullRefinanceForm from "../components/FullRefinanceForm";

export default function Refinance() {
  return (
    <div className="home-page font-sans">
      <Header />

      <main className="main-content">
          <HeroSection
            title="Rate / Term Refinancing And"
            highlight="Cash Out"
            description="If you are wondering about your mortgage loan and if you can get a better deal, you can remove all of the uncertainty in just a few moments by getting the facts from one of our loan experts."
            image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Refinance.png`}
          />
        <FullRefinanceForm />
      </main>

      <Footer />
    </div>
  );
}
