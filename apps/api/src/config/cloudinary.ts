import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";

cloudinary.config({
  ...(env.CLOUDINARY_CLOUD_NAME ? { cloud_name: env.CLOUDINARY_CLOUD_NAME } : {}),
  ...(env.CLOUDINARY_API_KEY ? { api_key: env.CLOUDINARY_API_KEY } : {}),
  ...(env.CLOUDINARY_API_SECRET ? { api_secret: env.CLOUDINARY_API_SECRET } : {})
});

export { cloudinary };
