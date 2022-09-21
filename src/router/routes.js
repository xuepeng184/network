export default [{
  path: '/home',
  name: 'home',
  component: () => import('@/views/Home/Home'),
  // home的二级路由
  children: [{
    path: '/home',
    redirect: '/home/recommend'
  }, {
    path:'recommend',
    component:()=>import('@/views/Home/Recommend')
  },{
    path:'customized',
    component:()=>import('@/views/Home/Customized')
  },{
    path:'songlist',
    component:()=>import('@/views/Home/SongList')
  },{
    path:'chart',
    component:()=>import('@/views/Home/Chart')
  },{
    path:'singer',
    component:()=>import('@/views/Home/Singer')
  },{
    path:'latestsong',
    component:()=>import('@/views/Home/LatestSong')
  }]
}, {
  path:'/login',
  name:'login',
  component:()=>import('@/views/Login/Login')
},
// 一级路由的重定向
{
  path: '', 
  redirect: '/home'
}, ]