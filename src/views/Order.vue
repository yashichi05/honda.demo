<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const rows = [
  ['鈑噴', '', '後方鈑噴', '', '', '', '', '100%', '', '', '', '', '', ''],
  ['﹂作業', '﹂', '﹂後方鈑噴', '', '', '', '', '100%', '', '', '', '', '', ''],
  [
    '　﹂工資',
    '　﹂HP-E4',
    '　﹂行李箱鈑噴',
    '板金',
    'BP-103',
    '',
    '7,200',
    '100%',
    '7,200',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '　﹂工資',
    '　﹂HP-E4',
    '　﹂行李箱鈑噴',
    '板金',
    'BP-103',
    '',
    '7,200',
    '100%',
    '7,200',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '　﹂工資',
    '　﹂HP-E4',
    '　﹂行李箱鈑噴',
    '板金',
    'BP-103',
    '',
    '7,200',
    '100%',
    '7,200',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '　﹂工資',
    '　﹂HP-E4',
    '　﹂行李箱鈑噴',
    '板金',
    'BP-103',
    '',
    '7,200',
    '100%',
    '7,200',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '﹂零件',
    '﹂08C70HTW020',
    '特殊鋼鐵支架',
    '板金',
    '',
    '20.0',
    '1,000',
    '100%',
    '1,200',
    '1.0',
    '',
    '2,000',
    '',
    '1.2',
  ],
  [
    '﹂零件',
    '﹂08C70HTW020',
    '特殊鋼鐵支架',
    '板金',
    '',
    '20.0',
    '1,000',
    '100%',
    '1,200',
    '1.0',
    '',
    '2,000',
    '',
    '1.2',
  ],
]

function errHandler() {
  router.push('/')
}
function openDialog() {}
</script>

<template lang="pug">
#order
  form(@submit.prevent="submit")
    h1 維修狀態
      span [查詢模式]
    ul
      li(v-for="i in 14" :key="i" @click="errHandler") 
    select
      option(value="0") 牌照號碼
      option(value="1") 車主
    input
    button.submit
  .tables-container 
    table.col-4
      thead
        tr.top
          th(colspan="2") 工單資訊
          th(colspan="2") 車輛資訊
      tbody
        tr
          td 服務廠
          td 北台中廠
          td 牌照號碼
          td {{ $route.query.key }}
        tr
          td 工單號碼
          td {{ $route.query.id }}
          td 車型
          td CR-V 21 1.5S 2WD CVT
        tr
          td 進廠時間
          td
          td 品牌 / 年式
          td Honda
        tr
          td 開單時間
          td 2024-05-02 09:11
          td 營業員
          td 經素 大興二員 王家衛
        tr
          td 里程
          td 27200
          td 領牌日期
          td 2021-01-01
        tr
          td 工單類別
          td {{$route.query.type}}
          td 保固
          td 2032-01-01
        tr
          td 承諾交車
          td 2024-05-06 17:00
          td 引擎 / VIN
          td L15BK9317802
        tr
          td 重大瑕疵
          td
          td 前次進廠 / 里程
          td 2024-07-06 16:42
    table.col-4
      thead
        tr.top
          th(colspan="2") 車主資訊
          th(colspan="2") 會員權益
      tbody
        tr
          td 車主
          td 趙台麗
          td 紅利點數
          td 1,789,789
        tr
          td 電話
          td 0963457895
          td 會員ID
          td ADS-SD5 4654666
        tr
          td 行動電話
          td 0963457895
          td
          td
    table.col-4
      thead
        tr.top
          th(colspan="2") 使用人資訊
          th(colspan="2") 聯絡資訊
      tbody
        tr
          td 使用人
          td 
          td 聯絡方式
          td 
        tr
          td 電話
          td 
          td 最後使用
          td 
        tr
          td 行動電話
          td 
          td 受雇人員
          td
    table.col-16
      thead
        tr.top
          th 類別
          th 項目
          th 說明
          th 區分
          th LON
          th 庫存
          th 定價
          th 折扣
          th 售價
          th 數量
          th 雜樹
          th 小計
          th 混加
          th 號碼
          th 
            input(type="checkbox")
          th  
            input(type="checkbox")
      tbody
        tr(v-for="(i,index) in rows" :key="index")
          td {{ i[0] }}
          td {{ i[1] }}
          td {{ i[2] }}
          td {{ i[3] }}
          td {{ i[4] }}
          td {{ i[5] }}
          td {{ i[6] }}
          td {{ i[7] }}
          td {{ i[8] }}
          td {{ i[9] }}
          td {{ i[10] }}
          td.bg {{ i[11] }}
          td {{ i[12] }}
          td {{ i[13] }}
          td.center
            input(type="checkbox")
          td.center 
            input(type="checkbox")
    table.col-12
      thead
        tr.top
          th(colspan="6") 摘要 / 備註
          th(colspan="2") 維修工單
          th 維修進廠次數
          th 重要
          th(colspan="2")
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
          td 
            button(@click="errHandler") 事故經歷
          td
            button(@click="errHandler") 設定資料庫
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
          td 
            button(@click="errHandler") 進廠履歷
          td
            button(@click="errHandler") 拆帳資料
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
          td
            button(@click="openDialog") 維修指派作業
          td
            button(@click="errHandler") 公司紅利
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
          td 
            button(@click="errHandler") 拆事
          td
            button(@click="errHandler") 檢查 / 完工
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
          td 
            button(@click="errHandler") 完工通知
          td
            button(@click="errHandler") 問題諮詢
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
          td 
            button(@click="errHandler") 雜物
          td
</template>

<style lang="sass" scoped>
#order
  background: #fff
  padding: 0 10px 50px
  > form
    display: grid
    grid-template-columns: 400px 1fr 150px 200px 50px
    grid-template-rows: 40px
    gap: 5px
    align-items: center
    > h1
      font-size: 20px
      font-weight: bold
      color: #4B0082
      > span
        padding-left: 30px
        font-size: 18px
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
        &:nth-of-type(8)
          visibility: hidden

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
  .tables-container
    display: grid
    grid-template: 'a b' 'a c' 'd d' 'e e'
    .col-4
      th
        text-align: left
      td
        &:nth-of-type(1),&:nth-of-type(3)
          background: #eee
          font-weight: bold
        &:nth-of-type(2),&:nth-of-type(4)
          color: #666
    .col-16 tr:nth-of-type(n+7)
      color: gray
    .col-12
      td
        &:nth-of-type(2),&:nth-of-type(4),&:nth-of-type(6),&:nth-of-type(10)
          color: #aaa
        &:nth-of-type(8),&:nth-of-type(9)
          color: #333
          font-weight: bold
        &:nth-of-type(1),&:nth-of-type(3),&:nth-of-type(5),&:nth-of-type(7)
          background: #eef
      button
        width: 100%
        color: #00008B
        font-weight: bold
        font-size: 16px
        border: 0
        box-shadow: 0 3px 3px #aaa
        cursor: pointer
        &:hover
          background: #aaa
          color: yellow
    .center
      text-align: center
    .bg
      background: #eee
    > table
      &:nth-of-type(1)
        grid-area: a
      &:nth-of-type(2)
        grid-area: b
      &:nth-of-type(3)
        grid-area: c
      &:nth-of-type(4)
        grid-area: d
      &:nth-of-type(5)
        grid-area: e
</style>
