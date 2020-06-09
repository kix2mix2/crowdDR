/**
 * jspsych-draw-scatterplot
 * Custom plugin for drawing a scatterplot.
 */

jsPsych.plugins['draw-scatterplot'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('draw-scatterplot', 'stimuli', 'image');

  plugin.info = {
    name: 'draw-scatterplot',
    description: '',
    parameters: {
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'It can be used to provide a reminder about the action the subject is supposed to take.'
      },
      scatterplot: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Scatterplot class',
        default: null,
        description: 'D3 scatterplot implementation that can be used to create a specific instance.'
      },
      reference_image: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Reference image',
        default: undefined,
        description: 'Scatterplot image to be displayed as basis for drawing the scatterplot.'
      },
      prompt_location: {
        type: jsPsych.plugins.parameterType.SELECT,
        pretty_name: 'Prompt location',
        options: ['above','below'],
        default: 'below',
        description: 'Indicates whether to show prompt "above" or "below" the sorting area.'
      },
      min_points: {
        type: jsPsych.plugins.parameterType.INTEGER,
        pretty_name: 'Min points',
        default: 0,
        description: 'Number of points required to advance to next step.'
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
    let scatterplot = new trial.scatterplot({
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