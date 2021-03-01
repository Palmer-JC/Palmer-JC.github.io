//==============================================================================
//                vars & functions for File Loading
//==============================================================================
let loadedmeshes, loadedParticleSystems, loadedSkeletons;
let parentlessMeshes;

function loadAssetFile() {
    cleanout();
    BABYLON.SceneLoader.ImportMesh('', 'file:', assetFileList.files[0], scene, (meshes, particleSystems, skeletons) =>{
        captureInfo(meshes, particleSystems, skeletons);
        updateFileDetails(assetFileList.files[0].name);
    });
}

function cleanout() {
    // clean out from any previous load
    if (loadedmeshes) {
        for (const mesh of loadedmeshes) {
            mesh.dispose(true, true);
        }
    }
    if (loadedParticleSystems) {
        for (const sys of loadedParticleSystems) {
            sys.dispose();
        }
    }
    if (loadedSkeletons) {
        for (const skeleton of loadedSkeletons) {
            skeleton.dispose();
        }
    }
}

function captureInfo(meshes, particleSystems, skeletons) {
    loadedmeshes = meshes;
    loadedParticleSystems = particleSystems;
    loadedSkeletons = skeletons;

    parentlessMeshes = [];
    for (const mesh of loadedmeshes) {
        if (!mesh.parent) {
            parentlessMeshes.push(mesh);
            // ensure can rotate when exported as a quaternion
            if (mesh.rotationQuaternion) {
               mesh.rotationQuaternion = null;
               mesh.rotation = BABYLON.Vector3.Zero();
            }
        }
    }
    // needs to be before updateFileDetails, since stats used
    getMaterialsTab();  // found in materialsTab.js
}

function loadEnvFile() {
    const file = envFileList.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        loadCustom(reader.result, file.name); // found in file environmentTab.js
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}
//==============================================================================
//                vars & functions for Left Panel
//==============================================================================
let fileDetailsPanel;
let reportBtn;
let modelLabelPanel;

let modelName;
let rotationSlider;
let upDownSlider;

function makeLeftPanel(parentPanel) {
    const topLine = new XR_UIPortal.Container('leftFrameTitle');
    topLine.stretchHorizontal = true;

    const loadBtn = new XR_UIPortal.Button('Sample', scene);
    loadBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    loadBtn.assignCallback(() => {
        cleanout();
        BABYLON.SceneLoader.ImportMesh('', './sample/', 'sampleMH.json', scene, (meshes, particleSystems, skeletons) =>{
            captureInfo(meshes, particleSystems, skeletons);
            updateFileDetails('Sample MakeHuman');
        });
    });
    topLine.addSubPanel(loadBtn);

    const green = XR_UIPortal.System.makeGreen();
    modelLabelPanel = new XR_UIPortal.Label('Model Info').setLetterMaterial(green);
    modelLabelPanel.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    topLine.addSubPanel(modelLabelPanel);

    reportBtn = new XR_UIPortal.Button('Report', scene);
    reportBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_RIGHT);
    reportBtn.assignCallback(() => {
        if (originals) {
            let report = '';
            for (const o of originals) {
                report += o.reportChanges();
                report += '\n\n';
            }
            if (report) {
                const blob = new Blob ( [ report ], { type : 'text/strings;' } );
                const objectUrl = window.URL.createObjectURL(blob);

                const link = window.document.createElement('a');
                link.href = objectUrl;
                link.download = `${modelName} changes.txt`;
                const click = document.createEvent('MouseEvents');
                click.initEvent('click', true, false);
                link.dispatchEvent(click);
            }
        }
    });
    reportBtn.enableButton(false);
    topLine.addSubPanel(reportBtn);
    parentPanel.addSubPanel(topLine);

    fileDetailsPanel = new XR_UIPortal.BorderPanel('filePane', scene);
    fileDetailsPanel.stretch(true, true);
    parentPanel.addSubPanel(fileDetailsPanel);
}

function updateFileDetails(fileName) {
    modelName = fileName.substring(0, fileName.indexOf('.'));
    modelLabelPanel.updateText(fileName);
    reportBtn.enableButton(true);

    fileDetailsPanel.removeAll();

    const tableContainer  = new XR_UIPortal.Container('table', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
 //   tablePanel.stretch(false, true); // stretch horizontally, but not vertically
    const headerContainer = new XR_UIPortal.Container('tblHeader' , XR_UIPortal.Panel.LAYOUT_VERTICAL);
    const valsContainer   = new XR_UIPortal.Container('tblVals'   , XR_UIPortal.Panel.LAYOUT_VERTICAL);

    const colColor = XR_UIPortal.System.makeGreen();
    headerContainer.addSubPanel(new XR_UIPortal.Label(' - # of Meshes'        ) ).setLetterMaterial(colColor);
    headerContainer.addSubPanel(new XR_UIPortal.Label(' - # of Materials'     ) ).setLetterMaterial(colColor);
    headerContainer.addSubPanel(new XR_UIPortal.Label(' - Total Triangles (k)') ).setLetterMaterial(colColor);
    headerContainer.addSubPanel(new XR_UIPortal.Label(' - Total Vertices (k)' ) ).setLetterMaterial(colColor);

    const valColor = XR_UIPortal.System.BLACK; // always made
    valsContainer.addSubPanel(new XR_UIPortal.Label(loadedmeshes.length.toFixed()) ).horizontalAlign(XR_UIPortal.Panel.ALIGN_RIGHT).setLetterMaterial(valColor);
    valsContainer.addSubPanel(new XR_UIPortal.Label(materials.length.toFixed())    ).horizontalAlign(XR_UIPortal.Panel.ALIGN_RIGHT).setLetterMaterial(valColor);
    valsContainer.addSubPanel(new XR_UIPortal.Label(getTKTris().toFixed(2))        ).horizontalAlign(XR_UIPortal.Panel.ALIGN_RIGHT).setLetterMaterial(valColor);
    valsContainer.addSubPanel(new XR_UIPortal.Label(getTKVerts().toFixed(2))       ).horizontalAlign(XR_UIPortal.Panel.ALIGN_RIGHT).setLetterMaterial(valColor);

    upDownSlider = new XR_UIPortal.SliderPanel('Up/Down', -1.5, 1.5, 0, XR_UIPortal.Panel.LAYOUT_VERTICAL);
    upDownSlider.onChangeCallBack(heightCallback);

    tableContainer.addSubPanel(headerContainer);
    tableContainer.addSubPanel(valsContainer);
    tableContainer.addSubPanel(upDownSlider);
    fileDetailsPanel.addSubPanel(tableContainer);

    rotationSlider = new XR_UIPortal.SliderPanel('Rotate', -Math.PI, Math.PI, 0);
    rotationSlider.stretchHorizontal = true;
    rotationSlider.onChangeCallBack(rotateCallback);
    fileDetailsPanel.addSubPanel(rotationSlider);
}

function heightCallback(value) {
    for (const mesh of parentlessMeshes) {
        mesh.position.y = value;
    }
}
function rotateCallback(value) {
    for (const mesh of parentlessMeshes) {
        mesh.rotation.y = value;
    }
}

function getTKTris() {
    let ret = 0;
    for (const mesh of loadedmeshes) {
        ret += mesh.getIndices().length / 3;
    }
    return ret / 1000;
}

function getTKVerts() {
    let ret = 0;
    for (const mesh of loadedmeshes) {
        ret += mesh.getTotalVertices();
    }
    return ret / 1000;
}