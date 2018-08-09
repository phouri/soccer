<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { getSelfUser } from '@/api/usersApi'

export default {
  name: 'App',
  async created() {
    this.user = await getSelfUser()
  },
  data() {
    return {
      ready: false,
      user: null,
    }
  },
}
</script>
