import { Access } from "payload";
 
export const ROLES = {
  SUPER_ADMIN: 0,
  ADMIN: 10,
  CONTENT_MANAGER: 20,
  VIEWER: 30,
  FORM_MANAGER: 40,
  Editor: 50,
} as const;
 
export const hasRole = (
  userRole: string | number | undefined,
  requiredRole: number
) => {
  return Number(userRole) <= requiredRole;
};
 
export const isSuperAdmin: Access = ({ req }) => {
  return Number(req.user?.role) === ROLES.SUPER_ADMIN;
};
 
export const isAdmin: Access = ({ req }) => {
  return Number(req.user?.role) <= ROLES.ADMIN;
};
 
export const isContentManager: Access = ({ req }) => {
  return Number(req.user?.role) <= ROLES.CONTENT_MANAGER;
};
 
export const isViewer: Access = ({ req }) => {
  return Number(req.user?.role) <= ROLES.VIEWER;
};

// 👇 Add it here
export const canEditPages: Access = ({ req }) => {
  return ["0", "10", "20", "50"].includes(req.user?.role as string);
};

// 👇 And this one too
export const isAdminOrSuperAdminOrEditor: Access = ({ req }) => {
  return ["0", "10", "50"].includes(req.user?.role as string);
};


// Form Access Control: Allows Super Admin ("0"), Admin ("10"), and Form Manager ("40")
export const canAccessFormSubmissions: Access = ({ req }) => {
  return ["0", "10", "40"].includes(req.user?.role as string);
};

export const isAdminOrSuperAdmin: Access = ({ req }) => {
  return ["0", "10"].includes(req.user?.role as string);
};
export const isAdminOrSuperAdminOrContentManager: Access = ({ req }) => {
  return ["0", "10", "20"].includes(req.user?.role as string);
};
export const isAdminOrSuperAdminOrContentManagerOrViewer: Access = ({
  req,
}) => {
  return ["0", "10", "20", "30", "50"].includes(req.user?.role as string);
};
