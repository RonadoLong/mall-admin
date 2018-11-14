
const devUrl = 'http://127.0.0.1:8090';
const proUrl = 'https://www.tohnet.com';


export default {
  apiUrl : __DEV__ ? devUrl : proUrl,
  apiPrefix : "/api/admin",
  gitHub : 'https://github.com/xusenlin/ElementUIAdmin'
}

