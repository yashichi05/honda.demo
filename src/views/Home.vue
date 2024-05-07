<script setup lang="ts"></script>

<template lang="pug">
#home
  form(@submit.prevent)
    h1 首頁
    ul
      li(v-for="i in 14" :key="i")
  table(v-for="i in 5" :key="i")
    thead
      tr.top
        th(colspan="6") 摘要 / 備註
        th(colspan="2") 維修工單
        th 維修進廠次數
        th 重要
    tbody
      tr
        td 進廠原因
        td 自行進廠
        td 報價日期
        td 2024-02-04
        td 保險公司
        td
        td 工資
        td 296666
        td 0
        td 290000
      tr
        td 進廠方式
        td 自行進廠
        td 預約日期
        td
        td 理賠案號
        td AT-87657233
        td 零件
        td 456456
        td 0
        td 456465
      tr
        td 技術專員
        td 王彩華
        td 完工日期
        td
        td 區位
        td
        td 合計
        td 789999
        td 0
        td 789999
      tr
        td 承修計師
        td
        td 完工人員
        td
        td 頂讓
        td
        td 預計訂單
        td
        td
        td
      tr
        td 招攬人員
        td 王私家
        td 交車方式
        td 自行交車
        td
        td
        td
        td
        td
        td
      tr
        td 終檢人員
        td
        td 交車日期
        td
        td
        td
        td
        td
        td
        td
</template>

<style lang="sass" scoped>
#home
  padding: 0 10px
  background: #fff
  > form
    display: grid
    grid-template-columns: 400px 1fr
    grid-template-rows: 40px
    gap: 5px
    align-items: center
    > h1
      font-size: 20px
      font-weight: bold
      color: #4B0082
    > ul
      display: grid
      grid-template-columns: repeat(16,40px)
      gap: 5px
      list-style: none
      padding: 0
      margin: 0
      > li
        height: 30px
        background: #eee
        border: 1px solid #999
        cursor: pointer
  > table
    td
      &:nth-of-type(2),&:nth-of-type(4),&:nth-of-type(6),&:nth-of-type(10)
        color: #aaa
      &:nth-of-type(8),&:nth-of-type(9)
        color: #333
        font-weight: bold
      &:nth-of-type(1),&:nth-of-type(3),&:nth-of-type(5),&:nth-of-type(7)
        background: #eef
</style>
