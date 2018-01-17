<template>
  <div id='root'>
    <h1>Register User</h1>
    <form>
      <label>
        Username:
        <at-input name="username" v-model="username" placeholder="Please enter desired username..."></at-input>
      </label>
      <label>
        Email:
        <at-input name="email" type="email" v-model="email" placeholder="Please enter a valid email address..." @blur="checkEmail" :status="emailStatus" :icon="emailIcon"></at-input>
      </label>
      <div class="error-msg" v-if="emailError">
        {{ emailError }}
      </div>
      <label>
        Password:
        <at-input name="password" type="password" v-model="password" placeholder="Please enter desired password..." @blur="checkPwd" :status="pwdStatus" :icon="confirmIconStatus"></at-input>
      </label>
      <label>
        Confirm Password:
        <at-input name="confirmPassword" type="password" v-model="confirmPassword" placeholder="Please confirm password..." @blur="checkPwd" :status="pwdStatus" :icon="confirmIconStatus"></at-input>
      </label>
      <div class="error-msg" v-if="pwdError">
        {{ pwdError }}
      </div>
      <br>
      <at-button name="registerButton" type="primary" @click="register" :disabled="canRegister == 1">Register</at-button>
    </form>
  </div>
</template>

<script>
import Api from '@/services/Api'
import AuthenticationService from '@/services/AuthenticationService'
const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
export default {
  name: 'registerComp',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      pwdStatus: '',
      confirmIconStatus: '',
      pwdError: '',
      emailIcon: '',
      emailStatus: '',
      emailError: '',
      canRegister: 1
    }
  },
  props: [
    'newUser'
  ],
  methods: {
    testFunc: function() {
      console.log('key was released')
    },
    checkCanRegister: function() {
      if (
        !(this.emailError || this.pwdError) &&
        this.email != '' &&
        this.password != '' &&
        this.confirmPassword != ''
      ) {
        this.canRegister = 0
      } else {
        this.canRegister = 1
      }
    },
    async checkEmail () {
      const valid = EMAIL_REGEX.test(this.email)
      if (valid) {
        console.log('email is valid')
        this.emailStatus = 'warning'
        this.emailIcon = 'alert-circle'
        this.emailError = 'Checking...'
        const response = await Api().get(
          `/user/${this.email}`,
        )
        if (response.data.count == 0) {
          this.emailStatus = 'success'
          this.emailIcon = 'check-circle'
          this.emailError = ''
        } else {
          this.emailStatus = 'error'
          this.emailIcon = 'x-circle'
          this.emailError = 'Email already in use!'
        }
      } else {
        this.emailStatus = 'error'
        this.emailIcon = 'x-circle'
        this.emailError = 'Invalid email address!'
        //console.log(response)
      }
      this.checkCanRegister()
    },
    async register () {
      if (this.checkCanRegister() != 0) this.canRegister = 1
      const response = await AuthenticationService.register({
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        email: this.email
      })
      var newUser = response
      //console.log(response.data)
      this.$emit('userRegistered', newUser)
      this.username = '',
      this.password = '',
      this.email = '',
      this.confirmPassword = ''
    },
    checkPwd: function() {
      if (this.password != this.confirmPassword) {
        this.pwdStatus = 'error'
        this.confirmIconStatus = 'x-circle'
        this.pwdError = 'Passwords do not match!'
      } else if (this.password.length == 0) {
        this.pwdStatus = 'error'
        this.confirmIconStatus = 'x-circle'
        this.pwdError = 'Password cannot be empty'
      } else {
        this.pwdStatus = 'success'
        this.confirmIconStatus = 'check-circle'
        this.pwdError = ''
      }
      this.checkCanRegister()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.error-msg {
  margin-left: 10px;
  color: red;
}

</style>
