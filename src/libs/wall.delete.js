import { DeleteObjectCommand , S3Client} from "@aws-sdk/client-s3";
import { region, accessKeyId, secretAccessKey, bucketName } from "../config.js"

export const deleteS3 = async (key) => {

    const objectKey = `uploads/${key }`;

    console.log(objectKey);

    const s3Client = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: objectKey
    });

    try {
        await s3Client.send(command);
    } catch (error) {
        console.error("Error deleting object from S3:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
} 