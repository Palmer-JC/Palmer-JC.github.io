//==============================================================================
//                vars & functions for Imaging Process Tab
//==============================================================================
let ipScene;

function getImagingProcessTab() {
    ipScene = scene.imageProcessingConfiguration;
    const ret = new XR_UIPortal.Container('ipContainer', XR_UIPortal.Panel.LAYOUT_HORIZONTAL);
    ret.stretch(true, true);

    const ipTStrip = new XR_UIPortal.TabStrip('ipTStrip', ['General', 'Color Curves', 'Vignette'], ret, XR_UIPortal.Panel.LAYOUT_VERTICAL, true);
    ipTStrip.assignTab('General', makeIPGeneralTab(), true);
    ipTStrip.assignTab('Color Curves', makeColorCurvesTab());
    ipTStrip.assignTab('Vignette', makeVignetteTab());
    return ret;
}

function reportIP() {
    const varName = 'ip';
    let report = `let ${varName} = new BABYLON.ImageProcessing();\n`;
    report += reportIPGeneral(varName);
    report += reportIPColorCurves(varName);
    report += reportIPVignette(varName);

    const blob = new Blob ( [ report ], { type : 'text/plain;charset=utf-8' } );
    const objectUrl = window.URL.createObjectURL(blob);

    const link = window.document.createElement('a');
    link.href = objectUrl;
    link.download = `imagingProcess.js`;
    const click = document.createEvent('MouseEvents');
    click.initEvent('click', true, false);
    link.dispatchEvent(click);
}