import request from '../request'
import {buildApiRequest} from "~/api/init";

export function getList(pageNum, pageSize) {
  return buildApiRequest(
    '/nav/list/'+ pageNum + '/' + pageSize,
    "get",
    null
  )

}

export function updateNav(nav) {
  return buildApiRequest(
    '/nav/updateNav',
    "post",
    nav
  )
}

export function addNav(nav) {
  return buildApiRequest(
    '/nav/addNav',
    "post",
    nav
  )

}

export function updateStatus(navId) {
  return buildApiRequest(
    '/nav/updateStatus/'+navId,
    "get",
    null
  )

}

export function del(navId) {
  return buildApiRequest(
    '/nav/doDel/'+navId,
    "get",
    null
  )
}

export function updateSort(ids) {
  return buildApiRequest(
    '/nav/updateSort',
    "post",
    ids
  )
}
