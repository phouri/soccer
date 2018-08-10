<template>
  <section class="home-component">
    {{ teams }}
    <CreateTeam @onCreate="refresh" />
  </section>
</template>

<script>
import * as teamsApi from '@/api/teamsApi'
import CreateTeam from '../components/CreateTeam'

export default {
  components: {
    CreateTeam,
  },
  mounted() {
    this.refresh()
  },
  data() {
    return {
      teams: [],
    }
  },
  computed: {},
  methods: {
    async refresh() {
      this.teams = await teamsApi.getTeams()
    },
  },
}
</script>
<style scoped lang="stylus">
.home-component {
}
</style>
