let menu = {};

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
menu.home = {
  name: 'Home',
  path: '/',
  icon: 'fa fa-tachometer',
};


/**
 * 字体图标
 * @type {{name: string, icon: string, children: {}}}
 */
menu.font_icon = {
  name: 'AppMain',
  icon: 'fa fa-th',
  children: {}
};
let icon = menu.font_icon.children;

icon.HomeCarousel = {
  name: 'MainCarousel',
  path: '/main_carousel',
};

icon.element_icon = {
  name: 'MainNav',
  path: '/main_nav',
};

/**
 * 内容管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.goods_manage = {
  name: 'GoodsManage',
  icon: 'fa fa-file-text-o',
  children: {}
};

let GoodsManage = menu.goods_manage.children;

GoodsManage.goods = {
  name: 'GoodsList',
  path: '/goods_manage',
};

// GoodsManage.addGoods = {
//     name: 'AddGoods',
//     path: '/add_goods',
// };

GoodsManage.goodsClass = {
    name: 'ClassList',
    path: '/class_manage',
};




/**
 * info
 * @type {{}|menu.info_manage.children}
 */

menu.info_manage = {
    name: 'InfoManage',
    icon: 'fa fa-sitemap',
    children: {}
};

let InfoManage = menu.info_manage.children;

InfoManage.info = {
    name: 'NewsList',
    path: '/news_manage',
};

InfoManage.infoClass = {
    name: 'NewsClassList',
    path: '/news_class_manage',
};

InfoManage.video = {
    name: 'VideoList',
    path: '/video_manage',
};

InfoManage.videoClass = {
    name: 'VideoClassList',
    path: '/video_class_manage',
};

/**
 *
 * @type {{name: string, icon: string, children: {}}}
 */
menu.service_manage = {
    name: 'ServiceManage',
    icon: 'fa fa-qrcode',
    children: {}
};

let ServiceManage = menu.service_manage.children;

ServiceManage.service = {
    name: 'ServiceList',
    path: '/service_manage',
};

ServiceManage.serviceClass = {
    name: 'ServiceClassList',
    path: '/service_class_manage',
};

ServiceManage.serviceSetting = {
    name: 'ServiceSetting',
    path: '/service_setting_manage',
};

ServiceManage.servicePaymentSetting = {
    name: 'ServicePayment',
    path: '/service_Payment_manage',
};

/**
 *
 * @type {{name: string, icon: string, children: {}}}
 */
menu.order_manage = {
    name: 'OrderManage',
    icon: 'fa fa-file-text-o',
    children: {}
};

let OrderManage = menu.order_manage.children;

OrderManage.orderList = {
    name: 'OrderList',
    path: '/order_list',
};


/**
 * 用户管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.user_manage = {
  name: 'UserManage',
  icon: 'fa fa-user-circle-o',
  children: {}
};
let UserManage = menu.user_manage.children;

UserManage.user = {
  name: 'UserList',
  path: '/user_list',
};


/**
 * 分类管理
 * @type {{name: string, icon: string, children: {}}}
 */
// menu.category_manage = {
//   name: '分类管理',
//   icon: 'fa fa-sitemap',
//   children: {}
// };
// let CategoryManage = menu.category_manage.children;
//
// CategoryManage.category = {
//   name: '分类列表',
//   path: '/category_manage',
// };



// menu.permission_manage = {
//   name: '权限管理',
//   icon: 'fa fa-qrcode',
//   children: {}
// };
// let PermissionManage = menu.permission_manage.children;
//
// PermissionManage.role = {
//   name: '角色管理',
//   path: '/role_manage',
// };
//
// PermissionManage.permission = {
//   name: '权限列表',
//   path: '/permission_list',
// };

export default menu;

if(__DEV__){

  menu.development_tools = {
    name: '开发工具',
    icon: 'fa fa-wrench',
    children: {}
  };

  let DevelopmentTools = menu.development_tools.children;

  DevelopmentTools.code = {
    name: '构建代码',
    path: '/build_code',
  };

}
