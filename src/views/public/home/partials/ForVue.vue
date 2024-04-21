<template>
  <div class="grid">
    <div class="col-12">
      <div class="intro">
        <bm-container>
          <h1>Vue js</h1>
          <bm-icon icon="backward-solid" />

          <div class="card">
            <FileUpload
                ref="fileUpload"
                name="demo[]"
                :multiple="true"
                accept="image/svg+xml"
                @select="onSelect"
            >
              <template #empty>
                <p>Drag and drop files here to upload.</p>
              </template>
            </FileUpload>
          </div>
          <Button label="Generate JS!" @click="processUploadedSVGs" />

          <div v-if="generatedJavascript" class="generated-javascript">
            <h3>Generated JavaScript:</h3>
            <!--            <pre>{{ generatedJavascript }}</pre>-->
            <Textarea
                v-model="generatedJavascript"
                rows="30"
                cols="30"
                style="width: 100%"
            />
          </div>
        </bm-container>
      </div>
    </div>
  </div>
</template>

<script>
    import { ref } from 'vue'
    import FileUpload from 'primevue/fileupload'
    import Button from 'primevue/button'
    import BmContainer from '@/components/layout/Container.vue'
    import Textarea from "primevue/textarea";
    import BmIcon from "@/components/atoms/Icon.vue";

    export default {
        name: 'ForVue',
        components: {
            BmContainer,
            Button,
          Textarea,
            FileUpload,
          BmIcon
        },
        setup() {
            const fileUploadRef = ref(null)
            const uploadedSVGContent = ref([])
            const generatedJavascript = ref('')

            const processUploadedSVGs = () => {
                uploadedSVGContent.value = [] // Clear previous content
                let count = 0 // Keep track of the number of files processed
                for (let i = 0; i < fileUploadRef.value.files.length; i++) {
                    const file = fileUploadRef.value.files[i]
                    if (file.type === 'image/svg+xml') {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                            uploadedSVGContent.value.push({
                                name: file.name,
                                content: event.target.result
                            })
                            count++
                            // Check if all files are processed
                            if (count === fileUploadRef.value.files.length) {
                                generateJavascript()
                            }
                        }
                        reader.readAsText(file)
                    }
                }
            }

            const generateJavascript = () => {
                let jsContent = ''

                jsContent += `export const IconsPath = (props) => {
    switch (props) {\n`

                uploadedSVGContent.value.forEach((svgFile) => {
                    const parser = new DOMParser()
                    const svgDoc = parser.parseFromString(svgFile.content, 'image/svg+xml')
                    const dAttribute = svgDoc.querySelector('path').getAttribute('d')
                    const viewBoxAttribute = svgDoc.querySelector('svg').getAttribute('viewBox')
                    const svgName = svgFile.name.replace(/\.[^/.]+$/, '')

                    jsContent += `      case '${svgName}':\n`
                    jsContent += `        return {\n`
                    jsContent += `          d: '${dAttribute}',\n`
                    jsContent += `          viewBox: '${viewBoxAttribute}'\n`
                    jsContent += `        };\n`
                })

                jsContent += `      default:\n`
                jsContent += `        return {\n`
                jsContent += `        d: '',\n`
                jsContent += `        viewBox: '',\n`
                jsContent += `      }\n`
                jsContent += `    }\n`
                jsContent += `  };\n`

                // Add your own JavaScript content here
                jsContent += ``

                generatedJavascript.value = jsContent
            }

            const onSelect = (event) => {
                console.log(event)
                fileUploadRef.value = event
                console.log(fileUploadRef.value)
            }

            return {
                fileUploadRef,
                uploadedSVGContent,
                generatedJavascript,
                processUploadedSVGs,

                onSelect
            }
        }
    }
</script>
