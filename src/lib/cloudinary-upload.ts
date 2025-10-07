import { showApiErrorToast } from "@components/toast/custom-toast";

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export interface CloudinaryUploadOptions {
  file: string; // base64 string
  merchant_id: string;
  public_id: string;
  tags?: string[];
  upload_preset: string;
}

export const uploadToCloudinary = async (
  options: CloudinaryUploadOptions
): Promise<CloudinaryUploadResponse> => {
  try {
    const requestBody = {
      file: options.file, // base64 string
      merchant_id: options.merchant_id,
      public_id: options.public_id,
      tags: options.tags || [],
      upload_preset: options.upload_preset,
    };

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/coval-emporium/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    showApiErrorToast("Failed to upload file. Please try again.");
    throw error;
  }
};

export const generatePublicId = (merchantId: string, type: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${merchantId}/${type}/${timestamp}-${random}`;
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Return the full data URL (data:image/...;base64,...) for Cloudinary
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (
  file: File,
  maxSize: number = 1024 * 1024, // 1MB default
  allowedTypes: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ]
): { valid: boolean; message?: string } => {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "Please upload a valid image file (JPG, PNG, or WebP)",
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const sizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      message: `File size must be less than ${sizeMB}MB`,
    };
  }

  return { valid: true };
};
