<template>
	<div class="shopCart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div v-show="totalCount > 0" class="num">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<div v-for="ball in balls" :key="ball.id">
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			// 多个小球是为了应对，在前一个小球没有结束之前，又点击了添加
			balls:[
				{show:false},
				{show:false},
				{show:false},
				{show:false},
				{show:false}
			],
			dropBalls:[],
			fold:true
		}
	},
	props: {
		//所选商品的数组
		selectFoods: {
			type: Array,
			default() {
				return [
					{
						price: 0,
						count: 0
					}
				]
			}
		},
		deliveryPrice: {
			type: Number,
			default: 0
		},
		minPrice: {
			type: Number,
			default: 0
		}
	},
	computed: {
		//所有商品的总价
		totalPrice() {
			let total = 0
			this.selectFoods.forEach((food) => {
				total += food.price * food.count
			})
			return total
		},
		// 所有商品的总数量
		totalCount() {
			let count = 0
			this.selectFoods.forEach((food) => {
				count += food.count
			})
			return count
		},
		//起送金额与总价差
		payDesc() {
			if (this.totalPrice === 0) {
				return `￥${this.minPrice}元`
			} else if (this.totalPrice < this.minPrice) {
				let diff = this.minPrice - this.totalPrice
				return `还差￥${diff}元起送`
			} else {
				return "去结算"
			}
		},
		//起送样式变化
		payClass(){
			return this.totalPrice<this.minPrice ? "not-enough" : "enough"
		},
	},
	methods: {
		//添加购物车动画
		drop(el){
			// 有添加购物车事件之后,显示小球
			for(let i=0,len=this.balls.length;i<len;i++){
				let ball = this.balls[i]
				if(!ball.show){
					ball.show = true
					ball.el = el
					this.dropBalls.push(ball)
					return
				}
			}
		},
		beforeDrop(el){
			let count = this.balls.length
			while(count--){
				let ball = this.balls[count]
				if(ball.show){
					let rect = ball.el.getBoundingClientRect()
					let x = rect.left-32
					let y = -(window.innerHeight - rect.top-22)
					el.style.display=''
					el.style.webkitTransform = `translate3d(0,${y}px,0)`
					el.style.transform = `translate3d(0，${y}px,0)`
					let inner = el.querySelector('.inner-hook')
					inner.style.webkitTransform = `translate3d(${x}px,0,0)`
					inner.style.transform = `translate3d(${x}px,0,0)`
				}
			}
		},
		dropping(el,done){
			// 重绘是部分节点需要更新
			let rf = el.offsetHeight //主动触发浏览器重绘
			this.$nextTick(()=>{
				el.style.webkitTransform = 'translate3d(0,0,0)'
				el.style.transform = 'translate3d(0,0,0)'
				let inner = el.querySelector('.inner-hook')
				inner.style.webkitTransform = 'translate3d(0,0,0)'
				inner.style.transform = 'translate3d(0,0,0)'
				el.addEventListener('transitionend',done)
			})
		},
		afterDrop(el){
			let ball = this.dropBalls.shift()
			if(ball){
				ball.show = false
				el.style.display = 'none'
			}
		},
	}
	
}
</script>

<style lang="stylus">
	.shopCart
		position: fixed
		left:0
		bottom:0
		z-index:50
		width:100%
		height:48px
		background:#000
		.content
			display: flex
			font-size: 0
			color:rgba(255,255,255,.4)
			background:#141d27
			.content-left
				display:flex
				align-items:center 
				flex:1
				.logo-wrapper
					flex:0 0 56px
					display: inline-block
					position: relative
					vertical-align: top
					top: -10px
					margin: 0 12px
					padding: 6px
					width: 56px
					height: 56px
					box-sizing:border-box
					border-radius: 50%
					background:#141d27
					.logo
						width:100%
						height:100%
						border-radius:50%
						text-align:center
						background:#2b343c
						&.highlight
							background:rgb(0,160,220)
						.icon-shopping_cart
							line-height:44px
							font-size: 24px
							color:#80858a
							&.highlight
								color:#fff
					.num
						position: absolute
						top:0
						right:0
						width:24px
						height:16px
						line-height:16px
						border-radius:16px
						text-align:center
						font-size:9px
						font-weight:700
						color:#fff
						background:rgb(240,20,20)		
						box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
				.price
					padding-right: 12px
					box-sizing:border-box
					border-right:1px solid rgba(255,255,255,.1)
					font-size: 16px
					font-weight:700
					&.highlight
						color:#fff
				.desc
					flex:1
					line-height:14px
					padding-left:12px
					font-size:10px
			.content-right
				flex:0 0 105px
				width:105px
				text-align:center
				.pay
					height:48px
					line-height:48px
					font-size:12px
					font-weight:700
					background:#2b333b
					&.not-enough
						background:#2b333b
					&.enough
						background:#00b43c
						color:#fff
		.ball-container
			.ball
				position:fixed
				left:32px
				bottom:22px
				z-index:200
				transition:all .4s  cubic-bezier(0.49, -0.29, 0.75, 0.41)
				.inner
					width:16px
					height:16px
					border-radius:50%
					background:rgb(0,160,220)
					transition:all .4s linear

</style>


