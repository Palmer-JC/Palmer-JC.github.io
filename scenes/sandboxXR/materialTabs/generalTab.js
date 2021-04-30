let resetGeneralBtn;

let intensitySlider;
let metallicSlider;

let backFaceCullingToggle;
let useRadianceOcclusionToggle;
let forceIrradianceInFragmentToggle;
let disableLightingToggle;

let twoSidedLightingToggle;
let useHorizonOcclusionToggle;
let useRadianceOverAlphaToggle;

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
    const columnBank = new XR_UIPortal.Container('gColBank', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    columnBank.stretch(true, true);

    const col1 = new XR_UIPortal.Container('generalGrp', XR_UIPortal.Panel.LAYOUT_VERTICAL);

    backFaceCullingToggle = new XR_UIPortal.Toggle('Back Face Culling', scene);
    backFaceCullingToggle.stretchHorizontal = true;
    col1.addSubPanel(backFaceCullingToggle);
    backFaceCullingToggle.assignCallback(() => { currMaterial.backFaceCulling = backFaceCullingToggle.isSelected(); } );

    useRadianceOcclusionToggle = new XR_UIPortal.Toggle('Radiance Occlusion', scene);
    useRadianceOcclusionToggle.stretchHorizontal = true;
    col1.addSubPanel(useRadianceOcclusionToggle);
    useRadianceOcclusionToggle.assignCallback(() => { currMaterial.useRadianceOcclusion = useRadianceOcclusionToggle.isSelected(); } );

    forceIrradianceInFragmentToggle = new XR_UIPortal.Toggle('Irradiance In Fragment', scene);
    forceIrradianceInFragmentToggle.stretchHorizontal = true;
    col1.addSubPanel(forceIrradianceInFragmentToggle);
    forceIrradianceInFragmentToggle.assignCallback(() => { currMaterial.forceIrradianceInFragment = forceIrradianceInFragmentToggle.isSelected(); } );

    disableLightingToggle = new XR_UIPortal.Toggle('Disable Lights', scene);
    disableLightingToggle.stretchHorizontal = true;
    col1.addSubPanel(disableLightingToggle);
    disableLightingToggle.assignCallback(() => { currMaterial.disableLighting = disableLightingToggle.isSelected(); } );

    columnBank.addSubPanel(col1);

    // - - - - - - - - - - - - - - -
    const col2 = new XR_UIPortal.Container('generalGrp', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    twoSidedLightingToggle = new XR_UIPortal.Toggle('2 Sided Lighting', scene);
    twoSidedLightingToggle.stretchHorizontal = true;
    col2.addSubPanel(twoSidedLightingToggle);
    twoSidedLightingToggle.assignCallback(() => { currMaterial.twoSidedLighting = twoSidedLightingToggle.isSelected(); } );

    useHorizonOcclusionToggle = new XR_UIPortal.Toggle('Horizon Occlusion', scene);
    useHorizonOcclusionToggle.stretchHorizontal = true;
    col2.addSubPanel(useHorizonOcclusionToggle);
    useHorizonOcclusionToggle.assignCallback(() => { currMaterial.useHorizonOcclusion = useHorizonOcclusionToggle.isSelected(); } );

    useRadianceOverAlphaToggle = new XR_UIPortal.Toggle('Radiance Over Alpha', scene);
    useRadianceOverAlphaToggle.stretchHorizontal = true;
    col2.addSubPanel(useRadianceOverAlphaToggle);
    useRadianceOverAlphaToggle.assignCallback(() => { currMaterial.useRadianceOverAlpha = useRadianceOverAlphaToggle.isSelected(); } );

    columnBank.addSubPanel(col2);
    ret.addSubPanel(columnBank);
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
    useHorizonOcclusionToggle.setSelected(currMaterial.useHorizonOcclusion);
    forceIrradianceInFragmentToggle.setSelected(currMaterial.forceIrradianceInFragment);
    disableLightingToggle.setSelected(currMaterial.disableLighting);

    twoSidedLightingToggle.setSelected(currMaterial.twoSidedLighting);
    useRadianceOcclusionToggle.setSelected(currMaterial.useRadianceOcclusion);
    useRadianceOverAlphaToggle.setSelected(currMaterial.useRadianceOverAlpha);
}

function enableGeneral(enabled) {
    resetGeneralBtn.enableButton(enabled);

    intensitySlider.enableSlider(enabled);
    metallicSlider .enableSlider(enabled);

    backFaceCullingToggle.enableToggle(enabled);
    useHorizonOcclusionToggle.enableToggle(enabled);
    forceIrradianceInFragmentToggle.enableToggle(enabled);
    disableLightingToggle.enableToggle(enabled);

    twoSidedLightingToggle.enableToggle(enabled);
    useRadianceOcclusionToggle.enableToggle(enabled);
    useRadianceOverAlphaToggle.enableToggle(enabled);
}
