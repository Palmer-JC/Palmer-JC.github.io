/**
 * Class used to detect if something in a material changed from constructor till
 * reportChanges().  Also used to reset any changes made so far.
 */
class MatSettings {
    constructor(material) {
        this.material = material;
        this.environmentIntensity = material.environmentIntensity;

        this.subSurfaceIsTranslucencyEnabled = material.subSurface.isTranslucencyEnabled;
        this.subSurfaceTranslucencyIntensity = material.subSurface.translucencyIntensity;
        this.subSurfaceTintColor = material.subSurface.tintColor.clone();

        this.albedoColor = material.albedoColor.clone();
        this.metallic = material.metallic;
        this.roughness = material.roughness;

        this.clearCoatIsEnabled = material.clearCoat.isEnabled;
        this.clearCoatIntensity = material.clearCoat.intensity;

        this.sheenIsEnabled = material.sheen.isEnabled;
        this.sheenIntensity = material.sheen.intensity;
    }

    reportChanges() {
        let ret = '';
        if (this.material.environmentIntensity !== this.environmentIntensity) ret += `\n\tEnv intensity: ${this.material.environmentIntensity}`;

        if (this.material.subSurface.isTranslucencyEnabled !== this.subSurfaceIsTranslucencyEnabled) {
            ret += `\n\tSubsurf Translucency enabled: ${this.material.subSurface.isTranslucencyEnabled}`;
            if (this.material.subSurface.translucencyIntensity !== this.subSurfaceTranslucencyIntensity) ret += `\n\tSubsurf Translucency intensity: ${this.material.subSurface.translucencyIntensity}`;
            if (!this.material.subSurface.tintColor.equals(this.subSurfaceTintColor)) ret += `\n\tSubsurf Translucency tint color: ${this.material.subSurface.tintColor.toString()}`;
        }

        if (!this.material.albedoColor.equals(this.albedoColor)) ret += `\n\tAlbedo color: ${this.material.albedoColor.toString()}`;
        if (this.material.metallic !== this.metallic) ret += `\n\tMetallic: ${this.material.metallic}`;
        if (this.material.roughness !== this.roughness) ret += `\n\tRoughness: ${this.material.roughness}`;

        if (this.material.clearCoat.isEnabled !== this.clearCoatIsEnabled) {
            ret += `\n\tClearcoat enabled: ${this.material.clearCoat.isEnabled}`;
            if (this.material.clearCoat.intensity !== this.clearCoatIntensity) ret += `\n\tClearcoat intensity: ${this.material.clearCoat.intensity}`;
        }

        if (this.material.sheen.isEnabled !== this.sheenIsEnabled) {
            ret += `\n\tSheen enabled: ${this.material.sheen.isEnabled}`;
            if (this.material.sheen.intensity !== this.sheenIntensity) ret += `\n\tSheen intensity: ${this.material.sheen.intensity}`;
        }

        return `${this.material.name}: ${(ret.length > 0) ? ret : '  NONE'}`;
    }

    reset() {
        this.material.environmentIntensity = this.environmentIntensity;

        this.material.subSurface.isTranslucencyEnabled = this.subSurfaceIsTranslucencyEnabled;
        this.material.subSurface.translucencyIntensity = this.subSurfaceTranslucencyIntensity;
        this.material.subSurface.tintColor.copyFrom(this.subSurfaceTintColor);

        this.material.albedoColor.copyFrom(this.albedoColor);
        this.material.metallic = this.metallic;
        this.material.roughness = this.roughness;

        this.material.clearCoat.isEnabled = this.clearCoatIsEnabled;
        this.material.clearCoat.intensity = this.clearCoatIntensity;

        this.material.sheen.isEnabled = this.sheenIsEnabled;
        this.material.sheen.intensity = this.sheenIntensity;
    }
}
//==============================================================================
//                vars & functions for Materials Tab
//==============================================================================
let materialsContainer;
let materials;
let originals;
let currMaterial;
let matMenu;

function getMaterialsTab(loadedmeshes) {
    enablePropertyControls(); // from rightPanel.js

    // get the pbr materials from the loadedMeshes
    materials = [];
    originals = [];
    const matNames = [];
    if (loadedmeshes) {
        const matCandidates = []
        for (const mesh of loadedmeshes) {
            const mat = mesh.material;
            if (mat instanceof(BABYLON.PBRMaterial)) {
                matCandidates.push(mat);
            } else if (mat instanceof(BABYLON.MultiMaterial)) {
                for (const sub of mat.subMaterials) {
                    if (sub instanceof(BABYLON.PBRMaterial)) {
                        matCandidates.push(sub);
                    }
                }
            }
        }

        for (const cand of matCandidates) {
            let found = false
            for (const mat of materials) {
                if (cand === mat || cand.name === mat.name) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                materials.push(cand);
                originals.push(new MatSettings(cand));
                matNames.push(cand.name);
            }
        }
        intensityCallback();
    }
    if (!materialsContainer) {
        materialsContainer = new XR_UIPortal.Container('Materials', XR_UIPortal.Panel.LAYOUT_VERTICAL);
    } else {
        materialsContainer.removeAll();
    }

    if (materials.length > 0) {
        matMenu = new XR_UIPortal.Menu(null, matNames, XR_UIPortal.Panel.LAYOUT_VERTICAL, 8, true);
        matMenu.assignCommonCallback(matCallback);
        materialsContainer.addSubPanel(matMenu);
    }
    return materialsContainer;
}

// called from rightPanel.js
function resetCurrMaterial() {
    for (const o of originals) {
        if (o.material.name === currMaterial.name) {
            o.reset();
            matCallback();
            return;
        }
    }
}

function matCallback() {
    currMaterial = materials[matMenu.selectedIndex];
    setPropertyControls();
}