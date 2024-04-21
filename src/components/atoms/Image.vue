<template>
    <img :src="imgSrc" :alt="imgAlt" />
</template>

<script>
    export default {
        name: 'BmImage',
        props: {
            imgSrc: {
                type: String,
                default: ''
            },
            imgAlt: {
                type: String,
                default: 'nrsr-hlasovanie'
            }
        }
    }
</script>

<style lang="scss" scoped>
    img {
        width: 100%;
    }
</style>
