import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, Menu, X, Home, Mail } from "lucide-react";

interface AdminSidebarProps {
  onLogout: () => void;
  userName: string;
}

export default function AdminSidebar({
  onLogout,
  userName,
}: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      id: "users",
      icon: <Users className="w-5 h-5" />,
      label: "Users",
      path: "/admin/dashboard",
    },
    {
      id: "contacts",
      icon: <Mail className="w-5 h-5" />,
      label: "Contacts",
      path: "/admin/contacts",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-border flex items-center px-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="ml-4 font-semibold text-foreground">Admin Portal</span>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border transform transition-transform duration-200 z-40 md:z-auto md:relative md:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-6 border-b border-border mt-16 md:mt-0">
          <Link
            to="/"
            className="text-lg font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Mwamunda Admin
          </Link>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-border">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="font-semibold text-foreground text-sm truncate">
            {userName}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="px-3 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-4 space-y-2">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-foreground transition-all duration-200 w-full"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Offset for Mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
