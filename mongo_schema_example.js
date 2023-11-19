const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      index: {
        unique: true,
        collation: { locale: "en", strength: 1 },
      },
    },
    desc: { type: String, required: true },
    imageURL: { type: String },
    address: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    assetId: { type: String },
    creator: { type: String },
    edition: { type: String, lowercase: true },
    editionId: { type: Number },
    category: { type: String, lowercase: true },
    tags: { type: Array },
    collectionName: { type: String, lowercase: true },
    listPrice: { type: Number, required: true },
    currentBid: { type: Number, required: true, default: null },
    buyNow: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    transactions: { type: Array },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
