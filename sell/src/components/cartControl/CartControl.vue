<template>
	<!-- 商品的数量的加减 -->
	<div class="cartControl">
		<transition name="move">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="removeCart">
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart"></div>
	</div>
</template>
<script>
import Vue from 'vue'
export default {
	props: {
		food: {
			type: Object
		}
	},
	methods: {
		//添加购物车数量
		addCart(event) {
			if (!this.food.count) {
				Vue.set(this.food, 'count', 1)
			} else {
				this.food.count++
			}
			this.$emit('add', event.target)
		},
		//移除购物车数量
		removeCart(event) {
			if (!event._constructed) {
				return;
			}
			if (this.food.count) {
				this.food.count--
			}
		}
	}
}
</script>
<style lang="stylus">
	.cartControl
		font-size: 0
		.cart-add,.cart-decrease
			display: inline-block
			vertical-align:middle
			padding:6px
			font-size:24px
			line-height:24px
			color:rgb(0,160,220)
		.cart-count
			display: inline-block
			font-size:10px
			color:rgb(174,153,159)
			line-height:24px
			vertical-align:middle
		.move-enter-active,.move-leave-active
			transition: all .3s linear;
	  .move-enter,.move-leave-to
			opacity:0
			transform:translate3d(24px,0,0) rotate(0deg)
		.move-enter-to, .move-leave
			opacity:1
			transform:translate3d(0,0,0) rotate(180deg)
</style>


