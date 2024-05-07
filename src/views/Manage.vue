<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import _ from 'lodash'
import { useRouter } from 'vue-router'

const defaultData = [
  { key: 'AWQ-8081', owner: '趙台麗', type: '鈑噴保險', id: 'B940500056' },
  { key: 'AWQ-8081', owner: '趙台麗', type: '一般', id: 'B240500056' },
  { key: 'BVH-3662', owner: '龍千玉', type: '定保', id: 'B2405000158' },
  { key: 'BVH-3662', owner: '龍千玉', type: '一般', id: 'B2405000158' },
  { key: 'BRR-5270', owner: '馬英九', type: '鈑噴保險', id: 'B240500056' },
  { key: 'BRR-5270', owner: '馬英九', type: '一般', id: 'B240500056' },
  { key: 'BFV-8807', owner: '王金平', type: '定保', id: 'B24050085158' },
  { key: 'BFV-8807', owner: '王金平', type: '一般', id: 'B2405000178' },
  { key: 'BFV-8807', owner: '王金平', type: '鈑噴保險', id: 'B240500056' },
  { key: 'BUA-3722', owner: '柯賜海', type: '一般', id: 'B240500056' },
  { key: 'BUA-3722', owner: '柯賜海', type: '定保', id: 'B2405700158' },
  { key: 'BUA-3722', owner: '柯賜海', type: '一般', id: 'A2405000158' },
  { key: 'BUA-3722', owner: '柯賜海', type: '定保', id: 'B24050085158' },
  { key: 'AXY-2209', owner: '洪金寶', type: '一般', id: 'B2405000178' },
  { key: 'BTC-7559', owner: '劉德華', type: '鈑噴保險', id: 'B240500056' },
  { key: 'AXY-2209', owner: '洪金寶', type: '一般', id: 'B240500056' },
  { key: 'AXY-2209', owner: '洪金寶', type: '定保', id: 'B2405700158' },
  { key: 'BTC-7559', owner: '劉德華', type: '定保', id: 'A2405000158' },
]
const router = useRouter()

const searchForm = reactive({ type: '0', text: '' })
const currentSearch = ref('')
const loading = ref(1)

const tableData = ref<typeof defaultData>([])
const tableDataRender = computed(() => {
  return _.filter(tableData.value, i => i.key.includes(currentSearch.value))
})

function submit() {
  loading.value += 1
  setTimeout(() => {
    currentSearch.value = searchForm.text
    loading.value -= 1
  }, 1000)
}
function refresh() {
  loading.value += 1
  setTimeout(() => {
    loading.value -= 1
  }, 1000)
}
function errHandler() {
  router.push('/')
}
setTimeout(() => {
  loading.value -= 1
  tableData.value = _.cloneDeep(defaultData)
}, 1000)
</script>

<template lang="pug">
#manage
  form(@submit.prevent="submit")
    h1 動態管制中心 - 工單狀態
    ul
      li(v-for="i in 4" :key="i" @click="errHandler")
    button.refresh(type="button" @click="refresh")
    select(v-model="searchForm.type")
      option(value="0") 牌照號碼
      option(value="1") 車主
    input(v-model="searchForm.text")
    button.submit
  table(:class="{loading}")
    thead
      tr.top
        th(colspan="9") 工單資訊(92/92)
        th(colspan="8") 工單進度
        th(colspan="5") 工單
      tr
        th #
        th 警示
        th 服務廠
        th 區位
        th 牌照號碼
        th 車主
        th 
        th 貢獻
        th 分類
        th 類別
        th 工單號碼
        th 進度
        th 理賠案號
        th 開單時間
        th 承諾交車
        th 交車方式
        th 金額
        th 服務專員
        th 承諾採購
        th 維修人員
        th 總計
        th 進度
    tbody
      tr(v-for="(i,index) in tableDataRender" :key="index" :data-type="i.type")
        td(@click="errHandler") {{ index+1 }}
        td(@click="errHandler")
          i(v-for="c in 3" :key="c")
        td(@click="errHandler") 北台中廠
        td(@click="errHandler")
        td(@click="errHandler").bg {{ i.key }}
        td(@click="errHandler") {{ i.owner }}
        td(@click="errHandler")
          span.copy 
        td(@click="errHandler")
          span.sp AA3
        td(@click="errHandler")
          span.sp I-0
        td(@click="errHandler") {{ i.type }}
        td.bg(@click="$router.push({name:'order',query:i})") {{ i.id }}
        td(@click="errHandler") 維修中
        td
        td(@click="errHandler") 05-06 11:05
        td(@click="errHandler") 05-07 11:05
        td(@click="errHandler") 自行取車
        td(@click="errHandler") 8,999
        td.bg(@click="errHandler") 葉佩欣
        td(@click="errHandler") 趙台麗
        td(@click="errHandler") 蔡英文
        td.bg-gray(@click="errHandler") 13223
        td.bg-gray(@click="errHandler") 20%
</template>

<style lang="sass" scoped>
#manage
  background: #fff
  padding: 0 10px
  min-height: 50vh
  > form
    display: grid
    grid-template-columns: 400px 1fr 50px 150px 200px 50px
    grid-template-rows: 40px
    gap: 5px
    align-items: center
    > h1
      font-size: 20px
      font-weight: bold
      color: #4B0082
    > ul
      display: grid
      grid-template-columns: repeat(4,40px)
      gap: 5px
      list-style: none
      padding: 0
      margin: 0
      > li
        height: 30px
        background: #eee
        border: 1px solid #999
        cursor: pointer
    > input
      height: 30px
      padding: 0 10px
    > select
      height: 30px
      font-size: 16px
      color: blue
      font-weight: bold

    > button
      border: 0
      cursor: pointer
      width: 30px
      height: 30px
      &:hover
        opacity: 0.5
      &.refresh
        background: url(@/assets/refresh.svg) no-repeat center
        background-size: contain
        padding: 0
        transform: rotate3d(0,1,0,180deg)
      &.submit
        background: url(@/assets/search.svg) #eee no-repeat center
        background-size: contain
        border: 1px solid #ccc
  table
    .bg-gray
      background: #eee
    .bg
      background: #E6E6FA
    td
      cursor: pointer
      &:hover
        transform: scale(1.05)
        text-decoration: underline
    tr[data-type='鈑噴保險']
      color: gray
      .bg
        background: #eee
    .copy
      background: url(@/assets/copy.svg) no-repeat center
      background-size: 20px
      width: 30px
      height: 40px
      display: block
      cursor: pointer
    .sp
      background: brown
      color: white
      display: block
      text-align: center
</style>
