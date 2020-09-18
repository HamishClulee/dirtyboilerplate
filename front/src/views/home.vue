<template>
    <main class="home-con page-container">

        <displaysection sassclass="white">

            <div class="landing-con">
                <object id="qr-svg" type="image/svg+xml" data="/svg/qrcode.svg"></object>
        
                <div class="heading-con">
                    <h1 class="main-h1" :class="showheading ? 'fadein' : 'hidden'">Don't waste your time with welcome booklets!</h1>
                    <object :class="showtext ? 'fadein' : 'hidden'" id="text-svg" type="image/svg+xml" data="/svg/text.svg"></object>
                </div>
            </div>

            <footer class="construction-foot layout-col layout-center-all" @click="scrollDown">
                <div class="icon-backer" @click.stop="scrollDown"></div>
                <h6 @click.stop="scrollDown" class="h6">FIND OUT WHY!</h6>
            </footer>

        </displaysection>

        <displaysection id="srcoll-pop" sassclass="primary">

            <h1 class="h1">Welcome QR is the perfect solution for Airbnb and Holiday accommodation providers.</h1>
            <h2 class="h2">
                Printing a physical welcome book for your guests is expensive, time consuming
                and error prone. Books become untidy over time and require a reprint even for small changes.
                There is a better solution - Choose WelcomeQR.
            </h2>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>

        </displaysection>

        <displaysection sassclass="secondary">
            <p>
                We provide you with eveything you need; an awesome online editor and easily downloadable files.
                Your guests simply scan the QR we provide and are directed to your fully customisable web site.
                Want to make a change? It'll only take a few seconds, literally!
            </p>
            <h1 class="h1">
                We know your life is busy, and we know that saving time and increasing value is the 
                way to success in your industry!
            </h1>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection sassclass="tertiary">
            <p>
                Welcome QR gives you the competitive edge over the Airbnb next door, still 
                using ancient technology!
            </p>
            <p>
                While they are still providing the same Welcome book they printed years ago, 
                you have updated your website with the latest info about the area or about new offers with your partner 
                businesses.
            </p>
            <p>
                Want to inform guests of up-coming events or upload different welcome text containing 
                seasonal information?
            </p>
            <h1 class="h1">
                Have the freedom to create and delete things at will, never use the printers again!
            </h1>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection sassclass="highlight">
            <p>
                Our online editor can be used from your mobile or desktop, and provides you with a 
                large amount of freedom to make your content appear as you want it.
                <ul>
                    <li><span class="tilde">~</span>Upload images and video</li>
                    <li><span class="tilde">~</span>Make multiple pages</li>
                    <li><span class="tilde">~</span>Use your brand colors and logo</li>
                    <li><span class="tilde">~</span>Insert Maps</li>
                    <li><span class="tilde">~</span>Link to locations or websites</li>
                </ul>
            </p>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>
        
    </main>
</template>

<script>
import displaysection from '../components/displaysection'
import ctabutton from '../components/buttons/ctabutton'
import Vivus from 'vivus'
export default {
    name: 'home',
    components: {
        displaysection,
        ctabutton,
    },
    data () {

        return {
            showtext: false,
            showheading: false,
            qrviv: null,
            textviv: null,
            qrtime: null,
            texttime: null,
        }

    },
    mounted () {
    /*  
        this block manages the animations seen at the top of the home route
        Two time outs to manage the timing of the animations, two animations
        one for the qr code svg, one for the sub text svg
    */
        this.qrviv = new Vivus('qr-svg', {
            type: 'delayed',
            duration: 800,
            animTimingFunction: Vivus.EASE_IN,
        }, () => { /* fires at completed */ })
        this.qrtime = setTimeout(() => this.showheading = true, 1500)
        this.texttime = setTimeout(() => {
            this.showtext = true
            this.textviv = new Vivus('text-svg',   {
                type: 'sync',
                duration: 100,
            }, () => { /* fires at completed */ })
        }, 3000)

        /* END */
    },
    methods: {
        ctaroute () { this.$router.push({name: 'manage'}) },
        scrollDown() {
            const el = document.getElementById('srcoll-pop')
            el.scrollIntoView({
                alignToTop: true, behavior: 'smooth',
            })
        },
    },
    beforeDestroy() {
        clearTimeout(this.qrtime)
        clearTimeout(this.texttime)
    },
}
</script>

<style lang="sass" scoped>
.icon-backer
    background: center / contain no-repeat url("/svg/arrow-circle-down.svg")
    height: 50px
    width: 50px
.landing-con
    width: 100%
    display: flex
    align-items: center
    display: flex
    text-align: left
    @media (min-width: 0px) and (max-width: 1000px)
        flex-direction: column
        align-items: flex-start
        justify-content: center
#qr-svg
    height: 300px
    @media (min-width: 0px) and (max-width: 1000px)
        height: 40vw
#text-svg
    width: 80%
    max-width: 800px
.construction-foot
    width: 100%
    position: absolute
    bottom: 0
    height: 100px
    cursor: pointer
.heading-con
    display: flex
    flex-direction: column
    text-align: left
    align-items: flex-start
    padding-left: 1em
    @media (min-width: 0px) and (max-width: 1000px)
        padding-left: 0
.home-con
    text-align: center
    width: 100%
    margin-top: 0
.main-h1
    font-size: 2.8em
    font-family: $heading-font
.h1
    font-size: 1.8em
.h2
    font-size: 1.6em
    font-weight: lighter
p
    font-size: 1.8em
    font-family: $body-font
ul
    list-style: none
    text-align: left
    margin-left: 4em
li
    font-size: 1.4em
    font-family: $heading-font
    margin-left: -60px
    text-align: left
.tilde
    color: $primary
.hidden
    opacity: 0
.fadein
    transition: opacity 1s ease
    opacity: 1
</style>
