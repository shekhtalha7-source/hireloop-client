

"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

import type { auth } from "@/lib/auth";

// Create authentication client
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

// Export authentication methods
export const { signIn, signUp, useSession } = authClient;

