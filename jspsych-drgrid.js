/**
 * jspsych-draw-scatterplot
 * Custom plugin for drawing a scatterplot.
 */

jsPsych.plugins['dr-grid'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('draw-scatterplot', 'stimuli', 'image');

  plugin.info = {
    name: 'dr-grid',
    description: 'grid of DR projections',
    parameters: {
      drgrid: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Grid of projections',
        default: null,
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
        default:  'Continue',
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

    html += '<div id="jspsych-draw-scatterplot-area"></div>';

    // check if prompt exists and if it is shown below
    if (trial.prompt !== null && trial.prompt_location == 'below') {
      html += trial.prompt;
    }

    display_element.innerHTML = html;
    display_element.innerHTML += '<button id="jspsych-draw-scatterplot-done-btn" class="jspsych-btn" disabled>'+trial.button_label+'</button>';

    // Initialize scatterplot
    let grid = new trial.drgrid({
      parentElement: '#jspsych-draw-scatterplot-area',
      containerWidth: 300,
      containerHeight: 300
    });

    display_element.querySelector('.tracking-area').addEventListener('click', function() {
      if (display_element.querySelectorAll('.point').length >= trial.min_points) {
        document.getElementById('jspsych-draw-scatterplot-done-btn').disabled = false;
      }
    });

    display_element.querySelector('#jspsych-draw-scatterplot-done-btn').addEventListener('click', function() {
      const end_time = performance.now();
      const rt = end_time - start_time;

      // Get final position of all objects
      const positions = scatterplot.getAllCoordinates();

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