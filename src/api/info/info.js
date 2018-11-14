import request from '../request'
import {buildApiRequest} from "~/api/init";

export function getNewsList(pageSize, pageNum) {
    return buildApiRequest(
        'info/news/list/' + pageSize + '/' + pageNum,
        'get'
    )
}

export function delNews(id) {
    return buildApiRequest(
        'info/news/del/' + id,
        'get'
    )
}

export function newsUpdateStatus(id) {
    return buildApiRequest(
        'info/news/updateStatus/' + id,
        'get'
    )
}

export function getNewsClassList(pageSize, pageNum) {
    return buildApiRequest(
        'info/news/class/list/' + pageSize + '/' + pageNum,
        'get'
    )
}

export function getVideoList(pageSize, pageNum) {
    return buildApiRequest(
        'info/video/list/' + pageSize + '/' + pageNum,
        'get'
    )
}


export function delVideo(id) {
    return buildApiRequest(
        'info/video/del/' + id,
        'get'
    )
}

export function videoUpdateStatus(id) {
    return buildApiRequest(
        'info/video/updateStatus/' + id,
        'get'
    )
}


export function getVideoClassList(pageSize, pageNum) {
    return buildApiRequest(
        'info/video/class/list/' + pageSize + '/' + pageNum,
        'get'
    )
}
