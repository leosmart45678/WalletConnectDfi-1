import { Shield, Lock, CheckCircle } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
        <Shield className="w-8 h-8 text-blue-600" />
        <div>
          <h4 className="font-semibold text-blue-600">256-bit Encryption</h4>
          <p className="text-sm text-blue-500">
            Bank-level security standards
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
        <Lock className="w-8 h-8 text-blue-600" />
        <div>
          <h4 className="font-semibold text-blue-600">Secure Storage</h4>
          <p className="text-sm text-blue-500">
            Your data is never stored
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
        <CheckCircle className="w-8 h-8 text-blue-600" />
        <div>
          <h4 className="font-semibold text-blue-600">Verified Platform</h4>
          <p className="text-sm text-blue-500">
            Trusted by millions of users
          </p>
        </div>
      </div>
    </div>
  );
}
