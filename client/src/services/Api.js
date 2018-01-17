import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://162.221.207.113:3001'
  })
}