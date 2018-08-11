<template>
  <v-app v-if="ready">
    <router-view />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['ready']),
  },
}
</script>
