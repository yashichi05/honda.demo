<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, reactive, ref, toRefs, nextTick } from 'vue'
import confirm from './confirmBox.vue'
import _ from 'lodash'

defineEmits<{ (e: 'close'): void }>()

const loading = ref(true)
const loadingMain = ref(false)
const currentTimeLineBaseX = ref(0)
const currentTimeLineX = ref(0)
const miniW = ref(document.querySelector('#app')?.offsetWidth || 0)
const unsupportDrag = reactive({
  active: Boolean(navigator.platform.match(/Arm/i)),
  draging: false,
  pos: { x: 0, y: 0 },
})
const { x: floatX, y: floatY } = toRefs(unsupportDrag.pos)
const currentHour = ref(dayjs().hour())
const confirmBox = reactive({
  show: false,
  data: [-1, -1, -1],
})

const workers = ref(
  _.shuffle([
    {
      category: '北台中接待組',
      list: _.shuffle(['詩文冰', '李白', '范仲淹', '盧秀燕', '孫中山', '陳進興', '陳金火']),
    },
    {
      category: '北台中板金組',
      list: _.shuffle(['黃興華', '賴瑞麟', '羅小淇', '陳昱洲', '洪俊哲', '葉志慶']),
    },

    {
      category: '北台中摸魚組',
      list: _.shuffle(['洪仲秋', '朱自清', '李家同', '黃明智']),
    },
  ]),
)
const mainLoadingFixY = ref(0)
const added = ref([-1, -1, -1])

const timeStr = computed(() => {
  const d = dayjs()
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const day = days[d.day()]
  return d.format(`YYYY-MM-DD   ${day}`)
})

function dragstartHandler(evt: DragEvent) {
  if (!evt.dataTransfer) return
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
}
function dropHandler(...result: number[]) {
  confirmBox.show = true
  confirmBox.data = result
}
function mouseupHandler2(...result: number[]) {
  if (!unsupportDrag.active) return
  if (!unsupportDrag.draging) return
  mouseupHandler()
  dropHandler(...result)
}
function confirmHandler() {
  confirmBox.show = false
  loadingMain.value = true
  setTimeout(() => {
    loadingMain.value = false
    added.value = confirmBox.data
  }, 1000)
}
function mainScrollHandler(evt: Event) {
  if (evt.target instanceof HTMLElement) {
    mainLoadingFixY.value = evt.target.scrollTop
  }
}
function mousedownHandler() {
  if (!unsupportDrag.active) return
  unsupportDrag.draging = true
}
function mousemoveHandler(evt: MouseEvent) {
  if (!unsupportDrag.active) return
  if (!unsupportDrag.draging) return
  unsupportDrag.pos.x = evt.pageX
  unsupportDrag.pos.y = evt.pageY
}
function mouseupHandler() {
  if (!unsupportDrag.active) return
  unsupportDrag.draging = false
  unsupportDrag.pos.x = 0
  unsupportDrag.pos.y = 0
}

setTimeout(() => {
  loading.value = false
  nextTick(() => {
    const el = document.querySelector('.time-ticks')
    if (!el) return
    currentTimeLineBaseX.value = el.offsetLeft
    currentTimeLineX.value = el.offsetWidth * 0.58
  })
}, 1000)
</script>

<template lang="pug">
#schedule(@click.self="$emit('close')" @mouseup="mouseupHandler" @mousemove="mousemoveHandler")
  .float(v-if="unsupportDrag.draging") B24050085158
  .window
    .title
      span 維修指派作業
      i.small
      i.big
      i.close(@click="$emit('close')")
    .body
      .top
        ul
          li
          li
        span 隱藏完工單
        span 顯示所有
      table.loading(v-if="loading")
      template(v-else)
        .main(@scroll="mainScrollHandler")
          confirm(v-if="confirmBox.show" @confirm="confirmHandler" @close="confirmBox.show = false")
          table(:class="{loading: loadingMain}")
            thead
              tr.top
                th(colspan="4")
                th
                  i.left
                  span {{ timeStr }}
                  i.right
              tr.top
                th 部門
                th 技師
                th 工時
                th 台數
                th.time-ticks-title
                  section
                    span(v-for="c in 10" :key="c")  {{ currentHour + c - 6 }}
            tbody
              template(v-for="(i,wi) in workers" :key="i.category")
                tr(v-for="(ppl,index) in i.list" :key="ppl")
                  td {{ !index ?i.category:'' }}
                  td {{ ppl }}
                  td
                  td
                  td.time-ticks
                    section
                      span(
                        v-for="c in 10" :key="c" 
                        @drag.prevent @dragmove.prevent 
                        @dragenter.prevent @dragend.prevent 
                        @dragleave.prevent @dragstart.prevent 
                        @dragover.prevent @drop.prevent="dropHandler(wi,index,c)"
                        @mouseup.prevent="mouseupHandler2(wi,index,c)"
                      )
                        i(v-if="wi === added[0] && index === added[1] && c === added[2]") {{ $route.query.key }} 葉志慶
        .other
          table
            thead
              tr.top
                th(colspan="2") 日期設定附位資料
              tr
                th 設備
                th 車輛 / 工單資料
            tbody
              tr(v-for="i in 20" :key="i")
                td 0702 張忠謀
                td
        .cars
          table
            thead
              tr.top
                th(colspan="6") 待派工
                th
                th 
                  i.left
                  span {{ timeStr }}
                  i.right
              tr
                th 牌照號碼
                th 車主
                th 開單時間
                th 承諾交車
                th 工單號碼
                th 交車方式
                th.device 設備
                th.time-ticks-title
                  section
                    span(v-for="c in 10" :key="c")  {{ c }}
            tbody
              tr
                td {{ $route.query.key }}
                td {{ $route.query.owner }}
                td 05-02 09:11
                td 05-31 09:11
                td.dragable(id="order-key" draggable="true" @dragstart="dragstartHandler" @mousedown="mousedownHandler") {{ $route.query.id }}
                td 自行交車
                td.device 047 張忠謀
                td.time-ticks
                  section
                    span(v-for="c in 10" :key="c")
              tr(v-for="i in 6" :key="i")
                td
                td
                td
                td
                td
                td
                td.device 047 張忠謀
                td.time-ticks
                  section
                    span(v-for="c in 10" :key="c")

</template>

<style lang="sass" scoped>
#schedule
  position: absolute
  z-index: 2000
  left: 0
  top: 0
  width: 100%
  height: 100%
  min-height: 1000px
  min-width: calc(v-bind(miniW) * 1px)
  .float
    background: #fff
    padding: 0 5px
    pointer-events: none
    font-size: 16px
    position: absolute
    left: calc(v-bind(floatX) * 1px)
    top: calc(v-bind(floatY) * 1px)
    color: darkblue
    z-index: 1
  > .window
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    width: 90%
    height: 80%
    box-shadow: 0 5px 10px #333
    background: #fff
    display: grid
    grid-template-rows: auto 1fr
    > .title
      background: #ddd
      font-size: 16px
      color: #000
      line-height: 3
      padding: 0 20px
      display: grid
      align-items: center
      grid-template-columns: 1fr 30px 30px 30px
      > i
        width: 30px
        height: 30px
        cursor: pointer
        overflow: hidden
        &::before
          content: ''
          display: block
          height: 100%
        &:hover
          transform: scale(1.2)
        &.small::before
          width: 10px
          border-bottom: 3px solid #000
          transform: translateY(-8px)
        &.big::before
          border: 5px solid #000
          transform: scale(0.4)
          border-radius: 5px
        &.close::before
          background: url(@/assets/close.svg) no-repeat center center
          background-size: 20px
    > .body
      border: 5px solid #ddd
      border-top: 0
      display: grid
      grid-template: 'top top' 'a b' 'c c' / 1fr 300px
      align-content: start
      > .top
        grid-area: top
        display: grid
        grid-template-columns: 1fr 300px 200px
        color: DarkBlue
        height: 40px
        gap: 100px
        align-items: center
        > ul
          display: grid
          grid-auto-columns: 40px
          grid-auto-flow: column
          gap: 5px
          list-style: none
          padding: 0
          margin: 0
          justify-self: end
          > li
            height: 30px
            background: #eee
            border: 1px solid #999
            cursor: pointer
      > table.loading
        width: 100%
        grid-area: c
        height: 500px
      > .main
        grid-area: a
        overflow: auto
        max-height: 400px
        > table
          width: 100%
          font-weight: bold
          &::before
            content: ''
            position: absolute
            top: 0
            left: calc(v-bind(currentTimeLineBaseX) * 1px)
            border-left: 2px dashed brown
            height: 100%
            --x: calc(v-bind(currentTimeLineX) * 1px)
            transform: translateX(var(--x))
          &::after
            left: 70%
            top: calc(200px + v-bind(mainLoadingFixY) * 1px)
          > thead
            position: sticky
            top: 0
            background: #fff
            z-index: 1
          > tbody
            > tr
              &:nth-of-type(even)
                background: #f2f2f2

              > td
                line-height: 3
      > .other
        grid-area: b
        overflow: auto
        max-height: 400px
        > table
          width: 100%
          thead
            position: sticky
            top: 0
          td
            color: #333
            line-height: 3
      > .cars
        grid-area: c
        th.device
          background: linear-gradient(to top,#666,#aaa)
          color: white
        td.device
          background: #ccc
          color: white
        .dragable
          cursor: pointer
        section
          height: 40px

th.time-ticks-title
  padding: 0
  > section
    background: #eef
    height: 34px
    display: grid
    grid-template-columns: repeat(10,1fr)
    color: darkblue
    border-bottom: 1px solid #aaa
    > span
      text-align: center
      font-size: 16px
      position: relative
      &::before
        content: ''
        position: absolute
        bottom: 0
        left: 50%
        width: 2px
        height: 5px
        background: darkblue

td.time-ticks
  padding: 0
  > section
    width: 100%
    min-width: 500px
    background: #fff
    height: 55px
    display: grid
    grid-template-columns: repeat(10,1fr)
    > span
      // position: relative
      &:nth-of-type(even)
        background: #f3f3f3
      > i
        position: absolute
        // top: 0
        // left: 0
        white-space: nowrap
        padding: 0 20px


.right
  width: 0
  height: 0
  display: inline-block
  transform: scaleY(0.6)
  vertical-align: middle
  margin-left: 10px
  border-top: 10px solid transparent
  border-bottom: 10px solid transparent
  border-left: 10px solid currentColor
.left
  width: 0
  height: 0
  display: inline-block
  vertical-align: middle
  transform: scaleY(0.6)
  margin-right: 10px
  border-top: 10px solid transparent
  border-bottom: 10px solid transparent
  border-right: 10px solid currentColor
</style>
