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

    VKModel.prototype.getUserInfo = function(url) {
      console.log('getting user info ', url )
      var self = this;
      var deferred = $.Deferred();
      if (url == undefined || url == ''){
        deferred.reject();
        return deferred.promise();
      }

      var r = /http:\/\/vk.com\/([\w]+)/i;
      var matches = url.match(r);
      if (matches == null) {
        console.log('no matches');
        deferred.reject();
        return deferred.promise();
      }

      var nickname = matches[1];
      console.log(nickname);
      if (this.users[nickname])
        deferred.resolve(this.users[nickname])
      else {
        console.log('not defined')
        // making requests
        VK.Api.call('users.get',
        {
          user_ids: nickname,
          fields: 'photo_100, photo_200'
        }, function(resp) {
          if (!resp.error) {
            self.users[nickname] = resp.response[0];
            deferred.resolve(self.users[nickname]);
          } else {
            deferred.reject();
          }
        })
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
