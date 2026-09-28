import type {
  CollectionConfig,
  CollectionBeforeValidateHook,
  CollectionBeforeChangeHook,
} from "payload";
import { isAdminOrSuperAdmin, isSuperAdmin, ROLES } from "@/app/access";
 
interface CustomUser {
  id: string;
  email: string;
  role?: string | number;
}
 
const beforeValidateHook: CollectionBeforeValidateHook = async ({
  data,
  req,
  operation,
}) => {
  if (operation === "create") {
    const { totalDocs } = await req.payload.find({
      collection: "users",
      limit: 1,
    });
 
    // Automatically make the very first user a Super Admin
    if (totalDocs === 0 && data) {
      data.role = "0";
      return data;
    }
  }
  return data;
};
 
const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  const currentTargetRole =
    data?.role !== undefined ? data.role : originalDoc?.role;
  const targetRole = Number(currentTargetRole ?? ROLES.VIEWER);
 
  // CRITICAL RULE: If trying to make a user a Super Admin ("0")
  if (targetRole === 0) {
    // Look for any existing Super Admins in the system
    const { totalDocs: superAdminCount } = await req.payload.find({
      collection: "users",
      where: {
        role: {
          equals: "0",
        },
      },
      limit: 1,
    });
 
    // If a Super Admin already exists in the system...
    if (superAdminCount > 0) {
      // 1. If it's a completely new user creation, block it immediately.
      if (operation === "create") {
        throw new Error("There can only be one Super Admin in the system.");
      }
 
      // 2. If it's an update, only allow it if the user being updated is ALREADY the Super Admin.
      if (operation === "update" && originalDoc?.role !== "0") {
        throw new Error(
          "There can only be one Super Admin in the system. You cannot upgrade another user."
        );
      }
    }
  }
 
  // --- Standard Security Hierarchy Rules below this point ---
 
  const { totalDocs } = await req.payload.find({
    collection: "users",
    limit: 1,
  });
 
  // Bypass standard checks if this is the very first user setup
  if (totalDocs === 0) {
    return data;
  }
 
  const currentUser = req.user as CustomUser | null;
 
  // If there's no logged-in user making this request (e.g., public signup)
if (!currentUser) {
  data.role = "30"; // Viewer

  return data;
}
 
  const currentUserRole = Number(currentUser?.role ?? 999);
 
  // Standard role hierarchy check (cannot assign a role higher than your own)
  if (targetRole < currentUserRole) {
    throw new Error("You cannot assign a role higher than your own.");
  }
 
  return data;
};
 
export const Users: CollectionConfig = {
  access: {
    read: isAdminOrSuperAdmin,
    update: isSuperAdmin,
    delete: isSuperAdmin,
    create: () => true,
  },
  slug: "users",
 
  admin: {
    useAsTitle: "email",
  },
 
  auth: true,
 
  hooks: {
    beforeValidate: [beforeValidateHook],
    beforeChange: [beforeChangeHook],
  },
 
  fields: [
    {
      name: "role",
      label: "Role",
      type: "select",
      required: false,
      defaultValue: "10",
      options: [
        { label: "Super Admin", value: "0" },
        { label: "Admin", value: "10" },
        { label: "Content Manager", value: "20" },
        { label: "Viewer", value: "30" },
        { label: "Form Manager", value: "40"},
        { label: "Editor", value: "50" },
      ],
      admin: {
        condition: (_, __, { user }) => {
          return !!user;
        },
      },
    },
  ],
};