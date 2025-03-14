"use server";
import connectDB from "@/DB";
import AdminModel from "@/DB/creds";
import bcrypt from "bcryptjs";

import { cookies } from "next/headers";
const ADMIN_USERNAME = "adminusername";
const ADMIN_PASSWORD = "password";
export async function ValidateAdmin() {
  try {
    const cookieStore = await cookies();
    const adminusername = cookieStore.get(ADMIN_USERNAME)?.value;
    const password = cookieStore.get(ADMIN_PASSWORD)?.value;
    if (!adminusername || !password) return false;
    await connectDB();
    const admin = await AdminModel.findOne({
      adminname: adminusername,
    });
    if (!admin) return false;
    const isMatch = await bcrypt.compare(password, admin.password);
    return isMatch;
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
        field: ADMIN_USERNAME,
      };
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return {
        status: false,
        message: `Wrong password`,
        field: ADMIN_PASSWORD,
      };
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_USERNAME, adminusername, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    cookieStore.set(ADMIN_PASSWORD, password, {
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
