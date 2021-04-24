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

        this.emissiveColor = material.emissiveColor.clone();
        this.emissiveIntensity = material.emissiveIntensity;

        this.metallic = material.metallic;
        this.roughness = material.roughness;

        this.clearCoatIsEnabled = material.clearCoat.isEnabled;
        this.clearCoatIntensity = material.clearCoat.intensity;

        this.sheenIsEnabled = material.sheen.isEnabled;
        this.sheenIntensity = material.sheen.intensity;

        this.parallaxScaleBias = material.parallaxScaleBias;

        this.backFaceCulling = material.backFaceCulling;
        this.twoSidedLighting = material.twoSidedLighting;
        this.useParallax = material.useParallax;
        this.useParallaxOcclusion = material.useParallaxOcclusion;
        this.useRadianceOverAlpha = material.useRadianceOverAlpha;
        this.useObjectSpaceNormalMap = material.useObjectSpaceNormalMap;
        this.disableLighting = material.disableLighting;
        this.forceIrradianceInFragment = material.forceIrradianceInFragment;
        this.enableSpecularAntiAliasing = material.enableSpecularAntiAliasing;
        this.useHorizonOcclusion = material.useHorizonOcclusion;
        this.useRadianceOcclusion = material.useRadianceOcclusion;
        this.useAlphaFresnel = material.useAlphaFresnel;
        this.useLinearAlphaFresnel = material.useLinearAlphaFresnel;
        this.forceNormalForward = material.forceNormalForward;
        this.invertNormalMapX = material.invertNormalMapX;
        this.invertNormalMapY = material.invertNormalMapY;
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

        if (!this.material.emissiveColor.equals(this.emissiveColor)) ret += `\n\tEmissive color: ${this.material.emissiveColor.toString()}`;
        if (this.material.emissiveIntensity !== this.emissiveIntensity) ret += `\n\tEmissive intensity: ${this.material.emissiveIntensity}`;

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

        if (this.material.parallaxScaleBias !== this.parallaxScaleBias) ret += `\n\tparallaxScaleBias: ${this.material.parallaxScaleBias}`;

        if (this.material.backFaceCulling !== this.backFaceCulling) ret += `\n\tbackFaceCulling: ${this.material.backFaceCulling}`;
        if (this.material.twoSidedLighting !== this.twoSidedLighting) ret += `\n\ttwoSidedLighting: ${this.material.twoSidedLighting}`;
        if (this.material.useParallax !== this.useParallax) ret += `\n\tuseParallax: ${this.material.useParallax}`;
        if (this.material.useParallaxOcclusion !== this.useParallaxOcclusion) ret += `\n\tuseParallaxOcclusion: ${this.material.useParallaxOcclusion}`;
        if (this.material.useRadianceOverAlpha !== this.useRadianceOverAlpha) ret += `\n\tuseRadianceOverAlpha: ${this.material.useRadianceOverAlpha}`;
        if (this.material.useObjectSpaceNormalMap !== this.useObjectSpaceNormalMap) ret += `\n\tuseObjectSpaceNormalMap: ${this.material.useObjectSpaceNormalMap}`;
        if (this.material.disableLighting !== this.disableLighting) ret += `\n\tdisableLighting: ${this.material.disableLighting}`;
        if (this.material.forceIrradianceInFragment !== this.forceIrradianceInFragment) ret += `\n\tforceIrradianceInFragment: ${this.material.forceIrradianceInFragment}`;
        if (this.material.enableSpecularAntiAliasing !== this.enableSpecularAntiAliasing) ret += `\n\tenableSpecularAntiAliasing: ${this.material.enableSpecularAntiAliasing}`;
        if (this.material.useHorizonOcclusion !== this.useHorizonOcclusion) ret += `\n\tuseHorizonOcclusion: ${this.material.useHorizonOcclusion}`;
        if (this.material.useRadianceOcclusion !== this.useRadianceOcclusion) ret += `\n\tuseRadianceOcclusion: ${this.material.useRadianceOcclusion}`;
        if (this.material.useAlphaFresnel !== this.useAlphaFresnel) ret += `\n\tuseAlphaFresnel: ${this.material.useAlphaFresnel}`;
        if (this.material.useLinearAlphaFresnel !== this.useLinearAlphaFresnel) ret += `\n\tuseLinearAlphaFresnel: ${this.material.useLinearAlphaFresnel}`;
        if (this.material.forceNormalForward !== this.forceNormalForward) ret += `\n\tforceNormalForward: ${this.material.forceNormalForward}`;
        if (this.material.invertNormalMapX !== this.invertNormalMapX) ret += `\n\tinvertNormalMapX: ${this.material.invertNormalMapX}`;
        if (this.material.invertNormalMapY !== this.invertNormalMapY) ret += `\n\tinvertNormalMapY: ${this.material.invertNormalMapY}`;

        return `${this.material.name}: ${(ret.length > 0) ? ret : '  NONE'}`;
    }

    reset() {
        this.resetGeneral();
        this.resetColor();
        this.resetNormals();
        this.resetRoughness();
        this.resetParallax();
        this.resetAlpha();
    }

    resetGeneral() {
        this.material.environmentIntensity = this.environmentIntensity;
        this.material.metallic = this.metallic;

        this.material.backFaceCulling = this.backFaceCulling;
        this.material.twoSidedLighting = this.twoSidedLighting;
        this.material.disableLighting = this.disableLighting;
        this.material.useHorizonOcclusion = this.useHorizonOcclusion;
        this.material.useRadianceOcclusion = this.useRadianceOcclusion;
    }

    resetColor() {
        this.material.subSurface.isTranslucencyEnabled = this.subSurfaceIsTranslucencyEnabled;
        this.material.subSurface.translucencyIntensity = this.subSurfaceTranslucencyIntensity;
        this.material.subSurface.tintColor.copyFrom(this.subSurfaceTintColor);

        this.material.emissiveColor.copyFrom(this.emissiveColor);
        this.material.emissiveIntensity = this.emissiveIntensity;
    }

    resetNormals() {
        this.material.useObjectSpaceNormalMap = this.useObjectSpaceNormalMap;
        this.material.forceNormalForward = this.forceNormalForward;
        this.material.invertNormalMapX = this.invertNormalMapX;
        this.material.invertNormalMapY = this.invertNormalMapY;
    }

    resetRoughness() {
        this.material.roughness = this.roughness;

        this.material.clearCoat.isEnabled = this.clearCoatIsEnabled;
        this.material.clearCoat.intensity = this.clearCoatIntensity;

        this.material.sheen.isEnabled = this.sheenIsEnabled;
        this.material.sheen.intensity = this.sheenIntensity;
        this.material.enableSpecularAntiAliasing = this.enableSpecularAntiAliasing;
    }

    resetParallax() {
        this.material.parallaxScaleBias = this.parallaxScaleBias;
        this.material.useParallax = this.useParallax;
        this.material.useParallaxOcclusion = this.useParallaxOcclusion;
    }

    resetAlpha() {
        this.material.useRadianceOverAlpha = this.useRadianceOverAlpha;
        this.material.forceIrradianceInFragment = this.forceIrradianceInFragment;
        this.material.useAlphaFresnel = this.useAlphaFresnel;
        this.material.useLinearAlphaFresnel = this.useLinearAlphaFresnel;
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
function getCurrMatSettings() {
    for (const o of originals) {
        if (o.material.name === currMaterial.name) return o;
    }
    return null;
}

function resetCurrMaterial() {
    const orig = getCurrMatSettings();
    if (orig) {
        orig.reset();
        matCallback();
    }
}

function resetCurrGeneral() {
    const orig = getCurrMatSettings();
    if (orig) {
        orig.resetGeneral();
        setGeneral();
        enableGeneral(true);
    }
}

function resetCurrColor() {
    const orig = getCurrMatSettings();
    if (orig) {
        orig.resetColor();
        setColor();
        enableColor(true);
    }
}

function resetCurrNormals() {
    const orig = getCurrMatSettings();
    if (orig) {
        orig.resetNormals();
        setNormals();
        enableNormals(true);
    }
}

function resetCurrRoughness() {
    const orig = getCurrMatSettings();
    if (orig) {
        orig.resetRoughness();
        setRoughness();
        enableRoughness(true);
    }
}

function resetCurrParallax() {
    const orig = getCurrMatSettings();
    if (orig) {
        orig.resetParallax();
        setParallax();
        enableParallax(true);
    }
}

function resetCurrAlpha() {
    const orig = getCurrMatSettings();
    if (orig) {
        orig.resetAlpha();
        setAlpha();
        enableAlpha(true);
    }
}

function matCallback() {
    currMaterial = materials[matMenu.selectedIndex];
    setPropertyControls();
}