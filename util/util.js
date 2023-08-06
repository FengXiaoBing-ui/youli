
export default {
	// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
	getDistances(lat1, lng1, lat2, lng2) {
		// let EARTH_RADIUS = 6378.137;// 地球半径
		// let radLat1 = lat1 * Math.PI / 180.0; //lat1 * Math.PI / 180.0=>弧度计算
		// let radLat2 = lat2 * Math.PI / 180.0;
		// let a = radLat1 - radLat2;
		// let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
		// let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		// s = s * EARTH_RADIUS; 
		// s = Math.round(s * 10000) / 10000;// 输出为公里
		// return { m: (s * 1000), km: Number(s.toFixed(2)) }





		console.log(lat1, lng1, lat2, lng2)
		var radLat1 = lat1 * Math.PI / 180.0;
		var radLat2 = lat2 * Math.PI / 180.0;
		var a = radLat1 - radLat2;
		var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
				 Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = s * 6378.137;
		s = Math.round(s * 10000) / 10000;
		console.log(s);
		return {m:(s*1000).toFixed(0),km:s.toFixed(2)}  // 单位千米
	}

}