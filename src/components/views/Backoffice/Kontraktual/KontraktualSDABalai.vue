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
                            <div class="card cardputih collapsed-card">
                                <div class="card-header border-transparent bg-yellow" data-card-widget="collapse"
                                    style="cursor: pointer;">
                                    <label>Show / Hide Kolom</label>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-plus" style="color: black;"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body px-3" style="font-size: smaller !important;">
                                    <div class="row">
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxOpsi" value="optionOpsi" checked
                                                    @click="showNo = !showNo">
                                                <label for="customCheckboxOpsi" class="custom-control-label">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxBalai" value="optionBalai" checked
                                                    @click="showBalai = !showBalai">
                                                <label for="customCheckboxBalai" class="custom-control-label">
                                                    Balai
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxPaketKontraktual"
                                                    value="optionPaketKontraktual" checked
                                                    @click="functionshowPaketKontraktual()">
                                                <label for="customCheckboxPaketKontraktual"
                                                    class="custom-control-label">
                                                    Paket Kontraktual
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxPaguKontraktual"
                                                    value="optionPaguKontraktual" checked
                                                    @click="functionshowPaguKontraktual()">
                                                <label for="customCheckboxPaguKontraktual" class="custom-control-label">
                                                    Pagu Kontraktual
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxPaketTerkontrak"
                                                    value="optionPaketTerkontrak" checked
                                                    @click="functionshowPaketTerkontrak()">
                                                <label for="customCheckboxPaketTerkontrak" class="custom-control-label">
                                                    Paket Terkontrak
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxPaguTerkontrak"
                                                    value="optionPaguTerkontrak" checked
                                                    @click="functionshowPaguTerkontrak()">
                                                <label for="customCheckboxPaguTerkontrak" class="custom-control-label">
                                                    Pagu Terkontrak
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxNilaiTerkontrak"
                                                    value="optionNilaiTerkontrak" checked
                                                    @click="functionshowNilaiTerkontrak()">
                                                <label for="customCheckboxNilaiTerkontrak" class="custom-control-label">
                                                    Nilai Terkontrak
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxSisaLelangRM"
                                                    value="optionSisaLelangRM" checked
                                                    @click="functionshowSisaLelangRM()">
                                                <label for="customCheckboxSisaLelangRM" class="custom-control-label">
                                                    Sisa Lelang RM
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxSisaLelangPHLN"
                                                    value="optionSisaLelangPHLN" checked
                                                    @click="functionshowSisaLelangPHLN()">
                                                <label for="customCheckboxSisaLelangPHLN" class="custom-control-label">
                                                    Sisa Lelang PHLN
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxSisaLelangSBSN"
                                                    value="optionSisaLelangSBSN" checked
                                                    @click="functionshowSisaLelangSBSN()">
                                                <label for="customCheckboxSisaLelangSBSN" class="custom-control-label">
                                                    Sisa Lelang SBSN
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxSisaLelangTotal"
                                                    value="optionSisaLelangTotal" checked
                                                    @click="functionshowSisaLelangTotal()">
                                                <label for="customCheckboxSisaLelangTotal" class="custom-control-label">
                                                    Sisa Lelang Total
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxRealisasiRupiah"
                                                    value="optionRealisasiRupiah" checked
                                                    @click="functionshowRealisasiRupiah()">
                                                <label for="customCheckboxRealisasiRupiah" class="custom-control-label">
                                                    Realisasi Rupiah
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxRealisasiKeu"
                                                    value="optionRealisasiKeu" checked
                                                    @click="functionshowRealisasiKeu()">
                                                <label for="customCheckboxRealisasiKeu" class="custom-control-label">
                                                    Realisasi Keu.
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxRealisasiFisik"
                                                    value="optionRealisasiFisik" checked
                                                    @click="functionshowRealisasiFisik()">
                                                <label for="customCheckboxRealisasiFisik" class="custom-control-label">
                                                    Realisasi Fisik
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                    <th style="width: 50px;" rowspan="3" v-if="showNo">No</th>
                                                    <th style="width: 150px;" rowspan="3" v-if="showBalai">Balai</th>
                                                    <th style="width: 100px;" :colspan="colspanKontraktual"
                                                        v-if="showPaketKontraktual || showPaguKontraktual">Kontraktual
                                                    </th>
                                                    <th style="width: 100px;" :colspan="colspanTerkontrak" v-if="showPaketTerkontrak || showPaguTerkontrak
                                                        || showNilaiTerkontrak || showSisaLelangRM || showSisaLelangPHLN
                                                        || showSisaLelangSBSN || showSisaLelangTotal || showRealisasiRupiah
                                                        || showRealisasiKeu || showRealisasiFisik">
                                                        Terkontrak</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 50px;" rowspan="2" v-if="showPaketKontraktual">
                                                        Paket</th>
                                                    <th style="width: 50px;" rowspan="2" v-if="showPaguKontraktual">
                                                        Pagu<br></br>(Rp. Ribu)</th>
                                                    <th style="width: 50px;" rowspan="2" v-if="showPaketTerkontrak">
                                                        Paket</th>
                                                    <th style="width: 50px;" rowspan="2" v-if="showPaguTerkontrak">
                                                        Pagu<br></br>(Rp. Ribu)</th>
                                                    <th style="width: 50px;" rowspan="2" v-if="showNilaiTerkontrak">
                                                        Nilai<br></br>Kontrak<br></br>(Rp. Ribu)</th>
                                                    <th style="width: 50px;" :colspan="colspanSisaLelang" v-if="showSisaLelangRM || showSisaLelangPHLN || showSisaLelangSBSN
                                                        || showSisaLelangTotal">
                                                        Sisa Lelang (Rp. Ribu)</th>
                                                    <th style="width: 50px;" :colspan="colspanRealisasi"
                                                        v-if="showRealisasiRupiah || showRealisasiKeu || showRealisasiFisik">
                                                        Realisasi</th>
                                                </tr>
                                                <tr>
                                                    <th style="width: 50px;" v-if="showSisaLelangRM">RM</th>
                                                    <th style="width: 50px;" v-if="showSisaLelangPHLN">PHLN</th>
                                                    <th style="width: 50px;" v-if="showSisaLelangSBSN">SBSN</th>
                                                    <th style="width: 50px;" v-if="showSisaLelangTotal">Total</th>
                                                    <th style="width: 50px;" v-if="showRealisasiRupiah">
                                                        Rupiah<br></br>(Rp. Ribu)</th>
                                                    <th style="width: 50px;" v-if="showRealisasiKeu">Keu. (%)</th>
                                                    <th style="width: 50px;" v-if="showRealisasiFisik">Fisik (%)</th>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in filteredKataData" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td :class="datalist.class" v-if="showNo">
                                                            {{ (urutlist + 1) }}
                                                        </td>
                                                        <td :class="datalist.class" :data-v="datalist.nama"
                                                            v-if="showBalai">
                                                            <a href="javascript:void(0)"
                                                                :class="{ 'linknya': (datalist.nama !== 'TOTAL') }"
                                                                @click="lihatdata(datalist.idbalai)">
                                                                {{ datalist.nama }}

                                                            </a>
                                                        </td>
                                                        <td :class="datalist.class" class="text-center" data-z="#,##0"
                                                            :data-v="datalist.jumlah" v-if="showPaketKontraktual">
                                                            {{ datalist.jumlah }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.pagu" v-if="showPaguKontraktual">
                                                            {{ G_numFormat(datalist.pagu) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-center" data-z="#,##0"
                                                            :data-v="datalist.jumlah_terkontrak"
                                                            v-if="showPaketTerkontrak">
                                                            {{ datalist.jumlah_terkontrak }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.pagu_terkontrak"
                                                            v-if="showPaguTerkontrak">
                                                            {{ G_numFormat(datalist.pagu_terkontrak) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.nilai_kontrak" v-if="showNilaiTerkontrak">
                                                            {{ G_numFormat(datalist.nilai_kontrak) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.sisa_rm" v-if="showSisaLelangRM">
                                                            {{ G_numFormat(datalist.sisa_rm) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.sisa_phln" v-if="showSisaLelangPHLN">
                                                            {{ G_numFormat(datalist.sisa_phln) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.sisa_sbsn" v-if="showSisaLelangSBSN">
                                                            {{ G_numFormat(datalist.sisa_sbsn) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.sisa_lelang_total"
                                                            v-if="showSisaLelangTotal">
                                                            {{ G_numFormat(datalist.sisa_lelang_total) }}
                                                        </td>
                                                        <td :class="datalist.class" class="text-right" data-z="#,##0"
                                                            :data-v="datalist.realisasi" v-if="showRealisasiRupiah">
                                                            {{ G_numFormat(datalist.realisasi) }}
                                                        </td>
                                                        <td class="text-right" :class="datalist.class" data-z="#,##0.00"
                                                            :data-v="datalist.persenkeu" v-if="showRealisasiKeu">
                                                            {{ G_numFormatKoma(datalist.persenkeu) }}
                                                        </td>
                                                        <td class="text-right" :class="datalist.class" data-z="#,##0.00"
                                                            :data-v="datalist.persenfisik" v-if="showRealisasiFisik">
                                                            {{ G_numFormatKoma(datalist.persenfisik) }}
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
            showNo: true,
            showBalai: true,
            showPaketKontraktual: true,
            showPaguKontraktual: true,
            colspanKontraktual: 2,
            colspanTerkontrak: 10,
            showPaketTerkontrak: true,
            showPaguTerkontrak: true,
            showNilaiTerkontrak: true,
            showSisaLelangRM: true,
            showSisaLelangPHLN: true,
            showSisaLelangSBSN: true,
            showSisaLelangTotal: true,
            colspanSisaLelang: 4,
            colspanRealisasi: 3,
            showRealisasiRupiah: true,
            showRealisasiKeu: true,
            showRealisasiFisik: true,
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
        functionshowPaketKontraktual() {
            if (this.showPaketKontraktual == true) {
                this.showPaketKontraktual = false;
                this.colspanKontraktual = this.colspanKontraktual - 1;
            }
            else {
                this.showPaketKontraktual = true;
                this.colspanKontraktual = this.colspanKontraktual + 1;
            }
        },
        functionshowPaguKontraktual() {
            if (this.showPaguKontraktual == true) {
                this.showPaguKontraktual = false;
                this.colspanKontraktual = this.colspanKontraktual - 1;
            }
            else {
                this.showPaguKontraktual = true;
                this.colspanKontraktual = this.colspanKontraktual + 1;
            }
        },
        functionshowPaketTerkontrak() {
            if (this.showPaketTerkontrak == true) {
                this.showPaketTerkontrak = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
            }
            else {
                this.showPaketTerkontrak = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
            }
        },
        functionshowPaguTerkontrak() {
            if (this.showPaguTerkontrak == true) {
                this.showPaguTerkontrak = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
            }
            else {
                this.showPaguTerkontrak = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
            }
        },
        functionshowNilaiTerkontrak() {
            if (this.showNilaiTerkontrak == true) {
                this.showNilaiTerkontrak = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
            }
            else {
                this.showNilaiTerkontrak = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
            }
        },
        functionshowSisaLelangRM() {
            if (this.showSisaLelangRM == true) {
                this.showSisaLelangRM = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
                this.colspanSisaLelang = this.colspanSisaLelang - 1;
            }
            else {
                this.showSisaLelangRM = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
                this.colspanSisaLelang = this.colspanSisaLelang + 1;
            }
        },
        functionshowSisaLelangPHLN() {
            if (this.showSisaLelangPHLN == true) {
                this.showSisaLelangPHLN = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
                this.colspanSisaLelang = this.colspanSisaLelang - 1;
            }
            else {
                this.showSisaLelangPHLN = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
                this.colspanSisaLelang = this.colspanSisaLelang + 1;
            }
        },
        functionshowSisaLelangSBSN() {
            if (this.showSisaLelangSBSN == true) {
                this.showSisaLelangSBSN = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
                this.colspanSisaLelang = this.colspanSisaLelang - 1;
            }
            else {
                this.showSisaLelangSBSN = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
                this.colspanSisaLelang = this.colspanSisaLelang + 1;
            }
        },
        functionshowSisaLelangTotal() {
            if (this.showSisaLelangTotal == true) {
                this.showSisaLelangTotal = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
                this.colspanSisaLelang = this.colspanSisaLelang - 1;
            }
            else {
                this.showSisaLelangTotal = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
                this.colspanSisaLelang = this.colspanSisaLelang + 1;
            }
        },
        functionshowRealisasiRupiah() {
            if (this.showRealisasiRupiah == true) {
                this.showRealisasiRupiah = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
                this.colspanRealisasi = this.colspanRealisasi - 1;
            }
            else {
                this.showRealisasiRupiah = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
                this.colspanRealisasi = this.colspanRealisasi + 1;
            }
        },
        functionshowRealisasiKeu() {
            if (this.showRealisasiKeu == true) {
                this.showRealisasiKeu = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
                this.colspanRealisasi = this.colspanRealisasi - 1;
            }
            else {
                this.showRealisasiKeu = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
                this.colspanRealisasi = this.colspanRealisasi + 1;
            }
        },
        functionshowRealisasiFisik() {
            if (this.showRealisasiFisik == true) {
                this.showRealisasiFisik = false;
                this.colspanTerkontrak = this.colspanTerkontrak - 1;
                this.colspanRealisasi = this.colspanRealisasi - 1;
            }
            else {
                this.showRealisasiFisik = true;
                this.colspanTerkontrak = this.colspanTerkontrak + 1;
                this.colspanRealisasi = this.colspanRealisasi + 1;
            }
        },
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
            await mainAPI.get("kontraktual_emon-GetBalaiSDA?random=" + random + "&tahun=" + this.selectedtahun).then(
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