<template>
	<div class="seller" ref="seller">
		<div class="seller-wrapper">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<Star :size="36" :score="seller.score"></Star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<Split></Split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<div class="supports">
					<li class="supports-item" v-for="item in seller.supports" :key="item.id">
						<Icon :iconType="item.type" :size="32" :color="1"></Icon>
						<span class="text">{{item.description}}</span>
					</li>
				</div>
			</div>
			<Split></Split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pics-wrapper" ref="picList">
						<li v-for="pic in seller.pics" :key="pic.id" class="pics-item">
							<img :src="pic" alt="实景图" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<Split></Split>
			<div class="infos">
				<h1 class="title">商家信息</h1>
				<ul class="infos-wrapper">
					<li v-for="info in seller.infos" :key="info.id" class="infos-item">
						{{info}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '@/common/js/store';
import Star from '@/components/star/Star'
import Split from '@/components/split/Split'
import Icon from '@/components/icon/Icon'
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data () {
		return {
			favorite:(()=>{
				return loadFromLocal(this.seller.id,'favorite',false)
			})()	
		}
	},
	computed: {
		favoriteText() {
			return this.favorite?'已收藏':'收藏'
		}
	},
	watch: {
		// 监听seller数据数据变化之后更新better-scroll容器内容
		'seller'() {
			this.$nextTick(() => {
				this._initScroll()
				this._initPics()
			})
		}
	},
	mounted() {
		this.$nextTick(() => {
			this._initScroll()
			this._initPics()
		})
	},
	methods: {
		// 
		toggleFavorite(event){
			if(!event._constructed){
				return
			}
			this.favorite = !this.favorite
			saveToLocal(this.seller.id,'favorite',this.favorite)
		},
		//内容拖动
		_initScroll() {
			if (!this.scroll) {
				this.scroll = new BScroll(this.$refs.seller, {
					click: true
				})
			} else {
				this.scroll.refresh()
			}
		},
		//定义图片拖动
		_initPics() {
			if (this.seller.pics) {
				let picWidth = 120;
				let margin = 6;
				let width = (picWidth + margin) * this.seller.pics.length - margin;
				this.$refs.picList.style.width = width + 'px';
				this.$nextTick(() => {
					if (!this.picScroll) {
						this.picScroll = new BScroll(this.$refs.picWrapper, {
							scrollX: true,
							eventPassthrough: 'vertical'
						});
					} else {
						this.picScroll.refresh();
					}
				});
			}
		}
	},
	components: {
		Star,
		Split,
		Icon
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	
	.seller
		position absolute
		top 174px
		bottom 0px
		left 0
		width 100%
		overflow hidden
		.overview
			position relative
			padding 18px
			.title
				margin-bottom 8px
				line-height 14px
				color rgb(7,17,27)
				font-size 14px
			.desc
				padding-bottom 18px
				border-1px(rgba(7,17,27,.1))
				font-size 0px
				.star
					display inline-block
					margin-right 8px
					vertical-align top
				.text
					display inline-block
					margin-right 12px
					line-height 18px
					vertical-align top
					font-size 10px
					color rgb(77,95,93)
			.remark
				display flex
				padding-top 18px
				.block
					flex 1
					text-align center
					border-right 1px solid rgba(7,17,27,.1)
					&:last-child
						border:none
					h2
						margin-bottom 4px
						line-height: 10px
						font-size: 10px
						color: rgb(147, 153, 159)
					.content
						line-height: 24px
						font-size: 10px
						color: rgb(7, 17, 27)
						.stress
							font-size: 24px
			.favorite
				position: absolute
				width: 50px
				right: 11px
				top: 18px
				text-align: center
				.icon-favorite
					display: block
					margin-bottom: 4px
					line-height: 24px
					font-size: 24px
					color: #d4d6d9
					&.active
						color: rgb(240, 20, 20)
				.text
					line-height: 10px
					font-size: 10px
					color: rgb(77, 85, 93)
		.bulletin
			padding 18px 18px 0 
			.title
				margin-bottom 8px
				line-height 14px
				color rgb(7,17,27)
				font-size 14px
			.content-wrapper
				padding 0 12px 16px 12px
				border-1px(rgba(7,17,27,.1))
				.content
					line-height 24px
					font-size 12px
					color rgb(240,20,20)
			.supports
				padding:0 12px
				.supports-item
					padding:16px 0
					border-1px(rgba(7,17,27,.1))
					&:last-child
						border-none()
					.text
						font-size 12px
						color rgb(7,17,27)
						line-height 16px
						padding-left 6px
		.pics
			padding 18px 18px 0
			.title
				margin-bottom 12px
				line-height 14px
				color rgb(7,17,27)
				font-size 14px
			.pics-wrapper
				width 100%
				overflow hidden
				white-space nowrap
				margin-bottom 18px
				.pics-item
					display inline-block
					margin-right 6px
					width 120px
					height 90px
					&:last-child
						margin 0
		.infos
			padding 18px 18px 0
			.title
				margin-bottom 8px
				padding-bottom 12px
				line-height 14px
				color rgb(7,17,27)
				font-size 14px
				border-1px(rgba(7,17,27,.1))
			.infos-item
				padding:16px 12px
				border-1px(rgba(7,17,27,.1))
				font-size 12px
				color rgb(7,17,27)
				line-height 16px
				padding-left 6px
</style>