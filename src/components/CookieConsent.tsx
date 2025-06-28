
import React, { useState, useEffect } from 'react';
import { X, Info, Check, ShieldAlert, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Toggle } from '@/components/ui/toggle';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

export type CookieCategory = {
  id: string;
  name: string;
  description: string;
  required?: boolean;
};

export type CookieConsentOptions = {
  categories: CookieCategory[];
  position?: 'bottom' | 'bottom-left' | 'bottom-right';
  companyName?: string;
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;
  theme?: 'light' | 'dark' | 'system';
  showToggleAll?: boolean;
};

export type CookieConsentSettings = {
  [categoryId: string]: boolean;
};

const defaultCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Necessary',
    description: 'These cookies are essential for the website to function properly.',
    required: true,
  },
  {
    id: 'preferences',
    name: 'Preferences',
    description: 'These cookies remember your preferences and settings.',
  },
  {
    id: 'statistics',
    name: 'Statistics',
    description: 'These cookies collect information about how you use the website.',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'These cookies track your online activity to help advertisers deliver more relevant ads.',
  },
];

export const CookieConsent: React.FC<{
  options?: CookieConsentOptions;
  onAccept?: (settings: CookieConsentSettings) => void;
}> = ({ 
  options = { categories: defaultCategories },
  onAccept,
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  const categories = options.categories || defaultCategories;
  
  const form = useForm<{ consent: CookieConsentSettings }>({
    defaultValues: {
      consent: categories.reduce((acc, category) => {
        acc[category.id] = !!category.required;
        return acc;
      }, {} as CookieConsentSettings),
    },
  });

  useEffect(() => {
    // Check if consent has been given before
    const consentSettings = localStorage.getItem('cookieConsent');
    if (!consentSettings) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = categories.reduce((acc, category) => {
      acc[category.id] = true;
      return acc;
    }, {} as CookieConsentSettings);
    
    saveConsent(allConsent);
  };

  const handleAcceptSelected = (settings: { consent: CookieConsentSettings }) => {
    saveConsent(settings.consent);
  };

  const handleRejectAll = () => {
    const minimalConsent = categories.reduce((acc, category) => {
      acc[category.id] = !!category.required;
      return acc;
    }, {} as CookieConsentSettings);
    
    saveConsent(minimalConsent);
  };

  const saveConsent = (settings: CookieConsentSettings) => {
    localStorage.setItem('cookieConsent', JSON.stringify(settings));
    
    if (onAccept) {
      onAccept(settings);
    }
    
    setShowBanner(false);
    setShowDetails(false);
    
    toast({
      title: "Preferences saved",
      description: "Your cookie preferences have been saved.",
    });
  };

  const positionClasses = {
    'bottom': 'bottom-0 left-0 right-0',
    'bottom-left': 'bottom-4 left-4 max-w-md',
    'bottom-right': 'bottom-4 right-4 max-w-md',
  };

  const toggleAll = (value: boolean) => {
    const updatedConsent = { ...form.getValues().consent };
    
    categories.forEach(category => {
      if (!category.required) {
        updatedConsent[category.id] = value;
      }
    });
    
    form.setValue('consent', updatedConsent);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      <div 
        className={`fixed z-50 p-4 shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg ${positionClasses[options.position || 'bottom']}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Cookie Preferences</h3>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowBanner(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          We use cookies to improve your experience on our site. By clicking "Accept All", you consent to our use of cookies. 
          You can manage your preferences by clicking "Customize".
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleRejectAll}
          >
            Reject All
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(true)}
          >
            Customize
          </Button>
          <Button 
            size="sm"
            onClick={handleAcceptAll}
          >
            Accept All
          </Button>
        </div>
      </div>

      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="w-full sm:max-w-md overflow-auto">
          <SheetHeader>
            <SheetTitle>Cookie Preferences</SheetTitle>
            <SheetDescription>
              Customize which cookies you want to accept. Necessary cookies can't be disabled as they are required for the website to function properly.
            </SheetDescription>
          </SheetHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAcceptSelected)} className="space-y-6 py-6">
              {options.showToggleAll && (
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium">Toggle all non-essential cookies</span>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleAll(false)}
                    >
                      Off
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleAll(true)}
                    >
                      On
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {categories.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name={`consent.${category.id}`}
                    render={({ field }) => (
                      <FormItem className="space-y-2 border-b pb-4">
                        <div className="flex items-center justify-between">
                          <FormLabel className="font-medium flex items-center gap-2">
                            {category.name}
                            {category.required && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Required</span>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={category.required}
                            />
                          </FormControl>
                        </div>
                        <FormDescription className="text-xs">
                          {category.description}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex justify-between pt-4 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRejectAll}
                >
                  Reject All
                </Button>
                <Button type="submit">
                  Save Preferences
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};
