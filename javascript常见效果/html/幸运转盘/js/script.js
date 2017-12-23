playip = localStorage.getItem("playIp");
console.log(playip);
var $btn = $('.playbtn');
var playnum = 1; //初始次数，由后台传入
$('.playnum').html(playnum);
var isture = 0;
/*
*在抽奖的活动中经常会用到这个算法，不同奖项的获取概率不同，要按概率去随机生成对应的奖品
*
*/
function random(arr1, arr2) {
  var sum = 0,
  factor = 0,
  random = Math.random();
 
  for(var i = arr2.length - 1; i >= 0; i--) {
    sum += arr2[i]; // 统计概率总和
  };
  random *= sum; // 生成概率随机数
  for(var i = arr2.length - 1; i >= 0; i--) {
    factor += arr2[i];
    if(random <= factor) 
     return arr1[i];
  };
  return null;
};

var data = [1, 2, 3, 4, 5, 6];
var rate = [0,0,0.1, 0.1, 0.2, 0.6];
	

var clickfunc = function() {
	var result=random(data, rate)

	console.log(result);
	switch(result) {
		
		case 1:
			rotateFunc(1, 0, '恭喜您获得7折优惠!');
			break;
		case 2:
			rotateFunc(2, 60, '恭喜您获得7.5折优惠!');
			break;
		case 3:
			rotateFunc(3, 120, '恭喜您获得8折优惠!');
			break;
		case 4:
			rotateFunc(4, 180, '恭喜您获得8.5折优惠!');
			break;
		case 5:
			rotateFunc(5, 240, '恭喜您获得9折优惠!');
			break;
		case 6:
			rotateFunc(6, 300, '恭喜您获得9.5折优惠!');
			break;
	}
}
$btn.click(function() {					
	if(isture) return; // 如果在执行就退出
	isture = true; // 标志为 在执行
	//先获取当前ip
	console.log('IP地址:' + returnCitySN["cip"] + ', CID:' + returnCitySN["cid"] + ', 地区:' + returnCitySN["cname"]);	
	if(playip==returnCitySN["cip"]){//先判断是否本地是否有记录,有记录则执行下面的函数
		playnum=0;
		alert("没有次数了");
		$('.playnum').html(0);
		isture = false;
	}else{//无记录就执行下面
		localStorage.setItem("playIp",returnCitySN["cip"]); //把数组存储起来		
		if(playnum <= 0){//当抽奖次数为0的时候执行
			alert("没有次数了");
			$('.playnum').html(0);
			isture = false;
		}else{//还有次数就执行
			playnum = playnum - 1; //执行转盘了则次数减1								
			if(playnum <= 0) {
					playnum = 0;
				}
			$('.playnum').html(playnum);
			clickfunc();
			}
	}
});
var rotateFunc = function(awards, angle, text) {
	isture = true;
	$btn.stopRotate();
	$btn.rotate({
		angle: 0,
		duration: 4000, //旋转时间
		animateTo: angle + 1440, //让它根据得出来的结果加上1440度旋转
		callback: function() {
			isture = false; // 标志为 执行完毕
			alert(text);
		}
	});
};