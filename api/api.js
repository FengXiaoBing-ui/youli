import request from "./request.js";


function login (data){
	return request.post('/app/user/appletLogin',data);
}

function logout (data){
	return request.get('/logout',data);
}

function sendMsg (data){
	return request.post('/module/chat/startChat',data);
}

function chatLog (data){
	return request.get('/module/chat/chatLog',data);
}

export default {
	login,//登录
	logout,//退出登录
	sendMsg,//发送消息
	chatLog,//聊天记录
}