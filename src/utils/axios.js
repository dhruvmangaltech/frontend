import axios from 'axios'
import { toast } from '../components/Toast'
import { AdminRoutes } from '../routes'
import { removeLoginToken } from './storageUtils'

/* api calls handled by axios and its interceptors and all methods templates are available here in this file*/

const axiosInstance = axios.create({
  withCredentials: true
})
export const setupInterceptors = () => {

  axiosInstance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (error) => {
      if (error.response.status === 403) {
        removeLoginToken()
        window.location.href = AdminRoutes.AdminSignin
      } else if (error.response.status === 503) {
        toast('No internet connection', 'error')
      } else if (error.response.status === 406) {
        toast('Permission Required to access this page', 'error')
        removeLoginToken();
        location.reload()
    }
      return Promise.reject(error)
    }
  )
}

const METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

const makeRequest = async (url, method, data = {}, params = {}, headers = null) => {
  if(!headers) {
    headers = {
      'Content-Type': 'application/json'
    }
  }

  return axiosInstance({
    url,
    params,
    method,
    data,
    headers,
    withCredentials: true
  })
}

const getRequest = (url, params) => makeRequest(url, METHODS.get, {}, params)

const postRequest = (url, data, headers = null) => makeRequest(url, METHODS.post, data, {}, headers)

const putRequest = (url, data, headers = null) => makeRequest(url, METHODS.put, data, {}, headers)

const deleteRequest = (url, data) => makeRequest(url, METHODS.delete, data)

const deleteParamsRequest = (url, params) => makeRequest(url, METHODS.delete, {}, params)

export { getRequest, postRequest, putRequest, deleteRequest, deleteParamsRequest }
