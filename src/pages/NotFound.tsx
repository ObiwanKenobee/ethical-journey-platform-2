
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="container-tight py-20 text-center">
          <div className="glass-card max-w-md mx-auto animate-fade-up">
            <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Oops! The page you're looking for can't be found.
            </p>
            <Link 
              to="/" 
              className="btn-primary inline-flex items-center gap-2 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
