
import React, { useState } from 'react';
import { useApi, useApiMutation } from '@/hooks/useApi';
import { 
  workforceProgramsService, 
  WorkforceProgram 
} from '@/services/api/workforce.service';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

export const ApiUsageExample: React.FC = () => {
  // Example of using GET API with the hook
  const { 
    data: programsResponse, 
    isLoading, 
    error, 
    refetch 
  } = useApi(
    () => workforceProgramsService.getActivePrograms(),
    {
      onSuccess: (data) => console.log('Successfully fetched programs', data),
      onError: (error) => console.error('Error fetching programs', error)
    }
  );

  // Example of using POST API with the mutation hook
  const { 
    mutate: createProgram, 
    isLoading: isCreating 
  } = useApiMutation(
    (program: Partial<WorkforceProgram>) => workforceProgramsService.create(program),
    {
      onSuccess: () => {
        // After successful creation, refetch the list
        refetch();
      }
    }
  );

  // Example form state
  const [newProgram, setNewProgram] = useState<Partial<WorkforceProgram>>({
    title: '',
    description: '',
    program_type: 'training',
    status: 'planned'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProgram(newProgram);
  };

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <p>Error loading data: {error.message}</p>
          <Button onClick={refetch} variant="outline" className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Workforce Programs</h2>
      
      {/* Form for creating a new program */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Program</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newProgram.title}
                onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={newProgram.description || ''}
                onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Program Type</label>
              <select
                className="w-full p-2 border rounded"
                value={newProgram.program_type}
                onChange={(e) => setNewProgram({...newProgram, program_type: e.target.value})}
              >
                <option value="training">Training</option>
                <option value="certification">Certification</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Program'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Display existing programs */}
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programsResponse?.data?.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                  <Badge variant={
                    program.status === 'active' ? 'default' :
                    program.status === 'inactive' ? 'secondary' : 'outline'
                  }>
                    {program.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{program.description}</p>
                <p className="text-xs mt-2">Type: {program.program_type}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Example of deleting a record
                    if (confirm('Are you sure you want to delete this program?')) {
                      workforceProgramsService.delete(program.id).then(() => refetch());
                    }
                  }}
                >
                  Delete
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    // Example of updating a record
                    const updatedStatus = program.status === 'active' ? 'inactive' : 'active';
                    workforceProgramsService.update(program.id, {
                      status: updatedStatus as WorkforceProgram['status']
                    }).then(() => refetch());
                  }}
                >
                  Toggle Status
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {programsResponse?.data?.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No programs found</p>
            <Button onClick={refetch} variant="outline" className="mt-4">
              Refresh
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
