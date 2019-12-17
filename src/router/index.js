import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '瑞盟后台管理首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    name: 'Customer',
    meta: { title: '客户管理', icon: 'peoples' },
    children: [{
      path: 'list',
      name: 'CustomerList',
      component: () => import('@/views/customer/list'),
      meta: { title: '客户列表', icon: 'peoples' }
    },
    {
      path: 'save',
      name: 'SaveCustomer',
      component: () => import('@/views/customer/form'),
      meta: { title: '添加客户', icon: 'peoples' }
    }, {
      path: 'update/:id',
      name: 'UpdateCustomer',
      component: () => import('@/views/customer/form'),
      meta: { title: '修改客户', icon: 'peoples' },
      hidden: true
    }]
  },
  {
    path: '/gasCylinder',
    component: Layout,
    redirect: '/gasCylinder/list',
    name: 'GasCylinder',
    meta: { title: '气瓶管理', icon: 'peoples' },
    children: [{
      path: 'list',
      name: 'GasCylinderList',
      component: () => import('@/views/gasCylinder/list'),
      meta: { title: '气瓶列表', icon: 'peoples' }
    },
    {
      path: 'save',
      name: 'SaveGasCylinder',
      component: () => import('@/views/gasCylinder/form'),
      meta: { title: '添加气瓶', icon: 'peoples' }
    }, {
      path: 'update/:id',
      name: 'UpdateGasCylinder',
      component: () => import('@/views/gasCylinder/form'),
      meta: { title: '修改气瓶', icon: 'peoples' },
      hidden: true
    }]
  },
  {
    path: '/emptyBottle',
    component: Layout,
    redirect: '/emptyBottle/list',
    name: 'EmptyBottle',
    meta: { title: '空瓶管理', icon: 'peoples' },
    children: [{
      path: 'list',
      name: 'EmptyBottleList',
      component: () => import('@/views/emptyBottle/list'),
      meta: { title: '空瓶列表', icon: 'peoples' }
    },
    {
      path: 'save',
      name: 'SaveEmptyBottle',
      component: () => import('@/views/emptyBottle/form'),
      meta: { title: '添加空瓶', icon: 'peoples' }
    }, {
      path: 'update/:id',
      name: 'UpdateEmptyBottle',
      component: () => import('@/views/emptyBottle/form'),
      meta: { title: '修改空瓶', icon: 'peoples' },
      hidden: true
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Order',
    meta: { title: '订单管理', icon: 'peoples' },
    children: [{
      path: 'list',
      name: 'OrderList',
      component: () => import('@/views/order/list'),
      meta: { title: '订单列表', icon: 'peoples' }
    },
    {
      path: 'save',
      name: 'SaveOrder',
      component: () => import('@/views/order/form'),
      meta: { title: '添加订单', icon: 'peoples' }
    }, {
      path: 'update/:id',
      name: 'UpdateOrder',
      component: () => import('@/views/order/form'),
      meta: { title: '修改订单', icon: 'peoples' },
      hidden: true
    }]
  },
  {
    path: '/staff',
    component: Layout,
    redirect: '/staff/list',
    name: 'Staff',
    meta: { title: '员工管理', icon: 'peoples' },
    children: [{
      path: 'list',
      name: 'StaffList',
      component: () => import('@/views/staff/list'),
      meta: { title: '员工列表', icon: 'peoples' }
    },
    {
      path: 'save',
      name: 'SaveStaff',
      component: () => import('@/views/staff/form'),
      meta: { title: '添加员工', icon: 'peoples' }
    }, {
      path: 'update/:id',
      name: 'UpdateStaff',
      component: () => import('@/views/staff/form'),
      meta: { title: '修改员工', icon: 'peoples' },
      hidden: true
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
