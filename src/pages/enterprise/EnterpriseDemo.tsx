import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2,
  Users,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EnterpriseDemo = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    title: "",
    phone: "",
    employees: "",
    interests: [] as string[],
    message: "",
    preferredTime: "",
  });

  const interests = [
    "AI Risk Engine",
    "Global Intelligence Dashboard",
    "Enterprise Integration Hub",
    "Multi-Tenant Workspace Management",
    "Security & Compliance Center",
    "Custom Enterprise Solutions",
    "ROI Analysis",
    "Implementation Planning",
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send the data to your backend
    console.log("Enterprise demo request:", formData);

    toast({
      title: "Demo Request Submitted",
      description:
        "Our enterprise team will contact you within 24 hours to schedule your personalized demo.",
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      title: "",
      phone: "",
      employees: "",
      interests: [],
      message: "",
      preferredTime: "",
    });
  };

  const demoFeatures = [
    {
      icon: Zap,
      title: "Personalized Demo",
      description:
        "Tailored demonstration based on your specific industry and use cases",
    },
    {
      icon: Clock,
      title: "45-60 Minutes",
      description:
        "Comprehensive walkthrough of enterprise features and capabilities",
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description:
        "Direct access to our enterprise specialists and technical experts",
    },
    {
      icon: Shield,
      title: "Security Deep Dive",
      description:
        "Detailed review of our enterprise-grade security and compliance features",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Enterprise Demo Request | Atlas Platform</title>
        <meta
          name="description"
          content="Request a personalized demo of Atlas enterprise supply chain solutions. Schedule a consultation with our experts."
        />
        <meta
          name="keywords"
          content="enterprise demo, supply chain demo, Atlas enterprise, personalized consultation"
        />
        <link rel="canonical" href="https://atlas.com/enterprise/demo" />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-background to-accent/20">
          <div className="container-tight">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 animate-fade-up">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Enterprise Demo
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-up">
                See Atlas Enterprise{" "}
                <span className="text-gradient">in Action</span>
              </h1>
              <p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                Schedule a personalized demo with our enterprise specialists and
                discover how Atlas can transform your supply chain transparency
                and compliance operations.
              </p>
            </div>

            {/* Demo Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              {demoFeatures.map((feature, index) => (
                <div key={index} className="glass-card text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary mx-auto">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Request Form */}
        <section className="section bg-background">
          <div className="container-tight">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Form */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Request Your Enterprise Demo
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and our enterprise team will
                      contact you within 24 hours to schedule your personalized
                      demonstration.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 md:space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                company: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Job Title *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="employees">Company Size</Label>
                          <Select
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                employees: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-50">
                                1-50 employees
                              </SelectItem>
                              <SelectItem value="51-200">
                                51-200 employees
                              </SelectItem>
                              <SelectItem value="201-1000">
                                201-1,000 employees
                              </SelectItem>
                              <SelectItem value="1001-5000">
                                1,001-5,000 employees
                              </SelectItem>
                              <SelectItem value="5000+">
                                5,000+ employees
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Areas of Interest (select all that apply)</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {interests.map((interest) => (
                            <div
                              key={interest}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={interest}
                                checked={formData.interests.includes(interest)}
                                onCheckedChange={(checked) =>
                                  handleInterestChange(
                                    interest,
                                    checked as boolean,
                                  )
                                }
                              />
                              <Label htmlFor={interest} className="text-sm">
                                {interest}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="preferredTime">
                          Preferred Demo Time
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              preferredTime: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select preferred time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">
                              Morning (9 AM - 12 PM)
                            </SelectItem>
                            <SelectItem value="afternoon">
                              Afternoon (12 PM - 5 PM)
                            </SelectItem>
                            <SelectItem value="evening">
                              Evening (5 PM - 8 PM)
                            </SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your specific requirements, current challenges, or any questions you have..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          rows={4}
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        Request Enterprise Demo
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* What to Expect */}
                <div className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        What to Expect
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Immediate Confirmation
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            You'll receive an instant confirmation email with
                            next steps.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Enterprise Specialist Contact
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Our team will reach out within 24 hours to schedule
                            your demo.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Personalized Demo
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            45-60 minute demo tailored to your specific needs
                            and industry.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Implementation Planning
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Discuss implementation timelines, pricing, and next
                            steps.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        Need Immediate Assistance?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-sm">enterprise@atlas.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="text-sm">+1 (555) 123-4567</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Available Monday-Friday, 9 AM - 6 PM EST
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EnterpriseDemo;
