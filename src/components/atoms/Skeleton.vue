<template>
    <bm-box :class="getClassList()"></bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'

    export default {
        name: 'BmSkeleton',
        components: { BmBox },
        setup(props) {
            const getClassList = () => {
                const list = ['bm-skeleton']
                if (props.variant) list.push(`bm-tag__${props.variant}`)

                return list.join(' ')
            }
            return { getClassList }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-skeleton {
        width: 100%;
        height: 400px;
        background-color: #ededed;
        border-radius: $br-large;
        //background: linear-gradient(
        //        100deg,
        //        rgba(255, 255, 255, 0) 40%,
        //        rgba(255, 255, 255, .5) 50%,
        //        rgba(255, 255, 255, 0) 60%
        //) var(--loading-grey);
        //background-size: 200% 100%;
        //background-position-x: 180%;
        animation: 1s loading ease-in-out infinite;
    }

    @keyframes loading {
        to {
            background-position-x: -20%;
        }
    }
</style>
