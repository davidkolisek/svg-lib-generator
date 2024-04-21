<template>
    <bm-box display="flex">
        {{ isSummaryStep }}
        <bm-button color="blue" variant="outlined" @click="handleBack">Spat</bm-button>
        <bm-button color="yellow" variant="contained" @click="handleNext">Dalej</bm-button>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmButton from '@atoms/Button.vue'
    import { useStore } from 'vuex'
    import { computed } from 'vue'

    export default {
        name: 'SteppingButtons',
        components: {
            BmButton,
            BmBox
        },
        setup() {
            const store = useStore()
            const isSummaryStep = computed(() => store.getters['stepping/isSummaryStep'])

            const handleNext = async () => {
                if (isSummaryStep.value) {
                    await store.dispatch(
                        'newProduct/addNewProduct',
                        store.getters['newProduct/getNewProduct']
                    )
                }
                store.dispatch('stepping/stepNext')
            }

            const handleBack = async () => {
                store.dispatch('stepping/stepBack')
            }

            return {
                handleNext,
                handleBack,
                isSummaryStep
            }
        }
    }
</script>

<style lang="scss" scoped></style>
