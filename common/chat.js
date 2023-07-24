import $H from "../api/api.js"
class chat {
	constructor(arg) {
		this.url = arg.url
		this.isOnline = false
		this.socket = null
		this.reconnectTime = 0
		this.isOpenReconnect = true
		// 获取当前用户相关信息
		let user = uni.getStorageSync('userInfo')
		this.user = user ? user : {}
		// 初始化聊天对象
		this.TO = false;
		// 连接和监听
		if (this.user.token) {
			this.connectSocket()
		}
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
			this.reconnect()
		}
		// console.log('socket连接关闭')
	}
	// 监听连接错误
	onError() {
		// 用户下线
		this.isOnline = false
		this.socket = null
		if (this.isOpenReconnect) {
			this.reconnect()
		}
		// console.log('socket连接错误')
	}
	// 监听接收消息
	onMessage(data) {
		let res = JSON.parse(data.data)
		console.log(res);
		// console.log('监听接收消息',res)
		// 错误
		switch (res.type) {
			case -3:
				uni.showToast({
					title: res.date,
					icon: 'none'
				});
				break;
			// case 'moment': // 朋友圈更新
			// 	this.handleMoment(res.data)
			// 	break;
			case 1: // 朋友圈更新
				this.handleOnMessage(res.data)
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
		this.updateChatList(data,false)
		// 全局通知
		uni.$emit('onMessage',data)
	}
	//发送消息
	send(message,onProgress = false){
		return new Promise(async (result,reject)=>{
			// 添加消息历史记录
			let { k } = this.addChatDetail(message)
			// 更新会话列表
			this.updateChatList(message)
			// 验证是否上线
			if(!this.checkOnline()) return reject('未上线')
			
			// 提交到后端
			let data = message.data
			$H.sendMsg({
				to_id:message.to_id || this.TO.id,
				chat_type:message.chat_type || this.TO.chat_type, 
				type:message.type, 
				data, 
				options:JSON.stringify(message.options)
			}).then(res=>{
				// 发送成功
				message.id = res.id
				message.sendStatus = 'success'
				
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
	addChatDetail(message,isSend = true){
		// console.log('添加聊天记录');
		// 获取对方id
		let id = message.chat_type === 'user' ? (isSend ? message.to_id : message.from_id) : message.to_id
		// key值：chatDetail_当前用户id_会话类型_接收人/群id
		let key = `chatDetail_${this.user.id}_${message.chat_type}_${id}`
		// 获取原来的聊天记录
		let list = this.getChatDetail(key)
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
		
		// 判断私聊还是群聊
		if(message.chat_type === 'user'){ // 私聊
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
				chat_type:message.chat_type, // 接收类型 user单聊 group群聊
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
		let key = `chatlist_${this.user.id}`
		this.setStorage(key,list)
		
		// 更新未读数
		// this.updateBadge(list)
		
		// 通知更新vuex中的聊天会话列表
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
		let id = message.chat_type === 'user' ? (isSend ? message.to_id : message.from_id) : message.to_id
		// key值：chatDetail_当前用户id_会话类型_接收人/群id
		let key = `chatDetail_${this.user.id}_${message.chat_type}_${id}`
		// console.log('key值',key)
		// 获取原来的聊天记录
		let list = this.getChatDetail(key)
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
	getChatDetail(key = false){
		key = key ? key : `chatDetail_${this.user.id}_${this.TO.chat_type}_${this.TO.id}`
		return this.getStorage(key)
	}
	// 格式化会话最后一条消息显示
	formatChatItemData(message,isSend){
		let data = message.data
		switch (message.type){
			case 'emoticon':
			data = '[表情]'
				break;
			case 'image':
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
		data = isSend ? data : `${message.from_name}: ${data}`
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
		this.isOpenReconnect = false
		console.log('关闭成功');
	}
}
export default chat