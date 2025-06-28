
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="section bg-background" ref={ref}>
      <div className="container-tight max-w-4xl">
        <div className={cn(
          "glass-card text-center p-8 md:p-12 transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Guardian-IO</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest insights on ethical supply chains, 
            ESG compliance, and technology innovations.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow h-12"
              />
              <Button 
                type="submit" 
                className={cn(
                  "h-12 px-6 group whitespace-nowrap",
                  isSubmitting && "opacity-80"
                )}
                disabled={isSubmitting}
              >
                <span>Subscribe</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
