import ApisSection from "./ApiSection";
import AuthorSection from "./AuthorSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about__orb" aria-hidden="true" />

      <div className="about__container">
        <HeroSection />
        <FeaturesSection />
        <AuthorSection />
        <ApisSection />
      </div>
    </div>
  );
}

export default About;
