
export const JWT_KEY = process.env.SECRET_JWT
export const region = process.env.AWS_REGION
export const accessKeyId = process.env.AWS_ACCESS_KEY_ID
export const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
export const dynamoTable = process.env.DYNAMO_DB_TABLE
export const mongodb = process.env.MONGO_DB
export const bucketName = process.env.AWS_BUCKET_NAME
export const cfdDomain = process.env.AWS_CFD_DOMAIN
export const cdfKeyId = process.env.AWS_CFD_KEY_ID 
export const cdfPrivateKey = process.env.AWS_CFD_PRIVATE_KEY
export const whiteList = process.env.WHITELIST.split(', ')
