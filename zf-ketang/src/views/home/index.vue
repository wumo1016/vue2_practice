<template>
  <div>
    <HomeHeader v-model="value" />

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(s, index) in slides" :key="index">
        <img :src="s.url" />
      </van-swipe-item>
    </van-swipe>
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
  async mounted() {
    if (this.slides.length == 0) {
      this[Types.SET_SLIDES]()
    }
  },
  methods: {
    ...mapMutations([Types.SET_CATEGORY]),
    ...mapActions([Types.SET_SLIDES])
  }
}
</script>

<style lang="scss" scoped></style>
