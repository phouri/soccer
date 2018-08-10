<template>
  <section class="team-view">
    <h2>{{ team.name }}</h2>
    <div 
      class="participant" 
      v-for="(player, idx) in team.participants" 
      :key="idx">
      {{ player.name }} - {{ player.score }}
      <v-btn @click="removeParticipant(player)">
        Remove Player
      </v-btn>
    </div>
    <AddParticipant 
      @onAdd="addParticipant" 
      :team="team" />
  </section>
</template>

<script>
import { getTeam, removeParticipant } from '@/api/teamsApi'
import AddParticipant from '../components/AddParticipant'

export default {
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  components: {
    AddParticipant,
  },
  async mounted() {
    this.team = (await getTeam(this.teamId)).team
  },
  data() {
    return {
      team: {},
    }
  },
  computed: {},
  methods: {
    addParticipant(player) {
      this.team.participants.push(player)
    },
    async removeParticipant(player) {
      await removeParticipant(this.team._id, player)
      this.team.participants = this.team.participants.filter(p => p !== player)
    }
  },
}
</script>
<style scoped lang="stylus">
.team-view {
}
</style>
