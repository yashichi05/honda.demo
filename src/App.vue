<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import navMenu from '@/components/menu.vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
const showMenu = reactive({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
})
const router = useRouter()
const currentTime = ref(Date.now())
const menu1 = ref([
  { name: '車輛資料', key: 0 },
  {
    name: '服務流程',
    key: 1,
    children: [
      {
        name: '動態管制中心',
        key: '1-1',
        props: {
          onclick() {
            router.push({ name: 'manage' })
          },
        },
      },
      { name: '控工構成', key: '1-2' },
      { name: '預約形成', key: '1-3' },
      { name: '車輛資料', key: '1-4' },
      { name: '預約單', key: '1-5' },
      { name: '估價單', key: '1-6' },
      { name: '維修工單', key: '1-7' },
      { name: '工時打卡', key: '1-8' },
      { name: '外修單', key: '1-9' },
      { name: '工單派遣', key: '1-10' },
      { name: '工時效率控制板', key: '1-11' },
    ],
  },
  { name: '車體管理', key: 2, children: [] },
  { name: '附配件管理', key: 3, children: [] },
  { name: '活動參數管理', key: 4, children: [] },
  { name: '顧客管理', key: 5, children: [] },
  { name: '贈品管理', key: 6, children: [] },
])
const menu2 = ref([
  { name: '零件主檔', key: 0 },
  {
    name: '零件查詢',
    key: 1,
  },
  { name: '零件進出貨查詢', key: 2 },
  { name: '零件凍結管理', key: 3, children: [] },
  { name: '零件報價', key: 4, children: [] },
  { name: '訂單管理', key: 5 },
  { name: '日常作業', key: 6 },
  { name: '廠際調度', key: 7 },
  { name: '出貨管理', key: 8 },
  { name: '盤點作業', key: 9 },
  { name: '待科作業', key: 10 },
  { name: '參數設定', key: 11 },
  { name: '零件庫位管理', key: 12 },
  { name: '零件資料複合檢所', key: 13 },
  { name: '零件合約維護', key: 14 },
  { name: '零件營區統計分析', key: 15 },
])

const timeStr = computed(() => {
  const d = dayjs(currentTime.value)
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const day = days[d.day()]
  return d.format(`YYYY年MM月DD日   ${day}   A hh:mm:ss [[UTC+08:00]]`)
})

setInterval(() => {
  currentTime.value = Date.now()
}, 1000)
</script>

<template lang="pug">
header
  .logo(@click="$router.push('/')")
  .info
    span {{ timeStr }}
    span 奕勝美  北台中廠  使用者：葉志慶
    span 192.168.0.1 / 10.10.201.1
nav
  div(@mouseleave="showMenu[3] = false" @click="showMenu[3] = true")
    span 系統
    nav-menu(v-if="showMenu[3]" :items="menu2")
  div(@mouseleave="showMenu[4] = false" @click="showMenu[4] = true")
    span 參數
    nav-menu(v-if="showMenu[4]" :items="menu2")
  div(@mouseleave="showMenu[1] = false" @click="showMenu[1] = true")
    span 服務
    nav-menu(v-if="showMenu[1]" :items="menu1")
  div(@mouseleave="showMenu[2] = false" @click="showMenu[2] = true")
    span 零件
    nav-menu(v-if="showMenu[2]" :items="menu2")
  div(@mouseleave="showMenu[5] = false" @click="showMenu[5] = true")
    span CR
    nav-menu(v-if="showMenu[5]" :items="menu2")
  div(@mouseleave="showMenu[6] = false" @click="showMenu[6] = true")
    span 財務
    nav-menu(v-if="showMenu[6]" :items="menu2")
  div(@mouseleave="showMenu[7] = false" @click="showMenu[7] = true")
    span 報表
    nav-menu(v-if="showMenu[7]" :items="menu2")
  div
    span 公佈欄

router-view
</template>

<style lang="sass" scoped>
header
  display: grid
  grid-template-columns: 1fr 500px
  grid-template-rows: 70px
  background: #fff
  color: #666
  font-size: 16px
  padding: 5px 10px
  > .logo
    background: url(@/assets/honda.svg) no-repeat left 20px center
    background-size: 170px
    cursor: pointer
    justify-self: start
    width: 300px
  > .info
    text-align: right
    display: grid
    line-height: 1.2
    align-self: center
    white-space: pre
    > span
      font-weight: bold
nav
  display: grid
  grid-auto-flow: column
  justify-content: start
  font-size: 16px
  color: white
  gap: 20px
  background: linear-gradient(to bottom,red,#8f0909)
  padding: 3px 20px
  height: 32px
  > div > span
    cursor: pointer
    padding: 0 10px
    &:hover
      background: white
      color: red
      border-radius: 100px
</style>
