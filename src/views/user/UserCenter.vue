<template>
    <div v-loading="listLoading" class="app-container">

        <el-table :data="userList" border fit highlight-current-row style="width: 100%">
            <el-table-column fixed prop="user_id" label="NO" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="nickname" align="center" label="nickname">
            </el-table-column>
            <el-table-column align="center" label="avatar">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" style="height: 50px"/>
                </template>
            </el-table-column>

            <el-table-column prop="integral" align="center" label="integral">
            </el-table-column>

            <el-table-column prop="commission" align="center" label="commission">
            </el-table-column>

            <el-table-column prop="recommend_code" align="center" label="recommendCode" min-width="140">
            </el-table-column>

            <el-table-column align="center" label="createTime" min-width="160">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.create_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="updateTime" min-width="160">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.update_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="lastLoginTime" min-width="160">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.login_Time) }}</span>
                </template>
            </el-table-column>

            <el-table-column width="100" align="center" prop="status" label="status">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === 1 ? 'primary' : 'success'"
                            close-transition>{{scope.row.status === 1 ? 'online':'offline'}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="operation" fixed="right" align="center" width="120">
                <template slot-scope="scope">
                    <el-button size="small" type="success" icon="el-icon-edit" circle
                               @click="handleEdit(scope.$index, scope.row)"></el-button>

                    <!--<el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">edit</el-button>-->
                    <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">delete</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 10px;text-align: center;background-color: white; padding: 10px">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next"
                    :page-size="pageSize"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>
<script>
    import * as BaseAPI from '../../api/user/user'
    import moment from 'moment'

    export default {
        name: "UserCenter",
        data() {
            return {
                userList: [],
                listLoading: true,
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
        mounted() {
            this.getUserList();
        },
        methods: {
            getUserList() {
                BaseAPI.getUserList(this.currentPage, this.pageSize).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.total = res.data.total;
                        this.userList = res.data.content;
                    }
                })
            },
            updateSkuActive(index, row) {

            },
            handleEdit(index, rows) {

            },
            handleDelete(index, rows) {

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.listLoading = true;
                this.getUserList();
            },
            handleCreate() {

            },
            parseTime(time) {
                return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

