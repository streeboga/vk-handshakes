// to depend on a bower installed component:
// define(['component/componentName/file'])

define(["jquery", "knockout", "searcher", "Snap", "VKModel"],
function($, ko, VKSearcher, Snap, VKModel) {
  searcher = new VKSearcher()
  vkmodel = new VKModel();


  function viewModel() {
    this.fromUrl=  ko.observable('http://vk.com/id'+vkmodel.user_id);
    this.fromImgSrc = ko.observable();
    this.fromId = ko.observable();
    this.fromUsername = ko.observable();
    this.toUrl = ko.observable();
    this.toImgSrc = ko.observable('http://lamcdn.net/lookatme.ru/post-image/rjedA4GKdy301WuFza4zZw-thumbnail.png');
    this.toId = ko.observable();
    this.toUsername = ko.observable('Введите адрес профиля пользователя');

    ko.computed(function() {
      var self = this;
      vkmodel.getUserInfo(this.fromUrl()).then(function(user) {
        self.fromId(user.uid);
        self.fromImgSrc(user.photo_100);
        self.fromUsername(user.first_name + ' ' + user.last_name);
      })
    }, this)

    ko.computed(function() {
      var self = this;
      vkmodel.getUserInfo(this.toUrl()).then(function(user) {
        self.toId(user.uid);
        self.toImgSrc(user.photo_100);
        self.toUsername(user.first_name + ' ' + user.last_name);
      })
    }, this)

    this.start = function() {
      console.log('starting');
      var self = this;
      var stopFunc = function(node) {
        return node == self.toId() ? true: false;
      }
      searcher.BFS_search(this.fromId(), stopFunc, vkmodel.getFriends).then(function(res) {
        console.log('finished ', res);
      })
    }
  }

  function bindView() {
    window.model = new viewModel();
    ko.applyBindings(window.model);
  }

  vkmodel.loggedIn.then(bindView)


  // console.log(Snap);
  //
  // var s = Snap('#svg');
  // console.log(s);
  // svgEl = $('#svg');
  // var width = svgEl.width()
  // var height = svgEl.height()
  // var minDist = 150;
  //
  // nodes = ['http://cs618926.vk.me/v618926473/4029/Vc0esYKv6G4.jpg',
  //         'http://cs618926.vk.me/v618926473/4029/Vc0esYKv6G4.jpg',
  //         'http://cs618926.vk.me/v618926473/4029/Vc0esYKv6G4.jpg',
  //         'http://cs618926.vk.me/v618926473/4029/Vc0esYKv6G4.jpg']
  //
  // var lines = [];
  // var avatars = [];
  //
  // function Draw(nodes, width, height) {
  //   var l = nodes.length;
  //   var imageWidth = 150;
  //   var imageHeight = 150;
  //   var totalSize = l*imageWidth + (minDist*(l-1));
  //   console.log(totalSize, width);
  //   var g = s.g();
  //   for (var i = 0; i < l; i++){
  //     var img = s.image(nodes[i], 0, 0, 150, 150)
  //     .attr({
  //       transform: "translateX(" + (i*imageWidth + i*minDist) +"px)"
  //     })
  //     .addClass('ava')
  //     g.add(img);
  //     avatars.push(img);
  //
  //
  //     if (i === (l-1))
  //       break;
  //     var startX = (i*imageWidth + i*minDist) + imageWidth
  //     var y = imageHeight/2;
  //     var line = s.line(startX, y, startX+minDist, y).attr({stroke: 'black'})
  //     g.add(line);
  //     lines.push(line);
  //   }
  //
  //     // position g
  //   var w = g.getBBox().width
  //   console.log(w);
  //   g.attr({
  //     transform: "translateX(" + (width-w)/2 + "px)"
  //   })
  //   console.log(g.getBBox());
  //   console.log(lines);
  //
  //   var animationTime = 500;
  //
  //   function animateLine(line, timeoffset) {
  //     setTimeout(function() {
  //       Snap.animate(300, 0, function(value) {
  //         line.attr({ 'stroke-dashoffset': value});
  //       }, animationTime)
  //     }, timeoffset)
  //   }
  //
  //   function animateAvatar(avatar, timeoffset) {
  //     console.log('animating avatar', avatar)
  //     setTimeout(function() {
  //       Snap.animate(0, 1, function(value) {
  //         avatar.attr({ 'opacity': value});
  //       }, animationTime)
  //     }, timeoffset)
  //   }
  //
  //   for (var i = 0; i < lines.length; i++)
  //     animateLine(lines[i], animationTime + animationTime*2*i );
  //
  //   for (var i = 0; i < avatars.length; i++)
  //     animateAvatar(avatars[i], animationTime*2*i)
  // }
  //
  // Draw(nodes, width, height)

});
