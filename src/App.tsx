import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import newly generated pages
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";
import UserDashboardPage from "./pages/UserDashboardPage";

import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

// If you have a Homepage or other existing pages, import them here
// import Homepage from "./pages/Homepage"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* If you have a Homepage, it might be the index route: */}
          {/* <Route path="/" element={<Homepage />} /> */}

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password-confirm" element={<PasswordResetConfirmPage />} /> 
          {/* For a real app, /reset-password-confirm might include a token: /reset-password-confirm/:token */}
          
          {/* Application Routes */}
          <Route path="/dashboard" element={<UserDashboardPage />} />
          {/* Add other application routes here, e.g., /profile, /settings */}


          {/* It's good practice to have the index route explicitly defined.
              If no specific Homepage is set up, you might redirect "/" to "/login"
              or show a generic landing page. For now, I'll leave "/" unassigned
              unless a Homepage component is explicitly part of the request.
              If there's no index route, users might see a blank page or NotFound
              if they navigate to "/".
              Consider adding: <Route path="/" element={<LoginPage />} /> if login is the default entry.
          */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;