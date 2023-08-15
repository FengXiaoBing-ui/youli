<template>
	<view class="content">
		<Box title="申请详情">
			<view class="w100 flex flex-direction padding-tb">
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">姓名</view>
					<view class="flex-treble">{{ details.realName }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">联系电话</view>
					<view class="flex-treble">{{ details.phone }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">居住地</view>
					<view class="flex-treble">{{ details.address }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">案件类型</view>
					<view class="flex-treble">{{ details.caseType }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">涉案金额</view>
					<view class="flex-treble">{{ details.caseMoney }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">审理阶段</view>
					<view class="flex-treble">{{ details.caseStage }}</view>
				</view>
				<view class="flex flex-direction padding-tb-sm">
					<view class="100">案情概述</view>
					<view class="100 padding-xs radius border margin-top-sm" style="color: #909090;min-height: 180rpx;">{{ details.caseText }}</view>
				</view>
			</view>
		</Box>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null,
				details:""
			};
		},
		onLoad(options) {
			this.id = options.id
			this.reservation()
		},
		methods:{
			async reservation(){
				const res = await this.$http.aidDetails(this.id)
				this.details = res.data
			}
		}
	}
</script>

<style lang="scss">

</style>
