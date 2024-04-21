<template>
    <div class="grid">
        <div class="col-12">
            <div class="intro">
                <bm-container>
                    <h1>Vanila js</h1>
                    <h3>Settings</h3>
                    <div>
                        <InputText
                            type="text"
                            v-model="iconPrefix"
                            placeholder="Icon prefix (f.e.: slg)"
                        />
                    </div>
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
    import InputText from 'primevue/inputtext'
    import Textarea from 'primevue/textarea'

    export default {
        name: 'ForVanilaJs',
        components: {
            BmContainer,
            Button,
            FileUpload,
            InputText,
            Textarea
        },
        setup() {
            const fileUploadRef = ref(null)
            const uploadedSVGContent = ref([])
            const generatedJavascript = ref('')
            const iconPrefix = ref('i')

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

                jsContent += `const iconPaths = [\n`

                uploadedSVGContent.value.forEach((svgFile) => {
                    const parser = new DOMParser()
                    const svgDoc = parser.parseFromString(svgFile.content, 'image/svg+xml')
                    const dAttribute = svgDoc.querySelector('path').getAttribute('d')
                    const viewBoxAttribute = svgDoc.querySelector('svg').getAttribute('viewBox')
                    const svgName = svgFile.name.replace(/\.[^/.]+$/, '')
                    jsContent += `        {\n`
                    jsContent += `          name: '${iconPrefix.value}-${svgName}',\n`
                    jsContent += `          d: '${dAttribute}',\n`
                    jsContent += `          viewBox: '${viewBoxAttribute}'\n`
                    jsContent += `        },\n`
                })
                jsContent += `  ];\n`

                // functionality to generate JS
                jsContent += `
const iconsPath=e=>{const t=iconPaths.find((t=>t.name===e));return t?{d:t.d,viewBox:t.viewBox}:{d:"",viewBox:""}},generateIcons=()=>{document.querySelectorAll('i[class^="${iconPrefix.value}-"]').forEach((e=>{const t=e.className,o=iconsPath(t);if(o){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("viewBox",o.viewBox);const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d",o.d),t.appendChild(n),e.appendChild(t)}else console.error("Icon not found:",t)}))};document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll('i[class^="${iconPrefix.value}-"]').forEach((e=>{const t=e.className,o=iconsPath(t);if(o){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("viewBox",o.viewBox);const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d",o.d),t.appendChild(n),e.appendChild(t)}else console.error("Icon not found:",t)}))}));
  `

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
                iconPrefix,

                onSelect
            }
        }
    }
</script>
