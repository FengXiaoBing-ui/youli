import { createRouter, RouterMount } from "uni-simple-router";

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...ROUTES]
});

const nextArr = [
	"/pages/index/index",
];
let isNext = true;

//进度条配置项这样写;//路由跳转前钩子函数中-执行进度条开始加载router.beforeEach((to,from,next)=>{;});//路由跳转后钩子函数中-执行进度条加载结束router.afterEach(()=>{;});
//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
	isNext = false
	nextArr.forEach(item => {
		console.log(to.path);
		if(to.path==item){
			isNext = true
		}
	})
    if (isNext) {
        next();
    } else {
        if (!uni.getStorageSync('token')) {
			// router.push("/pages/login/login")
			uni.navigateTo({
			    url: "/pages/my/my"
			})
            return
        } else {
            next()
        }
    }
});
// 全局路由后置守卫
router.afterEach((to, from) => {

});

export {
    router,
    RouterMount
};
