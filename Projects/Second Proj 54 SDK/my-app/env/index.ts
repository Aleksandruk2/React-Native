const API_BASE_URL =  process.env.EXPO_PUBLIC_BASE_API_URL;

const IMAGE_URL_50 = API_BASE_URL + "/images/50_";
const IMAGE_URL_100 = API_BASE_URL + "/images/100_";
const IMAGE_URL_200 = API_BASE_URL + "/images/200_";
const IMAGE_URL_400 = API_BASE_URL + "/images/400_";
const IMAGE_URL_800 = API_BASE_URL + "/images/800_";
const IMAGE_URL_1200 = API_BASE_URL + "/images/1200_";

const APP_ENV = {
    API_BASE_URL,
    IMAGE_URL_50,
    IMAGE_URL_100,
    IMAGE_URL_200,
    IMAGE_URL_400,
    IMAGE_URL_800,
    IMAGE_URL_1200,
};



export default APP_ENV;