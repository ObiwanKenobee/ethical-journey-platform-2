
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiService } from '@/services/api.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Save, Trash2 } from 'lucide-react';

// Schema for the data form
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  description: z.string().optional(),
  category: z.string(),
  status: z.enum(['active', 'inactive', 'pending']),
  priority: z.coerce.number().min(1).max(5),
});

type FormValues = z.infer<typeof formSchema>;

// Schema for data parsing
const parseFormSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
  format: z.enum(['json', 'csv', 'xml']),
});

type ParseFormValues = z.infer<typeof parseFormSchema>;

export function ApiDemo() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [operation, setOperation] = useState<'create' | 'edit'>('create');
  const [parsedData, setParsedData] = useState<any>(null);
  const [parseLoading, setParseLoading] = useState(false);
  const { toast } = useToast();
  
  const resource = 'demo_items'; // The resource/table name
  
  // Form setup for CRUD operations
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'general',
      status: 'active',
      priority: 3,
    },
  });
  
  // Form setup for data parsing
  const parseForm = useForm<ParseFormValues>({
    resolver: zodResolver(parseFormSchema),
    defaultValues: {
      content: '',
      format: 'json',
    },
  });
  
  // Load items when component mounts
  useEffect(() => {
    loadItems();
  }, []);
  
  // Update form when selected item changes
  useEffect(() => {
    if (selectedItem) {
      form.reset({
        name: selectedItem.name,
        description: selectedItem.description || '',
        category: selectedItem.category,
        status: selectedItem.status,
        priority: selectedItem.priority,
      });
      setOperation('edit');
    } else {
      form.reset({
        name: '',
        description: '',
        category: 'general',
        status: 'active',
        priority: 3,
      });
      setOperation('create');
    }
  }, [selectedItem, form]);
  
  // Load all items from the API
  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll(resource);
      setItems(data || []);
    } catch (error) {
      toast({
        title: 'Error loading items',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form submission (create or update)
  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      
      if (operation === 'create') {
        await apiService.create(resource, values);
        toast({
          title: 'Item created',
          description: 'The item was successfully created',
        });
      } else {
        await apiService.update(resource, selectedItem.id, values);
        toast({
          title: 'Item updated',
          description: 'The item was successfully updated',
        });
      }
      
      // Reset form and reload items
      form.reset();
      setSelectedItem(null);
      loadItems();
    } catch (error) {
      toast({
        title: `Error ${operation === 'create' ? 'creating' : 'updating'} item`,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle item deletion
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await apiService.delete(resource, id);
      toast({
        title: 'Item deleted',
        description: 'The item was successfully deleted',
      });
      
      // Reset selection if the deleted item was selected
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem(null);
      }
      
      // Reload items
      loadItems();
    } catch (error) {
      toast({
        title: 'Error deleting item',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle data parsing
  const onParseSubmit = async (values: ParseFormValues) => {
    try {
      setParseLoading(true);
      const data = await apiService.parseData(resource, values.content, values.format);
      setParsedData(data);
      toast({
        title: 'Data parsed successfully',
        description: `Converted ${values.format.toUpperCase()} data to structured format`,
      });
    } catch (error) {
      toast({
        title: 'Error parsing data',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setParseLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">API Demo</h2>
        <p className="text-muted-foreground mt-2">
          Test the CRUD operations and data parsing capabilities of the Guardian-IO API
        </p>
      </div>
      
      <Tabs defaultValue="crud" className="space-y-4">
        <TabsList>
          <TabsTrigger value="crud">CRUD Operations</TabsTrigger>
          <TabsTrigger value="parse">Data Parsing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crud" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Item Form */}
            <Card>
              <CardHeader>
                <CardTitle>{operation === 'create' ? 'Create New Item' : 'Edit Item'}</CardTitle>
                <CardDescription>
                  {operation === 'create' 
                    ? 'Add a new item to the database' 
                    : `Editing item: ${selectedItem?.name}`}
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
                            <Input placeholder="Item name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter a description (optional)" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="compliance">Compliance</SelectItem>
                                <SelectItem value="supplier">Supplier</SelectItem>
                                <SelectItem value="risk">Risk</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority (1-5)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              max={5} 
                              placeholder="Priority level" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            1 = Lowest, 5 = Highest
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between pt-2">
                      {operation === 'edit' && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedItem(null)}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {operation === 'create' ? 'Creating...' : 'Updating...'}
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {operation === 'create' ? 'Create Item' : 'Update Item'}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Items List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Items List</CardTitle>
                  <CardDescription>
                    {items.length} items found
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={loadItems} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[500px] overflow-auto pr-2">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <p>No items found</p>
                      <p className="text-sm mt-1">Create your first item using the form</p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="flex p-4">
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {item.description}
                              </p>
                            )}
                            <div className="flex gap-2 mt-2">
                              <div className="text-xs px-2 py-1 rounded bg-muted">
                                {item.category}
                              </div>
                              <div className={`text-xs px-2 py-1 rounded ${
                                item.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : item.status === 'inactive' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.status}
                              </div>
                              <div className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                                Priority: {item.priority}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setSelectedItem(item)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDelete(item.id)}
                              disabled={loading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="parse" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Data Parsing Form */}
            <Card>
              <CardHeader>
                <CardTitle>Parse Data</CardTitle>
                <CardDescription>
                  Convert between different data formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...parseForm}>
                  <form onSubmit={parseForm.handleSubmit(onParseSubmit)} className="space-y-4">
                    <FormField
                      control={parseForm.control}
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Format</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="json">JSON</SelectItem>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="xml">XML</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={parseForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={`Enter ${parseForm.watch('format')} content to parse`} 
                              className="min-h-[200px] font-mono text-sm" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Paste your data in {parseForm.watch('format').toUpperCase()} format
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={parseLoading}>
                      {parseLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Parsing...
                        </>
                      ) : (
                        'Parse Data'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Parsed Data Result */}
            <Card>
              <CardHeader>
                <CardTitle>Parsed Result</CardTitle>
                <CardDescription>
                  The structured data after parsing
                </CardDescription>
              </CardHeader>
              <CardContent>
                {parsedData ? (
                  <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-auto max-h-[300px]">
                    <pre>{JSON.stringify(parsedData, null, 2)}</pre>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                    <p>No parsed data yet</p>
                    <p className="text-sm mt-1">Submit data on the left to see results</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  Parsed data can be used directly in your application or exported to various formats
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
