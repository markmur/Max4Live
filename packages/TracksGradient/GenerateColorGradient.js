function generateColorGradient(maxLength) {
  // Initialize an array to hold the gradient colors
  var gradientColors = [];

  // Define the start and end colors of the gradient
  var startColor = [255, 100, 0]; // red
  var endColor = [0, 100, 255]; // blue

  // Calculate the difference between the start and end colors for each channel
  var diffR = endColor[0] - startColor[0];
  var diffG = endColor[1] - startColor[1];
  var diffB = endColor[2] - startColor[2];

  // Calculate the step size for each channel
  var stepR = diffR / maxLength;
  var stepG = diffG / maxLength;
  var stepB = diffB / maxLength;

  // Generate the gradient colors
  for (var i = 0; i < maxLength; i++) {
    // Calculate the color for the current step
    var r = Math.round(startColor[0] + (stepR * i));
    var g = Math.round(startColor[1] + (stepG * i));
    var b = Math.round(startColor[2] + (stepB * i));

    // Add the color to the gradient array
    gradientColors.push(rgbToHex(r, g, b));
  }

  // Return the gradient colors
  return gradientColors;
}