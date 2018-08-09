<template>
  <section class="register-form">
    <v-card class="register-card">
      <v-text-field 
        label="Email"
        type="email" 
        v-model="user.email"
      />
      <v-text-field
        label="First Name"
        v-model="user.firstName"
      />
      <v-text-field
        label="Last Name"
        v-model="user.lastName"
      />
      <v-text-field 
        label="Password" 
        type="password" 
        v-model="user.password"
      />
      <v-text-field 
        label="Repeat Password" 
        type="password" 
        v-model="user.repeat"
      />
      <v-btn @click="register">
        Register
      </v-btn>
    </v-card>
  </section>
</template>

<script>
import { registerUser } from '@/api/authApi'

export default {
  components: {},
  mounted() {},
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        password: '',
        repeat: '',
        email: '',
      },
    }
  },
  computed: {},
  methods: {
    register() {
      registerUser(this.user)
    },
  },
}
</script>
<style scoped lang="stylus">
.login-form {
  border: 1px solid red;
}
</style>
