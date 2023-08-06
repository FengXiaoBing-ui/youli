<template>
	<view class="content padding-lr-sm">
		<view class="flex align-center padding-tb border-bottom">
			<view class="flex-sub">反馈标题</view>
			<input v-model="title" class="flex-treble" type="text" placeholder="请简短描述您要反馈的主要内容" placeholder-class="text-sm">
		</view>
		<view class="flex align-center padding-tb-sm border-bottom">
			<view class="flex-sub">反馈标题</view>
			<textarea v-model="text" auto-height class="flex-treble" type="text" placeholder="请简短描述您要反馈的主要内容" placeholder-class="text-sm"></textarea>
		</view>
		<view class="tips">
			规则：<br/>
			1、反馈标题、反馈内容为必填项，未填写完成点击提交反馈气泡提示“输入内容不完善，请检查”。<br/>
			2、提交反馈成功气泡提示“您的反馈已收到，我们将尽快处理”，在后台呈现反馈内容。<br/>
		</view>
		<view class="botBtn" @click="submit">
			提交反馈
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:"",
				title:""
			};
		},
		methods:{
			async submit(){
				uni.showLoading({
					title:"提交中..."
				})
				const res = await this.$http.feedback({text:this.text,title:this.title})
				uni.hideLoading()
				if(res.code==200){
					uni.showToast({
						title:"提交成功"
					})
					setTimeout(() => {
						uni.navigateBack()
					},300)
				}else{
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	min-height: 100vh;
}
.tips{
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 80vw;
	font-size: 24rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #909090;
}
.botBtn{
	width: 466rpx;
	height: 82rpx;
	background: #212E72;
	border-radius: 42rpx;
	position: absolute;
	left: 50%;
	bottom: 50rpx;
	transform: translateX(-50%);
	color: white;
	text-align: center;
	line-height: 82rpx;
}
</style>
