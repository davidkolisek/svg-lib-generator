const iconPaths = [
        {
          name: 'asdqwdqwdqwdqwd-backward-solid',
          d: 'M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z',
          viewBox: '0 0 512 512'
        },
        {
          name: 'asdqwdqwdqwdqwd-check-solid',
          d: 'M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z',
          viewBox: '0 0 448 512'
        },
  ];

const iconsPath=e=>{const t=iconPaths.find((t=>t.name===e));return t?{d:t.d,viewBox:t.viewBox}:{d:"",viewBox:""}},generateIcons=()=>{document.querySelectorAll('i[class^="asdqwdqwdqwdqwd-"]').forEach((e=>{const t=e.className,o=iconsPath(t);if(o){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("viewBox",o.viewBox);const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d",o.d),t.appendChild(n),e.appendChild(t)}else console.error("Icon not found:",t)}))};document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll('i[class^="asdqwdqwdqwdqwd-"]').forEach((e=>{const t=e.className,o=iconsPath(t);if(o){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("viewBox",o.viewBox);const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d",o.d),t.appendChild(n),e.appendChild(t)}else console.error("Icon not found:",t)}))}));
