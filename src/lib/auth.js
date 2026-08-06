import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("healsync");

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3000', 'https://healsync-three.vercel.app'],
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-in/email") {
        const existingUser = await db.collection("user").findOne({
          email: ctx.body?.email,
        });

        if (existingUser?.status?.toLowerCase() === "suspended") {
          throw new APIError("FORBIDDEN", {
            message: "This account has been suspended. Please contact support.",
          });
        }
      }
    }),
  },
  database: mongodbAdapter(db, {
    client
  }),
  user: {
    additionalFields: {
      role: {
        default: "patient",
      },
      status: {
        default: "Active",
      },
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  plugins: [jwt()],
});