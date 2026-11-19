import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "@/lib/mongodb";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        required: false,
        defaultValue: "seeker",
        input: true,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const requestedRole = user.role;

          if (
            requestedRole !== undefined &&
            requestedRole !== "seeker" &&
            requestedRole !== "recruiter"
          ) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid signup role.",
            });
          }

          return {
            data: {
              ...user,
              role: requestedRole ?? "seeker",
            },
          };
        },
      },

      update: {
        before: async (data) => {
          if ("role" in data) {
            throw new APIError("BAD_REQUEST", {
              message: "You cannot change your role directly.",
            });
          }

          return { data };
        },
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});

 
