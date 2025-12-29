import axios from "axios"

const GIPHY_API_KEY = process.env.GIPHY_API_KEY || ""
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs"

interface GiphyGif {
  images: {
    original: {
      url: string
    }
  }
}

interface GiphyResponse {
  data: GiphyGif | GiphyGif[]
}

export async function searchGif(query: string): Promise<string | null> {
  if (!GIPHY_API_KEY) {
    console.error("GIPHY_API_KEY is not set")
    return null
  }

  try {
    const response = await axios.get<GiphyResponse>(`${GIPHY_BASE_URL}/search`, {
      params: {
        q: query,
        api_key: GIPHY_API_KEY,
        limit: 1,
      },
    })

    const gifs = Array.isArray(response.data.data) ? response.data.data : [response.data.data]

    if (gifs.length === 0) {
      return null
    }

    return gifs[0].images.original.url
  } catch (error) {
    console.error("Error searching for GIF:", error)
    return null
  }
}

export async function getRandomGif(): Promise<string | null> {
  if (!GIPHY_API_KEY) {
    console.error("GIPHY_API_KEY is not set")
    return null
  }

  try {
    const response = await axios.get<GiphyResponse>(`${GIPHY_BASE_URL}/random`, {
      params: {
        api_key: GIPHY_API_KEY,
      },
    })

    const gif = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data
    return gif.images.original.url
  } catch (error) {
    console.error("Error fetching random GIF:", error)
    return null
  }
}
