var vm = new Vue({
  el: '#app',
  data: {
    musicData:{name:"",title:"",url:"",photo:"",url:"",ssid:"",sid:""},
    channels:[],
    musicText:{lyric:[],name:""}
  }
})

getMusic();
console.log(vm.musicData);

//获取豆瓣频道
function getChannels(){
    $.ajax({
        url:"http://api.jirengu.com/fm/getChannels.php",
        dataType:"json",
        Method:"get",
        success:function(data){
            vm.channels = data.channels;
            console.log(vm.channels);
        }
    })
}

//获取豆瓣音乐
function getMusic(){
    $.ajax({
        url:"http://api.jirengu.com/fm/getSong.php",
        dataType:"json",
        Method:"get",
        data:{'channel':1},
        success:function(data){
            console.log(data)
            vm.musicData.title = data.song[0].title;
            vm.musicData.name = data.song[0].artist;
            vm.musicData.photo = data.song[0].picture;
            vm.musicData.url = data.song[0].url;
            vm.musicData.ssid = data.song[0].ssid;
            vm.musicData.sid = data.song[0].sid;
        }
    })
}

vm.musicIrc =[];
//获取歌词信息
function getMusicText(ssid,sid){
    $.ajax({
        url:"http://jirenguapi.applinzi.com/fm/getLyric.php",
        dataType:"json",
        Method:"get",
        data:{ssid:ssid,sid:sid},
        success:function(data){
            console.log(data);
            console.log(data.lyric.split(/\n/));
            vm.musicText.lyric = data.lyric.split(/\n/);
            for(var i in vm.musicText.lyric){
                console.log(vm.musicText.lyric[i]);
                var re = /^[d+:d+\.d+]/
                console.log(vm.musicText.lyric[i].split(re));
            }
            vm.musicText.name = data.name;
        }
    })
}

vm.Next = function(){
    getMusic();
}

vm.ChannerList = function(){
    getChannels();
}

vm.MusicText = function(ssid,sid){
    getMusicText(ssid,sid)
}