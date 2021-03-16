//==============================================================================
//                vars & functions for Experiments Tab
//==============================================================================
let camToggle;
let freezeToggle;

let rotMenu;
let rotIdx;
let rotScroller;

let posMenu;
let posIdx;
let posScroller;

function getExperiments() {
    const ret = new XR_UIPortal.Container('exp', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    ret.stretch(true, true);

    camToggle = new XR_UIPortal.Toggle('Camera Stablization', scene);
    camToggle.enableToggle(portal.isVRCapable || portal.isARCapable);

    // do before assigning callback
    camToggle.setSelected(QuakeC.XRSubCamera.Enabled);

    camToggle.assignCallback(() => {
    	QuakeC.XRSubCamera.Enabled = camToggle.isSelected();
        enableScrollers();
    });
     ret.addSubPanel(camToggle);

    freezeToggle = new XR_UIPortal.Toggle('Freeze (Dangerous)', scene);
    freezeToggle.assignCallback(() => {
    	QuakeC.XRSubCamera.Freeze = freezeToggle.isSelected();
    });
    ret.addSubPanel(freezeToggle);
    // - - - - - - - - - -
    // assign in opposite order of layout, so can select first one in code
    rotScroller = new XR_UIPortal.NixieNumberScroller('Rotation Tolerance:', 1, 0, 9, 1);
    rotScroller.onChangeCallBack((val) => {
        QuakeC.XRSubCamera.RotTolerance[rotIdx] = val;
    });

    // a nixie scroller is already a Container, can just another button to it
    const rotResetBtn = new XR_UIPortal.Button('Zero out', scene);
    rotResetBtn.setHalfHeight();
    rotResetBtn.assignCallback(() => {
        QuakeC.XRSubCamera.RotTolerance = [0, 0, 0, 0];
        assignRotScroller();
    });
    rotScroller.addSubPanel(rotResetBtn);

    rotMenu = new XR_UIPortal.Menu(null, ['X', 'Y', 'Z', 'W'], XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    rotMenu.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    rotMenu.assignCommonCallback(assignRotScroller);
    rotMenu.reportSelectedIdx(0);

    ret.addSubPanel(rotMenu);
    ret.addSubPanel(rotScroller);

    // - - - - - - - - - -
    // assign in opposite order of layout, so can select first one in code
    posScroller = new XR_UIPortal.NixieNumberScroller('Position Tolerance:', 1, 0, 9, 1);
    posScroller.onChangeCallBack((val) => {
        QuakeC.XRSubCamera.PosTolerance[posIdx] = val;
    });

    // a nixie scroller is already a Container, can just another button to it
    const posResetBtn = new XR_UIPortal.Button('Zero out', scene);
    posResetBtn.setHalfHeight();
    posResetBtn.assignCallback(() => {
        QuakeC.XRSubCamera.PosTolerance = [0, 0, 0, 0];
        assignPosScroller();
    });
    posScroller.addSubPanel(posResetBtn);

    posMenu = new XR_UIPortal.Menu(null, ['X', 'Y', 'Z'], XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    posMenu.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    posMenu.assignCommonCallback(assignPosScroller);
    posMenu.reportSelectedIdx(0);

    ret.addSubPanel(posMenu);
    ret.addSubPanel(posScroller);

    // - - - - - - - - - -
    enableScrollers();
    return ret;
}

function enableScrollers() {
    freezeToggle.enableToggle(camToggle.isSelected());
    rotScroller.enableEdit(camToggle.isSelected());
    posScroller.enableEdit(camToggle.isSelected());

}

function assignRotScroller() {
    rotIdx = rotMenu.selectedIndex;
    rotScroller.value = QuakeC.XRSubCamera.RotTolerance[rotIdx];
}
function assignPosScroller() {
    posIdx = posMenu.selectedIndex;
    posScroller.value = QuakeC.XRSubCamera.PosTolerance[posIdx];
}