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
                            <h5>Detail Progres Fisik & Keuangan</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Detail Progres Fisik & Keuangan</li>
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
                                                    type="checkbox" id="customCheckboxTipe" value="optionTipe" checked
                                                    @click="showKode = !showKode">
                                                <label for="customCheckboxTipe" class="custom-control-label">
                                                    Kode
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxKode" value="optionKode" checked
                                                    @click="showKegiatan = !showKegiatan">
                                                <label for="customCheckboxKode" class="custom-control-label">
                                                    Kegiatan
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxVolume" value="optionVolume"
                                                    @click="showVolume = !showVolume">
                                                <label for="customCheckboxVolume" class="custom-control-label">
                                                    Volume
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxSatuan" value="optionSatuan"
                                                    @click="showSatuan = !showSatuan">
                                                <label for="customCheckboxSatuan" class="custom-control-label">
                                                    Satuan
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxLokasi" value="optionLokasi"
                                                    @click="showLokasi = !showLokasi">
                                                <label for="customCheckboxLokasi" class="custom-control-label">
                                                    Lokasi
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxJenisPaket"
                                                    value="optionJenisPaket" @click="showJenisPaket = !showJenisPaket">
                                                <label for="customCheckboxJenisPaket" class="custom-control-label">
                                                    Jenis Paket
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxMetode" value="optionMetode"
                                                    @click="showMetode = !showMetode">
                                                <label for="customCheckboxMetode" class="custom-control-label">
                                                    Metode
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxSumberDana"
                                                    value="optionSumberDana" @click="showSumberDana = !showSumberDana">
                                                <label for="customCheckboxSumberDana" class="custom-control-label">
                                                    Sumber Dana
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxPagu" value="optionPagu" checked
                                                    @click="showPagu = !showPagu">
                                                <label for="customCheckboxPagu" class="custom-control-label">
                                                    Pagu
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxRealisasi" value="optionRealisasi"
                                                    checked @click="showRealisasi = !showRealisasi">
                                                <label for="customCheckboxRealisasi" class="custom-control-label">
                                                    Realisasi
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxKeu" value="optionKeu" checked
                                                    @click="showKeu = !showKeu">
                                                <label for="customCheckboxKeu" class="custom-control-label">
                                                    Keu.
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxFisik" value="optionFisik" checked
                                                    @click="showFisik = !showFisik">
                                                <label for="customCheckboxFisik" class="custom-control-label">
                                                    Fisik
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxPaguE" value="optionPaguE" checked
                                                    @click="showPaguE = !showPaguE">
                                                <label for="customCheckboxPaguE" class="custom-control-label">
                                                    Pagu Efisiensi
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxKeuE" value="optionKeuE" checked
                                                    @click="showKeuE = !showKeuE">
                                                <label for="customCheckboxKeuE" class="custom-control-label">
                                                    Keu. Efisiensi
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxFisikE" value="optionFisikE"
                                                    checked @click="showFisikE = !showFisikE">
                                                <label for="customCheckboxFisikE" class="custom-control-label">
                                                    Fisik. Efisiensi
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
                                        <div class="col-sm-6" v-if="leveluser == 1" style="display: none;">
                                            <label>Unit Organisasi</label>
                                            <v-select :options="kdunor" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedkdunor" @update:modelValue="onkdunorChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-6" v-if="leveluser <= 5">
                                            <label>Pusat / Balai</label>
                                            <v-select :options="kategorisatker" :reduce="(label) => label.code"
                                                label="label" v-model="defaultSelectedkategorisatker"
                                                @update:modelValue="onkategorisatkerChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-6" v-if="leveluser >= 1">
                                            <label>Satker</label>
                                            <v-select :options="satker" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedsatker" @update:modelValue="onsatkerChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-6" v-if="leveluser <= 5">
                                            <label>Kegiatan</label>
                                            <v-select :options="kegiatan" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedkegiatan" @update:modelValue="onkegiatanChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-6" v-if="leveluser <= 5">
                                            <label>Klasifikasi Rincian Output</label>
                                            <v-select :options="klasifikasirincianoutput"
                                                :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedklasifikasirincianoutput"
                                                @update:modelValue="onklasifikasirincianoutputChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-6" v-if="leveluser <= 5">
                                            <label>Rincian Output</label>
                                            <v-select :options="rincianoutput" :reduce="(label) => label.code"
                                                label="label" v-model="defaultSelectedrincianoutput"
                                                @update:modelValue="onrincianoutputChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-6">
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
                                    @click="G_tableCSVTabel1('_DetailProgres_')">
                                    <i class="fas fa-download"></i>
                                    <span style="font-size: smaller;">Unduh Data .xlsx</span>
                                </button>
                            </a>
                        </div>
                        <div class="col-sm-12 text-center wow fadeInDown">&nbsp;</div>

                        <div class="col-sm-12 wow fadeInDown">
                            <div class="table-responsive table-wrapper">
                                <table class="table m-0" id="tabeldata" style="font-size: x-small;">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;" v-if="showNo">No</th>
                                            <th style="width: 50px;" v-if="showKode">Kode</th>
                                            <th style="width: 200px;" v-if="showKegiatan">Kegiatan/KRO/RO/Paket</th>
                                            <th style="width: 50px;" v-if="showVolume">Target<br>Volume</th>
                                            <th style="width: 50px;" v-if="showSatuan">Satuan</th>
                                            <th style="width: 50px;" v-if="showLokasi">Lokasi</th>
                                            <th style="width: 50px;" v-if="showJenisPaket">Jenis Paket</th>
                                            <th style="width: 50px;" v-if="showMetode">Metode Pemilihan</th>
                                            <th style="width: 10px;" v-if="showSumberDana">Sumber Dana</th>
                                            <th style="width: 50px;" v-if="showPagu">Pagu<br>(Rp Ribu)</th>
                                            <th style="width: 50px;" v-if="showRealisasi">Realisasi<br>(Rp Ribu)</th>
                                            <th style="width: 50px;" v-if="showKeu">Keu.<br>(%)</th>
                                            <th style="width: 50px;" v-if="showFisik">Fisik<br>(%)</th>
                                            <th style="width: 50px;" v-if="showPaguE">
                                                Pagu<br>Setelah<br>Efisiensi<br>(Rp Ribu)</th>
                                            <th style="width: 50px;" v-if="showKeuE">Keu.<br>Setelah<br>Efisiensi<br>(%)
                                            </th>
                                            <th style="width: 50px;" v-if="showFisikE">
                                                Fisik<br>Setelah<br>Efisiensi<br>(%)</th>
                                        </tr>
                                    </thead>
                                    <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
                                        <tbody>
                                            <tr>
                                                <td class="text-center" :class="datalist.class" v-if="showNo">
                                                    <span v-if="urutlist > 0">{{ urutlist }}</span>
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showKode">
                                                    {{ datalist.kdgiat }}
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showKegiatan">
                                                    {{ datalist.nmgiat }}
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showVolume"
                                                    data-z="#,##0">
                                                    {{ G_numFormat(datalist.vol) }}
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showSatuan">
                                                    {{ datalist.satuan }}
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showLokasi">
                                                    {{ datalist.kabkota }}<br>{{ datalist.lokasi }}
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showJenisPaket">
                                                    {{ datalist.kategori }}
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showMetode">
                                                    {{ datalist.metode }}
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showSumberDana">
                                                    {{ datalist.sumber_dana }}
                                                </td>
                                                <td class="text-right" :class="datalist.class" v-if="showPagu"
                                                    data-z="#,##0" :data-v="datalist.pagu">
                                                    {{ G_numFormat(datalist.pagu) }}
                                                </td>
                                                <td class="text-right" :class="datalist.class" v-if="showRealisasi"
                                                    data-z="#,##0" :data-v="datalist.realisasi">
                                                    {{ G_numFormat(datalist.realisasi) }}
                                                </td>
                                                <td class="text-right" :class="datalist.class" v-if="showKeu"
                                                    data-z="#,##0.00" :data-v="datalist.persenkeu">
                                                    {{ G_numFormatKoma(datalist.persenkeu) }}
                                                </td>
                                                <td class="text-right" :class="datalist.class" v-if="showFisik"
                                                    data-z="#,##0.00" :data-v="datalist.persenfisik">
                                                    {{ G_numFormatKoma(datalist.persenfisik) }}
                                                </td>
                                                <td class="text-right" :class="datalist.class" v-if="showPaguE"
                                                    data-z="#,##0" :data-v="datalist.pagu_efisiensi">
                                                    {{ G_numFormat(datalist.pagu_efisiensi) }}
                                                </td>
                                                <td class="text-right" :class="datalist.class" v-if="showKeuE"
                                                    data-z="#,##0.00" :data-v="datalist.persenkeu_efisiensi">
                                                    {{ G_numFormatKoma(datalist.persenkeu_efisiensi) }}
                                                </td>
                                                <td class="text-right" :class="datalist.class" v-if="showFisikE"
                                                    data-z="#,##0.00" :data-v="datalist.persenfisik_efisiensi">
                                                    {{ G_numFormatKoma(datalist.persenfisik_efisiensi) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                    <tbody v-if="(datapesan == 'data kosong')">
                                        <tr>
                                            <td colspan="8">Data masih kosong</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            &nbsp;
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            &nbsp;
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            &nbsp;
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
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import Footer from "../../componen/Footer.vue";
import NavBar from "../../componen/NavBar.vue";
import Menu from "../../componen/Menu.vue";

import VueApexCharts from "vue3-apexcharts";
window.Apex.chart = { fontFamily: "Poppins-SemiBold, Arial, sans-serif" };
export default {
    setup() {
        const route = useRoute()
        watch(() => route.name, () => {
        });

        return { route };
    },
    components: {
        Footer, NavBar, Menu, vSelect, swal
    },
    data() {
        return {
            halamanloading: true,
            secretencData: decodeURIComponent(CryptoJS.AES.decrypt(this.route.params.id, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString(CryptoJS.enc.Utf8)),
            showNo: true,
            showKode: true,
            showKegiatan: true,
            showSatuan: false,
            showVolume: false,
            showLokasi: false,
            showJenisPaket: false,
            showMetode: false,
            showSumberDana: false,
            showPagu: true,
            showRealisasi: true,
            showKeu: true,
            showFisik: true,
            showPaguE: true,
            showKeuE: true,
            showFisikE: true,
            tanggalemon: new Date(),
            carikata: '',
            iduser: JSON.parse(localStorage.getItem("usistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            levpiusistem: JSON.parse(localStorage.getItem("levpiusistem")),
            ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
            nmksatkersistem: JSON.parse(localStorage.getItem("nmksatkersistem")),
            kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
            nmsatkersistem: JSON.parse(localStorage.getItem("nmsatkersistem")),
            datapesanreff: '',
            datapesan: '',
            datamaster: [],
            isiandata: [],
            isiandatadetail: [],
            mode: '',
            kode: '',
            kode_unique: '',
            opsi: '',
            id: '',
            parent: '',
            level: '',
            nama: '',
            urut: 1,
            tahun: JSON.parse(localStorage.getItem("tahunpkakhir")),
            kdunor: [],
            datakdunor: [],
            defaultSelectedkdunor: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkdunor: '',

            kategorisatker: [],
            datakategorisatker: [],
            defaultSelectedkategorisatker: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkategorisatker: '',

            satuan: [],
            datasatuan: [],
            defaultSelectedsatuan: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedsatuan: '',

            output: [],
            dataoutput: [],
            defaultSelectedoutput: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedoutput: '',

            outcome: [],
            dataoutcome: [],
            defaultSelectedoutcome: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedoutcome: '',


            listtahun: [],
            datatahun: [],
            defaultSelectedtahun: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: 0,
            },
            selectedtahun: JSON.parse(localStorage.getItem("tahunpkakhir")),

            satker: [],
            datasatker: [],
            defaultSelectedsatker: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            },
            selectedsatker: '',
            selectedlabelsatker: '',
            tahun_awal: 0,
            tahun_akhir: 0,
            dataemon: [],
            emontahun1: [],
            emontahun2: [],
            emontahun3: [],
            emontahun4: [],
            emontahun5: [],
            id_datapk: '',
            tahunemon: '',
            kodesatkeremon: '',
            kodekegiatanemon: '',
            namasatuan: '',
            namaoutput: '',
            namaoutcome: '',
            hitungan_pk: '',
            jumlahbaris: 0,
            validasi: false,

            kegiatan: [],
            datakegiatan: [],
            defaultSelectedkegiatan: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkegiatan: '',
            klasifikasirincianoutput: [],
            dataklasifikasirincianoutput: [],
            defaultSelectedklasifikasirincianoutput: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedklasifikasirincianoutput: '',
            rincianoutput: [],
            datarincianoutput: [],
            defaultSelectedrincianoutput: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedrincianoutput: '',
            tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
        }
    },
    computed: {
        filteredKataData() {
            const filteredWorkers = this.carikata === ""
                ? this.dataemon
                : this.dataemon.filter(wo => Object.values(wo).join("").toLowerCase().indexOf(this.carikata.toLowerCase()) !== -1);
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
            var wb = XLSX.utils.table_to_book(document.getElementById('tabeldata'), { sheet: "DetailProgres" });
            XLSX.writeFile(wb, this.G_formatDate(Date(), 'd-M-Y') + namefile + ".xlsx");
            this.halamanloading = false;
        },
        formattulisrupiah(kodenya) {
            var rupiah = document.getElementById(kodenya);
            rupiah.addEventListener('keyup', function (e) {
                // tambahkan 'Rp.' pada saat form di ketik
                // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
                rupiah.value = formatRupiah(this.value, '');
            });

            /* Fungsi formatRupiah */
            function formatRupiah(angka, prefix) {
                var separator = '';
                var number_string = angka.replace(/[^,\d]/g, '').toString(),
                    split = number_string.split(','),
                    sisa = split[0].length % 3,
                    rupiah = split[0].substr(0, sisa),
                    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

                // tambahkan titik jika yang di input sudah menjadi angka ribuan
                if (ribuan) {
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }

                rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
                return prefix == undefined ? rupiah : (rupiah ? rupiah : '');
            }
        },
        pilihsemua() {
            if (document.getElementById('customallSwitchAuth').checked == true) {
                $('.mailbox-messages input[type=\'checkbox\']').prop('checked', true);
            }
            else {
                $('.mailbox-messages input[type=\'checkbox\']').prop('checked', false);
            }
        },
        async bukaemon(id, tahun, kodesatker, kodekegiatan) {
            if (id == null) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Isikan data dan simpan terlebih dahulu untuk tagging data emon',
                });
                return false;
            }
            this.id_datapk = id;
            this.tahunemon = tahun;
            this.kodesatkeremon = kodesatker;
            this.kodekegiatanemon = kodekegiatan;
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPI.get("pksatker-GetEmon?random=" + random + "&id=" + id + "&kodesatker=" + kodesatker + "&tahun=" + tahun + "&kodekegiatan=" + kodekegiatan).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.dataemon = [];
                        this.dataemon = Response.data.content.data;
                    }
                    else {
                        this.dataemon = [];
                    }
                    $('#costumModalemon').modal('show');
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                //this.ClearlocalStorage();
                this.halamanloading = false;
            });
        },
        onkdunorChange(a) {
            try {
                this.selectedkdunor = this.kdunor[a].tag;
            }
            catch (err) {
                return;
            }

            this.defaultSelectedkategorisatker = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedkategorisatker = '';
            this.AmbilDatakategorisatker();
            this.defaultSelectedsatker = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            };
            this.selectedsatker = '';
            this.AmbilDatasatker();

        },
        onkategorisatkerChange(a) {
            try {
                this.selectedkategorisatker = this.kategorisatker[a].tag;
            }
            catch (err) {
                return;
            }
            this.defaultSelectedsatker = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            };
            this.selectedsatker = '';
            this.AmbilDatasatker();

            this.defaultSelectedkegiatan = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedkegiatan = '';
            this.AmbilDatakegiatan();
            this.defaultSelectedklasifikasirincianoutput = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedklasifikasirincianoutput = '';
            this.AmbilDataklasifikasirincianoutput();
            this.defaultSelectedrincianoutput = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedrincianoutput = '';
            this.AmbilDatarincianoutput();
            this.ambildata();
        },
        onkegiatanChange(a) {
            try {
                this.selectedkegiatan = this.kegiatan[a].tag;
            }
            catch (err) {
                return;
            }
            this.defaultSelectedklasifikasirincianoutput = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedklasifikasirincianoutput = '';
            this.AmbilDataklasifikasirincianoutput();
            this.defaultSelectedrincianoutput = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedrincianoutput = '';
            this.AmbilDatarincianoutput();
            this.ambildata();
        },
        onklasifikasirincianoutputChange(a) {
            try {
                this.selectedklasifikasirincianoutput = this.klasifikasirincianoutput[a].tag;
            }
            catch (err) {
                return;
            }
            this.defaultSelectedrincianoutput = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedrincianoutput = '';
            this.AmbilDatarincianoutput();
            this.ambildata();
        },
        onrincianoutputChange(a) {
            try {
                this.selectedrincianoutput = this.rincianoutput[a].tag;
            }
            catch (err) {
                return;
            }
            this.ambildata();
        },
        onsatkerChange(a) {
            try {
                this.selectedsatker = this.satker[a].tag;
                this.selectedlabelsatker = this.satker[a].label;
            }
            catch (err) {
                return;
            }
            this.defaultSelectedkegiatan = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedkegiatan = '';
            this.AmbilDatakegiatan();
            this.defaultSelectedklasifikasirincianoutput = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedklasifikasirincianoutput = '';
            this.AmbilDataklasifikasirincianoutput();
            this.ambildata();
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
        async AmbilDatakegiatan() {
            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI2.get("parastapainnovationreff-GetKegiatan?random=" + random + "&kdbalai=" + this.selectedkategorisatker + "&kode_satker=" + this.selectedsatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakegiatan = [];
                        this.kegiatan = [];
                        this.datakegiatan = Response.data.content.data;
                        this.datakegiatan.forEach((item) => {
                            this.kegiatan.push({
                                label: '[' + item.kode + '] ' + item.nama,
                                code: this.datakegiatan.indexOf(item) + 1,
                                tag: item.kode,
                            });
                        });
                        this.kegiatan.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        async AmbilDataklasifikasirincianoutput() {
            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI2.get("parastapainnovationreff-GetKlasifikasiRincianOutput?random=" + random + "&kdbalai=" + this.selectedkategorisatker + "&kode_satker=" + this.selectedsatker + "&kdgiat=" + this.selectedkegiatan).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.dataklasifikasirincianoutput = [];
                        this.klasifikasirincianoutput = [];
                        this.dataklasifikasirincianoutput = Response.data.content.data;
                        this.dataklasifikasirincianoutput.forEach((item) => {
                            this.klasifikasirincianoutput.push({
                                label: '[' + item.kdgiat + '.' + item.kode + '] ' + item.nama,
                                code: this.dataklasifikasirincianoutput.indexOf(item) + 1,
                                tag: item.kode,
                            });
                        });
                        this.klasifikasirincianoutput.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        async AmbilDatarincianoutput() {
            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI2.get("parastapainnovationreff-DataRincianOutput?random=" + random + "&kdbalai=" + this.selectedkategorisatker + "&kode_satker=" + this.selectedsatker + "&kdgiat=" + this.selectedkegiatan + "&kdoutput=" + this.selectedklasifikasirincianoutput).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datarincianoutput = [];
                        this.rincianoutput = [];
                        this.datarincianoutput = Response.data.content.data;
                        this.datarincianoutput.forEach((item) => {
                            this.rincianoutput.push({
                                label: '[' + item.kdgiat + '.' + item.kdoutput + '.' + item.kode + '] ' + item.nama,
                                code: this.datarincianoutput.indexOf(item) + 1,
                                tag: item.kode,
                            });
                        });
                        this.rincianoutput.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        async AmbilDatakategorisatker() {
            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI2.get("parastapainnovationreff-GetKategoriSatker?random=" + random + "&kdunor=" + this.selectedkdunor).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakategorisatker = [];
                        this.kategorisatker = [];
                        this.datakategorisatker = Response.data.content.data;
                        this.datakategorisatker.forEach((item) => {
                            this.kategorisatker.push({
                                label: item.nama,
                                code: this.datakategorisatker.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.kategorisatker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        async AmbilDatasatker() {
            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI2.get("parastapainnovationsatker-GetAll?random=" + random + "&kdunor=" + this.selectedkdunor + "&kategorisatker=" + this.selectedkategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatker = [];
                        this.satker = [];
                        this.datasatker = Response.data.content.data;
                        this.datasatker.forEach((item) => {
                            this.satker.push({
                                label: '[' + item.kode_satker + '] ' + item.nama_satker,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.kode_satker,
                            });
                        });
                        this.satker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        async AmbilDataReff() {
            var pilihkategorisatker = '';
            var pilihsatker = '';
            if (this.secretencData.includes("_")) {
                var temp = this.secretencData.split("_");
                this.selectedsatker = temp[1];
                this.selectedkategorisatker = temp[0];
                pilihsatker = this.selectedsatker;
                pilihkategorisatker = this.selectedkategorisatker;
                this.selectedtahun = temp[2];
            }
            else {
                if (this.leveluser != 1) {
                    this.selectedsatker = this.kdsatkersistem;
                    pilihsatker = this.kdsatkersistem;
                    this.selectedkategorisatker = this.kdsatkersistem;
                    pilihkategorisatker = this.ksatkersistem;
                }
                else {
                    pilihsatker = this.selectedsatker;
                    pilihkategorisatker = this.selectedkategorisatker;
                }
                this.jumlahbaris = 1;
            }
            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetUnor?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datakdunor = [];
                        this.kdunor = [];
                        this.datakdunor = Response.data.content.data;
                        this.datakdunor.forEach((item) => {
                            this.kdunor.push({
                                label: item.nama,
                                code: this.datakdunor.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.kdunor.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
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
                            if (item.tahun == this.selectedtahun) {
                                this.selectedtahun = item.tahun;
                                this.defaultSelectedtahun = {
                                    code: this.datatahun.indexOf(item),
                                    label: item.tahun,
                                    tag: item.id,
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
            await mainAPIData.get("tanggal_emon-GetData?random=" + random + "&tahun=" + this.selectedtahun).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.tanggalemon = Response.data.content.data[0].tanggalemon;
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
            await mainAPIData.get("parastapainnovationreff-GetKategoriSatker?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakategorisatker = [];
                        this.kategorisatker = [];
                        this.datakategorisatker = Response.data.content.data;
                        this.datakategorisatker.forEach((item) => {
                            if (item.id == pilihkategorisatker) {
                                this.defaultSelectedkategorisatker = {
                                    code: this.datakategorisatker.indexOf(item) + 1,
                                    label: item.nama,
                                    tag: item.id,
                                };
                            }
                            this.kategorisatker.push({
                                label: item.nama,
                                code: this.datakategorisatker.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.kategorisatker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
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
            await mainAPIData.get("parastapainnovationsatker-GetAll?random=" + random + "&kategorisatker=" + pilihkategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatker = [];
                        this.satker = [];
                        this.datasatker = Response.data.content.data;
                        this.datasatker.forEach((item) => {
                            if (item.kode_satker == pilihsatker) {
                                this.defaultSelectedsatker = {
                                    code: this.datasatker.indexOf(item) + 1,
                                    label: '[' + item.kode_satker + '] ' + item.nama_satker,
                                    tag: item.kode_satker,
                                };
                            }
                            this.satker.push({
                                label: '[' + item.kode_satker + '] ' + item.nama_satker,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.kode_satker,
                            });
                        });
                        this.satker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            await mainAPIData.get("parastapainnovationreff-GetKegiatan?random=" + random + "&kdbalai=" + pilihkategorisatker + "&kode_satker=" + pilihsatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakegiatan = [];
                        this.kegiatan = [];
                        this.datakegiatan = Response.data.content.data;
                        this.datakegiatan.forEach((item) => {
                            this.kegiatan.push({
                                label: '[' + item.kode + '] ' + item.nama,
                                code: this.datakegiatan.indexOf(item) + 1,
                                tag: item.kode,
                            });
                        });
                        this.kegiatan.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            await mainAPIData.get("parastapainnovationreff-GetKlasifikasiRincianOutput?random=" + random + "&kdbalai=" + pilihkategorisatker + "&kode_satker=" + pilihsatker + "&kdgiat=" + this.selectedkegiatan).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.dataklasifikasirincianoutput = [];
                        this.klasifikasirincianoutput = [];
                        this.dataklasifikasirincianoutput = Response.data.content.data;
                        this.dataklasifikasirincianoutput.forEach((item) => {
                            this.klasifikasirincianoutput.push({
                                label: '[' + item.kdgiat + '.' + item.kode + '] ' + item.nama,
                                code: this.dataklasifikasirincianoutput.indexOf(item) + 1,
                                tag: item.kode,
                            });
                        });
                        this.klasifikasirincianoutput.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })


            await mainAPIData.get("parastapainnovationreff-DataRincianOutput?random=" + random + "&kdbalai=" + pilihkategorisatker + "&kode_satker=" + pilihsatker + "&kdgiat=" + this.selectedkegiatan + "&kdoutput=" + this.selectedklasifikasirincianoutput).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datarincianoutput = [];
                        this.rincianoutput = [];
                        this.datarincianoutput = Response.data.content.data;
                        this.datarincianoutput.forEach((item) => {
                            this.rincianoutput.push({
                                label: '[' + item.kdgiat + '.' + item.kdoutput + '.' + item.kode + '] ' + item.nama,
                                code: this.datarincianoutput.indexOf(item) + 1,
                                tag: item.kode,
                            });
                        });
                        this.rincianoutput.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        async ambildata() {
            this.jumlahbaris = 0;
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            var random = Math.random();
            this.halamanloading = true;
            //alert(this.selectedklasifikasirincianoutput);
            await mainAPI.get("detailprogres_emon-GetData?random=" + random + "&tahun=" + this.selectedtahun + "&kode_satker=" + this.selectedsatker + "&kdgiat=" + this.selectedkegiatan + "&kdoutput=" + this.selectedklasifikasirincianoutput + "&kdsoutput=" + this.selectedrincianoutput).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.tanggalemon = Response.data.content.tanggalemon;
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                        this.jumlahbaris = this.datamaster.length;
                    }
                    else {
                        this.datamaster = [];
                        this.jumlahbaris = 1;
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                //this.ClearlocalStorage();
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