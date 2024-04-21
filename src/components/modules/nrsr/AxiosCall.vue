<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else v-html="tableHtml"></div>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    export default {
        name: 'BmAxiosCall',
        setup() {
            const tableHtml = ref('')
            const loading = ref(true)

            onMounted(async () => {
                try {
                    const response = await axios.get('http://localhost:8888/api/data')
                    tableHtml.value = response.data
                    loading.value = false
                } catch (error) {
                    console.error('Error fetching data from server:', error)
                }
            })

            return { tableHtml, loading }
        }
    }
</script>
