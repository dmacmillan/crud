<template>
  <div id='root'>
    <div class="container-fluid">
      <div class="row at-row">
        <div class="col-md-12">
          <registerComp @userRegistered="updateUserList"></registerComp>
        </div>
        <div class="col-md-12">
          <h1>Registered Users</h1>
          <ul>
            <li v-for="user in userList">
              <userComp :userProp="user" @deleteUser="deleteUser" @updateUser="updateUser"></userComp>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import RegisterComp from './Register'
  import UserComp from './User'
  import Api from '@/services/Api'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        userList: []
      }
    },
    created: function () {
      this.getAllUsers()
    },
    components: {
      'registerComp': RegisterComp,
      'userComp': UserComp
    },
    methods: {
      async getAllUsers () {
        this.userList = [{username: 'Loading...'}]
        const response = await Api().get('/users')
        this.userList = response.data.userList
        //console.log(response)
      },
      updateUserList (newUser) {
        this.userList.push(newUser.data)
      },
      async deleteUser (email) {
        for (var i = 0; i < this.userList.length; i++) {
          if (this.userList[i].email == email) {
            //console.log(`User found: ${this.userList[i].email}`)
            this.userList.splice(i, 1)
            // Still need to add database removal logic
            const response = Api().delete(`/user/${email}`)
            console.log('got delete user response')
            console.log(response)
          }
        }
      },
      async updateUser(email, newUsername) {
        for (var i = 0; i < this.userList.length; i++) {
          if (this.userList[i].email == email) {
            //console.log(`User found: ${this.userList[i].email}`)
            this.userList[i].username = newUsername
            // Still need to add database removal logic
            const response = Api().patch(`/user/${email}`, {"newUsername": newUsername})
            console.log('got update user response')
            console.log(response)
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
