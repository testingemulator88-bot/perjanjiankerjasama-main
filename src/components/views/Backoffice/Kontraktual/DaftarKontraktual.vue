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
        <div id="spinner" v-if="jumlahbaris == 0"
            class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            style="opacity: 0.5;">
            <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->
        <div class="content-wrapper py-3">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6 wow fadeInDown">
                            <h5>Rekap SDA / Balai</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Rekap SDA / Balai</li>
                            </ol>
                        </div>
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 text-center wow fadeInDown">
                            <span class="bordered-text" style="font-size: smaller;">Tanggal data emon: {{
                                G_formatDate(tanggalemon) }}</span>
                        </div>
                        <div class="col-sm-12 text-center wow fadeInDown">&nbsp;</div>
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="card cardputih2">
                                <div class="card-header border-transparent bg-biru" data-card-widget="collapse"
                                    style="cursor: pointer;">
                                    <label>Filter Data</label>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body px-3" style="font-size: smaller !important;">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>Pilihan Data Tahun</label>
                                            <v-select :options="listtahun" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedtahun" @update:modelValue="ontahunChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 text-center wow fadeInDown">
                            <a class="hitam">
                                <button type="button" class="btn btn-success btn-sm text-white lebar2"
                                    data-toggle="tooltip" data-placement="left" title="Unduh excel.."
                                    @click="G_tableCSVTabel1('_KontraktualBalaiSDA_')">
                                    <i class="fas fa-download"></i>
                                    <span style="font-size: smaller;">Unduh Data .xlsx</span>
                                </button>
                            </a>
                        </div>
                        <div class="col-sm-12 text-center wow fadeInDown">&nbsp;</div>
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="card cardputih">
                                <div class="card-header border-transparent">

                                </div>
                                <div class="card-body p-0">
                                    <div class="col-sm-12 float-left pb-2 px-3">
                                        <div class="input-group mb-3" style="font-size: smaller;">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-biru"><i
                                                        class="fas fa-search"></i></span>
                                            </div>
                                            <input type="text" v-model="carikata" class="form-control form-control-sm"
                                                placeholder="Masukkan Kata Kunci Pencarian Nama Balai"
                                                style="font-size: smaller;">
                                        </div>
                                    </div>
                                    <div class="table-responsive table-wrapper">
                                        <table class="table m-0" id="tabeldata" style="font-size: x-small;">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">No</th>
                                                    <th style="width: 100px;">Satker</th>
                                                    <th style="width: 50px;">Kode Satker</th>
                                                    <th style="width: 100px;">Kode</th>
                                                    <th style="width: 100px;">Paket</th>
                                                    <th style="width: 50px;">Pagu RM</th>
                                                    <th style="width: 50px;">Pagu PHLN</th>
                                                    <th style="width: 50px;">Pagu SBSN</th>
                                                    <th style="width: 50px;">Pagu Efektif</th>
                                                    <th style="width: 50px;">Blokir</th>
                                                    <th style="width: 100px;">Status Kontrak</th>
                                                    <th style="width: 100px;">Nilai Kontrak Induk</th>
                                                    <th style="width: 100px;">Nilai Kontrak Anak</th>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in filteredKataData" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td :class="datalist.class">
                                                            {{ (urutlist + 1) }}
                                                        </td>
                                                        <td :class="datalist.class" :data-v="datalist.nama">
                                                            <a href="javascript:void(0)"
                                                                :class="{ 'linknya': (datalist.nama !== 'TOTAL') }"
                                                                @click="lihatdata(datalist.idbalai)">
                                                                {{ datalist.nama }}

                                                            </a>
                                                        </td>
                                                        <td :class="datalist.class" class="text-center"
                                                            :data-v="datalist.kdsatker">
                                                            {{ datalist.kdsatker }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-center"
                                                            :data-v="datalist.kode">
                                                            {{ datalist.kode }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-left"
                                                            :data-v="datalist.nmpaket">
                                                            {{ datalist.nmpaket }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.pg_rm">
                                                            {{ G_numFormat(datalist.pg_rm) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.pgpln">
                                                            {{ G_numFormat(datalist.pgpln) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.pgsbsn">
                                                            {{ G_numFormat(datalist.pgsbsn) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.pagu_efektif">
                                                            {{ G_numFormat(datalist.pagu_efektif) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.blokir">
                                                            {{ G_numFormat(datalist.blokir) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-left"
                                                            :data-v="datalist.status_kontrak">
                                                            {{ datalist.status_kontrak }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.nilai_kontrak">
                                                            {{ G_numFormat(datalist.nilai_kontrak) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.nilai_kontrak_anak">
                                                            {{ G_numFormat(datalist.nilai_kontrak_anak) }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                            <tbody v-if="(datapesan == 'data kosong')">
                                                <tr>
                                                    <td colspan="12">Data masih kosong</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer p-3">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import vSelect from 'vue-select';
import swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import xlsx from 'xlsx/dist/xlsx.full.min';
import Footer from "../../componen/Footer.vue";
import NavBar from "../../componen/NavBar.vue";
import Menu from "../../componen/Menu.vue";

import VueApexCharts from "vue3-apexcharts";
window.Apex.chart = { fontFamily: "Poppins-SemiBold, Arial, sans-serif" };
export default {
    components: {
        Footer, NavBar, Menu, vSelect, swal
    },
    data() {
        return {
            halamanloading: true,
            tanggalemon: new Date(),
            iduser: JSON.parse(localStorage.getItem("usistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            datapesan: '',
            datamaster: [],
            carikata: '',
            tahun: new Date().getFullYear(),
            listtahun: [],
            datatahun: [],
            defaultSelectedtahun: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: 0,
            },
            selectedtahun: new Date().getFullYear(),
            jumlahbaris: 0,
            tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
        }
    },
    computed: {
        filteredKataData() {
            const filteredWorkers = this.carikata === ""
                ? this.datamaster
                : this.datamaster.filter(wo => Object.values(wo).join("").toLowerCase().indexOf(this.carikata.toLowerCase()) !== -1);
            return filteredWorkers;
        },
        JumlahfilteredKataData() {
            var jumlah = 0;
            try {
                if (this.filteredKataData === undefined) {
                    jumlah = 0;
                } else {
                    jumlah = this.filteredKataData.length;
                }
            }
            catch {
                jumlah = 0;
            }
            return jumlah;
        },
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
        async G_tableCSVTabel1(namefile) {
            this.halamanloading = true;
            const XLSX = xlsx;
            var wb = XLSX.utils.table_to_book(document.getElementById('tabeldata'), { sheet: "KontraktualBalaiSDA" });
            XLSX.writeFile(wb, this.G_formatDate(Date(), 'd-M-Y') + namefile + ".xlsx");
            this.halamanloading = false;
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
        lihatdata(kodesatker) {
            var kodepilih = kodesatker + "_" + this.selectedtahun;
            var bytes = encodeURIComponent(CryptoJS.AES.encrypt(kodepilih, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
            window.location.replace("/KontraktualSatker/" + bytes);
        },
        async AmbilDataReff() {
            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("tahun_emon-GetData?random=" + random).then(
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
                            if (item.tahun == this.tahun) {
                                this.selectedtahun = item.tahun;
                                this.defaultSelectedtahun = {
                                    code: this.datatahun.indexOf(item),
                                    label: item.tahun,
                                    tag: item.id,
                                };
                            }
                        });
                        this.halamanloading = false;
                    }
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("tanggal_emon-GetData?random=" + random + "&tahun=" + this.selectedtahun).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.tanggalemon = Response.data.content.data[0].tanggalemon;
                        this.halamanloading = false;
                    }
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

        },
        async ambildata() {
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPI.get("cek_emon-Kontraktual?random=" + random + "&tahun=" + this.selectedtahun).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.tanggalemon = Response.data.content.tanggalemon;
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                        this.jumlahbaris = this.datamaster.length;
                        this.halamanloading = false;
                    }
                    else {
                        this.jumlahbaris = 1;
                        this.datamaster = [];
                        this.halamanloading = false;
                    }
                }
            ).catch(error => {
                console.log(error);
                this.ClearlocalStorage();
                this.halamanloading = false;
            });
        },
    },
    mounted() {
        this.getOtentifikasi();
        this.AmbilDataReff();
        this.ambildata();
    }
}
</script>
<style></style>