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

var popup = VR.video(['popup.mp4', 'popup.webm'])
popup.object.material.transparent = true;
popup.object.material.opacity = 0.8;
popup.moveTo(4, 1.5, 3).rotateY(-1.3237312288136713);
popup.setScale(1, 0, 1);

var deltaSum = 0;

VR.on('lookat', function (target) {
  if (target === box) {
    VR.animate(function (delta) {
      box.rotateY(delta * Math.PI);
      video.pause();
    });
    activatePopup(popup);
  }
});

function activatePopup(vrObject) {
  var startPosition = vrObject.position;
  var endPosition = new THREE.Vector3(0.8002066314220428, 1.5, 3.807045474805805);
  VR.animate(function (delta) {
    deltaSum += delta;
    if(deltaSum > Math.PI/2) {
      deltaSum = Math.PI/2;
    }
    vrObject.setScale(1, Math.sin(deltaSum), 1);
    vrObject.moveTo(startPosition.x - (startPosition.x - endPosition.x) * Math.sin(deltaSum),
                    startPosition.y - (startPosition.y - endPosition.y) * Math.sin(deltaSum),
                    startPosition.z - (startPosition.z - endPosition.z) * Math.sin(deltaSum));
  });
}

// START -> x: 4, y: 1.5, z: 3
// END -> x: 1.0910969376564026, y: 1.5, z: 3.7336777043689144

// VR.on('lookaway', function (target) {
//   if (target === box) {
//     VR.end();
//     video.play();
//   }
// });

// var deltaSum = 0;
// VR.animate(function (delta) {
//   deltaSum += delta;
//   bunny.object.material.opacity = Math.sin(deltaSum);
//   bunny.setScale(1, Math.sin(deltaSum) * 3, 1);
// });

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
