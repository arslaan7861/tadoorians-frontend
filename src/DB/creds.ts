import { CREDS } from "@/utils/types";
import mongoose, { Schema, Model, Document } from "mongoose";

interface ICREDS extends Document, CREDS {
  adminname: string;
  password: string;
}

const AdminSchema: Schema<ICREDS> = new Schema(
  {
    adminname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AdminModel: Model<ICREDS> =
  mongoose.models.Admin || mongoose.model<ICREDS>("Admin", AdminSchema);

export default AdminModel;
