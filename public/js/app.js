var Theremin = {}

Theremin.Video = function(options, success, error){
  if(navigator.getUserMedia){
    navigator.getUserMedia(options, success, error);
  }else if(navigator.webkitGetUserMedia){
    navigator.webkitGetUserMedia(options, success, error);
  }else{
    error();
  }
}

window.addEventListener('load', function(){
  Theremin.Video({video:true}, function(stream){
    var video = document.getElementsByTagName('video')[0];
    video.src = window.URL.createObjectURL(stream);
  }, function(){
    console.log('something went wrong');
  })
}, false);