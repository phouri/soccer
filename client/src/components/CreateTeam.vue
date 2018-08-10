<template>
  <section class="class_name">
    <v-text-field
      v-model="name"
      type="text"
      label="Team Name"
    />
    <v-btn 
      :disabled="!name" 
      @click="create">
      Create
    </v-btn>
    {{ results }}
  </section>
</template>

<script>
import { createTeam } from '@/api/teamsApi'

export default {
  components: {},
  mounted() {},
  data() {
    return {
      name: '',
      results: null,
    }
  },
  computed: {},
  methods: {
    async create() {
      this.results = await createTeam(this.name)
      this.$emit('onCreate', this.results)
    },
  },
}
</script>
<style scoped lang="stylus">
.class_name {
}
</style>
