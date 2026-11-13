
"use client";

// Import createAuthClient from Better Auth
import { createAuthClient } from "better-auth/react";

// Create ONE authentication client
export const authClient = createAuthClient();

// Export the authentication methods from the same client
export const { signIn, signUp, useSession } = authClient;
