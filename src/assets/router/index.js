import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../../components/views/Publik/Login.vue'),
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
    path: '/GIS',
    name: 'GIS',
    component: () => import('../../components/views/GIS/GIS.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/AturPK',
    name: 'AturPK',
    component: () => import('../../components/views/Backoffice/AturPK/AturPK.vue'),
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
    path: '/Unor',
    name: 'Unor',
    component: () => import('../../components/views/Backoffice/Unor/Unor.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesUnor/:id',
    name: 'ProsesUnor',
    component: () => import('../../components/views/Backoffice/Unor/ProsesUnor.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Pengumuman',
    name: 'Pengumuman',
    component: () => import('../../components/views/Backoffice/Pengumuman/Pengumuman.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesPengumuman/:id',
    name: 'ProsesPengumuman',
    component: () => import('../../components/views/Backoffice/Pengumuman/ProsesPengumuman.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/IKU',
    name: 'IKU',
    component: () => import('../../components/views/Backoffice/IKU/IKU.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ResetPK',
    name: 'ResetPK',
    component: () => import('../../components/views/Backoffice/ResetPK/ResetPK.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ResumeCapaian/:id',
    name: 'ResumeCapaian',
    component: () => import('../../components/views/Backoffice/ResumeCapaian/ResumeCapaian.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ResumeCapaianSatker/:id',
    name: 'ResumeCapaianSatker',
    component: () => import('../../components/views/Backoffice/ResumeCapaian/ResumeCapaianSatker.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ResumeTargetAwal/:id',
    name: 'ResumeTargetAwal',
    component: () => import('../../components/views/Backoffice/ResumeTargetAwal/ResumeTargetAwal.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ResumeTargetAwalSatker/:id',
    name: 'ResumeTargetAwalSatker',
    component: () => import('../../components/views/Backoffice/ResumeTargetAwal/ResumeTargetAwalSatker.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesIKU/:id',
    name: 'ProsesIKU',
    component: () => import('../../components/views/Backoffice/IKU/ProsesIKU.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DataEmon',
    name: 'DataEmon',
    component: () => import('../../components/views/Backoffice/DataEmon/DataEmon.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesDataEmon/:id',
    name: 'ProsesDataEmon',
    component: () => import('../../components/views/Backoffice/DataEmon/ProsesDataEmon.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/KategoriSatker',
    name: 'KategoriSatker',
    component: () => import('../../components/views/Backoffice/KategoriSatker/KategoriSatker.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesKategoriSatker/:id',
    name: 'ProsesKategoriSatker',
    component: () => import('../../components/views/Backoffice/KategoriSatker/ProsesKategoriSatker.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Satuan',
    name: 'Satuan',
    component: () => import('../../components/views/Backoffice/Satuan/Satuan.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesSatuan/:id',
    name: 'ProsesSatuan',
    component: () => import('../../components/views/Backoffice/Satuan/ProsesSatuan.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Indikator',
    name: 'Indikator',
    component: () => import('../../components/views/Backoffice/Indikator/Indikator.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/IndikatorAwal',
    name: 'IndikatorAwal',
    component: () => import('../../components/views/Backoffice/Indikator/IndikatorAwal.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/IndikatorAkhir',
    name: 'IndikatorAkhir',
    component: () => import('../../components/views/Backoffice/Indikator/IndikatorAkhir.vue'),
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
    path: '/PerjanjianKinerjaSatker/:id',
    name: 'PerjanjianKinerjaSatker',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaSatker/PerjanjianKinerjaSatker.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PerjanjianKinerjaSatkerAwal/:id',
    name: 'PerjanjianKinerjaSatkerAwal',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaSatkerAwal/PerjanjianKinerjaSatkerAwal.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PerjanjianKinerjaSatkerAkhir/:id',
    name: 'PerjanjianKinerjaSatkerAkhir',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaSatkerAkhir/PerjanjianKinerjaSatkerAkhir.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PerjanjianKinerjaBalai/:id',
    name: 'PerjanjianKinerjaBalai',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaBalai/PerjanjianKinerjaBalai.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PerjanjianKinerjaBalaiAwal/:id',
    name: 'PerjanjianKinerjaBalaiAwal',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaBalaiAwal/PerjanjianKinerjaBalaiAwal.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PerjanjianKinerjaBalaiAkhir/:id',
    name: 'PerjanjianKinerjaBalaiAkhir',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaBalaiAkhir/PerjanjianKinerjaBalaiAkhir.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PerjanjianKinerjaDirjen/:id',
    name: 'PerjanjianKinerjaDirjen',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaDirjen/PerjanjianKinerjaDirjen.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PerjanjianKinerjaDirjenAwal/:id',
    name: 'PerjanjianKinerjaDirjenAwal',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaDirjenAwal/PerjanjianKinerjaDirjenAwal.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PerjanjianKinerjaDirjenAkhir/:id',
    name: 'PerjanjianKinerjaDirjenAkhir',
    component: () => import('../../components/views/Backoffice/PerjanjianKinerjaDirjenAkhir/PerjanjianKinerjaDirjenAkhir.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DetailProgres/:id',
    name: 'DetailProgres',
    component: () => import('../../components/views/Backoffice/ProgresEmon/DetailProgres.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/RekapSDABalai/:id',
    name: 'RekapSDABalai',
    component: () => import('../../components/views/Backoffice/ProgresEmon/RekapSDABalai.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/RekapSatker/:id',
    name: 'RekapSatker',
    component: () => import('../../components/views/Backoffice/ProgresEmon/RekapSatker.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/KontraktualSDABalai/:id',
    name: 'KontraktualSDABalai',
    component: () => import('../../components/views/Backoffice/Kontraktual/KontraktualSDABalai.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/KontraktualSatker/:id',
    name: 'KontraktualSatker',
    component: () => import('../../components/views/Backoffice/Kontraktual/KontraktualSatker.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DetailPaket/:id',
    name: 'DetailPaket',
    component: () => import('../../components/views/Backoffice/Kontraktual/DetailPaket.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/DaftarKontraktual/:id',
    name: 'DaftarKontraktual',
    component: () => import('../../components/views/Backoffice/Kontraktual/DaftarKontraktual.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Satker/:id',
    name: 'Satker',
    component: () => import('../../components/views/Backoffice/Satker/Satker.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesSatker/:id',
    name: 'ProsesSatker',
    component: () => import('../../components/views/Backoffice/Satker/ProsesSatker.vue'),
    meta: {
      transition: "zoom",
    },
  },

  {
    path: '/Komponen',
    name: 'Komponen',
    component: () => import('../../components/views/Backoffice/LKE/Komponen/Komponen.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesKomponen/:id',
    name: 'ProsesKomponen',
    component: () => import('../../components/views/Backoffice/LKE/Komponen/ProsesKomponen.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/SubKomponen',
    name: 'SubKomponen',
    component: () => import('../../components/views/Backoffice/LKE/SubKomponen/SubKomponen.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesSubKomponen/:id',
    name: 'ProsesSubKomponen',
    component: () => import('../../components/views/Backoffice/LKE/SubKomponen/ProsesSubKomponen.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/KriteriaPenilaian',
    name: 'KriteriaPenilaian',
    component: () => import('../../components/views/Backoffice/LKE/Kriteria/KriteriaPenilaian.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesKriteriaPenilaian/:id',
    name: 'ProsesKriteriaPenilaian',
    component: () => import('../../components/views/Backoffice/LKE/Kriteria/ProsesKriteriaPenilaian.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PilihanJawaban',
    name: 'PilihanJawaban',
    component: () => import('../../components/views/Backoffice/LKE/PilihanJawaban/PilihanJawaban.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesPilihanJawaban/:id',
    name: 'ProsesPilihanJawaban',
    component: () => import('../../components/views/Backoffice/LKE/PilihanJawaban/ProsesPilihanJawaban.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/Evaluator',
    name: 'Evaluator',
    component: () => import('../../components/views/Backoffice/LKE/Evaluator/Evaluator.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesEvaluator/:id',
    name: 'ProsesEvaluator',
    component: () => import('../../components/views/Backoffice/LKE/Evaluator/ProsesEvaluator.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/PenilaianLKE',
    name: 'PenilaianLKE',
    component: () => import('../../components/views/Backoffice/LKE/PenilaianLKE/PenilaianLKE.vue'),
    meta: {
      transition: "zoom",
    },
  },
  
  {
    path: '/InputLKE',
    name: 'InputLKE',
    component: () => import('../../components/views/Backoffice/LKE/PenilaianLKE/InputLKE.vue'),
    meta: {
      transition: "zoom",
    },
  },

  {
    path: '/ProsesPenilaianLKE/:id',
    name: 'ProsesPenilaianLKE',
    component: () => import('../../components/views/Backoffice/LKE/PenilaianLKE/ProsesPenilaianLKE.vue'),
    meta: {
      transition: "zoom",
    },
  },
  
  {
    path: '/Evaluatan',
    name: 'Evaluatan',
    component: () => import('../../components/views/Backoffice/LKE/Evaluatan/Evaluatan.vue'),
    meta: {
      transition: "zoom",
    },
  },
  {
    path: '/ProsesEvaluatan/:id',
    name: 'ProsesEvaluatan',
    component: () => import('../../components/views/Backoffice/LKE/Evaluatan/ProsesEvaluatan.vue'),
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
