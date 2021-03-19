let resetMatBtn;

let leftSection;
let rightSection;

let albedoRedDial;
let albedoGreenDial;
let albedoBlueDial;

let subSurfRedDial;
let subSurfGreenDial;
let subSurfBlueDial;
let subSurfIntensitySlider;

let intensitySlider;
let metallicSlider;
let roughnessSlider;
let clearCoatSlider;
let sheenSlider;

function makeRightPanel(parentPanel) {
    const topLine = new XR_UIPortal.Container('rightFrameTitle');
    topLine.stretchHorizontal = true;

    const swapBtn = new XR_UIPortal.Button('Swap Sections', scene);
    swapBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    swapBtn.assignCallback(() => {
        XR_UIPortal.LayoutManager.switchPanelSubs(leftSection, rightSection);
    });
    topLine.addSubPanel(swapBtn);

    const green = XR_UIPortal.System.makeGreen();
    const title = new XR_UIPortal.Label('Material Properties').setLetterMaterial(green);
    title.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    topLine.addSubPanel(title);

    resetMatBtn = new XR_UIPortal.Button('Reset', scene);
    resetMatBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_RIGHT);
    resetMatBtn.assignCallback(() => {
        // defined in materialsTab.js
        resetCurrMaterial();
    });
    resetMatBtn.enableButton(false);
    topLine.addSubPanel(resetMatBtn);
    parentPanel.addSubPanel(topLine);
    // - - - - - - - - - - - - - - -
    // need a horizontal panel to double things up
    const doubleUpContainer = new XR_UIPortal.Container('doubleUpContainer');
    doubleUpContainer.stretch(true, true);
    doubleUpContainer.subsEqualShare[0] = true;
    parentPanel.addSubPanel(doubleUpContainer);

    leftSection = new XR_UIPortal.BorderPanel('leftVert', scene);
    leftSection.stretch(true, true);
    doubleUpContainer.addSubPanel(leftSection);

    rightSection = new XR_UIPortal.BorderPanel('rightVert', scene);
    rightSection.stretch(true, true);
    doubleUpContainer.addSubPanel(rightSection);

    // - - - - - - - - - - - - - - -
    makeColorDials(leftSection);
    makeMatSliders(rightSection);
    enablePropertyControls(false);
}

function makeColorDials(parentPanel) {
    const red   = XR_UIPortal.System.makeRed  ();
    const green = XR_UIPortal.System.makeGreen();
    const blue  = XR_UIPortal.System.makeBlue ();

    // - - - - - - - - - - - - - - -
    const albedoTitle = new XR_UIPortal.Label('Albedo');
    albedoTitle.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    parentPanel.addSubPanel(albedoTitle);

    const albedoContainer = new XR_UIPortal.Container('albedoContainer');
    albedoContainer.stretch(false, true);
    albedoContainer.subsEqualShare[0] = true;
    parentPanel.addSubPanel(albedoContainer);

    albedoRedDial = new XR_UIPortal.Dial('albedoRed', scene);
    albedoRedDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    albedoRedDial.selectorEnabledMaterial = red;
    albedoRedDial.stretch(false, true);
    albedoRedDial.onChangeCallBack((value) => { currMaterial.albedoColor.r = value; } );
    albedoContainer.addSubPanel(albedoRedDial);

    albedoGreenDial = new XR_UIPortal.Dial('albedoGreenDial', scene);
    albedoGreenDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    albedoGreenDial.selectorEnabledMaterial = green;
    albedoGreenDial.stretch(false, true);
    albedoGreenDial.onChangeCallBack((value) => { currMaterial.albedoColor.g = value; } );
    albedoContainer.addSubPanel(albedoGreenDial);

    albedoBlueDial = new XR_UIPortal.Dial('albedoBlueDial', scene);
    albedoBlueDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    albedoBlueDial.selectorEnabledMaterial = blue;
    albedoBlueDial.stretch(false, true);
    albedoBlueDial.onChangeCallBack((value) => { currMaterial.albedoColor.b = value; } );
    albedoContainer.addSubPanel(albedoBlueDial);

    // - - - - - - - - - - - - - - -
    const subSurfTitle = new XR_UIPortal.Label('SubSurface Trans.');
    subSurfTitle.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    parentPanel.addSubPanel(subSurfTitle);

    const subSurfContainer = new XR_UIPortal.Container('subSurfContainer');
    subSurfContainer.stretch(false, true);
    subSurfContainer.subsEqualShare[0] = true;
    parentPanel.addSubPanel(subSurfContainer);

    subSurfRedDial = new XR_UIPortal.Dial('subSurfRedDial', scene);
    subSurfRedDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    subSurfRedDial.selectorEnabledMaterial = red;
    subSurfRedDial.stretch(false, true);
    subSurfRedDial.onChangeCallBack((value) => { currMaterial.subSurface.tintColor.r = value; } );
    subSurfContainer.addSubPanel(subSurfRedDial);

    subSurfGreenDial = new XR_UIPortal.Dial('subSurfGreenDial', scene);
    subSurfGreenDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    subSurfGreenDial.selectorEnabledMaterial = green;
    subSurfGreenDial.stretch(false, true);
    subSurfGreenDial.onChangeCallBack((value) => { currMaterial.subSurface.tintColor.g = value; } );
    subSurfContainer.addSubPanel(subSurfGreenDial);

    subSurfBlueDial = new XR_UIPortal.Dial('subSurfBlueDial', scene);
    subSurfBlueDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    subSurfBlueDial.selectorEnabledMaterial = blue;
    subSurfBlueDial.stretch(false, true);
    subSurfBlueDial.onChangeCallBack((value) => { currMaterial.subSurface.tintColor.b = value; } );
    subSurfContainer.addSubPanel(subSurfBlueDial);

    subSurfIntensitySlider = new XR_UIPortal.SliderPanel('SubSurface Intensity', 0, 1, 1);
    subSurfIntensitySlider.stretchHorizontal = true;
    subSurfIntensitySlider.title.setFontSize(.7, true);
    subSurfIntensitySlider.onChangeCallBack((value) => {
        // really hard to get slider all the way to the left, so base on 2 decimals
        currMaterial.subSurface.translucencyIntensity = Number(value.toFixed(2));
        currMaterial.subSurface.isTranslucencyEnabled = currMaterial.subSurface.translucencyIntensity > 0;
        enableSubSurf();
    } );
    parentPanel.addSubPanel(subSurfIntensitySlider);
}

function makeMatSliders(parentPanel) {
    intensitySlider = new XR_UIPortal.SliderPanel('Environment Intensity', 0, 1, .5);
    intensitySlider.stretchHorizontal = true;
    intensitySlider.onChangeCallBack((value) => { currMaterial.environmentIntensity = value; });
    parentPanel.addSubPanel(intensitySlider);
    // - - - - - - - - - - - - - - -
    metallicSlider = new XR_UIPortal.SliderPanel('Metallic', 0, 1, 1);
    metallicSlider.stretchHorizontal = true;
    metallicSlider.onChangeCallBack((value) => { currMaterial.metallic = value; });
    parentPanel.addSubPanel(metallicSlider);
    // - - - - - - - - - - - - - - -
    roughnessSlider = new XR_UIPortal.SliderPanel('Roughness', 0, 1, 1);
    roughnessSlider.stretchHorizontal = true;
    roughnessSlider.onChangeCallBack((value) => { currMaterial.roughness = value; });
    parentPanel.addSubPanel(roughnessSlider);
    // - - - - - - - - - - - - - - -
    clearCoatSlider = new XR_UIPortal.SliderPanel('Clear Coat', 0, 1, 1);
    clearCoatSlider.stretchHorizontal = true;
    clearCoatSlider.onChangeCallBack((value) => {
        // really hard to get slider all the way to the left, so base on 2 decimals
        currMaterial.clearCoat.intensity = Number(value.toFixed(2));
        currMaterial.clearCoat.isEnabled = currMaterial.clearCoat.intensity > 0;
    } );
    parentPanel.addSubPanel(clearCoatSlider);
    // - - - - - - - - - - - - - - -
    sheenSlider = new XR_UIPortal.SliderPanel('Sheen', 0, 1, 1);
    sheenSlider.stretchHorizontal = true;
    sheenSlider.onChangeCallBack((value) => {
        // really hard to get slider all the way to the left, so base on 2 decimals
        currMaterial.sheen.intensity = Number(value.toFixed(2));
        currMaterial.sheen.isEnabled = currMaterial.sheen.intensity > 0;
    } );
    parentPanel.addSubPanel(sheenSlider);
}

function setPropertyControls() {
    enablePropertyControls(true);

    intensitySlider.value = currMaterial.environmentIntensity;
    metallicSlider .value = currMaterial.metallic;
    roughnessSlider.value = currMaterial.roughness;
    clearCoatSlider.value = currMaterial.clearCoat.isEnabled ? currMaterial.clearCoat.intensity : 0;
    sheenSlider    .value = currMaterial.sheen.isEnabled     ? currMaterial.sheen.intensity : 0;

    albedoRedDial  .value = currMaterial.albedoColor.r;
    albedoGreenDial.value = currMaterial.albedoColor.g;
    albedoBlueDial .value = currMaterial.albedoColor.b;

    subSurfRedDial  .value = currMaterial.subSurface.tintColor.r;
    subSurfGreenDial.value = currMaterial.subSurface.tintColor.g;
    subSurfBlueDial .value = currMaterial.subSurface.tintColor.b;
    subSurfIntensitySlider.value = currMaterial.subSurface.isTranslucencyEnabled ? currMaterial.subSurface.translucencyIntensity : 0;
}

function enablePropertyControls(enabled) {
    resetMatBtn.enableButton(enabled);

    intensitySlider.enableSlider(enabled);
    metallicSlider .enableSlider(enabled);
    roughnessSlider.enableSlider(enabled);
    clearCoatSlider.enableSlider(enabled);
    sheenSlider    .enableSlider(enabled);

    albedoRedDial  .enableDial(enabled);
    albedoGreenDial.enableDial(enabled);
    albedoBlueDial .enableDial(enabled);

    subSurfIntensitySlider.enableSlider(enabled);
    enableSubSurf();
}

function enableSubSurf() {
    const enabled = currMaterial && currMaterial.subSurface.isTranslucencyEnabled;
    subSurfRedDial  .enableDial(enabled);
    subSurfGreenDial.enableDial(enabled);
    subSurfBlueDial .enableDial(enabled);
}
