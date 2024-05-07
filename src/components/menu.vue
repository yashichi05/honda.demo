<script setup lang="ts">
import { ref } from 'vue'
import navMenu from './menu.vue'
interface Item {
  name: string
  key: string | number
  children?: Item[]
  props?: unknown
}
defineProps<{ items: Item[] }>()

const activeKey = ref<null | string>(null)
</script>
<template lang="pug">
ul.menu
  li(v-for="i in items" :key="i.key" :class="{parent: i.children}" v-bind="i.props" @mouseenter="activeKey = i.key" @mouseleave="activeKey = null")
    span {{ i.name }}
    nav-menu(v-if="i.children && i.children.length && activeKey === i.key" :items="i.children")
</template>

<style lang="sass" scoped>
.menu
  background: #fff
  position: absolute
  color: #666
  list-style: none
  padding: 5px 0
  display: grid
  gap: 5px
  box-shadow: 0 0 2px #666
  width: fit-content
  z-index: 100
  > li
    cursor: pointer
    display: grid
    grid-template-columns: 1fr 15px
    padding: 0 5px
    position: relative
    white-space: nowrap
    &.parent::after
      content: ''
      background: url(@/assets/arrow.svg) no-repeat right center
      background-size: 10px
    &:hover > span
      background: red
      border-radius: 5px
      color: white
    > span
      padding: 0 10px
    > .menu
      left: 100%
</style>
