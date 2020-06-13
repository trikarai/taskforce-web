import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from './components/HelloWorld';


//ROOT
import LoginRoot from './views/LoginRoot';
import RootDashboard from './components/root/dashboard/Dashboard';
import RootAccount from './components/root/account/Account';
import RootTenant from './components/root/tenant/Tenant';

//ADMIN
import LoginAdmin from './views/LoginAdmin';
import AdminDashboard from './components/administrator/dashboard/Dashboard';
import AdminUser from './components/administrator/user/User';
import AdminOrganization from './components/administrator/organization/Organization';
import AdminOrganizationCoordinator from './components/administrator/organization/personnel/coordinator/Coordinator';
import AdminOrganizationStaff from './components/administrator/organization/personnel/staff/Staff';
import AdminTerritory from './components/administrator/territory/Territory';
import AdminTerritoryMaintainer from './components/administrator/territory/maintainer/Maintainer';
import AdminTerritoryClient from './components/administrator/territory/client/Client';

import AdminTask from './components/administrator/task/Task';
import AdminTaskField from './components/administrator/task/field/Field';
import AdminTaskSection from './components/administrator/task/section/Section';

import AdminReport from './components/administrator/report/Report';
import AdminReportSegment from './components/administrator/report/segment/Segment';
import AdminReportSegmentUnit from './components/administrator/report/segment/unit/Unit';

//PERSONNEL
import PersonnelDashboard from './components/personnel/dashboard/Dashboard';
//--as Coordinator
import CoordinatorDashboard from './components/personnel/asCoordinator/dashboard/Dashboard';
import CoordinatorAssignment from './components/personnel/asCoordinator/assignment/Assignment';
import CoordinatorAssignmentPerformance from './components/personnel/asCoordinator/assignment/Performance';
import CoordinatorAssignmentReport from './components/personnel/asCoordinator/assignment/Report';
import CoordinatorAssignmentCreate from './components/personnel/asCoordinator/assignment/AssignmentForm';
//--as Staff
import StaffDashboard from './components/personnel/asStaff/dashboard/Dashboard';
import StaffAssignment from './components/personnel/asStaff/task/Task';
import StaffAssignmentReport from './components/personnel/asStaff/task/report/Report';
import StaffAssignmentReportForm from './components/personnel/asStaff/task/report/reportForm';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/root',
      name: 'Root Login',
      component: LoginRoot
    },
    {
      path: '/masuk',
      name: 'Masuk Tenant',
      component: LoginAdmin
    },
    {
      path: '/admin',
      name: 'Admin Login',
      component: LoginAdmin
    },
    {
      path: '/login',
      name: 'Personnel Login',
      component: LoginAdmin
    },
    {
      path: '/root',
      name: 'Root',
      component: () => import('./views/Root.vue'),
      children: [
        {
          path: '/root/dashboard',
          name: 'Root Dashboard',
          component: RootDashboard,
          meta: {
            level: 0
          }
        },
        {
          path: '/root/account',
          name: 'Account Management',
          component: RootAccount,
          meta: {
            level: 0
          }
        },
        {
          path: '/root/tenant',
          name: 'Tenant Management',
          component: RootTenant,
          meta: {
            level: 0
          }
        }
      ]
    },
    {
      path: '/admin',
      name: 'Administrator',
      component: () => import('./views/Administrator.vue'),
      children: [
        {
          path: '/admin/dashboard',
          name: 'Administrator Dashboard',
          component: AdminDashboard,
          meta: {
            level: 0
          }
        },
        {
          path: '/admin/user',
          name: 'Manage User',
          component: AdminUser,
          meta: {
            level: 0
          }
        },
        {
          path: '/admin/organization',
          name: 'Manage Organization',
          component: AdminOrganization,
          meta: {
            level: 0
          }
        },
        {
          path: '/admin/organization/:organizationId/coordinator',
          name: 'Assign Coordinator',
          component: AdminOrganizationCoordinator,
          meta: {
            level: 1
          },
        },
        {
          path: '/admin/organization/:organizationId/staff',
          name: 'Assign Staff',
          component: AdminOrganizationStaff,
          meta: {
            level: 1
          },
        },
        {
          path: '/admin/territory',
          name: 'Manage Territory',
          component: AdminTerritory,
          meta: {
            level: 0
          }
        },
        {
          path: '/admin/territory/:territoryId/maintainer',
          name: 'Territory Maintainer',
          component: AdminTerritoryMaintainer,
          meta: {
            level: 1
          }
        },
        {
          path: '/admin/territory/:territoryId/client',
          name: 'Territory Client',
          component: AdminTerritoryClient,
          meta: {
            level: 1
          }
        },
        {
          path: '/admin/task',
          name: 'Manage Task',
          component: AdminTask,
          meta: {
            level: 0
          }
        },
        {
          path: '/admin/task/:taskId/field',
          name: 'Manage Field',
          component: AdminTaskField,
          meta: {
            level: 1
          }
        },
        {
          path: '/admin/task/:taskId/section',
          name: 'Manage Section',
          component: AdminTaskSection,
          meta: {
            level: 1
          }
        },
        {
          path: '/admin/report',
          name: 'Manage Report',
          component: AdminReport,
          meta: {
            level: 0
          }
        },
        {
          path: '/admin/report/:reportId/segment',
          name: 'Manage Report Segment',
          component: AdminReportSegment,
          meta: {
            level: 1
          }
        },
        {
          path: '/admin/report/:reportId/segment/:segmentId/unit',
          name: 'Manage Segment Unit',
          component: AdminReportSegmentUnit,
          meta: {
            level: 2
          }
        },
      ]
    },
    {
      path: '/personnel',
      name: 'personnel',
      component: () => import('./views/Personnel.vue'),
      children: [
        {
          path: '/personnel/dashboard',
          name: 'Personnel Dashboard',
          component: PersonnelDashboard,
          meta: {
            level: 0
          }
        },
        {
          path: '/personnel/coordinator/dashboard',
          name: 'Coordinator Dashboard',
          component: CoordinatorDashboard,
          meta: {
            level: 0
          }
        },
        {
          path: '/personnel/coordinator/assignment',
          name: 'Distribute Assignment',
          component: CoordinatorAssignment,
          meta: {
            level: 0
          }
        },
        {
          path: '/personnel/coordinator/assignment/:assignmentId/performance',
          name: 'Assignment Performance',
          component: CoordinatorAssignmentPerformance,
          meta: {
            level: 1
          }
        },
        {
          path: '/personnel/coordinator/assignment/:assignmentId/report',
          name: 'Assignment Report',
          component: CoordinatorAssignmentReport,
          meta: {
            level: 1
          }
        },
        {
          path: '/personnel/coordinator/assignment/:type',
          name: 'Create New Assignment',
          component: CoordinatorAssignmentCreate,
          meta: {
            level: 1
          }
        },
        {
          path: '/personnel/staff/dashboard',
          name: 'Staff Dashboard',
          component: StaffDashboard,
          meta: {
            level: 0
          }
        },
        {
          path: '/personnel/staff/assignment',
          name: 'Staff Task Assignment',
          component: StaffAssignment,
          meta: {
            level: 0
          }
        },
        {
          path: '/personnel/staff/assignment/:taskId/report',
          name: 'Staff Task Assignment Report',
          component: StaffAssignmentReport,
          meta: {
            level: 1
          }
        },
        {
          path: '/personnel/staff/assignment/:taskId/report/new',
          name: 'Submit Report',
          component: StaffAssignmentReportForm,
          meta: {
            level: 1
          }
        },
      ]
    },
    {
      path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    { path: '*', component: HelloWorld }
  ]
});
