var SandboxXR;
const MaxDistance = 50;
const FirstFrameDist = 0.3;
const VelocityPerFrame = 1.5;
(function (SandboxXR) {

    class BulletInstance extends BABYLON.InstancedMesh {
        constructor(sourceMesh) {
            super(null, sourceMesh);
            this.setEnabled(false); // also used to detect if in flight
            this.direction   = BABYLON.Vector3.Zero();
            this.distance    = 0;
            this.scaledDirection = BABYLON.Vector3.Zero();
            this.posAtLaunch = BABYLON.Vector3.Zero();

            this.beforeRender = this.beforeRender.bind(this);
            // using scene level before render, so always runs & only once per frame, incase there are multiple cameras
            sourceMesh.getScene().registerBeforeRender(this.beforeRender);
        }

        launch(hand) {
            // get the spheres on the index finger to determine direction
            const tipPos = hand.indexFinger.tip.position;
            const proximalPos = hand.indexFinger.proximal.position;

            // calc direction
            this.posAtLaunch.copyFrom(tipPos);
            this.posAtLaunch.subtractToRef(proximalPos, this.direction);
            this.direction.normalize();

            // use direction to set rotation
            this.rotation.copyFrom(this.direction);

            // initial position assignment
            this.distance = 0;
            this.setPosition(FirstFrameDist);

            this.setEnabled(true);
        }

        setPosition(incremental) {
            this.distance += incremental;

            this.scaledDirection.copyFrom(this.direction);
            this.scaledDirection.scaleInPlace(this.distance);
            this.posAtLaunch.addToRef(this.scaledDirection, this.position);
        }

        beforeRender() {
            // exit when not enabled or the first frame
            if (!this.isEnabled() || this.distance === FirstFrameDist) {
                // want to get very close to hand on the first frame, but need to
                // update to break out test next frame
                if (this.distance === FirstFrameDist) this.distance += .01;

                return;
            }
            this.setPosition(VelocityPerFrame);
            if (this.distance > MaxDistance)
                this.setEnabled(false); // end of flight
        }

    }
    SandboxXR.BulletInstance = BulletInstance;
})(SandboxXR || (SandboxXR = {}));