<template>
	<view class="content">
		<Box title="法律援助申请" :rightIcon="require('@/static/navbar/assistApply.png')">
			<view style="overflow-y: auto;height: 80vh;">
				<u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm">
					<u-form-item labelWidth="95" label="姓名" prop="realName" borderBottom ref="item1">
						<u--input v-model="formData.realName" placeholder="请输入您的姓名" border="none"></u--input>
					</u-form-item>
					<u-form-item labelWidth="95" label="性别" prop="sex" borderBottom ref="item1" @click="showSex = true">
						<u--input v-model="formData.sex" placeholder="请选择您的性别" disabled disabledColor="#ffffff"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right" color="#DBDBDB" size="22"></u-icon>
					</u-form-item>
					<u-form-item labelWidth="95" label="出生日期" prop="birth" borderBottom @click="openDateTime"
						ref="item1">
						<u--input v-model="formData.birth" placeholder="请选择出生日期" disabled disabledColor="#ffffff"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right" color="#DBDBDB" size="22"></u-icon>
					</u-form-item>
					<u-form-item labelWidth="95" label="民族" prop="nation" borderBottom ref="item1">
						<u--input v-model="formData.nation" placeholder="请输入您的民族" border="none"></u--input>
					</u-form-item>
					<u-form-item labelWidth="95" label="户籍所在地" prop="registeredResidence" borderBottom ref="item1">
						<u--input v-model="formData.registeredResidence" placeholder="请输入您的户籍所在地"
							border="none"></u--input>
					</u-form-item>
					<u-form-item labelWidth="95" label="居住地" prop="habitation" borderBottom ref="item1">
						<u--input v-model="formData.habitation" placeholder="请输入您的居住地" border="none"></u--input>
					</u-form-item>
					<u-form-item labelWidth="95" label="邮政编号" prop="postalCode" borderBottom ref="item1">
						<u--input v-model="formData.postalCode" placeholder="请输入邮政编号" border="none"></u--input>
					</u-form-item>
					<u-form-item labelWidth="95" label="联系电话" prop="phone" borderBottom ref="item1">
						<u--input v-model="formData.phone" placeholder="请输入您的联系电话" border="none"></u--input>
					</u-form-item>
					<u-form-item labelWidth="95" label="工作单位" prop="workUnit" borderBottom ref="item1">
						<u--input v-model="formData.workUnit" placeholder="请输入您的工作单位" border="none"></u--input>
					</u-form-item>
					<u-form-item labelPosition="top" labelWidth="155" label="案件及申请理由概述" prop="caseText" ref="item1">
						<u--textarea v-model="formData.caseText" placeholder="请输入案情及申请理由概述" autoHeight></u--textarea>
					</u-form-item>
				</u--form>
				<u-checkbox-group class="margin-top-sm" v-model="checkbox" placement="column" @change="checkboxChange">
					<u-checkbox labelSize="10" labelColor="#FF0000" :customStyle="{marginBottom: '8px'}" v-for="(item, index) in checkboxList" :key="index"
						:label="item.name" :name="item.name">
					</u-checkbox>
				</u-checkbox-group>
				<u-datetime-picker @confirm="confirm" @close="datetimeShow = false" @cancel="datetimeShow = false"
					ref="datetimePicker" :minDate="1600000000" :show="datetimeShow" v-model="reservationTime" mode="date"
					:formatter="formatter"></u-datetime-picker>
				<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="如果选择保密会报错"
					@close="showSex = false" @select="sexSelect">
				</u-action-sheet>
				<view @click="submit" class="submit text-center">提交申请</view>
			</view>
		</Box>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkbox:"",
				checkboxList: [{
					name: '本人承诺以上以上所填内容和提交的证件、证明材料均真实。'
				}],
				sex:0,
				showSex: false,
				actions: [{
						name: '男',
						value: 0,
					},
					{
						name: '女',
						value: 1,
					}
				],
				datetimeShow: false,
				statusBarHeight: this.StatusBarHeight,
				reservationTime: "",
				formData: {
					"realName": "", //姓名
					"phone": "", //联系电话
					"birth": "", //出生日期
					"habitation": "", //居住地
					"caseText": "", //案情概述
					"nation": "", //民族
					"postalCode": "", //邮政编号
					"registeredResidence": "", //户籍所在地
					"sex": "", //性别
					"workUnit": "" //工作单位
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
					"birth": {
						required: true,
						message: '请选择出生日期',
						trigger: ['blur', 'change']
					},
					"habitation": {
						required: true,
						message: '请输入居住地',
						trigger: ['blur', 'change']
					},
					"caseText": {
						required: true,
						message: '请先简单描述案情',
						trigger: ['blur', 'change']
					},
					"nation": {
						required: true,
						message: '请输入民族',
						trigger: ['blur', 'change']
					},
					"postalCode": {
						required: true,
						message: '请输入邮政编号',
						trigger: ['blur', 'change']
					},
					"registeredResidence": {
						required: true,
						message: '请输入户籍所在地',
						trigger: ['blur', 'change']
					},
					"sex": {
						required: true,
						message: '请选择您的性别',
						trigger: ['blur', 'change']
					},
					"workUnit": {
						required: true,
						message: '请输入工作单位',
						trigger: ['blur', 'change']
					}
				},

			};
		},
		onReady() {
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		methods: {
			checkboxChange(n) {
				console.log('change', n);
			},
			openDateTime() {
				this.datetimeShow = true
			},
			sexSelect(e) {
				this.formData.sex = e.name
				this.sex = e.value
				this.$refs.uForm.validateField('sex')
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
				return value
			},
			confirm(e) {
				this.datetimeShow = false
				this.formData.birth = uni.$u.date(e.value, 'yyyy-mm-dd')
			},
			submit() {
				this.$refs.uForm.validate().then(async res => {
					if(!this.checkbox){
						return uni.showToast({
							title:"请先勾选本人承诺",
							icon:"none"
						})
					}
					uni.showLoading({
						title: "申请提交中..."
					})
					this.formData.aidStatus = 0
					console.log(this.formData);
					let data = await this.$http.aid({...this.formData,sex:this.sex})
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
</style>