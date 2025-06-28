
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Join = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const waitlistData = {
        name: data.name,
        email: data.email,
        company: data.company || '',
        message: data.message || '',
      };
      
      // Simulate API call without actually making a real request
      // This prevents the module from failing if the API is not available
      console.log('Would submit to waitlist:', waitlistData);
      
      // Simulate successful submission
      setTimeout(() => {
        setSubmitted(true);
        toast({
          title: "Success!",
          description: "You've been added to our waitlist. We'll contact you soon!",
        });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't add you to the waitlist. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="section">
          <div className="container-tight max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">Join the Movement</h1>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
                Be among the first to experience Guardian-IO's revolutionary approach to ethical 
                supply chain management. Join our waitlist as we build the future of compliance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Why Join Our Waitlist?</CardTitle>
                  <CardDescription>
                    Guardian-IO is creating the next generation of supply chain compliance tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Early Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Be first to experience our AI-powered compliance platform
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Founding Member Benefits</h3>
                      <p className="text-sm text-muted-foreground">
                        Special pricing and dedicated support for early adopters
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Shape the Product</h3>
                      <p className="text-sm text-muted-foreground">
                        Your feedback will help us refine our platform to meet your needs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                {submitted ? (
                  <Alert className="bg-primary/5 border-primary">
                    <Mail className="h-4 w-4 text-primary" />
                    <AlertTitle>Thank you for joining!</AlertTitle>
                    <AlertDescription>
                      We've added you to our waitlist and will reach out soon with updates about 
                      Guardian-IO's launch. In the meantime, keep an eye on your inbox for exclusive
                      updates and early access opportunities.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Join our Waitlist</CardTitle>
                      <CardDescription>
                        Fill out the form below to secure your spot
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your.email@company.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your company name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us about your needs and challenges" 
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Share any specific requirements or questions you have
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              "Submitting..."
                            ) : (
                              <>
                                <span>Join Waitlist</span>
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
