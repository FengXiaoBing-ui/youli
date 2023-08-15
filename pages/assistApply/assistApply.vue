<template>
	<view class="content">
		<Box infoBoxClass="" title="诉讼垫款申请" background="#93A4FF" rightIconHeight="348rpx"
			:rightIcon="require('@/static/navbar/assistApply.png')">
			<view style="overflow-y: auto;height: 80vh;">
				<u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm">
					<view class="formTitle flex align-center margin-top-lg padding-lr">
						<view class="margin-left-xs tit">基础信息</view>
					</view>
					<view class="padding-lr">
						<u-form-item labelWidth="95" label="姓名" prop="realName" borderBottom ref="item1">
							<u--input v-model="formData.realName" placeholder="请输入您的姓名" border="none"></u--input>
						</u-form-item>
						<u-form-item labelWidth="95" label="联系电话" prop="phone" borderBottom ref="item1">
							<u--input v-model="formData.phone" placeholder="请输入您的联系电话" border="none"></u--input>
						</u-form-item>
						<u-form-item labelWidth="95" label="居住地址" prop="address" ref="item1">
							<u--input v-model="formData.address" placeholder="请输入您的居住地址" border="none"></u--input>
						</u-form-item>
					</view>
					<view class="tips flex align-center justify-between">
						<text class="margin-left-sm">案情描述不会写，法律援助可协助，点击 <text @click="onLineSeek" style="font-size: 32rpx;color: #212E72;">线上咨询</text> 前往</text>
						<image style="width: 108rpx;height: 82rpx;" src="../../static/index/tips.png" mode=""></image>
					</view>
					<view class="formTitle flex align-center margin-top padding-lr">
						<view class="margin-left-xs tit">案情描述</view>
					</view>
					<view class="padding-lr">
						<u-form-item labelWidth="95" label="案件类型" prop="caseType" borderBottom ref="item1"
							@click="columnShow = true">
							<u--input v-model="formData.caseType" placeholder="请选择案件类型" disabled disabledColor="#ffffff"
								border="none"></u--input>
							<u-icon slot="right" name="arrow-down" color="#DBDBDB" size="22"></u-icon>
						</u-form-item>
						<u-form-item labelWidth="95" label="涉案金额" prop="caseMoney" borderBottom ref="item1">
							<u--input v-model="formData.caseMoney" placeholder="请输入涉案金额" border="none"></u--input>
						</u-form-item>
						<u-form-item labelWidth="95" label="审理阶段" prop="caseStage" borderBottom ref="item1">
							<u--input v-model="formData.caseStage" placeholder="请输入审理阶段" border="none"></u--input>
						</u-form-item>
						<u-form-item class="fxb" labelPosition="top" labelWidth="155" label="案情描述" prop="caseText" ref="item1">
							<u--textarea v-model="formData.caseText" placeholder="请输入案情描述" :maxlength="-1"
								height="80"></u--textarea>
						</u-form-item>
					</view>
					
				</u--form>
				<u-picker :show="columnShow" :columns="columns" @cancel="columnShow = false"
					@confirm="columnsConfirm"></u-picker>
				<view @click="submit" class="submit text-center">提交申请</view>
			</view>
		</Box>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				columnShow: false,
				columns: [
					[
						'婚姻家庭',
						'交通事故',
						'医疗纠纷',
						'劳动争议',
						'债权债务',
						'刑事辩护',
						'环境保护',
						'司法救助',
						'合同纠纷',
						'公司法律',
						'知识产权',
						'侵权维权',
						'经济金融',
						'行政纠纷',
						'房产纠纷',
						'拆迁安置',
						'工程建筑',
						'其他'
					]
				],
				datetimeShow: false,
				statusBarHeight: this.StatusBarHeight,
				reservationTime: "",
				formData: {
					"realName": "", //姓名
					"phone": "", //联系电话
					"address": "", //居住地址
					"caseMoney": "", //涉案金额
					"caseText": "", //案情概述
					"caseStage": "", //审理阶段
					"caseType": "", //案件类型
				},
				rules: {
					"realName": {
						required: true,
						message: '请输入您的姓名',
						trigger: ['blur', 'change']
					},
					"phone": [{
							required: true,
							message: '请输入您的手机号码',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					"address": {
						required: true,
						message: '请输入居住地址',
						trigger: ['blur', 'change']
					},
					"caseMoney": {
						required: true,
						message: '请输入涉案金额',
						trigger: ['blur', 'change']
					},
					"caseText": {
						required: true,
						message: '请先简单描述案情',
						trigger: ['blur', 'change']
					},
					"caseStage": {
						required: true,
						message: '请输入审理阶段',
						trigger: ['blur', 'change']
					},
					"caseType": {
						required: true,
						message: '请选择案件类型',
						trigger: ['blur', 'change']
					}
				},

			};
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods: {
			onLineSeek(){
				this.$http.onlineUser().then( async userRes => {
					if(userRes.code==500){
						const offlineRes = await this.$http.offlineUser()
						const res = await this.$http.createChat({
							isOnline:1,
							date: new Date(),
							isRead: 0,
							text: " ",
							type: 10,
							userIdFrom: that.userInfo.userId,
							userIdTo: offlineRes.data.userId,
						})
						let params = {
							to_id:offlineRes.data.userId,
							to_name:offlineRes.data.nickName,
							to_avatar:offlineRes.data.avatar,
							chat_type:"1",
							chatRoomNumber:res.data
						}
						return uni.navigateTo({
							url:path+"?params="+encodeURIComponent(JSON.stringify(params))
						})
					}
					this.toChat(userRes)
				})
			},
			async toChat(userRes){
				let that = this;
				const res = await this.$http.createChat({
					date: new Date(),
					isRead: 0,
					text: " ",
					type: "-1",
					userIdFrom: that.userInfo.userId,
					userIdTo: userRes.data.userId,
				})
				let params = {
					to_id:userRes.data.userId,
					to_name:userRes.data.nickName,
					to_avatar:userRes.data.avatar,
					chat_type:"1",
					chatRoomNumber:res.data
				}
				uni.navigateTo({
					url:"/pages/chat/chat?params="+encodeURIComponent(JSON.stringify(params))
				})
			},
			columnsConfirm(e) {
				console.log(e.value[0]);
				this.formData.caseType = e.value[0]
				this.$refs.uForm.validateField('caseType')
				this.columnShow = false
			},
			submit() {
				this.$refs.uForm.validate().then(async res => {
					uni.showLoading({
						title: "申请提交中..."
					})
					console.log(this.formData);
					let data = await this.$http.aid(this.formData)
					uni.hideLoading()
					if (data.code == 200) {
						uni.showToast({
							title: "申请成功！"
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 300)
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						})
					}
				}).catch(errors => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-textarea {
		padding: 0 !important;
		margin-top: 20rpx;
	}
	/deep/.u-textarea__field{
		border: 1rpx solid #F7F7F7;
		padding: 5px;
		border-radius: 5px;
	}

	.submit {
		width: 466rpx;
		height: 82rpx;
		line-height: 82rpx;
		background: #032466;
		border-radius: 42rpx;
		font-size: 28rpx;
		font-family: PingFang SC-Bold, PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin: 20px auto;
	}

	.tips {
		width: 100vw;
		height: 82rpx;
		background: #EFF1FF;
		text{
			font-size: 24rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #909090;
		}
	}

	.formTitle {
		&:before {
			content: '';
			display: inline-block;
			width: 5px;
			height: 15px;
			background: #93A4FF;
			border-radius: 0px 0px 0px 0px;
		}

		.tit {
			font-size: 32rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #1D1D1D;
		}
	}
</style>