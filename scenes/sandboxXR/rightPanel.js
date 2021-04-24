let resetMatBtn;

function makeRightPanel(parentPanel) {
    const topLine = new XR_UIPortal.Container('rightFrameTitle');
    topLine.stretchHorizontal = true;

    resetMatBtn = new XR_UIPortal.Button('Reset All', scene);
    resetMatBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    resetMatBtn.assignCallback(() => {
        // defined in materialsTab.js
        resetCurrMaterial();
    });
    resetMatBtn.enableButton(false);
    topLine.addSubPanel(resetMatBtn);

    const green = XR_UIPortal.System.makeGreen();
    const title = new XR_UIPortal.Label('Material Properties').setLetterMaterial(green);
    title.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    topLine.addSubPanel(title);

    parentPanel.addSubPanel(topLine);
    // - - - - - - - - - - - - - - -
    const propsTab = new XR_UIPortal.TabStrip('matPropsTab', ['General', 'Color', 'Normals', 'Roughness', 'Parallax', 'Alpha'], parentPanel, XR_UIPortal.Panel.LAYOUT_VERTICAL, true);
    propsTab.assignTab('General', makeGeneralTab(), true);
    propsTab.assignTab('Color', makeColorTab());
    propsTab.assignTab('Normals', makeNormalsTab());
    propsTab.assignTab('Roughness', makeRoughnessTab());
    propsTab.assignTab('Parallax', makeParallaxTab());
    propsTab.assignTab('Alpha',makeMatToggles());
    enablePropertyControls(false);
}

function setPropertyControls() {
    enablePropertyControls(true);

    setGeneral();
    setColor();
    setNormals();
    setRoughness();
    setParallax();
    setAlpha();
}

function enablePropertyControls(enabled) {
    resetMatBtn.enableButton(enabled);

    enableGeneral(enabled);
    enableColor(enabled);
    enableNormals(enabled);
    enableRoughness(enabled);
    enableParallax(enabled);
    enableAlpha(enabled);
}