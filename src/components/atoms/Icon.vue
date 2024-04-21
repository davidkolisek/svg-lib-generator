<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="iconPath.viewBox"
      :width="`${size}px`"
      :height="`${size}px`"
  >
    <path :fill="color" :d="iconPath.d"/>
  </svg>
</template>

<script>
import {computed} from 'vue'
import {IconsPath} from '@/helpers/iconsPath'

export default {
  name: 'BmIcon',
  props: {
    color: {
      type: String,
      default: 'black'
    },
    size: {
      type: [Number, String],
      default: 12
    },
    icon: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const iconPath = computed(() => {
      return IconsPath(props.icon)
    })

    return {
      iconPath,
    }
  }
}
</script>
