"use server";
import connectDB from "@/DB";
import AdminModel from "@/DB/creds";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
const ADMIN_TOKEN = "adminToken";
export async function ValidateAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_TOKEN)?.value;
    if (!token) return false;
    const res = await jwt.verify(token, process.env.JWT_SECRET as string);
    if (!res) return false;
    return true;
  } catch (error) {
    return false;
    console.log(error);
  }
}

export async function loginAdmin({
  adminusername,
  password,
}: {
  adminusername: string;
  password: string;
}): Promise<{
  status: boolean;
  message: string;
  field: "adminusername" | "password" | "root" | `root.${string}`;
}> {
  try {
    await connectDB();
    // Hash the incoming password
    const admin = await AdminModel.findOne({
      adminname: adminusername,
    });
    if (!admin)
      return {
        status: false,
        message: `Admin name ${adminusername} not found`,
        field: "adminusername",
      };
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return {
        status: false,
        message: `Wrong password`,
        field: "password",
      };
    const cookieStore = await cookies();
    const token = await jwt.sign(
      { adminusername, role: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );
    cookieStore.set(ADMIN_TOKEN, token, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return {
      status: true,
      message: `Logged in as ${adminusername}`,
      field: "root",
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      status: false,
      message: `Something went wrong please try again`,
      field: "root",
    };
  }
}
export async function register({
  adminname,
  password,
}: {
  adminname: string;
  password: string;
}) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await await AdminModel.updateOne(
      { adminname }, // Search for existing bill by tablestamp
      { $set: { adminname, password } }, // Update or insert the dish
      { upsert: true } // If the dish doesn't exist, insert it
    );
    return {
      status: true,
      message: "created admin with username " + adminname,
    };
  } catch (error) {
    console.log("error while registering admin", error);
  }
}
