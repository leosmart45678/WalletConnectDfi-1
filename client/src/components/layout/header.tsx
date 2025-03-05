import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-1"> {/* Reduced gap for closer proximity */}
          <Link href="/" className="flex items-center gap-0">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="h-8 w-auto" 
            />
            <span className="text-xl font-semibold whitespace-nowrap">WalletConnect</span> {/* Added whitespace-nowrap */}
          </Link>

        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-8 w-8 text-blue-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium">
                Home
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About
              </Link>
              <Link href="/faq" className="text-lg font-medium text-blue-600"> {/* Made FAQ link blue */}
                FAQ
              </Link>
              <Link href="/contact" className="text-lg font-medium">
                Support
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <Link href="/faq" className="text-sm font-medium text-blue-600"> {/* Made FAQ link blue */}
            FAQ
          </Link>
          <Link href="/contact" className="text-sm font-medium">
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}