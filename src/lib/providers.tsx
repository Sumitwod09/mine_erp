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
  COMPANIES,
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

// Plan order for comparison
const PLAN_ORDER: Record<Company["plan"], number> = {
  starter: 0,
  professional: 1,
  enterprise: 2,
};

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [companyModules, setCompanyModules] = useState<CompanyModule[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("verp_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // ignore
      }
    }
    const storedModules = localStorage.getItem("verp_modules");
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
    localStorage.setItem("verp_user", JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("verp_user");
    localStorage.removeItem("verp_modules");
  };

  const toggleModule = (moduleId: string) => {
    setCompanyModules((prev) => {
      // Find the module to check if it's available in current plan
      const module = MODULES.find((m) => m.id === moduleId);
      if (!module) return prev;

      // Get current user's company plan
      const userCompanyPlan = user?.company_id
        ? COMPANIES.find((c) => c.id === user.company_id)?.plan
        : "starter"; // default to starter if no user

      const moduleRequiredPlan = module.requiredPlan ?? "starter";
      const isAvailable =
        PLAN_ORDER[userCompanyPlan] >= PLAN_ORDER[moduleRequiredPlan];

      // Only allow toggling if module is available in current plan
      if (!isAvailable) return prev;

      const updated = prev.map((cm) =>
        cm.module_id === moduleId ? { ...cm, is_active: !cm.is_active } : cm
      );
      localStorage.setItem("verp_modules", JSON.stringify(updated));
      return updated;
    });
  };

  // Compute active modules based on stored toggles and plan availability
  const activeModules = MODULES.filter((m) => {
    const stored = companyModules.find((cm) => cm.module_id === m.id);
    const isEnabled = stored ? stored.is_active : false;

    // Get current user's company plan
    const userCompanyPlan = user?.company_id
      ? COMPANIES.find((c) => c.id === user.company_id)?.plan
      : "starter";

    const moduleRequiredPlan = m.requiredPlan ?? "starter";
    const isAvailable =
      PLAN_ORDER[userCompanyPlan] >= PLAN_ORDER[moduleRequiredPlan];

    return isEnabled && isAvailable;
  });

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
