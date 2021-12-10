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
    name: "User",
    path: "/user",
    component: Layout,
    redirect: "/user/admins",
    meta: {
      title: "用户管理",
      icon: "el-icon-user",
    },
    children: [
      {
        name: "UserAdmin",
        path: "/user/admins",
        component: () => import("@/views/admin/user/UserAdmin"),
        meta: {
          title: "管理用户",
        },
      },
      {
        name: "UserTeacher",
        path: "/user/teachers",
        component: () => import("@/views/admin/user/UserTeacher"),
        meta: {
          title: "教师用户",
        },
      },
      {
        name: "UserStudent",
        path: "/user/students",
        component: () => import("@/views/admin/user/UserStudent"),
        meta: {
          title: "学生用户",
        },
      },
    ],
  },

  {
    name: "Teacher",
    path: "/teacher",
    component: Layout,
    redirect: "/teacher/list",
    meta: {
      title: "教师管理",
      icon: "el-icon-takeaway-box",
    },
    children: [
      {
        name: "TeacherList",
        path: "/teacher/list",
        component: () => import("@/views/admin/teacher/TeacherList"),
        meta: {
          title: "教师列表",
        },
      },
      {
        name: "TeacherInfo",
        path: "info",
        component: () => import("@/views/admin/teacher/TeacherInfo"),
        meta: {
          title: "教师信息",
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
  {
    name: "Student",
    path: "/student",
    component: Layout,
    redirect: "/student/list",
    meta: {
      title: "学生管理",
      icon: "el-icon-reading",
    },
    children: [
      {
        name: "StudentList",
        path: "/student/list",
        component: () => import("@/views/admin/student/StudentList"),
        meta: {
          title: "学生列表",
        },
      },
      {
        name: "StudentInfo",
        path: "/student/info",
        component: () => import("@/views/admin/student/StudentInfo"),
        meta: {
          title: "学生信息",
        },
      },
      {
        name: "StudentLesson",
        path: "/student/lesson",
        component: () => import("@/views/admin/student/StudentLesson"),
        meta: {
          title: "学生课程",
        },
      },
    ],
  },
  {
    name: "Course",
    path: "/course",
    component: Layout,
    redirect: "/course/courses",
    meta: {
      title: "课程管理",
      icon: "el-icon-date",
    },
    children: [
      {
        name: "SubjectList",
        path: "/course/courses",
        component: () => import("@/views/admin/course/SubjectList"),
        meta: {
          title: "学科列表",
        },
      },
      {
        name: "LessonList",
        path: "/course/lessons",
        component: () => import("@/views/admin/course/LessonList"),
        meta: {
          title: "课程列表",
        },
      },
    ],
  },
  {
    name: "Score",
    path: "/score",
    component: Layout,
    redirect: "/score/list",
    meta: {
      title: "成绩管理",
      icon: "el-icon-paperclip",
    },
    children: [
      {
        name: "ScoreList",
        path: "/score/list",
        component: () => import("@/views/admin/score/ScoreList"),
        meta: {
          title: "成绩列表",
        },
      },
      {
        name: "ScoreNotList",
        path: "score/notlist",
        component: () => import("@/views/admin/score/ScoreNotList"),
        meta: {
          title: "挂科列表",
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
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
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
