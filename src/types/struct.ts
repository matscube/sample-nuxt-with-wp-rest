export type PagesSummary = {
  totalPost: number
  totalPage: number
}

/* eslint-disable camelcase */
export type Post = {
  date: string
  date_gmt?: string
  guid?: any
  id?: number
  link: string
  modified: string
  modified_gmt?: string
  slug: string
  status?: string
  type?: string
  password?: string
  permalink_template?: string
  generated_slug?: string
  parent?: string
  title: {
    rendered: string
  }
  content: string
  author?: number
  excerpt?: any
  featured_media?: number
  comment_status?: string
  ping_status?: string
  menu_order?: number
  meta?: any
  template?: string
}
/* eslint-enable camelcase */
export function createPostSample(): Post {
  return {
    date: '2020/01/01',
    link: '/pages/2',
    modified: '2020/02/01',
    slug: 'sample',
    title: {
      rendered: 'sample post',
    },
    content: 'Sample content',
  }
}

export type PagesResponse = {
  summary: PagesSummary
  posts: Post[]
}
