var turnWebCam = function() {

    // Normalize the various vendor prefixed versions of getUserMedia.
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia || 
                              navigator.msGetUserMedia);
  
    if (navigator.getUserMedia) {
    // Request the camera.
    navigator.getUserMedia(
      // Constraints
    {
        video: true
    },  
      // Success Callback
    function(localMediaStream) {
        // Get a reference to the video element on the page.
        var vid = document.getElementById('video-stream');

        // Create an object URL for the video stream and use this 
        // to set the video source.
        vid.src = window.URL.createObjectURL(localMediaStream);
    },
      // Error Callback
      function(err) {
        // Log the error to the console.
        console.log('The following error occurred when trying to use getUserMedia: ' + err);
      }
    );
    } else {
        alert('Sorry, your browser does not support getUserMedia');
    }
}

var turnVideo = function(vidNum){
  var vid = document.getElementById('video-stream');
  vid.src = 'videos/test'+(vidNum+1)+'.mp4';
  var playPromise = vid.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }

}
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
}); 

socket.on('ifSync', function (data) {

  console.log(data);

  switch(data.ifSync) {
    case 1:
      console.log('turn on webcam');  //<<< not working
      turnWebCam();
      break;

    case 0:
      console.log('turn on video', data.vidNumber);  //<<< not working
      turnVideo(data.vidNumber);
      break;
  }

});


socket.on('disconnect', function(){
    console.log('disconnected');
});

