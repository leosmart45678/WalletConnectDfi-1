import { useLocation } from "wouter";
import { TrustBadges } from "@/components/security/trust-badges";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Text3D } from "@/components/animations/text-3d";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLocation("/select-wallet");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <main className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <section className="text-center">
              <Text3D text="WalletConnect" className="mb-4 text-blue-600" />
              <p className="text-xl text-blue-600 mb-8">
                Connect your wallet securely to access Web3 services
              </p>
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="gap-2 relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Get Started</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </section>

            <TrustBadges />
          </div>
        </main>
      </div>
    </div>
  );
}