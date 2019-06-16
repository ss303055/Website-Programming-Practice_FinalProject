var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;
var cells = 4;
var length_height = 600/cells;

//initial
$(document).ready(function(){
    //設定地形
    //0:可走, 1:障礙 ,2:終點, 3:敵人
    mapArray = [0,1,1,1,
                0,0,3,1,
                3,0,0,0,
                1,0,3,2];
    ctx = $("#myCanvas")[0].getContext("2d");
    
    //玩家
    imgMain = new Image();
    imgMain.src = "simple_rpg/images/spriteSheet.png";
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload=function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,length_height,length_height);
    }
    
    //障礙物and敵人
    imgMountain = new Image();
    imgMountain.src = "simple_rpg/images/material.png";
    
    imgEnemy = new Image();
    imgEnemy.src = "simple_rpg/images/Enemy.png";
    
    imgMountain.onload=function(){  //onload會等到圖片仔入完成後才執行
        imgEnemy.onload=function(){
            for(var x in mapArray)
            {
                if(mapArray[x]==1)
                {
                    ctx.drawImage(imgMountain,64,190,32,32,x%cells*length_height,Math.floor(x/cells)*length_height,length_height,length_height);
                }
                else if(mapArray[x]==3)
                {
                    ctx.drawImage(imgEnemy,7,40,104,135,x%cells*length_height,Math.floor(x/cells)*length_height,length_height,length_height);
                }
            }
        };
    };
});

//player move
$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY, //player next position
        targetBlock,                    //player next position's number
        cutImagePositionX;              //player face
    event.preventDefault();             //避免點擊鍵盤發生瀏覽器捲動行為
    switch(event.which){
        case 37:    //鍵盤按鍵編號,往左走
            targetImgMainX = currentImgMainX-length_height;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case 38:    //up
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-length_height;
            cutImagePositionX = 355;
            break;
        case 39:    //right
            targetImgMainX = currentImgMainX+length_height;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case 40:    //down
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+length_height;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }
    
    //判斷邊界and障礙物
    if(targetImgMainX<=450 && targetImgMainX>=0 &&targetImgMainY<=450 && targetImgMainY>=0)
    {
        targetBlock=targetImgMainX/150+targetImgMainY/150*4;
    }
    else
    {
        targetBlock=-1; //-1 means error, dont move
    }
    
    ctx.clearRect(currentImgMainX, currentImgMainY, 150, 150);
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3)
    {
        //位置異常 || 遇到障礙物 || 遇到敵人
        //dont do anything
    }
    else
    {
        $("#talkBox").text("");
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,150,150);
    
    switch(mapArray[targetBlock]){
        case undefined: //邊界
            $("#talkBox").text("邊界");
            break;
        case 1: //障礙
            $("#talkBox").text("有山");
            break;
        case 2: //end
            $("#talkBox").text("抵達終點!");
            break;
        case 3: //enemy
            $("#talkBox").text("嗨~");
            break;
    }
});