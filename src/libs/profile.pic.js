import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { region, accessKeyId, secretAccessKey, bucketName } from "../config.js"
import sharp from "sharp";



export const uploadProfilePic = async (filename, file, type, userId) => {


  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });

  
  const objectKey300 = `profile/${userId}/x300/${filename }`;
  const objectKey100 = `profile/${userId}/x100/${filename }`


  const resizeX300 = sharp(file.buffer).resize({ width: 300, height: 300, fit: 'cover' });
  const bufferX300 = await resizeX300.toBuffer();

  const resizeX100 = sharp(file.buffer).resize({ width: 100, height: 100, fit: 'cover' });
  const bufferX100 = await resizeX100.toBuffer();



  const command300 = new PutObjectCommand({
    Body: bufferX300,
    Bucket: bucketName,
    Key: objectKey300,
    ContentType: type,
  });

  const command100 = new PutObjectCommand({
    Body: bufferX100,
    Bucket: bucketName,
    Key: objectKey100,
    ContentType: type,
  });

  try {

    await s3Client.send(command300);
    await s3Client.send(command100);

  } catch (error) {
    console.error("Error generating pre-signed URL for upload:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
  return [objectKey100, objectKey300]

}