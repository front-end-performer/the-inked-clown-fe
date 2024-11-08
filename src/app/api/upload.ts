import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configure AWS S3 client
const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION || "",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
});

// Disable body parsing by Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export const uploadFileHandler = async ({
  fileName,
  file,
}: {
  fileName: string;
  file: File;
}): Promise<string | undefined> => {
  try {
    const sendRes = await s3.send(
      new PutObjectCommand({
        ACL: "public-read",
        Body: file,
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
        ContentType: file.type,
        Key: fileName,
      })
    );
    const meta = sendRes.$metadata;
    if (meta.httpStatusCode !== 200)
      throw new Error(
        `Error uploading file, with status: ${meta.httpStatusCode}`
      );

    return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${fileName}`;
  } catch (err) {
    console.log("AWS S3 error", err);
  }
};
