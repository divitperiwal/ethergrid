import { Navbar, Welcome, Transactions, Footer } from "@/components/index";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-16 lg:pt-4">
        <Welcome />
        <Transactions />
        <Footer />  
      </div>
    </div>
  );
};

export default HomePage;
