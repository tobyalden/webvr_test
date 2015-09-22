// CROSSHAIR
var crosshairTop = VR.camera.image('crosshair-top.png');
crosshairTop.moveZ(-1);
crosshairTop.moveY(0.015);
crosshairTop.setScale(0.05, 0.05, 0.05);
crosshairTop.object.material.transparent = true;
crosshairTop.object.material.opacity = 0.5;

var crosshairBottom = VR.camera.image('crosshair-bottom.png');
crosshairBottom.moveZ(-1);
crosshairBottom.moveY(-0.015);
crosshairBottom.setScale(0.05, 0.05, 0.05);
crosshairBottom.object.material.transparent = true;
crosshairBottom.object.material.opacity = 0.5;

var video = VR.video({
    // stereo: 'horizontal',
    sphere: true,
    src: [
        'dock_large.webm'
    ]
}).play();
video.muted = true;

var box = VR.box().moveTo(8, 0.6, 2);
box.object.material.transparent = true;
box.object.material.opacity = 0.5;

var popup = VR.video(['popup.mp4', 'popup.webm']);
popup.object.material.transparent = true;
popup.object.material.opacity = 0.8;
var popupStartPosition = new THREE.Vector3(4, 1.5, 3);
var popupEndPosition = new THREE.Vector3(0.8002066314220428, 1.5, 3.807045474805805);
popup.moveTo(4, 1.5, 3);
popup.rotateY(-1.3237312288136713);
popup.setScale(1, 0, 1);


VR.on('lookat', function (target) {
  if (target === box) {
    VR.animate(function (delta) {
      box.rotateY(delta * Math.PI);
      video.pause();
    });
    togglePopup(popup, true, popupEndPosition);
  }
});

VR.on('lookaway', function (target) {
  if (target === popup) {
    VR.end();
    togglePopup(popup, false, popupStartPosition);
    video.play();
  }
});

function togglePopup(vrObject, isActivating, newPosition) {
  deltaSum = 0;
  var startPosition = vrObject.position;
  VR.animate(function (delta) {
    deltaSum += delta;
    if(deltaSum > Math.PI/2) {
      deltaSum = Math.PI/2;
    }
    if(isActivating) {
      vrObject.setScale(1, Math.sin(deltaSum), 1);
    } else {
      vrObject.setScale(1, 1 - Math.sin(deltaSum), 1);
    }
    vrObject.moveTo(startPosition.x - (startPosition.x - newPosition.x) * Math.sin(deltaSum),
                    startPosition.y - (startPosition.y - newPosition.y) * Math.sin(deltaSum),
                    startPosition.z - (startPosition.z - newPosition.z) * Math.sin(deltaSum));
  });
}

//make video element a global variable so the next script can access it
window.video = video.element;

$(function() {
  $(document).keydown(function(e) {
    var movingElement = popup;
    if(e.keyCode === 87) {
      movingElement.moveZ(-0.3);
    }
    else if(e.keyCode === 83) {
      movingElement.moveZ(0.3);
    }
    else if(e.keyCode === 65) {
      movingElement.moveX(-0.3);
    }
    else if(e.keyCode === 68) {
      movingElement.moveX(0.3);
    }
    else if(e.keyCode === 81) {
      movingElement.rotateY(Math.PI/8);
    }
    else if(e.keyCode === 69) {
      movingElement.rotateY(-Math.PI/8);
    }
    console.log("position: (" + movingElement.position.x + ", " + movingElement.position.y + ", " + movingElement.position.z + "). rotation.y: " + movingElement.rotation.y);
  });
});
