export function getStrapiURL(path = "") {
    return `${
      process.env.STRAPI_API_URL || 'http://3.140.186.58'
    }${path}`;
}
  
export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
}