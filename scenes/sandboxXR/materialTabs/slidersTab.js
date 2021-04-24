let metallicSlider;

function makeMatSliders() {
    const ret = new XR_UIPortal.Container('slidersTab', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    ret.stretch(true, true);

    metallicSlider = new XR_UIPortal.SliderPanel('Metallic', 0, 1, 1);
    metallicSlider.stretchHorizontal = true;
    metallicSlider.onChangeCallBack((value) => { currMaterial.metallic = value; });
    ret.addSubPanel(metallicSlider);
    // - - - - - - - - - - - - - - -

    return ret;
}

function setMatSliders() {
    metallicSlider .value = currMaterial.metallic;
}

function enableMatSliders(enabled) {
    metallicSlider .enableSlider(enabled);
}