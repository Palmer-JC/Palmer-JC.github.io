let vr;
let ar;
let isXRCapable;

let canvas;
let engine;
let scene;
let sceneInstru;

let portal;
let camera;
let xrHelper;

const FpsFrequency = 50;
let freqCounter = 0;

function begin(doesVR, doesAR) {
    vr = doesVR;
    ar = doesAR;
    isXRCapable = vr || ar;

    canvas = document.getElementById("renderCanvas");
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    sceneInstru = new BABYLON.SceneInstrumentation(scene);

    loadFloor();
    loadPortal();
    loadCamera(canvas);
    engine.runRenderLoop(function () {
        scene.render();
        if (fpsDisplay) {
            if (++freqCounter % FpsFrequency === 0) {
                fpsDisplay.value = engine.getFps();
                freqCounter = 0;
            }
        }
    });
    window.addEventListener("resize",() => { engine.resize(); });
}
//==============================================================================
function loadCamera(canvas) {
    const distance = 3.5;
    camera = new BABYLON.ArcRotateCamera("XR_Fallback", -Math.PI / 2, (Math.PI / 2) - .15, distance, new BABYLON.Vector3(0, 1, 0), scene);
    camera.wheelPrecision = 175;
    camera.minZ = 0.001;

    if (isXRCapable) {
        // when both AR & VR capable; AR wins; must have some capability or would not be here
        const options = {
            uiOptions: {sessionMode: ar ? 'immersive-ar' : 'immersive-vr'},

            floorMeshes: [floor],
            timeToTeleport: 3500
        };
        BABYLON.WebXRDefaultExperience.CreateAsync(scene, options).then((defaultExperience) => {  //
            xrHelper = defaultExperience.baseExperience;
            portal.xrEnable(defaultExperience); // starts hands feature
        });
    } else {
        camera.attachControl(canvas, true);
        portal.summon();
    }
}
//==============================================================================
let mainTab;
function loadPortal() {
    portal = XR_UIPortal.Portal.createInstance(scene, vr, ar);

    // make first, so can easily test arms / nexie tube display without rest; just add
    // a return right after
    if (isXRCapable) {
        makeLeftArmPanel (portal.leftArmSurface);
        makeRightArmPanel(portal.rightArmSurface);
    }

    XR_UIPortal.Label.DEFAULT_FONT_MODULE = 'Font2D';
//    XR_UIPortal.System.CURRENT_FONT_MAT = XR_UIPortal.System.BLACK;
    XR_UIPortal.System.makeRed();

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    makeLeftPanel (portal.leftSurface);
    makeRightPanel(portal.rightSurface);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const titleContainer = new XR_UIPortal.Container('Sandbox Title', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
   titleContainer.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER).vertAlign(XR_UIPortal.Panel.ALIGN_TOP);
   titleContainer.stretchHorizontal = true;
   titleContainer.margin(0, 0);

    const mixedTextContainer = new XR_UIPortal.Container('Title Txt', XR_UIPortal.Panel.LAYOUT_HORIZONTAL); // needed because ,mixing 2 & 3D fonts
    mixedTextContainer.horizontalAlign(XR_UIPortal.Panel.ALIGN_HCENTER);
    mixedTextContainer.addSubPanel(new XR_UIPortal.Label('Sandbox').setLetterMaterial(XR_UIPortal.System.BLUE));
    mixedTextContainer.addSubPanel(new XR_UIPortal.Label('XR', 'Font3D').setSubsFaceSize(1.2).setLetterMaterial(XR_UIPortal.System.RED).scaleZ(.01));
    mixedTextContainer.margin(0, 0);
    titleContainer.addSubPanel(mixedTextContainer);

    const swapBtn = new XR_UIPortal.Button('Swap Sides', scene);
    swapBtn.horizontalAlign(XR_UIPortal.Panel.ALIGN_RIGHT);
    swapBtn.assignCallback(() => {
        XR_UIPortal.LayoutManager.switchPanelSubs(portal.leftSurface, portal.rightSurface);
    });
    titleContainer.addSubPanel(swapBtn);
    portal.centerSurface.addSubPanel(titleContainer);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    mainTab = new XR_UIPortal.TabStrip('main', ['Materials', 'Environment', 'Image Processing'], portal.centerSurface);
    mainTab.assignTab('Environment', getEnvironmentsTab());
    mainTab.assignTab('Materials', getMaterialsTab(null), true); // load after env, since uses intensity slider
    mainTab.assignTab('Image Processing',getImagingProcessTab());
}