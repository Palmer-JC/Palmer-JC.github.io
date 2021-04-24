let resetNormalsBtn;

let useObjectSpaceNormalMapToggle;
let forceNormalForwardToggle;
let invertNormalMapXToggle;
let invertNormalMapYToggle;

function makeNormalsTab() {
    const ret = new XR_UIPortal.Container('normalsTab', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    ret.stretch(true, false);

    // - - - - - - - - - - - - - - -
    useObjectSpaceNormalMapToggle = new XR_UIPortal.Toggle('Object Space Normals', scene);
    useObjectSpaceNormalMapToggle.stretchHorizontal = true;
    ret.addSubPanel(useObjectSpaceNormalMapToggle);
    useObjectSpaceNormalMapToggle.assignCallback(() => { currMaterial.useObjectSpaceNormalMap = useObjectSpaceNormalMapToggle.isSelected(); } );

    forceNormalForwardToggle = new XR_UIPortal.Toggle('Normals Forward', scene);
    forceNormalForwardToggle.stretchHorizontal = true;
    ret.addSubPanel(forceNormalForwardToggle);
    forceNormalForwardToggle.assignCallback(() => { currMaterial.forceNormalForward = forceNormalForwardToggle.isSelected(); } );

    invertNormalMapXToggle = new XR_UIPortal.Toggle('Invert Normals X', scene);
    invertNormalMapXToggle.stretchHorizontal = true;
    ret.addSubPanel(invertNormalMapXToggle);
    invertNormalMapXToggle.assignCallback(() => { currMaterial.invertNormalMapX = invertNormalMapXToggle.isSelected(); } );

    invertNormalMapYToggle = new XR_UIPortal.Toggle('Invert Normals Y', scene);
    invertNormalMapYToggle.stretchHorizontal = true;
    ret.addSubPanel(invertNormalMapYToggle);
    invertNormalMapYToggle.assignCallback(() => { currMaterial.invertNormalMapY = invertNormalMapYToggle.isSelected(); } );

    // - - - - - - - - - - - - - - -
    resetNormalsBtn = new XR_UIPortal.Button('Reset', scene);
    resetNormalsBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    resetNormalsBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    resetNormalsBtn.setHalfHeight();
    resetNormalsBtn.assignCallback(() => {
        // defined in materialsTab.js
        resetCurrNormals();
    });
    ret.addSubPanel(resetNormalsBtn);

    return ret;
}

function setNormals() {
    useObjectSpaceNormalMapToggle.setSelected(currMaterial.useObjectSpaceNormalMap);
    forceNormalForwardToggle.setSelected(currMaterial.forceNormalForward);
    invertNormalMapXToggle.setSelected(currMaterial.invertNormalMapX);
    invertNormalMapYToggle.setSelected(currMaterial.invertNormalMapY);
}

function enableNormals(enabled) {
    resetNormalsBtn.enableButton(enabled);

    useObjectSpaceNormalMapToggle.enableToggle(enabled);
    forceNormalForwardToggle.enableToggle(enabled);
    invertNormalMapXToggle.enableToggle(enabled);
    invertNormalMapYToggle.enableToggle(enabled);
}
