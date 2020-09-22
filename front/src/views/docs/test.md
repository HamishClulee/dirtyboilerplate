# Organising Style Out Of Chaos
## Some things I've learned that might help you to avoid CSS fatigue

> This guide is intended to assist Frontend devs that are looking for guidance around how to organise their CSS and pre-processors. Specifically focused on projects that conform to the `vue-cli` structure, but the majority of info here will be applicable to all Vue codebases that are run behind a build system, basically any code bases that use SFC. I have used a lot of the ideas here with React codebases as well. Hopefully you can glean some useful info and find ways to improve your approach.

### The Ideal Way To Set Up SCSS Imports and Structure For FE Codebases
First things first, let’s get the order of imports - in our entry point JS file - correct.

1. Import any vendor styles at the top of the entry point javascript file, this means any third party packages, make sure you import the `*.min.css` version, usually found in the `/dist` directory of the packages node_module. You may need to ensure that these imports can be parsed (if **not** using `vue-cli`), for memory, webpack won't parse non-js imports by default.

2. Create a folder for your global styles, then create an index file using whatever pre-processor extension you've choosen, for me, generally it's `index.sass`. Import the index file from the `/style` directory into the entry point JS file, import it _after_ the vendor styles.

3. Commence JavaScript set up as usual.

Next let’s quickly ensure everyone understands CSS Specificity, then we can talk about how to apply that idea to FE code bases. Have a look at [this](https://stackoverflow.com/questions/25105736/what-is-the-order-of-precedence-for-css), the basic idea is to know which rule gets applied to the broswer when there is more than one option.

### Reach Grok For CSS Specificity

The image below is a pretty good visual representation of the point I'm trying to make.

![CSS Specificity](/images/css.png "Diagram displaying CSS Specificity")
                  
The aim of the list - _the order of imports in your entry point_ - is to place all of the vendor and pre-processed styles in the user-agent category seen in the image above, and have the vendor styles placed in the hieracy so they can be overridden without any problems. If the vendor has written questionable CSS - no problem - it's easy to override. I am aware that the image and the examples I'm providing do not share a 1:1 relationship, bear with and try to take a higher level view at this point, things will become clear as you read on. Think about the following examples:

```scss
// main.css
.page-container {
    width: 98%;
    margin: 55px auto;
    max-width: $page-max-width;
    min-width: $min-width-mobile-device;
}
.home-page-container {
    width: 80%;
}
```
```html
// Home.vue
<template>
    <div class="page-container home-page-container">
        // content here
    </div>
</template>

```

It’s a simple one. The idea is that there are two rules for the width of the `<div>` right? So which one does the broswer choose to use? In this case it's the most recently used rule. So the width would be `80%`. What about if I added these two items...

```scss
// main.css
.page-container {
    width: 98%;
    margin: 55px auto;
    max-width: $page-max-width;
    min-width: $min-width-mobile-device;
}
.home-page-container {
    width: 80% !important;
}
```
```html
// Home.vue
<template>
    <div class="page-container home-page-container" style="width: 1400px;">
        // content here
    </div>
</template>
```
Would the width be `1400px` or `80%`?

This is why the most important thing to learn in CSS is Specificity. Read [this link](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#:~:text=Specificity%20is%20the%20means%20by,different%20sorts%20of%20CSS%20selectors.), it's an MDN article explaining CSS specificity, and well worth a read.

### Writing Better Styles - How To Use Your Global Style Directory

In a perfect world, the `/style` directory would contain three things:

- Variables
- Mixins
- Default rules written in a broad fashion (examples below) aimed at catching the majority of use cases; typography, forms, containers etc

The grey area begins when you start to think about adding helpers and utility rules to your global styles, it's a good idea and the theory is solid, but it can quickly go too far and slow down the dev environment, speaking from experience, if you have a lot of juniors, things might get messy fast. I think a good rule of thumb is based on reusage, if you know that the rule you are writting can be used in multiple places, it probably belongs in the global space. Again, this is more art than science, weigh your needs and use cases and spend some time thinking through the best place to draw the line between global and scoped styles. In my opinion, future proofing your application CSS is a big win for developer happiness, and therefore worth spending some time to formalize and document best practices.

Anyway, default styles found in the global folder might look something like this...

```scss
// input.scss
input {
    font-size: 1.2em;
    border-bottom: 1px solid $medium-gray;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    font-size: 1.2em;
    padding: 7px 0;
    outline: none;
    &:hover {
        border-bottom: 1px solid $medium-gray;
        border-top: none;
        border-left: none;
        border-right: none;
    }
    &:focus {
        border-bottom: 1px solid $secondary;
        border-top: none;
        border-left: none;
        border-right: none;
        box-shadow: none;
    }
}
```
The goal here is write styles that apply to most `<inputs>`.

They could be based on the values from your organisations design guide (a smart dev might start thinking about using a design-dev integration of some sort here).

The example above aims to achieve a set up where putting am `<input>` element on the page requires no extra styling; unless something about this specific input calls for something different from the norm. Maybe the ticket you are working on calls for the `:foucs` on the input to be red?

**Thats when you write your styles in the `<style scoped>` block of your Vue component.**

```sass
// Example of what a typography.sass file might look like
h1, h2, h3, h4, h5, h6
    line-height: 1.5
    font-weight: lighter
    font-family: $heading-font

h1
    font-size: $h1-fontsize
    line-height: 110%
    margin: ($h1-fontsize / 2.3) 0 ($h2-fontsize / 2.9) 0
    @media (min-width: 520px) and (max-width: 1080px)
        font-size: ($h1-fontsize / 1.3)
    @media (min-width: 0px) and (max-width: 520px)
        font-size: ($h1-fontsize / 2.3)

h2
    font-size: $h2-fontsize
    line-height: 110%
    margin: ($h2-fontsize / 2.3) 0 ($h2-fontsize / 2.9) 0
h3
    font-size: $h3-fontsize
    line-height: 110%
    margin: ($h3-fontsize / 2.3) 0 ($h2-fontsize / 2.9) 0
h4
    font-size: $h4-fontsize
    line-height: 110%
    margin: ($h4-fontsize / 2.3) 0 ($h2-fontsize / 2.9) 0
h5
    font-size: $h5-fontsize
    line-height: 110%
    margin: ($h5-fontsize / 2.3) 0 ($h2-fontsize / 2.9) 0
h6
    font-size: $h6-fontsize
    line-height: 110%
    margin: ($h6-fontsize / 2.3) 0 ($h2-fontsize / 2.9) 0

a
    text-decoration: none
    color: $link
    font-family: $body-font
    &:hover
        color: darken($link, 10)

p
    font-size: 1.5em
    @media (min-width: 520px) and (max-width: 1080px)
        font-size: 1.2em
    @media (min-width: 0px) and (max-width: 520px)
        font-size: 1em
strong
    font-weight: bold
small
    font-size: 75%
    .light
        font-weight: 300
    .thin
        font-weight: 200
```
The goal here is to set reasoanbly wide defaults that apply in _most_ cases. The desired result is to reduce the amount of styles being written in our SFC. The same as the `<input>` example above, if for some reason an atypical `<h1>` was required, you would write the rules in the `scoped` style block in your SFC. Don't forget that because of the order of your imports, and CSS Specificity rules, these global styles are organised in way that encourages them to be overidden within your SFC.

In general - when building an app or refactoring a codebase - I'll end up with files for:

- Buttons
- Typography
- Containers
- Forms
- Page Layouts
- Mixins
- Variables

Where you land depends on your use case, people who are using a UI framework need to think carefully about how they want to oragnise things. All of the major frameworks I've worked with; Bulma, Foundation and Bootstrap feature documentation that directly contradicts what I'm saying here, but here goes... If you _absolutely have to use a framework_ then cherrypick it outside of the codebase then use the compiled minified result and import it like a vendor stylesheet. You will feel a lot less pain six months down the track.

>If you want my advise, don't use a framework. The amount of time you spend figting it to achieve what you want and the absolutely insane size of most of them equals a net negative. You'll clip the wings of your Frontend devs, and while you might move a _little_ faster to begin with, you will end up sinking a ton of time into fighting the framework down the road. CSS fatigue is a big factor in making devs unhappy!

### A Quick Note On Pre-Processor Usage and Global Variables

Without getting too far off track, a `vue-cli` project can easily be modified to allow usage of pre-processor variables and mixins _within_ `scoped` style blocks by default. Like so...

```sass
<style scoped lang="sass">
.cool-heading
    color: $variable-from-global-styles
</style>
```
I would suggest you don't use `@import` in your style blocks, it can lead to large scale duplication of CSS in your final bundle. If for some reason you can't use the examples below (possibly an older build system, or badly written webpack config) check out the `@use` rule. Apologies to those of you using LESS or Stylus, I don't know if this applies.

Here is how I achieve this in `vue-cli` codebases, in a perfect world.
```bash
yarn add style-resources-loader
```
```javascript
// vue.config.js - located at root
const path = require('path')

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
    },
}

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/style/index.sass'),
            ],
        })
}
```
This is just one of many ways to place global pre-processor variables in scope of `scoped` style blocks, I hope it helps!

### Styles Being Used Within Vue Single File Components

> I find it very rare to need to use a style block without the `scoped` attribute, it does happen, but this post is centered around the assumption that all SFC style blocks use `scoped`.

So following on from the ideas above, the styles I'm about to talk about will be nearer the bottom of the hieracy image. Namely; Document, inline and computed styles. Again, not a 1:1 relationship becuase styles that use the Vue `scoped` attribute effectively short circuit that list, but let's press on and things will become more clear.

Here is the list of style instances that you will end up using in a typical `vue-cli` codebase, in the same format as the image - lower in the list will override items higher in the list.

1. Styles written inside Vue `scoped` style blocks. 
> Don't forget that anything written in `scoped` style block will not apply to things like `v-html` content, or any html added dynamically via javascript (useless you are crafty and scrape the `v-data` attribute from the component, and apply it to every node of dynamic html)
2. Inline styles written on HTML elements using the standard HTML syntax, but in our case this would most likely become styles added by the Vue `style` attribute.
3. Styles written via Javscript.


Which should bring us to a place where the traditional model - _shown in the hieracy image above_ - is now replaced by our new paradigm.

> Things to keep in mind. The order in which we import things is important, especially in complex SPA applications like ours. So, we import the third party stuff first, so we can easily override it if we want to customise, and so we don't have to use `!important` or an inline style to do so. After the imports are set, then the hieracy within our SFC is basically (from low to high): Scoped Style Blocks, Vue `style` attribute, html inline `style` attribute (these two have a slighly different syntax) and finally styles written via Javascript. 

### A Note On Performance In Dev Envs

Want to use a hot reload in dev that takes 20ms instead of 3s...?

I suggest trying to minimise the amount of CSS pre-processing you are performing. Use vendor styles that are already compiled and import them early to allow for ease of override. Recently I worked with a code base that made no use of `scoped` style blocks and contained a vast number of .scss files (around 8k lines when compiled). The hot reload was so slow that it became useless, as it was faster to switch tabs and hit refresh in the browser. After completing the steps described above, the hot-reload was back down to matter of milliseconds. It works.

> What we are trying to do here is achieve a system where we build smart defaults, that work in as many cases as possible, then when overrides are required, we have the awesome power of the Vue `scoped` style blocks. This will mean our CSS bundle stays small and we don't spend time fighting our CSS. It takes a bit of time to understand but once you hit grok, it's a big win for developer satisfaction - and lead time will drop as well!

### Conclusion

It's a lot right? Don't use a framework, don't let juniors loose on CSS things without documentation and training and code reviews to back you up, read a 1000 word post and still don't feel super confident. Welcome to the party. It's complex.

My patter when it comes to this is two fold:
- Don't underestimate how badly CSS can end up over time. Bundle size and abject developer frustration are things you really want to avoid if possible.
- Try to think about this on a high level, things have changed dramatically over the last few years, we have a lot more tools at our disposal, try to use them to improve how you organise things.

> Modern CSS is like an onion, use the layers intelligently or they will make you cry!

All told.