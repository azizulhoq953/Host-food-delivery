import { User } from "../../../models/User";
import mongoose from "mongoose";
import { NextResponse as Response } from "next/server";

export async function GET() {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    if (await isAdmin()) {
      const users = await User.find();
      return Response.json(users);
    } else {
      return Response.json([]);
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}

// import {isAdmin} from "../auth/[...nextauth]/route";
// import {User} from "../../../models/User";
// import mongoose from "mongoose";

// export async function GET() {
//   mongoose.connect(process.env.MONGO_URL);
//   if (await isAdmin()) {
//     const users = await User.find();
//     return Response.json(users);
//   } else {
//     return Response.json([]);
//   }
// }
