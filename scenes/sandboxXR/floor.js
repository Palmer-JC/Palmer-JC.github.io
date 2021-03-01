let floor; // global scope, so a toggle button can hide it / show it
function loadFloor() {
    // ground & material
    const floorMat = new BABYLON.GridMaterial('PortalSys.floorMat', scene);
    floorMat.majorUnitFrequency = 1;
    floorMat.minorUnitVisibility = 0.1;
    floorMat.gridRatio = 1.25;
    floorMat.backFaceCulling = true;
    floorMat.mainColor = new BABYLON.Color3(.45, .45, .45);
    floorMat.lineColor = new BABYLON.Color3(.9, .9, .9);
    floorMat.opacity = 1;

    floor = new BigCircle.Mesh('floor', scene);
    floor.material = floorMat;

    const red = new BABYLON.StandardMaterial('PortalSys.origin', scene);
    red.diffuseColor = new BABYLON.Color3(1,0,0);
    red.emissiveColor = new BABYLON.Color3(1,0,0);
    red.specularColor = new BABYLON.Color3(.5,.5,.5);
    const originDot = makeCircle(0.1, red);
    originDot.position.y = 0.005; // make slightly proud of ground

};
//==============================================================================
function makeCircle(scaling, mat) {
	const mesh = new BABYLON.Mesh("circle", scene);
	mesh.setVerticesData(BABYLON.VertexBuffer.PositionKind, new Float32Array([
       -.1951,0,.9808,-.3827,0,.9239,0,0,0,-.5556,0,.8315,-.7071,0,.7071,-.8315,0,.5556,-.9239,0,.3827,-.9808,0,.1951,-1,0,0,-.9808,0,
       -.1951,-.9239,0,-.3827,-.8315,0,-.5556,-.7071,0,-.7071,-.5556,0,-.8315,-.3827,0,-.9239,-.1951,0,-.9808,0,0,-1,.1951,0,-.9808,.3827,
       0,-.9239,.5556,0,-.8315,.7071,0,-.7071,.8315,0,-.5556,.9239,0,-.3827,.9808,0,-.1951,1,0,0,.9808,0,.1951,.9239,0,.3827,.8315,0,.5556,
       .7071,0,.7071,.5556,0,.8315,.3827,0,.9239,.1951,0,.9808,0,0,1
    ]),
    false);

	mesh.setVerticesData(BABYLON.VertexBuffer.NormalKind, new Float32Array([
        0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,
        0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0
    ]),
    false);

	mesh.setIndices([
        0,1,2,1,3,2,3,4,2,4,5,2,5,6,2,6,7,2,7,8,2,8,9,2,9,10,2,10,11,2,11,12,2,12,13,2,13,14,2,14,15,2,15,16,2,16,17,2,17,18,2,18,19,2,19,20,
        2,20,21,2,21,22,2,22,23,2,23,24,2,24,25,2,25,26,2,26,27,2,27,28,2,28,29,2,29,30,2,30,31,2,31,32,2,32,0,2
    ]);

    // re-used from elsewhere; make meter scaled
    mesh.scaling.x = scaling;
    mesh.scaling.z = scaling;

	mesh.material = mat;
    return mesh;
}


