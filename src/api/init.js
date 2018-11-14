import ElementUI from 'element-ui';
import Axios from 'axios';
import Config from '../config';

function buildApiUrl(url) {
  return `${Config.apiUrl}/${Config.apiPrefix}/${url}`;
}

function setToken() {
  Axios.defaults.headers['Authorization'] = sessionStorage.getItem(Config.tokenKey);
}

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

export function buildApiRequest(url, type, params) {
  return new Promise(((resolve, reject) => {
      setToken();
      if ('get' === type) {
          //做一些加载的小动画挺好
          params={params:params}
      }
      let apiUrl = buildApiUrl(url);
     Axios[type](apiUrl, params).then(r => {
          r = r.data;
          //这里可以根据后台数据进一步做一些过滤或者报错之类的
          resolve(r);
      }).catch(e => {
          if(__DEV__)
              console.log(e);
          reject(e);
          ElementUI.Notification.error({
              title: 'Request Fail',
              message: 'Network Error'
          });
      });
  }))
}

// export function buildApiRequest(url, type) {
//    buildApiRequest(url,type,null)
// }


export function getApiUrl(url) {
  //只是返回api地址而不做请求，用在上传组件之类的
  return buildApiUrl(url) + '?token=' + sessionStorage.getItem(Config.tokenKey);
}

