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
    var video = document.getElementsByTagName('video')[0],
        square = $('#hand'),
        tick =  function(){
                  $(video).objectdetect('all', {classifier: objectdetect.handopen}, function(coords){
                    if(coords[0]){
                      console.log(coords[0]);
                      square.css({
                        left: coords[0][0],
                        top: coords[0][1]
                      });
                    }
                  });
                  window.requestAnimationFrame(tick);
                };
    video.src = window.URL.createObjectURL(stream);

    window.requestAnimationFrame(tick);

  }, function(){
    console.log('something went wrong');
  })
}, false);