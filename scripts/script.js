
const D = require('Diagnostics');
const Reactive = require('Reactive');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const Animation = require('Animation');
const FaceTracking = require('FaceTracking');
const Audio = require('Audio');
const Time = require('Time');

// Singing similarity levels.
const PERFECT_BEAT = 130;
const GOOD_BEAT    = 109;
const OK_BEAT      = 88;
const BAD_BEAT     = 65;
const MISSED_BEAT  = 0;

// The singleton game metadata.
const GameMetadata = {
    mouthOpenness: [
        0.05313561260700225,
        0.05808942914009094,
        0.08064671754837036,
        0.3507119655609131,
        0.4593686103820801,
        0.47402759790420534,
        0.4889551043510437,
        0.499998414516449,
        0.23848047256469726,
        0.2610040843486786,
        0.15195249915122985,
        0.06102874279022216,
        0.2834551572799683,
        0.4436620116233826,
        0.47059645652771,
        0.2587618470191956,
        0.04424178004264831,
        0.369636082649231,
        0.42873605489730837,
        0.43305149078369143,
        0.41862949132919314,
        0.3655374586582184,
        0.3917449951171875,
        0.37386986017227175,
        0.2705390989780426,
        0.1581956684589386,
        0.11611654758453369,
        0.0887466162443161,
        0.0949278563261032,
        0.040573143959045405,
        0.11501140296459197,
        0.46408804655075075,
        0.4881203413009644,
        0.4219114422798157,
        0.4182332992553711,
        0.015880183875560755,
        0.05313561260700225,
        0.05808942914009094,
        0.08064671754837036,
        0.3507119655609131,
        0.4593686103820801,
        0.47402759790420534,
        0.4889551043510437,
        0.499998414516449,
        0.23848047256469726,
        0.2610040843486786,
        0.15195249915122985,
        0.06102874279022216,
        0.2834551572799683,
        0.4436620116233826,
        0.47059645652771,
        0.2587618470191956,
        0.04424178004264831,
        0.369636082649231,
        0.42873605489730837,
        0.43305149078369143,
        0.41862949132919314,
        0.3655374586582184,
        0.3917449951171875,
        0.37386986017227175,
        0.2705390989780426,
        0.1581956684589386,
        0.11611654758453369,
        0.0887466162443161,
        0.0949278563261032,
        0.040573143959045405,
        0.11501140296459197,
        0.46408804655075075,
        0.4881203413009644,
        0.4219114422798157,
        0.4182332992553711,
        0.015880183875560755,
        0.02395163625478744,
        0.6877843379974365,
        0.6404760122299195,
        0.39662241339683535,
        0.02794233858585357,
        0.15307175517082214,
        0.5992895603179932,
        0.5411924958229065,
        0.4489931106567383,
        0.1601950466632843,
        0.6473431825637818,
        0.668450677394867,
        0.5408216953277588,
        0.6657085657119751,
        0.6640072107315064,
        0.48578753471374514,
        0.7295451402664185,
        0.892298424243927,
        1.0100752353668212,
        1.0089372634887694,
        1.0770298480987548,
        1.1487717866897582,
        1.0715500354766845,
        0.9396333932876587,
        0.28457271456718447,
        -1,
        0.33069669604301455,
        0.4071036219596863,
        0.1567884624004364,
        0.2239511251449585,
        0.5165006756782532,
        0.5801820397377014,
        0.5852986216545105,
        0.6000582814216614,
        0.6554101943969727,
        0.6993003129959107,
        0.7650270104408264,
        0.7766312599182129,
        0.6376680970191956,
        0.16769986748695373,
        0.6625437378883362,
        0.6501978874206543,
        0.7072723746299744,
        0.7649240732192993,
        0.7544672131538391,
        0.17592843770980834,
        0.10356680452823638,
        0.07359913885593414,
        0.031492480635643,
        0.6001391649246216,
        0.6075586318969727,
        0.5199183464050293,
        0.7933554887771607,
        0.8230262637138367,
        0.8838917255401612,
        0.7681504130363465,
        0.6117220163345337,
        0.5242160201072693,
        0.27063175439834597,
        0.4435716509819031,
        0.4776469111442566,
        0.49376734495162966,
        0.07906892299652099,
        -1,
        0.3147761464118958,
        0.14632871150970458,
        0.4121007561683655,
        0.13202310502529144,
        0.11533790230751037,
        0.15742751359939575,
        0.7003345727920532,
        0.7731370568275452,
        0.7384873270988465,
        0.7336326479911804,
        0.17119174599647521,
        0.056800016760826105,
        0.17533581852912902,
        0.14102775752544403,
        0.5127086281776428,
        0.29871573448181155,
        0.17469465136528015,
        0.09056887924671173,
        0.09054168462753295,
        0.10089532434940338,
        0.06987253725528716,
        0.03352006673812866,
        -1,
        -1,
        0.23355191349983215,
        0.1091366946697235,
        0.5490496993064881,
        0.5648516058921814,
        0.4939532518386841,
        0.05242005884647369,
        0.6204530835151673,
        0.49960687160491946,
        0.06556154191493987,
        0.18799644112586975,
        0.14774159491062164,
        0.5488739252090454,
        0.7710386157035828,
        0.8399421811103821,
        0.8138925671577454,
        0.731537127494812,
        0.7245127201080322,
        0.5773847341537476,
        0.38759505152702334,
        -1,
        -1,
        -1,
        -1,
        0.18950771689414977,
        0.48825629949569704,
        0.6981625199317932,
        0.2473692238330841,
        0.06301284730434417,
        0.11194563806056976,
        0.8142065644264221,
        0.8303722381591797,
        0.020517596602439875,
        0.23399292826652526,
        0.24116089344024658,
        0.020701745152473444,
        0.6842321395874024,
        0.682261848449707,
        0.1598569393157959,
        0.2390650451183319,
        0.09485412538051605,
        0.12182074189186096,
        0.6502688765525818,
        0.6623955011367798,
        0.707024359703064,
        0.7827944993972779,
        0.2917948305606842,
        0.17072671055793762,
        0.1023138403892517,
        0.14195508658885955,
        0.41574891805648806,
        0.5413193941116333,
        0.07085000872611999,
        0.08368606269359588,
        0.0639377623796463,
        0.5615514159202576,
        0.38977994918823244,
        0.19048135876655578,
        0.2050996959209442,
        0.23742406964302062,
        0.5851037740707398,
        0.6591268420219422,
        0.6504258155822754,
        0.6251812219619751,
        0.6102563381195069,
        0.45339241027832033,
        0.3665804505348206,
        0.5467534899711609,
        0.6536125183105469,
        0.5641717553138733,
        0.16208239793777465,
        0.16731398701667785,
        0.5934558153152466,
        0.5999762654304505,
        0.12965919971466064,
        0.45606895685195925,
        0.23562657237052917,
        0.7771508932113648,
        0.6226758003234864,
        0.24197288751602172,
        0.5760166883468628,
        0.1800808548927307,
        0.09171588122844695,
        0.1009451687335968,
        0.08493138253688812,
        0.08754859268665313,
        0.09764947891235351,
        0.12473147511482238,
        0.21646370887756347,
        0.6126255631446839,
        0.26631768941879275,
        0.14767632782459258,
        0.1407967448234558,
        0.547611141204834,
        0.5405940651893616,
        0.33197748064994814,
        0.4025908946990967,
        0.2235103189945221,
        0.6850034832954407,
        0.7167679905891419,
        0.6963154911994934,
        0.35114639401435854,
        0.22969748973846435,
        0.26702340841293337,
        0.38221230506896975,
        0.38659130930900576,
        0.5898484230041504,
        0.582548999786377,
        0.5441194415092468,
        0,
        -1,
        0.42802228927612307,
        0.4594015717506409,
        0.13179954290390014,
        0.43946131467819216,
        0.4483580827713013,
        0.09668023288249969,
        0.3891098737716675,
        0.38761388659477236,
        0.06068482398986816,
        0.7122924566268921,
        0.678232216835022,
        0.4384229421615601,
        0.43250843286514284,
        0.25148471593856814,
        0.16989862322807311,
        0.11874468028545379,
        0.017271706461906428,
        -1,
        0.12634552419185638,
        0.12035044431686401,
        0.1407318502664566,
        0.12449129819869995,
        0.14152280390262603,
        0.09303959608078002,
        0.12997435927391052,
        0.5282499432563782,
        -1,
        0.2943181335926056,
        0.13268130421638488,
        0.0063740998506545965,
        -1,
        0.05249058604240417,
        0.02535949051380157,
        0.5016189455986023,
        0.6472026348114014,
        0.6484478950500489,
        0.6353858947753906,
        0.6393412590026856,
        0.6893486618995667,
        0.6831032276153565,
        0.20621704459190368,
        0.41593255996704104,
        0.38589447140693667,
        0.11045204997062683,
        0.10638363063335418,
        0.11855746209621429,
        0.11891140937805175,
        0.16389941573143005,
        0.47037204504013064,
        0.29796349406242373,
        0.14663829803466796,
        0.09284942746162414,
        0.08773449957370758,
        0.1621888220310211,
        0.1524387240409851,
        0.3470063447952271,
        0.6859329581260681,
        0.6974602580070496,
        0.6629576325416565,
        0.5965107321739197,
        0.5996324062347412,
        0.6147554159164429,
        0.4853593945503235,
        0.41468080282211306,
        0.41442092657089236,
        0.221087509393692,
        0.3266462028026581,
        0.39162387847900393,
        0.11558967232704162,
        0.13393656313419341,
        0.4511301159858704,
        0.5758410930633545,
        0.6836946845054627,
        0.6796975374221802,
        0.6297102808952332,
        0.7754199743270874,
        0.6844694256782532,
        0.41497918367385866,
        0.02100438773632049,
        0.10052634179592132,
        -1,
        0.10963628590106964,
        0.4432413220405579,
        0.6221366763114929,
        0.6235226631164551,
        0.09880177080631256,
        0.1484532594680786,
        0.13554277420043945,
        0.045994856953620905,
        0.06412046551704406,
        0.09774241745471954,
        0.10537218451499938,
        0.09394813477993011,
        -1,
        0.07186672985553741,
        0.1320353388786316,
        0.169819438457489,
        0.0422252207994461,
        0.5544962525367737,
        0.5592583060264588,
        0.07615886032581329,
        0.056200781464576716,
        0.6316063642501831,
        0.6679360508918762,
        0.6711531519889832,
        0.6553750276565552,
        0.623412036895752,
        0.4094442963600159,
        0.16251843571662902,
        0.11155010163784027,
        0.10397503674030303,
        0.05394063293933868,
        0.07814496159553527,
        0.5038355827331543,
        0.49992367029190066,
        0.47078307867050173,
        0.40221246480941775,
        0.43962701559066775,
        0.4467064380645752,
        0.07846220731735229,
        0.09134633243083953,
        0.3001421332359314,
        0.29104512333869936,
        0.27785047292709353,
        0.004801237583160395,
        0.22915282249450683,
        0.294260048866272,
        0.1142932116985321,
        0.05339681506156921,
        0.46546592712402346,
        0.11146787703037261,
        0.04231149852275848,
        0.06139876842498779,
        0.674898111820221,
        0.645682418346405,
        0.2870131373405457,
        0.1972288131713867,
        0.5360806822776795,
        0.1386423796415329,
        0.3049389958381653,
        0.04416770637035369,
        0,
        0.09287779927253723,
        0.5948145031929016,
        0.58827885389328,
        0.5525696516036988,
        0.2981820642948151,
        0.13207072913646697,
        0.1959965169429779,
        0.2175007700920105,
        0.2382805585861206,
        0.7495004177093506,
        0.9280473232269287,
        0.9433644056320191,
        0.697760009765625,
        0.008385473489761347,
        0.9015445947647095,
        0.8903867244720459,
        0.05399160981178283,
        0.06408246755599975,
        0.16180285215377807,
        0.06359052062034606,
        0.0723705232143402,
        0.6765370607376099,
        0.7367694616317749,
        0.6813138365745545,
        0.6400023937225342,
        0.5989760994911194,
        -1,
        -1,
        0.20025961995124816,
        0.46607604026794436,
        0.5227706670761109,
        0.056540766358375544,
        0,
        0.3618620276451111,
        0.22368654012680053,
        0.44729610681533816,
        0.3149366319179535,
        0.37917750477790835,
        0.16406913995742797,
        0.20095970630645751,
        0.16836010813713073,
        0.3222589731216431,
        0.6653906345367432,
        0.43279417753219607,
        0.42890807390213015,
        0.606741213798523,
        0.18680422902107238,
        0.11760040521621704,
        0.12952598333358764,
        0.2462410569190979,
        0.3280309081077576,
        0.8308037757873535,
        1.2022236824035644,
        1.09135582447052,
        0.9768522024154663,
        0.9478323698043823,
        0.9527395009994507,
        0.9392060279846192,
        0.9123372077941895,
        0.8874683022499085,
        0.8685335755348206,
        0.8625158309936524,
        0.8483458995819092,
        0.8462664723396301,
        0.8404208660125733,
        0.8247429966926575,
        0.762890362739563,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ]
};

// The singleton game result state.
const GameResult = {
    score: 0
}

class BaseState {

    constructor() {
        this.world = Scene.root
            .child("Device")
            .child("Camera")
            .child("Focal Distance");
        this.faceTracker = this.world
            .child("facetracker0");
        this.canvas2d = this.world
            .child("2DCanvas0");
        this.bgm = this.world
            .child("bgm");

        this.mainFaceMesh = this.faceTracker
            .child("main_face_mesh");

        this.glasses = this.faceTracker
            .child("glasses");
        this.laserBeamL = this.faceTracker
            .child("laser_beam_l");
        this.laserBeamR = this.faceTracker
            .child("laser_beam_r");
        this.txtScore = this.canvas2d
            .child("txt_scores");

        this.rewardYeah = this.world
            .child("reward_yeah");

        // Disposable pool.
        this.disposables = [];
    }

    enter() {
        // Init disposable pool.
        this.disposables = [];
    }

    exit() {
        // Dispose the disposables.
        this.disposables.forEach((d) => {
            d.unsubscribe();
        });
    }

    next(next) {
        this.next = next;
        return this;
    }

    gotoNext() {
        this.exit();
        if (this.next instanceof BaseState) {
            this.next.enter();
        }
    }
}

class IdleState extends BaseState {

    enter() {
        super.enter();
        D.log("enter: IdleState")
        
        this.btnStart = this.canvas2d.child("btn_start")
        this.btnStart.hidden = false

        this.objCountdown = this.canvas2d.child("img_countdown")
        this.objCountdown.hidden = true

        this.mainFaceMesh.hidden = true;
        this.glasses.hidden = true;
        this.laserBeamL.hidden = true;
        this.laserBeamR.hidden = true;
        this.txtScore.hidden = true;

        this.rewardYeah.hidden = true;
        
        // Button start.
        this.disposables.push(TouchGestures
            .onTap(this.btnStart)
            .subscribe((event) => { 
                this.btnStart.hidden = true
                // Start the game.
                this.gotoNext()
            }))
    }

    exit() {
        D.log("exit: IdleState")
        super.exit();
    }
}

class GamingState extends BaseState {

    enter() {
        super.enter();
        D.log("enter: GamingState")

        // Show the main face mesh.
        this.mainFaceMesh.hidden = false;

        // Hidden objects.
        this.glasses.hidden = true;
        // Laser beam left.
        this.laserBeamL.hidden = true;
        // Laser beam right.
        this.laserBeamR.hidden = true;

        this.rewardYeah.hidden = true;

        // The song is 90s long.
        this.gameTimeout = 90000;
        this.samplingInterval = 200;
        this.samplingCounter = 0;

        this.sumOfMouthOpennessInSamplingWindow = 0;
        this.numOfMouthOpennessInSamplingWindow = 0;
        this.dataInSamplingWindow = [];

        this.sampleIndex = 0;
        this.samplingData = [];

        // Mouth openness window observable.
        this.disposables.push(Time.ms
            .interval(this.samplingInterval)
            .subscribe((elapsedTime) => {                
                // // Calculate the average of mouth openness in the sampling 
                // // window.
                // if (this.numOfMouthOpennessInSamplingWindow > 0) {
                //     this.samplingData.push(
                //         this.sumOfMouthOpennessInSamplingWindow /
                //         this.numOfMouthOpennessInSamplingWindow);
                // } else {
                //     this.samplingData.push(
                //         this.sumOfMouthOpennessInSamplingWindow);
                // }

                // Calculate the highest spike of mouth openness in the sampling
                // window.
                if (this.dataInSamplingWindow.length > 0) {
                    this.samplingData.push(Math.max.apply(
                        null, this.dataInSamplingWindow));
                } else {
                    this.samplingData.push(-1);
                }
                
                // Calculate the scores
                const level = this.samplingData[this.samplingData.length - 1];
                if (this.sampleIndex < GameMetadata.mouthOpenness.length) {
                    this.calcuateSingingScore(
                        level, 
                        GameMetadata.mouthOpenness[this.sampleIndex])
                }
                
                // Reset.
                this.sumOfMouthOpennessInSamplingWindow = 0;
                this.numOfMouthOpennessInSamplingWindow = 0;
                this.dataInSamplingWindow = [];

                // Advance the index.
                ++this.sampleIndex;

                // Show the scores.
                this.txtScore.text = "" + GameResult.score;
                
                // DEBUG: For recording metadata.
                // D.log(this.samplingData[this.samplingData.length - 1] + ",");
            }));

        // Mouth openness observable.
        this.disposables.push(FaceTracking
            .face(0)
            .mouth
            .openness
            .monitor()
            .subscribe((data) => {
                // this.sumOfMouthOpennessInSamplingWindow += data.newValue;
                // ++this.numOfMouthOpennessInSamplingWindow;

                this.dataInSamplingWindow.push(data.newValue);
            }))

        // Start!!!.
        GameResult.score = 0;
        this.txtScore.hidden = false;
        this.txtScore.text = "" + GameResult.score;
        Audio.play(this.bgm);

        // Show the glasses after 25s.
        this.disposables.push(Time
            .setTimeout(() => {
                this.glasses.hidden = false;
            }, 25000));

        // Show the laser beams after 30s.
        this.disposables.push(Time
            .setTimeout(() => {
                this.laserBeamL.hidden = false;
                this.laserBeamR.hidden = false;
            }, 35000));

        // Game timeout.
        this.disposables.push(Time
            .setTimeout(() => {
                this.gotoNext();
        }, this.gameTimeout));
    }

    exit() {
        // Hide the main face mesh.
        this.mainFaceMesh.hidden = true;

        D.log("exit: GamingState")
        super.exit();
    }

    calcuateSingingScore(givenLevel, expectLevel) {
        // True indicates the given two values are similar.
        const diff = Math.abs(givenLevel - expectLevel);
        var result = MISSED_BEAT;

        if (diff < 0.01) {
            result = PERFECT_BEAT;
        } else if (diff < 0.03) {
            result = GOOD_BEAT;
        } else if (diff < 0.06) {
            result = OK_BEAT;
        } else if (diff < 0.09) {
            result = BAD_BEAT;
        }
        GameResult.score += result;
        if (result >= BAD_BEAT &&  this.rewardYeah.hidden.lastValue == true) {
            const duration = 1000;
            var animDriver = Animation.timeDriver({durationMilliseconds: duration, loopCount:1});
            var animSampler = Animation.samplers.linear(0, 60);

            this.rewardYeah.transform.z = Animation.animate(animDriver, animSampler);

            this.rewardYeah.hidden = false;
            animDriver.start();

            // Reset animation flag
            Time.setTimeout(function (elapsedTime) { this.rewardYeah.hidden = true; }.bind(this), duration);
        }

        // DEBUG: Show the scores.
        D.log("given=" + givenLevel + 
            ", expect=" + expectLevel + 
            ", diff=" + diff + 
            ". result=" + result)
    }
}

class GameOverState extends BaseState {

    enter() {
        super.enter();
        D.log("enter: GameOverState")
        D.log("score=" + GameResult.score)

        Audio.stopAll(this.bgm)

        // Laser beam left.
        this.laserBeamL.hidden = true;
        // Laser beam right.
        this.laserBeamR.hidden = true;
        // Mustache.
        this.mainFaceMesh.hidden = false;
        // Glasses.
        this.glasses.hidden = false;
    }

    exit() {
        D.log("exit: GameOverState")
        super.exit();
    }
}

// Layout the game states graph.
const idleState = new IdleState()
const gamingState = new GamingState()
const gameOverState = new GameOverState()

idleState.next(gamingState)
gamingState.next(gameOverState)
gameOverState.next(idleState)

// Start!!!
idleState.enter()

