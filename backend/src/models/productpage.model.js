import mongoose from "mongoose";

// Define the product page schema

const productPageSchema = new mongoose.Schema({
  publicId: { type: String, required: true },
  publishUrl:{
    type:String,
    default:''
  },
  isGenerated: { type: Boolean, default: false },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  price: { type: Number, default: 0 },
  featuresLine: { type: [String], default: [] },
  paragraph: { type: [String], default: [] },
  paragraphTitles: { type: [String], default: [] },
  images: { type: [String], default: [] },
  reviews: {
    type: [
      {
        author: String,
        content: String,
        profilePic: String,
        contentImage:String,
      }
    ],
    default: []
  },
  footerTitle: { type: String, default: '' },
  footerDesc: { type: String, default: '' },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});


const ProductPage = mongoose.model("product_page", productPageSchema);

export default ProductPage;
