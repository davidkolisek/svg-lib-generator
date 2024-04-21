<template>
    <div class="donut-wrapper" v-if="!loading">
        <Chart
            type="doughnut"
            :data="chartData"
            :options="chartOptions"
            style="max-height: 300px"
        />
    </div>
</template>

<script>
    import Chart from 'primevue/chart'
    import { computed, onMounted, ref, watch } from 'vue'

    export default {
        name: 'VotesChart',
        components: {
            Chart
        },
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const loading = ref(true)
            const chartData = ref()
            const chartOptions = ref(null)
            const zaLength = computed(() => (props.data.za ? props.data.za.length : 0))
            const protiLength = computed(() => (props.data.proti ? props.data.proti.length : 0))
            const zdrzaliSaLength = computed(() =>
                props.data.zdrzaliSa ? props.data.zdrzaliSa.length : 0
            )
            const nehlasovaliLength = computed(() =>
                props.data.nehlasovali ? props.data.nehlasovali.length : 0
            )
            const nepritomniLength = computed(() =>
                props.data.nepritomni ? props.data.nepritomni.length : 0
            )

            // Update chart data and options when data changes
            watch(
                () => props.data,
                (newValue) => {
                    if (newValue) {
                        chartData.value = setChartData()
                        chartOptions.value = setChartOptions()
                    }
                }
            )

            const setChartData = () => {
                const documentStyle = getComputedStyle(document.body)
                const labels = []
                const backgroundColor = []
                const hoverBackgroundColor = []
                const data = []

                // Push labels and corresponding colors only if the corresponding data length is greater than 0
                if (zaLength.value > 0) {
                    labels.push('Za')
                    backgroundColor.push(documentStyle.getPropertyValue('--green-500'))
                    hoverBackgroundColor.push(documentStyle.getPropertyValue('--green-400'))
                    data.push(zaLength.value)
                }
                if (protiLength.value > 0) {
                    labels.push('Proti')
                    backgroundColor.push(documentStyle.getPropertyValue('--red-500'))
                    hoverBackgroundColor.push(documentStyle.getPropertyValue('--red-400'))
                    data.push(protiLength.value)
                }

                if (zdrzaliSaLength.value > 0) {
                    labels.push('Zdržalo sa')
                    backgroundColor.push(documentStyle.getPropertyValue('--orange-500'))
                    hoverBackgroundColor.push(documentStyle.getPropertyValue('--orange-400'))
                    data.push(zdrzaliSaLength.value)
                }
                if (nepritomniLength.value > 0) {
                    labels.push('Neprítomní')
                    backgroundColor.push(documentStyle.getPropertyValue('--gray-500'))
                    hoverBackgroundColor.push(documentStyle.getPropertyValue('--gray-400'))
                    data.push(nepritomniLength.value)
                }
                if (nehlasovaliLength.value > 0) {
                    labels.push('Nehlasovali')
                    backgroundColor.push(documentStyle.getPropertyValue('--indigo-500'))
                    hoverBackgroundColor.push(documentStyle.getPropertyValue('--indigo-400'))
                    data.push(nehlasovaliLength.value)
                }

                return {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: backgroundColor,
                            hoverBackgroundColor: hoverBackgroundColor
                        }
                    ]
                }
            }

            const setChartOptions = () => {
                const documentStyle = getComputedStyle(document.documentElement)
                const textColor = documentStyle.getPropertyValue('--text-color')

                return {
                    plugins: {
                        legend: {
                            labels: {
                                cutout: '60%',
                                color: textColor
                            }
                        }
                    }
                }
            }

            onMounted(() => {
                props.data ? (chartData.value = setChartData()) : null
                props.data ? (chartOptions.value = setChartOptions()) : null
                setTimeout(() => {
                    loading.value = false
                }, 500)
            })

            return {
                chartData,
                chartOptions,
                loading
            }
        }
    }
</script>

<style lang="scss" scoped>
    .donut-wrapper {
    }
</style>
