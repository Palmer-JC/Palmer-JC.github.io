let resetColorBtn;

let albedoRedDial;
let albedoGreenDial;
let albedoBlueDial;

let emissiveRedDial;
let emissiveGreenDial;
let emissiveBlueDial;
let emissiveIntensitySlider;

let subSurfRedDial;
let subSurfGreenDial;
let subSurfBlueDial;
let subSurfIntensitySlider;

let red;
let green;
let blue;

function makeColorTab() {
    const ret = new XR_UIPortal.Container('colorTab', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    ret.stretch(true, true);

    red   = XR_UIPortal.System.makeRed  ();
    green = XR_UIPortal.System.makeGreen();
    blue  = XR_UIPortal.System.makeBlue ();
    // - - - - - - - - - - - - - - -
    const rowTitles = new XR_UIPortal.Container('rowTitlesColor', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    rowTitles.stretchVertical = true;
    rowTitles.margin(0, 0);
    rowTitles.addSubPanel(new XR_UIPortal.Spacer(.02, 0));
    rowTitles.addSubPanel(new XR_UIPortal.Label('Albedo'));
    rowTitles.addSubPanel(new XR_UIPortal.Spacer(.05, 0));
    rowTitles.addSubPanel(new XR_UIPortal.Label('Emissive'));
    rowTitles.addSubPanel(new XR_UIPortal.Spacer(.14, 0));

    const lbl1 = new XR_UIPortal.Label('Sub-Surface');
    lbl1.verticalMargin = 0;
    rowTitles.addSubPanel(lbl1);

    const lbl2 = new XR_UIPortal.Label('Transparency');
    lbl2.verticalMargin = 0;
    rowTitles.addSubPanel(lbl2);

    resetColorBtn = new XR_UIPortal.Button('Reset', scene);
    resetColorBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    resetColorBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    resetColorBtn.setHalfHeight();
    resetColorBtn.assignCallback(() => {
        // defined in materialsTab.js
        resetCurrColor();
    });
    rowTitles.addSubPanel(resetColorBtn);
    ret.addSubPanel(rowTitles);

    // - - - - - - - - - - - - - - -
    const col2 = new XR_UIPortal.Container('col2Color', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    col2.stretch(true, true);
    makeAlbedo(col2);
    col2.addSubPanel(new XR_UIPortal.Spacer(.02, 0));
    makeEmissive(col2);
    col2.addSubPanel(new XR_UIPortal.Spacer(.03, 0));
    makeSubSurf(col2);
    ret.addSubPanel(col2);

    return ret;
}

function makeAlbedo(parent) {
    const container = new XR_UIPortal.Container('albedoContainer');
    container.stretch(false, true);
    container.subsEqualShare[0] = true;
    parent.addSubPanel(container);

    albedoRedDial = new XR_UIPortal.Dial('albedoRed', scene);
    albedoRedDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    albedoRedDial.selectorEnabledMaterial = red;
    albedoRedDial.stretch(false, true);
    albedoRedDial.onChangeCallBack((value) => { currMaterial.albedoColor.r = value; } );
    container.addSubPanel(albedoRedDial);

    albedoGreenDial = new XR_UIPortal.Dial('albedoGreenDial', scene);
    albedoGreenDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    albedoGreenDial.selectorEnabledMaterial = green;
    albedoGreenDial.stretch(false, true);
    albedoGreenDial.onChangeCallBack((value) => { currMaterial.albedoColor.g = value; } );
    container.addSubPanel(albedoGreenDial);

    albedoBlueDial = new XR_UIPortal.Dial('albedoBlueDial', scene);
    albedoBlueDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    albedoBlueDial.selectorEnabledMaterial = blue;
    albedoBlueDial.stretch(false, true);
    albedoBlueDial.onChangeCallBack((value) => { currMaterial.albedoColor.b = value; } );
    container.addSubPanel(albedoBlueDial);
}

function makeEmissive(parent) {
    const container = new XR_UIPortal.Container('emissiveContainer');
    container.stretch(false, true);
    container.subsEqualShare[0] = true;
    parent.addSubPanel(container);

    emissiveRedDial = new XR_UIPortal.Dial('subSurfRedDial', scene);
    emissiveRedDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    emissiveRedDial.selectorEnabledMaterial = red;
    emissiveRedDial.stretch(false, true);
    emissiveRedDial.onChangeCallBack((value) => { currMaterial.emissiveColor.r = value; } );
    container.addSubPanel(emissiveRedDial);

    emissiveGreenDial = new XR_UIPortal.Dial('emissiveGreenDial', scene);
    emissiveGreenDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    emissiveGreenDial.selectorEnabledMaterial = green;
    emissiveGreenDial.stretch(false, true);
    emissiveGreenDial.onChangeCallBack((value) => { currMaterial.emissiveColor.g = value; } );
    container.addSubPanel(emissiveGreenDial);

    emissiveBlueDial = new XR_UIPortal.Dial('emissiveBlueDial', scene);
    emissiveBlueDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    emissiveBlueDial.selectorEnabledMaterial = blue;
    emissiveBlueDial.stretch(false, true);
    emissiveBlueDial.onChangeCallBack((value) => { currMaterial.emissiveColor.b = value; } );
    container.addSubPanel(emissiveBlueDial);

    emissiveIntensitySlider = new XR_UIPortal.SliderPanel('Emissive Intensity', 0, 1, 1);
    emissiveIntensitySlider.stretchHorizontal = true;
    emissiveIntensitySlider.title.setFontSize(.6, true);
    emissiveIntensitySlider.onChangeCallBack((value) => {
        // really hard to get slider all the way to the left, so base on 2 decimals
        currMaterial.emissiveIntensity = Number(value.toFixed(2));
    } );
    parent.addSubPanel(emissiveIntensitySlider);
}

function makeSubSurf(parent) {
    const container = new XR_UIPortal.Container('subSurfContainer');
    container.stretch(false, true);
    container.subsEqualShare[0] = true;
    parent.addSubPanel(container);

    subSurfRedDial = new XR_UIPortal.Dial('subSurfRedDial', scene);
    subSurfRedDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    subSurfRedDial.selectorEnabledMaterial = red;
    subSurfRedDial.stretch(false, true);
    subSurfRedDial.onChangeCallBack((value) => { currMaterial.subSurface.tintColor.r = value; } );
    container.addSubPanel(subSurfRedDial);

    subSurfGreenDial = new XR_UIPortal.Dial('subSurfGreenDial', scene);
    subSurfGreenDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    subSurfGreenDial.selectorEnabledMaterial = green;
    subSurfGreenDial.stretch(false, true);
    subSurfGreenDial.onChangeCallBack((value) => { currMaterial.subSurface.tintColor.g = value; } );
    container.addSubPanel(subSurfGreenDial);

    subSurfBlueDial = new XR_UIPortal.Dial('subSurfBlueDial', scene);
    subSurfBlueDial.labelEnabledMaterial = XR_UIPortal.System.BLACK;
    subSurfBlueDial.selectorEnabledMaterial = blue;
    subSurfBlueDial.stretch(false, true);
    subSurfBlueDial.onChangeCallBack((value) => { currMaterial.subSurface.tintColor.b = value; } );
    container.addSubPanel(subSurfBlueDial);

    subSurfIntensitySlider = new XR_UIPortal.SliderPanel('Sub-Surface Intensity', 0, 1, 1);
    subSurfIntensitySlider.stretchHorizontal = true;
    subSurfIntensitySlider.title.setFontSize(.6, true);
    subSurfIntensitySlider.onChangeCallBack((value) => {
        // really hard to get slider all the way to the left, so base on 2 decimals
        currMaterial.subSurface.translucencyIntensity = Number(value.toFixed(2));
        currMaterial.subSurface.isTranslucencyEnabled = currMaterial.subSurface.translucencyIntensity > 0;
        enableSubSurf();
    } );
    parent.addSubPanel(subSurfIntensitySlider);
}

function setColor() {
    albedoRedDial  .value = currMaterial.albedoColor.r;
    albedoGreenDial.value = currMaterial.albedoColor.g;
    albedoBlueDial .value = currMaterial.albedoColor.b;

    emissiveRedDial  .value = currMaterial.emissiveColor.r;
    emissiveGreenDial.value = currMaterial.emissiveColor.g;
    emissiveBlueDial .value = currMaterial.emissiveColor.b;
    emissiveIntensitySlider.value = currMaterial.emissiveIntensity;

    subSurfRedDial  .value = currMaterial.subSurface.tintColor.r;
    subSurfGreenDial.value = currMaterial.subSurface.tintColor.g;
    subSurfBlueDial .value = currMaterial.subSurface.tintColor.b;
    subSurfIntensitySlider.value = currMaterial.subSurface.isTranslucencyEnabled ? currMaterial.subSurface.translucencyIntensity : 0;
}

function enableColor(enabled) {
    resetColorBtn.enableButton(enabled);

    albedoRedDial  .enableDial(enabled);
    albedoGreenDial.enableDial(enabled);
    albedoBlueDial .enableDial(enabled);

    emissiveRedDial  .enableDial(enabled);
    emissiveGreenDial.enableDial(enabled);
    emissiveBlueDial .enableDial(enabled);
    emissiveIntensitySlider.enableSlider(enabled);

    subSurfIntensitySlider.enableSlider(enabled);
    enableSubSurf();
}

function enableSubSurf() {
    const enabled = currMaterial && currMaterial.subSurface.isTranslucencyEnabled;
    subSurfRedDial  .enableDial(enabled);
    subSurfGreenDial.enableDial(enabled);
    subSurfBlueDial .enableDial(enabled);
}