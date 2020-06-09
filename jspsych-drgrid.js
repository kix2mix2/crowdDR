/**
 * jspsych-draw-scatterplot
 * Custom plugin for drawing a scatterplot.
 */

function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

jsPsych.plugins['dr-grid'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('dr-grid', 'stimuli', 'image');

  plugin.info = {
    name: 'dr-grid',
    description: 'grid of DR projections',
    parameters: {
      drgrid: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Grid of projections',
        default: Grid,
        description: 'Create one specific instance of grids.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'It can be used to provide a reminder about the action the subject is supposed to take.'
      },
      prompt_location: {
        type: jsPsych.plugins.parameterType.SELECT,
        pretty_name: 'Prompt location',
        options: ['above','below'],
        default: 'above',
        description: 'Indicates whether to show prompt "above" or "below" the sorting area.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Finish!',
        description: 'The text that appears on the button to continue to the next trial.'
      }
    }
  };

  plugin.trial = function(display_element, trial) {

    const start_time = performance.now();
    console.log('Heyooo')

    let html = "";
    // check if there is a prompt and if it is shown above
    if (trial.prompt !== null && trial.prompt_location == 'above') {
      html += trial.prompt;
    }

    html += '<div id="jspsych-grid-area" class="container-fluid"></div>';

    // check if prompt exists and if it is shown below
    if (trial.prompt !== null && trial.prompt_location == 'below') {
      html += trial.prompt;
    }

    display_element.innerHTML = html;
    display_element.innerHTML += '<button id="jspsych-done-btn" class="jspsych-btn" disabled>'+trial.button_label+'</button>';

    // Initialize scatterplot
    let grid = new trial.drgrid({
      parentElement: '#jspsych-grid-area',
      containerWidth: 600,
      containerHeight: 600,
      rows:5,
      cols:4,
      images: fillArray('img/stanfordfaces_size50_call_UMAP_n7_d0.5.png', 20)
    });


    display_element.querySelector('#jspsych-done-btn').addEventListener('click', function() {
      const end_time = performance.now();
      const rt = end_time - start_time;

      // Get final position of all objects
      const positions = grid.getAllCoordinates();

      const trial_data = {
        "rt": rt,
        "positions": positions
      };

      // Advance to next part
      display_element.innerHTML = '';
      jsPsych.finishTrial(trial_data);
    });
  };
  
  return plugin;
})();