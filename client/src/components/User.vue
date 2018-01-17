<template>
  <div class="user">
    <!-- <div contenteditable="true" @input="update" class="user-username" :username="userProp">{{ userProp.username }}</div>
    <div contenteditable="true" class="user-email" :email="userProp">{{ userProp.email }}</div> -->
    <editableComp class="user-username" :content="userProp" @update="updateUser">
    </editableComp>
    <button class="delete-button" @click="deleteUser">X</button>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
  
  import EditableComp from './Editable'
  export default {
    name: 'UserComp',
    components: {
      'editableComp': EditableComp
    },
    props: [
      'userProp'
    ],
    methods: {
      deleteUser () {
        console.log(`Deleting ${this.userProp.username}`)
        this.$emit('deleteUser', this.userProp.email)
      },
      updateUser(user) {
        console.log(`Updating user "${this.userProp.username}" to "${user}"`)
        this.$emit('updateUser', this.userProp.email, user)
      }
    }
  }
  
</script>

<style scoped>

.delete-button {
  float: right;
  padding: 2px 5px 2px 5px;
}

.user {
  background-color: #ccc;
  margin-bottom: 5px;
  padding: 5px;
}

.user-username {
  font-weight: bold;
  color: white;
  display: inline-block;
}

.user-email {
  font-size: 10px;
  color: white;
}

</style>
