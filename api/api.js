import request from "./request.js";


function login (data){
	return request.get('/app/user/appletLogin',data);
}

function logout (data){
	return request.get('/logout',data);
}

function allUser (data){
	return request.get('/app/user/allUsers',data);
}

function sendMsg (data){
	return request.post('/module/chat/startChat',data);
}

function chatLog (data){
	return request.get('/module/chat/chatLog',data);
}

function createChat (data){
	return request.post('/module/chat',data);
}

function appletList (data){
	return request.get('/module/branch/appletList',data);
}

export default {
	login,//登录
	logout,//退出登录
	sendMsg,//发送消息
	chatLog,//聊天记录
	allUser,//所有用户
	createChat,//创建聊天室
	appletList,//线下网点列表
}