var mouthText=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
var dayText=["一号","二号","三号","四号","五号","六号","七号","八号","九号","十号","十一号","十二号","十三号","十四号","十五号","十六号","十七号","十八号","十九号","二十号","二十一号","二十二号","二十三号","二十四号","二十五号","二十六号","二十七号","二十八号","二十九号","三十号","三十一号"]
var weekText=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
var hourText=["零点","一点","两点","三点","四点","五点","六点","七点","八点","九点","十点","十一点","十二点","十三点","十四点","十五点","十六点","十七点","十八点","十九点","二十点","二十一点","二十二点","二十三点"]
var minuteText=["零分","一分","二分","三分","四分","五分","六分","七分","八分","九分","十分","十一分","十二分","十三分","十四分","十五分","十六分","十七分","十八分","十九分","二十分","二十一分","二十二分","二十三分","二十四分","二十五分","二十六分","二十七分","二十八分","二十九分","三十分","三十一分","三十二分","三十三分","三十四分","三十五分","三十六分","三十七分","三十八分","三十九分","四十分","四十一分","四十二分","四十三分","四十四分","四十五分","四十六分","四十七分","四十八分","四十九分","五十分","五十一分","五十二分","五十三分","五十四分","五十五分","五十六分","五十七分","五十八分","五十九分"]
var secondText=["零秒","一秒","二秒","三秒","四秒","五秒","六秒","七秒","八秒","九秒","十秒","十一秒","十二秒","十三秒","十四秒","十五秒","十六秒","十七秒","十八秒","十九秒","二十秒","二十一秒","二十二秒","二十三秒","二十四秒","二十五秒","二十六秒","二十七秒","二十八秒","二十九秒","三十秒","三十一秒","三十二秒","三十三秒","三十四秒","三十五秒","三十六秒","三十七秒","三十八秒","三十九秒","四十秒","四十一秒","四十二秒","四十三秒","四十四秒","四十五秒","四十六秒","四十七秒","四十八秒","四十九秒","五十秒","五十一秒","五十二秒","五十三秒","五十四秒","五十五秒","五十六秒","五十七秒","五十八秒","五十九秒"]
//创建数组保存dom元素
var clock;
var mouthList=[];
var dayList=[];
var weekList=[];
var hourList=[];
var minuteList=[];
var secondList=[];
//创建二维数组
var setText=[
            [mouthText,mouthList],
            [dayText,dayList],
            [weekText,weekList],
            [hourText,hourList],
            [minuteText,minuteList],
            [secondText,secondList]
        ];
window.onload=function(){
    //初始化函数
    init();
    setInterval(function(){
        initStyle();
        getTime();
    },100);

    setTimeout(function(){
        changeCircle();
    },2000)

}
function init() {
     clock = document.getElementsByClassName("clock")[0];
    for (var i = 0; i < setText.length; i++) {
        for (var j = 0; j < setText[i][0].length; j++) {
            var temp=createDiv(setText[i][0][j]);
            clock.appendChild(temp);
            //将dom元素保存到空数组中
            setText[i][1].push(temp);//console.log(setText[i][1][j]) ;
        }
    }
};
    //创建元素
function createDiv(text){
   var div=document.createElement("div");
   div.classList.add("label");
   div.innerHTML=text;
   return div;
};
//获取当前时刻
function getTime(){
        var now = new Date();
        //获取当前的月，日，星期，时，分，秒
        var month=now.getMonth();
        var day=now.getDate();
        var week=now.getDay();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        var nowValue=[month,day-1,week,hour,minute,second];
        //用数组的下标来匹配
        for(var i=0;i<nowValue.length;i++){
            var num=nowValue[i];
            //console.log(num);
            try{
               setText[i][1][num].style.color="#fff";
               //console.log(setText[i][1][num]);
            }catch(e){
               //console.log(e.message);
            }
           //console.log(setText[i][1][num]);
        }
        return nowValue;
}
function initStyle(){
        var label=document.getElementsByClassName("label");
        for(var i=0;i<label.length;i++){
            label[i].style.color="#6d6d6d"
        }
}
function Circle(){
        var nowValue=getTime();
        var miW=document.body.clientWidth/2;
        var miH=document.body.clientHeight/2;
        // console.log(miW);
        // console.log(miH);
        for(var i=0;i<setText.length ;i++){
        for(var j=0;j<setText[i][0].length;j++){
            var r = (i + 1) * 45 + 50* i;
            var deg=(360/setText[i][1].length)*(j-nowValue[i]);
            // var deg = 360 / textSet[i][1].length * (j - nowValue[i]) ;
            // var x = r * Math.sin(deg * Math.PI / 180) + widthMid;
            var x=r*Math.sin(deg*Math.PI/180)+miW;
            var y=miH-r*Math.cos(deg*Math.PI/180);
            var temp=setText[i][1][j];
            temp.style.left=x+"px";
            temp.style.top=y+"px";
            temp.style.transform = 'rotate('+ (-90 + deg ) +'deg)';
            //console.log(setText[i][1][j]) ;
        }
    }
}
function changePosition(){
    //var div=document.getElementsByClassName("clock");
    for(let i=0;i<setText.length;i++){
       for(let j=0;j<setText[i][1].length;j++){
           // var temp=setText[i][1][j];
            // temp.style.position="absolute";
           let tempX = setText[i][1][j].offsetLeft + "px";
           let tempY = setText[i][1][j].offsetTop + "px";
           // console.log(textSet[i][1][j]);
           // 利用let 防止闭包,let申明局部变量
           setTimeout(function () {
               setText[i][1][j].style.position = "absolute";
               setText[i][1][j].style.left = tempX;
               setText[i][1][j].style.top = tempY;
           }, 50);
       }
       //console.log(temp);
    }
}
function changeCircle(){
    changePosition();
    clock.style.transform="rotate(90deg)";
    setInterval(function(){
        Circle();
    },50)

}
