import { createApi } from 'unsplash-js'
/* eslint-disable */

const unsplashClient = createApi({
    accessKey:
      process.env.REACT_APP_UNSPLASH_API_KEY
})

export default unsplashClient;