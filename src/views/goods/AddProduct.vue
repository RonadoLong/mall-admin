<template>
  <div class="app-container addGoods" v-loading="listLoading" style="padding-left:20px; background:#fff;">
    <el-collapse v-model="activeNames" @change="handleChange" >

      <el-collapse-item name="1" >

        <template slot="title">
          <i class="listLine"></i><span class="title">BaseInfo</span>
        </template>

        <br>
        <el-form :model="goods" ref="goods" label-width="140px" class="demo-ruleForm">
          <el-form-item label="Category : " prop="goodsClass" >
            <div class="block">
              <el-select v-model="goods.category_id" placeholder="selected category">
                <el-option v-for="item in goodsClassList"
                  :key="item.class_id"
                  :label="item.en_title"
                  :value="item.class_id">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <br>
          <el-form-item label="Title (CN) : " prop="title" :rules="[{ required: true, message: 'Not Allow Null'}]">
            <el-input v-model="goods.title" style="width:344px"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="Title (EN) : " prop="en_title" :rules="[{ required: true, message: 'Not Allow Null'}]">
            <el-input v-model="goods.en_title" style="width:344px"></el-input>
          </el-form-item>
            <br>
          <el-form-item label="SellPoin (CN) : " prop="sell_point" :rules="[{ required: true, message: 'Not Allow Null'}]">
            <el-input v-model="goods.sell_point" style="width:344px"></el-input>
          </el-form-item>
            <br>
          <el-form-item label="SellPoin (EN) : " prop="en_sell_point" :rules="[{ required: true, message: 'Not Allow Null'}]">
            <el-input v-model="goods.en_sell_point" style="width:344px"></el-input>
          </el-form-item>
              <br>
          <el-form-item label="Price ($) : " prop="price" :rules="[{ required: true, message: 'Not Allow Null'}]">
            <el-input v-model="goods.price" style="width:344px"></el-input>
          </el-form-item>
              <br>
          <el-form-item label="MemberPice ($) : " prop="member_price" :rules="[{ required: true, message: 'Not Allow Null'}]">
            <el-input v-model="goods.member_price" style="width:344px"></el-input>
          </el-form-item>
              <br>
          <el-form-item label="Stock : " prop="stock" :rules="[{required: true, message: 'Not Allow Null'}]">
            <el-input v-model="goods.stock" style="width:344px"></el-input>
          </el-form-item>
              <br>
          <el-form-item label="Commission : " prop="commission">
            <el-input v-model="goods.commission" style="width:344px"></el-input>
          </el-form-item>
              <br>
          <el-form-item label="Integral : " prop="integral" >
            <el-input v-model="goods.integral" style="width:344px"></el-input>
          </el-form-item>
        <br>

          <el-form-item label="Main image : " prop="goods_images" :rules="[{required: true, message: 'Not Allow Null'}]">
            <Upload
              :img_url="goods.goods_images"
              v-on:uploadSuccess="handleMainImgSuccess"
            />
          </el-form-item>

        </el-form>

      </el-collapse-item>

      <el-collapse-item name="2" v-show="type == 1">

        <template slot="title">
          <i class="listLine"></i><span class="title">DetailInfo</span>
        </template>

        <el-form :inline="true" :model="goods" ref="goods"  label-width="140px" class="demo-ruleForm">

          <el-form-item label="Goods Note : " prop="goods_desc" :rules="[{max:300, required: true, message: 'Not Allow Null'}]" >
            <el-input type="textarea" v-model="goods.goods_desc" style="width:600px"
                      placeholder="less than 300"></el-input>
          </el-form-item>
          <br>
          <br>

          <el-form-item label="GoodsBanner : " style="width:600px"
          prop="goods_banners" :rules="[{type: 'array', required: true, message: 'Not Allow Null'}]">
             <more-upload
                :imageList="goods.goods_banners"
                v-on:imgBroadcastRemove="handleBannerImgsRemove"
                v-on:uploadSuccess="handleBannerImgsSuccess"
            />

          </el-form-item>

            <br>
            <br>
           <el-form-item label="GoodsDetail : " style="width:600px"
            prop="goods_detail" :rules="[{type: 'array', required: true, message: 'Not Allow Null'}]">
                 <more-upload
                    :imageList="goods.goods_detail"
                    v-on:imgBroadcastRemove="handleDetailImgsRemove"
                    v-on:uploadSuccess="handleDetailImgsSuccess"
                />
          </el-form-item>
        </el-form>
      </el-collapse-item>

    </el-collapse>

    <div class="goods_bottom_btn">

      <el-button type="danger"
                 style="margin-left: 0px"
                 @click="cancelAction" round>cancelAction
      </el-button>

       <el-button type="danger"
                 style="margin-left: 100px"
                 @click="resetAction('goods')" round>resetAction
      </el-button>

      <el-button type="success"
                 style="margin-left: 100px"
                 @click="pushAction('goods')"
                 :loading="loading" round>pushAction
      </el-button>
    </div>

  </div>
</template>

<script>
  import GoodsProperty from '../goods/GoodsProperty'
  import * as BaseApi from '../../api/goods/goods'
  import Upload from '../../components/upload/Upload'
  import MoreUpload from '../../components/upload/MoreUpload'

  export default {
    components: {GoodsProperty, Upload, MoreUpload},
    name: 'AddProduct',
    data() {
      return {
        activeNames: ['1','2'],
        goods: {
          // 商品主图
          category_id: null,
          goods_images: '',
          title: '',
          en_title: '',
          sell_point: '',
          en_sell_point: '',
          goods_desc: '',
          goods_banners: [],
          goods_detail: [],
          buy_num_max: null,
          member_price: 0,
          discount_price: 0,
          price: 0,
          stock: 0,
          commission: 0,
          integral: 0,
          status: 1
        },
        // 商品轮播图
        dialogImageUrl: '',
        // 商品详情图
        dialogVisible: false,
        type: null,
        listLoading: false,
        currentIndex: 0,
        goodsClassList: []
      }
    },
    mounted() {
      if(this.$router.history.current.query.goods){
       this.goods = JSON.parse(this.$router.history.current.query.goods)
       this.type = 0
      } else {
        this.type = 1
      }

      BaseApi.getTreeList().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.goodsClassList = res.data
        }
      })

    },
    methods: {
      // tab切换方法
      handleClick(tab, event) {
        console.log(event.index);
        this.inputValue = '';

      },
      handleChange(val) {
        console.log(val);

      },
      // 商品主图
      handleMainImgSuccess(fileUrl) {
          this.goods.goods_images = fileUrl;
      },

      handleBannerImgsSuccess(file) {
          this.goods.goods_banners.push(file)
      },
      handleBannerImgsRemove(list){
          this.goods.goods_banners = list
      },
      handleDetailImgsRemove(list){
        this.goods.goods_detail = list
      },
      handleDetailImgsSuccess(file) {
        this.goods.goods_detail.push(file)
      },

      cancelAction() {
          this.$router.push({ path: '/goods_manage' })
      },
      resetAction(formname){
        this.$refs[formname].resetFields();
      },

      /**
       * 提交数据
       */
      pushAction(formName) {
          this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.goods)
            this.listLoading = true
            BaseApi.addGoods(this.goods).then(res => {
                this.listLoading = false
                if(res.code === 200){
                   this.$confirm('summit success and go on ?', 'Tip', {
                      confirmButtonText: 'sure',
                      cancelButtonText: 'no',
                      type: 'warning'
                    }).then(() => {
                        this.$refs[formname].resetFields();
                    }).catch(() => {
                       this.$router.push({ path: '/goods_manage' })
                    });
                }else{
                  this.$notify({
                    title: 'Tip',
                    message: 'summit fail try again',
                    type: 'error',
                    duration: 2000
                  })
                }
                console.log(res)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },

      /**
       * 修改状态
       * @param row
       */
      handleUpdateStatus(row) {
        console.log("handleUpdateStatus")
      },

      /**
       * 输入的规格值
       * @param name
       */
      handleInputConfirm(val, index) {

      },

      /**
       * 更新规格状态
       * @param index
       */
      updateSkuStatus(index) {
        // 单品
        console.log(index)
      },


    }
  }
</script>

<style>
  .addGoods .el-collapse-item__header {
    font-size: 15px;
    color: #333;
    position: relative;
  }

  .addGoods .el-tabs__item.is-active, .goodsList .el-tabs__item:hover {
    color: #42b983;
  }

  .addGoods .el-tabs__active-bar {
    background-color: #42b983;
  }

  .addGoods .listLine {
    background: #42b983;
    position: absolute;
    top: 16px;
    width: 3px;
    height: 15px;

  }

  .addGoods .title {
    margin-left: 10px;
  }

  .addGoods .el-form demo-ruleForm {
    margin-left: 5%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #42b982;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .addGoods .el-button {
    border: none;
  }

  .addGoods .el-button:hover {
    color: #42b982;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .goodsStock .el-form-item__content {
    margin-left: 180px !important;
  }

  .el-tabs__item.is-active {
    color: #42b982;
  }

  .el-tabs__active-bar {
    background-color: #42b982;
  }

  .addGoods .el-table td, .addGoods .el-table th {
    padding: 0;
  }

  .el-input--small {
    padding: 12px 4px;
  }

  .goods_bottom_btn {
    text-align: center;
    width: 100%;
    margin-top: 40px;
    padding-bottom: 40px;
  }
</style>
