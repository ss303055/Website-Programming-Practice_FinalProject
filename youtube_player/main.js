var player; //Youtube播放器
var currentPlay = 0;    //紀錄到目前第幾首歌

//當Youtub API準備好時
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player", {
        height: "390",
        width:  "640",
        videoId:playList[currentPlay],
        playerVars:{
            "autoplay":0,
            "controls":1,
            "start":playTime[currentPlay][0],
            "end":playTime[currentPlay][1],
            "showinfo":1,
            "rel":0,
            "iv_load_policy":3
        },
        events:{
            "onReady":onPlayerReady,
            "onStateChange":onPlayerStateChange
        }
    });
}
//當Youtube播放器準備好時
function onPlayerReady(event){
    $("#playButton").click(function(){
        $("#vedio_name").text(player.getVideoData().title);
        player.playVideo();
    });
}
//當播放器狀態改變時
function onPlayerStateChange(event){
    //當播放結束時
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]) //event.data == 0&& (Math.floor(player.getCurrentTime())==playTime[currentPlay][1])
    {   //如果還沒播到最後一首, 就去播下一首
        if(currentPlay < playList.length-1)
        {
            currentPlay++;
            console.log(currentPlay);
            player.loadVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        }
        else   //播到最後一首
        {
            currentPlay=0;
            player.cueVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        }      
    }
    if(player.getVideoLoadedFraction()>0)   //避免影片還沒開始播時抓不到標題
    {   $("#vedio_name").text(player.getVideoData().title);  }
}