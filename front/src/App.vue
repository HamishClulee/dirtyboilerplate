<template>
  <div class="god-div">
      <div v-if="isauthed">
          <router-view></router-view>
      </div>
      <underconstruction v-else></underconstruction>
  </div>
</template>

<script>
    import underconstruction from './components/underconstruction'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'app',
        components: {
            underconstruction,
        },
        created() {
            this.SESSION_CHALLENGE()
        },
        methods: {
            ...mapActions(['SESSION_CHALLENGE']),
        },
        computed: {
            ...mapGetters(['isauthed'])
        },

    }
</script>
<style lang="sass" scoped>
    .god-div
        overflow-x: hidden !important

</style>
