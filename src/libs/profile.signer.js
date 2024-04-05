import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { cfdDomain, cdfKeyId, cdfPrivateKey } from "../config.js";


const dateLessThan = "2024-07-01"; // any Date constructor compatible
const DATE_END_SIGNED_URL = '1713200400000';
const date = new Date();
const dateFormatted = date.toISOString().slice(0, 10);

export const profileSignedUrl = async (keys) => {

  console.log(keys)
  console.log(dateFormatted)

  try { 

    const urls = await Promise.all( keys.map(async(key) => {

      const url = `${cfdDomain}/${key}`;
      
      console.log(url)

      const profilePicUrl = getSignedUrl({
          url: url,
          keyPairId: cdfKeyId,
          dateLessThan,
          privateKey: cdfPrivateKey,
        });
    
        return profilePicUrl

    }) )
        
    return urls

    } catch (error) {
      console.error(error);
    }
}
