
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Hash, 
  FileText,
  Users,
  Award,
  Link,
  Search,
  Download,
  Eye
} from 'lucide-react';
import { blockchainVerificationService, BlockchainTransaction, DigitalCertificate, AuditRecord, WorkerFeedback } from '@/services/blockchain-verification.service';
import { toast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

const BlockchainVerificationCenter = () => {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [certificates, setCertificates] = useState<DigitalCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [verificationHash, setVerificationHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  useEffect(() => {
    fetchBlockchainData();
  }, []);

  const fetchBlockchainData = async () => {
    try {
      setLoading(true);
      const [transactionsData, certificatesData] = await Promise.all([
        blockchainVerificationService.getTransactions(),
        blockchainVerificationService.getCertificates()
      ]);

      setTransactions(transactionsData);
      setCertificates(certificatesData);
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
      toast({
        title: 'Error loading blockchain data',
        description: 'Failed to load verification data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyTransaction = async () => {
    if (!verificationHash.trim()) {
      toast({
        title: 'Invalid hash',
        description: 'Please enter a valid transaction hash',
        variant: 'destructive'
      });
      return;
    }

    try {
      const result = await blockchainVerificationService.verifyTransaction(verificationHash);
      setVerificationResult(result);
      
      if (result.verified) {
        toast({
          title: 'Verification successful',
          description: 'Transaction verified on blockchain',
        });
      } else {
        toast({
          title: 'Verification failed',
          description: 'Transaction could not be verified',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Verification error',
        description: 'Failed to verify transaction. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'certification': return <Award className="h-4 w-4" />;
      case 'audit': return <FileText className="h-4 w-4" />;
      case 'worker_feedback': return <Users className="h-4 w-4" />;
      case 'compliance_report': return <Shield className="h-4 w-4" />;
      default: return <Link className="h-4 w-4" />;
    }
  };

  const transactionTypeData = transactions.reduce((acc, transaction) => {
    const type = transaction.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(transactionTypeData).map(([type, count]) => ({
    name: type.replace('_', ' '),
    value: count,
    color: getColorForType(type)
  }));

  function getColorForType(type: string): string {
    const colors: Record<string, string> = {
      certification: '#22c55e',
      audit: '#3b82f6',
      worker_feedback: '#f59e0b',
      compliance_report: '#8b5cf6',
      supply_transfer: '#ec4899'
    };
    return colors[type] || '#6b7280';
  }

  const verificationScoreData = transactions.map(t => ({
    id: t.id.slice(-6),
    score: Math.round(t.verificationScore * 100)
  })).slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Blockchain Verification Center
          </h2>
          <p className="text-muted-foreground">Immutable records and digital certificates for supply chain transparency</p>
        </div>
        <Button onClick={fetchBlockchainData} disabled={loading}>
          Refresh Data
        </Button>
      </div>

      {/* Verification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <h3 className="text-2xl font-bold">{transactions.length}</h3>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Hash className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="default" className="text-xs">
                {transactions.filter(t => t.verified).length} Verified
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Digital Certificates</p>
                <h3 className="text-2xl font-bold">{certificates.length}</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="default" className="text-xs bg-green-500">
                {certificates.filter(c => c.verified).length} Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Verification Score</p>
                <h3 className="text-2xl font-bold">
                  {transactions.length > 0 ? Math.round(transactions.reduce((acc, t) => acc + t.verificationScore, 0) / transactions.length * 100) : 0}%
                </h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                High Integrity
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Immutable Records</p>
                <h3 className="text-2xl font-bold">{transactions.filter(t => t.immutable).length}</h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                Tamper-Proof
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Tool */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Transaction Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter transaction hash (0x...)"
              value={verificationHash}
              onChange={(e) => setVerificationHash(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleVerifyTransaction}>
              <Search className="h-4 w-4 mr-2" />
              Verify
            </Button>
          </div>
          
          {verificationResult && (
            <div className={`p-4 rounded-lg border ${verificationResult.verified ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                {verificationResult.verified ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">
                  {verificationResult.verified ? 'Transaction Verified' : 'Verification Failed'}
                </span>
              </div>
              {verificationResult.details && (
                <div className="text-sm text-muted-foreground">
                  <pre className="bg-background p-2 rounded text-xs overflow-x-auto">
                    {JSON.stringify(verificationResult.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="worker-voice">Worker Voice</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-full bg-primary/10">
                        {getTransactionTypeIcon(transaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold capitalize">{transaction.type.replace('_', ' ')}</h4>
                          <Badge variant={transaction.verified ? 'default' : 'destructive'}>
                            {transaction.verified ? 'Verified' : 'Unverified'}
                          </Badge>
                          <Badge variant="outline">
                            {Math.round(transaction.verificationScore * 100)}% Score
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <span className="font-medium">Hash:</span>
                            <p className="font-mono text-xs break-all">{transaction.hash}</p>
                          </div>
                          <div>
                            <span className="font-medium">Entity:</span>
                            <p>{transaction.entityType} ({transaction.entityId})</p>
                          </div>
                        </div>
                        {transaction.data && Object.keys(transaction.data).length > 0 && (
                          <div className="bg-muted p-2 rounded text-xs">
                            <span className="font-medium">Data:</span>
                            <pre className="mt-1 overflow-x-auto">
                              {JSON.stringify(transaction.data, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-1">
                        {transaction.immutable && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Immutable
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <div className="grid gap-4">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-full bg-green-100">
                        <Award className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold capitalize">{certificate.type.replace('_', ' ')}</h4>
                          <Badge variant={certificate.verified ? 'default' : 'destructive'}>
                            {certificate.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <span className="font-medium">Issued by:</span>
                            <p>{certificate.issuerName}</p>
                          </div>
                          <div>
                            <span className="font-medium">Recipient:</span>
                            <p>{certificate.recipientName}</p>
                          </div>
                          <div>
                            <span className="font-medium">Valid Period:</span>
                            <p>{new Date(certificate.validFrom).toLocaleDateString()} - {new Date(certificate.validUntil).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">Blockchain Hash:</span>
                            <p className="font-mono text-xs break-all">{certificate.blockchainHash}</p>
                          </div>
                        </div>
                        {certificate.criteria.length > 0 && (
                          <div>
                            <p className="text-sm font-medium mb-2">Certification Criteria:</p>
                            <div className="space-y-1">
                              {certificate.criteria.map((criterion, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span>{criterion.criterion}</span>
                                  <Badge 
                                    variant={
                                      criterion.status === 'passed' ? 'default' : 
                                      criterion.status === 'failed' ? 'destructive' : 
                                      'secondary'
                                    }
                                    className="text-xs"
                                  >
                                    {criterion.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm" className="mb-2">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Types</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Scores</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{}}>
                  <BarChart data={verificationScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="#0ea5e9" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Blockchain Health Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">99.8%</div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">1.2s</div>
                  <p className="text-sm text-muted-foreground">Avg Verification Time</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">256-bit</div>
                  <p className="text-sm text-muted-foreground">Encryption</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">0</div>
                  <p className="text-sm text-muted-foreground">Failed Verifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="worker-voice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Worker Feedback Blockchain Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Worker feedback submitted through our platform is automatically recorded on the blockchain 
                to ensure transparency and prevent tampering.
              </p>
              <div className="space-y-3">
                {transactions
                  .filter(t => t.type === 'worker_feedback')
                  .map((feedback) => (
                    <div key={feedback.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Anonymous Feedback</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(feedback.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Facility:</span> {feedback.entityId}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Verification Score:</span> {Math.round(feedback.verificationScore * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 font-mono">
                        Hash: {feedback.hash}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockchainVerificationCenter;
