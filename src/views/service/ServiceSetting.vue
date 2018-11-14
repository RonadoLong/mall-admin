<template>
    <div v-loading="listLoading" class="app-container calendar-list-container ">
        <div class="filter-container" style="margin-bottom: 1px;background-color: white; padding: 10px">
            <el-button class="filter-item" @click="handleCreate" type="primary" size="small" icon="el-icon-edit">New data</el-button>
        </div>

        <el-table :data="settingList" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="NO">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="name">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
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
                    <span>{{scope.row.create_at}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="updateTime">
                <template slot-scope="scope">
                    <span>{{scope.row.update_at }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="operation" class-name="small-padding" >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="handleDelete(scope.row)"></el-button>
                </template>
            </el-table-column>

        </el-table>


        <!-- modal -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

            <el-form :rules="rules" ref="dataForm" :model="temp"
                     label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="name" prop="name">
                    <el-input v-model="temp.name"></el-input>
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
    import {addSetting, delSetting, getSettingList, updateSettingStatus, updateStatus} from "~/api/service/service";

    export default {
        name: "ServiceSetting",
        data(){
            return {
                listLoading: false,
                settingList: [],
                pageNum: 1,
                pageSize: 10,
                total: 0,
                temp: {
                    id: null,
                    name: null,
                    status: 1
                },
                textMap: {
                    update: 'create data',
                    create: 'update data'
                },
                dialogFormVisible: false,
                dialogStatus: null,
                rules: {
                    name: [{required: true, message: 'name is required', trigger: 'blur'}],
                }
            }

        },
        mounted() {
            this.listLoading = true;
            this.loadData();
        },
        methods:{
            handleCreate(){
                this.dialogFormVisible = true
                this.dialogStatus = 'create'
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            loadData(){
                this.listLoading = true;
                getSettingList(this.pageNum, this.pageSize).then(res => {
                   console.log(res)
                   this.listLoading = false;
                   if (res.code === 200) {
                       this.total = res.data.total;
                       this.settingList = res.data.content;
                   }
               })
            },
            createData(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        addSetting(this.temp).then(() => {
                            this.loadData();
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: 'tip',
                                message: 'create success',
                                type: 'success',
                                duration: 2000
                            })
                            this.loadData()
                        })
                    }
                })
            },
            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        const tempData = Object.assign({}, this.temp)
                        console.log(tempData)
                        addSetting(tempData).then(() => {
                            this.loadData();
                            this.dialogFormVisible = false
                            this.$notify({
                                title: 'tip',
                                message: 'create success',
                                type: 'success',
                                duration: 2000
                            })
                            this.loadData()
                        })
                    }
                })
            },
            handleEdit(row){
                this.temp = Object.assign({}, row) // copy obj
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleDelete(row){
                this.$confirm('Danger action, go on?', 'Tip', {
                    confirmButtonText: 'sure',
                    cancelButtonText: 'cancel',
                    type: 'warning'
                }).then(() => {
                    delSetting(row.id).then(res => {
                        if (res.code === 200){
                            this.$message({
                                type: 'info',
                                message: 'delete success'
                            });
                        }
                        this.loadData()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'cancel success'
                    });
                });
            },
            handleCurrentChange(val){
                console.log(`当前页: ${val}`);
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.loadData()
            },
            handleUpdateStatus(row){
                let params = {
                    id: row.id,
                    status: row.status === '1' ? '0' : '1'
                }
                updateSettingStatus(params).then(res=>{
                    console.log(res)
                   this.loadData()
                })
            }
        }
    }
</script>

<style scoped>

</style>