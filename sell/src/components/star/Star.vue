<template>
	<div class="star" :class="starType">
		<span v-for="item in itemClasses" :key="item.id" :class="item" class="star-item"></span>
	</div>
</template>
<script>
	const LENGTH = 5, //五颗星
				CLS_ON = 'on',
				CLS_HALF = 'half',
				CLS_OFF = 'off'
	export default {

	// 参数为得分和星星尺寸
	props: {
		size: {
			type: Number
		},
		score: {
			type: Number
		}
	},
	computed: {
		starType() {
			return 'star-' + this.size
		},
		itemClasses() {
			let result = [],
					score = Math.floor(this.score * 2) / 2,//把任何小数转换成.5
					hasDecimal = score%1 !==0, //是否含有小数
					integer = Math.floor(score)//取出整数部分
			for(let i=0; i<integer; i++){
				result.push(CLS_ON)
			}
			if(hasDecimal){
				result.push(CLS_HALF)
			}
			while(result.length < LENGTH){
				result.push(CLS_OFF)
			}
			return result
		}
	}
}
</script>


<style lang="stylus">
	@import "../../common/stylus/mixin.styl"
  .star
		font-size:0
    .star-item
			display:inline-block
			background-repeat:no-repeat
    &.star-48
			.star-item
				width:20px
				height:20px
				margin-right:22px
				background-size:20px
				&:last-child
					margin-right:0px
				&.on
					bg-image('images/star48_on')
				&.half
					bg-image('images/star48_half')
				&.off
					bg-image('images/star48_off')
    &.star-36
			.star-item
				width:15px
				height:15px
				margin-right:6px
				background-size:15px
				&:last-child
					margin-right:0px
				&.on
					bg-image('images/star36_on')
				&.half
					bg-image('images/star36_half')
				&.off
					bg-image('images/star36_off')
    &.star-24
			.star-item
				width:10px
				height:10px
				margin-right:3px
				background-size:10px
				&:last-child
					margin-right:0px
				&.on
					bg-image('images/star24_on')
				&.half
					bg-image('images/star24_half')
				&.off
					bg-image('images/star24_off')
			
</style>

