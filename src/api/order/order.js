import {buildApiRequest} from "~/api/init";

export function getList(status, pageSize, pageNum) {
  return buildApiRequest(
      'order/list/' + status + '/' + pageSize + '/' + pageNum,
      'get'
  )
}
