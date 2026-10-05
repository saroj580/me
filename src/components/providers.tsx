"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Client-side providers wrapper.
 * Add any future context providers here (ThemeProvider, QueryClient, etc.)
 */
export default function Providers({ children }: ProvidersProps) {
  return <TooltipProvider delay={300}>{children}</TooltipProvider>;
}
