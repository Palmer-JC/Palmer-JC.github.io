let fpsDisplay;
function makeLeftArmPanel(parentPanel) {
    // see main.js, where the update of this is performed

//    XR_UIPortal.PoseSequence.AlwaysChirp = true; // turn on at start

    const label = new XR_UIPortal.Label('FPS');
    label.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    label.setLetterMaterial(XR_UIPortal.System.BLACK);
    label.setFontSize(.4); // absolute
    label.verticalMargin = 0.01;
    parentPanel.addSubPanel(label);

    fpsDisplay = new XR_UIPortal.NixieDisplay('fpsDisplay', 2, false, 0);
    fpsDisplay.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    parentPanel.addSubPanel(fpsDisplay);

    const chirpToggle = new XR_UIPortal.Toggle('Seq. Chirp', scene);
    chirpToggle.btnLabel.setFontSize(.7, true); // relative to previous
    chirpToggle.setSelected(XR_UIPortal.PoseSequence.AlwaysChirp);
    chirpToggle.assignCallback(() => {
        XR_UIPortal.PoseSequence.AlwaysChirp = chirpToggle.isSelected();
     });
     parentPanel.addSubPanel(chirpToggle);
}
//==============================================================================
let skeletonViewerL;
let skeletonViewerR;
function makeRightArmPanel(parentPanel) {
    const showBonesToggle = new XR_UIPortal.Toggle('Bones', scene);
    showBonesToggle.assignCallback(() => {
        if (portal.leftHand && portal.rightHand) {
            if (!skeletonViewerL) {
                const h = portal.leftHand;
                skeletonViewerL = new BABYLON.Debug.SkeletonViewer(h.skeleton, h, scene);
                skeletonViewerL.displayMode = BABYLON.Debug.SkeletonViewer.DISPLAY_SPHERES;
                skeletonViewerL.update();
            }
            else {
                skeletonViewerL.isEnabled = showBonesToggle.isSelected();
            }

            if (!skeletonViewerR) {
                const h = portal.rightHand;
                skeletonViewerR = new BABYLON.Debug.SkeletonViewer(h.skeleton, h, scene);
                skeletonViewerR.displayMode = BABYLON.Debug.SkeletonViewer.DISPLAY_SPHERES;
                skeletonViewerR.update();
            }
            else {
                skeletonViewerR.isEnabled = showBonesToggle.isSelected();
            }
        }
     });
     parentPanel.addSubPanel(showBonesToggle);

    const logCallsBtn = new XR_UIPortal.Button('Draw Calls', scene);
    logCallsBtn.setHalfHeight(true);
    logCallsBtn.btnLabel.setFontSize(.7, true); // relative to previous
    logCallsBtn.assignCallback(() => {
        console.log(`Draw calls: ${sceneInstru.drawCallsCounter.current}`);
     });
     parentPanel.addSubPanel(logCallsBtn);
}