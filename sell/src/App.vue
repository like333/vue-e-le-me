<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  import header from './components/header/header.vue'
  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then(res => {
        res = res.body
        if(res.errno === ERR_OK){
          this.seller = res.data
        }
      })
    },
    components: {
      'v-header': header
    }
  }

</script>

<style lang="stylus" rel="sytlesheet/stylus">
  @import "./common/stylus/mixin.styl"
   .tab
    display: flex
    width: 100%
    height: 40px 
    line-height: 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex:1
      text-align:center
      &>a display:block
        font-size:14px
        color:#4d555d
      a.active
        color:#f01414
</style>