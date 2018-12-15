<template>
    <div class="home-con">
        <h1>welcome to the boilerplate.</h1>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
            }
        },
        mounted () {
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style lang="sass" scoped>
    .home-con
        padding: 10px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        p
            font-size: 1.3em
        h1
            @media (min-width: 0px) and (max-width: 780px)
                text-align: left
                width: 100%
</style>
