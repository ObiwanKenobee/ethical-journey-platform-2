// File: components/TeamSection.tsx

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const teamMembers = [
  
];

const TeamSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container-tight">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Leadership</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Led by our founder, we're building a team of passionate individuals committed to ending modern slavery through technology and transparency.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={cn(
                "text-center transform transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
            >
              <div className="group">
                {member.image ? (
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 neo">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 neo bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl text-primary/50">Join Us</span>
                  </div>
                )}
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity duration-300">{member.bio}</p>

                {!member.image && (
                  <a href="/join" className="inline-block mt-2 text-sm text-primary hover:underline">
                    Apply Now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
