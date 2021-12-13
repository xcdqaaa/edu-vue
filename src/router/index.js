import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",

    children: [
      {
        path: "/dashboard-admin",
        name: "DashboardAdmin",
        component: () => import("@/views/dashboard/admin"),
        meta: { title: "首页", icon: "dashboard", roles: ['admin'] },
      },
      {
        path: "/dashboard-student",
        name: "DashboardStudent",
        component: () => import("@/views/dashboard/student"),
        meta: { title: "首页", icon: "dashboard", roles: ['student'] },
      },
      {
        path: "/dashboard-teacher",
        name: "DashboardTeacher",
        component: () => import("@/views/dashboard/teacher"),
        meta: { title: "首页", icon: "dashboard", roles: ['teacher'] },
      },
    ],
  },

  // admin user
  {
    name: "User",
    path: "/user",
    component: Layout,
    redirect: "/user/admins",
    meta: {
      title: "用户管理",
      icon: "el-icon-user",
      roles: ['admin']
    },
    children: [
      {
        name: "UserAdmin",
        path: "/user/admins",
        component: () => import("@/views/admin/user/UserAdmin"),
        meta: {
          title: "管理用户",
          roles: ['admin']
        },
      },
      {
        name: "UserTeacher",
        path: "/user/teachers",
        component: () => import("@/views/admin/user/UserTeacher"),
        meta: {
          title: "教师用户",
          roles: ['admin']
        },
      },
      {
        name: "UserStudent",
        path: "/user/students",
        component: () => import("@/views/admin/user/UserStudent"),
        meta: {
          title: "学生用户",
          roles: ['admin']
        },
      },
    ],
  },
  // admin teacher
  {
    name: "Teachers",
    path: "/teachers",
    component: Layout,
    redirect: "/teachers/list",
    meta: {
      title: "教师管理",
      icon: "el-icon-takeaway-box",
      roles: ['admin']
    },
    children: [
      {
        name: "TeacherList",
        path: "/teachers/list",
        component: () => import("@/views/admin/teacher/TeacherList"),
        meta: {
          title: "教师列表",
        },
      },
      {
        name: "TeacherLesson",
        path: "lesson",
        component: () => import("@/views/admin/teacher/TeacherLesson"),
        meta: {
          title: "教师课程",
        },
      },
    ],
  },
  // student
  {
    name: "Student",
    path: "/students",
    component: Layout,
    redirect: "/students/list",
    meta: {
      title: "学生管理",
      icon: "el-icon-reading",
      roles: ['admin']
    },
    children: [
      {
        name: "StudentList",
        path: "/students/list",
        component: () => import("@/views/admin/student/StudentList"),
        meta: {
          title: "学生列表",
        },
      },
      {
        name: "StudentLesson",
        path: "/students/lesson",
        component: () => import("@/views/admin/student/StudentLesson"),
        meta: {
          title: "班级课程",
        },
      },
    ],
  },
  // course
  {
    name: "Courses",
    path: "/courses",
    component: Layout,
    redirect: "/courses/subjects",
    meta: {
      title: "课程管理",
      icon: "el-icon-date",
      roles: ['admin']
    },
    children: [
      {
        name: "SubjectList",
        path: "/courses/subjects",
        component: () => import("@/views/admin/course/SubjectList"),
        meta: {
          title: "学科列表",
        },
      },
      {
        name: "LessonList",
        path: "/courses/lessons",
        component: () => import("@/views/admin/course/LessonList"),
        meta: {
          title: "课程列表",
        },
      },
    ],
  },
  // score
  {
    name: "Scores",
    path: "/scores",
    component: Layout,
    redirect: "/scores/list",
    meta: {
      title: "成绩管理",
      icon: "el-icon-paperclip",
      roles: ['admin']
    },
    children: [
      {
        name: "ScoreList",
        path: "/scores/list",
        component: () => import("@/views/admin/score/ScoreList"),
        meta: {
          title: "成绩列表",
        },
      },
      {
        name: "ScoreNotList",
        path: "scores/notlist",
        component: () => import("@/views/admin/score/ScoreNotList"),
        meta: {
          title: "挂科列表",
        },
      },
    ],
  },

  // teacher student personal
  {
    name: "Personal",
    path: "/personal",
    component: Layout,
    redirect: "/personal/info",
    meta: {
      title: "个人信息",
      icon: "el-icon-user",
      roles: ['teacher', 'student']
    },
    children: [
      {
        name: "UserInfo",
        path: "/personal/info",
        component: () => import("@/views/share/UserInfo"),
        meta: {
          title: "账号信息",
          roles: ['teacher', 'student']
        },
      },
      {
        name: "UserTeacher",
        path: "/personal/teacher",
        component: () => import("@/views/teacher/personal/TeacherInfo"),
        meta: {
          title: "教师信息",
          roles: ['teacher']
        },
      },
      {
        name: "UserStudent",
        path: "/person/student",
        component: () => import("@/views/student/personal/StudentInfo"),
        meta: {
          title: "学生信息",
          roles: ['student']
        },
      },
    ],
  },

  // teacher course
  {
    name: "TeacherCourse",
    path: "/teacher/course",
    component: Layout,
    redirect: "/teacher/course",
    meta: {
      title: "课程信息",
      icon: "el-icon-date",
      roles: ['teacher']
    },
    alwaysShow: true,
    children: [
      {
        name: "TeacherCourse",
        path: "/teacher/course/list",
        component: () => import("@/views/teacher/course/TeacherCourse"),
        meta: {
          title: "课程列表",
          roles: ['teacher']
        },
      },
    ],
  },
  // teacher score
  {
    name: "TeacherScore",
    path: "/teacher/score",
    component: Layout,
    redirect: "/teacher/score",
    meta: {
      title: "成绩信息",
      icon: "el-icon-paperclip",
      roles: ['teacher']
    },
    alwaysShow: true,
    children: [
      {
        name: "ClassScore",
        path: "/teacher/score/list",
        component: () => import("@/views/teacher/score/ClassScore"),
        meta: {
          title: "成绩列表",
          roles: ['teacher']
        },
      },
    ],
  },
  // student course
  {
    name: "StudentCourse",
    path: "/student/course",
    component: Layout,
    redirect: "/student/course/list",
    meta: {
      title: "课程列表",
      icon: "el-icon-date",
      roles: ['student']
    },
    alwaysShow: true,
    children: [
      {
        name: "StudentCourse",
        path: "/student/course/list",
        component: () => import("@/views/student/course/StudentCourse"),
        meta: {
          title: "课程列表",
          roles: ['student']
        },
      },
      {
        name: "SelectCourse",
        path: "/student/course/select",
        component: () => import("@/views/student/course/SelectCourse"),
        meta: {
          title: "选修课程",
          roles: ['student']
        },
      },
      {
        name: "RebuildCourse",
        path: "/student/course/rebuild",
        component: () => import("@/views/student/course/RebuildCourse"),
        meta: {
          title: "重修课程",
          roles: ['student']
        },
      },
    ],
  },
  // student score
  {
    name: "StudentScore",
    path: "/student/score",
    component: Layout,
    redirect: "/student/score/list",
    meta: {
      title: "成绩信息",
      icon: "el-icon-paperclip",
      roles: ['student']
    },
    alwaysShow: true,
    children: [
      {
        name: "ClassScore",
        path: "/student/score/list",
        component: () => import("@/views/student/score/StudentScore"),
        meta: {
          title: "成绩列表",
          roles: ['student']
        },
      },
      {
        name: "FailList",
        path: "/student/score/fail",
        component: () => import("@/views/student/score/FailList"),
        meta: {
          title: "挂科信息",
          roles: ['student']
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/dashboard",
    // name: "Dashboard",
    component: () => import("@/views/dashboard/index"),
    meta: { title: "首页", icon: "dashboard", }, hidden: true
  },

];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
