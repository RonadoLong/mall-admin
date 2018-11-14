<template>
    <div v-loading="listLoading" class="app-container calendar-list-container">

        <div class="filter-container" style="margin-bottom: 1px;background-color: white; padding: 10px">
            <el-button class="filter-item" @click="handleCreate" type="primary" size="small" icon="el-icon-edit">Add
                Class
            </el-button>
            <el-button v-if="isUpdateSort === true" class="filter-item" style="margin-left: 10px;" @click="updateSort"
                       type="primary" icon="el-icon-refresh">update sort
            </el-button>
        </div>

        <el-table :data="classList" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="number">
                <template slot-scope="scope">
                    <span>{{scope.row.class_id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="title">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="en_title">
                <template slot-scope="scope">
                    <span>{{scope.row.en_title}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="sort">
                <template slot-scope="scope">
                    <span>{{scope.row.sort}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="status" align="center">
                <template slot-scope="scope">
                    <el-button :type="scope.row.status === true ?'success':'danger'"
                               size="mini"
                               @click="handleUpdateStatus(scope.row)">
                        {{scope.row.status === true ?'onLine':'offLine'}}
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column align="center" label="createTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.create_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="updateTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.update_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="drag" width="95">
                <template slot-scope="scope">
                    <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
                </template>
            </el-table-column>

            <el-table-column align="center" label="operator" class-name="small-padding">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="small" circle
                               @click="handleEdit(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" circle
                               @click="handleDelete(scope.row)"></el-button>

                </template>
            </el-table-column>

        </el-table>

        <save-goods-class :dialogFormVisible="dialogFormVisible"
                          :temp="temp"
                          :dialogStatus="dialogStatus"
                          :goodsClassTreeList="goodsClassTreeList"
                          v-on:updateGoodsClass="updateGoodsClass"
                          v-on:addGoodsClass="addGoodsClass">
        </save-goods-class>

    </div>
</template>

<script>
    import * as BaseAPI from "../../api/goods/goods";
    import Sortable from 'sortablejs';
    import SaveGoodsClass from "./SaveGoodsClass";
    import moment from 'moment'

    export default {
        components: {SaveGoodsClass},
        name: 'GoodsClass',
        data() {
            return {
                dialogStatus: '',
                classList: [],
                dialogFormVisible: false,
                pageNum: 1,
                pageSize: 10,
                listLoading: false,
                temp: {
                    id: undefined,
                    name: '',
                    parent_id: '',
                },
                olderList: [],
                newList: [],
                sortable: null,
                isUpdateSort: false,
                goodsClassTreeList: []
            }
        },
        mounted() {
            this.listLoading = true;
            this.getClassList();
        },
        methods: {
            getClassList() {
                this.listLoading = true;
                BaseAPI.getClassList(this.pageNum, this.pageSize).then(res => {
                    console.log(res)
                    this.listLoading = false;
                    this.dialogFormVisible = false;
                    if (res.code === 200) {
                        this.classList = res.data.content;
                        this.olderList = this.classList.map(v => v.id)
                        this.newList = this.olderList.slice();
                        this.$nextTick(() => {
                            this.setSort()
                        })
                    }
                })
            },
            handleDelete(row) {
                this.$confirm('Danger action, go on delete ?', 'Tip', {
                    confirmButtonText: 'sure',
                    cancelButtonText: 'cancel',
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    BaseAPI.del(row.class_id).then(res => {
                        this.listLoading = false;
                        if (res.code === 200) {
                            this.getClassList();
                            this.$notify({
                                title: 'tip',
                                message: 'delete success',
                                type: 'success',
                                duration: 2000
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'cancel success'
                    });
                });

            },
            handleUpdateStatus(row) {
                this.listLoading = true;
                BaseAPI.updateStatus(row.class_id).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.getClassList();
                        this.$notify({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                    } else {
                        this.$notify({
                            title: '失败',
                            message: '更新失败',
                            type: 'fail',
                            duration: 2000
                        })
                    }
                })
            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
            handleEdit(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    name: '',
                    parentId: '',
                }
            },
            setSort() {
                const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
                this.sortable = Sortable.create(el, {
                    onEnd: evt => {
                        this.isUpdateSort = true;
                        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                        this.newList.splice(evt.newIndex, 0, tempIndex)
                    }
                })
            },
            updateSort() {
                console.log(this.newList);
                const ids = Object.assign([], this.newList);
                this.listLoading = true;
                BaseAPI.updateSort(ids).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.getNavList();
                        this.isUpdateSort = false;
                        this.$notify({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                    }
                })
            },
            addGoodsClass(temp) {
                this.listLoading = !this.listLoading
                this.dialogFormVisible = !this.dialogFormVisible
                BaseAPI.addGoodsClass(temp).then((res) => {
                    this.listLoading = !this.listLoading
                    if (res.code === 200) {
                        this.getClassList();
                        this.$notify({
                            title: '成功',
                            message: '创建成功',
                            type: 'success',
                            duration: 2000
                        })
                    }
                })
            },
            updateGoodsClass(temp) {
                this.listLoading = !this.listLoading
                this.dialogFormVisible = !this.dialogFormVisible
                BaseAPI.updateGoodsClass(temp).then((res) => {
                    this.listLoading = !this.listLoading
                    if (res.code === 200) {
                        this.getClassList();
                        this.$notify({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.temp.imgUrl = URL.createObjectURL(file.raw);
            },
            parseTime(time) {
                return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

<style scoped>
    .drag-handler {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .show-d {
        margin-top: 15px;
    }

    .drag-handler .avatar-uploader .el-upload:before {
        border: 1px dashed #d9d9d9 !important;
        border-radius: 6px !important;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 400px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon:before {
        font-size: 28px;
        color: #8c939d;
        line-height: 200px;
        text-align: center;
        padding-left: 50%;
    }

    .avatar {
        width: 100%;
        display: block;
    }
</style>
