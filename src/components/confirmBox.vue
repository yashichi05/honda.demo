<script setup lang="ts">
defineEmits<{ (e: 'close'): void; (e: 'confirm'): void }>()
</script>
<template lang="pug">
#confirm-box 
  .title
    span B2225486 工單
    i(@click="$emit('close')")
  .body 
    ul
      li(data-title="車主") {{$route.query.owner}}
      li(data-title="工單號碼") SDE-88887899
      li(data-title="案號") {{$route.query.id}}
      li(data-title="工單類型") 鈑噴保險
      li(data-title="使用性質")
      li(data-title="工單派遣") 高工-作業
      li(data-title="開單時間") 2024-05-07 09:00:12
      li(data-title="連動") Asaww
      li(data-title="交車時間") 2024-06-07 10:30:00
      li(data-title="互動方式") 專員負責
    ol
      li(data-title="技師姓名") 葉志慶
      li(data-title="接待人員") 
      li(data-title="操作人員") 葉志慶
      li(data-title="預計工時") 200
      li(data-title="業主前時間") 2024-05-07 09:00:12
      li(data-title="計算工時") 200
      li(data-title="預計完時間") 2024-06-07 10:30:00
      li(data-title="實際工時") 
      li
      li
        button(@click="$emit('confirm')") 確認
        button(@click="$emit('close')") 取消
    .cover
      span(v-for="i in 6" :key="i") 5456465d {{$route.query.owner}}
    .bg
      span 未知資料
      span 未知資料
      span 未知資料
      span 未知資料
      span 未知資料
      span 未知資料
      
</template>

<style lang="sass" scoped>
#confirm-box
  width: 700px
  position: absolute
  background: #666
  z-index: 100
  left: 980px
  bottom: 0
  > .title
    color: white
    font-size: 16px
    font-weight: bold
    background: darkblue
    display: grid
    line-height: 30px
    grid-template-columns: 1fr 30px
    padding: 0 0 0 20px
    > i
      background: url(@/assets/close.svg) no-repeat center center
      height: 30px
      filter: invert(1)
      cursor: pointer
      &:hover
        transform: scale(1.2)
  > .body
    font-size: 20px
    padding: 20px
    display: grid
    gap: 10px
    > ul
      margin: 0
      padding: 0
      list-style: none
      color: white
      display: grid
      grid-template-columns: 1fr 1fr
      padding-bottom: 30px
      > li
        display: grid
        gap: 10px
        grid-template-columns: 130px 1fr
        &::before
          content: attr(data-title)
          text-align: right
    > ol
      margin: 0
      padding: 10px 0
      list-style: none
      background: #fff
      display: grid
      grid-template-columns: 1fr 1fr
      padding-bottom: 30px
      color: darkblue
      > li
        display: grid
        gap: 10px
        grid-template-columns: 130px 1fr
        &[data-title]::before
          content: attr(data-title)
          text-align: right
        &:not([data-title])
          grid-template-columns: auto auto
          justify-content: end
          padding-right: 20px
          > button
            padding: 0 20px
            background: #fff
            font-size: 20px
            height: 30px
            border-color: #666
            border-radius: 10px
            cursor: pointer
            &:hover
              box-shadow: 0 0 3px #333
    > .cover
      position: absolute
      padding: 12px
      bottom: 0
      background: #fff
      box-shadow: 0 0 10px #333
      width: 50%
      left: 50%
      transform: translateX(-50%)
      display: grid
      color: #666
      > span:nth-of-type(even)
        background: #eee
    > .bg
      display: grid
      overflow: auto
      height: 150px
      background: #fff
      color: #666
      gap: 5px
      padding: 20px
      > span
        padding: 0 20px
</style>
