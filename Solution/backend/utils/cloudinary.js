import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadStream = (stream) =>
  new Promise((resolve, reject) => {
    const buffer = [];
    stream.on("data", (chunk) => buffer.push(chunk));
    stream.on("end", () => {
      const bufferData = Buffer.concat(buffer);
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(bufferData);
    });
    stream.on("error", (error) => reject(error));
  });

export default { uploadStream };
