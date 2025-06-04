import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { LogOut, UserCircle, Settings, LayoutDashboard, Menu as MenuIcon } from 'lucide-react'; // Example icons

interface NavItem {
  label: string;
  href: string;
  icon?: React.ElementType; // Lucide icon component
}

interface User {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

interface NavigationMenuProps {
  user?: User;
  navItems?: NavItem[];
  appName?: string;
  onLogout?: () => void;
}

const defaultNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/profile", icon: UserCircle },
  { label: "Settings", href: "/settings", icon: Settings },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  user,
  navItems = defaultNavItems,
  appName = "App",
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  console.log("Rendering NavigationMenu for user:", user?.name);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 font-bold text-xl text-indigo-600 dark:text-indigo-400">
              {appName}
            </Link>
            {/* Desktop Menu */}
            <div className="hidden md:ml-10 md:flex md:items-baseline md:space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`
                  }
                >
                  {item.icon && <item.icon className="inline-block h-5 w-5 mr-1 -mt-0.5" />}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* User Avatar & Dropdown or Login Button */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name || 'User Avatar'} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                      {user.email && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {onLogout && (
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open main menu"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state. */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`
                }
              >
                {item.icon && <item.icon className="inline-block h-5 w-5 mr-2" />}
                {item.label}
              </NavLink>
            ))}
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={user.name || 'User Avatar'} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">{user.name || "User"}</div>
                  {user.email && <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>}
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/profile">
                        <UserCircle className="mr-2 h-4 w-4" /> Profile
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                </Button>
                {onLogout && (
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { onLogout(); setMobileMenuOpen(false); }}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                )}
              </div>
            </div>
          )}
          {!user && (
             <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700 px-5">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Log In</Button>
                </Link>
             </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;