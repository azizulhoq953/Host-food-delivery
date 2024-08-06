import NextAuth from "next-auth";
import { authOptions } from "../../../utls/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
