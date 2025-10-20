const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema(
  {
    telnyxId: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "released"],
      default: "active",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    ownerAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
    lastUsed: {
      type: Date,
      default: null,
    },
    // 标签备注，例如：sales_team / test_number / vip
    tag: {
      type: String,
      default: "",
    },
  },
  {
    // 自动加 createdAt、updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Phones", phoneSchema);
