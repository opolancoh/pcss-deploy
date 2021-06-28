export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    icon: 'home',
    component: './Home',
  },
  /*   {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Instructor',
      },
    ],
  }, */
  {
    path: '/master-data',
    name: 'master-data',
    icon: 'crown',
    component: '../layouts/BasicLayout',
    routes: [
      {
        name: 'instructor',
        path: '/master-data/instructors',
        icon: 'table',
        component: './Instructor',
      },
    ],
  },
  /*    {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  }, */
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
