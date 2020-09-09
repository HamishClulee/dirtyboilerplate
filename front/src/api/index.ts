import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3267'
  : window.location.origin

const NODE = axios.create({
  baseURL,
  withCredentials: true,
})

export default NODE
