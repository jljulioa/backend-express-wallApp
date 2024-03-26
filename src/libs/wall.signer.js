import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { cfdDomain, cdfKeyId, cdfPrivateKey } from "../config.js";


const dateLessThan = "2024-04-01"; // any Date constructor compatible
const DATE_END_SIGNED_URL = '1713200400000';
const date = new Date();

export const signedUrl = async (keys) => {


  try { 
    const urls = await Promise.all( keys.map(async(key) => {

      console.log(key)
      const thumabnailUrl = `${cfdDomain}/thumbnail/${key}`;
      const uploadUrl = `${cfdDomain}/uploads/${key}`;


      const thumabnailSignedUrl = getSignedUrl({
          url: thumabnailUrl,
          keyPairId: cdfKeyId,
          dateLessThan,
          privateKey: cdfPrivateKey,
        });
        
        
      const uploadSignedUrl = getSignedUrl({
          url: uploadUrl,
          keyPairId: cdfKeyId,
          dateLessThan,
          privateKey: cdfPrivateKey,
        });
        
        return {thumabnailSignedUrl, uploadSignedUrl, key}
    }) )
        
    return urls

} catch (error) {
  console.error(error);
}
}