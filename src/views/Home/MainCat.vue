<template>
    <div class="app-container calendar-list-container" v-loading.body="listLoading">

        <div class="filter-container" style="margin-bottom: 1px;background-color: white; padding: 10px">
            <el-button class="filter-item" @click="handleCreate" style="margin-left: 10px;" size="small" type="primary"
                       icon="el-icon-edit">Add
            </el-button>
            <el-button v-if="isUpdateSort === true" class="filter-item" style="margin-left: 10px;" @click="updateSort"
                       type="primary" icon="el-icon-refresh">update sort
            </el-button>
        </div>

        <el-table :data="carouselList"  border fit highlight-current-row  style="width: 100%">
            <el-table-column align="center" label="NO" width="65">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="80px" align="center" label="title">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column width="160px" align="center" label="en_title">
                <template slot-scope="scope">
                    <span>{{scope.row.en_title}}</span>
                </template>
            </el-table-column>


            <!--<el-table-column width="110px" align="center" label="type">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.type}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column align="center" label="category" width="95">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.class_id}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column class-name="status-col" label="status" width="110" align="center">
                <template slot-scope="scope">
                    <el-button :type="scope.row.status === 1?'success':'danger'"
                               size="mini" @click="handleUpdateStatus(scope.row)">
                        {{scope.row.status === 1?'Online':'Offline'}}
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="createTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.create_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="updateTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.update_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="drag" width="95">
                <template slot-scope="scope">
                    <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
                </template>
            </el-table-column>

            <el-table-column align="center" width="200" label="operation" class-name="small-padding">
                <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit"
                                   size="small" circle>
                        </el-button>

                        <el-button @click="handleDelete( scope.row)" type="danger" icon="el-icon-delete"
                                   size="small" circle>
                        </el-button>
                </template>
            </el-table-column>

        </el-table>


        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
                     style='width: 400px; margin-left:50px;'>
                <el-form-item label="title" prop="title">
                    <el-input v-model="temp.title"></el-input>
                </el-form-item>

                <el-form-item label="en_title" prop="en_title">
                    <el-input v-model="temp.en_title"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">Summit</el-button>
                <el-button v-else type="primary" @click="updateData">Summit</el-button>
            </div>
        </el-dialog>

        <!--<div class='show-d'>拖拽后顺序{{newList}}</div>-->
    </div>
</template>

<script>
    import * as BaseAPI from "../../api/home/nav";
    import Sortable from 'sortablejs'
    import moment from 'moment'

    export default {
        name: 'MainCat',
        data() {
            return {
                carouselList: [],
                pageNum: 1,
                pageSize: 10,
                listLoading: false,
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                temp: {
                    id: undefined,
                    title: '',
                    en_title: '',
                    status: 1,
                },
                rules: {
                    type: [{required: true, message: 'type is required', trigger: 'change'}],
                    title: [{required: true, message: 'title is required', trigger: 'blur'}],
                    en_title: [{required: true, message: 'en_title is required', trigger: 'change'}],
                },
                olderList: [],
                newList: [],
                sortable: null,
                isUpdateSort: false,
            }
        },
        mounted() {
            this.getNavList();
        },
        methods: {
            getNavList() {
                this.listLoading = true;
                BaseAPI.getList(this.pageNum, this.pageSize).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.carouselList = res.data.content;
                        this.olderList = this.carouselList.map(v => v.id)
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
                    BaseAPI.del(row.id).then(res => {
                        this.listLoading = false;
                        if (res.code === 200) {
                            this.getNavList();
                            this.$notify({
                                title: 'Tip',
                                message: 'success',
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$notify({
                                title: 'Tip',
                                message: 'fail',
                                type: 'fail',
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
                BaseAPI.updateStatus(row.id).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.getNavList();
                        this.$notify({
                            title: 'Tip',
                            message: 'success',
                            type: 'success',
                            duration: 2000
                        })
                    } else {
                        this.$notify({
                            title: 'Tip',
                            message: 'fail',
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
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleEdit(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    title: '',
                    status: '',
                    en_title: ''
                }
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        BaseAPI.addNav(this.temp).then(res => {
                            this.listLoading = false;
                            this.getNavList();
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: 'Tip',
                                message: 'success',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp)
                        BaseAPI.updateNav(tempData).then(() => {
                            this.listLoading = false;
                            this.getNavList();
                            this.dialogFormVisible = false
                            this.$notify({
                                title: 'Tip',
                                message: 'success',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
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
                            title: 'Tip',
                            message: 'success',
                            type: 'success',
                            duration: 2000
                        })
                    }
                })
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
</style>
