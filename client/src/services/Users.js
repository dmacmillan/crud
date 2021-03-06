import Api from '@/services/Api'

export default {
  getUsers () {
    return Api().get('users')
  },
  removeUser (email) {
    return Api().delete(`/user/${email}`)
  }
}