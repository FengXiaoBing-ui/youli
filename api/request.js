import config from "./config.js"
import store from "@/store/index.js"
export default {
    // 全局配置
    common:{
        baseUrl:config.baseUrl,
        header:{
            'Content-Type':'application/json;charset=UTF-8',
        },
        data:{},
        method:'GET',
        dataType:'json',
        token:true
    },
    // 请求 返回promise
    request(options = {}){
        // 组织参数
        options.url = this.common.baseUrl + options.url
        options.header = options.header || this.common.header
        options.data = options.data || this.common.data
        options.method = options.method || this.common.method
        options.dataType = options.dataType || this.common.dataType

        // 请求之前验证...
        // token验证
        if (uni.getStorageSync('token')) {
            let token = uni.getStorageSync('token')
            // 二次验证
            if (!token) {
                uni.showToast({ title: '请先登录', icon: 'none' });
                // token不存在时跳转
                return uni.reLaunch({
                    url: '/pages/index/index',
                });
            }
            // 往header头中添加token
            options.header.Authorization = token
        }else{
			options.header.Authorization = ""
		}
        // 请求
        return new Promise((res,rej)=>{
            // 请求中...
            uni.request({
                ...options,
                success: (result) => {
					if(result.data.code==401){
						uni.showToast({
							title:"登录已过期，请重新登录",
							icon:"none"
						})
						store.dispatch('logout')
						return rej(result.data)
					}
                    // 返回原始数据
                    if(options.native){
                        return res(result.data)
                    }
                    // 服务端失败
                    if(result.statusCode != 200){
                        if (options.toast != false) {
                            uni.showToast({
                                title: result.data.data || '服务端失败',
                                icon: 'none'
                            });
                        }
						// token不合法，直接退出登录
						if(result.data.data === 'Token 令牌不合法!'){
							console.log("需要退出登录");
						}
                        return rej(result.data)
                    }
                    // 其他验证...
                    // 成功
                    let data = result.data
                    res(data)
                },
                fail: (error) => {
					console.log(error);
                    uni.showToast({ title: error.errMsg || '请求失败', icon: 'none' });
                    return rej(error)
                }
            });
        })
    },
    // get请求
    get(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'GET'
        return this.request(options)
    },
    // post请求
    post(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'POST'
        return this.request(options)
    },
	// put请求
	put(url,data = {},options = {}){
	    options.url = url
	    options.data = data
	    options.method = 'PUT'
	    return this.request(options)
	},
    // delete请求
    del(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return this.request(options)
    },
	// 上传文件
	upload(url,data,onProgress = false){
		return new Promise((result,reject)=>{
			// 上传
			let token = uni.getStorageSync('token')
			if (!token) {
			    uni.showToast({ title: '请先登录', icon: 'none' });
			    // token不存在时跳转
			    return uni.reLaunch({
			        url: '/pages/my/my',
			    });
			}
			console.log(data);
			const uploadTask = uni.uploadFile({
				url:this.common.baseUrl + url,
				filePath:data,
				name:"file",
				header:{
					'Authorization': 'Bearer '+ token
				},
				success: (res) => {
					if(res.statusCode !== 200){
						result(false)
						return uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					}
					result(JSON.parse(res.data));
				},
				fail: (err) => {
					console.log(err);
					reject(err)
				}
			})
			
			uploadTask.onProgressUpdate((res) => {
				if(typeof onProgress === 'function'){
					onProgress(res.progress)
				}
			});
			
		})
	}
}