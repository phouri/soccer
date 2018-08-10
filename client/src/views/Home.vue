<template>
  <section class="home-component">
    <div 
      class="team" 
      v-for="team in teams" 
      :key="team._id">
      <span>
        {{ team.name }} - {{ team.participants.length }} participants
      </span>
      <router-link :to="{name: 'Team', params: {teamId: team._id}}">
        <v-btn>Edit</v-btn>
      </router-link>
    </div>
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
