import {buildApiRequest} from "~/api/init";

export function getUserList(pageSize, pageNum) {
  return buildApiRequest(
      'member/list/' + pageSize + '/' + pageNum,
      'get'
  )
}
