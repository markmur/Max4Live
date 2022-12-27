outlets = 1;
debug = 0;

var rgb_colors = [
  [46, 56, 46],
  [80, 201, 206],
  [114, 161, 229],
  [152, 131, 229],
  [252, 211, 222],
  [12, 163, 127],
  [98, 75, 173],
  [136, 108, 228],
  [182, 119, 198],
  [191, 159, 190],
  [47, 82, 162],
  [0, 125, 192],
  [16, 164, 238],
  [60, 60, 60],
  [60, 60, 60]
];

var colors = [];

for (var i = 0; i < rgb_colors.length; i++) {
  colors.push(rgbToHex(rgb_colors[i][0], rgb_colors[i][1], rgb_colors[i][2]));
}

var theme = {
  "Light": colors,
  "Dark": colors,
  "Ocean": colors,
}

var themes = Object.keys(theme);

function setClipsToTrackColor(track, color) {
  var clipSlotCount = track.getcount("clip_slots");

  for (var i = 0; i < clipSlotCount; i++) {
    var clip_slot_path = track.path.replace(/['"]+/g, '') + " clip_slots " + i; //'
    post(clip_slot_path, "\n");
    var clipSlot = new LiveAPI(null, clip_slot_path);

    var clip_path = clip_slot_path + " clip";
    if (clipSlot.get("has_clip") == 1) {
      post(clip_path, color, "\n")
      var clip = new LiveAPI(null, clip_path);
      clip.set("color", color);
    }
  }
}

function setAllClipsToTrackColors() {
  var live_set = new LiveAPI(null, "live_set");
  var trackCount = live_set.getcount("tracks");

  for (var i = 0; i < trackCount; i++) {
    var track = new LiveAPI(null, "live_set tracks " + i);
    setClipsToTrackColor(track);
  }
}


function colorTracks() {
  var gradient = colors.slice(0);
  var live_set = new LiveAPI(null, "live_set");
  var trackCount = live_set.getcount("tracks");

  for (var i = 0, color; i < trackCount; i++) {
    var track = new LiveAPI(null, "live_set tracks " + i);
    var group = isGroup(track);

    if (group) {
      color = gradient.shift()
      post("TRACK --->", track.get("name"), group, "\n");
      post("Current Color --->", color, "\n");
    }

    if (color) {
      track.set("color", color);
      setClipsToTrackColor(track, color);
    }
  }
}

// COLOR HELPER FUNCTIONS
function rgbToHex(r, g, b) {
  return (Math.pow(2, 16) * r) + (Math.pow(2, 8) * g) + b;
}

function hexToRgb(result) {
  const r = (result - (result % Math.pow(2, 16))) / Math.pow(2, 16);
  const g = ((result % Math.pow(2, 16)) - ((result % Math.pow(2, 16)) % Math.pow(2, 8))) / Math.pow(2, 8);
  const b = result % Math.pow(2, 8);
  return [r, g, b];
}

// ABLETON HELPERS
function isGroup(track) {
  return track.get("is_grouped") == 0;
}

// ABLETON FUNCTIONS
function bang() {
  post("BANG ------");
  post("COLORS", colors);
  colorTracks()
}

function msg_int(i) {
  post("msg_init", themes[i]);
  colorTracks(theme[themes[i]])
}

function msg_float(color) {
  post("msg_float", color, "\n");
}

function list(a) {
  post("the list contains", arguments.length, "elements")
}