import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const ajax = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/160659' : ''
})

export const getArticleList = () => {
  return ajax.post('/api/v1/articleList')
}

export const deleteArticleById = (id) => {
  return ajax.post(`/api/v1/article/delete/${id}`)
}

export const getArticleById = (id) => {
  return ajax.post(`/api/v1/getArticle/${id}`)
}

export const getReadingQuantityByMonths = (months = 6) => {
  return ajax.post('/api/v1/readingQuantity/', {
    months
  })
}
export const getNotifications = () => {
  return ajax.post('/api/v1/getNotifications')
}
export const login = (params) => {
  return ajax.post('/api/v1/login', params)
}

export const checkToken = (token) => {
  return ajax.post(`/api/v1/checkToken/${token}`)
}
