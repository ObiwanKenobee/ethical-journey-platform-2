import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser } from '@/services/auth.service';
import { saveOnboardingData } from '@/services/user.service';

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
};

const steps: OnboardingStep[] = [
  {
    id: 'role',
    title: 'Select your role',
    description: 'Choose how you will use Guardian-IO'
  },
  {
    id: 'company',
    title: 'Company details',
    description: 'Tell us about your organization'
  },
  {
    id: 'preferences',
    title: 'Set preferences',
    description: 'Customize your experience'
  },
  {
    id: 'complete',
    title: 'All set!',
    description: 'Your account is ready to use'
  }
];

const roleOptions = [
  {
    id: 'business',
    title: 'Business Owner / Supply Chain Manager',
    description: 'Monitor your supply chain for ethical compliance'
  },
  {
    id: 'compliance',
    title: 'Compliance Officer / ESG Team',
    description: 'Ensure regulatory alignment and mitigate risks'
  },
  {
    id: 'ngo',
    title: 'NGO / Human Rights Watchdog',
    description: 'Monitor corporations and labor practices'
  },
  {
    id: 'government',
    title: 'Government / Regulatory Body',
    description: 'Monitor industry-wide compliance and enforce policies'
  }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { user: userData, error } = await getCurrentUser();
      
      if (error || !userData) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access onboarding",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }
      
      setUserId(userData.id);
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleNextStep = async () => {
    if (currentStep === 0 && !selectedRole) {
      toast({
        title: 'Select a role',
        description: 'Please select your role to continue',
        variant: 'destructive'
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await completeOnboarding();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    if (!userId || !selectedRole) {
      toast({
        title: 'Error',
        description: 'User information is missing',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const { success, error } = await saveOnboardingData(userId, {
        role: selectedRole,
        completed_at: new Date().toISOString()
      });

      if (error) throw error;
      
      if (success) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', selectedRole);
        
        toast({
          title: 'Onboarding complete!',
          description: 'Welcome to Guardian-IO. Your dashboard is ready.'
        });
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: 'Onboarding error',
        description: error instanceof Error ? error.message : 'Failed to complete onboarding',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Role selection
        return (
          <div className="space-y-4">
            {roleOptions.map((role) => (
              <div
                key={role.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedRole === role.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  {selectedRole === role.id && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        
      case 1: // Company details (simplified for demo)
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              For this demo, we're skipping the actual form input.
              In a real application, this would collect company details.
            </p>
            <div className="p-4 border border-dashed rounded-lg bg-muted/50 text-center">
              <p>Company Information Form Placeholder</p>
            </div>
          </div>
        );
        
      case 2: // Preferences (simplified for demo)
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              For this demo, we're skipping preference selection.
              In a real application, this would allow users to set preferences.
            </p>
            <div className="p-4 border border-dashed rounded-lg bg-muted/50 text-center">
              <p>Preferences Selection Placeholder</p>
            </div>
          </div>
        );
        
      case 3: // Completion
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">You're all set!</h3>
            <p className="text-muted-foreground">
              Your Guardian-IO account is ready to use. You can now access your dashboard
              and start building ethical supply chains.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Welcome to Guardian-IO</CardTitle>
          <CardDescription>Let's set up your account in just a few steps</CardDescription>
        </CardHeader>
        
        <div className="px-6">
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex flex-col items-center ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    index < currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : index === currentStep 
                        ? 'border-2 border-primary text-primary' 
                        : 'border-2 border-muted-foreground text-muted-foreground'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-10 h-0.5 sm:w-16 mx-1 ${
                    index < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
          <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>
          
          {renderStepContent()}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          
          <Button onClick={handleNextStep}>
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              'Go to Dashboard'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;
