<template>
    <div>
        <div class="drop-area" @dragover.prevent @drop="handleDrop">
            <p>Drag and drop files here</p>
        </div>
        <input type="file" multiple @change="handleFileSelect" />
    </div>
</template>

<script>
    import { ref } from 'vue'

    export default {
        name: 'ImageUploader',
        setup() {
            const selectedFiles = ref([])

            const handleDrop = (event) => {
                event.preventDefault()
                selectedFiles.value = Array.from(event.dataTransfer.files)
                convertAndStoreImages(selectedFiles.value)
            }

            const handleFileSelect = (event) => {
                const files = Array.from(event.target.files)
                selectedFiles.value = files
                convertAndStoreImages(files)
            }

            const convertAndStoreImages = (files) => {
                const base64Images = []

                for (const file of files) {
                    const reader = new FileReader()

                    reader.onload = (e) => {
                        const base64Image = e.target.result
                        base64Images.push(base64Image)

                        if (base64Images.length === files.length) {
                            // All images are converted to base64, you can now store them in localStorage
                            localStorage.setItem('selectedImages', JSON.stringify(base64Images))
                        }
                    }

                    reader.readAsDataURL(file)
                }
            }

            return {
                selectedFiles,
                handleFileSelect,
                handleDrop
            }
        }
    }
</script>

<style>
    .drop-area {
        width: 300px;
        height: 150px;
        border: 2px dashed #ccc;
        text-align: center;
        line-height: 150px;
        cursor: pointer;
    }
</style>
