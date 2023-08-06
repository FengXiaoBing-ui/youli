<template>
	<view class="content">
		<Box title="申请详情">
			<view class="w100 flex flex-direction padding-tb">
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">姓名</view>
					<view class="flex-treble">{{ details.realName }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">性别</view>
					<view class="flex-treble">{{ details.sex?'女':'男' }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">出生日期</view>
					<view class="flex-treble">{{ details.birth }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">民族</view>
					<view class="flex-treble">{{ details.nation }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">户籍所在地</view>
					<view class="flex-treble">{{ details.registeredResidence }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">居住地</view>
					<view class="flex-treble">{{ details.habitation }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">邮政编号</view>
					<view class="flex-treble">{{ details.postalCode }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">联系电话</view>
					<view class="flex-treble">{{ details.phone }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">工作单位</view>
					<view class="flex-treble">{{ details.workUnit }}</view>
				</view>
				<view class="flex flex-direction padding-tb-sm">
					<view class="100">案件及申请理由概述</view>
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
