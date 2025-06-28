import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Network, Database } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Hero() {
  const globeRef = useRef<HTMLDivElement>(null);

  // Simple globe animation logic
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    let rotation = 0;
    const paths = Array.from(globe.querySelectorAll(".trade-route"));
    const animate = () => {
      rotation += 0.1;
      if (globe) {
        globe.style.transform = `rotate(${rotation % 360}deg)`;
      }
      paths.forEach((path, i) => {
        const pathElement = path as SVGPathElement;
        const animDelay = i * 200;
        setTimeout(() => {
          pathElement.style.strokeDashoffset = "0";
        }, animDelay);
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Atlas",
              "url": "https://atlas.com",
              "logo": "https://atlas.com/logo.png",
              "description": "Atlas is a human rights technology platform fighting modern slavery through transparent supply chains, combining AI and human intelligence to protect vulnerable workers worldwide.",
              "sameAs": [
                "https://twitter.com/Atlas",
                "https://www.linkedin.com/company/atlas",
                "https://www.facebook.com/Atlas"
              ]
            }
          `}
        </script>
      </Helmet>
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-accent/20 z-0"></div>

        {/* Globe Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0 animate-spin-slow">
          <div
            ref={globeRef}
            className="relative w-[700px] h-[700px] md:w-[1000px] md:h-[1000px]"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="100"
                cy="100"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <circle
                cx="100"
                cy="100"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
              />

              {/* Trade Routes */}
              <path
                className="trade-route"
                d="M 60,80 Q 100,30 140,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="200"
                strokeDashoffset="200"
              />
              <path
                className="trade-route"
                d="M 40,100 Q 100,170 160,100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="200"
                strokeDashoffset="200"
              />
              <path
                className="trade-route"
                d="M 80,60 Q 100,120 130,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="150"
                strokeDashoffset="150"
              />
            </svg>
          </div>
        </div>

        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block glass px-3 py-1 rounded-full mb-4 animate-fade-down">
              <p className="text-sm font-medium flex items-center justify-center gap-1">
                <Globe className="h-3 w-3 text-primary" />
                <span>Human Dignity</span>
                <span className="mx-1">•</span>
                <Network className="h-3 w-3 text-primary" />
                <span>Transparency</span>
                <span className="mx-1">•</span>
                <Database className="h-3 w-3 text-primary" />
                <span>Change</span>
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up">
              Empowering Ethical Supply Chains with{" "}
              <span className="text-gradient text-[#0a0000]">
                AI & Blockchain
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto animate-fade-up"
              style={{
                animationDelay: "200ms",
              }}
            >
              <strong>24.9 million people</strong> are trapped in modern slavery
              today. Atlas unites technology and humanity to eradicate modern
              slavery, bringing unprecedented transparency to global supply
              chains and protecting vulnerable workers worldwide.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
              style={{
                animationDelay: "300ms",
              }}
            >
              <Link
                to="/platform"
                className="btn-primary flex items-center gap-2 group"
              >
                Discover Our Platform
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/join"
                className="btn-secondary flex items-center gap-2 group"
              >
                Join the Movement
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
      </section>
    </>
  );
}
