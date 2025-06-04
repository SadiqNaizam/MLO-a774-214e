import React from 'react';
import NavigationMenu from '@/components/NavigationMenu'; // Custom component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // shadcn Label
// Avatar and DropdownMenu are used within NavigationMenu, direct import might not be needed here
// unless used separately on the page content.
import { useNavigate } from 'react-router-dom';
import { BarChart, DollarSign, Users, Activity } from 'lucide-react';


const UserDashboardPage = () => {
  const navigate = useNavigate();
  console.log('UserDashboardPage loaded');

  const sampleUser = {
    name: 'Demo User',
    email: 'user@example.com',
    avatarUrl: 'https://source.unsplash.com/random/100x100/?portrait', // Placeholder avatar
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Perform actual logout logic (clear token, etc.)
    navigate('/login');
  };
  
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: BarChart },
    { label: "Profile", href: "/profile", icon: Users }, // Assuming a profile page exists or will be added
    { label: "Settings", href: "/settings", icon: Activity }, // Assuming a settings page
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavigationMenu 
        user={sampleUser} 
        appName="MyApplication" 
        onLogout={handleLogout}
        navItems={navItems}
      />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, {sampleUser.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's a quick overview of your account.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">New sign-ups this week</p>
                </CardContent>
            </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account settings and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username-display" className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</Label>
              <p id="username-display" className="text-lg text-gray-900 dark:text-white">{sampleUser.name}</p>
            </div>
             <div>
              <Label htmlFor="email-display" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
              <p id="email-display" className="text-lg text-gray-900 dark:text-white">{sampleUser.email}</p>
            </div>
            <div className="flex space-x-3">
                <Button onClick={() => navigate('/profile')}>View Profile</Button>
                <Button variant="outline" onClick={() => navigate('/settings')}>Account Settings</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Placeholder for other dashboard widgets/content */}
        <p className="text-center text-gray-500 dark:text-gray-400">More dashboard content coming soon...</p>

      </main>
       <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} MyApplication. All rights reserved.
      </footer>
    </div>
  );
};

export default UserDashboardPage;