<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate||0}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<Star :size="36" :score="seller.serviceScore"></Star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<Star :size="36" :score="seller.foodScore"></Star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<Split></Split>
			<RatingSelect @select="selectRating" @toggleContent="toggleCon" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></RatingSelect>
			<div class="rating-wrapper">
				<ul>
					<li  v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" :key="rating.id" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" alt="rating.username">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<Star :size="24" :score="rating.score"></Star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span v-for="item in rating.recommend" :key="item.id" class="item">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import RatingSelect from '@/components/ratingSelect/RatingSelect'
	import Star from '@/components/star/Star'
	import Split from '@/components/split/Split'
	import { formatDate } from '@/common/js/date'

	const POSITIVE = 0,//好评
		NEGATIVE = 1,//差评
		ALL = 2,//所有评价
		ERR_OK = 0

	export default {
		props: {
			seller: {
				type: Object
			}
	},
	data() {
		return {
			ratings: [],
			selectType: ALL,
			onlyContent: true,
			desc: {
				all: '全部',
				positive: '满意',
				negative: '不满意'
			}
		}
	},
	created() {
		this.$http.get('/api/ratings').then((res) => {
			res = res.body
			if (res.errno == ERR_OK) {
				this.ratings = res.data
				this.$nextTick(()=>{
					this.scroll = new BScroll(this.$refs.ratings,{
						click:true
					})
				})

			}
		})
	},
	filters: {
		formatDate(time) {
			let date = new Date(time)
			return formatDate(date, 'yyyy-MM-dd hh:mm')
		}
	},
	methods: {
		// 组件RatingSelect的select事件
		selectRating(type) {
			this.selectType = type
			this.$nextTick(() => {
				this.scroll.refresh();
			});
		},
		// 组件RatingSelect的toggleContent事件
		toggleCon() {
			this.onlyContent = !this.onlyContent
			this.$nextTick(() => {
				this.scroll.refresh();
			});
		},
		//筛选评论
		needShow(type,text){
			//是否显示内容
			if(this.onlyContent && !text){
				return false
			}
			if(this.selectType === ALL){
				return true
			}else{
				return type == this.selectType
			}
		}
	},
	components: {
		RatingSelect,
		Star,
		Split
	}
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.ratings
		position:absolute
		top:174px
		bottom:0
		left:0
		width:100%
		overflow:hidden
		.overview
			display flex
			padding 18px 0
			.overview-left
				flex:0 0 137px
				padding 6px 0
				width:137px
				text-align center
				border-right:1px solid rgba(7,17,27,.1)
				@media only screen and (max-width:320px) {
					flex: 0 0 120px
					width:120px
				}
				.score
					line-height:28px
					margin-bottom 6px
					font-size 24px
					color rgb(255,153,0)
				.title
					margin-bottom 8px
					line-height 12px
					font-size 12px
					color rgb(7,17,27)
				.rank
					font-size 10px
					line-height 10px
					color rgb(147,153,159)
			.overview-right
				flex:1
				padding:6px 0 0 24px
				@media only screen and (max-width:320px) {
						padding-left:10px
				}
				.score-wrapper
					margin-bottom:8px
					font-size:0
					.title,.star,.score,.time
						display inline-block
						font-size 12px
						vertical-align top
					.title
						color rgb(7,17,27)
						line-height:18px
						@media only screen and (max-width:320px) {
							margin-right 6px
						}
					.star
						margin 0 12px
						@media only screen and (max-width:320px) {
							margin 0
						}
					.score
						margin 0 12px
						line-height:18px
						color rgb(255,153,0)
						@media only screen and (max-width:320px) {
							margin-left 6px
						}
					.time
						margin-left 12px
						line-height:18px
						color rgb(147,153,159)
		.rating-wrapper
			padding 0 18px
			.rating-item
				display:flex
				padding 18px 0
				border-1px(rgba(7,17,27,.1))
				.avatar
					flex 0 0 28px
					width 28px
					margin-right 12px
					img
						border-radius 50%
				.content
					position relative
					flex 1
					.name
						margin-bottom 4px
						line-height 12px
						font-size 10px
						color rgb(7,17,27)
					.star-wrapper
						margin-bottom 6px
						font-size 0
						.star
							display inline-block
							margin-right 6px
							vertical-align top
						.delivery
							display inline-block
							vertical-align top
							line-height 12px
							font-size 10px
							color rgb(147,152,159)
					.text
						margin-bottom 8px
						line-height 18px
						color rgb(7,17,27)
						font-size 12px
					.recommend
						line-height 16px
						.icon-thumb_up,.item
							display inline-block
							margin 0 8px 4px 0
							font-size 9px
						.icon-thumb_up
							color rgb(0,160,220)
						.item
							padding 0 6px
							border 1px solid rgba(7,1,27,.1)
							border-radius 1px
							color rgb(147,153,159)
							background #fff
					.time
						position absolute
						top 0
						right 0
						line-height 12px
						font-size 10px
						color rgb(7,17,27)

</style>