//obj  需要移动或变化的 dom元素。
//json 标识变化的参数；
/*{
	width:300,
	height:200,
	top:100,
	left:200,
	opacity:30
}*/
//fn  回调： 运动完成后，要执行的函数；
function startMove(obj, json, fn) {
	//清理之前的定时器，避免冲突！
	//定时器的id  存放在dom节点的动态属性上。
	clearInterval(obj.timer);
	//启动定时器
	obj.timer = setInterval(function() {
		var isClear=true;// 默认清理定时器； 下面代码就是要看看有不满足当前设定的，然后修改默认值；
		for (attr in json) {
			if (attr == 'opacity') { //透明度的兼容
				var iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				var iCur = Math.round(parseFloat(getStyle(obj, attr)));
				if(!iCur){
					iCur=0;
				}
			}
			var iSpeed = (json[attr] - iCur) / 8; //计算速度
			iSpeed > 0 ? iSpeed = Math.ceil(iSpeed) : iSpeed = Math.floor(iSpeed);
			if (iCur == json[attr]) {
				//本属性到达目标值
			} else {
				isClear=false;//
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + parseInt(iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				} else {
					obj.style[attr] = (iCur + iSpeed) + 'px';
				}
			}
		}
		if(isClear){
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}, 30);
}
function getStyle(obj, attr) {
	if (obj.currentStyle) {   //ie
		return obj.currentStyle[attr];
	} else {
		return window.getComputedStyle(obj, false)[attr];  //非ie
	}
}
