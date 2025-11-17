import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MessageSquare, Trash2, Eye } from "lucide-react";
import { getStoredUser, clearUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { getAllContacts, Contact, updateContactStatus } from "@/lib/contacts";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminContacts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getStoredUser();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/admin/login");
    }
  }, [currentUser, navigate]);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const fetchedContacts = await getAllContacts();
        setContacts(fetchedContacts);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch contacts";
        console.error("Error fetching contacts:", error);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchContacts();
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

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetails(true);
  };

  const handleStatusChange = async (
    contactId: number | undefined,
    status: string,
  ) => {
    if (!contactId) return;

    try {
      await updateContactStatus(contactId, status);
      setContacts((prev) =>
        prev.map((c) => (c.id === contactId ? { ...c, status } : c)),
      );
      setSelectedContact((prev) => (prev ? { ...prev, status } : null));
      toast({
        title: "Success",
        description: "Contact status updated",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update status";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === "all") return true;
    return contact.status === filter;
  });

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar onLogout={handleLogout} userName={currentUser.name} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Contact Submissions
              </h1>
              <p className="text-white/90">
                Manage and respond to contact inquiries
              </p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Total Submissions
                  </p>
                  <p className="text-4xl font-bold text-primary mt-2">
                    {contacts.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    New
                  </p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">
                    {contacts.filter((c) => c.status === "new").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    In Progress
                  </p>
                  <p className="text-4xl font-bold text-yellow-600 mt-2">
                    {contacts.filter((c) => c.status === "in_progress").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Resolved
                  </p>
                  <p className="text-4xl font-bold text-green-600 mt-2">
                    {contacts.filter((c) => c.status === "resolved").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 flex gap-2 border-b border-border">
            {[
              { value: "all", label: "All" },
              { value: "new", label: "New" },
              { value: "in_progress", label: "In Progress" },
              { value: "resolved", label: "Resolved" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  filter === tab.value
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contacts Section */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">Loading contacts...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  {filter === "all"
                    ? "No contact submissions yet"
                    : `No ${filter} submissions`}
                </p>
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
                        Subject
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-foreground">
                            {contact.name}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground">
                            {contact.email}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground">
                            {contact.subject}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              contact.status === "new"
                                ? "bg-blue-100 text-blue-700"
                                : contact.status === "in_progress"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {contact.status || "new"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground">
                            {contact.created_at
                              ? new Date(
                                  contact.created_at,
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleViewContact(contact)}
                              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-muted-foreground hover:text-foreground"
                              title="View details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              className="p-2 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"
                              title="Delete"
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

        {/* Contact Details Modal */}
        {showDetails && selectedContact && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Contact Details
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Name
                  </p>
                  <p className="text-foreground">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Email
                  </p>
                  <p className="text-foreground">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Phone
                    </p>
                    <p className="text-foreground">{selectedContact.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Subject
                  </p>
                  <p className="text-foreground">{selectedContact.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Message
                  </p>
                  <p className="text-foreground whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Status
                  </p>
                  <div className="flex gap-2 mt-2">
                    {["new", "in_progress", "resolved"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleStatusChange(selectedContact.id, status)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          selectedContact.status === status
                            ? status === "new"
                              ? "bg-blue-100 text-blue-700"
                              : status === "in_progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {status === "in_progress" ? "In Progress" : status}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Submitted
                  </p>
                  <p className="text-foreground">
                    {selectedContact.created_at
                      ? new Date(selectedContact.created_at).toLocaleString()
                      : "N/A"}
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
    </div>
  );
}
