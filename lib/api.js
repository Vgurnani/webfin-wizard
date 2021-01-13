export function getStrapiURL(path = "") {
    return `${
      process.env.STRAPI_API_URL
    }${path}`;
}

export function getUrl(path = "") {
  return `${
    `${process.env.API_URL}/v1`
  }${path}`;
}

export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
}

export async function postData(path, data = {}){
  const response = await fetch(getUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json()
  return new Promise((resolve, reject) => {
    if(response.status == 200){
      resolve(result)
    }else{
      reject(result)
    }
  })
}

export async function getData(path, data = {}){
  const response = await fetch(getUrl(path), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json()
  return new Promise((resolve, reject) => {
    if(response.status == 200){
      resolve(result)
    }else{
      reject(result)
    }
  })
}