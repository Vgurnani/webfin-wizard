import {createApi} from 'unsplash-js'
const unsplashClient = createApi({
    accessKey:
      process.env.UNSPLASH_API_KEY
})

export default unsplashClient;