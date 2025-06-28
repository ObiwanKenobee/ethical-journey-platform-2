
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// Impact stats
const stats = [
  { value: 100, label: "Companies Transformed", suffix: "+" },
  { value: 50, label: "Workers Protected", suffix: "M+" },
  { value: 32, label: "Countries", suffix: "" },
  { value: 95, label: "Risk Reduction", suffix: "%" }
];

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (inView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const ImpactStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-accent/30" ref={ref}>
      <div className="container-tight">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card text-center transform transition-all duration-700",
                inView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                {inView ? (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
