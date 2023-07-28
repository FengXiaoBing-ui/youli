<template>
	<view class="content">
		<view class="w100 flex justify-between margin-top-xl">
			<view class="flex-sub text-center" v-for="(item,index) in fnList" :key="index">
				<image style="width: 100rpx;height: 100rpx;" :src="item.url" mode="aspectFill"></image>
				<view class="text-bold text-lg margin-top-sm">{{ item.name }}</view>
			</view>
		</view>
		<view class="padding-sm w100">
			<view class="w100 flex justify-between padding-sm bg-gray radius">
				<view class="flex-treble">
					<view class="flex align-center">名字</view>
					<view class="flex align-center">地点</view>
					<view class="flex align-center">时间</view>
				</view>
				<view class="flex-sub">右侧</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fnList:[
					{
						name:"线上咨询",
						url:require('../../static/logo.png')
					},
					{
						name:"线下网点",
						url:require('../../static/logo.png')
					},
					{
						name:"法律援助",
						url:require('../../static/logo.png')
					}
				]
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
