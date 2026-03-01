import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true
    },
    assignmentId: {
      type: Number,
      required: true,
      index: true
    },
    query: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["success", "error"],
      required: true
    },
    errorMessage: {
      type: String,
      default: null
    },
    rowCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Attempt = mongoose.model("Attempt", AttemptSchema);
