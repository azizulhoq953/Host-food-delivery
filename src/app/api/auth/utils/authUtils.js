// utils/authUtils.js

import { getServerSession } from "next-auth/react";
import { UserInfo } from "../models/UserInfo";

export async function isAdmin(req) {
  const session = await getServerSession({ req });
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }

  return userInfo.admin;
}
