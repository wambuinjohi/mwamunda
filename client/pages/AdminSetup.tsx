import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSetup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState<any>(null);

  const handleSetup = async () => {
    setLoading(true);
    setStatus("loading");
    setMessage("Setting up system...");

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setDetails(data);

      if (response.ok && data.success) {
        setStatus("success");
        setMessage("System setup completed successfully!");
        toast({
          title: "Success",
          description: "Database initialized and admin user created",
        });
        setTimeout(() => {
          navigate("/admin/login");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Setup failed");
        toast({
          title: "Error",
          description: data.error || "Setup failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred during setup");
      toast({
        title: "Error",
        description: "An error occurred during setup",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">System Setup</h1>
            <p className="text-white/90">
              Initialize database and create admin user
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Welcome!
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                This setup will:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4 list-inside list-disc">
                <li>Create the users table in the database</li>
                <li>Seed admin@mwamunda.com user</li>
                <li>Set password: Pass123</li>
                <li>Assign admin role</li>
              </ul>
            </div>

            {status !== "idle" && (
              <div className="mb-8 p-4 rounded-lg border">
                {status === "loading" && (
                  <div className="flex items-center gap-3 text-blue-600">
                    <Loader className="w-5 h-5 animate-spin" />
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                )}
                {status === "success" && (
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-3 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                )}
              </div>
            )}

            {status === "idle" || status === "error" ? (
              <div className="space-y-4">
                <button
                  onClick={handleSetup}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Setting up..." : "Execute Setup"}
                </button>

                <a href="/admin/login">
                  <button
                    type="button"
                    className="w-full py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all duration-300"
                  >
                    Go to Login
                  </button>
                </a>
              </div>
            ) : status === "success" ? (
              <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Setup complete! Redirecting to login...
                </p>
                <button
                  onClick={() => navigate("/admin/login")}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300"
                >
                  Go to Login
                </button>
              </div>
            ) : null}

            {/* Footer */}
            <div className="text-center mt-6">
              <a
                href="/"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
