require.config({
  // make bower_components more sensible
  // expose jquery
  shim: {
    "VK": {
      exports: "VK"
    }
  },
  paths: {
    "bower_components": "../bower_components",
    "jquery": "../bower_components/jquery/dist/jquery"
  },
  map: {
    "*": {
      "knockout": "../bower_components/knockout.js/knockout",
      "ko": "../bower_components/knockout.js/knockout",
      "VK": "//vk.com/js/api/openapi.js",
      "Snap": "../bower_components/snap.svg/dist/snap.svg-min.js"
    }
  }
});

// Use the debug version of knockout it development only
// When compiling with grunt require js will only look at the first
// require.config({}) found in this file
// require.config({
//   map: {
//     "*": {
//       "knockout": "../bower_components/knockout.js/knockout-2.3.0.debug",
//       "ko": "../bower_components/knockout.js/knockout-2.3.0.debug"
//     }
//   }
// });

if (!window.requireTestMode) {
  require(['main'], function(){ });
}
