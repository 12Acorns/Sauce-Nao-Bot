import { QueryOptions } from "./QueryOptions"
import { ResponseBody } from "./ResponceBody"
import { config } from "../config"
import fetch from "node-fetch"

const cache = new Map<string, ResponseBody>()
const responceType: Number = 2 // Json Responce
const sauceNaoUrl: string = "https://saucenao.com/search.php?"

export async function get(queryOptions: QueryOptions): Promise<ResponseBody> {
    const getString = `${sauceNaoUrl}db=${queryOptions.DatabaseUsed}&output_type=${responceType}&test_mode=1&api_key=${config.SAUCE_NAO_TOKEN}&hide=${queryOptions.VisibilityOptions}&url=${encodeURIComponent(queryOptions.ImageUrl)}`
    if(cache.has(getString))
    {
        return cache.get(getString)!
    }
    try {
        console.log(encodeURIComponent(queryOptions.ImageUrl))
        const responce = await fetch(getString)
        const data: ResponseBody = await responce.json()
        console.dir(data, { depth: null })
        cache.set(getString, data)
        return data
    } catch(error) {
        console.error("Unable to fetch source data ", error)
    }
    return Promise.reject()
}