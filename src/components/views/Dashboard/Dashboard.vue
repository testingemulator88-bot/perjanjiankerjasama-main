<template>
    <div class="wrapper">
        <NavBar />
        <Menu />
        <!-- Spinner Start -->
        <div id="spinner" v-if="halamanloading"
            class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            style="opacity: 0.5;">
            <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->
        <div class="content-wrapper py-5">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12 text-center">
                        <img src="../../../assets/img/logo.png" alt="Admin Logo" class="animation__shake"
                            style="opacity: .8;height: 80px;">
                        <h5>Halo.. Selamat {{ waktu }} {{ namauser }}, <br> Selamat Datang di <br>
                            <span class="text-primary">MONIKA - Monitoring Kegiatan SDA</span>
                        </h5>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-sm-12 text-center wow fadeInDown">
                        <ul class="nav nav-tabs justify-content-center" id="custom-tabs-one-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="custom-tabs-one-pengumuman-tab" data-toggle="pill"
                                    href="#custom-tabs-one-pengumuman" role="tab"
                                    aria-controls="custom-tabs-one-pengumuman" aria-selected="true">
                                    <h6>INFORMASI UMUM</h6>
                                    <img src="../../../assets/img/features-4.svg" alt="Admin Logo"
                                        style="opacity: .8;height: 70px;">
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="custom-tabs-one-home-tab" data-toggle="pill"
                                    href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home"
                                    aria-selected="true">
                                    <h6>MONITORING PK</h6>
                                    <img src="../../../assets/img/features-1.svg" alt="Admin Logo"
                                        style="opacity: .8;height: 70px;">
                                </a>
                            </li>
                            <li class="nav-item"
                                v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5)">
                                <a class="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill"
                                    href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile"
                                    aria-selected="false">
                                    <h6>MONITORING LKE</h6>
                                    <img src="../../../assets/img/features-2.svg" alt="Admin Logo"
                                        style="opacity: .8;height: 70px;">
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-12 text-left">
                        <div class="tab-content" id="custom-tabs-one-tabContent">
                            <div class="tab-pane fade show active" id="custom-tabs-one-pengumuman" role="tabpanel"
                                aria-labelledby="custom-tabs-one-pengumuman-tab">
                                <div class="card-body">
                                    <div class="col-sm-12 wow fadeInDown">
                                        <template v-for="(datalist, urutlist) in datapengumuman" :key="urutlist">
                                            <div class="position-relative p-3 bg-adit" style="min-height: 80px">
                                                <div class="ribbon-wrapper ribbon-lg">
                                                    <div class="ribbon bg-danger">
                                                        Pengumuman
                                                    </div>
                                                </div>
                                                <small>
                                                    <span class="text-success">{{
                                                        G_formatDateNonWIB(datalist.createddate)}}
                                                    </span>
                                                    <span v-html="datalist.nama"></span>
                                                </small>
                                            </div>
                                            <div class="dropdown-divider"></div>
                                            <div class="col-sm-12"></div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="custom-tabs-one-home" role="tabpanel"
                                aria-labelledby="custom-tabs-one-home-tab">
                                <div class="card-body">
                                    <div class="col-sm-12">
                                        <div class="card cardputih2">
                                            <div class="card-header border-transparent bg-biru">
                                                <label>Jenis PK</label>
                                            </div>
                                            <div class="card-body" style="font-size: smaller !important;">
                                                <div class="row justify-content-center">
                                                    <div class="col-sm-4"></div>
                                                    <div class="col-sm-4">
                                                        <v-select :options="jenispk" :reduce="(label) => label.code"
                                                            label="label" v-model="defaultSelectedjenispk"
                                                            @update:modelValue="onjenispkChange"
                                                            style="padding-bottom: 10px;">
                                                        </v-select>
                                                    </div>
                                                    <div class="col-sm-4"></div>
                                                    <div class="col-sm-12">
                                                        <div class="table-responsive table-wrapper">
                                                            <table class="table m-0" id="tabelpk"
                                                                style="font-size: x-small;">
                                                                <thead>
                                                                    <tr>
                                                                        <th style="width: 10px;" rowspan="3">No</th>
                                                                        <th style="width: 200px;" rowspan="3">
                                                                            DIREKTORAT / BALAI /
                                                                            SATKER</th>
                                                                        <th style="width: 300px;" colspan="6">
                                                                            TAHAPAN VERIFIKASI
                                                                        </th>
                                                                        <th style="width: 50px;" rowspan="3">TANGGAL
                                                                            SELESAI</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style="width: 150px;" colspan="3">Verif
                                                                            1</th>
                                                                        <th style="width: 150px;" colspan="3">Verif
                                                                            2</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th style="width: 50px;">Pengajuan</th>
                                                                        <th style="width: 50px;">Perbaikan</th>
                                                                        <th style="width: 50px;">Disetujui</th>
                                                                        <th style="width: 50px;">Pengajuan</th>
                                                                        <th style="width: 50px;">Perbaikan</th>
                                                                        <th style="width: 50px;">Disetujui</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <template v-for="(datalist, urutlist) in datamaster"
                                                                        :key="urutlist">
                                                                        <tr>
                                                                            <td
                                                                                class="text-center levelsubkomponenbaru">
                                                                                {{ urutlist + 1 }}
                                                                            </td>
                                                                            <td class="text-left levelsubkomponenbaru">
                                                                                {{ datalist.kdbalai }} - {{
                                                                                    datalist.nama }}
                                                                            </td>
                                                                            <td
                                                                                class="text-center levelsubkomponenbaru">
                                                                                <span
                                                                                    v-if="datalist.nama == 'PUSAT' || datalist.nama == 'DINAS'">
                                                                                    -
                                                                                </span>
                                                                                <span v-else>
                                                                                    <i :class="datalist.verif1"></i>
                                                                                </span>
                                                                            </td>
                                                                            <td
                                                                                class="text-center levelsubkomponenbaru">
                                                                                <span
                                                                                    v-if="datalist.nama == 'PUSAT' || datalist.nama == 'DINAS'">
                                                                                    -
                                                                                </span>
                                                                                <span v-else>
                                                                                    <i :class="datalist.revisi1"></i>
                                                                                </span>
                                                                            </td>
                                                                            <td
                                                                                class="text-center levelsubkomponenbaru">
                                                                                <span
                                                                                    v-if="datalist.nama == 'PUSAT' || datalist.nama == 'DINAS'">
                                                                                    -
                                                                                </span>
                                                                                <span v-else>
                                                                                    <i :class="datalist.acc1"></i>
                                                                                </span>
                                                                            </td>
                                                                            <td class="text-center levelsubkomponenbaru"
                                                                                :class="[datalist.verif2 == '' ? 'tanpaverif' : '']">
                                                                                <span
                                                                                    v-if="datalist.nama == 'PUSAT' || datalist.nama == 'DINAS'">
                                                                                    -
                                                                                </span>
                                                                                <span v-else>
                                                                                    <i :class="datalist.verif2"></i>
                                                                                </span>
                                                                            </td>
                                                                            <td
                                                                                class="text-center levelsubkomponenbaru">
                                                                                <span
                                                                                    v-if="datalist.nama == 'PUSAT' || datalist.nama == 'DINAS'">
                                                                                    -
                                                                                </span>
                                                                                <span v-else>
                                                                                    <i :class="datalist.revisi2"></i>
                                                                                </span>
                                                                            </td>
                                                                            <td
                                                                                class="text-center levelsubkomponenbaru">
                                                                                <span
                                                                                    v-if="datalist.nama == 'PUSAT' || datalist.nama == 'DINAS'">
                                                                                    -
                                                                                </span>
                                                                                <span v-else>
                                                                                    <i :class="datalist.acc2"></i>
                                                                                </span>
                                                                            </td>
                                                                            <td
                                                                                class="text-center levelsubkomponenbaru">
                                                                                <span
                                                                                    v-if="datalist.nama == 'PUSAT' || datalist.nama == 'DINAS'">
                                                                                    -
                                                                                </span>
                                                                                <span v-else>
                                                                                    {{
                                                                                        G_formatDateNonWIB(datalist.tanggal)
                                                                                    }}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <template
                                                                            v-for="(datadetail, urutdetail) in datalist.detail"
                                                                            :key="urutlist">
                                                                            <tr>
                                                                                <td class="text-center">
                                                                                    {{ urutlist + 1 }} . {{
                                                                                        urutdetail + 1 }}
                                                                                </td>
                                                                                <td class="text-left">
                                                                                    {{ datadetail.kode_satker }} -
                                                                                    {{
                                                                                        datadetail.nama }}
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <i :class="datadetail.verif1"></i>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <i :class="datadetail.revisi1"></i>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <i :class="datadetail.acc1"></i>
                                                                                </td>
                                                                                <td class="text-center"
                                                                                    :class="[datadetail.verif2 == '' ? 'tanpaverif' : '']">
                                                                                    <i :class="datadetail.verif2"></i>
                                                                                </td>
                                                                                <td class="text-center"
                                                                                    :class="[datadetail.revisi2 == '' ? 'tanpaverif' : '']">
                                                                                    <i :class="datadetail.revisi2"></i>
                                                                                </td>
                                                                                <td class="text-center"
                                                                                    :class="[datadetail.acc2 == '' ? 'tanpaverif' : '']">
                                                                                    <i :class="datadetail.acc2"></i>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    {{
                                                                                        G_formatDateNonWIB(datadetail.tanggal)
                                                                                    }}
                                                                                </td>
                                                                            </tr>
                                                                        </template>
                                                                    </template>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel"
                                aria-labelledby="custom-tabs-one-profile-tab">
                                <div class="card-body p-3">
                                    <div class="row g-4 justify-content-center">
                                        <div class="col-sm-12">
                                            <div class="card cardputih">
                                                <div class="col-sm-12">
                                                    &nbsp;
                                                </div>
                                                <div class="col-sm-12">
                                                    <label>Pilihan Data Tahun</label>
                                                    <v-select :options="listtahun" :reduce="(label) => label.code"
                                                        label="label" v-model="defaultSelectedtahun"
                                                        @update:modelValue="ontahunChange"
                                                        style="background-color: #ffffff;padding-bottom: 10px;">
                                                    </v-select>
                                                </div>

                                                <div class="col-sm-12">
                                                    &nbsp;
                                                </div>

                                                <div class="card-body p-0">
                                                    <div class="table-responsive table-wrapper">
                                                        <table class="table m-0" id="tabeldata"
                                                            style="font-size: x-small;">
                                                            <thead>
                                                                <tr>
                                                                    <th style="width: 10px;">No</th>
                                                                    <th
                                                                        v-if="leveluser.includes(1) || leveluser.includes(2)">
                                                                        Balai / Dinas
                                                                    </th>
                                                                    <th v-else>Satker</th>
                                                                    <th>LKE diajukan</th>
                                                                    <th>LKE dievaluasi</th>
                                                                    <th>LKE perlu di revisi</th>
                                                                    <th>LKE diterima</th>
                                                                </tr>
                                                            </thead>
                                                            <template v-for="(datalistLKE, urutlist) in datamasterLKE"
                                                                :key="urutlist">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{{ urutlist + 1 }}</td>
                                                                        <td class="text-left">{{ datalistLKE.nama }}
                                                                        </td>
                                                                        <td class="text-right">{{
                                                                            datalistLKE.jumlah_status_diajukan }}
                                                                            Kriteria</td>
                                                                        <td class="text-right">{{
                                                                            datalistLKE.jumlah_status_dievaluasi }}
                                                                            Kriteria</td>
                                                                        <td class="text-right">{{
                                                                            datalistLKE.jumlah_status_direvisi }}
                                                                            Kriteria</td>
                                                                        <td class="text-right">{{
                                                                            datalistLKE.jumlah_status_selesai }}
                                                                            Kriteria</td>
                                                                    </tr>
                                                                </tbody>
                                                            </template>
                                                            <tbody v-if="(datapesan == 'data kosong')">
                                                                <tr>
                                                                    <td colspan="6">Data masih kosong</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row g-4 justify-content-center">
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <p>&nbsp;</p>
                </div>
                <div class="row">
                    <p>&nbsp;</p>
                </div>
                <div class="row">
                    <p>&nbsp;</p>
                </div>
            </div>
            <!-- /.content-header -->
        </div>
        <Footer />
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import vSelect from 'vue-select';
import xlsx from 'xlsx/dist/xlsx.full.min';
import swal from 'sweetalert2';
import Footer from "../componen/Footer.vue";
import NavBar from "../componen/NavBar.vue";
import Menu from "../componen/Menu.vue";

import VueApexCharts from "vue3-apexcharts";
window.Apex.chart = { fontFamily: "Poppins-SemiBold, Arial, sans-serif" };
export default {
    components: {
        Footer, NavBar, Menu, vSelect, apexchart: VueApexCharts, swal
    },
    data() {
        return {
            halamanloading: false,
            showFilter: true,
            iduser: JSON.parse(localStorage.getItem("usistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            kewenangan: JSON.parse(localStorage.getItem("kewsistem")),
            id_user: JSON.parse(localStorage.getItem("iduser")),
            d5sistem: JSON.parse(localStorage.getItem("d5sistem")),
            levpiusistem: JSON.parse(localStorage.getItem("levpiusistem")),
            levpiubalaisistem: JSON.parse(localStorage.getItem("levpiubalaisistem")),
            kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
            ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
            verifsistem: JSON.parse(localStorage.getItem("verifsistem")),
            verif2sistem: JSON.parse(localStorage.getItem("verifsistem2")),
            evaluasisistem: JSON.parse(localStorage.getItem("evaluasisistem")),
            jenis_piusistem: JSON.parse(localStorage.getItem("jenis_piusistem")),
            datapesan: '',
            datamaster: [],
            datamasterLKE: [],
            datapengumuman: [],
            carikata: '',
            ipnya: '',
            waktu: '',
            listtahun: [],
            datatahun: [],
            defaultSelectedtahun: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtahun: new Date().getFullYear(),
            tahun: new Date().getFullYear(),

            datajenispk: [],
            jenispk: [],
            defaultSelectedjenispk: {},
            selectedjenispk: '',
            tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
        }
    },
    methods: {
        getOtentifikasi() {
            var time = Date.parse(localStorage.getItem("tsistem"));
            var timeakhir = time + (3 * 60 * 60 * 1000);
            var timesekarang = Date.parse(new Date());
            if (timesekarang > timeakhir) {
                this.ClearlocalStorage();
            }
        },
        ontahunChange(a) {
            try {
                this.selectedtahun = this.listtahun[a].tag;
                this.ambildata();
            }
            catch (err) {
                return;
            }
        },
        onjenispkChange(a) {
            try {
                this.selectedjenispk = this.jenispk[a].tag;
                this.ambildata();
            }
            catch (err) {
                return;
            }
        },
        AmbilDataReff() {
            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            this.halamanloading = true;
            var random = Math.random();
            mainAPIData.get("reff/000_defaulttahun.php?random=" + random + "&table=hasil_lke").then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datatahun = [];
                        this.listtahun = [];
                        this.datatahun = Response.data.content.data;
                        this.datatahun.forEach((item) => {
                            this.listtahun.push({
                                label: item.tahun,
                                code: this.datatahun.indexOf(item),
                                tag: item.tahun,
                            });
                            if (item.tahun == this.selectedtahun) {
                                this.defaultSelectedtahun = {
                                    code: this.datatahun.indexOf(item),
                                    label: item.tahun,
                                    tag: item.tahun,
                                };
                            }
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            this.halamanloading = true;
            var random = Math.random();
            mainAPIData.get("parastapainnovationjenispk-JenisPK?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datajenispk = [];
                        this.jenispk = [];
                        this.datajenispk = Response.data.content.data;
                        this.datajenispk.forEach((item) => {
                            this.jenispk.push({
                                label: item.nama,
                                code: this.datajenispk.indexOf(item),
                                tag: item.id,
                            });
                            if (item.is_active == 1) {
                                this.selectedjenispk = item.id;
                                this.defaultSelectedjenispk = {
                                    code: this.datajenispk.indexOf(item),
                                    label: item.nama,
                                    tag: item.id,
                                };
                            }
                        });
                    }
                    this.halamanloading = false;
                    this.ambildata();
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            });
        },
        ambildata() {
            this.halamanloading = true;
            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            if (this.leveluser.includes(2)) {
                var pelaksana = this.id_user;
            }
            else {
                var pelaksana = this.kdsatkersistem;
            }

            var random = Math.random();
            mainAPIData.get("penilaianlke-GetMonitoringLKE?random=" + random + "&tahun=" + this.selectedtahun + "&id_user=" + pelaksana + "&level=" + this.leveluser + "&kategori_satker=" + this.ksatkersistem).then(
                Response => {
                    this.datapesan = Response.data.message;

                    if (this.datapesan == 'data diketemukan') {
                        this.datamasterLKE = [];
                        this.datamasterLKE = Response.data.content.data;
                    }
                    else {
                        this.datamasterLKE = [];
                    }

                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            this.halamanloading = true;
            var random = Math.random();
            var kodebalai = '';
            var cantek = '';
            if (this.leveluser.includes(1) || this.leveluser.includes(2)) {
                kodebalai = '';
                cantek = '';
            }
            else {
                if ((this.jenis_piusistem == 36) || (this.jenis_piusistem == 37) || (this.jenis_piusistem == 38)
                    || (this.jenis_piusistem == 42) || (this.jenis_piusistem == 43) || (this.jenis_piusistem == 44)) {
                    kodebalai = '';
                    cantek = this.jenis_piusistem;
                }
                else {
                    cantek = '';
                    kodebalai = this.ksatkersistem;
                }
            }
            mainAPIData.get("parastapainnovationmonitoring-PK?random=" + random + "&kodebalai=" + kodebalai + "&cantek=" + cantek + "&pk_aktif=" + this.selectedjenispk).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                    }
                    else {
                        this.datamaster = [];
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                //this.ClearlocalStorage();
                this.halamanloading = false;
            });

            var random = Math.random();
            mainAPIData.get("parastapainnovationpengumuman-Semua?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datapengumuman = [];
                        this.datapengumuman = Response.data.content.data;
                        this.halamanloading = false;
                    }
                    else {
                        this.datapengumuman = [];
                        this.halamanloading = false;
                    }

                }
            ).catch(error => {
                console.log(error);
                this.datapengumuman = [];
                this.halamanloading = false;
            });
        },
    },
    mounted() {
        this.getOtentifikasi();
        this.AmbilDataReff();
        this.ambildata();
        this.waktu = this.getWaktu();
    },
}
</script>
<style></style>
