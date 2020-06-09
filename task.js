/* load psiturk */
// var psiturk = new PsiTurk(uniqueId, adServerLoc, mode);

console.log('heyhey');

// generate a random subject ID with 15 characters
var subject_id = jsPsych.randomization.randomID(15);

// pick a random condition for the subject at the start of the experiment
var condition_assignment = jsPsych.randomization.sampleWithoutReplacement(['conditionA', 'conditionB', 'conditionC'], 1)[0];


var timeline = [];


var welcome_block = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin.",
    choices: jsPsych.ALL_KEYS
};

timeline.push(welcome_block);
// timeline.push({
//   type: 'fullscreen',
//   fullscreen_mode: true
// });

var instructions_block_1 = {
    type: "html-keyboard-response",
    stimulus: "<div class='jspsych-display-element'><p>In this experiment, you will be shown 4 scatterplots " +
        "of the screen at once.</p>  " +
        "<img src=\"img/inst1.png\"  width='600'>" +
        "<p>Press any key to continue.</p></div>",
    timing_post_trial: 1000,
    choices: jsPsych.ALL_KEYS
};
var instructions_block_3 = {
    type: "html-keyboard-response",
    stimulus:
        "<div class='jspsych-display-element'><p>You may hover over the points, or zoom in and out particular scatterplots. </p>" +
        "<p><img src=\"/static/images/inst2.png\" width='400'> </p>" +
         "<p><img src=\"/static/images/inst3.gif\"  width='600'></p>" +

        "<p>Press any key to continue.</p> </div>",
    choices: jsPsych.ALL_KEYS,
    timing_post_trial: 400,
    // on_finish: function(){
    //     psiturk.finishInstructions();
    // }
};


var scaterplot_trial = {
    type:'draw-scatterplot',
    reference_image:'hi?',
    prompt: 'yo yo',
    scatterplot: Scatterplot

};

var drgrid_trial = {
    type:'dr-grid',
    prompt: 'yo yo',
    drgrid: Grid

};

// timeline.push(instructions_block_1);
// timeline.push(scaterplot_trial);
timeline.push(drgrid_trial);
// timeline.push(instructions_block_3);


/* record id, condition, counterbalance on every trial */
jsPsych.data.addProperties({
    uniqueId: subject_id,
    condition: condition_assignment,
});

jsPsych.init({
    display_element: 'task',
    exclusions: {
        min_width: 800,
        min_height: 600
      },
    on_interaction_data_update: function(data) {
                console.log(JSON.stringify(data))},
    show_progress_bar: true,
    auto_update_progress_bar: true,
    timeline: timeline,
    // record data to psiTurk after each trial
    // on_data_update: function(data) {
    //     psiturk.recordTrialData(data);
    // },
    on_finish: function() {
        // record proportion correct as unstructured data
        console.log('yo yo');
        jsPsych.data.displayData();
        // psiturk.recordUnstructuredData("bonus", jsPsych.data.get()
        //                                .filter([{stimulus_type: 'incongruent'},
        //                                         {stimulus_type: 'congruent'},
        //                                         {stimulus_type: 'unrelated'}])
        //                                .select('correct')
        //                                .mean()
        //                                .toFixed(2));
        // // save data
        // psiturk.saveData({
        //
        //     success: function() {
        //         console.log('yo yo');
        //         // upon saving, add proportion correct as a bonus (see custom.py) and complete HIT
        //         psiturk.computeBonus("compute_bonus", function () {
        //             psiturk.completeHIT();
        //         });
        //     }
        // });
    },
});
