const iconPaths = [
        {
          name: 'i-backward-solid',
          d: 'M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z',
          viewBox: '0 0 512 512'
        },
        {
          name: 'i-x-solid',
          d: 'M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z',
          viewBox: '0 0 384 512'
        },
        {
          name: 'i-check-solid',
          d: 'M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z',
          viewBox: '0 0 448 512'
        },
  ];

const iconsPath=e=>{const t=iconPaths.find((t=>t.name===e));return t?{d:t.d,viewBox:t.viewBox}:{d:"",viewBox:""}},generateIcons=()=>{document.querySelectorAll('i[class^="i-"]').forEach((e=>{const t=e.className,o=iconsPath(t);if(o){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("viewBox",o.viewBox);const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d",o.d),t.appendChild(n),e.appendChild(t)}else console.error("Icon not found:",t)}))};document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll('i[class^="i-"]').forEach((e=>{const t=e.className,o=iconsPath(t);if(o){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("viewBox",o.viewBox);const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d",o.d),t.appendChild(n),e.appendChild(t)}else console.error("Icon not found:",t)}))}));
