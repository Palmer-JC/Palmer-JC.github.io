let resetRoughnessBtn;

let roughnessSlider;
let clearCoatSlider;
let sheenSlider;
let enableSpecularAntiAliasingToggle;

function makeRoughnessTab() {
    const ret = new XR_UIPortal.Container('roughnessTab', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    ret.stretch(true, true);

    roughnessSlider = new XR_UIPortal.SliderPanel('Roughness', 0, 1, 0);
    roughnessSlider.stretchHorizontal = true;
    roughnessSlider.onChangeCallBack((value) => { currMaterial.roughness = value; });
    ret.addSubPanel(roughnessSlider);
    // - - - - - - - - - - - - - - -
    clearCoatSlider = new XR_UIPortal.SliderPanel('Clear Coat', 0, 1, 0);
    clearCoatSlider.stretchHorizontal = true;
    clearCoatSlider.onChangeCallBack((value) => {
        // really hard to get slider all the way to the left, so base on 2 decimals
        currMaterial.clearCoat.intensity = Number(value.toFixed(2));
        currMaterial.clearCoat.isEnabled = currMaterial.clearCoat.intensity > 0;
    } );
    ret.addSubPanel(clearCoatSlider);
    // - - - - - - - - - - - - - - -
    sheenSlider = new XR_UIPortal.SliderPanel('Sheen', 0, 1, 0);
    sheenSlider.stretchHorizontal = true;
    sheenSlider.onChangeCallBack((value) => {
        // really hard to get slider all the way to the left, so base on 2 decimals
        currMaterial.sheen.intensity = Number(value.toFixed(2));
        currMaterial.sheen.isEnabled = currMaterial.sheen.intensity > 0;
    } );
    ret.addSubPanel(sheenSlider);
    // - - - - - - - - - - - - - - -
    enableSpecularAntiAliasingToggle = new XR_UIPortal.Toggle('Specular Anti-Aliasing', scene);
    ret.addSubPanel(enableSpecularAntiAliasingToggle);
    enableSpecularAntiAliasingToggle.assignCallback(() => { currMaterial.enableSpecularAntiAliasing = enableSpecularAntiAliasingToggle.isSelected(); } );

    // - - - - - - - - - - - - - - -
    resetRoughnessBtn = new XR_UIPortal.Button('Reset', scene);
    resetRoughnessBtn.vertAlign(XR_UIPortal.Panel.ALIGN_BOTTOM);
    resetRoughnessBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_LEFT);
    resetRoughnessBtn.setHalfHeight();
    resetRoughnessBtn.assignCallback(() => {
        // defined in materialsTab.js
        resetCurrRoughness();
    });
    ret.addSubPanel(resetRoughnessBtn);

    return ret;
}

function setRoughness() {
    roughnessSlider.value = currMaterial.roughness;
    clearCoatSlider.value = currMaterial.clearCoat.isEnabled ? currMaterial.clearCoat.intensity : 0;
    sheenSlider    .value = currMaterial.sheen.isEnabled     ? currMaterial.sheen.intensity : 0;
    enableSpecularAntiAliasingToggle.setSelected(currMaterial.enableSpecularAntiAliasing);
}

function enableRoughness(enabled) {
    resetRoughnessBtn.enableButton(enabled);

    roughnessSlider.enableSlider(enabled);
    clearCoatSlider.enableSlider(enabled);
    sheenSlider    .enableSlider(enabled);
    enableSpecularAntiAliasingToggle.enableToggle(enabled);
}