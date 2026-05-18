import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Beranda',
    component: () => import('../../components/views/Publik/Beranda.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../../components/views/Publik/Login.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Aduan',
    name: 'Aduan',
    component: () => import('../../components/views/Publik/Aduan.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ITR',
    name: 'ITR',
    component: () => import('../../components/views/Publik/ITR.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/CetakITR',
    name: 'CetakITR',
    component: () => import('../../components/views/Publik/CetakITR.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/KontakKami',
    name: 'KontakKami',
    component: () => import('../../components/views/Publik/KontakKami.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/GIS/:id',
    name: 'GIS',
    component: () => import('../../components/views/Publik/GIS.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DaftarRegulasi',
    name: 'DaftarRegulasi',
    component: () => import('../../components/views/Publik/DaftarRegulasi.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DaftarKetentuanUmum',
    name: 'DaftarKetentuanUmum',
    component: () => import('../../components/views/Publik/DaftarKetentuanUmum.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DaftarKetentuanKhusus',
    name: 'DaftarKetentuanKhusus',
    component: () => import('../../components/views/Publik/DaftarKetentuanKhusus.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('../../components/views/Dashboard/Dashboard.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Slider',
    name: 'Slider',
    component: () => import('../../components/views/Backoffice/Slider/Slider.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesSlider/:id',
    name: 'ProsesSlider',
    component: () => import('../../components/views/Backoffice/Slider/ProsesSlider.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/InfoBeranda',
    name: 'InfoBeranda',
    component: () => import('../../components/views/Backoffice/InfoBeranda/InfoBeranda.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesInfoBeranda/:id',
    name: 'ProsesInfoBeranda',
    component: () => import('../../components/views/Backoffice/InfoBeranda/ProsesInfoBeranda.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Regulasi',
    name: 'Regulasi',
    component: () => import('../../components/views/Backoffice/Regulasi/Regulasi.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesRegulasi/:id',
    name: 'ProsesRegulasi',
    component: () => import('../../components/views/Backoffice/Regulasi/ProsesRegulasi.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/KategoriData',
    name: 'KategoriData',
    component: () => import('../../components/views/Backoffice/KategoriData/KategoriData.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesKategoriData/:id',
    name: 'ProsesKategoriData',
    component: () => import('../../components/views/Backoffice/KategoriData/ProsesKategoriData.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/KetentuanUmum',
    name: 'KetentuanUmum',
    component: () => import('../../components/views/Backoffice/KetentuanUmum/KetentuanUmum.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesKetentuanUmum/:id',
    name: 'ProsesKetentuanUmum',
    component: () => import('../../components/views/Backoffice/KetentuanUmum/ProsesKetentuanUmum.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/KetentuanKhusus',
    name: 'KetentuanKhusus',
    component: () => import('../../components/views/Backoffice/KetentuanKhusus/KetentuanKhusus.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesKetentuanKhusus/:id',
    name: 'ProsesKetentuanKhusus',
    component: () => import('../../components/views/Backoffice/KetentuanKhusus/ProsesKetentuanKhusus.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/LayerPeta',
    name: 'LayerPeta',
    component: () => import('../../components/views/Backoffice/LayerPeta/LayerPeta.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesLayerPeta/:id',
    name: 'ProsesLayerPeta',
    component: () => import('../../components/views/Backoffice/LayerPeta/ProsesLayerPeta.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/User',
    name: 'User',
    component: () => import('../../components/views/Backoffice/User/User.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesUser/:id',
    name: 'ProsesUser',
    component: () => import('../../components/views/Backoffice/User/ProsesUser.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DaftarAduan',
    name: 'DaftarAduan',
    component: () => import('../../components/views/Backoffice/DaftarAduan/DaftarAduan.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DaftarITR',
    name: 'DaftarITR',
    component: () => import('../../components/views/Backoffice/DaftarITR/DaftarITR.vue'),
    meta: {
      transition: "zoom",
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes: routes,
  linkActiveClass: 'active',
})

export default router;
