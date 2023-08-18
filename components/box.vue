<template>
	<view class="content">
		<view class="bgHeader" :style="'--height:'+(statusBarHeight.top+statusBarHeight.height+90)+'px;background:'+background">
			<view class="flex align-center"
				:style="'margin-top:'+statusBarHeight.top+'px;height:'+statusBarHeight.height+'px'">
				<u-icon @click="back" name="arrow-left" color="#DBDBDB" size="22"></u-icon>
				<text class="text-white margin-left-sm">{{ title }}</text>
			</view>
			<image class="bgHeaderImg" style="width: 330rpx;" :style="'height:'+rightIconHeight" :src="rightIcon" mode=""></image>
		</view>
		<view class="infoBox" :class="infoBoxClass" :style="'--top:'+(statusBarHeight.top+statusBarHeight.height+50)+'px'">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
			},
			rightIcon:{
				type:String,
				default:""
			},
			background:{
				type:String,
				default:"#92A4FE"
			},
			rightIconHeight:{
				type:String,
				default:"214rpx"
			},
			infoBoxClass:{
				type:String,
				default:"padding-lr"
			}
		},
		data() {
			return {
				statusBarHeight: this.StatusBarHeight,
			};
		},
		methods:{
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bgHeader {
		width: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
		height: var(--height);

		.bgHeaderImg {
			position: absolute;
			right: 0;
			top: 0;
		}
	}

	.infoBox {
		border-radius: 40rpx 40rpx 0 0;
		position: relative;
		z-index: 10;
		top: var(--top);
		left: 0;
		width: 100%;
		background-color: white;
	}
</style>