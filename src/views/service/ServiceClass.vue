<template>
    <div v-loading="listLoading" class="app-container calendar-list-container ">

        <div class="filter-container" style="margin-bottom: 1px;background-color: white; padding: 10px">
            <el-button class="filter-item" @click="handleCreate" type="primary" size="small" icon="el-icon-edit">
                New data
            </el-button>
        </div>

        <el-table :data="navList" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="NO">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="img_url">
                <template slot-scope="scope">
                    <img :src="scope.row.img_url" style="width: 30%"/>
                </template>
            </el-table-column>

            <el-table-column align="center" label="name">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="en_name">
                <template slot-scope="scope">
                    <span>{{scope.row.en_name}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="status" align="center">
                <template slot-scope="scope">
                    <el-button :type="scope.row.status === 1?'success':'danger'"
                               size="mini" @click="handleUpdateStatus(scope.row)">
                        {{scope.row.status === 1?'Online':'Offline'}}
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column align="center" label="createTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.create_at) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="updateTime">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.update_at) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="operation" class-name="small-padding">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" circle
                               @click="handleEdit(scope.row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" circle
                               @click="handleDelete(scope.row)"></el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- modal -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

            <el-form :rules="rules" ref="dataForm" :model="temp"
                     label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="Name" prop="name">
                    <el-input v-model="temp.name"></el-input>
                </el-form-item>

                <el-form-item label="EnName" prop="en_name">
                    <el-input v-model="temp.en_name"></el-input>
                </el-form-item>

                <el-form-item label="Image" prop="img_url">
                    <upload v-on:uploadSuccess="uploadSuccess" :img_url="temp.img_url"/>
                </el-form-item>

                <el-form-item label="Setting">
                    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">-->
                        <!--checkAll-->
                    <!--</el-checkbox>-->
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"
                                       style="width: 400px;">
                        <el-checkbox v-for="item in settings" :label="item.name" :key="item.id">{{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">cancel</el-button>
                <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">sure</el-button>
                <el-button v-else type="primary" @click="updateData">sure</el-button>
            </div>
        </el-dialog>

        <div style="margin-top: 10px;text-align: center;background-color: white; padding: 10px">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNum"
                    layout="total, prev, pager, next"
                    :page-size="pageSize"
                    :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>

    import * as BaseAPI from '../../api/service/service'
    import upload from '../../components/upload/Upload'
    import {getSettingList} from "~/api/service/service";
    import moment from 'moment'

    export default {
        components: {upload},
        name: 'ServiceClass',
        data() {
            return {
                navList: [],
                pageNum: 1,
                pageSize: 10,
                total: 0,
                listLoading: false,
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                temp: {
                    id: null,
                    name: '',
                    en_name: '',
                    status: 1,
                    img_url: '',
                    settings: []
                },
                rules: {
                    img_url: [{required: true, message: 'img_url is required', trigger: 'change'}],
                    name: [{required: true, message: 'name is required', trigger: 'blur'}],
                    en_name: [{required: true, message: 'en_name is required', trigger: 'blur'}],
                    // settings: [{required: true, message: 'settings is required', trigger: 'blur'}],
                },
                olderList: [],
                newList: [],
                sortable: null,
                isUpdateSort: false,
                postData: '',
                dialogVisible: false,
                checkAll: false,
                checkedCities: [],
                settings: [],
                isIndeterminate: true
            }
        },
        mounted() {
            this.listLoading = true;
            this.getClassList();
            this.getSettings();
        },
        methods: {
            getSettings() {
                getSettingList(1, 100).then(res => {
                    if (res.code === 200) {
                        this.settings = res.data.content
                    }
                })
            },
            getClassList() {
                BaseAPI.getClassList(this.pageNum, this.pageSize).then(res => {
                    console.log(res)
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.total = res.data.total;
                        this.navList = res.data.content;
                    }
                })
            },
            handleDelete(row) {
                this.$confirm('Danger action, go on?', 'Tip', {
                    confirmButtonText: 'sure',
                    cancelButtonText: 'cancel',
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    BaseAPI.delClass(row.id).then(res => {
                        this.listLoading = false;
                        if (res.code === 200) {
                            this.getClassList();
                            this.$notify({
                                title: 'success',
                                message: 'delete success',
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$notify({
                                title: 'fail',
                                message: 'delete fail',
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
                let status = row.status === 0 ? 1 : 0
                BaseAPI.updateClassStatus(row.id, status).then(res => {
                    if (res.code === 200) {
                        this.getClassList();
                        this.$notify({
                            title: 'success',
                            message: 'update success',
                            type: 'success',
                            duration: 2000
                        })
                    } else {
                        this.$notify({
                            title: 'Fail',
                            message: 'update fail',
                            type: 'fail',
                            duration: 2000
                        })
                    }
                })
            },
            handleCreate() {
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
                this.reset()
            },
            handleEdit(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.checkedCities = this.temp.settings
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },

            reset() {
                let temp = {
                    id: null,
                    name: '',
                    en_name: '',
                    status: 1,
                    img_url: '',
                    settings: []
                }
                this.temp = temp
            },

            createData() {
                console.log(this.checkedCities)
                console.log(this.temp)
                this.temp.settings = this.checkedCities;
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        BaseAPI.saveClass(this.temp).then(() => {
                            this.getClassList();
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: 'success',
                                message: 'create success',
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
                        this.listLoading = true;
                        this.temp.settings = this.checkedCities
                        const tempData = Object.assign({}, this.temp)
                        console.log(tempData)
                        BaseAPI.saveClass(tempData).then(() => {
                            this.getClassList();
                            this.dialogFormVisible = false
                            this.$notify({
                                title: 'success',
                                message: 'update success',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },

            handlePictureCardPreview(file) {
                this.temp.img_url = file.url;
                this.dialogVisible = true;
            },

            uploadSuccess(fileUrl) {
                console.log("callback ====> ", fileUrl)
                this.temp.img_url = fileUrl;
            },

            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.listLoading = true;
                this.getClassList();
            },

            handleCheckAllChange(val) {
                this.checkedCities = val ? this.settings : [];
                this.$set(this.checkedCities, this.checkedCities);

                console.log(this.checkedCities)
                this.isIndeterminate = val;
            },

            handleCheckedCitiesChange(value) {
                console.log(value)
                let checkedCount = value.length;
                this.checkedCities = value
                this.checkAll = checkedCount === this.settings.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.settings.length;
            },
            parseTime(time) {
                return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        },


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
        border-radius: 6px !important;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 400px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .calendar-list-container .avatar-uploader-icon {
        width: 330px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
    }

    .calendar-list-container .avatar-uploader-icon:before {
        font-size: 28px;
        color: #8c939d;
        line-height: 200px;
        text-align: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        height: 180px;
        width: 375px;
        line-height: 180px;
        text-align: center;
    }

    .avatar {
        display: block;
        height: 180px;
        width: 375px;
    }

    .el-icon-upload {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 20px;
        color: rgba(20, 19, 20, 0.88);
        height: 180px;
        width: 375px !important;
        line-height: 180px;
        text-align: center;
    }

</style>
