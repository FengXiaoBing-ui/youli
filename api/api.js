import request from "./request.js";


function login (data){
	return request.get('/app/user/appletLogin',data);
}

function phoneLogin (data){
	return request.post('/app/user/phoneLogin',data);
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

function addReservation (data){
	return request.post('/module/reservation',data);
}

function reservationList (data){
	return request.get('/module/reservation/list',data);
}

function reservation (id){
	return request.get(`/module/reservation/${id}`);
}

function aid (data){
	return request.post(`/module/aid`,data);
}

function aidList (data){
	return request.get(`/module/aid/list`,data);
}

function aidDetails (id){
	return request.get(`/module/aid/${id}`);
}

function feedback (data){
	return request.post(`/module/feedback`,data);
}

function lessonList (data){
	return request.get(`/module/lesson/list`,data);
}

function onlineUser (data){
	return request.get(`/app/user/onlineUser`,data);
}

function myChatRoom (data){
	return request.get(`/module/room/myChatRoom`,data);
}

function upLoadFile (data){
	return request.upload(`/thirdParty/oss/upload`,data);
}

function star (data){
	return request.post(`/module/star`,data);
}

function offlineUser (data){
	return request.get(`/app/user/offlineUser`,data);
}

function updateIsOnline (data){
	return request.get(`/module/room/updateIsOnline`,data);
}


export default {
	login,//登录
	phoneLogin,//手机号一键登录
	logout,//退出登录
	sendMsg,//发送消息
	chatLog,//聊天记录
	allUser,//所有用户
	createChat,//创建聊天室
	appletList,//线下网点列表
	addReservation,//新增线下网点预约
	reservationList,//我的线下网点预约列表
	reservation,//预约详情
	aid,//新增法律援助申请
	aidList,//法律援助申请列表
	aidDetails,//法律援助申请详情
	feedback,//新增意见反馈
	lessonList,//课程培训
	onlineUser,//顾问-匹配在线顾问
	myChatRoom,//我的聊天室
	upLoadFile,//上传文件
	star,//评价
	offlineUser,//顾问-随机匹配不在线的顾问
	updateIsOnline,//聊天室号更新IsOnline
}