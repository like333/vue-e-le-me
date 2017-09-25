<template>
	<div class="ratingSelect">
		<div class="rating-type border-1px">
			<div @click="select(2,$event)" class="block positive" :class="{'active':selectType==2}">
				<span>{{desc.all}}</span>
				<span class="count">{{ratings.length}}</span>
			</div>
			<div @click="select(0,$event)" class="block positive" :class="{'active':selectType==0}">
				<span>{{desc.positive}}</span>
				<span class="count">{{positives.length}}</span>
			</div>
			<div @click="select(1,$event)" class="block negative" :class="{'active':selectType==1}">
				<span>{{desc.negative}}</span>
				<span class="count">{{negatives.length}}</span>
			</div>

		</div>
		<div @click="toggleContent" class="switch">
			<i  :class="{'active':onlyContent}" class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script> 
const POSITIVE = 0,//好评
	NEGATIVE = 1,//差评
	ALL = 2//所有评价
export default {
	props: {
		//  1.是否显示只看内容2.选择的类型，3.评价数4，描述
		ratings: {//评价数
			type: Array,
			default() {
				return []
			}
		},
		selectType: {//选择的类型
			type: Number,
			default: ALL
		},
		onlyContent: {//是否是看内容
			type: Boolean,
			default: false
		},
		desc: {//描述
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			}
		}
	},
	computed: {
		positives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType == POSITIVE
			})
		},
		negatives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType == NEGATIVE
			})
		}
	},
	methods: {
		select(type,event){
			if(!event._constructed){
				return 
			}
			this.$emit('select',type)	
		},
		toggleContent(event){
			if(!event._constructed){
				return 
			}
				this.$emit('toggleContent')
		}
	}
}
</script>
<style lang="stylus">
	@import "../../common/stylus/mixin.styl"
	.ratingSelect
		.rating-type
			padding:18px 0
			margin:0 18px
			border-1px(rgba(7,17,27,.1))
			.block
				display:inline-block
				padding:8px 12px
				margin-right:8px
				border-radius:1px
				font-size:12px
				line-height:16px
				color:rgb(77,85,93)
				.count
					margin-left:2px
					font-size:8px
				&.positive
					background:rgba(0,160,220,.2)
					&.active
						background:rgb(0,160,220)
						color:#fff
				&.negative
					background:rgba(77,85,93,.2)
					&.active
						background:rgb(77,85,93)
						color:#fff
		.switch
			padding:12px 18px
			line-height:24px
			border-bottom:1px solid rgba(7,17,27,.1)
			font-size:0
			color:rgb(147,153,159)
			.icon-check_circle
				display:inline-block
				margin-right:4px
				font-size:24px
				vertical-align:top
				&.active
					color:#00c850
			.text
				font-size:12px
				vertical-align:top
			
</style>