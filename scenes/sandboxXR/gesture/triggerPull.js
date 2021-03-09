XR_UIPortal.HandTracking.registerPoseSequence(createTriggerPull);
let bulletMeshSource;
const magSize = 1000;
const magazine = new Array(magSize); // both hands can draw from the same magazine
let next = 0;

/**
 * Cannot be a direct XR_UIPortal.PoseSequence instance, like internal ones, since hand
 * will not be known at registration time, line 1.
 *
 * @param {XR_UIPortal.Hand} hand - The hand that the sequence will get created for when
 * the system calls this.
 *
 * @returns {XR_UIPortal.PoseSequence}
 */
function createTriggerPull(hand) {
    const ret =  new XR_UIPortal.PoseSequence(
        // sequence name, hand, repeatability as long as maintained, and debugMode
        'TriggerPull', hand, true, 1,
        [
            // index & middle tips far from it's proximal
            // ring & little  tips close to it's metacarpal
            new XR_UIPortal.Pose(
                // proximities
                [
                    hand.indexFinger .proximalProximity,   // tip to proximal always better than metacarpal for away
                    hand.middleFinger.proximalProximity,   // tip to proximal always better than metacarpal for away
                    hand.ringFinger  .metacarpalProximity, // tip to metacarpal
                    hand.littleFinger.metacarpalProximity  // tip to metacarpal
                ],
                // directions of measure
                [   XR_UIPortal.DIR_OF_MEASURE.FromMaxApart,
                    XR_UIPortal.DIR_OF_MEASURE.FromMaxApart,
                    XR_UIPortal.DIR_OF_MEASURE.FromMinApart,
                    XR_UIPortal.DIR_OF_MEASURE.FromMinApart
                ],
                [.80, .80, .80, .80], // ratios of max closed or openened
                0.25                  // ratio of backslide amt, before cancel
            ),


            // same as before, but now thumb is also close to down
            // index & middle tips far from it's proximal
            // ring & little  tips close to it's metacarpal
            new XR_UIPortal.Pose(
                // proximities
                [
                    hand.indexFinger .proximalProximity,   // tip to proximal always better than metacarpal for away
                    hand.middleFinger.proximalProximity,   // tip to proximal always better than metacarpal for away
                    hand.ringFinger  .metacarpalProximity, // tip to metacarpal
                    hand.littleFinger.metacarpalProximity, // tip to metacarpal
                    hand.thumbDown                         // thumb tip to index distal
                ],
                // directions of measure
                [   XR_UIPortal.DIR_OF_MEASURE.FromMaxApart,
                    XR_UIPortal.DIR_OF_MEASURE.FromMaxApart,
                    XR_UIPortal.DIR_OF_MEASURE.FromMinApart,
                    XR_UIPortal.DIR_OF_MEASURE.FromMinApart,
                    XR_UIPortal.DIR_OF_MEASURE.FromMinApart
                ],
                [.80, .80, .80, .80, .65], // ratios of max closed or openened
                0.25                       // ratio of backslide amt, before cancel
            )
        ]
    );

    let callCount = 0; // used to not have to fire new projectile every frame

    /**
     * Called the first & each frame the last pose of a sequence is maintained for
     * repeatable PoseSequences.
     *
     * Method is not a constructor arg, since internal sequences can be sub classed,
     * & can be over ridden easier.
     *
     * @param {XR_UIPortal.Hand} hand - passing hand, since cannot use this.hand for external sequences
     */
    ret.beginCallback = (hand) => {
        // done now since sure scene has now been created
        if (!bulletMeshSource) {
            bulletMeshSource = BABYLON.SphereBuilder.CreateSphere("host", { diameter: .07 });
            bulletMeshSource.material = XR_UIPortal.System.RED;
            bulletMeshSource.position.y = -200; // keep it out of sight

           for(let i = 0; i < magSize; i++) {
               magazine[i] = new SandboxXR.BulletInstance(bulletMeshSource);
           }
        }

        if (callCount++ % 2 === 0) {
            if (++next === magSize) next = 0;
            magazine[next].launch(hand);
            XR_UIPortal.Click().play();
            if (hand.handMesh) hand.handMesh.setSelected(true);
        }
        else if (hand.handMesh) hand.handMesh.setSelected(false);
    };

    /**
     * Called only for repeatable PoseSequences, when the last pose has no longer been
     * maintained.
     *
     * Method is not a constructor arg, since internal sequences can be sub classed,
     * & can be over ridden easier.
     *
     * @param {XR_UIPortal.Hand} hand - passing hand, since cannot use this.hand for external sequences
     */
    ret.endCallback = (hand) => {
        callCount = 0;
        if (hand.handMesh) hand.handMesh.setSelected(false);
    };

    return ret;
}