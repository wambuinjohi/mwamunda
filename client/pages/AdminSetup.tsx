import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSetup() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSetup = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Setup failed");
        return;
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="max-w-2xl mx-auto p-8">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>System Setup</CardTitle>
            <CardDescription>Initialize database and seed admin user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">What will happen:</h3>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Create users table in the database</li>
                <li>Seed admin@mwamunda.com user with password: Pass123</li>
                <li>Set admin role</li>
              </ul>
            </div>

            <Button 
              onClick={handleSetup} 
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? "Setting up..." : "Execute Setup"}
            </Button>

            {error && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-800">
                  <strong>Error:</strong> {error}
                </p>
              </div>
            )}

            {result && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 mb-3">
                  <strong>✓ Setup completed successfully!</strong>
                </p>
                <pre className="text-xs bg-white p-3 rounded border border-green-100 overflow-auto max-h-48">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
