<template>
  <section class="login-form">
    <v-card class="login-card">
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
      <v-btn @click="doLogin">
        Login
      </v-btn>
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
      alert(success)
    },
  },
}
</script>
<style scoped lang="stylus">
.login-form {
}
</style>
