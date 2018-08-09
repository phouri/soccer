<template>
  <section class="login-container">
    <router-view />
  </section>
</template>

<script>
import './LoginForm'

export default {
  components: {},
  mounted() {
    //Preload if needed
    import('../Home.vue')
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
<style scoped lang="stylus">
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
