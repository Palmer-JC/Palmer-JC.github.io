let resetGeneralBtn;

let intensitySlider;
let metallicSlider;

let backFaceCullingToggle;
let twoSidedLightingToggle;
let disableLightingToggle;
let useHorizonOcclusionToggle;
let useRadianceOcclusionToggle;

function makeGeneralTab() {
    const ret = new XR_UIPortal.Container('generalTab', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    ret.stretch(true, true);

    intensitySlider = new XR_UIPortal.SliderPanel('Environment Intensity', 0, 1, .5);
    intensitySlider.stretchHorizontal = true;
    intensitySlider.onChangeCallBack((value) => { currMaterial.environmentIntensity = value; });
    ret.addSubPanel(intensitySlider);
    // - - - - - - - - - - - - - - -
    metallicSlider = new XR_UIPortal.SliderPanel('Metallic', 0, 1, 1);
    metallicSlider.stretchHorizontal = true;
    metallicSlider.onChangeCallBack((value) => { currMaterial.metallic = value; });
    ret.addSubPanel(metallicSlider);

    // - - - - - - - - - - - - - - -
    const grp = new XR_UIPortal.Container('generalGrp', XR_UIPortal.Panel.LAYOUT_VERTICAL);

    backFaceCullingToggle = new XR_UIPortal.Toggle('Back Face Culling', scene);
    backFaceCullingToggle.verticalMargin = 0;
    backFaceCullingToggle.stretchHorizontal = true;
    grp.addSubPanel(backFaceCullingToggle);
    backFaceCullingToggle.assignCallback(() => { currMaterial.backFaceCulling = backFaceCullingToggle.isSelected(); } );

    twoSidedLightingToggle = new XR_UIPortal.Toggle('2 Sided Lighting', scene);
    twoSidedLightingToggle.verticalMargin = 0;
    twoSidedLightingToggle.stretchHorizontal = true;
    grp.addSubPanel(twoSidedLightingToggle);
    twoSidedLightingToggle.assignCallback(() => { currMaterial.twoSidedLighting = twoSidedLightingToggle.isSelected(); } );

    disableLightingToggle = new XR_UIPortal.Toggle('Disable Lights', scene);
    disableLightingToggle.verticalMargin = 0;
    disableLightingToggle.stretchHorizontal = true;
    grp.addSubPanel(disableLightingToggle);
    disableLightingToggle.assignCallback(() => { currMaterial.disableLighting = disableLightingToggle.isSelected(); } );

    useHorizonOcclusionToggle = new XR_UIPortal.Toggle('Horizon Occlusion', scene);
    useHorizonOcclusionToggle.verticalMargin = 0;
    useHorizonOcclusionToggle.stretchHorizontal = true;
    grp.addSubPanel(useHorizonOcclusionToggle);
    useHorizonOcclusionToggle.assignCallback(() => { currMaterial.useHorizonOcclusion = useHorizonOcclusionToggle.isSelected(); } );

    useRadianceOcclusionToggle = new XR_UIPortal.Toggle('Radiance Occlusion', scene);
    useRadianceOcclusionToggle.verticalMargin = 0;
    useRadianceOcclusionToggle.stretchHorizontal = true;
    grp.addSubPanel(useRadianceOcclusionToggle);
    useRadianceOcclusionToggle.assignCallback(() => { currMaterial.useRadianceOcclusion = useRadianceOcclusionToggle.isSelected(); } );
    ret.addSubPanel(grp);

    // - - - - - - - - - - - - - - -
    resetGeneralBtn = new XR_UIPortal.Button('Reset', scene);
    resetGeneralBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    resetGeneralBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    resetGeneralBtn.setHalfHeight();
    resetGeneralBtn.assignCallback(() => {
        // defined in materialsTab.js
        resetCurrGeneral();
    });
    ret.addSubPanel(resetGeneralBtn);

    return ret;
}

function setGeneral() {
    intensitySlider.value = currMaterial.environmentIntensity;
    metallicSlider .value = currMaterial.metallic;
    backFaceCullingToggle.setSelected(currMaterial.backFaceCulling);
    twoSidedLightingToggle.setSelected(currMaterial.twoSidedLighting);
    disableLightingToggle.setSelected(currMaterial.disableLighting);
    useHorizonOcclusionToggle.setSelected(currMaterial.useHorizonOcclusion);
    useRadianceOcclusionToggle.setSelected(currMaterial.useRadianceOcclusion);
}

function enableGeneral(enabled) {
    resetGeneralBtn.enableButton(enabled);

    intensitySlider.enableSlider(enabled);
    metallicSlider .enableSlider(enabled);
    backFaceCullingToggle.enableToggle(enabled);
    twoSidedLightingToggle.enableToggle(enabled);
    disableLightingToggle.enableToggle(enabled);
    useHorizonOcclusionToggle.enableToggle(enabled);
    useRadianceOcclusionToggle.enableToggle(enabled);
}
