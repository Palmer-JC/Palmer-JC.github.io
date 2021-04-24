let resetAlphaBtn;

let useRadianceOverAlphaToggle;
let forceIrradianceInFragmentToggle;
let useAlphaFresnelToggle;
let useLinearAlphaFresnelToggle;

function makeMatToggles() {
    const ret = new XR_UIPortal.Container('alphaTab', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    ret.stretch(true, false);

    // - - - - - - - - - - - - - - -
    useRadianceOverAlphaToggle = new XR_UIPortal.Toggle('Radiance Over Alpha', scene);
    useRadianceOverAlphaToggle.stretchHorizontal = true;
    ret.addSubPanel(useRadianceOverAlphaToggle);
    useRadianceOverAlphaToggle.assignCallback(() => { currMaterial.useRadianceOverAlpha = useRadianceOverAlphaToggle.isSelected(); } );

    forceIrradianceInFragmentToggle = new XR_UIPortal.Toggle('Irradiance In Fragment', scene);
    forceIrradianceInFragmentToggle.stretchHorizontal = true;
    ret.addSubPanel(forceIrradianceInFragmentToggle);
    forceIrradianceInFragmentToggle.assignCallback(() => { currMaterial.forceIrradianceInFragment = forceIrradianceInFragmentToggle.isSelected(); } );

    useAlphaFresnelToggle = new XR_UIPortal.Toggle('Alpha Fresnel', scene);
    useAlphaFresnelToggle.stretchHorizontal = true;
    ret.addSubPanel(useAlphaFresnelToggle);
    useAlphaFresnelToggle.assignCallback(() => { currMaterial.useAlphaFresnel = useAlphaFresnelToggle.isSelected(); } );

    useLinearAlphaFresnelToggle = new XR_UIPortal.Toggle('Linear Alpha Fresnel', scene);
    useLinearAlphaFresnelToggle.stretchHorizontal = true;
    ret.addSubPanel(useLinearAlphaFresnelToggle);
    useLinearAlphaFresnelToggle.assignCallback(() => { currMaterial.useLinearAlphaFresnel = useLinearAlphaFresnelToggle.isSelected(); } );

    // - - - - - - - - - - - - - - -
    resetAlphaBtn = new XR_UIPortal.Button('Reset', scene);
    resetAlphaBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    resetAlphaBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    resetAlphaBtn.setHalfHeight();
    resetAlphaBtn.assignCallback(() => {
        // defined in materialsTab.js
        resetCurrAlpha();
    });
    ret.addSubPanel(resetAlphaBtn);

    return ret;
}

function setAlpha() {
    useRadianceOverAlphaToggle.setSelected(currMaterial.useRadianceOverAlpha);
    forceIrradianceInFragmentToggle.setSelected(currMaterial.forceIrradianceInFragment);
    useAlphaFresnelToggle.setSelected(currMaterial.useAlphaFresnel);
    useLinearAlphaFresnelToggle.setSelected(currMaterial.useLinearAlphaFresnel);
}

function enableAlpha(enabled) {
    resetAlphaBtn.enableButton(enabled);

    useRadianceOverAlphaToggle.enableToggle(enabled);
    forceIrradianceInFragmentToggle.enableToggle(enabled);
    useAlphaFresnelToggle.enableToggle(enabled);
    useLinearAlphaFresnelToggle.enableToggle(enabled);
}
