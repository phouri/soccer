<template>
  <section class="add-participant">
    <v-text-field
      v-model="name"
      type="text"
      label="Player Name"
    />
    <v-text-field
      v-model="score"
      type="number"
      :max="10"
      :min="1"
      label="Player Score (1-10)"
    />
    <v-btn 
      :disabled="!name || !score" 
      @click="create">
      Add
    </v-btn>
  </section>
</template>

<script>
import { addParticipant } from '@/api/teamsApi'

export default {
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  components: {},
  mounted() {},
  data() {
    return {
      name: '',
      score: 5,
      results: null,
    }
  },
  computed: {},
  methods: {
    async create() {
      this.results = await addParticipant(this.team._id, this.name, this.score)
      this.$emit('onAdd', { name: this.name, score: this.score })
      this.name = ''
      this.score = 5
    },
  },
}
</script>
<style scoped lang="stylus">
.add-participant {
}
</style>
