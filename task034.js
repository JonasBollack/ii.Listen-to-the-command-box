

var runBtn=document.getElementById("runBtn");
var runIpt=document.getElementById("runIpt");
var tbody=document.getElementsByTagName("tbody")[0];
var direction=["top","right","bottom","left"]
var interval=null;
var WIDTH=61;
var HEIGHT=61;
var nowPosition={
	X:0,
	Y:0,
    action:null,
    turn:0,
    rotate:0
}


function _mkAction(){
	var odiv=document.createElement("div");
	odiv.className="action";
	odiv.style.width=WIDTH+"px";
	odiv.style.height=HEIGHT-10+"px";
	odiv.style.borderTop="10px solid blue";
	odiv.style.backgroundColor="red";
	odiv.style.position="absolute";
	var ox=Math.floor(Math.random()*10);
	var oy=Math.floor(Math.random()*10);
	odiv.style.left=ox*WIDTH+"px";
	odiv.style.top=oy*HEIGHT+"px";
	nowPosition.X=ox+1;
	nowPosition.Y=oy+1;
	nowPosition.action=odiv;
	tbody.appendChild(odiv);
	console.log(nowPosition);
}



function Move(num){
	var go;
	if(num==undefined)
		go=nowPosition.turn;
	else
	if(num===0)
		go=num;
	else
		go=num;
    console.log(go);
    console.log("Y:BEF"+nowPosition.Y);
	console.log("X:BEF"+nowPosition.X);
    if(go==0){
    	if(nowPosition.Y>1)
    		nowPosition.Y--;
    }
    if(go==1){
    	if(nowPosition.X<10)
    		nowPosition.X++;
    }

    if(go==2){
    	if(nowPosition.Y<10)
    		nowPosition.Y++;
    }
    if(go==3){
    	if(nowPosition.X>1)
    		nowPosition.X--;
    }
    console.log("Y:AFT"+nowPosition.Y);
	console.log("X:AFT"+nowPosition.X);
    nowPosition.action.style.top=(nowPosition.Y-1)*HEIGHT+"px";
    nowPosition.action.style.left=(nowPosition.X-1)*WIDTH+"px";	
}

// 设置方向函数
function Turn(direct,rotate){
	if(direct!=null)
	switch(direct){
		case "TUN RIG":
		nowPosition.rotate=(nowPosition.rotate+90);
		console.log(nowPosition);
		nowPosition.action.style.transform="rotate("+nowPosition.rotate+"deg)";
		nowPosition.turn=(nowPosition.turn+1)%4;
		console.log(nowPosition.rotate);
		console.log(nowPosition.turn);
		break;
		case "TUN LEF":
		nowPosition.rotate=(nowPosition.rotate-90);
		nowPosition.action.style.transform="rotate("+nowPosition.rotate+"deg)";
		nowPosition.turn=(4+(nowPosition.turn-1)%4)%4;
		console.log(nowPosition.rotate);
		console.log(nowPosition.turn);
		break;
		case "TUN BAC":
		nowPosition.rotate=(nowPosition.rotate+180);
		nowPosition.action.style.transform="rotate("+nowPosition.rotate+"deg)";
		nowPosition.turn=(nowPosition.turn+2)%4;
				console.log(nowPosition.rotate);
		console.log(nowPosition.turn);
		break;
	}
	else{
		nowPosition.rotate=rotate;
		nowPosition.action.style.transform="rotate("+nowPosition.rotate+"deg)";
		if(nowPosition.rotate>=0)
			nowPosition.turn=(nowPosition.rotate/90)%4;
	    else if(nowPosition.rotate<0)
	    	nowPosition.turn=(4+(nowPosition.rotate/90)%4)%4;
	    Move(nowPosition.turn);
	}
}

// 按钮的执行函数
function btnListener(){
	switch(runIpt.value.trim()){
		case "GO":
		    Move();
		    break;
		case "TUN LEF":
            Turn("TUN LEF");
		    break;
		case "TUN RIG":
			Turn("TUN RIG");
			break;
		case "TUN BAC":
			Turn("TUN BAC");
		    break;
		case "TRA LEF":
		    Move(3);
		    break;
	    case "TRA TOP":
		    Move(0);
		    break;
	    case "TRA RIG":
		    Move(1);
		    break;
	    case "TRA BOT":
		    Move(2);
		    break;
	    case "MOV LEF":
            Turn(null,-90);
		    break;
	    case "MOV TOP":
		    Turn(null,0);
		    break;
	    case "MOV RIG":
	        Turn(null,90);
		    break;
	    case "MOV BOT":
	        Turn(null,180);
		    break;


	}
}

// input回车执行函数
function inputKeyDown(event){
	event=event||window.event;
	if(event.keyCode==13)
		btnListener();
}

// 解决浏览器兼容
function addEventHandler(obj,event,handler){
	if(obj.addEventListener){
		obj.addEventListener(event,handler,false);
	}else if(obj.attachEvent){
        obj.attachEvent("on"+event,handler);
	}else
        obj["on"+event]=handler;
}



function init(){
    addEventHandler(runBtn,"click",btnListener);
    addEventHandler(runIpt,"keydown",inputKeyDown);
    _mkAction();
}

init();