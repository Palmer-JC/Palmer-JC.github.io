let colorCurvesEnabledToggle;
let defaultcolorCurvesEnabled;

let globalHueSlider        , highlightsHueSlider        , midtonesHueSlider        , shadowsHueSlider;
let defaultGlobalHue       , defaultHighlightsHue       , defaultMidtonesHue       , defaultShadowsHue;

let globalDensitySlider    , highlightsDensitySlider    , midtonesDensitySlider    , shadowsDensitySlider;
let defaultGlobalDensity   , defaultHighlightsDensity   , defaultMidtonesDensity   , defaultShadowsDensity;

let globalSaturationSlider , highlightsSaturationSlider , midtonesSaturationSlider , shadowsSaturationSlider;
let defaultGlobalSaturation, defaultHighlightsSaturation, defaultMidtonesSaturation, defaultShadowsSaturation;

let globalExposureSlider   , highlightsExposureSlider   , midtonesExposureSlider   , shadowsExposureSlider;
let defaultGlobalExposure  , defaultHighlightsExposure  , defaultMidtonesExposure  , defaultShadowsExposure;

let cc;

function makeColorCurvesTab() {
    cc = ipScene.colorCurves;

    const ret = new XR_UIPortal.Container('ipColor', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    ret.stretch(true, true);

    const rowTitles = new XR_UIPortal.Container('rowTitlesCC', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    defaultcolorCurvesEnabled = ipScene.colorCurvesEnabled;
    colorCurvesEnabledToggle = new XR_UIPortal.Toggle('Enabled', scene);
    colorCurvesEnabledToggle.setSelected(defaultcolorCurvesEnabled);
    colorCurvesEnabledToggle.assignCallback(() => {
        ipScene.colorCurvesEnabled = colorCurvesEnabledToggle.isSelected();
        enableColorCurves();
    } );
    rowTitles.addSubPanel(colorCurvesEnabledToggle);
    rowTitles.addSubPanel(new XR_UIPortal.Spacer(.005, 0));
    rowTitles.addSubPanel(new XR_UIPortal.Label('Global').setFontSize(.55, true));
    rowTitles.addSubPanel(new XR_UIPortal.Label('Highlights').setFontSize(.55, true));
    rowTitles.addSubPanel(new XR_UIPortal.Label('Midtones').setFontSize(.55, true));
    rowTitles.addSubPanel(new XR_UIPortal.Label('Shadows').setFontSize(.55, true));

    const restIPBtn = new XR_UIPortal.Button('Reset', scene);
    restIPBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    restIPBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    restIPBtn.setHalfHeight();
    restIPBtn.assignCallback(() => {
        resetIPColorCurves();
    });
    rowTitles.addSubPanel(restIPBtn);
    ret.addSubPanel(rowTitles);

    const vertMarginAmt = .027;
    const horzMarginAmt = .000;
    // - - - - - - - - - - - - - - -
    getHueColumn       (ret, vertMarginAmt, horzMarginAmt);
    getDensityColumn   (ret, vertMarginAmt, horzMarginAmt);
    getSaturationColumn(ret, vertMarginAmt, horzMarginAmt);
    getExposureColumn  (ret, vertMarginAmt, horzMarginAmt);

    ret.subsEqualShare[0] = true;

    enableColorCurves();
    return ret;
}

function getHueColumn(parent, vertMarginAmt, horzMarginAmt) {
    const hueCol = new XR_UIPortal.Container('hueColCC', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    hueCol.addSubPanel(new XR_UIPortal.Label('Hue').setFontSize(.55, true).horizontalAlign(XR_UIPortal.Panel._ALIGN_HCENTER));
    hueCol.stretch(true, true);

    hueCol.addSubPanel(new XR_UIPortal.Spacer(.005, 0));

    defaultGlobalHue = cc.globalHue;
    globalHueSlider = new XR_UIPortal.SliderPanel(null, 0, 360, defaultGlobalHue);
    globalHueSlider.stretchHorizontal = true;
    globalHueSlider.margin(vertMarginAmt, horzMarginAmt);
    globalHueSlider.onChangeCallBack((value) => { cc.globalHue = value; });
    hueCol.addSubPanel(globalHueSlider);

    defaultHighlightsHue = cc.highlightsHue;
    highlightsHueSlider = new XR_UIPortal.SliderPanel(null, 0, 360, defaultHighlightsHue);
    highlightsHueSlider.stretchHorizontal = true;
    highlightsHueSlider.margin(vertMarginAmt, horzMarginAmt);
    highlightsHueSlider.onChangeCallBack((value) => { cc.highlightsHue = value; });
    hueCol.addSubPanel(highlightsHueSlider);

    defaultMidtonesHue = cc.midtonesHue;
    midtonesHueSlider = new XR_UIPortal.SliderPanel(null, 0, 360, defaultMidtonesHue);
    midtonesHueSlider.stretchHorizontal = true;
    midtonesHueSlider.margin(vertMarginAmt, horzMarginAmt);
    midtonesHueSlider.onChangeCallBack((value) => { cc.midtonesHue = value; });
    hueCol.addSubPanel(midtonesHueSlider);

    defaultShadowsHue = cc.shadowsHue;
    shadowsHueSlider = new XR_UIPortal.SliderPanel(null, 0, 360, defaultShadowsHue);
    shadowsHueSlider.stretchHorizontal = true;
    shadowsHueSlider.margin(vertMarginAmt, horzMarginAmt);
    shadowsHueSlider.onChangeCallBack((value) => { cc.shadowsHue = value; });
    hueCol.addSubPanel(shadowsHueSlider);

    parent.addSubPanel(hueCol);
}

function getDensityColumn(parent, vertMarginAmt, horzMarginAmt) {
    const densityCol = new XR_UIPortal.Container('densityColCC', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    densityCol.addSubPanel(new XR_UIPortal.Label('Density').setFontSize(.55, true).horizontalAlign(XR_UIPortal.Panel._ALIGN_HCENTER));
    densityCol.stretch(true, true);

    densityCol.addSubPanel(new XR_UIPortal.Spacer(.005, 0));

    defaultGlobalDensity = cc.globalDensity;
    globalDensitySlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultGlobalDensity);
    globalDensitySlider.stretchHorizontal = true;
    globalDensitySlider.margin(vertMarginAmt, horzMarginAmt);
    globalDensitySlider.onChangeCallBack((value) => { cc.globalDensity = value; });
    densityCol.addSubPanel(globalDensitySlider);

    defaultHighlightsDensity = cc.highlightsDensity;
    highlightsDensitySlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultHighlightsDensity);
    highlightsDensitySlider.stretchHorizontal = true;
    highlightsDensitySlider.margin(vertMarginAmt, horzMarginAmt);
    highlightsDensitySlider.onChangeCallBack((value) => { cc.highlightsDensity = value; });
    densityCol.addSubPanel(highlightsDensitySlider);

    defaultMidtonesDensity = cc.midtonesDensity;
    midtonesDensitySlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultMidtonesDensity);
    midtonesDensitySlider.stretchHorizontal = true;
    midtonesDensitySlider.margin(vertMarginAmt, horzMarginAmt);
    midtonesDensitySlider.onChangeCallBack((value) => { cc.midtonesDensity = value; });
    densityCol.addSubPanel(midtonesDensitySlider);

    defaultShadowsDensity = cc.shadowsDensity;
    shadowsDensitySlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultShadowsDensity);
    shadowsDensitySlider.stretchHorizontal = true;
    shadowsDensitySlider.margin(vertMarginAmt, horzMarginAmt);
    shadowsDensitySlider.onChangeCallBack((value) => { cc.shadowsDensity = value; });
    densityCol.addSubPanel(shadowsDensitySlider);

    parent.addSubPanel(densityCol);
}

function getSaturationColumn(parent, vertMarginAmt, horzMarginAmt) {
    const saturationCol = new XR_UIPortal.Container('saturationColCC', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    saturationCol.addSubPanel(new XR_UIPortal.Label('Saturation').setFontSize(.55, true).horizontalAlign(XR_UIPortal.Panel._ALIGN_HCENTER));
    saturationCol.stretch(true, true);

    saturationCol.addSubPanel(new XR_UIPortal.Spacer(.005, 0));

    defaultGlobalSaturation = cc.globalSaturation;
    globalSaturationSlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultGlobalSaturation);
    globalSaturationSlider.stretchHorizontal = true;
    globalSaturationSlider.margin(vertMarginAmt, horzMarginAmt);
    globalSaturationSlider.onChangeCallBack((value) => { cc.globalSaturation = value; });
    saturationCol.addSubPanel(globalSaturationSlider);

    defaultHighlightsSaturation = cc.highlightsSaturation;
    highlightsSaturationSlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultHighlightsSaturation);
    highlightsSaturationSlider.stretchHorizontal = true;
    highlightsSaturationSlider.margin(vertMarginAmt, horzMarginAmt);
    highlightsSaturationSlider.onChangeCallBack((value) => { cc.highlightsSaturation = value; });
    saturationCol.addSubPanel(highlightsSaturationSlider);

    defaultMidtonesSaturation = cc.midtonesSaturation;
    midtonesSaturationSlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultMidtonesSaturation);
    midtonesSaturationSlider.stretchHorizontal = true;
    midtonesSaturationSlider.margin(vertMarginAmt, horzMarginAmt);
    midtonesSaturationSlider.onChangeCallBack((value) => { cc.midtonesSaturation = value; });
    saturationCol.addSubPanel(midtonesSaturationSlider);

    defaultShadowsSaturation = cc.shadowsSaturation;
    shadowsSaturationSlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultShadowsSaturation);
    shadowsSaturationSlider.stretchHorizontal = true;
    shadowsSaturationSlider.margin(vertMarginAmt, horzMarginAmt);
    shadowsSaturationSlider.onChangeCallBack((value) => { cc.shadowsSaturation = value; });
    saturationCol.addSubPanel(shadowsSaturationSlider);

    parent.addSubPanel(saturationCol);
}

function getExposureColumn(parent, vertMarginAmt, horzMarginAmt) {
    const exposureCol = new XR_UIPortal.Container('exposureColCC', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    exposureCol.addSubPanel(new XR_UIPortal.Label('Exposure').setFontSize(.55, true).horizontalAlign(XR_UIPortal.Panel._ALIGN_HCENTER));
    exposureCol.stretch(true, true);

    exposureCol.addSubPanel(new XR_UIPortal.Spacer(.005, 0));

    defaultGlobalExposure = cc.globalExposure;
    globalExposureSlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultGlobalExposure);
    globalExposureSlider.stretchHorizontal = true;
    globalExposureSlider.margin(vertMarginAmt, horzMarginAmt);
    globalExposureSlider.onChangeCallBack((value) => { cc.globalExposure = value; });
    exposureCol.addSubPanel(globalExposureSlider);

    defaultHighlightsExposure = cc.highlightsExposure;
    highlightsExposureSlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultHighlightsExposure);
    highlightsExposureSlider.stretchHorizontal = true;
    highlightsExposureSlider.margin(vertMarginAmt, horzMarginAmt);
    highlightsExposureSlider.onChangeCallBack((value) => { cc.highlightsExposure = value; });
    exposureCol.addSubPanel(highlightsExposureSlider);

    defaultMidtonesExposure = cc.midtonesExposure;
    midtonesExposureSlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultMidtonesExposure);
    midtonesExposureSlider.stretchHorizontal = true;
    midtonesExposureSlider.margin(vertMarginAmt, horzMarginAmt);
    midtonesExposureSlider.onChangeCallBack((value) => { cc.midtonesExposure = value; });
    exposureCol.addSubPanel(midtonesExposureSlider);

    defaultShadowsExposure = cc.shadowsExposure;
    shadowsExposureSlider = new XR_UIPortal.SliderPanel(null, -100, 100, defaultShadowsExposure);
    shadowsExposureSlider.stretchHorizontal = true;
    shadowsExposureSlider.margin(vertMarginAmt, horzMarginAmt);
    shadowsExposureSlider.onChangeCallBack((value) => { cc.shadowsExposure = value; });
    exposureCol.addSubPanel(shadowsExposureSlider);

    parent.addSubPanel(exposureCol);
}

function resetIPColorCurves() {
    colorCurvesEnabledToggle.setSelected(ipScene.colorCurvesEnabled = defaultcolorCurvesEnabled);

    globalHueSlider.value     = cc.globalHue = defaultGlobalHue;
    highlightsHueSlider.value = cc.highlightsHue = defaultHighlightsHue;
    midtonesHueSlider.value   = cc.midtonesHue = defaultMidtonesHue;
    shadowsHueSlider.value    = cc.shadowsHue = defaultShadowsHue;

    globalDensitySlider.value     = cc.globalDensity = defaultGlobalDensity;
    highlightsDensitySlider.value = cc.highlightsDensity = defaultHighlightsDensity;
    midtonesDensitySlider.value   = cc.midtonesDensity = defaultMidtonesDensity;
    shadowsDensitySlider.value    = cc.shadowsDensity = defaultShadowsDensity;

    globalSaturationSlider.value     = cc.globalSaturation = defaultGlobalSaturation;
    highlightsSaturationSlider.value = cc.highlightsSaturation = defaultHighlightsSaturation;
    midtonesSaturationSlider.value   = cc.midtonesSaturation = defaultMidtonesSaturation;
    shadowsSaturationSlider.value    = cc.shadowsSaturation = defaultShadowsSaturation;

    globalExposureSlider.value     = cc.globalExposure = defaultGlobalExposure;
    highlightsExposureSlider.value = cc.highlightsExposure = defaultHighlightsExposure;
    midtonesExposureSlider.value   = cc.midtonesExposure = defaultMidtonesExposure;
    shadowsExposureSlider.value    = cc.shadowsExposure = defaultShadowsExposure;
}

function reportIPColorCurves(varName) {
    let ret = '';
    if (!ipScene.colorCurvesEnabled) return ret;
    ret += `${varName}.colorCurvesEnabled = true;\n`;

    if (defaultGlobalHue !== cc.globalHue) {
        ret += `${varName}.colorCurves.globalHue = ${cc.globalHue.toFixed(4)};\n`;
    }
    if (defaultHighlightsHue !== cc.highlightsHue) {
        ret += `${varName}.colorCurves.highlightsHue = ${cc.highlightsHue.toFixed(4)};\n`;
    }
    if (defaultMidtonesHue !== cc.midtonesHue) {
        ret += `${varName}.colorCurves.midtonesHue = ${cc.midtonesHue.toFixed(4)};\n`;
    }
    if (defaultShadowsHue !== cc.shadowsHue) {
        ret += `${varName}.colorCurves.shadowsHue = ${cc.shadowsHue.toFixed(4)};\n`;
    }
    // - - - - - - - - - - - - - - -
    if (defaultGlobalDensity !== cc.globalDensity) {
        ret += `${varName}.colorCurves.globalDensity = ${cc.globalDensity.toFixed(4)};\n`;
    }
    if (defaultHighlightsDensity !== cc.highlightsDensity) {
        ret += `${varName}.colorCurves.highlightsDensity = ${cc.highlightsDensity.toFixed(4)};\n`;
    }
    if (defaultMidtonesDensity !== cc.midtonesDensity) {
        ret += `${varName}.colorCurves.midtonesDensity = ${cc.midtonesDensity.toFixed(4)};\n`;
    }
    if (defaultShadowsDensity !== cc.shadowsDensity) {
        ret += `${varName}.colorCurves.shadowsDensity = ${cc.shadowsDensity.toFixed(4)};\n`;
    }
    // - - - - - - - - - - - - - - -
    if (defaultGlobalSaturation !== cc.globalSaturation) {
        ret += `${varName}.colorCurves.globalSaturation = ${cc.globalSaturation.toFixed(4)};\n`;
    }
    if (defaultHighlightsSaturation !== cc.highlightsSaturation) {
        ret += `${varName}.colorCurves.highlightsSaturation = ${cc.highlightsSaturation.toFixed(4)};\n`;
    }
    if (defaultMidtonesSaturation !== cc.midtonesSaturation) {
        ret += `${varName}.colorCurves.midtonesSaturation = ${cc.midtonesSaturation.toFixed(4)};\n`;
    }
    if (defaultShadowsSaturation !== cc.shadowsSaturation) {
        ret += `${varName}.colorCurves.shadowsSaturation = ${cc.shadowsSaturation.toFixed(4)};\n`;
    }
    // - - - - - - - - - - - - - - -
    if (defaultGlobalExposure !== cc.globalExposure) {
        ret += `${varName}.colorCurves.globalExposure = ${cc.globalExposure.toFixed(4)};\n`;
    }
    if (defaultHighlightsExposure !== cc.highlightsExposure) {
        ret += `${varName}.colorCurves.highlightsExposure = ${cc.highlightsExposure.toFixed(4)};\n`;
    }
    if (defaultMidtonesExposure !== cc.midtonesExposure) {
        ret += `${varName}.colorCurves.midtonesExposure = ${cc.midtonesExposure.toFixed(4)};\n`;
    }
    if (defaultShadowsExposure !== cc.shadowsExposure) {
        ret += `${varName}.colorCurves.shadowsExposure = ${cc.shadowsExposure.toFixed(4)};\n`;
    }
    return ret;
}

function enableColorCurves() {
    const enabled = ipScene.colorCurvesEnabled;

    globalHueSlider.enableSlider(enabled);
    highlightsHueSlider.enableSlider(enabled);
    midtonesHueSlider.enableSlider(enabled);
    shadowsHueSlider.enableSlider(enabled);

    globalDensitySlider.enableSlider(enabled);
    highlightsDensitySlider.enableSlider(enabled);
    midtonesDensitySlider.enableSlider(enabled);
    shadowsDensitySlider.enableSlider(enabled);

    globalSaturationSlider.enableSlider(enabled);
    highlightsSaturationSlider.enableSlider(enabled);
    midtonesSaturationSlider.enableSlider(enabled);
    shadowsSaturationSlider.enableSlider(enabled);

    globalExposureSlider.enableSlider(enabled);
    highlightsExposureSlider.enableSlider(enabled);
    midtonesExposureSlider.enableSlider(enabled);
    shadowsExposureSlider.enableSlider(enabled);
}