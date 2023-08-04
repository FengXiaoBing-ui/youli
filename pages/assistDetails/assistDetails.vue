<template>
	<view class="content">
		<Box title="申请详情">
			<view class="w100 flex flex-direction padding-tb">
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">线下网点</view>
					<view class="flex-treble">XXXX法律咨询</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">预约人员</view>
					<view class="flex-treble">{{ details.reservationName }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">手机号</view>
					<view class="flex-treble">{{ details.phone }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">预约时间</view>
					<view class="flex-treble">{{ details.reservationTime }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">案情类别</view>
					<view class="flex-treble">{{ details.caseCategory }}</view>
				</view>
				<view class="flex justify-between align-center border-bottom padding-tb-sm">
					<view class="flex-sub">案情描述</view>
					<view class="flex-treble">{{ details.caseText }}</view>
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
