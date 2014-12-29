// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", "searcher"], function($, ko, VKSearcher) {
  var viewModel = {
    status: ko.observable('active')
  };
  ko.applyBindings(viewModel, $('html')[0]);
  console.log(VKSearcher)
  searcher = new VKSearcher()
});
