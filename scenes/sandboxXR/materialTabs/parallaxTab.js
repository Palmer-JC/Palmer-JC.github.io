let resetParallaxBtn;

let parallaxScaleBiasSlider;
let useParallaxToggle;
let useParallaxOcclusionToggle;

function makeParallaxTab() {
    const ret = new XR_UIPortal.Container('parallaxTab', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    ret.stretch(true, true);

    parallaxScaleBiasSlider = new XR_UIPortal.SliderPanel('Scale Bias', 0, 1, 0);
    parallaxScaleBiasSlider.stretchHorizontal = true;
    parallaxScaleBiasSlider.onChangeCallBack((value) => { currMaterial.parallaxScaleBias = value; });
    ret.addSubPanel(parallaxScaleBiasSlider);

    // - - - - - - - - - - - - - - -
    const grp = new XR_UIPortal.Container('parallaxGrp', XR_UIPortal.Panel.LAYOUT_VERTICAL);

    useParallaxToggle = new XR_UIPortal.Toggle('Parallax', scene);
    useParallaxToggle.stretchHorizontal = true;
    grp.addSubPanel(useParallaxToggle);
    useParallaxToggle.assignCallback(() => { currMaterial.useParallax = useParallaxToggle.isSelected(); } );

    useParallaxOcclusionToggle = new XR_UIPortal.Toggle('Parallax Occlusion', scene);
    useParallaxOcclusionToggle.stretchHorizontal = true;
    grp.addSubPanel(useParallaxOcclusionToggle);
    useParallaxOcclusionToggle.assignCallback(() => { currMaterial.useParallaxOcclusion = useParallaxOcclusionToggle.isSelected(); } );
    ret.addSubPanel(grp);

    // - - - - - - - - - - - - - - -
    resetParallaxBtn = new XR_UIPortal.Button('Reset', scene);
    resetParallaxBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    resetParallaxBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    resetParallaxBtn.setHalfHeight();
    resetParallaxBtn.assignCallback(() => {
        // defined in materialsTab.js
        resetCurrParallax();
    });
    ret.addSubPanel(resetParallaxBtn);

    return ret;
}

function setParallax() {
    parallaxScaleBiasSlider.value = currMaterial.parallaxScaleBias;
    useParallaxToggle.setSelected(currMaterial.useParallax);
    useParallaxOcclusionToggle.setSelected(currMaterial.useParallaxOcclusion);
}

function enableParallax(enabled) {
    resetParallaxBtn.enableButton(enabled);

    parallaxScaleBiasSlider.enableSlider(enabled);
    useParallaxToggle.enableToggle(enabled);
    useParallaxOcclusionToggle.enableToggle(enabled);
}
