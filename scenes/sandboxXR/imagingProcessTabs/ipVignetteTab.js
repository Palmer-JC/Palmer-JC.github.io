let vignetteEnabledToggle;
let defaultVignetteEnabled;

let vignetteBlendModeMenu;
let defaultVignetteBlendMode;

let defaultVignetteColor;
let vignetteRedDial;
let vignetteGreenDial;
let vignetteBlueDial;
let vignetteAlphaDial;

let vignetteStretchSlider;
let defaultVignetteStretch;

let vignetteWeightSlider;
let defautlVignetteWeight;

let vignetteCentreXSlider;
let defaultVignetteCentreX;

let vignetteCentreYSlider;
let defaultVignetteCentreY;

let vignetteCameraFovSlider;
let defaultVignetteCameraFov;

function makeVignetteTab() {
    const ret = new XR_UIPortal.Container('ipVignette', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    ret.stretch(true, true);

    const col1 = new XR_UIPortal.Container('col1IPV', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    col1.stretchVertical = true;
    defaultVignetteEnabled = ipScene.vignetteEnabled;
    vignetteEnabledToggle = new XR_UIPortal.Toggle('Enabled', scene);
    vignetteEnabledToggle.setSelected(defaultVignetteEnabled);
    vignetteEnabledToggle.assignCallback(() => {
        ipScene.vignetteEnabled = vignetteEnabledToggle.isSelected();
        enableVignettes();
    } );
    col1.addSubPanel(vignetteEnabledToggle);

    defaultVignetteBlendMode = ipScene.vignetteBlendMode;
    vignetteBlendModeMenu = new XR_UIPortal.Menu('Blend Mode', ['Mulitply', 'Opaque'], XR_UIPortal.Panel.LAYOUT_VERTICAL, 2, true);
    vignetteBlendModeMenu.reportSelectedIdx(defaultVignetteBlendMode);
    vignetteBlendModeMenu.assignCommonCallback( () => { ipScene.vignetteBlendMode = vignetteBlendModeMenu.selectedIndex; } );
    col1.addSubPanel(vignetteBlendModeMenu);

    const restIPBtn = new XR_UIPortal.Button('Reset', scene);
    restIPBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    restIPBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    restIPBtn.setHalfHeight();
    restIPBtn.assignCallback(() => {
        resetIPVignette();
    });
    col1.addSubPanel(restIPBtn);
    ret.addSubPanel(col1);

    // - - - - - - - - - - - - - - -
    const col2 = new XR_UIPortal.Container('col21IPV', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    col2.stretch(true, true);

    const line1 = new XR_UIPortal.Container('line1IPV', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    line1.stretchHorizontal = true;

    const red   = XR_UIPortal.System.makeRed  ();
    const green = XR_UIPortal.System.makeGreen();
    const blue  = XR_UIPortal.System.makeBlue ();

    defaultVignetteColor = ipScene.vignetteColor;
    vignetteRedDial = new XR_UIPortal.Dial('vignetteRed', scene);
    vignetteRedDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    vignetteRedDial.selectorEnabledMaterial = red;
    vignetteRedDial.stretch(false, true);
    vignetteRedDial.onChangeCallBack((value) => { ipScene.vignetteColor.r = value; } );
    line1.addSubPanel(vignetteRedDial);

    vignetteGreenDial = new XR_UIPortal.Dial('vignetteGreen', scene);
    vignetteGreenDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    vignetteGreenDial.selectorEnabledMaterial = green;
    vignetteGreenDial.stretch(false, true);
    vignetteGreenDial.onChangeCallBack((value) => { ipScene.vignetteColor.g = value; } );
    line1.addSubPanel(vignetteGreenDial);

    vignetteBlueDial = new XR_UIPortal.Dial('vignetteBlue', scene);
    vignetteBlueDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    vignetteBlueDial.selectorEnabledMaterial = blue;
    vignetteBlueDial.stretch(false, true);
    vignetteBlueDial.onChangeCallBack((value) => { ipScene.vignetteColor.b = value; } );
    line1.addSubPanel(vignetteBlueDial);

    vignetteAlphaDial = new XR_UIPortal.Dial('vignetteAlpha', scene);
    vignetteAlphaDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    vignetteAlphaDial.selectorEnabledMaterial = XR_UIPortal.System.BLACK;
    vignetteAlphaDial.stretch(false, true);
    vignetteAlphaDial.onChangeCallBack((value) => { ipScene.vignetteColor.a = value; } );
    line1.addSubPanel(vignetteAlphaDial);
    col2.addSubPanel(line1);

    // - - - - - - - - - - - - - - -
    const line2 = new XR_UIPortal.Container('line12PV', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    line2.stretchHorizontal = true;

    defaultVignetteStretch = ipScene.vignetteStretch;
    vignetteStretchSlider = new XR_UIPortal.SliderPanel('Strength', 0, 1, defaultVignetteStretch);
    vignetteStretchSlider.stretchHorizontal = true;
    vignetteStretchSlider.title.setFontSize(.55, true);
    vignetteStretchSlider.onChangeCallBack((value) => { ipScene.vignetteStretch = value; });
    line2.addSubPanel(vignetteStretchSlider);

    defaultVignetteWeight = ipScene.vignetteWeight;
    vignetteWeightSlider = new XR_UIPortal.SliderPanel('Weight', 1, 2.5, defaultVignetteWeight);
    vignetteWeightSlider.stretchHorizontal = true;
    vignetteWeightSlider.title.setFontSize(.55, true);
    vignetteWeightSlider.onChangeCallBack((value) => { ipScene.vignetteWeight = value; });
    line2.addSubPanel(vignetteWeightSlider);
    col2.addSubPanel(line2);

    // - - - - - - - - - - - - - - -
    const line3 = new XR_UIPortal.Container('line123PV', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    line3.stretchHorizontal = true;

    defaultVignetteCentreX = ipScene.vignetteCentreX;
    vignetteCentreXSlider = new XR_UIPortal.SliderPanel('Centre X', -1, 1, defaultVignetteCentreX);
    vignetteCentreXSlider.title.setFontSize(.55, true);
    vignetteCentreXSlider.stretchHorizontal = true;
    vignetteCentreXSlider.onChangeCallBack((value) => { ipScene.vignetteCentreX = value; });
    line3.addSubPanel(vignetteCentreXSlider);

    defaultVignetteCentreY = ipScene.vignetteCentreY;
    vignetteCentreYSlider = new XR_UIPortal.SliderPanel('Centre Y', -1, 1, defaultVignetteCentreY);
    vignetteCentreYSlider.title.setFontSize(.55, true);
    vignetteCentreYSlider.stretchHorizontal = true;
    vignetteCentreYSlider.onChangeCallBack((value) => { ipScene.vignetteCentreY = value; });
    line3.addSubPanel(vignetteCentreYSlider);
    col2.addSubPanel(line3);

    // - - - - - - - - - - - - - - -
    defaultVignetteCameraFov = ipScene.vignetteCameraFov;
    vignetteCameraFovSlider = new XR_UIPortal.SliderPanel('FOV', 0, 3, defaultVignetteCameraFov);
    vignetteCameraFovSlider.title.setFontSize(.55, true);
    vignetteCameraFovSlider.stretchHorizontal = true;
    vignetteCameraFovSlider.onChangeCallBack((value) => { ipScene.vignetteCameraFov = value; });
    col2.addSubPanel(vignetteCameraFovSlider);

    ret.addSubPanel(col2);

    resetIPVignette();
    enableVignettes();
    return ret;
}

function resetIPVignette() {
    vignetteEnabledToggle.setSelected(ipScene.vignetteEnabled = defaultVignetteEnabled);
    vignetteBlendModeMenu.reportSelectedIdx(ipScene.vignetteBlendMode = defaultVignetteBlendMode);
    vignetteRedDial  .value = ipScene.vignetteColor.r = defaultVignetteColor.r;
    vignetteGreenDial.value = ipScene.vignetteColor.g = defaultVignetteColor.g;
    vignetteBlueDial .value = ipScene.vignetteColor.b = defaultVignetteColor.b;
    vignetteAlphaDial.value = ipScene.vignetteColor.a = defaultVignetteColor.a;

    vignetteStretchSlider  .value = ipScene.vignetteStretch   = defaultVignetteStretch;
    vignetteWeightSlider   .value = ipScene.vignetteWeight    = defaultVignetteWeight;
    vignetteCentreXSlider  .value = ipScene.vignetteCentreX   = defaultVignetteCentreX;
    vignetteCentreYSlider  .value = ipScene.vignetteCentreY   = defaultVignetteCentreY;
    vignetteCameraFovSlider.value = ipScene.vignetteCameraFov = defaultVignetteCameraFov;
}

function reportIPVignette(varName) {
    let ret = '';
    if (!ipScene.vignetteEnabled) return ret;
    ret += `${varName}.vignetteEnabled = true;\n`;

    if (defaultVignetteBlendMode !== ipScene.vignetteBlendMode) {
        ret += `${varName}.vignetteBlendMode = BABYLON.ImageProcessingConfiguration.${(ipScene.vignetteBlendMode === 0) ? 'VIGNETTEMODE_MULTIPLY': 'VIGNETTEMODE_OPAQUE'};\n`;
    }

    if (!defaultVignetteColor.equals(ipScene.vignetteColor.r)) {
        ret += `${varName}.vignetteColor = new BABYLON.Color4(${ipScene.vignetteColor.r.toFixed(4)}, ${ipScene.vignetteColor.g.toFixed(4)}, ${ipScene.vignetteColor.b.toFixed(4)}, ${ipScene.vignetteColor.a.toFixed(4)});\n`;
    }

    if (defaultVignetteStretch !== ipScene.vignetteStretch) {
        ret += `${varName}.vignetteStretch = ${ipScene.vignetteStretch.toFixed(4)};\n`;
    }

    if (defaultVignetteWeight !== ipScene.vignetteWeight) {
        ret += `${varName}.vignetteWeight = ${ipScene.vignetteWeight.toFixed(4)};\n`;
    }

    if (defaultVignetteCentreX !== ipScene.vignetteCentreX) {
        ret += `${varName}.vignetteCentreX = ${ipScene.vignetteCentreX.toFixed(4)};\n`;
    }

    if (defaultVignetteCentreY !== ipScene.vignetteCentreY) {
        ret += `${varName}.vignetteCentreY = ${ipScene.vignetteCentreY.toFixed(4)};\n`;
    }

    if (defaultVignetteCameraFov !== ipScene.vignetteCameraFov) {
        ret += `${varName}.vignetteCameraFov = ${ipScene.vignetteCameraFov.toFixed(4)};\n`;
    }
    return ret;
}

function enableVignettes() {
    const enabled = ipScene.vignetteEnabled;
    vignetteBlendModeMenu.setMenuEnabled(enabled);
    vignetteRedDial  .enableDial(enabled);
    vignetteGreenDial.enableDial(enabled);
    vignetteBlueDial .enableDial(enabled);
    vignetteAlphaDial.enableDial(enabled);

    vignetteStretchSlider.enableSlider(enabled);
    vignetteWeightSlider.enableSlider(enabled);
    vignetteCentreXSlider.enableSlider(enabled);
    vignetteCentreYSlider.enableSlider(enabled);
    vignetteCameraFovSlider.enableSlider(enabled);
}