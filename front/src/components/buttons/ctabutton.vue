<template>
  <button class="button button-flat cta-button-home" @click="donow">{{ text }}</button>
</template>

<script>
export default {
    name: 'ctabutton',
    props: {
        text: {
            required: true,
            type: String,
        },
        do: {
            required: true,
            type: Function,
        },
    },
    methods: {
        donow () {

            this.do()

        },
    },
}
</script>

<style scoped lang="sass"></style>