import request from "./request.js"
function login (url,data){
	return request.get(url,data);
}

export default {
	login,
}