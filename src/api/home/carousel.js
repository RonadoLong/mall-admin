import request from '../request'
import {buildApiRequest} from "~/api/init";



export function getList(pageNum, pageSize) {
  // return request({
  //   url: '/carousel/list/' + pageNum + '/' + pageSize,
  //   method: 'get'
  // })

  return buildApiRequest('/carousel/list/'+ pageNum + '/' + pageSize,"get", null)
}

export function getClassIdList() {
  return buildApiRequest(
    '/class/list',
    "get",
    null
  )
}

export function updateCarousel(carousel) {
  return buildApiRequest(
    '/carousel/updateCarousel',
    "post",
    carousel
  )
}

export function addCarousel(carousel) {
  return buildApiRequest(
    '/carousel/addCarousel',
    "post",
    carousel
  )
}

export function updateStatus(carouselId) {
  return buildApiRequest(
    '/carousel/updateStatus/' + carouselId,
    "get",
  )
}

export function del(carouselId) {
  return buildApiRequest(
    '/carousel/doDel/' + carouselId,
    "get",
  )
}

export function updateSort(ids) {
  return buildApiRequest(
    '/carousel/updateSort',
    "get",
    ids,
  )

}
