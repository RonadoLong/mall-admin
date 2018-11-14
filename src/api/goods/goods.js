import request from '../request'
import {buildApiRequest} from "~/api/init";

export function getClassList(pageNum, pageSize) {
    return buildApiRequest(
        '/goodsClass/list/' + pageNum + '/' + pageSize,
        "get",
    )
}

export function addGoodsClass(goodsClass) {
    return buildApiRequest(
        'goodsClass/addGoodsClass',
        "post",
        goodsClass
    )

}

export function updateGoodsClass(goodsClass) {
    return buildApiRequest(
        'goodsClass/updateGoodsClass',
        "post",
        goodsClass
    )
}

export function updateStatus(classId) {
    return buildApiRequest(
        'goodsClass/updateStatus/' + classId,
        "get",
        null
    )
}

export function getTreeList() {
    return buildApiRequest(
        'goodsClass/getTreeList',
        "get",
        null
    )
}

export function del(classId) {
    return buildApiRequest(
        'goodsClass/del/' + classId,
        "get",
        null
    )
}

export function updateSort(goodsClass) {
    return buildApiRequest(
        'goodsClass/updateSort',
        "Post",
        goodsClass
    )
}

export function addGoods(goods) {
    return buildApiRequest(
        'goods/addGoods',
        "post",
        goods
    )
}

export function getGoodsList(pageSize, pageNum) {
    return buildApiRequest(
        'goods/list/' + pageSize + '/' + pageNum,
        "get",
    )
}
