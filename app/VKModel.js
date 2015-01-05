define(['jquery', 'VK'], function($) {
    VKModel = function() {
      var self = this;
      this.users = {};
      this.user_id = undefined;
      this.loggedIn = this.auth();


    }

    VKModel.prototype.auth = function() {
        var self = this;
        var loginDeferred = $.Deferred()
        // initing VK
        VK.init({
          apiId: '4381058'
        })

        VK.Auth.login(function(data){
          console.log(data);
          self.user_id = data.session.user.id;
          loginDeferred.resolve()
        })
        return loginDeferred.promise();
    }


    VKModel.prototype.getUserInfoByUrl = function(url) {
      if (url == undefined || url  == '')
        return null;
      var r = /https?:\/\/vk.com\/([\w]+)/i;
      var matches = url.match(r);
      console.log(url, matches);
      if (matches == null)
        return null
      var user_id = matches[1];
      return this.getUserInfo(user_id);
    }


    VKModel.prototype.getUserInfo = function(user_id) {
      console.log('getting user info ', user_id )
      var self = this;
      var deferred = $.Deferred();
      var apiCall = function() {
        VK.Api.call('users.get',
        {
          user_ids: user_id,
          fields: 'photo_100, photo_200'
        }, function(resp) {
          if (resp.error && resp.error.error_code === 6) {
            console.log('req error', resp.error);
            setTimeout(apiCall, 600);
            return;
          }
          if (resp.error) {
            console.log('req error', resp.error)
            deferred.reject();
            return;
          }
          self.users[user_id] = resp.response[0];
          deferred.resolve(self.users[user_id]);
        })
      }

      if (this.users[user_id])
        deferred.resolve(this.users[user_id])
      else {
        console.log('not defined')
        // making requests
        apiCall();

      }
      return deferred.promise();
    }

    VKModel.prototype.getFriends = function(user_id) {
      user_id = user_id || this.user_id;
      var deferred = $.Deferred();
      console.log('looking for friends of ', user_id);

      var apiCall = function() {
        VK.Api.call('friends.get', {user_id: user_id}, function(resp) {
          if (resp.error && resp.error.error_code === 6){
            console.log('req err ', resp.error)
            setTimeout(apiCall, 600)
          }
          else
            deferred.resolve(resp.response)
        });
      }

      apiCall();
      return deferred.promise();
    }


    return VKModel;

})
