

define(['jquery', 'VK'], function($) {
  console.log($)
  VKSearcher = function() {
    console.log('initing')
    var self = this;
    this.user_id = undefined;
    var loginDeferred = $.Deferred()
    console.log(loginDeferred)
    this.loggedIn = loginDeferred.promise();

    // initing VK
    VK.init({
      apiId: '4381058'
    })

    VK.Auth.login(function(data){
      self.user_id = data.session.user.id;
      loginDeferred.resolve()
    })
  }


  VKSearcher.prototype.BFS_search = function(initialNode, isStop, discoverNodes) {
    var queue = [{value: initialNode, path: [initialNode]}];
    var curPath = [];
    var deferred = $.Deferred();
    var parsedNodes = 0;


    // checks if seeking node was discovered
    function check(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (isStop(nodes[i].value)){
          console.log(nodes[i].path)
          return true
        }
      }
      return false
    }

    function addPaths(nodes, parentPath) {
      var res = [];
      for (var i = 0; i < nodes.length; i++) {
        temp = {
          value: nodes[i],
          path: parentPath.concat([nodes[i]])
        }
        res.push(temp)
      }
      return res;
    }

    function parseNewNodes(nodes) {
      if (check(nodes))
        return deferred.resolve()
      queue = nodes.concat(queue);
      if (queue.length === 0)
        deferred.reject()
      parsedNodes++;
      var parsingNode = queue.pop();
      discoverNodes(parsingNode.value).then(function(nodes) {
        nodesWithPaths = addPaths(nodes, parsingNode.path);
        parseNewNodes(nodesWithPaths);
      });
    }

    // launching search
    parseNewNodes([])
    return deferred.promise()
  }


  VKSearcher.prototype.getFriends = function(user_id) {
    user_id = user_id || this.user_id;
    var deferred = $.Deferred();
    console.log('looking for friends of ', user_id);

    var apiCall = function() {
      VK.Api.call('friends.get', {user_id: user_id}, function(resp) {
        console.log(resp);
        if (resp.error && resp.error.error_code === 6)
          setTimeout(apiCall, 400)
        else
          deferred.resolve(resp.response)
      });
    }

    apiCall();
    return deferred.promise();
  }
  return VKSearcher;
})
