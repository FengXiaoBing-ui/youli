<template>
	<view class="content">
		<Box title="课程培训">
			<view class="padding-tb padding-lr-xs" style="height: 80vh;overflow-y: auto;">
				<view class="flex flex-direction margin-bottom" v-for="item in list" :key="item.id">
					<view class="boxShadow">
						<video :src="item.lessonUrl"></video>
					</view>
					<view class="text-cut2 w100 margin-top-sm">
						{{ item.lessonName }}
					</view>
				</view>
			</view>
		</Box>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			};
		},
		onLoad() {
			this.lessonList()
		},
		methods:{
			async lessonList(){
				const res = await this.$http.lessonList({lessonStatus:0})
				this.list = res.rows
			}
		}
	}
</script>

<style lang="scss" scoped>
.boxShadow{
	width: 100%;
	height: 290rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
}
video{
	width: 100%;
	height: 290rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
}
</style>
