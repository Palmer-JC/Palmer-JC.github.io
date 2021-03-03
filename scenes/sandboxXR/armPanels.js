let fpsDisplay;
function makeLeftArmPanel(parentPanel) {
    // see main.js, where the update of this is performed
    fpsDisplay = new XR_UIPortal.NixieDisplay('fpsDisplay', 2, false, 0);
    fpsDisplay.horizontalAlignment = XR_UIPortal.Panel.ALIGN_RIGHT;
    fpsDisplay.stretchHorizontal =true;
    parentPanel.addSubPanel(fpsDisplay);
}
//==============================================================================
let skeletonViewerL;
let skeletonViewerR;
function makeRightArmPanel(parentPanel) {     
    const showBonesToggle = new XR_UIPortal.Toggle('Bones', scene);
    showBonesToggle.stretchHorizontal = true;
    showBonesToggle.assignCallback(() => {
        if (portal.leftHand && portal.rightHand) {
            if (!skeletonViewerL) {
                const h = portal.leftHand;
                skeletonViewerL = new BABYLON.Debug.SkeletonViewer(h.skeleton, h, scene);
                skeletonViewerL.displayMode = BABYLON.Debug.SkeletonViewer.DISPLAY_SPHERES;
                skeletonViewerL.update();
            }
            else skeletonViewerL.isEnabled = showBonesToggle.isSelected();

            if (!skeletonViewerR) {
                const h = portal.rightHand;
                skeletonViewerR = new BABYLON.Debug.SkeletonViewer(h.skeleton, h, scene);
                skeletonViewerR.displayMode = BABYLON.Debug.SkeletonViewer.DISPLAY_SPHERES;
                skeletonViewerR.update();
            }
            else skeletonViewerR.isEnabled = showBonesToggle.isSelected();
        }
     });
     parentPanel.addSubPanel(showBonesToggle);
     
}