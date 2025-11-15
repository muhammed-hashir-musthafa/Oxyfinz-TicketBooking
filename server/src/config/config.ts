import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const config = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || "development",
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/oxyfinz",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "fallback-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
//   aws: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//     region: process.env.AWS_REGION || "us-east-1",
//     s3Bucket: process.env.AWS_S3_BUCKET || "oxyfinz-bucket",
//   },
};

export default config;
