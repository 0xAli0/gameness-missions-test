import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import clientPromise from "./lib/db";
import { Adapter } from "next-auth/adapters";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise, {databaseName: process.env.DATABASE_NAME}) as Adapter,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return user ? { ...session, user } : session;
    }
  },
});
