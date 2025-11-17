import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Plus, Trash2, Eye } from "lucide-react";
import { getStoredUser, clearUser, getAllUsers, User } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getStoredUser();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/admin/login");
    }
  }, [currentUser, navigate]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser, toast]);

  const handleLogout = () => {
    clearUser();
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
    navigate("/admin/login");
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleAddUser = () => {
    navigate("/admin/register");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white pt-32 md:pt-40 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-white/90">Welcome back, {currentUser.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Total Users
                </p>
                <p className="text-4xl font-bold text-primary mt-2">
                  {users.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Admins
                </p>
                <p className="text-4xl font-bold text-secondary mt-2">
                  {users.filter((u) => u.role === "admin").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Last Updated
                </p>
                <p className="text-lg font-semibold text-foreground mt-2">
                  Just now
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-border bg-gray-50">
            <h2 className="text-2xl font-bold text-foreground">Users</h2>
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Add User
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No users found</p>
              <button
                onClick={handleAddUser}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create First User
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">
                          {user.name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-primary/10 text-primary"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-muted-foreground hover:text-foreground"
                            title="View details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"
                            title="Delete user"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              User Details
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground font-medium">ID</p>
                <p className="text-foreground">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Name
                </p>
                <p className="text-foreground">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Email
                </p>
                <p className="text-foreground">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Role
                </p>
                <p className="text-foreground capitalize">
                  {selectedUser.role}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Created
                </p>
                <p className="text-foreground">
                  {new Date(selectedUser.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Last Updated
                </p>
                <p className="text-foreground">
                  {new Date(selectedUser.updated_at).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="w-full px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
