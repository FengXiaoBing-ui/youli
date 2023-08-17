<template>
	<view class="content">
		<Box title="线下网点预约" :rightIcon="require('@/static/navbar/reservation.png')">
			<view class="flex align-center padding-top-lg padding-bottom-sm">
				<view style="width: 95px;font-size: 30rpx;color: #1D1D1D;">线下网点</view>
				<view class="text-left" style="width: 360rpx;font-size: 32rpx;">{{ info.branchName }}</view>
				<!-- <view style="color: #DBDBDB;font-size: 30rpx;">王刚</view> -->
			</view>
			<u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm">
				<u-form-item labelWidth="95" label="预约人员" prop="reservationName" borderBottom ref="item1">
					<u--input v-model="formData.reservationName" placeholder="请输入您的姓名" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="95" label="手机号" prop="phone" borderBottom ref="item1">
					<u--input v-model="formData.phone" placeholder="请输入您的手机号码" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="95" label="预约时间" prop="reservationTime" borderBottom @click="openDateTime"
					ref="item1">
					<u--input v-model="formData.reservationTime" placeholder="请选择预约时间" disabled disabledColor="#ffffff"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right" color="#DBDBDB" size="22"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="95" label="案情类别" prop="caseCategory" borderBottom ref="item1" @click="columnShow = true">
					<u--input v-model="formData.caseCategory" placeholder="请选择案情类别" disabled disabledColor="#ffffff"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right" color="#DBDBDB" size="22"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="95" label="案情描述" prop="caseText" ref="item1">
					<u--textarea v-model="formData.caseText" placeholder="请先简单描述案情" autoHeight></u--textarea>
				</u-form-item>
			</u--form>
			<view @click="submit" class="submit text-center">提交预约</view>
		</Box>
		<u-datetime-picker @confirm="confirm" @close="datetimeShow = false" @cancel="datetimeShow = false"
			ref="datetimePicker" :minDate="minDate" :show="datetimeShow" v-model="reservationTime" mode="datetime"
			:formatter="formatter"></u-datetime-picker>
		<u-picker :show="columnShow" :columns="columns" @cancel="columnShow = false" @confirm="columnsConfirm"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				minDate: new Date().getTime(),
				columns: [
					[
						'案情类别',
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
				columnShow: false,
				info: "",
				datetimeShow: false,
				pickerShow: false,
				statusBarHeight: this.StatusBarHeight,
				reservationTime: "",
				formData: {
					reservationName: "",
					phone: "",
					reservationTime: "",
					caseCategory: "",
					caseText: ""
				},
				rules: {
					"reservationName": {
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
					"reservationTime": {
						required: true,
						message: '请选择预约时间',
						trigger: ['blur', 'change']
					},
					"caseCategory": {
						required: true,
						message: '请选择案情类别',
						trigger: ['blur', 'change']
					},
					"caseText": {
						required: true,
						message: '请先简单描述案情',
						trigger: ['blur', 'change']
					}
				},
			};
		},
		onReady() {
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onLoad(options) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('info', (data) => {
				console.log(data)
				this.info = data
			})
		},
		methods: {
			columnsConfirm(e){
				console.log(e.value[0]);
				this.formData.caseCategory = e.value[0]
				this.$refs.uForm.validateField('caseCategory')
				this.columnShow = false
			},
			confirm(e) {
				this.datetimeShow = false
				this.formData.reservationTime = uni.$u.date(e.value, 'yyyy-mm-dd-hh-MM')
			},
			openDateTime() {
				this.datetimeShow = true
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				if (type === 'hour') {
					return `${value}时`
				}
				if (type === 'minute') {
					return `${value}分`
				}
				return value
			},
			submit() {
				this.$refs.uForm.validate().then(async res => {
					uni.showLoading({
						title: "预约中..."
					})
					this.formData.branchId = this.info.id
					console.log(this.formData);
					let data = await this.$http.addReservation(this.formData)
					uni.hideLoading()
					if (data.code == 200) {
						this.$http.numberOfServices(this.info.id)
						uni.showToast({
							title: "预约成功！"
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
	}

	/deep/.u-form-item__body__left__content__label {
		color: #1D1D1D;
	}

	/deep/.u-line {
		border-color: #F7F7F7;
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
		position: fixed;
		bottom: 10vh;
		left: 50%;
		transform: translateX(-50%);
	}

	.bgHeader {
		width: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
		background-color: #212E72;
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
		height: 100px;
		background-color: white;
	}
</style>