

define(['jquery', 'VK'], function($) {
  VKSearcher = function() {
  }


  VKSearcher.prototype.BFS_search = function(initialNode, isStop, discoverNodes) {
    var queue = [{value: initialNode, path: [initialNode]}];
    var curPath = [];
    var deferred = $.Deferred();
    var parsedNodes = 0;
    var result = undefined;


    // checks if seeking node was discovered
    function check(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (isStop(nodes[i].value)){
          console.log(nodes[i].path)
          result = nodes[i].path
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
        return deferred.resolve(result)
      queue = nodes.concat(queue);
      if (queue.length === 0)
        deferred.reject()
      parsedNodes++;
      var parsingNode = queue.pop();
      discoverNodes(parsingNode.value).then(function(nodes) {
        nodes = nodes || [];  // it could be received undefined
        nodesWithPaths = addPaths(nodes, parsingNode.path);
        parseNewNodes(nodesWithPaths);
      });
    }

    // launching search
    parseNewNodes([])
    return deferred.promise()
  }


  return VKSearcher;
})
