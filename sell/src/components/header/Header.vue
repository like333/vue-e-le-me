<template>
    <div>
        <div class="header">
            <div class="content-wrapper">
                <div class="avatar">
                    <img :src="seller.avatar" width="64" height="64" alt="">
                </div>
                <div class="content">
                    <div class="title">
                        <span class="brand"></span>
                        <span class="name">{{seller.name}}</span>
                    </div>
                    <div class="description">
                        {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <div v-if="seller.supports" class="support">
                        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
                <div v-if="seller.supports" @click="showDetail" class="supports-count">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon icon-keyboard_arrow_right"></i>
                </div>
            </div>
            <div class="bulletin-wrapper" @click="showDetail" >
							<span class="bulletin-title"></span>
							<span class="bulletin-text">{{seller.bulletin}}</span>
							<i class="bulletin-icon icon-keyboard_arrow_right"></i>
						</div>
						<div class="bg">
							<img width="100%" height="100%" :src="seller.avatar" :alt="seller.name">
						</div>
						<div class="detail" v-show="detailShow" >
							<div class="detail-wrapper clearfix">
								<div class="detail-main">
									<h1 class="name">{{seller.name}}</h1>
									<Star :size="24" :score="seller.score"></Star>
								</div>
							</div>
							<div class="detail-close">
								<i class="icon-close"></i>
							</div>
						</div>
        </div>
    </div>
</template>
<script>
	import Star from '@/components/star/Star'
    export default {
        props: {
					seller:{
						type:Object
					}
        },
        data(){
					return {
						detailShow: false
					}
				},
				methods:{
					showDetail(){
						this.detailShow = true
					}
				},
        created () {
					this.classMap=['decrease','discount','special','invoice','guarantee']
				},
				components: {
					Star
				}
     }
</script>
<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
	.header
		position:relative
		background-color:rgba(7,17,27,.5)
		color:#fff
		.content-wrapper
			position:relative
      font-size:0px
			padding:24px 12px 18px 24px
			.avatar
        display:inline-block
        vertical-align top
        img
          border-radius:2px
			.content
        display:inline-block
        margin-left:16px
        font-size:14px
				.title
          margin:2px 0 8px 0
					.brand
            display:inline-block
            vertical-align: top
            width:30px
            height: 18px
            bg-image("./brand")
            background-size:30px 18px
            background-repeat:no-repeat
					.name
						margin-left:6px
						font-size: 16px
						line-height: 18px
						font-weight: bold
				.description
          margin-bottom:12px
          line-height:12px
          font-size:12px
				.support
          font-size 0
          .text
            font-size 12px
            line-height 12px
            display inline-block
            vertical-align top
          .icon
            display:inline-block
            vertical-align top
            width:12px
            height: 12px
            margin-right:4px
            background-size:12px
            background-repeat:no-repeat
            &.special
              bg-image('special_1')
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
			.supports-count
				position:absolute
				right: 12px
				bottom: 40px
				height: 24px
				line-height: 24px
				padding:0 8px
				border-radius:14px
				background:rgba(0,0,0,.2)
				text-align:center
				.count
				.icon
				  vertical-align middle
					font-size: 10px
				.icon
				  margin-left: 4px
		.bulletin-wrapper
			position:relative
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			white-space: nowrap
			overflow: hidden 
			text-overflow:ellipsis
			font-size:0
			background-color:rgba(7,17,27,.2)
			.bulletin-title
				display:inline-block
				height:12px
				width:22px
				margin-right:2px
				margin-top:8px
				vertical-align: top
				bg-image('bulletin')
				background-size:22px 12px
				background-repeat:no-repeat
			.bulletin-text
			  vertical-align:top
				font-size:10px
			.bulletin-icon
				position:absolute
				font-size:10px
				right:12px
				top:8px
		.bg
			position:absolute
			top:0
			left:0
			width:100%
			height:100%
			z-index:-1
			filter:blur(10px)
		.detail
			position:fixed
			z-index:100
			top:0
			left:0
			width:100%
			height:100%
			overflow:auto
			background:rgba(7,17,27,.8)
			.detail-wrapper
				min-height:100%
				width:100%
				.detail-main
					margin-top:64px
					padding-bottom:64px
					.name
						line-height:16px
						text-align:center
						font-size:16px;
						font-weight:bold
			.detail-close
				position:relative
				width:32px
				height:32px
				margin:-64px auto 0px
</style>