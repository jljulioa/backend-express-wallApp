import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { region, accessKeyId, secretAccessKey, bucketName } from "../config.js"



export const uploadS3 = async (filename, file, type) => {


  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });

  
  // Generate a unique object key (path) for the uploaded file
  const objectKey = `uploads/${filename }`;

  console.log(objectKey);

  // Set the expiration time for the pre-signed URL (in seconds)
  //const expirationSeconds = 120; 

  const command = new PutObjectCommand({
    Body: file.buffer,
    Bucket: bucketName,
    Key: objectKey,
    ContentType: type,
  });

  try {

    await s3Client.send(command);
    /* const url = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: expirationSeconds,
    });

    return url */

  } catch (error) {
    console.error("Error generating pre-signed URL for upload:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }

}