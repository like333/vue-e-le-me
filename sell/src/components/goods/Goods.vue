<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item, index) in goods" :key="item.id" class="menu-item"
				:class = "{'current':currentIndex === index}"
				@click="selectMenu(index, $event)">
					<span class="text border-1px">
						<Icon v-if="item.type>0" :iconType="item.type" :size="24" :color="1"></Icon>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" :key="food.id" class="food-item border-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" :alt="food.name">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartControl-wrapper">
									<CartControl @add = "addFood" :food = "food"></CartControl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<showCart ref="shopcart" :deliveryPrice="seller.deliveryPrice" 
		:minPrice="seller.minPrice" :selectFoods = "selectFoods"></showCart>
	</div>
</template>
<script type="text/ecmascript-6">
import Icon from "@/components/icon/Icon"
import ShowCart from "@/components/showCart/ShowCart"
import CartControl from "@/components/cartControl/CartControl"
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			goods: [],
			listHeight:[],
			scrollY:0
		}
	},
	created() {
		this.$http.get('/api/goods').then(res => {
			res = res.body
			if (res.errno === ERR_OK) {
				this.goods = res.data
				this.$nextTick(()=>{
					this._initScroll()
					this._calculateHeight()
				})
			}
		})
	},
	computed: {
		currentIndex(){
			let menuList = this.$refs.menuWrapper.querySelectorAll('.menu-item')
			for(let i=0,len=this.listHeight.length;i<len;i++){
				let height1 = this.listHeight[i]
				let height2 = this.listHeight[i+1]
				if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
					this.menuScroll.scrollToElement(menuList[i])
					return i
				}
			}	
			return 0
		},
		//找到所有被选择的food
		selectFoods(){
			let foods = []
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					//如果food有count属性，说明已经添加了这个food
					if(food.count){
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
	methods:{
		selectMenu(index,event){
			let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook')
			this.foodScroll.scrollToElement(foodList[index],300)
		},
		_initScroll(){
			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
				click:true
			})
			this.foodScroll = new BScroll(this.$refs.foodWrapper,{
				probeType:3, //滚动的时候实时监测滚动位置
				click:true
			})
			this.foodScroll.on('scroll',(pos)=>{
				this.scrollY = Math.abs( Math.round( pos.y ) )
			}) 
		},
		_calculateHeight(){
			let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook')
			let height = 0
			this.listHeight.push(height)
			for(let i=0,len=foodList.length;i<len;i++){
				let item = foodList[i]
				height += item.clientHeight
				this.listHeight.push(height)
			}
		},
		addFood(target){
			this.$nextTick(()=>{
				this.$refs.shopcart.drop(target)
			})
		},
	},
	components: {
		Icon,
		ShowCart,
		CartControl
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	 @import '../../common/stylus/mixin.styl'
	.goods
		display:flex
		position:absolute
		top:177px
		bottom:46px
		width:100%
		overflow: hidden
		.menu-wrapper
			flex:0 0 80px
			width:80px
			background:#f3f5f7
			.menu-item
				display:table
				height: 54px
				width:56px
				padding:0 12px
				line-height:14px
				&.current
					position:relative
					z-index:10
					margin-top:-1px
					background:#fff
					font-weight:700
					.text
						border-none()
				.text
					display:table-cell
					width:56px
					vertical-align:middle
					font-size:12px
					border-1px(rgba(0,0,0,.1))
		.foods-wrapper
			flex:1
			.title
				padding-left: 14px
				height:26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color: rgb(147,153,159)
				background:#f3f5f7
			.food-item
				display:flex
				margin:18px 18px 0
				padding-bottom:18px
				border-1px(rgba(7,17,27,.1))
				&:last-child
					border-none()
				.icon
					flex:0 0 57px
					margin-right:10px
				.content
					flex:1
					.name
						margin:2px 0 8px
						height:14px
						line-height:14px
						font-size:14px
						color:rgb(7,17,27)
					.desc,.extra
						margin-bottom:8px
						line-height: 10px
						font-size: 10px
						color: rgb(147,153,159)
					.desc
						margin-bottom:8px
						line-height:12px
					.extra
						.count
							margin-right:12px
					.price
						line-height:24px
						.now
							margin-right:8px
							font-weight:700
							font-size:14px
							color:red
						.old
							font-size:10px
							font-weight:700
							color:rgb(147,153,159)
							text-decoration:line-through
					.cartControl-wrapper
						position: absolute
						right: 0
						bottom: 12px
</style>