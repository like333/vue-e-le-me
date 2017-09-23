<template>
	<!-- <Icon :iconType="1" :size="24" :color="0"></Icon> -->
		<span class="icon" :style="iconCss" :class="imageUrl"> </span>
	
</template>
<script>
export default {
	data() {
		return {
			iconCss: {
				width: this.size/2 + 'px',
				height: this.size/2 + 'px',
				backgroundImage: "",
				backgroundSize: this.size/2 + 'px',
			},
			classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		}
	},
	props: {
		iconType: {
			type: Number//类型对用不同class，对应不同图片
		},
		//size对应两种尺寸，空心24px图片后缀是"_1"
		//32px图片后缀是 "_2"
		//实心:24px:"_3",32px:"_4"
		size: {
			type: Number
		},
		color: {
			type: Number//color为0是空心，color为1是实心颜色
		},
	},
	computed: {
		imageUrl() {
			// return "bg-image('images/decrease_1')"
			return this.classMap[this.iconType]+'_'+ this.style
			// return "item"
		},
		style() {
			if (this.size == 24 && this.color == 0)
				return 1
			else if (this.size == 32 && this.color == 0)
				return 2
			else if (this.size == 24 && this.color == 1)
				return 3
			else if (this.size == 32 && this.color == 1)
				return 4
		},
	}
}
</script>
<style lang="stylus">
	@import "../../common/stylus/mixin.styl"
	.icon
		display:inline-block
		vertical-align:middle
		margin-right:4px
		background-repeat:no-repeat
		&.decrease_1
			bg-image('images/decrease_1')
		&.decrease_2
			bg-image('images/decrease_2')
		&.decrease_3
			bg-image('images/decrease_3')
		&.decrease_4
			bg-image('images/decrease_4')

		&.discount_1
			bg-image('images/discount_1')
		&.discount_2
			bg-image('images/discount_2')
		&.discount_3
			bg-image('images/discount_3')
		&.discount_4
			bg-image('images/discount_4')

		&.special_1
			bg-image('images/special_1')
		&.special_2
			bg-image('images/special_2')
		&.special_3
			bg-image('images/special_3')
		&.special_4
			bg-image('images/special_4')

		&.invoice_1
			bg-image('images/invoice_1')
		&.invoice_2
			bg-image('images/invoice_2')
		&.invoice_3
			bg-image('images/invoice_3')
		&.invoice_4
			bg-image('images/invoice_4')

		&.guarantee_1
			bg-image('images/guarantee_1')
		&.guarantee_2
			bg-image('images/guarantee_2')
		&.guarantee_3
			bg-image('images/guarantee_3')
		&.guarantee_4
			bg-image('images/guarantee_4')
</style>


