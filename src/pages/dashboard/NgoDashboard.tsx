
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';
import EnterpriseNgoAnalystDashboard from '@/components/dashboard/EnterpriseNgoAnalystDashboard';

const NgoDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await logoutUser();
    
    if (error) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate('/login');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Human Rights Intelligence Center</h1>
          <p className="text-muted-foreground">
            Welcome, {profile?.name || 'Human Rights Analyst'} - Global human rights monitoring and advocacy platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            {profile?.name || 'ngo@demo.com'}
          </span>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      
      <EnterpriseNgoAnalystDashboard />
    </div>
  );
};

export default NgoDashboard;
