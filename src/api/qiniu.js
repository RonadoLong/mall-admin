import request from 'request'
import {buildApiRequest} from "~/api/init";

export function getToken() {
  return buildApiRequest(
      '/resource/image/token/', // 假地址 自行替换
     'get'
  )
}
