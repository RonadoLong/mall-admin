import {buildApiRequest} from "~/api/init";

export function getList(pageNum, pageSize) {
  return buildApiRequest(
      'service/list/' + pageNum + '/' + pageSize,
      'get'
  )
}

export function updateStatus(id, status) {
    return buildApiRequest(
        'service/update/' + id + '/' + status,
        'get',
    )
}

export function getClassList(pageNum, pageSize) {
    return buildApiRequest(
        'service/class/list/' + pageNum + '/' + pageSize,
        'get'
    )
}

export function updateClassStatus(id, status) {
    return buildApiRequest(
        'service/class/updateStatus/' + id + '/' + status,
        'get',
    )
}


export function updateClass(params) {
    return buildApiRequest(
        'service/class/update/',
        'post',
        params
    )
}

export function saveClass(params) {
    return buildApiRequest(
        'service/class/save',
        'post',
        params
    )
}

export function delClass(id) {
    return buildApiRequest(
        'service/class/del/' + id,
        'get',
    )
}

export function getSettingList(pageNum, pageSize) {
    return buildApiRequest(
        'service/setting/list/' + pageNum + '/' + pageSize,
        'get'
    )
}

export function addSetting(params) {
    return buildApiRequest(
        'service/setting/save',
        'post',
        params
    )
}

export function updateSettingStatus(params) {
    return buildApiRequest(
        'service/setting/updateStatus/',
        'post',
        params
    )
}

export function delSetting(id) {
    return buildApiRequest(
        'service/setting/del/' + id,
        'get',
    )
}



export function getPaymentSettingList(pageNum, pageSize) {
    return buildApiRequest(
        'service/payment/list/' + pageNum + '/' + pageSize,
        'get'
    )
}

export function addPaymentSetting(params) {
    return buildApiRequest(
        'service/payment/save',
        'post',
        params
    )
}

export function updatePaymentSettingStatus(id) {
    return buildApiRequest(
        'service/payment/updateStatus/'+ id,
        'get',
    )
}

export function delPaymentSetting(id) {
    return buildApiRequest(
        'service/payment/doDel/' + id,
        'get',
    )
}


