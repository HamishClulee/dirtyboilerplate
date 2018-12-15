<template>
    <div class="construction-con">
        <h1 class="animate-me">
            <span class="letter">u</span>
            <span class="letter">n</span>
            <span class="letter">d</span>
            <span class="letter">e</span>
            <span class="letter">r</span>
            <span class="letter">__</span>
            <span class="letter">c</span>
            <span class="letter">o</span>
            <span class="letter">n</span>
            <span class="letter">s</span>
            <span class="letter">t</span>
            <span class="letter">r</span>
            <span class="letter">u</span>
            <span class="letter">c</span>
            <span class="letter">t</span>
            <span class="letter">i</span>
            <span class="letter">o</span>
            <span class="letter">n</span>
        </h1>
    </div>
</template>

<script>
    import anime from 'animejs'
    import { NODE } from '../axios'
    export default {
        name: 'underconstruction',
        data () {
            return {
                email: '',
                message: ''
            }
        },
        mounted () {
            anime.timeline()
                .add({
                    targets: '.animate-me .letter',
                    translateY: [-120, 10],
                    easing: "easeOutExpo",
                    duration: 2400,
                    delay: function(el, i) {
                        return 180 * i;
                    }
                })
        },
        methods: {
            submit() {
                if (this.email === '') {
                    this.message = 'you need to enter an email'
                } else {
                    NODE.post('/api/subscribe', this.email)
                        .then(() => {
                            this.message = "We'll be in touch soon!"
                        })
                        .catch(() => {
                            this.message = "Something went wrong, try again later"
                        })
                }
            }
        },
        computed: {
        }
    }
</script>
<style lang="sass" scoped>
    .construction-con
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
        flex-direction: row
        text-align: center
        color: $link
        @media (min-width: 0px) and (max-width: 780px)
            flex-direction: column
    .animate-me
        width: 100%
        color: $highlight
        overflow: hidden
        padding: 40px 0
        @media (min-width: 0px) and (max-width: 620px)
            font-size: 1.6em
        .letter
            display: inline-block
            line-height: 1em
</style>
