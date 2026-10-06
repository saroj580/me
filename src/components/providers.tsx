"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ModalProvider } from "@/contexts/ModalContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TooltipProvider delay={300}>
      <ModalProvider>{children}</ModalProvider>
    </TooltipProvider>
  );
}
