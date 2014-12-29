VKSearcher = function() {
  console.log('initing')
  // initing VK
  VK.init({
    apiId: '4381058'
  })
  VK.Auth.login(function(data){
    console.log(data);
  })
}


define(['VK'], function() {
  return VKSearcher;
})
