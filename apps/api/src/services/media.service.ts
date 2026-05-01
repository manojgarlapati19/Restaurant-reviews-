import type { MediaType } from "@dishcovery/types";
import { cloudinary } from "../config/cloudinary.js";

export function createSignedUploadPayload(type: MediaType, folder = "dishcovery/reviews") {
  const timestamp = Math.floor(Date.now() / 1000);
  const transformation =
    type === "video"
      ? [{ width: 1080, crop: "limit" }]
      : [{ width: 1600, crop: "limit", quality: "auto:good" }];

  const paramsToSign = {
    folder,
    resource_type: type === "video" ? "video" : "image",
    timestamp,
    transformation
  };

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    timestamp,
    folder,
    signature: cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET ?? ""),
    resourceType: paramsToSign.resource_type,
    transformation
  };
}
