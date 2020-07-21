import { Plugin, Context } from '@nuxt/types'
import { PagesSummary, PagesResponse, Post } from '@/types/struct'

const PER_PAGE = 100
const summaryEndPoint = (baseUrl: string): string => {
  return baseUrl + `/pages?per_page=${PER_PAGE}`
}
const pagesEndPoint = (baseUrl: string, pagination: number): string => {
  return baseUrl + `/pages?per_page=${PER_PAGE}&page=${pagination}`
}
// const pagesEndPoint = (baseUrl: string, pagination: number): string => {
//   return baseUrl + `/pages?per_page=${PER_PAGE}&page=${pagination}`
// }
const pageEndPoint = (baseUrl: string, page: number): string => {
  return baseUrl + `/pages/${page}`
}

type AuthType = undefined | 'basic'

const get = (context: Context, url: string): Promise<Response> => {
  const authType: AuthType = context.$config.WP_API_AUTH
  if (authType === 'basic') {
    throw new Error('basic is not yet supported')
  } else {
    return fetch(url)
  }
}

const getPagesSummary = (context: Context): Promise<PagesSummary | null> => {
  const url = summaryEndPoint(context.$config.WP_API_ENDPOINT)
  return get(context, url)
    .then((response) => {
      console.info(`response of ${url}: `, response)
      response.headers.get('X-WP-Total')
      return {
        totalPost: +(response.headers.get('X-WP-Total') || 0),
        totalPage: +(response.headers.get('X-WP-TotalPages') || 0),
      }
    })
    .catch((error) => {
      console.error(error)
      return null
    })
}

const getPages = (
  context: Context,
  pagination: number
): Promise<PagesResponse | null> => {
  const url = pagesEndPoint(context.$config.WP_API_ENDPOINT, pagination)
  return get(context, url)
    .then(async (response) => {
      console.info(`response of ${url}: `, response)
      response.headers.get('X-WP-Total')
      const summary: PagesSummary = {
        totalPost: +(response.headers.get('X-WP-Total') || 0),
        totalPage: +(response.headers.get('X-WP-TotalPages') || 0),
      }
      const json = await response.json()
      console.info('pages json: ', json)
      const posts = json.map((item: any) => {
        return item as Post
      })
      return {
        summary,
        posts,
      }
    })
    .catch((error) => {
      console.error(error)
      return null
    })
}

const getPage = (context: Context, page: number): Promise<Post | null> => {
  const url = pageEndPoint(context.$config.WP_API_ENDPOINT, page)
  return get(context, url)
    .then(async (response) => {
      console.info(`response of ${url}: `, response)
      const json = await response.json()
      return json as Post
    })
    .catch((error) => {
      console.error(error)
      return null
    })
}

declare module '@nuxt/types' {
  interface Context {
    $getPagesSummary(): Promise<PagesSummary | null>
    $getPages(pagination: number): Promise<PagesResponse | null>
    $getPage(page: number): Promise<Post | null>
  }
}
const myPlugin: Plugin = (context) => {
  context.$getPagesSummary = () => getPagesSummary(context)
  context.$getPages = (pagination: number) => getPages(context, pagination)
  context.$getPage = (page: number) => getPage(context, page)
}

export default myPlugin
