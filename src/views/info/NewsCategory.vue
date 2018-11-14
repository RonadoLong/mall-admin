<template>
    <div class="app-container">

        <div class="filter-container" style="margin-bottom: 1px;background-color: white; padding: 10px">
            <el-button class="filter-item" @click="handleCreate" size="small" type="primary" icon="el-icon-edit">New
                Data
            </el-button>
        </div>

        <el-table :data="userList" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column fixed prop="id" label="NO" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="title" align="center" label="title">
            </el-table-column>

            <el-table-column prop="sort" align="center" label="sort">
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

            <el-table-column width="100" align="center" prop="status" label="status">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === 1 ? 'primary' : 'success'"
                            close-transition>{{scope.row.status === 1 ? 'online':'offline'}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="operation" fixed="right" align="center" min-width="140">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">edit</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">delete
                    </el-button>
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
    import * as BaseAPI from '../../api/info/info'
    import moment from 'moment'

    export default {
        name: "NewsCategory",
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
            this.getList();
        },
        methods: {
            getList() {
                BaseAPI.getNewsClassList(this.currentPage, this.pageSize).then(res => {
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
                this.getList();
            },
            handleCreate() {

            },
            parseTime(time) {
                return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

