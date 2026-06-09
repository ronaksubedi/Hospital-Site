import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-blue-500 font-semibold uppercase tracking-widest text-sm mb-3">
          Welcome to Meddical
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          A Great Place to Receive Care
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat
          scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit
          nascetur proin massa in. Consequat faucibus porttitor enim et.
        </p>
        <Link to="/about" className="mt-8 text-blue-500 font-semibold flex items-center gap-2 mx-auto hover:gap-4 transition-all w-fit">
          Learn More →
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSection;