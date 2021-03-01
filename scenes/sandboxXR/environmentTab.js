//==============================================================================
//                vars & functions for Environment Tab
//==============================================================================
const ENV_BASE_URL = '../../environments/';
const skyboxScale = 100;
const blur = 0;
let envMenu;
let hdrSkybox;
let envTextures = [];
let sceneIntensitySlider;

function getEnvironmentsTab() {
    // pre-load everything
    envTextures.push(BABYLON.CubeTexture.CreateFromPrefilteredData(`${ENV_BASE_URL}environment.env`, scene));
    envTextures.push(BABYLON.CubeTexture.CreateFromPrefilteredData(`${ENV_BASE_URL}studio_256.env`, scene));
    envTextures.push(BABYLON.CubeTexture.CreateFromPrefilteredData(`${ENV_BASE_URL}studio_512.env`, scene));
    envTextures.push(BABYLON.CubeTexture.CreateFromPrefilteredData(`${ENV_BASE_URL}studio Panorama rad.env`, scene));
    envTextures.push(BABYLON.CubeTexture.CreateFromPrefilteredData(`${ENV_BASE_URL}flower_road.env`, scene));
    envTextures.push(XR_UIPortal.Environment.get(scene));
    scene.environmentTexture = envTextures[0];

    hdrSkybox = scene.createDefaultSkybox(scene.environmentTexture, true, skyboxScale, blur);
    hdrSkybox.isPickable = false;
    hdrSkybox.setEnabled(false);

    const ret = new XR_UIPortal.Container('Environment', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);

    envMenu = new XR_UIPortal.Menu(null, ['Urban Environment', 'Studio, 256px', 'Studio, 512px', 'Studio Panorama Radiance', 'Flower Road', 'Portal', 'Custom'], XR_UIPortal.Panel.LAYOUT_VERTICAL, 8, true);
    envMenu.reportSelectedIdx(0);
    envMenu.assignCommonCallback(envCallback);
    envMenu.setItemEnabled(6, false);
    ret.addSubPanel(envMenu);

    // - - - - - - - - - - - - - - -
    // add vertical controls section
    const controls = new XR_UIPortal.Container('EnvControls', XR_UIPortal.Panel.LAYOUT_VERTICAL);

    // - - - - - - - - - - - - - - -
    sceneIntensitySlider = new XR_UIPortal.SliderPanel('Scene Environment Intensity', 0, 1, 1);
    sceneIntensitySlider.onChangeCallBack(intensityCallback);
    controls.addSubPanel(sceneIntensitySlider);

    // - - - - - - - - - - - - - - -
    const togglesContainer = new XR_UIPortal.Container('Toggles Container', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    togglesContainer.stretchHorizontal = true;

    const skyboxToggle = new XR_UIPortal.Toggle('Show As Sky Box', scene);
    skyboxToggle.subsEqualShare[0] = true;
    togglesContainer.addSubPanel(skyboxToggle);

    skyboxToggle.assignCallback(() => {
        const selected = skyboxToggle.isSelected();
        hdrSkybox.setEnabled(selected);
    });

    // - - - - - - - - - - - - - - -
    const floorToggle = new XR_UIPortal.Toggle('Show Floor', scene);
    floorToggle.setSelected(true); // cleaner if done before callback assignment
//    floorToggle.stretchHorizontal = true;
    skyboxToggle.subsEqualShare[0] = true;
    togglesContainer.addSubPanel(floorToggle);

    floorToggle.assignCallback(() => {
        floor.setEnabled(floorToggle.isSelected());
    });

    controls.addSubPanel(togglesContainer);
    ret.addSubPanel(controls);
    return ret;
}

function envCallback() {
    const idx = envMenu.selectedIndex;
    if (envTextures[idx]) {
        scene.environmentTexture = envTextures[idx]; // do not dispose the previous, since is original

        // sync skybox
        const mat = hdrSkybox.material;
        mat.reflectionTexture.dispose();
        mat.reflectionTexture = scene.environmentTexture.clone();
        mat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    }
}

function intensityCallback(value) {
    if (!materials) return;

    if (!value) value = sceneIntensitySlider.value;

    for (const mat of materials) {
        if (!(mat instanceof(BABYLON.PBRMaterial)) || mat.name === 'skyBox' ) continue;

        mat.environmentIntensity = value;
    }
}

function loadCustom(data, fileName) {
    const extension = fileName.toLowerCase().substr(fileName.length - 4);
    const custom = BABYLON.CubeTexture.CreateFromPrefilteredData(data, scene, extension);
    // un-comment to get base64 string to embed portal.env
    // envToBase64File(data);

    // stamp out the base64 stored in the name
    custom.name = null;

    // check if this is not the first custom env that has been loaded
    if (envTextures.length === 7) {
        envTextures[6].dispose();
        envTextures[6] = custom;

    } else envTextures.push(custom);

    // trigger the custom env into being current
    envMenu.reportSelectedIdx(6);
    envMenu.setItemEnabled(6, true);
}

// too large just to write to console
function envToBase64File(data) {
    const blob = new Blob ( [ data ], { type : 'text/strings;' } );
    const objectUrl = window.URL.createObjectURL(blob);

    const link = window.document.createElement('a');
    link.href = objectUrl;
    link.download = `base64.txt`;
    const click = document.createEvent('MouseEvents');
    click.initEvent('click', true, false);
    link.dispatchEvent(click);
}