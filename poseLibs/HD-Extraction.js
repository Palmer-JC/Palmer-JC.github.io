// File generated with Tower of Babel version: 5.3-beta on 11/11/17
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HD_Extraction;
(function (HD_Extraction) {
    var _B = BABYLON;
    var _M = _B.Matrix.FromValues;
    var _Q = _B.Quaternion;
    var _V = _B.Vector3;
    var boneLengths = {
        Root:.5316,pelvis:.8933,spine_01:.6885,spine_02:.7599,spine_03:1.459,clavicle_l:1.5076,clavicle_r:1.5076,neck_01:1.103,head:1.4536,upperarm_l:2.4439,lowerarm_l:2.376,hand_l:.3278,upperarm_r:2.4439,lowerarm_r:2.376,hand_r:.3278,thigh_l:4.0303,calf_l:4.1026,foot_l:1.3356,ball_l:.6729,thigh_r:4.0303,calf_r:4.1026,foot_r:1.3356,ball_r:.6729
    };

    var lib = QI.SkeletonPoseLibrary.createLibrary("HD-Extraction",  new _V(9.3597,16.8165,2.3734), "Root", boneLengths);
    new QI.Pose("basis", lib, {
        Root: _M(0,1,0,0,0,0,-1,0,1,0,0,0,0,0,.2658,1),
        pelvis: _M(0,0,1,0,.901,-.4338,0,0,.4338,.901,0,0,8.865,.4157,0,1),
        spine_01: _M(1,0,0,0,0,.7785,.6276,0,0,-.6276,.7785,0,0,.8933,0,1),
        spine_02: _M(1,0,0,0,0,.9788,-.2048,0,0,.2048,.9788,0,0,.6885,0,1),
        spine_03: _M(1,0,0,0,0,.995,-.0995,0,0,.0995,.995,0,0,.7599,0,1),
        clavicle_l: _M(-.1472,-.9891,-.0055,0,.9887,-.1469,-.0308,0,.0296,-.0099,.9995,0,.2301,2.4742,.4935,1),
        clavicle_r: _M(-.1472,.9891,.0055,0,-.9887,-.1469,-.0308,0,-.0296,-.0099,.9995,0,-.2301,2.4742,.4935,1),
        neck_01: _M(1,0,0,0,0,.9144,.4049,0,0,-.4049,.9144,0,0,3.2041,.3784,1),
        head: _M(1,0,0,0,0,.9351,-.3545,0,0,.3545,.9351,0,0,1.103,0,1),
        upperarm_l: _M(.7724,-.6345,-.0275,0,.634,.7729,-.0263,0,.0379,.0029,.9993,0,0,1.5076,0,1),
        lowerarm_l: _M(1,.004,-.0055,0,.0009,.732,.6813,0,.0067,-.6813,.732,0,0,2.4439,0,1),
        hand_l: _M(.6616,.0906,-.7444,0,.0838,.9775,.1935,0,.7452,-.1904,.6391,0,.0001,2.376,0,1),
        upperarm_r: _M(.7724,.6345,.0275,0,-.634,.7729,-.0263,0,-.0379,.0029,.9993,0,0,1.5076,0,1),
        lowerarm_r: _M(1,-.004,.0055,0,-.0009,.732,.6813,0,-.0067,-.6813,.732,0,0,2.4439,0,1),
        hand_r: _M(.6616,-.0906,.7444,0,-.0838,.9775,.1935,0,-.7452,-.1904,.6391,0,-.0001,2.376,0,1),
        thigh_l: _M(.8955,.2393,-.3752,0,.0986,-.9289,-.3571,0,-.4339,.2828,-.8554,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.891,.0052,-.4539,0,.0488,.993,.1073,0,.4513,-.1177,.8846,0,0,4.0303,0,1),
        foot_l: _M(1,.004,.0054,0,.0032,.4248,-.9053,0,-.0059,.9053,.4248,0,0,4.1026,0,1),
        ball_l: _M(.9983,.036,-.0457,0,-.0542,.8601,-.5072,0,.0211,.5089,.8606,0,0,1.3356,0,1),
        thigh_r: _M(.8955,-.2393,.3752,0,-.0986,-.9289,-.3571,0,.4339,.2828,-.8554,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.891,-.0052,.4539,0,-.0488,.993,.1073,0,-.4513,-.1177,.8846,0,0,4.0303,0,1),
        foot_r: _M(1,-.004,-.0054,0,-.0032,.4248,-.9053,0,.0059,.9053,.4248,0,0,4.1026,0,1),
        ball_r: _M(.9983,-.036,.0457,0,.0542,.8601,-.5072,0,-.0211,.5089,.8606,0,0,1.3356,0,1)
    });

    new QI.Pose("extraction-1", lib, {
        pelvis: _M(0,0,1,0,.286,.9582,0,0,-.9582,.286,0,0,8.6632,.4157,0,1),
        spine_01: _M(1,0,0,0,0,.4487,.8937,0,0,-.8937,.4487,0,0,.8933,0,1),
        spine_02: _M(1,0,0,0,0,.9901,.1402,0,0,-.1402,.9901,0,0,.6885,0,1),
        spine_03: _M(1,0,0,0,0,.6337,.7736,0,0,-.7736,.6337,0,0,.7162,.0619,1),
        neck_01: _M(1,0,0,0,0,-.2886,.9575,0,0,-.9575,-.2886,0,0,2.2054,1.2315,1),
        head: _M(1,0,0,0,0,.969,.2472,0,0,-.2472,.969,0,0,1.103,0,1),
        upperarm_l: _M(.0364,.5111,.8588,0,-.8187,.5081,-.2676,0,-.5731,-.6933,.4369,0,0,1.5076,0,1),
        lowerarm_l: _M(.0603,-.3572,.9321,0,-.6445,.6991,.3097,0,-.7623,-.6194,-.1881,0,0,2.4439,0,1),
        hand_l: _M(.6803,.3785,-.6277,0,-.5259,.8485,-.0583,0,.5105,.3698,.7763,0,.0001,2.376,0,1),
        upperarm_r: _M(.0364,-.5111,-.8588,0,.8187,.5081,-.2676,0,.5731,-.6933,.4369,0,0,1.5076,0,1),
        lowerarm_r: _M(.0603,.3572,-.9321,0,.6445,.6991,.3097,0,.7623,-.6194,-.1881,0,0,2.4439,0,1),
        hand_r: _M(.6803,-.3785,.6277,0,.5259,.8485,-.0583,0,-.5105,.3698,.7763,0,-.0001,2.376,0,1),
        thigh_l: _M(.9943,-.0427,-.0978,0,.0892,-.1718,.9811,0,-.0587,-.9842,-.167,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.8954,.0591,-.4413,0,.0281,.9817,.1883,0,.4443,-.181,.8774,0,0,4.0303,0,1),
        foot_l: _M(.9264,.0133,.3763,0,.3417,.39,-.8551,0,-.1581,.9207,.3567,0,0,4.1026,0,1),
        thigh_r: _M(.9943,.0427,.0978,0,-.0892,-.1718,.9811,0,.0587,-.9842,-.167,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.8954,-.0591,.4413,0,-.0281,.9817,.1884,0,-.4443,-.1811,.8774,0,0,4.0303,0,1),
        foot_r: _M(.9264,-.0133,-.3763,0,-.3417,.3899,-.8551,0,.1581,.9207,.3567,0,0,4.1026,0,1)
    });

    new QI.Pose("extraction-2", lib, {
        pelvis: _M(0,0,1,0,.286,.9582,0,0,-.9582,.286,0,0,8.6632,.4157,0,1),
        spine_01: _M(1,0,0,0,0,.4487,.8937,0,0,-.8937,.4487,0,0,.8933,0,1),
        spine_02: _M(1,0,0,0,0,.9901,.1402,0,0,-.1402,.9901,0,0,.6885,0,1),
        spine_03: _M(1,0,0,0,0,.703,.7112,0,0,-.7112,.703,0,0,.7162,.0619,1),
        neck_01: _M(1,0,0,0,0,.1256,.9921,0,0,-.9921,.1256,0,0,3.2041,.3784,1),
        upperarm_l: _M(.1674,.3389,.9258,0,-.8019,.593,-.0721,0,-.5735,-.7304,.3711,0,0,1.5076,0,1),
        lowerarm_l: _M(.2785,-.3761,.8837,0,-.743,.4987,.4464,0,-.6086,-.7809,-.1405,0,0,2.4439,0,1),
        hand_l: _M(.6724,.3474,-.6536,0,-.5582,.8179,-.1395,0,.4861,.4587,.7439,0,.0001,2.376,0,1),
        upperarm_r: _M(.1674,-.3389,-.9258,0,.8019,.593,-.0721,0,.5735,-.7304,.3711,0,0,1.5076,0,1),
        lowerarm_r: _M(.2785,.3761,-.8837,0,.743,.4987,.4464,0,.6086,-.7809,-.1405,0,0,2.4439,0,1),
        hand_r: _M(.6724,-.3474,.6536,0,.5582,.8179,-.1395,0,-.4861,.4587,.7439,0,-.0001,2.376,0,1),
        thigh_l: _M(.9943,-.0427,-.0978,0,.0892,-.1718,.9811,0,-.0587,-.9842,-.167,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.8954,.0591,-.4413,0,.0281,.9817,.1883,0,.4443,-.181,.8774,0,0,4.0303,0,1),
        foot_l: _M(.9264,.0133,.3763,0,.3417,.39,-.8551,0,-.1581,.9207,.3567,0,0,4.1026,0,1),
        thigh_r: _M(.9943,.0427,.0978,0,-.0892,-.1718,.9811,0,.0587,-.9842,-.167,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.8954,-.0591,.4413,0,-.0281,.9817,.1884,0,-.4443,-.1811,.8774,0,0,4.0303,0,1),
        foot_r: _M(.9264,-.0133,-.3763,0,-.3417,.3899,-.8551,0,.1581,.9207,.3567,0,0,4.1026,0,1)
    });

    new QI.Pose("extraction-3", lib, {
        pelvis: _M(0,0,1,0,.286,.9582,0,0,-.9582,.286,0,0,8.6632,.4157,0,1),
        spine_01: _M(1,0,0,0,0,.4487,.8937,0,0,-.8937,.4487,0,0,.8933,0,1),
        spine_02: _M(1,0,0,0,0,.9901,.1402,0,0,-.1402,.9901,0,0,.6885,0,1),
        spine_03: _M(1,0,0,0,0,.703,.7112,0,0,-.7112,.703,0,0,.7162,.0619,1),
        upperarm_l: _M(.1674,.3389,.9258,0,-.8019,.593,-.0721,0,-.5735,-.7304,.3711,0,0,1.5076,0,1),
        lowerarm_l: _M(.2785,-.3761,.8837,0,-.743,.4987,.4464,0,-.6086,-.7809,-.1405,0,0,2.4439,0,1),
        hand_l: _M(.6724,.3474,-.6536,0,-.5582,.8179,-.1395,0,.4861,.4587,.7439,0,.0001,2.376,0,1),
        upperarm_r: _M(.1674,-.3389,-.9258,0,.8019,.593,-.0721,0,.5735,-.7304,.3711,0,0,1.5076,0,1),
        lowerarm_r: _M(.2785,.3761,-.8837,0,.743,.4987,.4464,0,.6086,-.7809,-.1405,0,0,2.4439,0,1),
        hand_r: _M(.6724,-.3474,.6536,0,.5582,.8179,-.1395,0,-.4861,.4587,.7439,0,-.0001,2.376,0,1),
        thigh_l: _M(.9943,-.0427,-.0978,0,.0892,-.1718,.9811,0,-.0587,-.9842,-.167,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.8954,.0591,-.4413,0,.0281,.9817,.1883,0,.4443,-.181,.8774,0,0,4.0303,0,1),
        foot_l: _M(.9264,.0133,.3763,0,.3417,.39,-.8551,0,-.1581,.9207,.3567,0,0,4.1026,0,1),
        thigh_r: _M(.9943,.0427,.0978,0,-.0892,-.1718,.9811,0,.0587,-.9842,-.167,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.8954,-.0591,.4413,0,-.0281,.9817,.1884,0,-.4443,-.1811,.8774,0,0,4.0303,0,1),
        foot_r: _M(.9264,-.0133,-.3763,0,-.3417,.3899,-.8551,0,.1581,.9207,.3567,0,0,4.1026,0,1)
    });

    new QI.Pose("extraction-4", lib, {
        pelvis: _M(0,0,1,0,.286,.9582,0,0,-.9582,.286,0,0,8.6632,.4157,0,1),
        spine_01: _M(1,0,0,0,0,.4487,.8937,0,0,-.8937,.4487,0,0,.8933,0,1),
        spine_02: _M(1,0,0,0,0,.9901,.1402,0,0,-.1402,.9901,0,0,.6885,0,1),
        upperarm_l: _M(.6192,-.6042,.5015,0,-.2654,.44,.8579,0,-.739,-.6643,.1121,0,0,1.5076,0,1),
        lowerarm_l: _M(.9598,.013,.2802,0,-.2344,.5857,.7759,0,-.1541,-.8104,.5652,0,0,2.4439,0,1),
        hand_l: _M(.6214,.5058,-.5983,0,-.5299,.8339,.1545,0,.5771,.2211,.7862,0,.0001,2.376,0,1),
        upperarm_r: _M(.6192,.6042,-.5015,0,.2654,.44,.8579,0,.739,-.6643,.1121,0,0,1.5076,0,1),
        lowerarm_r: _M(.9598,-.013,-.2802,0,.2344,.5857,.7759,0,.1541,-.8104,.5652,0,0,2.4439,0,1),
        hand_r: _M(.6214,-.5058,.5983,0,.5299,.8339,.1545,0,-.5771,.2211,.7862,0,-.0001,2.376,0,1),
        thigh_l: _M(.9943,-.0427,-.0978,0,.0892,-.1718,.9811,0,-.0587,-.9842,-.167,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.8954,.0591,-.4413,0,.0281,.9817,.1883,0,.4443,-.181,.8774,0,0,4.0303,0,1),
        foot_l: _M(.9264,.0133,.3763,0,.3417,.39,-.8551,0,-.1581,.9207,.3567,0,0,4.1026,0,1),
        thigh_r: _M(.9943,.0427,.0978,0,-.0892,-.1718,.9811,0,.0587,-.9842,-.167,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.8954,-.0591,.4413,0,-.0281,.9817,.1884,0,-.4443,-.1811,.8774,0,0,4.0303,0,1),
        foot_r: _M(.9264,-.0133,-.3763,0,-.3417,.3899,-.8551,0,.1581,.9207,.3567,0,0,4.1026,0,1)
    });

    new QI.Pose("extraction-5", lib, {
        pelvis: _M(0,0,1,0,.286,.9582,0,0,-.9582,.286,0,0,8.6632,.4157,0,1),
        spine_01: _M(1,0,0,0,0,.4487,.8937,0,0,-.8937,.4487,0,0,.8933,0,1),
        upperarm_l: _M(.5745,-.7659,.2886,0,-.2224,.1932,.9556,0,-.7877,-.6132,-.0594,0,0,1.5076,0,1),
        lowerarm_l: _M(.9963,.0002,.0862,0,-.0007,1,.0057,0,-.0862,-.0058,.9963,0,0,2.4439,0,1),
        hand_l: _M(.5848,.4398,-.6816,0,-.2986,.898,.3232,0,.7542,.0145,.6565,0,.0001,2.376,0,1),
        upperarm_r: _M(.5745,.7659,-.2886,0,.2224,.1932,.9556,0,.7877,-.6132,-.0594,0,0,1.5076,0,1),
        lowerarm_r: _M(.9963,-.0002,-.0862,0,.0007,1,.0057,0,.0862,-.0058,.9963,0,0,2.4439,0,1),
        hand_r: _M(.5848,-.4398,.6816,0,.2986,.898,.3232,0,-.7542,.0145,.6565,0,-.0001,2.376,0,1),
        thigh_l: _M(.9943,-.0427,-.0978,0,.0892,-.1718,.9811,0,-.0587,-.9842,-.167,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.8954,.0591,-.4413,0,.0281,.9817,.1883,0,.4443,-.181,.8774,0,0,4.0303,0,1),
        foot_l: _M(.9264,.0133,.3763,0,.3417,.39,-.8551,0,-.1581,.9207,.3567,0,0,4.1026,0,1),
        thigh_r: _M(.9943,.0427,.0978,0,-.0892,-.1718,.9811,0,.0587,-.9842,-.167,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.8954,-.0591,.4413,0,-.0281,.9817,.1884,0,-.4443,-.1811,.8774,0,0,4.0303,0,1),
        foot_r: _M(.9264,-.0133,-.3763,0,-.3417,.3899,-.8551,0,.1581,.9207,.3567,0,0,4.1026,0,1)
    });

    new QI.Pose("extraction-6", lib, {
        pelvis: _M(0,0,1,0,.4905,.8715,0,0,-.8715,.4905,0,0,8.6632,.4157,0,1),
        upperarm_l: _M(.3983,-.9167,.0302,0,.4056,.2056,.8906,0,-.8227,-.3425,.4537,0,0,1.5076,0,1),
        lowerarm_l: _M(.9996,-.0001,-.0265,0,.0003,1,.0051,0,.0265,-.0051,.9996,0,0,2.4439,0,1),
        hand_l: _M(.3917,.4603,-.7967,0,-.2966,.8828,.3643,0,.871,.0936,.4823,0,.0001,2.376,0,1),
        upperarm_r: _M(.3983,.9167,-.0302,0,-.4056,.2056,.8906,0,.8227,-.3425,.4537,0,0,1.5076,0,1),
        lowerarm_r: _M(.9997,.0001,.0265,0,-.0003,1,.0051,0,-.0265,-.0051,.9996,0,0,2.4439,0,1),
        hand_r: _M(.3917,-.4603,.7967,0,.2966,.8828,.3643,0,-.871,.0936,.4823,0,-.0001,2.376,0,1),
        thigh_l: _M(.9814,-.1249,-.1455,0,.0913,-.3631,.9273,0,-.1687,-.9233,-.345,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.895,.0537,-.4429,0,.052,.9734,.2231,0,.4431,-.2227,.8684,0,0,4.0303,0,1),
        foot_l: _M(.9625,.0112,.2711,0,.2474,.374,-.8938,0,-.1114,.9274,.3572,0,0,4.1026,0,1),
        thigh_r: _M(.9814,.1249,.1455,0,-.0913,-.3631,.9273,0,.1687,-.9233,-.345,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.895,-.0537,.4429,0,-.052,.9734,.2231,0,-.4431,-.2227,.8684,0,0,4.0303,0,1),
        foot_r: _M(.9625,-.0112,-.2711,0,-.2474,.374,-.8938,0,.1114,.9274,.3572,0,0,4.1026,0,1)
    });

    new QI.Pose("extraction-7", lib, {
        pelvis: _M(0,0,1,0,.901,-.4338,0,0,.4338,.901,0,0,8.6632,.4157,0,1),
        upperarm_l: _M(.4077,-.9131,-.0066,0,.8996,.4029,-.1683,0,.1563,.0627,.9857,0,0,1.5076,0,1),
        lowerarm_l: _M(.9859,-.093,-.1395,0,.1482,.8718,.4668,0,.0782,-.4809,.8733,0,0,2.4439,0,1),
        hand_l: _M(.4688,.1981,-.8608,0,-.3132,.9485,.0477,0,.8259,.2473,.5067,0,.0001,2.376,0,1),
        upperarm_r: _M(.4077,.9131,.0066,0,-.8996,.4029,-.1683,0,-.1563,.0627,.9857,0,0,1.5076,0,1),
        lowerarm_r: _M(.9859,.093,.1395,0,-.1482,.8718,.4668,0,-.0782,-.4809,.8733,0,0,2.4439,0,1),
        hand_r: _M(.4688,-.1981,.8608,0,.3132,.9485,.0477,0,-.8259,.2473,.5067,0,-.0001,2.376,0,1),
        thigh_l: _M(.9023,.1733,-.3948,0,.1042,-.9762,-.1904,0,-.4184,.1306,-.8988,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.8928,.0205,-.4499,0,.1836,.8957,.405,0,.4113,-.4442,.7959,0,0,4.0303,0,1),
        foot_l: _M(1,-.0008,.0038,0,.0039,.2664,-.9639,0,-.0002,.9639,.2664,0,0,4.1026,0,1),
        thigh_r: _M(.9023,-.1733,.3948,0,-.1042,-.9762,-.1904,0,.4184,.1306,-.8988,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.8928,-.0205,.4499,0,-.1836,.8957,.405,0,-.4113,-.4442,.7959,0,0,4.0303,0,1),
        foot_r: _M(1,.0008,-.0038,0,-.0039,.2664,-.9639,0,.0002,.9639,.2664,0,0,4.1026,0,1)
    });

    new QI.Pose("extraction-8", lib, {
        upperarm_l: _M(.3352,-.9421,.0038,0,.9266,.3289,-.1821,0,.1704,.0645,.9833,0,0,1.5076,0,1),
        lowerarm_l: _M(.9835,-.1006,-.1505,0,.1621,.8596,.4846,0,.0807,-.501,.8617,0,0,2.4439,0,1),
        hand_l: _M(.5205,.1496,-.8406,0,-.225,.9738,.034,0,.8237,.1714,.5406,0,.0001,2.376,0,1),
        upperarm_r: _M(.3352,.9421,-.0038,0,-.9266,.3289,-.1821,0,-.1704,.0645,.9833,0,0,1.5076,0,1),
        lowerarm_r: _M(.9835,.1006,.1505,0,-.1621,.8596,.4846,0,-.0807,-.501,.8617,0,0,2.4439,0,1),
        hand_r: _M(.5205,-.1496,.8406,0,.225,.9738,.034,0,-.8237,.1714,.5406,0,-.0001,2.376,0,1)
    });

    new QI.Pose("extraction-9", lib, {
        pelvis: _M(0,0,1,0,.8402,-.5422,0,0,.5422,.8402,0,0,8.7805,.4157,0,1),
        spine_03: _M(1,0,0,0,0,.9881,-.1541,0,0,.1541,.9881,0,0,.7599,0,1),
        clavicle_l: _M(-.0854,-.9961,.0214,0,.9626,-.088,-.2563,0,.2572,-.0013,.9663,0,.2301,2.4742,.4935,1),
        clavicle_r: _M(-.0854,.9961,-.0214,0,-.9626,-.088,-.2563,0,-.2572,-.0013,.9663,0,-.2301,2.4742,.4935,1),
        upperarm_l: _M(.2504,-.9618,-.1104,0,.9593,.2619,-.1052,0,.1301,-.0796,.9883,0,0,1.5076,0,1),
        lowerarm_l: _M(.9877,-.0567,-.1454,0,.0853,.9763,.199,0,.1307,-.209,.9691,0,0,2.4439,0,1),
        hand_l: _M(.4329,.1899,-.8812,0,-.1628,.978,.1307,0,.8866,.0869,.4543,0,.0001,2.376,0,1),
        upperarm_r: _M(.2504,.9618,.1104,0,-.9593,.2619,-.1052,0,-.1301,-.0795,.9883,0,0,1.5076,0,1),
        lowerarm_r: _M(.9877,.0567,.1454,0,-.0853,.9763,.1991,0,-.1307,-.209,.9691,0,0,2.4439,0,1),
        hand_r: _M(.4329,-.1899,.8812,0,.1628,.978,.1307,0,-.8866,.0869,.4543,0,-.0001,2.376,0,1),
        thigh_l: _M(.8944,.2504,-.3706,0,.1024,-.9213,-.3752,0,-.4354,.2976,-.8496,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.8916,.0117,-.4527,0,.1353,.9471,.2909,0,.4322,-.3206,.8429,0,0,4.0303,0,1),
        foot_l: _M(1,.0004,-.0071,0,-.0069,.3282,-.9446,0,.002,.9446,.3282,0,0,4.1026,0,1),
        thigh_r: _M(.8944,-.2504,.3706,0,-.1024,-.9213,-.3752,0,.4354,.2976,-.8496,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.8916,-.0117,.4527,0,-.1353,.9471,.2909,0,-.4322,-.3206,.8429,0,0,4.0303,0,1),
        foot_r: _M(1,-.0004,.0071,0,.0069,.3282,-.9446,0,-.002,.9446,.3282,0,0,4.1026,0,1)
    });

    new QI.Pose("do-not", lib, {
        pelvis: _M(0,0,1,0,.901,-.4338,0,0,.4338,.901,0,0,8.8182,.4157,-.1874,1),
        neck_01: _M(.989,.0113,-.1476,0,.0495,.9147,.4012,0,.1395,-.4041,.904,0,0,3.2041,.3784,1),
        upperarm_l: _M(.9187,-.3949,-.0032,0,.3915,.9117,-.1248,0,.0523,.1134,.9922,0,0,1.5076,0,1),
        lowerarm_l: _M(.9901,.063,.1256,0,-.13,.0729,.9888,0,.0532,-.9953,.0803,0,0,2.4439,0,1),
        hand_l: _M(.928,.1818,.3253,0,-.1306,.9762,-.173,0,-.349,.1181,.9296,0,.0001,2.376,0,1),
        upperarm_r: _M(.3081,.9511,-.0217,0,-.9282,.2955,-.2262,0,-.2087,.0899,.9738,0,0,1.5076,0,1),
        lowerarm_r: _M(.9807,.1113,.1608,0,-.1834,.809,.5584,0,-.0679,-.5772,.8138,0,0,2.4439,0,1),
        hand_r: _M(.4887,-.1244,.8635,0,.2618,.9651,-.0092,0,-.8322,.2305,.5042,0,-.0001,2.376,0,1),
        thigh_l: _M(.8911,.2469,-.3807,0,.1249,-.9401,-.3173,0,-.4362,.2352,-.8686,0,1.0273,-.038,-.1118,1),
        calf_l: _M(.8915,.0108,-.453,0,.0801,.9802,.181,0,.4459,-.1976,.873,0,0,4.0303,0,1),
        foot_l: _M(.9997,.0238,-.0078,0,-.0165,.388,-.9215,0,-.0189,.9214,.3882,0,0,4.1026,0,1),
        thigh_r: _M(.9038,-.1851,.386,0,-.0751,-.9562,-.2828,0,.4214,.2266,-.8781,0,-1.0273,-.038,-.1118,1),
        calf_r: _M(.8913,-.0094,.4533,0,-.115,.9624,.2462,0,-.4386,-.2715,.8567,0,0,4.0303,0,1),
        foot_r: _M(.9997,.0187,-.0187,0,-.0241,.3533,-.9352,0,-.0109,.9353,.3537,0,0,4.1026,0,1)
    });

    new QI.Pose("go-in-there", lib, {
        upperarm_l: _M(.8789,-.477,.0034,0,.4728,.8702,-.1384,0,.063,.1233,.9904,0,0,1.5076,0,1),
        lowerarm_l: _M(.9924,.0543,.1104,0,-.1125,.0374,.9929,0,.0498,-.9978,.0432,0,0,2.4439,0,1),
        hand_l: _M(.9257,-.3704,.077,0,.3431,.7363,-.5831,0,.1593,.5662,.8087,0,.0001,2.376,0,1),
        upperarm_r: _M(.3352,.9421,-.0038,0,-.9266,.3289,-.1821,0,-.1704,.0645,.9833,0,0,1.5076,0,1),
        lowerarm_r: _M(.9835,.1006,.1505,0,-.1621,.8596,.4846,0,-.0807,-.501,.8617,0,0,2.4439,0,1),
        hand_r: _M(.5205,-.1496,.8406,0,.225,.9738,.034,0,-.8237,.1714,.5406,0,-.0001,2.376,0,1)
    });

})(HD_Extraction || (HD_Extraction = {}));