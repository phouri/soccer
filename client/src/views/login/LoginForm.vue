<template>
  <section class="login-form">
    <v-card class="login-card elevation-3">
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-text-field 
        label="Email"
        type="email" 
        v-model="email"
      />
      <v-text-field 
        label="Password" 
        type="password" 
        v-model="password"
      />
      </v-card-text>
      <v-card-actions>
        <v-btn color="info" @click="doLogin">
          Login
        </v-btn>
      </v-card-actions>
      <v-card-text>
        Need an account? <router-link :to="{name: 'Register'}">
          <v-btn flat small>
            Register
          </v-btn>
        </router-link>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import { loginByEmailPassword } from '@/api/authApi'

export default {
  components: {},
  mounted() {},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {},
  methods: {
    async doLogin() {
      const success = await loginByEmailPassword(this.email, this.password)
      if (success) {
        await this.$store.dispatch('getAndSetUser')
        this.$router.push({ name: 'Home' })
      }
    },
  },
}
</script>
<style scoped lang="stylus">
.login-form {
  .login-card {
    min-width: 400px;
    padding: 30px;
  }
}
</style>
