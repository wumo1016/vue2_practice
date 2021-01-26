<template>
  <div>
    <HomeHeader v-model="value" />
  </div>
</template>

<script>
import HomeHeader from './home-header'
import * as Types from '@s/action-types'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('home')
export default {
  components: { HomeHeader },
  data() {
    return {}
  },
  computed: {
    ...mapState(['category', 'slides']),
    value: {
      get() {
        return this.category
      },
      set(value) {
        this[Types.SET_CATEGORY](value)
      }
    }
  },
  methods: {
    ...mapMutations([Types.SET_CATEGORY])
  }
}
</script>

<style lang="scss" scoped></style>
