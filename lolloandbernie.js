var lolloAndBernie = function(THREE, doShowJoint) {
    doShowJoint = !!doShowJoint;
    var lolloAndBernieMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'lolloandbernie.png' ), transparent: true, opacity: 1.0 });
    var lolloAndBernieMesh = new THREE.Mesh(new THREE.PlaneGeometry(123, 167.5), lolloAndBernieMaterial);
    // Bernies hand.
    var bernieHandJoint = new THREE.Object3D();
    var jointTestMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    if (doShowJoint) var showJoint = new THREE.Mesh( new THREE.BoxGeometry( 1,1,5 ), jointTestMaterial );
    var bernieHandMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'bernieHand.png' ), transparent: true, opacity: 1.0 });
    var bernieHandMesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 23), bernieHandMaterial);
    bernieHandMesh.position.z = 1;
    bernieHandMesh.position.y = 8;
    if (doShowJoint) bernieHandJoint.add(showJoint);
    bernieHandJoint.add(bernieHandMesh);
    bernieHandJoint.position.y = 10;
    bernieHandJoint.position.x = 1;

    // Bernies lower arm.
    var bernieLowerArmJoint = new THREE.Object3D();
    if (doShowJoint) showJoint = new THREE.Mesh( new THREE.BoxGeometry( 1,1,5 ), jointTestMaterial );
    var bernieLowerArmMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'bernieLowerArm.png' ), transparent: true, opacity: 1.0 });
    var bernieLowerArmMesh = new THREE.Mesh(new THREE.PlaneGeometry(12.5, 26), bernieLowerArmMaterial);
    bernieLowerArmMesh.add(bernieHandJoint);
    bernieLowerArmMesh.position.z = 1;
    bernieLowerArmMesh.position.y = 10;
    if (doShowJoint) bernieLowerArmJoint.add(showJoint);
    bernieLowerArmJoint.add(bernieLowerArmMesh);
    bernieLowerArmJoint.position.x = 51;
    bernieLowerArmJoint.position.y = 4;
    
    // Lollos hand.
    var lolloHandJoint = new THREE.Object3D();
    if (doShowJoint) showJoint = new THREE.Mesh( new THREE.BoxGeometry( 1,1,5 ), jointTestMaterial );
    var lolloHandMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'lolloHand.png' ), transparent: true, opacity: 1.0 });
    var lolloHandMesh = new THREE.Mesh(new THREE.PlaneGeometry(24.5, 25.5), lolloHandMaterial);
    lolloHandMesh.position.z = 1;
    lolloHandMesh.position.x = 0;
    lolloHandMesh.position.y = 7;
    if (doShowJoint) lolloHandJoint.add(showJoint);
    lolloHandJoint.add(lolloHandMesh);
    lolloHandJoint.position.x = -6;
    lolloHandJoint.position.y = 12;

    // Lollos lower arm.
    var lolloLowerArmJoint = new THREE.Object3D();
    if (doShowJoint) showJoint = new THREE.Mesh( new THREE.BoxGeometry( 1,1,5 ), jointTestMaterial );
    var lolloLowerArmMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'lolloLowerArm.png' ), transparent: true, opacity: 1.0 });
    var lolloLowerArmMesh = new THREE.Mesh(new THREE.PlaneGeometry(25, 34), lolloLowerArmMaterial);
    lolloLowerArmMesh.add(lolloHandJoint);
    lolloLowerArmMesh.position.z = 1;
    lolloLowerArmMesh.position.x = -6;
    lolloLowerArmMesh.position.y = 12;
    if (doShowJoint) lolloLowerArmJoint.add(showJoint);
    lolloLowerArmJoint.add(lolloLowerArmMesh);
    lolloLowerArmJoint.position.x = -10;
    lolloLowerArmJoint.position.y = 2;

    // Lollos upper arm.
    var lolloShoulderJoint = new THREE.Object3D();
    if (doShowJoint) showJoint = new THREE.Mesh( new THREE.BoxGeometry( 1,1,5 ), jointTestMaterial );
    var lolloUpperArmMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'lolloUpperArm.png' ), transparent: true, opacity: 1.0 });
    var lolloUpperArmMesh = new THREE.Mesh(new THREE.PlaneGeometry(30, 19), lolloUpperArmMaterial);
    lolloUpperArmMesh.add(lolloLowerArmJoint);
    lolloUpperArmMesh.position.z = 1;
    lolloUpperArmMesh.position.x = -9;
    lolloUpperArmMesh.position.y = 0;
    if (doShowJoint) lolloShoulderJoint.add(showJoint);
    lolloShoulderJoint.add(lolloUpperArmMesh);
    lolloShoulderJoint.position.x = -35;
    lolloShoulderJoint.position.y = 12;

    // Setup initial lollo arm position.
    lolloShoulderJoint.rotation.z += 0.3;
    lolloHandJoint.rotation.z += 0.2;

    // Assemble lollo and bernie
    lolloAndBernieMesh.add(bernieLowerArmJoint);
    lolloAndBernieMesh.add(lolloShoulderJoint);
    lolloAndBernieMesh.position.y = 250;
    lolloAndBernieMesh.position.z = 250;
    //scene.add(lolloAndBernieMesh);

    var waveMotion = function(noSteps, maxAngle, rotation) {
        var stepSize = Math.PI*2/noSteps;
        var resetAngle = rotation.z;
        var currentStepValue = Math.PI;
        var doWaveMotion = function() {
            if (currentStepValue > Math.PI*3) {
                currentStepValue = Math.PI;
                rotation.z = resetAngle;
                return;
            }
            currentStepValue += stepSize;
            var rotationValue = (Math.cos(currentStepValue) + 1)/ 2;
            rotation.z = resetAngle - rotationValue*maxAngle;
        };
        return {
            doWaveMotion: doWaveMotion
        }
    };
    var bernieHandMotion = new waveMotion(50, 0.35, bernieHandJoint.rotation);
    var bernieArmMotion = new waveMotion(50, 0.15, bernieLowerArmJoint.rotation);
    var lolloHandMotion = new waveMotion(40, 0.1, lolloHandJoint.rotation);
    var lolloLowerArmMotion = new waveMotion(40, 0.15, lolloLowerArmJoint.rotation);
    var lolloUpperArmMotion = new waveMotion(80, 0.08, lolloShoulderJoint.rotation);

    var animate = function() {
        bernieHandMotion.doWaveMotion();
        bernieArmMotion.doWaveMotion();
        lolloHandMotion.doWaveMotion();
        lolloLowerArmMotion.doWaveMotion();
        lolloUpperArmMotion.doWaveMotion();
    };
    //renderFuncs.push(function() { lolloAndBernieMesh.lookAt(camera.position)})
    return {
        mesh: lolloAndBernieMesh,
        animate: animate
    };
};