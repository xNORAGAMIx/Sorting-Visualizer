import Header from "./components/header";
import HeroSection from "./components/heroSection";

const App = () => {
  return (
    <div className="min-h-screen text-white bg-white dark:bg-[#0f0f0f] transition-all duration-300">
      {/* Gradient Overlay */}

      <div>
        {/* Header */}
        <header className="w-full mx-auto px-2 sm:px-4  pt-4">
          <Header />
        </header>

        {/* Hero Section */}
        <main className="w-full px-2 sm:px-2 lg:px-2 py-6">
          <HeroSection />
        </main>
      </div>
    </div>
  );
};

export default App;
