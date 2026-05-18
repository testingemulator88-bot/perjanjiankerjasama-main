<template>
  <div class="content" v-if="route.name == 'Login'">
    <Login />
  </div>
  <div class="content" v-if="route.name == 'Dashboard'">
    <Dashboard />
  </div>
  <div class="content" v-if="route.name == 'GIS'">
    <GIS />
  </div>
  <div class="content" v-if="route.name == 'AturPK'">
    <AturPK />
  </div>
  <div class="content" v-if="route.name == 'User'">
    <User />
  </div>
  <div class="content" v-if="route.name == 'ProsesUser'">
    <ProsesUser />
  </div>
  <div class="content" v-if="route.name == 'Pengumuman'">
    <Pengumuman />
  </div>
  <div class="content" v-if="route.name == 'ProsesPengumuman'">
    <ProsesPengumuman />
  </div>
  <div class="content" v-if="route.name == 'IKU'">
    <IKU />
  </div>
  <div class="content" v-if="route.name == 'ProsesIKU'">
    <ProsesIKU />
  </div>
  <div class="content" v-if="route.name == 'Unor'">
    <Unor />
  </div>
  <div class="content" v-if="route.name == 'ProsesUnor'">
    <ProsesUnor />
  </div>
  <div class="content" v-if="route.name == 'KategoriSatker'">
    <KategoriSatker />
  </div>
  <div class="content" v-if="route.name == 'ProsesKategoriSatker'">
    <ProsesKategoriSatker />
  </div>
  <div class="content" v-if="route.name == 'Satker'">
    <Satker />
  </div>
  <div class="content" v-if="route.name == 'ProsesSatker'">
    <ProsesSatker />
  </div>
  <div class="content" v-if="route.name == 'Satuan'">
    <Satuan />
  </div>
  <div class="content" v-if="route.name == 'ProsesSatuan'">
    <ProsesSatuan />
  </div>
  <div class="content" v-if="route.name == 'Indikator'">
    <Indikator />
  </div>
  <div class="content" v-if="route.name == 'IndikatorAwal'">
    <IndikatorAwal />
  </div>
  <div class="content" v-if="route.name == 'IndikatorAkhir'">
    <IndikatorAkhir />
  </div>
  <div class="content" v-if="route.name == 'DataEmon'">
    <DataEmon />
  </div>
  <div class="content" v-if="route.name == 'ProsesDataEmon'">
    <ProsesDataEmon />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaSatker'">
    <PerjanjianKinerjaSatker />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaSatkerAwal'">
    <PerjanjianKinerjaSatkerAwal />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaSatkerAkhir'">
    <PerjanjianKinerjaSatkerAkhir />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaBalai'">
    <PerjanjianKinerjaBalai />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaBalaiAwal'">
    <PerjanjianKinerjaBalaiAwal />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaBalaiAkhir'">
    <PerjanjianKinerjaBalaiAkhir />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaDirjen'">
    <PerjanjianKinerjaDirjen />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaDirjenAwal'">
    <PerjanjianKinerjaDirjenAwal />
  </div>
  <div class="content" v-if="route.name == 'PerjanjianKinerjaDirjenAkhir'">
    <PerjanjianKinerjaDirjenAkhir />
  </div>
  <div class="content" v-if="route.name == 'DetailProgres'">
    <DetailProgres />
  </div>
  <div class="content" v-if="route.name == 'RekapSDABalai'">
    <RekapSDABalai />
  </div>
  <div class="content" v-if="route.name == 'RekapSatker'">
    <RekapSatker />
  </div>
  <div class="content" v-if="route.name == 'LayerPeta'">
    <LayerPeta />
  </div>
  <div class="content" v-if="route.name == 'KontraktualSDABalai'">
    <KontraktualSDABalai />
  </div>
  <div class="content" v-if="route.name == 'KontraktualSatker'">
    <KontraktualSatker />
  </div>
  <div class="content" v-if="route.name == 'DetailPaket'">
    <DetailPaket />
  </div>
  <div class="content" v-if="route.name == 'DaftarKontraktual'">
    <DaftarKontraktual />
  </div>
  <div class="content" v-if="route.name == 'ResetPK'">
    <ResetPK />
  </div>
  <div class="content" v-if="route.name == 'ResumeCapaian'">
    <ResumeCapaian />
  </div>
  <div class="content" v-if="route.name == 'ResumeCapaianSatker'">
    <ResumeCapaianSatker />
  </div>
  <div class="content" v-if="route.name == 'ResumeTargetAwal'">
    <ResumeTargetAwal />
  </div>
  <div class="content" v-if="route.name == 'ResumeTargetAwalSatker'">
    <ResumeTargetAwalSatker />
  </div>


  <div class="content" v-if="route.name == 'Komponen'">
    <Komponen />
  </div>
  <div class="content" v-if="route.name == 'ProsesKomponen'">
    <ProsesKomponen />
  </div>

  <div class="content" v-if="route.name == 'SubKomponen'">
    <SubKomponen />
  </div>
  <div class="content" v-if="route.name == 'ProsesSubKomponen'">
    <ProsesSubKomponen />
  </div>
  <div class="content" v-if="route.name == 'KriteriaPenilaian'">
    <KriteriaPenilaian />
  </div>
  <div class="content" v-if="route.name == 'ProsesKriteriaPenilaian'">
    <ProsesKriteriaPenilaian />
  </div>

  <div class="content" v-if="route.name == 'PilihanJawaban'">
    <PilihanJawaban />
  </div>
  <div class="content" v-if="route.name == 'ProsesPilihanJawaban'">
    <ProsesPilihanJawaban />
  </div>
  <div class="content" v-if="route.name == 'Evaluator'">
    <Evaluator />
  </div>
  <div class="content" v-if="route.name == 'ProsesEvaluator'">
    <ProsesEvaluator />
  </div>

  <div class="content" v-if="route.name == 'PenilaianLKE'">
    <PenilaianLKE />
  </div>

  <div class="content" v-if="route.name == 'InputLKE'">
    <InputLKE />
  </div>

  <div class="content" v-if="route.name == 'ProsesPenilaianLKE'">
    <ProsesPenilaianLKE />
  </div>

  <div class="content" v-if="route.name == 'Evaluatan'">
    <Evaluatan />
  </div>
  <div class="content" v-if="route.name == 'ProsesEvaluatan'">
    <ProsesEvaluatan />
  </div>
</template>

<script>
import Login from './components/views/Publik/Login.vue';
import Dashboard from './components/views/Dashboard/Dashboard.vue';
import GIS from './components/views/GIS/GIS.vue';
import User from './components/views/Backoffice/User/User.vue';
import ProsesUser from './components/views/Backoffice/User/ProsesUser.vue';
import AturPK from './components/views/Backoffice/AturPK/AturPK.vue';
import Pengumuman from './components/views/Backoffice/Pengumuman/Pengumuman.vue';
import ProsesPengumuman from './components/views/Backoffice/Pengumuman/ProsesPengumuman.vue';
import IKU from './components/views/Backoffice/IKU/IKU.vue';
import ProsesIKU from './components/views/Backoffice/IKU/ProsesIKU.vue';
import Unor from './components/views/Backoffice/Unor/Unor.vue';
import ProsesUnor from './components/views/Backoffice/Unor/ProsesUnor.vue';
import DataEmon from './components/views/Backoffice/DataEmon/DataEmon.vue';
import ProsesDataEmon from './components/views/Backoffice/DataEmon/ProsesDataEmon.vue';
import KategoriSatker from './components/views/Backoffice/KategoriSatker/KategoriSatker.vue';
import ProsesKategoriSatker from './components/views/Backoffice/KategoriSatker/ProsesKategoriSatker.vue';
import Satker from './components/views/Backoffice/Satker/Satker.vue';
import ProsesSatker from './components/views/Backoffice/Satker/ProsesSatker.vue';
import Satuan from './components/views/Backoffice/Satuan/Satuan.vue';
import ProsesSatuan from './components/views/Backoffice/Satuan/ProsesSatuan.vue';
import Indikator from './components/views/Backoffice/Indikator/Indikator.vue';
import IndikatorAwal from './components/views/Backoffice/Indikator/IndikatorAwal.vue';
import IndikatorAkhir from './components/views/Backoffice/Indikator/IndikatorAkhir.vue';
import PerjanjianKinerjaSatker from './components/views/Backoffice/PerjanjianKinerjaSatker/PerjanjianKinerjaSatker.vue';
import PerjanjianKinerjaSatkerAwal from './components/views/Backoffice/PerjanjianKinerjaSatkerAwal/PerjanjianKinerjaSatkerAwal.vue';
import PerjanjianKinerjaSatkerAkhir from './components/views/Backoffice/PerjanjianKinerjaSatkerAkhir/PerjanjianKinerjaSatkerAkhir.vue';
import PerjanjianKinerjaBalai from './components/views/Backoffice/PerjanjianKinerjaBalai/PerjanjianKinerjaBalai.vue';
import PerjanjianKinerjaBalaiAwal from './components/views/Backoffice/PerjanjianKinerjaBalaiAwal/PerjanjianKinerjaBalaiAwal.vue';
import PerjanjianKinerjaBalaiAkhir from './components/views/Backoffice/PerjanjianKinerjaBalaiAkhir/PerjanjianKinerjaBalaiAkhir.vue';
import PerjanjianKinerjaDirjen from './components/views/Backoffice/PerjanjianKinerjaDirjen/PerjanjianKinerjaDirjen.vue';
import PerjanjianKinerjaDirjenAwal from './components/views/Backoffice/PerjanjianKinerjaDirjenAwal/PerjanjianKinerjaDirjenAwal.vue';
import PerjanjianKinerjaDirjenAkhir from './components/views/Backoffice/PerjanjianKinerjaDirjenAkhir/PerjanjianKinerjaDirjenAkhir.vue';
import DetailProgres from './components/views/Backoffice/ProgresEmon/DetailProgres.vue';
import RekapSDABalai from './components/views/Backoffice/ProgresEmon/RekapSDABalai.vue';
import RekapSatker from './components/views/Backoffice/ProgresEmon/RekapSatker.vue';
import LayerPeta from './components/views/Backoffice/LayerPeta/LayerPeta.vue';
import KontraktualSDABalai from './components/views/Backoffice/Kontraktual/KontraktualSDABalai.vue';
import KontraktualSatker from './components/views/Backoffice/Kontraktual/KontraktualSatker.vue';
import DetailPaket from './components/views/Backoffice/Kontraktual/DetailPaket.vue';
import DaftarKontraktual from './components/views/Backoffice/Kontraktual/DaftarKontraktual.vue';
import ResetPK from './components/views/Backoffice/ResetPK/ResetPK.vue';
import ResumeCapaian from './components/views/Backoffice/ResumeCapaian/ResumeCapaian.vue';
import ResumeCapaianSatker from './components/views/Backoffice/ResumeCapaian/ResumeCapaianSatker.vue';
import ResumeTargetAwal from './components/views/Backoffice/ResumeTargetAwal/ResumeTargetAwal.vue';
import ResumeTargetAwalSatker from './components/views/Backoffice/ResumeTargetAwal/ResumeTargetAwalSatker.vue';

import Komponen from './components/views/Backoffice/LKE/Komponen/Komponen.vue';
import ProsesKomponen from './components/views/Backoffice/LKE/Komponen/ProsesKomponen.vue';
import SubKomponen from './components/views/Backoffice/LKE/SubKomponen/SubKomponen.vue';
import ProsesSubKomponen from './components/views/Backoffice/LKE/SubKomponen/ProsesSubKomponen.vue';
import KriteriaPenilaian from './components/views/Backoffice/LKE/Kriteria/KriteriaPenilaian.vue';
import ProsesKriteriaPenilaian from './components/views/Backoffice/LKE/Kriteria/ProsesKriteriaPenilaian.vue';
import PilihanJawaban from './components/views/Backoffice/LKE/PilihanJawaban/PilihanJawaban.vue';
import ProsesPilihanJawaban from './components/views/Backoffice/LKE/PilihanJawaban/ProsesPilihanJawaban.vue';
import Evaluator from './components/views/Backoffice/LKE/Evaluator/Evaluator.vue';
import ProsesEvaluator from './components/views/Backoffice/LKE/Evaluator/ProsesEvaluator.vue';
import PenilaianLKE from './components/views/Backoffice/LKE/PenilaianLKE/PenilaianLKE.vue';
import InputLKE from './components/views/Backoffice/LKE/PenilaianLKE/InputLKE.vue';
import ProsesPenilaianLKE from './components/views/Backoffice/LKE/PenilaianLKE/ProsesPenilaianLKE.vue';
import Evaluatan from './components/views/Backoffice/LKE/Evaluatan/Evaluatan.vue';
import ProsesEvaluatan from './components/views/Backoffice/LKE/Evaluatan/ProsesEvaluatan.vue';

import { useRoute } from 'vue-router';
import { watch } from 'vue';

export default {
  name: 'App',
  components: {
    Login, Dashboard, GIS, User, ProsesUser, Unor, ProsesUnor, KategoriSatker, ProsesKategoriSatker, Satker, ProsesSatker, Komponen, ProsesKomponen, SubKomponen, ProsesSubKomponen,
    KriteriaPenilaian, ProsesKriteriaPenilaian, PilihanJawaban, ProsesPilihanJawaban, Evaluator, ProsesEvaluator, PenilaianLKE, InputLKE, ProsesPenilaianLKE
    , Satuan, ProsesSatuan, Indikator, PerjanjianKinerjaSatker, PerjanjianKinerjaBalai, DataEmon, ProsesDataEmon, DetailProgres, RekapSDABalai
    , RekapSatker, LayerPeta, KontraktualSDABalai, KontraktualSatker, DetailPaket, Evaluatan, ProsesEvaluatan, DaftarKontraktual, IndikatorAwal
    , IndikatorAkhir, PerjanjianKinerjaSatkerAwal, PerjanjianKinerjaBalaiAwal, PerjanjianKinerjaSatkerAkhir, PerjanjianKinerjaBalaiAkhir
    , Pengumuman, ProsesPengumuman, PerjanjianKinerjaDirjen, PerjanjianKinerjaDirjenAwal, PerjanjianKinerjaDirjenAkhir, AturPK
    , IKU, ProsesIKU, ResetPK, ResumeCapaian, ResumeCapaianSatker, ResumeTargetAwal, ResumeTargetAwalSatker
  },
  mounted() {
    document.title = "MONIKA";
  },
  setup() {
    const route = useRoute()
    watch(() => route.name, () => {
    });

    return { route };
  }
}
</script>

<style></style>
