<template>
    <div class="construction-con">
        <h1>This MEVN app is currently under construction</h1>
    </div>
</template>

<script>
export default {
  name: 'underconstruction',
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
</style>
