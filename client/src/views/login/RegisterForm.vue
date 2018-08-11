<template>
  <section class="register-form">
    <v-card class="register-card">
      <v-card-title>
        Register
      </v-card-title>
      <v-card-text>
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
      </v-card-text>
      <v-card-actions>
        <v-btn @click="register">
          Register
        </v-btn>
      </v-card-actions>
      <v-card-text>
        Already registered? <router-link :to="{name: 'Login'}">
          <v-btn small flat>Login</v-btn>
        </router-link>
      </v-card-text>
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
.register-card {
  min-width: 400px;
  padding: 30px;
}
</style>
