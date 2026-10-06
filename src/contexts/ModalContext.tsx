"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import ContactModal from "@/components/shared/ContactModal";
import AllProjectsModal from "@/components/shared/AllProjectsModal";

interface ModalContextType {
  openContact: (subject?: string) => void;
  closeContact: () => void;
  openProjects: () => void;
  closeProjects: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string>(
    "Software Development & Collaboration Inquiry"
  );
  const [projectsOpen, setProjectsOpen] = useState(false);

  const openContact = useCallback((subject?: string) => {
    if (subject) setContactSubject(subject);
    setContactOpen(true);
  }, []);

  const closeContact = useCallback(() => {
    setContactOpen(false);
  }, []);

  const openProjects = useCallback(() => {
    setProjectsOpen(true);
  }, []);

  const closeProjects = useCallback(() => {
    setProjectsOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{ openContact, closeContact, openProjects, closeProjects }}
    >
      {children}
      <ContactModal
        isOpen={contactOpen}
        onClose={closeContact}
        initialSubject={contactSubject}
      />
      <AllProjectsModal isOpen={projectsOpen} onClose={closeProjects} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
