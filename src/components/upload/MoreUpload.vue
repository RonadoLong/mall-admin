<template>
      <div>
          <el-upload 
          v-loading="loading"
          ref="imgBroadcastUpload"
          :file-list="imageList"
          :data="form"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
          :on-remove="imgBroadcastRemove"
          accept="image/jpg,image/png,image/jpeg"
          :on-success="handleAvatarSuccess"
          action="//up-na0.qiniup.com">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">Only load the type of jpg/png and its size not more than 2M</div>
            
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
</template>


<script>
import { getToken } from '../../api/qiniu'

// 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk
const host = "http://p28bmumza.bkt.gdipper.com/";

export default{
  props: {
     imageList: Array
  },
  data() {
    return {
      form: { token: '', key: '' },
      fileList: [],
      loading: false,
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    beforeUpload(file) {
      this.loading = true
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          console.log(response)
          this.form = {
            key: response.data.key,
            token: response.data.token
          }
            resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },

    imgBroadcastRemove(file, fileList){
      console.log(fileList)
      this.$emit("imgBroadcastRemove", fileList)
    },

    handleAvatarSuccess(res, file, fileList) {
      this.loading = false
      console.log(res)
      let image_uri = host + res.key
      this.$emit("uploadSuccess", image_uri)
    },

    handlePictureCardPreview(file){
       console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    }
  }
}
</script>


<style scoped>

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
    line-height: 200px;
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
    height: 200px;
    width: 375px !important;
    text-align: center;
  }

</style>
