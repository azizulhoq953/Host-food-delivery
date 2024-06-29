// import {authOptions, isAdmin} from "../auth/[...nextauth]/route";
// import {Order} from "../../../models/Order";
// import mongoose from "mongoose";
// import {getServerSession} from "next-auth";

// export async function GET(req) {
//   mongoose.connect(process.env.MONGO_URL);

//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   const admin = await isAdmin();

//   const url = new URL(req.url);
//   const _id = url.searchParams.get('_id');
//   if (_id) {
//     return Response.json( await Order.findById(_id) );
//   }


//   if (admin) {
//     return Response.json( await Order.find() );
//   }

//   if (userEmail) {
//     return Response.json( await Order.find({userEmail}) );
//   }

// }




// src/app/api/orders/route.js

import mongoose from "mongoose";
import { getServerSession } from "next-auth/react";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { Order } from "../../../models/Order";

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession({ req });
    const userEmail = session?.user?.email;
    const admin = await isAdmin(req);

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (_id) {
      const order = await Order.findById(_id);
      if (!order) {
        return { status: 404, body: { error: "Order not found" } };
      }
      return { status: 200, body: order };
    }

    if (admin) {
      const orders = await Order.find();
      return { status: 200, body: orders };
    }

    if (userEmail) {
      const userOrders = await Order.find({ userEmail });
      return { status: 200, body: userOrders };
    }

    return { status: 403, body: { error: "Unauthorized" } };
  } catch (error) {
    console.error("Error handling GET request:", error);
    return { status: 500, body: { error: "Internal Server Error" } };
  } finally {
    await mongoose.disconnect();
  }
}
