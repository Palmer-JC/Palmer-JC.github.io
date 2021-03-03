//==============================================================================
//                vars & functions for Experiments Tab
//==============================================================================
let camToggle;
let freezeToggle;
let rotScroller;
let posScroller;
function getExperiments() {
    const ret = new XR_UIPortal.Container('exp', XR_UIPortal.Panel.LAYOUT_VERTICAL);

    camToggle = new XR_UIPortal.Toggle('Camera Stablization', scene);
    camToggle.enableToggle(portal.isVRCapable || portal.isARCapable);

    camToggle.assignCallback(() => {
    	QuakeC.XRSubCamera.Enabled = camToggle.isSelected();
        enableScrollers()
    });
    ret.addSubPanel(camToggle);

    freezeToggle = new XR_UIPortal.Toggle('Freeze (Dangerous)', scene);
    freezeToggle.assignCallback(() => {
    	QuakeC.XRSubCamera.Freeze = freezeToggle.isSelected();
    });
    ret.addSubPanel(freezeToggle);

    rotScroller = new XR_UIPortal.NixieNumberScroller('Rotation Tolerance:', 1, 0, 9, 1);
    ret.addSubPanel(rotScroller);
    rotScroller.onChangeCallBack((val) => {
        QuakeC.XRSubCamera.RotTolerance = val / 1000;
    });

    posScroller = new XR_UIPortal.NixieNumberScroller('Position Tolerance:', 1, 1, 7, 1);
    ret.addSubPanel(posScroller);
    posScroller.onChangeCallBack((val) => {
        QuakeC.XRSubCamera.PosTolerance = val / 1000;
    });

    enableScrollers();
    return ret;
}
function enableScrollers() {
    freezeToggle.enableToggle(camToggle.isSelected());
    rotScroller.enableEdit(camToggle.isSelected());
    posScroller.enableEdit(camToggle.isSelected());
}