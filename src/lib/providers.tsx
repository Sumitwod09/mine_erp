"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Role } from "@/lib/data";
import {
  DEMO_USERS,
  MODULES,
  FEATURES,
  DEFAULT_COMPANY_MODULES,
  ROLE_PERMISSIONS,
  type CompanyModule,
} from "@/lib/data";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface ModuleContextValue {
  companyModules: CompanyModule[];
  toggleModule: (moduleId: string) => void;
  activeModules: typeof MODULES;
  visibleFeatures: (moduleId: string) => typeof FEATURES;
  canView: (permissionKey: string) => boolean;
  canEdit: (permissionKey: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const ModuleContext = createContext<ModuleContextValue | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [companyModules, setCompanyModules] = useState<CompanyModule[]>(DEFAULT_COMPANY_MODULES);

  useEffect(() => {
    const stored = localStorage.getItem("lumiere_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    const storedModules = localStorage.getItem("lumiere_modules");
    if (storedModules) {
      try {
        setCompanyModules(JSON.parse(storedModules));
      } catch {
        // ignore
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    const { password: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    localStorage.setItem("lumiere_user", JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lumiere_user");
  };

  const toggleModule = (moduleId: string) => {
    setCompanyModules((prev) => {
      const updated = prev.map((cm) =>
        cm.module_id === moduleId ? { ...cm, is_active: !cm.is_active } : cm
      );
      localStorage.setItem("lumiere_modules", JSON.stringify(updated));
      return updated;
    });
  };

  const activeModules = MODULES.filter((m) =>
    companyModules.find((cm) => cm.module_id === m.id && cm.is_active)
  );

  const visibleFeatures = (moduleId: string) => {
    if (!user) return [];
    return FEATURES.filter((f) => {
      if (f.module_id !== moduleId) return false;
      const perm = ROLE_PERMISSIONS.find(
        (p) => p.role === user.role && p.permission_key === f.permission_key
      );
      return perm?.can_view ?? false;
    });
  };

  const canView = (permissionKey: string): boolean => {
    if (!user) return false;
    const perm = ROLE_PERMISSIONS.find(
      (p) => p.role === user.role && p.permission_key === permissionKey
    );
    return perm?.can_view ?? false;
  };

  const canEdit = (permissionKey: string): boolean => {
    if (!user) return false;
    const perm = ROLE_PERMISSIONS.find(
      (p) => p.role === user.role && p.permission_key === permissionKey
    );
    return perm?.can_edit ?? false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      <ModuleContext.Provider
        value={{ companyModules, toggleModule, activeModules, visibleFeatures, canView, canEdit }}
      >
        {children}
      </ModuleContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AppProviders");
  return ctx;
}

export function useModules() {
  const ctx = useContext(ModuleContext);
  if (!ctx) throw new Error("useModules must be used within AppProviders");
  return ctx;
}
