export type ResponseBody = {
    header: Header
    results: Result[]
}

type Header = {
    userId: string
    accountType: string
    shortLimit: string
    longLimit: string
    shortRemaining: number
    longRemaining: number
    status: number
    requestedResults: number
    index: Index[]
    searchDepth: string
    minimumSimilarity: number
    queryImageDisplay: string
    queryImage: string
    returnedResults: number
}

type Index = {
    status: number
    parentId: number
    id: number
    result: number
}

export type Result = {
    header: ResultHeader
    data: ResultData
}

type ResultHeader = {
    similarity: string
    thumbnail: string
    indexId: number
    indexName: string
    dupes: number
    hidden: number
}

type ResultData = {
    // General
    source?: string
    creator?: string | string[]
    ext_urls?: string[]

    // Anime / Manga
    engName?: string
    jpName?: string
    title?: string
    part?: string
    year?: string
    estTime?: string
    anidbAid?: number
    malId?: number
    anilistId?: number

    // Visual Novels
    company?: string
    getchuId?: string

    // Pixiv / Art Sites
    memberName?: string
    memberId?: number
    pixivId?: number
    nijieId?: number
    userId?: string
    userName?: string
    id?: string
    published?: string
    service?: string
    serviceName?: string
    path?: string
    creatorName?: string

    // Booru / Gallery / Other
    authorName?: string | null
    authorUrl?: string
    danbooruId?: number
    material?: string
    characters?: string

    // Furry-specific
    asProject?: string
    faId?: number
    daId?: string
}