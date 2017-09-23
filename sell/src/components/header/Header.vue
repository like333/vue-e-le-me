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
						<Icon :iconType="seller.supports[0].type" :size="24" :color="0"></Icon>
						<span class="text">{{seller.supports[0].description}}</span>
					</div>
				</div>
				<div v-if="seller.supports" @click="showDetail" class="supports-count">
					<span class="count">{{seller.supports.length}}个</span>
					<i class="icon icon-keyboard_arrow_right"></i>
				</div>
			</div>
			<div class="bulletin-wrapper" @click="showDetail">
				<span class="bulletin-title"></span>
				<span class="bulletin-text">{{seller.bulletin}}</span>
				<i class="bulletin-icon icon-keyboard_arrow_right"></i>
			</div>
			<div class="bg">
				<img width="100%" height="100%" :src="seller.avatar" :alt="seller.name">
			</div>
			<transition name="fade">
				<div class="detail" v-show="detailShow">
					<div class="detail-wrapper clearfix">
						<div class="detail-main">
							<h1 class="name">{{seller.name}}</h1>
							<div class="star-wrapper">
								<Star :size="48" :score="seller.score"></Star>
							</div>
							<div class="title">
								<div class="line"></div>
								<div class="text">优惠信息</div>
								<div class="line"></div>
							</div>
							<ul v-if="seller.supports" class="supports">
								<li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
									<Icon :iconType="seller.supports[index].type" :size="32" :color="0" class="icon"></Icon>
									<span class="text">{{seller.supports[index].description}}</span>
								</li>
							</ul>
							<div class="title">
								<div class="line"></div>
								<div class="text">商家公告</div>
								<div class="line"></div>
							</div>
							<div class="bulletin">
								<p class="bulletin-text">{{seller.bulletin}}</p>
							</div>
						</div>
					</div>
					<div class="detail-close" @click="hideDetail">
						<i class="icon-close"></i>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
import Star from '@/components/star/Star'
import Icon from '@/components/icon/Icon'
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			detailShow: false
		}
	},
	methods: {
		showDetail() {
			this.detailShow = true
		},
		hideDetail() {
			this.detailShow = false
		}
	},
	components: {
		Star,
		Icon
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
            bg-image("images/brand")
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
          font-size:0
          .text
            font-size 12px
            line-height 12px
            display inline-block
            vertical-align top
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
				bg-image('images/bulletin')
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
			backdrop-filter:blur(10px)
			transition: all .5s
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
					.star-wrapper
						margin-top:18px
						padding:2px 0
						text-align: center
					.title
						display:flex
						width:80%
						margin:28px auto 24px
						.line
							flex:1
							position:relative
							top:-6px
							border-bottom:1px solid rgba(255,255,255,.2)
						.text
							padding:0 12px
							font-size:14px
							font-weight:700
					.supports
						width:80%
						margin:24px auto 28px
						font-size:0px
						.support-item
							margin:0 12px 12px
							.icon
								margin-right:6px 
							.text
								font-size:12px
								vertical-align:middle
					.bulletin
						width:80%
						margin:0 auto
						.bulletin-text
							padding:0 12px
							font-size:12px
							line-height:24px
			.detail-close
				position:relative
				width:32px
				height:32px
				margin:-64px auto 0px
				.icon-close
					font-size:32px
		.fade-enter-active,.fade-leave-active
			transition:all .5s
		.fade-enter,.fade-leave-to
			opacity: 0
			background: rgba(7,17,27,0)
		.fade-enter-to,.fade-leave
			opacity: 1
			background: rgba(7,17,27,.8)
</style>