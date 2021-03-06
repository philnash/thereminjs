var Theremin = {
  startedVideo: false
};
Theremin.startVideo = function(){
    compatibility.getUserMedia({video:true}, function(stream){
    var video = document.getElementsByTagName('video')[0],
        square = $('#hand').show(),
        tick =  function(){
                  $(video).objectdetect('all', {classifier: objectdetect.face}, function(coords){
                    if(coords[0]){
                      if(Theremin.oscillator){
                        Theremin.gainNode.gain.value = (1/(coords[0][1]/480))/4;
                        Theremin.oscillator.frequency.value = 800 * (1/(coords[0][0]/640)) + 200;
                      }
                      square.css({
                        left: coords[0][0],
                        top: coords[0][1]
                      });
                    }
                  });
                  compatibility.requestAnimationFrame(tick);
                };
    video.src = compatibility.URL.createObjectURL(stream);
    compatibility.requestAnimationFrame(tick);
  }, function(){
    console.log('something went wrong');
  });
}

Theremin.start = function(e){
  e.preventDefault();
  if(!Theremin.context){
    Theremin.context = new webkitAudioContext();
  }
  Theremin.oscillator = Theremin.context.createOscillator();
  Theremin.gainNode = Theremin.context.createGainNode();
  Theremin.oscillator.type = 0;
  Theremin.oscillator.frequency.value = 440;
  Theremin.oscillator.connect(Theremin.gainNode);
  Theremin.gainNode.connect(Theremin.context.destination);
  if(!Theremin.startedVideo){
    Theremin.startVideo();
    Theremin.startedVideo = true;
  }
  Theremin.oscillator.noteOn(0);
  Theremin.startButton.removeEventListener('click', Theremin.start, false);
  Theremin.startButton.addEventListener('click', Theremin.stop, false);
  Theremin.startButton.innerHTML = 'Stop'
}

Theremin.stop = function(e){
  e.preventDefault();
  Theremin.oscillator.noteOff(0);
  delete Theremin.oscillator;
  delete Theremin.gainNode;
  Theremin.startButton.removeEventListener('click', Theremin.stop, false);
  Theremin.startButton.addEventListener('click', Theremin.start, false);
  Theremin.startButton.innerHTML = 'Start';
}

window.addEventListener('load', function(){
  Theremin.startButton = document.getElementById('start');
  if(!!compatibility.getUserMedia && !!window.webkitAudioContext){
    Theremin.startButton.addEventListener('click', Theremin.start, false);
  }else{
    Theremin.startButton.parentNode.innerHTML = "Your browser does not support either getUserMedia or audioContext. This was developed in Chrome and probably only works there.";
  }
}, false);