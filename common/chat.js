import $H from "../api/api.js"
import store from "../store/index.js"
class chat {
	constructor(arg) {
		this.url = arg.url
		this.isOnline = false
		this.socket = null
		this.reconnectTime = 0
		this.isOpenReconnect = true
		this.heartBeatInterval = null
		// 获取当前用户相关信息
		let user = uni.getStorageSync('userInfo')
		this.user = user ? user : {}
		// 初始化聊天对象
		this.TO = false;
		this.platform = uni.getSystemInfoSync().platform;
		// 创建背景音频管理器
		this.bgAudioMannager = uni.getBackgroundAudioManager();
		// 连接和监听
		if (this.user.token) {
			this.connectSocket()
		}
	}
	//退出聊天页
	exitChat(detail){
		this.socket.send({
			data: JSON.stringify({
				userIdTo: detail.to_id, // 接收人/群 id
				userIdFrom: this.user.userId, // 发送者id
				text: '', // 消息内容
				date:new Date().getTime(),
				type:-10
			})
		})
	}
	//更换律师
	replaceLawyer(data){
		this.socket.send({
			data: JSON.stringify({
				userIdTo: this.TO.to_id, // 接收人/群 id
				userIdFrom: this.user.userId, // 发送者id
				text: JSON.stringify(data), // 消息内容
				date:new Date().getTime(),
				type:11
			})
		})
	}
	//更换顾问
	async replaceConsultant(data){
		uni.showModal({
			title:"顾问正在为您更换其他顾问，是否确认更换",
			success: async (element)=> {
				if(element.confirm){
					if(!data.isOnline){
						await $H.saveChatRoom({adviserId:data.to_id,userId:uni.getStorageSync('userInfo').userId})
						console.log(777,this.TO);
						await $H.updateIsOnline({
							chatRoomNumber: this.TO.chatRoomNumber,
							isOnline: 1
						})
					}
					const res = await $H.createChat({
						date: new Date(),
						isRead: 0,
						text: " ",
						type: "-1",
						userIdFrom: uni.getStorageSync('userInfo').userId,
						userIdTo: data.to_id,
					})
					let params = {
						to_id:data.to_id,
						to_name:data.to_name,
						to_avatar:data.to_avatar,
						chat_type:"1",
						chatRoomNumber:res.data
					}
					return uni.redirectTo({
						url:"/pages/chat/chat?params="+encodeURIComponent(JSON.stringify(params))
					})
				}
				if(element.cancel){
					this.endSeek()
				}
			}
		})

	}
	//结束咨询
	endSeek(data){
		store.commit('setEvaluateShow',true)
	}
	// 断线重连
	reconnect() {
		if (this.isOnline) {
			return
		}
		if (this.reconnectTime >= 20) {
			return this.reconnectConfirm()
		}
		this.reconnectTime += 1
		this.connectSocket()
	}
	// 连接socket
	connectSocket() {
		this.socket = uni.connectSocket({
			url: this.url + "/" + this.user.userId,
			complete: () => {}
		})
		// 监听连接成功
		this.socket.onOpen(() => this.onOpen())
		// 监听接收信息
		this.socket.onMessage((res) => this.onMessage(res))
		// 监听断开
		this.socket.onClose(() => this.onClose())
		// 监听错误
		this.socket.onError(() => this.onError())
	}
	// 监听打开
	onOpen() {
		// 用户上线
		this.isOnline = true
		// console.log('socket连接成功')
		this.isOpenReconnect = true
		// 获取用户离线消息
		this.getMessage()
	}
	// 获取离线消息
	getMessage() {
		$H.chatLog()
	}
	// 监听关闭
	onClose() {
		// 用户下线
		this.isOnline = false
		this.socket = null
		if (this.isOpenReconnect) {
			console.log('lllllll');
			this.reconnect()
			// this.reconnectConfirm()
		}
		// console.log('socket连接关闭')
	}
	// 监听连接错误
	onError() {
		// 用户下线
		this.isOnline = false
		this.socket = null
		if (this.isOpenReconnect) {
			// this.reconnect()
			this.reconnectConfirm()
		}
		// console.log('socket连接错误')
	}
	// 监听接收消息
	onMessage(data) {
		let res = JSON.parse(data.data)
		console.log('监听接收消息',res)
		// 错误
		switch (res.type) {
			case -2:
				//下线
				break;
			case -3:
				if(this.TO){
					$H.getChatRoom({adviserId:this.TO.to_id,userId:this.user.userId}).then(paiduiList => {
						console.log(paiduiList);
						store.commit('setLineUp',paiduiList.data.userIds.length-store.state.lineUpCount)
					})
				}
				
				break;
			// case 'moment': // 朋友圈更新
			// 	this.handleMoment(res.data)
			// 	break;
			case 0: //结束咨询
				this.endSeek()
				break;
			case 1: //普通文字消息
				this.handleOnMessage(JSON.parse(res.text))
				break;
			case 2: //图片消息
				this.handleOnMessage(JSON.parse(res.text))
				break;
			case 10: //排队消息
				store.commit("setLineUp",res.text)
				break;
			case 11: //律师卡片消息
				this.handleOnMessage(JSON.parse(res.text))
				break;
			case 12: //线下网点卡片
				this.handleOnMessage(JSON.parse(res.text))
				break;
			case 13: //换法律顾问
				this.replaceConsultant(JSON.parse(res.text))
				break;
			default:
				// 处理消息
				// this.handleOnMessage(res.data)
				break;
		}
	}
	// 处理消息
	async handleOnMessage(message){
		// 添加消息记录到本地存储中
		let { data } = this.addChatDetail(message,false)
		// 更新会话列表
		this.updateChatList(message,false)
		// 全局通知
		uni.$emit('onMessage',message)
	}
	//发送消息
	send(message,onProgress = false,chatRoomNumber){
		return new Promise(async (result,reject)=>{
			// 添加消息历史记录
			let { k } = this.addChatDetail(message)
			// 更新会话列表
			this.updateChatList(message)
			// 验证是否上线
			if(!this.checkOnline()) return reject('未上线')
			
			// 提交到后端
			let data = message.data
			// chatRoomNumber: "ChatRoom1689573771263430"
			// date: "2023-07-25T08:27:17.618Z"
			// isRead: 0
			// text: "77"
			// type: 1
			// userIdFrom: 203066
			// userIdTo: "9527"
			$H.sendMsg({
				chatRoomNumber,
				date:new Date(),
				from_id:this.user.userId,
				to_id:message.to_id || this.TO.to_id,
				userIdFrom:this.user.userId,
				userIdTo:message.to_id || this.TO.to_id,
				chat_type:message.chat_type || this.TO.chat_type, 
				type:message.type, 
				text:JSON.stringify(message),
				options:JSON.stringify(message.options)
			}).then(res=>{
				// 发送成功
				message.id = res.id
				message.sendStatus = 'success'
				message.chatRoomNumber = chatRoomNumber
				this.socket.send({
					data: JSON.stringify({
						userIdTo: message.to_id || this.TO.to_id, // 接收人/群 id
						userIdFrom: this.user.userId, // 发送者id
						text: message, // 消息内容
						date:new Date().getTime(),
						type:message.type
					})				})
				if(message.type === 'video'){
					message.options = res.options
				}
				// 更新指定历史记录
				// console.log('更新指定历史记录',message);
				this.updateChatDetail(message,k)
				result(res)
			}).catch(err=>{
				// 发送失败
				message.sendStatus = 'fail'
				// 更新指定历史记录
				this.updateChatDetail(message,k)
				// 断线重连提示
				reject(err)
			})
		})
	}
	// 添加聊天记录
	async addChatDetail(message,isSend = true){
		// 获取对方id
		let id = message.chat_type == 1 ? (isSend ? message.to_id : message.from_id) : message.to_id
		// key值：chatDetail_当前用户id_会话类型_接收人/群id
		let key = `chatDetail_${this.user.userId}_${message.chat_type}_${id}`
		// 获取原来的聊天记录
		const res = await this.getChatDetail(key)
		
		let list = [],arr = [],rows = []
		res.rows.forEach((item => {
			rows.push(JSON.parse(item.text))
		}))
		arr = rows.reverse().concat(arr)
		list = arr
		// console.log('获取原来的聊天记录',list)
		// 标识
		message.k = 'k'+list.length
		list.push(message)
		// 加入缓存
		// console.log('加入缓存',key)
		this.setStorage(key,list)
		// 返回
		return {
			data:message,
			k:message.k
		}
	}
	// 更新会话列表
	updateChatList(message,isSend = true){
		// 获取本地存储会话列表
		let list = this.getChatList()
		// 是否处于当前聊天中
		let isCurrentChat = false
		// 接收人/群 id/头像/昵称
		let id = 0
		let avatar = ''
		let name = ''
		console.log(33333,message);
		// 判断私聊还是群聊
		if(message.chat_type == 1){ // 私聊
			// 聊天对象是否存在
			isCurrentChat = this.TO ? (isSend ? this.TO.id === message.to_id : this.TO.id === message.from_id) : false
			
			id = isSend ? message.to_id : message.from_id
			avatar = isSend ? message.to_avatar : message.from_avatar
			name = isSend ? message.to_name : message.from_name
		} else { // 群聊
			isCurrentChat = this.TO && (this.TO.id === message.to_id)
			id = message.to_id
			avatar = message.to_avatar
			name = message.to_name
		}
		
		// 会话是否存在
		let index = list.findIndex(item=>{
			return item.chat_type === message.chat_type && item.id === id
		})
		// 最后一条消息展现形式
		// let data = isSend ? message.data : `${message.from_name}: ${message.data}`
		let data = this.formatChatItemData(message,isSend)
		// 会话不存在，创建会话
		// 未读数是否 + 1
		let noreadnum = (isSend || isCurrentChat) ? 0 : 1
		if(index === -1){
			let chatItem = {
				id, // 接收人/群 id
				chat_type:message.chat_type, // 接收类型 1单聊 group群聊
				avatar, // 接收人/群 头像
				name, // 接收人/群 昵称
				update_time:(new Date()).getTime(), // 最后一条消息的时间戳
				data, // 最后一条消息内容
				type:message.type, 		   // 最后一条消息类型
				noreadnum, // 未读数
				istop:false, // 是否置顶
				shownickname:false, // 是否显示昵称
				nowarn:false, // 消息免打扰
				strongwarn:false, // 是否开启强提醒
			}
			// 群聊
			if(message.chat_type === 'group' && message.group){
				chatItem.shownickname = true
				chatItem.name = name
				chatItem = {
					...chatItem,
					user_id:message.group.user_id, // 群管理员id
					remark:"", // 群公告
					invite_confirm:1, // 邀请确认
				}
			}
			list.unshift(chatItem)
		} else { // 存在，更新会话
			// 拿到当前会话
			let item = list[index]
			// 更新该会话最后一条消息时间，内容，类型
			item.update_time = (new Date()).getTime()
			item.name = name
			item.data = data
			item.type = message.type
			// 未读数更新
			item.noreadnum += noreadnum
			// 置顶会话
			list = this.listToFirst(list,index)
		}
		// 存储
		let key = `chatlist_${this.user.userId}`
		this.setStorage(key,list)
		
		// 更新未读数
		// this.updateBadge(list)
		
		// 通知更新vuex中的聊天会话列表
		console.log(66666,list);
		uni.$emit('onUpdateChatList',list)
		return list
	}
	// 验证是否上线
	checkOnline(){
		if(!this.isOnline){
			// 断线重连提示
			this.reconnectConfirm()
			return false
		}
		return true
	}
	// 更新指定历史记录
	async updateChatDetail(message,k,isSend = true){
		// 获取对方id
		let id = message.chat_type == 1 ? (isSend ? message.to_id : message.from_id) : message.to_id
		// key值：chatDetail_当前用户id_会话类型_接收人/群id
		let key = `chatDetail_${this.user.userId}_${message.chat_type}_${id}`
		// console.log('key值',key)
		// 获取原来的聊天记录
		const res = await this.getChatDetail(key)
		
		let list = [],arr = [],rows = []
		res.rows.forEach((item => {
			rows.push(JSON.parse(item.text))
		}))
		arr = rows.reverse().concat(arr)
		list = arr
		// console.log('获取原来的聊天记录',list)
		// 根据k查找对应聊天记录
		let index = list.findIndex(item=>item.k === k)
		// console.log('根据k查找对应聊天记录',index)
		if(index === -1) return;
		list[index] = message
		// 存储
		this.setStorage(key,list)
	}
	// 断线重连提示
	reconnectConfirm(){
		this.reconnectTime = 0
		uni.showModal({
			content: '你已经断线，是否重新连接？',
			confirmText:"重新连接",
			success:(res)=> {
				if (res.confirm) {
					this.connectSocket()
				}
			}
		});
	}
	// 获取存储
	getStorage(key){
		let list = uni.getStorageSync(key)
		return list ? JSON.parse(list) : []
	}
	// 设置存储
	setStorage(key,value){
		return uni.setStorageSync(key,JSON.stringify(value))
	}
	// 获取聊天记录
	getChatDetail(key = false,chatRoom){
		// key = key ? key : `chatDetail_${this.user.userId}_${this.TO.chat_type}_${this.TO.to_id}`
		// return this.getStorage(key)
		return $H.chatLog({chatRoomNumber:chatRoom||this.TO.chatRoomNumber,pageSize:200,pageNum:1})
	}
	// 格式化会话最后一条消息显示
	formatChatItemData(message,isSend){
		let data = message.data
		switch (message.type){
			case 'emoticon':
			data = '[表情]'
				break;
			case '2':
			data = '[图片]'
				break;
			case 'audio':
			data = '[语音]'
				break;
			case 'video':
			data = '[视频]'
				break;
			case 'card':
			data = '[名片]'
				break;
		}
		data = isSend ? data : `${message.name}: ${data}`
		return data
	}
	// 数组置顶
	listToFirst(arr,index){
		if (index != 0) {
			arr.unshift(arr.splice(index,1)[0]);
		}
		return arr;
	}
	// 关闭连接
	close(){
		if(this.socket){
			this.socket.close()
		}
		// this.isOpenReconnect = false
		console.log('关闭成功');
	}
	// 销毁聊天对象
	destoryChatObject(){
		this.TO = false
		// console.log('销毁聊天对象');
	}
	// 创建聊天对象
	createChatObject(detail){
		this.TO = detail
		console.log('创建聊天对象',this.TO);
	}
	// 获取本地存储会话列表
	getChatList(){
		let key = `chatlist_${this.user.userId}`
		return this.getStorage(key)
	}
	// 初始化会话
	initChatListItem(message){
		 // 获取本地存储会话列表
		 let list = this.getChatList()
		 // 会话是否存在
		 let index = list.findIndex(item=>{
		 	return item.chat_type === message.chat_type && item.id === message.to_id
		 })
		 // 最后一条消息展现形式
		 let data = this.formatChatItemData(message,true)
		 // 会话不存在，创建会话
		 if(index === -1){
		 	let chatItem = {
		 		id:message.to_id, // 接收人/群 id
		 		chat_type:message.chat_type, // 接收类型 user单聊 group群聊
		 		avatar:message.to_avatar,// 接收人/群 头像
		 		name:message.to_name,// 接收人/群 昵称
		 		update_time:(new Date()).getTime(), // 最后一条消息的时间戳
		 		data:message.data, // 最后一条消息内容
		 		type:'system', 		   // 最后一条消息类型
		 		noreadnum:0, // 未读数
		 		istop:false, // 是否置顶
		 		shownickname:false, // 是否显示昵称
		 		nowarn:false, // 消息免打扰
		 		strongwarn:false, // 是否开启强提醒
		 	}
		 	// 群聊
		 	if(message.chat_type === 'group' && message.group){
		 		chatItem = {
		 			...chatItem,
		 			user_id:message.group.user_id, // 群管理员id
		 			remark:'', // 群公告
		 			invite_confirm:message.group.invite_confirm, // 邀请确认
		 		}
		 	}
		 	list.unshift(chatItem)
		 	// 存储
		 	let key = `chatlist_${this.user.userId}`
		 	this.setStorage(key,list)
		 	// 通知更新vuex中的聊天会话列表
		 	uni.$emit('onUpdateChatList',list)
		 }
	}
	// 组织发送信息格式
	formatSendData(params){
		return {
			id:0, // 唯一id，后端生成，用于撤回指定消息
			from_avatar:this.user.user.avatar,// 发送者头像
			from_name:this.user.user.nickName || this.user.username, // 发送者昵称
			from_id:this.user.userId, // 发送者id
			to_id:params.to_id || this.TO.to_id, // 接收人/群 id
			to_name:params.to_name || this.TO.to_name, // 接收人/群 名称
			to_avatar:params.to_avatar || this.TO.to_avatar, // 接收人/群 头像
			chat_type:params.chat_type || this.TO.chat_type, // 接收类型
			type:params.type,// 消息类型
			data:params.data, // 消息内容
			options:params.options ? params.options : {}, // 其他参数
			create_time:(new Date()).getTime(), // 创建时间
			isremove:0, // 是否撤回
			sendStatus:"success" // 发送状态，success发送成功,fail发送失败,pending发送中
		}
	}
}
export default chat