import clientPromise from "../../../../libs/mongoConnect";
import {UserInfo} from "../../../../models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from '../../../../models/User';
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null
      }
    })
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


// src/app/api/auth/[...nextauth]/route.js

// import NextAuth from "next-auth/react";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "../../../../libs/mongoConnect";
// import { authOptions } from "../../../../config/auth"; // Your authentication options
// import { isAdmin } from "../utils/authUtils";

// const options = {
//   ...authOptions,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         username: { label: "Email", type: "email", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         // Your authorization logic here
//       }
//     }),
//   ],
// };

// const handler = NextAuth(options);

// export default handler;

// // Example usage of isAdmin:
// export async function GET(req, res) {
//   const authorized = await isAdmin(req);

//   if (!authorized) {
//     return res.status(403).json({ error: "Unauthorized" });
//   }

//   // Handle authorized GET request logic
//   res.status(200).json({ message: "Authorized GET request" });
// }

// export async function POST(req, res) {
//   const authorized = await isAdmin(req);

//   if (!authorized) {
//     return res.status(403).json({ error: "Unauthorized" });
//   }

//   // Handle authorized POST request logic
//   res.status(200).json({ message: "Authorized POST request" });
// }
