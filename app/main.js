// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", "searcher"], function($, ko, VKSearcher) {
  var viewModel = {
    status: ko.observable('active')
  };
  ko.applyBindings(viewModel, $('html')[0]);
  searcher = new VKSearcher()
  console.log(searcher);
  searcher.loggedIn.then(function() {
    var finalNode = '16890665'
    var stopFunc = function(node) {
      return node == finalNode ? true : false
    }
    console.log('starting search');
    searcher.BFS_search(searcher.user_id, stopFunc, searcher.getFriends).then(function() {
      console.log('finished');
    })
  })
});
