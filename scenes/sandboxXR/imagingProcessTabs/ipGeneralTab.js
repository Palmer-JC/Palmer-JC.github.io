let exposureSlider;
let defaultExposure;

let contrastSlider;
let defaultContrast;

let toneMappingEnabledToggle;
let defaultToneMappingEnabled;

let defaultToneMappingType;
let toneMappingTypeMenu;

let defaultApplyByPostProcess;
let applyByPostProcessToggle;

function makeIPGeneralTab() {
    const ret = new XR_UIPortal.Container('ipGeneral', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    ret.stretch(true, true);

    const line1 = new XR_UIPortal.Container('line1IPG', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    line1.stretchHorizontal = true;

    defaultExposure = ipScene.exposure;
    exposureSlider = new XR_UIPortal.SliderPanel('Exposure', 0, 1, defaultExposure);
    exposureSlider.stretchHorizontal = true;
    exposureSlider.onChangeCallBack((value) => { ipScene.exposure = value; });
    line1.addSubPanel(exposureSlider);

    defaultContrast = ipScene.contrast;
    contrastSlider = new XR_UIPortal.SliderPanel('Contrast', 0, 1, defaultContrast);
    contrastSlider.stretchHorizontal = true;
    contrastSlider.onChangeCallBack((value) => { ipScene.contrast = value; });
    line1.addSubPanel(contrastSlider);
    ret.addSubPanel(line1);

    // - - - - - - - - - - - - - - -
    const line2 = new XR_UIPortal.Container('line2IPG', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    line2.stretchHorizontal = true;
    defaultToneMappingEnabled = ipScene.toneMappingEnabled;
    toneMappingEnabledToggle = new XR_UIPortal.Toggle('Tone Mapping', scene);
    toneMappingEnabledToggle.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    toneMappingEnabledToggle.setSelected(defaultToneMappingEnabled);
    toneMappingEnabledToggle.assignCallback(() => {
        const enabled = toneMappingEnabledToggle.isSelected();
        ipScene.toneMappingEnabled = enabled;
        toneMappingTypeMenu.setMenuEnabled(enabled);
    } );
    line2.addSubPanel(toneMappingEnabledToggle);

    defaultToneMappingType = ipScene.toneMappingType;
    toneMappingTypeMenu = new XR_UIPortal.Menu('Mapping Type', ['Standard', 'ACES'], XR_UIPortal.Panel.LAYOUT_HORIZONTAL, 2, true);
    toneMappingTypeMenu.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    toneMappingTypeMenu.reportSelectedIdx(defaultToneMappingType);
    toneMappingTypeMenu.setMenuEnabled(ipScene.toneMappingEnabled);
    toneMappingTypeMenu.assignCommonCallback( () => { ipScene.toneMappingType = toneMappingTypeMenu.selectedIndex; } );
    line2.addSubPanel(toneMappingTypeMenu);
    ret.addSubPanel(line2);

    // - - - - - - - - - - - - - - -
    const line3 = new XR_UIPortal.Container('line3IPG', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    line3.stretchHorizontal = true;

    defaultApplyByPostProcess = ipScene.applyByPostProcess;
    applyByPostProcessToggle = new XR_UIPortal.Toggle('Apply By Post Processing', scene);
    applyByPostProcessToggle.setSelected(defaultApplyByPostProcess);
    applyByPostProcessToggle.assignCallback(() => { ipScene.applyByPostProcess = applyByPostProcessToggle.isSelected(); } );
    line3.addSubPanel(applyByPostProcessToggle);
    ret.addSubPanel(line3);

    // - - - - - - - - - - - - - - -
    const line4 = new XR_UIPortal.Container('line3IPG', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    line4.stretchHorizontal = true;
    line4.stretchVertical = true;

    const restIPBtn = new XR_UIPortal.Button('Reset', scene);
    restIPBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    restIPBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    restIPBtn.setHalfHeight();
    restIPBtn.assignCallback(() => {
        resetIPGeneral();
    });
    line4.addSubPanel(restIPBtn);

    const reportIPBtn = new XR_UIPortal.Button('Report', scene);
    reportIPBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    reportIPBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_RIGHT);
    reportIPBtn.setHalfHeight();
    reportIPBtn.assignCallback(() => {
        // defined in imageProcessingTab.js
        reportIP();
    });
    line4.addSubPanel(reportIPBtn);
    ret.addSubPanel(line4);

    return ret;
}

function resetIPGeneral() {
    exposureSlider.value = ipScene.exposure = defaultExposure;
    contrastSlider.value = ipScene.contrast = defaultContrast;
    toneMappingEnabledToggle.setSelected(ipScene.toneMappingEnabled = defaultToneMappingEnabled);
    toneMappingTypeMenu.reportSelectedIdx(ipScene.toneMappingType = defaultToneMappingType);
    applyByPostProcessToggle.setSelected(ipScene.applyByPostProcess = defaultApplyByPostProcess);
}

function reportIPGeneral(varName) {
    let ret = '';
    if (defaultExposure !== ipScene.exposure) {
        ret += `${varName}.exposure = ${ipScene.exposure.toFixed(4)};\n`;
    }
    if (defaultContrast !== ipScene.contrast) {
        ret += `${varName}.contrast = ${ipScene.contrast.toFixed(4)};\n`;
    }
    if (defaultToneMappingEnabled !== ipScene.toneMappingEnabled) {
        ret += `${varName}.toneMappingEnabled = ${ipScene.toneMappingEnabled};\n`;
    }
    if (defaultToneMappingType !== ipScene.toneMappingType) {
        ret += `${varName}.toneMappingType = BABYLON.ImageProcessingConfiguration.${(ipScene.toneMappingType === 0) ? 'TONEMAPPING_STANDARD': 'TONEMAPPING_ACES'};\n`;
    }
    if (defaultApplyByPostProcess !== ipScene.applyByPostProcess) {
        ret += `${varName}.applyByPostProcess = ${ipScene.applyByPostProcess};\n`;
    }
    return ret;
}