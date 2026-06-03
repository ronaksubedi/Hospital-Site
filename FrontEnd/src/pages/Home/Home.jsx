import HeroSection from "./sections/HeroSection";
import WelcomeSection from "./sections/WelcomeSection";
import ServicesSection from "./sections/ServicesSection";
import DoctorsSection from "./sections/DoctorsSection";
import StatsSection from "./sections/StatsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <WelcomeSection />
      <ServicesSection />
      <StatsSection />
      <DoctorsSection />
    </div>
  );
};

export default Home;