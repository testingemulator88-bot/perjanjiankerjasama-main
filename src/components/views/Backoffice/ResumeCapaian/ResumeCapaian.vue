<template>
    <div class="wrapper">
        <NavBar />
        <Menu />
        <!-- Spinner Start -->
        <div id="spinner" v-if="halamanloading || datamaster.length <= 0"
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
                            <h5>Resume Capaian B/BWS</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Resume Capaian B/BWS</li>
                            </ol>
                        </div>
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 wow fadeInDown" v-if="leveluser == 1" style="display: none;">
                            <label>Unit Organisasi</label>
                            <v-select :options="kdunor" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedkdunor" @update:modelValue="onkdunorChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 wow fadeInDown"
                            v-if="leveluser == 1 || leveluser.includes(2) || leveluser.includes(5) || leveluser == 6">
                            <label>Pusat / Balai</label>
                            <v-select :options="kategorisatker" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedkategorisatker" @update:modelValue="onkategorisatkerChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            <label>Pilihan Data Tahun</label>
                            <v-select :options="listtahun" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedtahun" @update:modelValue="ontahunChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">&nbsp;</div>
                        <div class="col-sm-12 text-center wow fadeInDown">
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                @click="eksportresumepk('_ResumeBalai_')" style="font-size: smaller !important;">
                                <i class="fas fa-file-excel"></i>
                                Eksport Excel
                            </button>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">&nbsp;</div>
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="table-responsive table-wrapper">
                                <table class="table m-0" id="tabeldata" style="font-size: smaller;">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;" rowspan="2">TIPE</th>
                                            <th style="width: 450px;" rowspan="2">
                                                PROGRAM/SASARAN
                                                PROGRAM/INDIKATOR SASARAN PROGRAM/KEGIATAN/SASARAN KEGIATAN/INDIKATOR
                                                SASARAN KEGIATAN
                                            </th>
                                            <th style="width: 100px;" colspan="2">TARGET</th>
                                            <th style="width: 100px;" colspan="2">CAPAIAN</th>
                                            <th style="width: 50px;">KINERJA</th>
                                        </tr>
                                        <tr>
                                            <th style="width: 50px;">Volume</th>
                                            <th style="width: 50px;">Satuan</th>
                                            <th style="width: 50px;">Volume</th>
                                            <th style="width: 50px;">Satuan</th>
                                            <th style="width: 50px;">%</th>
                                        </tr>
                                    </thead>
                                    <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
                                        <tbody>
                                            <tr>
                                                <td class="text-center" :class="datalist.class">
                                                    {{ datalist.level }} {{ datalist.kode }}
                                                </td>
                                                <td :class="datalist.class" colspan="6">
                                                    {{ datalist.textindikator }}
                                                </td>

                                            </tr>
                                            <tr v-for="(databalai, urutbalai) in datalist.balai" :key="urutbalai">
                                                <td class="text-center">
                                                    {{ urutbalai + 1 }}
                                                </td>
                                                <td>
                                                    {{ databalai.nama_balai }}
                                                </td>
                                                <td class="text-center">
                                                    {{ databalai.targetkumulatif }}
                                                </td>
                                                <td class="text-center">
                                                    <span v-html="datalist.namasatuan"></span>
                                                </td>
                                                <td class="text-center">
                                                    {{ databalai.capaian }}
                                                </td>
                                                <td class="text-center">
                                                    <span v-html="datalist.namasatuan"></span>
                                                </td>
                                                <td class="text-center">
                                                    {{ databalai.kinerja }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
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
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { quillEditor } from 'vue3-quill';
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
        Footer, NavBar, Menu, vSelect, swal, quillEditor
    },
    data() {
        return {
            halamanloading: true,
            showOpsi: true,
            showTipe: true,
            showKode: true,
            showKodeUnique: false,
            showIndikator: true,
            showSatuan: true,
            showOuput: true,
            showOutcome: true,
            showPelaksana: true,
            showRumus: true,
            showCapaian: true,
            carikata: '',
            iduser: JSON.parse(localStorage.getItem("usistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            levpiusistem: JSON.parse(localStorage.getItem("levpiusistem")),
            levpiubalaisistem: JSON.parse(localStorage.getItem("levpiubalaisistem")),
            ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
            kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
            verifsistem: JSON.parse(localStorage.getItem("verifsistem")),
            verif2sistem: JSON.parse(localStorage.getItem("verifsistem2")),
            evaluasisistem: JSON.parse(localStorage.getItem("evaluasisistem")),
            jenis_piusistem: JSON.parse(localStorage.getItem("jenis_piusistem")),
            secretencData: decodeURIComponent(CryptoJS.AES.decrypt(this.route.params.id, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString(CryptoJS.enc.Utf8)),
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
            tahunsekarang: JSON.parse(localStorage.getItem("tahunpkakhir")),
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
                label: 'SEMUA B/BWS',
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
            selectedtahun: '',

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
            level_pejabat: 'Balai',
            kode_satker_pejabat: '',
            lokasi_pejabat: '',
            nama_pejabat: '',
            pangkat_pejabat: '',
            jabatan_pejabat: '',
            nip_pejabat: '',
            tanggal_pejabat: '',
            kolom1: '',
            kolom2: '',
            kolom3: '',
            kolom4: '',
            rumuskolom1: '',
            rumuskolom2: '',
            rumuskolom3: '',
            rumuskolom4: '',
            isian_kolom: '',

            verifikasi: [],
            dataverifikasi: [],
            defaultSelectedverifikasi: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            },
            selectedverifikasi: '',

            jumlahverifikasi: [],
            datajumlahverifikasi: [],
            defaultSelectedjumlahverifikasi: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedjumlahverifikasi: '',

            tanggal: '',
            catatan: '',
            validasi: false,

            id_verif: '',
            level_verif: '',
            tahun_verif: '',
            id_pelaksana_verif: '',
            kode_satker_verif: '',
            jumlah_verif: '',
            hasil_verif: '',
            akan_verif_ke: '',
            tanggal_batas_verif: '',
            catatan_verif: '',
            verifikasi_ke: '',

            cekverif: [],
            tesverif: 1,

            kode_satker: '',
            disablednya: false,

            dari: '',
            kepada: '',
            validasi: false,
            hasilakhir: '',
            shortcutinput: '0',
            tempkodebalai: '',
            pk_aktif: '3',
            ttd: '0',
            filenya_ttd: '',
            folder_ttd: process.env.VUE_APP_URL_API + 'ttdpk-Gambar?f=',
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
        async eksportresumepk(namefile) {
            var kategorisatker = '';
            if ((this.leveluser != 1) && (!this.leveluser.includes(2)) && (!this.leveluser.includes(5))) {
                if (this.secretencData.includes("_")) {
                    var temp = this.secretencData.split("_");
                    kategorisatker = temp[0];
                }
                else {
                    kategorisatker = this.secretencData;
                }
            }
            else {
                if (this.secretencData.includes("_")) {
                    var temp = this.secretencData.split("_");
                    kategorisatker = temp[0];
                }
                else {
                    kategorisatker = this.selectedkategorisatker;
                }
            }

            if (kategorisatker == '') {
                kategorisatker = '1';
            }
            this.halamanloading = true;
            const mainAPI5 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
                responseType: 'blob',
            });
            var random = Math.random();
            //alert(this.awalminggunya);
            //alert(this.akhirminggunya);
            const filename = this.G_formatDate(Date(), 'd-M-Y') + '_' + namefile + '.xlsx';
            var paramurl = "";
            paramurl = "EksportExcel-Balai?random=" + random + "&tahun=" + this.selectedtahun + "&kodebalai=" + kategorisatker;
            await mainAPI5.get(paramurl).then(
                response => {
                    // Buat link download dari blob
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename); // nama file
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', 'Export gagal: ' + error, 'error');
                // this.ClearlocalStorage();
                console.log(error);
                this.halamanloading = false;
            });
        },
        getOtentifikasi() {
            var time = Date.parse(localStorage.getItem("tsistem"));
            var timeakhir = time + (3 * 60 * 60 * 1000);
            var timesekarang = Date.parse(new Date());
            if (timesekarang > timeakhir) {
                this.ClearlocalStorage();
            }
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

        },
        onkategorisatkerChange(a) {
            try {
                this.selectedkategorisatker = this.kategorisatker[a].tag;
            }
            catch (err) {
                return;
            }
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
        async AmbilDatakategorisatker() {
            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI2.get("parastapainnovationCapaianReff-KategoriSatker?random=" + random + "&kdunor=" + this.selectedkdunor).then(
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
                            label: 'SEMUA B/BWS',
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
            await mainAPIData.get("parastapainnovationreff-GetSatuan?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datasatuan = [];
                        this.satuan = [];
                        this.datasatuan = Response.data.content.data;
                        this.datasatuan.forEach((item) => {
                            this.satuan.push({
                                label: item.nama,
                                code: this.datasatuan.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.satuan.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });

                        this.dataoutput = [];
                        this.output = [];
                        this.dataoutput = Response.data.content.data;
                        this.dataoutput.forEach((item) => {
                            this.output.push({
                                label: item.nama,
                                code: this.dataoutput.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.output.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });

                        this.dataoutcome = [];
                        this.outcome = [];
                        this.dataoutcome = Response.data.content.data;
                        this.dataoutcome.forEach((item) => {
                            this.outcome.push({
                                label: item.nama,
                                code: this.dataoutcome.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.outcome.unshift({
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
            await mainAPIData.get("parastapainnovationreff-RenstraTahun?random=" + random).then(
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
                                tag: item.id,
                            });
                            if (item.is_active == '1') {
                                this.selectedtahun = item.id;
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
            await mainAPIData.get("parastapainnovationreff-GetLevelPIU?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datapelaksana = [];
                        this.pelaksana = [];
                        this.datapelaksana = Response.data.content.data;
                        this.datapelaksana.forEach((item) => {
                            this.pelaksana.push({
                                label: item.nama,
                                code: this.datapelaksana.indexOf(item),
                                tag: item.id,
                            });
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
            await mainAPIData.get("parastapainnovationreff-GetNilai?random=" + random).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        this.datahitungan_pk = [];
                        this.hitungan_pk = [];
                        this.datahitungan_pk = Response.data.content.data;
                        this.datahitungan_pk.forEach((item) => {
                            this.hitungan_pk.push({
                                label: item.nama,
                                code: this.datahitungan_pk.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.hitungan_pk.unshift({
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
            var kategorisatker = '';
            if (this.leveluser.includes(6)) {
                kategorisatker = this.secretencData;
            }
            else {
                kategorisatker = this.selectedkategorisatker;
            }
            var random = Math.random();
            var id = '';
            if (this.leveluser.includes(6)) {
                id = this.ksatkersistem;
            }
            await mainAPIData.get("parastapainnovationCapaianReff-KategoriSatker?random=" + random + "&kdbalai=" + id).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakategorisatker = [];
                        this.kategorisatker = [];
                        this.datakategorisatker = Response.data.content.data;
                        this.datakategorisatker.forEach((item) => {
                            if (item.id == kategorisatker) {
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
                            label: 'SEMUA B/BWS',
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
            await mainAPIData.get("parastapainnovationreff-GetVerifikasi?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.dataverifikasi = [];
                        this.verifikasi = [];
                        this.dataverifikasi = Response.data.content.data;
                        this.dataverifikasi.forEach((item) => {
                            this.verifikasi.push({
                                label: item.nama,
                                code: this.dataverifikasi.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.verifikasi.unshift({
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
            await mainAPIData.get("parastapainnovationreff-GetMasterJumlahVerifikasi?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datajumlahverifikasi = [];
                        this.jumlahverifikasi = [];
                        this.datajumlahverifikasi = Response.data.content.data;
                        this.datajumlahverifikasi.forEach((item) => {
                            this.jumlahverifikasi.push({
                                label: item.nama,
                                code: this.datajumlahverifikasi.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.jumlahverifikasi.unshift({
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
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            this.halamanloading = true;
            var random = Math.random();
            await mainAPI.get("parastapainnovationreff-RenstraTahun?random=" + random).then(
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
                                tag: item.id,
                            });
                            if (item.is_active == '1') {
                                this.selectedtahun = item.id;
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
            var kategorisatker = '';
            if ((this.leveluser != 1) && (!this.leveluser.includes(2)) && (!this.leveluser.includes(5))) {
                if (this.secretencData.includes("_")) {
                    var temp = this.secretencData.split("_");
                    kategorisatker = temp[0];
                }
                else {
                    kategorisatker = this.secretencData;
                }
            }
            else {
                if (this.secretencData.includes("_")) {
                    var temp = this.secretencData.split("_");
                    kategorisatker = temp[0];
                }
                else {
                    kategorisatker = this.selectedkategorisatker;
                }
            }
            var id = '';
            if (this.leveluser.includes(6)) {
                id = this.ksatkersistem;
            }
            //alert(this.leveluser);
            var random = Math.random();
            await mainAPI.get("parastapainnovationCapaianReff-KategoriSatker?random=" + random + "&kdbalai=" + id).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datakategorisatker = [];
                        this.kategorisatker = [];
                        this.datakategorisatker = Response.data.content.data;
                        this.datakategorisatker.forEach((item) => {
                            if (item.id == kategorisatker) {
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
                            label: 'SEMUA B/BWS',
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
            //alert(kategorisatker);
            if (kategorisatker == '') {
                kategorisatker = '1';
            }
            this.tempkodebalai = kategorisatker;
            await mainAPI.get("Resume-Capaian?random=" + random + "&tahun=" + this.selectedtahun + "&kodebalai=" + kategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                        this.pk_aktif = '3';
                        this.pk_aktif = Response.data.content.pk_aktif;

                    }
                    else {
                        this.pk_aktif = '3';
                        this.datamaster = [];
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
        if (this.leveluser != 1) {
            this.selectedkategorisatker = this.secretencData;
        }
        this.getOtentifikasi();
        this.AmbilDataReff();
        this.ambildata();
    }
}
</script>
<style></style>