const generateJavascriptFile = () => {
    let jsContent = ''
    uploadedSVGContent.value.forEach((svgFile) => {
        jsContent += `const ${svgFile.name.replace(/\.[^/.]+$/, '')} = '${svgFile.content}';\n`
    })

    // Add your own JavaScript content here
    jsContent += `
    // Your own JavaScript content
    function myFunction() {
      console.log('Hello from myFunction!');
    }
  `

    // You can modify the filename as per your requirement
    const filename = 'generated.js'
    const blob = new Blob([jsContent], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
