<template>
    <div v-loading="listLoading" class="app-container">

        <div class="filter-container" style="margin-bottom: 1px;background-color: white; padding: 10px">
            <el-button class="filter-item" @click="handleCreate" size="small" type="primary" icon="el-icon-edit">add
                Goods
            </el-button>
        </div>

        <el-table :data="goodsList" border fit highlight-current-row style="width: 100%">
            <el-table-column fixed prop="product_id" label="NO" align="center" width="80">
            </el-table-column>
            <el-table-column prop="title" align="center" label="title">
            </el-table-column>
            <el-table-column prop="sell_point" align="center" label="sellPoint">
            </el-table-column>

            <el-table-column align="center" label="goodsImage">
                <template slot-scope="scope">
                    <img :src="scope.row.goods_images" style="width: 50%"/>
                </template>
            </el-table-column>

            <el-table-column prop="member_price" align="center" label="memberPrice">
            </el-table-column>

            <el-table-column prop="price" align="center" label="price">
            </el-table-column>

            <el-table-column prop="stock" align="center" label="stock">
            </el-table-column>

            <el-table-column width="100" align="center" prop="status" label="status">
                <template slot-scope="scope">
                    <el-button :type="scope.row.status === 1?'success':'danger'"
                               size="mini" @click="handleUpdateStatus(scope.row)">
                        {{scope.row.status === 1?'Online':'Offline'}}
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column width="160" align="center" label="createTime">
                <template slot-scope="scope">
                    <span>{{parseTime(scope.row.create_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column width="160" align="center" label="updateTime">
                <template slot-scope="scope">
                    <span>{{parseTime(scope.row.update_time) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="operation" fixed="right" align="center" width="100">
                <template slot-scope="scope">
                    <!--<el-button @click="handleEdit(scope.$index, scope.row)" type="info" icon="el-icon-info" size="small" circle></el-button>-->
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit"
                               size="small" circle></el-button>

                    <!--<el-button type="info" icon="el-icon-info" size="small" circle @click="handleEdit(scope.$index, scope.row)">edit</el-button>-->
                    <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">delete</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 60px;text-align: center">
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
    import * as BaseAPI from '../../api/goods/goods'
    import moment from 'moment'

    export default {
        name: "Goods",
        data() {
            return {
                goodsList: [],
                listLoading: true,
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
        mounted() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                this.listLoading = true;
                BaseAPI.getGoodsList(this.currentPage, this.pageSize).then(res => {
                    this.listLoading = false;
                    if (res.code === 200) {
                        this.total = res.data.total;
                        this.goodsList = res.data.content;
                    }
                })
            },
            updateSkuActive(index, row) {

            },
            handleEdit(index, rows) {
                console.log(rows)
                this.$router.push({path: '/add_goods/?goods=' + JSON.stringify(rows)});
            },
            handleDelete(index, rows) {

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.getGoodsList();
            },
            handleCreate() {
                this.$router.push({path: '/add_goods'})
            },
            handleUpdateStatus(row) {
                console.log(row)
            },
            parseTime(time){
               return moment(time).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>
