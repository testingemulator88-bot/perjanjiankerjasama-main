<template>
    <div class="wrapper">
        <div class="modal fade" id="costumModalunduhdata" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Daftar Layer</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <div class="col-sm-12">
                            <div class="card cardputih">
                                <div class="card-body p-2">
                                    <div class="table-responsive table-wrapper">
                                        <table class="table m-0" id="tabeldataadi" style="font-size: small;">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">No</th>
                                                    <th style="width: 250px;">Nama Data Layer</th>
                                                    <th style="width: 100px;">Opsi</th>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in daftarunduhlayer" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td class="text-center">
                                                            {{ (urutlist + 1) }}
                                                        </td>
                                                        <td class="text-justify">
                                                            {{ datalist.nama }}
                                                        </td>
                                                        <td class="text-center">
                                                            <button type="button"
                                                                class="btn btn-success btn-sm lebar2 text-white"
                                                                @click="prosesdata(datalist.namalayer)"
                                                                data-toggle="tooltip" data-placement="left"
                                                                title="Lihat data.."><i class="fas fa-download"></i>
                                                                Lihat
                                                                data</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer p-3">

                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12" v-if="(dataunduhlayer.length > 0)">
                            <div class="card cardputih">
                                <div class="card-body p-2 text-center">
                                    <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                        @click="G_tableCSVTabel2('_DetailData_')" data-toggle="tooltip"
                                        data-placement="left" title="Unduh data (.xlsx).."><i
                                            class="far fa-file-excel"></i>
                                        Unduh data
                                        (.xlsx)</button><br><br>
                                    <span v-show="dataunduhlayer.length == 0">Silahkan Pilih Data .....</span>
                                    <center>
                                        <div class="spinner-border text-danger text-center"
                                            style="width: 3rem; height: 3rem;" role="status"
                                            v-show="dataunduhlayer.length == 0">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <span v-show="dataunduhlayer.length == 0">Loading Data .....</span>
                                    </center>
                                    <div class="table-responsive table-wrapper">
                                        <table class="table m-0" id="tabeldataadidata" style="font-size: small;">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">No</th>
                                                    <template v-for="(datajudul, urutjudul) in datajudulunduhlayer"
                                                        :key="urutjudul">
                                                        <th style="width: 150px;">{{ datajudul }}</th>
                                                    </template>
                                                </tr>
                                            </thead>
                                            <template v-for="(datalist, urutlist) in dataunduhlayer" :key="urutlist">
                                                <tbody>
                                                    <tr>
                                                        <td class="text-center">
                                                            {{ (urutlist + 1) }}
                                                        </td>
                                                        <td class="text-justify" v-for="(dataisi, urutisi) in datalist"
                                                            :key="urutisi">
                                                            {{ dataisi.data }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer p-3">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button class="btn btn-danger2 btn-block text-white" placeholder="Tutup" data-toggle="tooltip"
                            data-placement="left" title="Tutup.." style="color: black;" @click="tutupmodal()">
                            <b>
                                Tutup
                            </b>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="mySidenavLegenda" class="sidenav p-0" style="background-color: #ffffff;">
            <div class="card card-warning shadow-none">
                <div class="card-header" style="background-color: #003d68 !important;color: #ffffff;">
                    <h3 class="card-title text-white">
                        Legenda Peta
                    </h3>
                    <!-- /.card-tools -->
                    <div class="card-toolbar">
                        <button type="button" class="btn btn-warning float-right" @click="closeNavLegenda()">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body" style="color: #111 !important;min-height: 100vh;">
                    <h6><b id="legendalayer" class="text-black">
                            Legenda Layer Peta
                        </b>
                    </h6>
                    <ul id="treelegenda" style="cursor: pointer;font-size: small !important;" class="text-black">
                    </ul>
                </div>
                <!-- /.card-header -->
            </div>
        </div>
        <div id="mySidenavPengaturan" class="sidenav p-0" style="background-color: #ffffff;">
            <div class="card card-warning shadow-none">
                <div class="card-header" style="background-color: #003d68 !important;color: #ffffff;">
                    <h3 class="card-title text-white">Base Map</h3>
                    <!-- /.card-tools -->
                    <div class="card-toolbar">
                        <button type="button" class="btn btn-warning float-right" @click="closeNavPengaturan()">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body text-black" style="min-height: 100vh;">
                    <h6 class="text-black"><b id="pengeturan">Pengaturan Base Map</b></h6>
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input custom-control-input-warning" type="radio"
                            id="customRadio111" name="customRadio" value="1" @click="tampilbasemap('customRadio111')">
                        <label for="customRadio111" class="custom-control-label" style="color: #000000;">Google Map
                            (ROADMAP)</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input custom-control-input-warning" type="radio" id="customRadio6"
                            name="customRadio" value="6" @click="tampilbasemap('customRadio6')">
                        <label for="customRadio6" class="custom-control-label" style="color: #000000;">Google Map
                            (Hybrid)</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input custom-control-input-warning" type="radio" id="customRadio8"
                            name="customRadio" value="8" @click="tampilbasemap('customRadio8')">
                        <label for="customRadio8" class="custom-control-label" style="color: #000000;">Google Map
                            (Terrain)</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input custom-control-input-warning" type="radio" id="customRadio22"
                            name="customRadio" value="2" @click="tampilbasemap('customRadio22')" checked="checked">
                        <label for="customRadio22" class="custom-control-label" style="color: #000000;">MapQuest
                            OSM</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input custom-control-input-warning" type="radio" id="customRadio4"
                            name="customRadio" value="4" @click="tampilbasemap('customRadio4')">
                        <label for="customRadio4" class="custom-control-label" style="color: #000000;">Esri World Topo
                            Map</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input custom-control-input-warning" type="radio" id="customRadio9"
                            name="customRadio" value="9" @click="tampilbasemap('customRadio9')">
                        <label for="customRadio9" class="custom-control-label" style="color: #000000;">ESRI World
                            Imagery</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input custom-control-input-warning" type="radio" id="customRadio10"
                            name="customRadio" value="10" @click="tampilbasemap('customRadio10')">
                        <label for="customRadio10" class="custom-control-label" style="color: #000000;">ESRI World
                            Street
                            Map</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input custom-control-input-warning" type="radio" id="customRadio11"
                            name="customRadio" value="11" @click="tampilbasemap('customRadio11')">
                        <label for="customRadio11" class="custom-control-label" style="color: #000000;">ESRI Gray
                            Map</label>
                    </div>
                </div>
                <!-- /.card-header -->
            </div>
        </div>
        <div id="mySidenavLayer" class="sidenav p-0">
            <div class="card card-warning shadow-none">
                <div class="card-header" style="background-color: #003d68 !important;color: #ffffff;">
                    <h3 class="card-title text-white">
                        Layer
                    </h3>
                    <!-- /.card-tools -->
                    <div class="card-toolbar">
                        <button type="button" class="btn btn-warning float-right" @click="closeNavLayer()"><i
                                class="fa fa-times"></i></button>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body" style="color: #4e5256 !important;min-height: 100vh;">
                    <h6><b id="judultransparant" class="text-black">
                            Transparansi Layer
                        </b></h6>
                    <input id="opacity-input" type="range" min="0" max="1" step="0.01" value="0.75" style="width: 100%;"
                        class="accent" /><span id="opacity-output" style="display: none;"></span>
                    <h6><b id="daftarlayer" class="text-black">
                            Daftar Layer
                        </b></h6>
                    <div class="col-sm-12 float-left pb-2" style="display: none;">
                        <div class="input-group mb-3" v-if="(bahasa === null) || (bahasa == 'ina')">
                            <input id="carikata" placeholder="Masukkan Kata Kunci Pencarian Layer" type="text"
                                class="form-control form-control-sm" style="font-size: small !important;"
                                @change="ambildata()">
                            <div class="input-group-append">
                                <span class="input-group-text" @click="ambildata()" style="cursor: pointer;"><i
                                        class="fas fa-search"></i></span>
                            </div>
                        </div>
                        <div class="input-group mb-3" v-else>
                            <input id="carikata" placeholder="Enter Layer Search Keywords" type="text"
                                class="form-control form-control-sm" style="font-size: small !important;"
                                @change="ambildata()">
                            <div class="input-group-append">
                                <span class="input-group-text" @click="ambildata()" style="cursor: pointer;"><i
                                        class="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <ul id="tree1" style="cursor: pointer;font-size: small !important;">
                    </ul>
                </div>
            </div>
        </div>
        <div id="myInfoLayer" class="sidenavkanan p-0">
            <div class="card card-warning shadow-none">
                <div class="card-header" style="background-color: #003d68 !important;color: #ffffff;">
                    <h3 class="card-title text-white">Info</h3>
                    <!-- /.card-tools -->
                    <div class="card-toolbar">
                        <button type="button" class="btn btn-warning float-right" @click="closeNavInfo()"><i
                                class="fa fa-times"></i></button>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body text-center" id="exceldata">
                    <button type="button" class="btn btn-success btn-sm text-white lebar2" data-toggle="tooltip"
                        data-placement="left" title="Unduh excel.." @click="G_tableCSVTabel1('_Keterangan_')">
                        <i class="fas fa-download"></i>
                        Unduh Keterangan (.xlsx)
                    </button>
                </div>
                <div class="card-body" style="color: black !important;min-height: 95vh;width: 90%; overflow: auto;"
                    id="Info_Adit">
                </div>
            </div>
        </div>
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
                    <div class="col-sm-12 wow fadeInDown">
                        <div class="card cardputih">
                            <div class="card-header border-transparent">
                                <h5 class="card-title text-black">
                                    <b>
                                        Opsi Peta
                                    </b>
                                </h5>
                                <input type="hidden" id="detaildatamulti" value=""></input>
                                <input type="hidden" id="paramlayerunduh" value=""></input>
                                <input type="hidden" id="paramlayerinformasi" value=""></input>
                                <input type="hidden" id="paramkodecekbox" value=""></input>
                                <input type="hidden" id="isidatakosong" value=""></input>
                                <button type="button" class="btn btn-tool text-black" data-toggle="tooltip"
                                    data-placement="left" title="Parse Data" @click="parsedatalayer()"
                                    id="tombolparamunduh" style="display: none;">
                                    <i class="far fa-clone"></i> Parse Data
                                </button>
                                <button type="button" class="btn btn-tool text-black" data-toggle="tooltip"
                                    data-placement="left" title="Tes Peta" @click="ceklayer()"
                                    id="tombolparamkodecekbox" style="display: none;">
                                    <i class="far fa-clone"></i> Tes Peta
                                </button>
                                <button type="button" class="btn btn-tool text-black" data-toggle="tooltip"
                                    data-placement="left" title="Tes Peta" @click="modalfilter()"
                                    id="tombolfilterkodecekbox" style="display: none;">
                                    <i class="far fa-clone"></i> Filter Peta
                                </button>
                                <button type="button" class="btn btn-tool text-white" data-toggle="tooltip"
                                    data-placement="left" title="Data Kosong" @click="datakosonglayer()"
                                    id="tomboldatakosong" style="display: none;">
                                    <i class="far fa-clone"></i> Data Kosong
                                </button>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool text-black" data-toggle="tooltip"
                                        data-placement="left" title="Layer Peta / Map Layers" @click="openNavLayer()"
                                        style="color: #000000;">
                                        <i class="far fa-clone"></i>
                                        Layer Peta
                                    </button>
                                    <button type="button" class="btn btn-tool text-black" data-toggle="tooltip"
                                        data-placement="left" title="Unduh Data Tabel Peta / Download Map Table Data"
                                        @click="cekdataterpilih()" style="color: #000000;">
                                        <i class="fas fa-cloud-download-alt"></i>
                                        Unduh Data Tabel Peta
                                    </button>
                                    <button type="button" class="btn btn-tool text-black" data-toggle="tooltip"
                                        data-placement="left" title="Basemap Peta / Map Basemap"
                                        @click="openNavPengaturan()" style="color: #000000;">
                                        <i class="fas fa-cogs"></i>
                                        Basemap Peta
                                    </button>
                                    <button type="button" class="btn btn-tool text-black" data-toggle="tooltip"
                                        data-placement="left" title="Legenda Peta / Map Legend"
                                        @click="openNavLegenda()" style="color: #000000;">
                                        <i class="fas fa-photo-video"></i>
                                        Legenda Peta
                                    </button>
                                    <button type="button" class="btn btn-tool text-black" data-toggle="tooltip"
                                        data-placement="left" title="Cetak Peta / Print Map" @click="cetakpeta()"
                                        style="color: #000000;">
                                        <i class="fas fa-print"></i>
                                        Cetak Peta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 text-center">
                        <iframe :src="sourcenya" class="container-fluid wow fadeInUp" style="min-height: 80vh;"
                            frameborder="0" id="maps" scrolling="no" @load="loadpeta()">
                        </iframe>
                    </div><!-- /.col -->
                </div><!-- /.row -->
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
            d5sistem: JSON.parse(localStorage.getItem("d5sistem")),
            kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
            ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
            datapesan: '',
            datamaster: [],
            carikata: '',
            ipnya: '',
            waktu: '',
            linknya: process.env.VUE_APP_URL_API + JSON.parse(localStorage.getItem("datatahunaktif")) + '/',
            daftarunduhlayer: [],
            dataunduhlayer: [],
            datajudulunduhlayer: [],
            carikata: '',
            data_layer: [],
            data_legenda: [],
            kabkot: [],
            datakabkot: [],
            defaultSelectedkabkot: {
                code: 0,
                label: 'Semua Kabupaten/Kota',
                tag: '',
            },
            selectedkabkot: '',
            filter: [],
            datafilter: [],
            defaultSelectedfilter: {
                code: 0,
                label: 'Semua Data',
                tag: '',
            },
            selectedfilter: '',
            paramselectedfilter: [],
            arraynamafilter: [],

            textfilenya_peta: false,
            tmpidparameter: '',
            selectedradius: '0',
            bahasa: localStorage.getItem("bahasasistem"),
            sourcenya: '',
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
        async G_tableCSVTabel1(namefile) {
            try {
                this.halamanloading = true;
                const XLSX = xlsx;
                var wb = XLSX.utils.table_to_book(document.getElementById('customers2'), { sheet: "DataLayerMonika" });
                XLSX.writeFile(wb, this.G_formatDate(Date(), 'd-M-Y') + namefile + ".xlsx");
                this.halamanloading = false;
            } catch (error) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Data masih kosong',
                });
            }
        },
        parsedatalayer() {
            this.dataunduhlayer = [];
            this.dataunduhlayer = JSON.parse(document.getElementById('detaildatamulti').value);
            //alert(this.dataunduhlayer.length);
            if (this.dataunduhlayer.length > 0) {
                this.datajudulunduhlayer = [];
                for (let i = 0; i < 1; i++) {
                    for (let x = 0; x < this.dataunduhlayer[i].length; x++) {
                        this.datajudulunduhlayer.push(this.dataunduhlayer[i][x].kolom);
                    }
                }
            }
        },
        async G_tableCSVTabel2(namefile) {
            try {
                this.halamanloading = true;
                const XLSX = xlsx;
                var wb = XLSX.utils.table_to_book(document.getElementById('tabeldataadidata'), { sheet: "DataDetailLayerMonika" });
                XLSX.writeFile(wb, this.G_formatDate(Date(), 'd-M-Y') + namefile + ".xlsx");
                this.halamanloading = false;
            } catch (error) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Data masih kosong',
                });
            }
        },
        loadpeta() {
            this.halamanloading = true;
            try {
                var tempceknya = document.getElementById('paramkodecekbox').value;
                var ceknya = document.getElementById(tempceknya).checked;
                try {
                    this.selectedfilter = document.getElementById('select' + tempceknya).value.trim();
                } catch (error) {
                    this.selectedfilter = '';
                }
                try {
                    this.selectedradius = document.getElementById('radius' + tempceknya).value.trim();
                } catch (error) {
                    this.selectedradius = '0';
                }
                //alert(this.leveluser);
                if (this.leveluser == 1 || this.leveluser.includes(2)) {
                    var messagetemp = this.linknya + '**' + ceknya + '**' + document.getElementById('paramkodecekbox').value + '****' + this.selectedfilter + '**' + this.selectedradius;
                }
                else {
                    var messagetemp = this.linknya + '**' + ceknya + '**' + document.getElementById('paramkodecekbox').value + '**' + this.kdsatkersistem + '**' + this.selectedfilter + '**' + this.selectedradius;
                }

            } catch (error) {
                //alert(this.leveluser);
                var ceknya = false;
                if (this.leveluser == 1 || this.leveluser.includes(2)) {
                    var messagetemp = this.linknya + '**' + ceknya + '**' + document.getElementById('paramkodecekbox').value + '****' + this.selectedfilter + '**' + this.selectedradius;
                }
                else {
                    var messagetemp = this.linknya + '**' + ceknya + '**' + document.getElementById('paramkodecekbox').value + '**' + this.kdsatkersistem + '**' + this.selectedfilter + '**' + this.selectedradius;
                }
            }
            //alert(this.selectedfilter);
            const message = messagetemp;
            //alert(messagetemp);
            const iframe = document.getElementById("maps");
            this.sourcenya = '';
            this.sourcenya = '/gis.html';
            iframe.contentWindow.postMessage(message, "*");
            this.halamanloading = false;
        },
        closeNavInfo() {
            document.getElementById("myInfoLayer").style.width = "0";
        },
        openNavLayer() {
            this.closeNavPengaturan();
            this.closeNavLegenda();
            if (document.getElementById("mySidenavLayer").style.width == "380px") {
                document.getElementById("mySidenavLayer").style.width = "0";
            } else {
                document.getElementById("mySidenavLayer").style.width = "380px";
            }
        },
        closeNavLayer() {
            document.getElementById("mySidenavLayer").style.width = "0";
        },
        openNavPengaturan() {
            this.closeNavLayer();
            this.closeNavLegenda();
            if (document.getElementById("mySidenavPengaturan").style.width == "380px") {
                document.getElementById("mySidenavPengaturan").style.width = "0";
            } else {
                document.getElementById("mySidenavPengaturan").style.width = "380px";
            }
        },
        closeNavPengaturan() {
            document.getElementById("mySidenavPengaturan").style.width = "0";
        },
        openNavLegenda() {
            this.closeNavPengaturan();
            this.closeNavLayer();
            if (document.getElementById("mySidenavLegenda").style.width == "380px") {
                document.getElementById("mySidenavLegenda").style.width = "0";
            } else {
                document.getElementById("mySidenavLegenda").style.width = "380px";
            }
        },
        closeNavLegenda() {
            document.getElementById("mySidenavLegenda").style.width = "0";
        },
        cetakpeta() {
            document.getElementById("maps").contentWindow.document.getElementById("export-png").click();
        },
        tampilbasemap(tipenya) {
            document.getElementById("maps").contentWindow.document.getElementById(tipenya).click();
        },
        async cekdataterpilihinformasi() {
            this.daftarunduhlayer = [];
            this.dataunduhlayer = [];
            var inputs = document.querySelectorAll("input[type='checkbox']");
            var checkboxesChecked = [];
            for (var i = 0; i < inputs.length; i++) {
                // And stick the checked ones onto an array...
                if (inputs[i].checked) {
                    var temp = inputs[i].id.split("|");
                    if ((this.bahasa === null) || (this.bahasa == 'ina')) {
                        checkboxesChecked.push({
                            "id": temp[0],
                            "tipe": temp[12],
                            "namalayer": 'jateng' + temp[0] + '_' + temp[12],
                            "nama": 'Layer ' + temp[4],
                        });
                    }
                    else {
                        checkboxesChecked.push({
                            "id": temp[0],
                            "tipe": temp[12],
                            "namalayer": 'jateng' + temp[0] + '_' + temp[12],
                            "nama": temp[35] + ' Layer',
                        });
                    }
                }
            }
            if (checkboxesChecked.length == 0) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Data layer yang akan diunduh datanya belum dipilih, silahkan pilih dari menu layer peta',
                });
                return false;
            }
            this.daftarunduhlayer = checkboxesChecked;
            $('#costumModalinformasidata').modal('show');
            //alert(JSON.stringify(checkboxesChecked));
        },
        async cekdataterpilih() {
            this.daftarunduhlayer = [];
            this.dataunduhlayer = [];
            var inputs = document.querySelectorAll("input[type='checkbox']");
            var checkboxesChecked = [];
            for (var i = 0; i < inputs.length; i++) {
                // And stick the checked ones onto an array...
                if (inputs[i].checked) {
                    var temp = inputs[i].id.split("|");
                    if ((this.bahasa === null) || (this.bahasa == 'ina')) {
                        checkboxesChecked.push({
                            "id": temp[0],
                            "tipe": temp[12],
                            "namalayer": 'jateng' + temp[0] + '_' + temp[12],
                            "nama": 'Layer ' + temp[4],
                        });
                    }
                    else {
                        checkboxesChecked.push({
                            "id": temp[0],
                            "tipe": temp[12],
                            "namalayer": 'jateng' + temp[0] + '_' + temp[12],
                            "nama": temp[35] + ' Layer',
                        });
                    }
                }
            }
            if (checkboxesChecked.length == 0) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Data layer yang akan diunduh datanya belum dipilih, silahkan pilih dari menu layer peta',
                });
                return false;
            }
            this.daftarunduhlayer = checkboxesChecked;
            $('#costumModalunduhdata').modal('show');
            //alert(JSON.stringify(checkboxesChecked));
        },
        tutupmodal() {
            $('#costumModalunduhdata').modal('hide');
        },
        InisialisasiTree() {
            $.fn.extend({
                treed: function (o) {

                    var openedClass = 'fas fa-minus';
                    var closedClass = 'fas fa-plus';

                    if (typeof o != 'undefined') {
                        if (typeof o.openedClass != 'undefined') {
                            openedClass = o.openedClass;
                        }
                        if (typeof o.closedClass != 'undefined') {
                            closedClass = o.closedClass;
                        }
                    };

                    //initialize each of the top levels
                    var tree = $(this);
                    tree.addClass("tree");
                    tree.find('li').has("ul").each(function () {
                        var branch = $(this); //li with children ul
                        branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                        branch.addClass('branch');
                        branch.on('click', function (e) {
                            if (this == e.target) {
                                var icon = $(this).children('i:first');
                                icon.toggleClass(openedClass + " " + closedClass);
                                $(this).children().children().toggle();
                            }
                        })
                        branch.children().children().toggle();
                    });
                    //fire event from the dynamically added icon
                    tree.find('.branch .indicator').each(function () {
                        $(this).on('click', function () {
                            $(this).closest('li').click();
                        });
                    });
                    //fire event to open branch if the li contains an anchor instead of text
                    tree.find('.branch>a').each(function () {
                        $(this).on('click', function (e) {
                            $(this).closest('li').click();
                            e.preventDefault();
                        });
                    });
                    //fire event to open branch if the li contains a button instead of text
                    tree.find('.branch>button').each(function () {
                        $(this).on('click', function (e) {
                            $(this).closest('li').click();
                            e.preventDefault();
                        });
                    });
                }
            });
            //Initialization of treeviews
            $('#tree1').treed();
            $('#treelegenda').treed();
            $('.select2').select2();

            //Initialize Select2 Elements
            $('.select2bs4').select2({
                theme: 'bootstrap4'
            });
        },
        async ambildata() {
            //alert(this.iduser);
            this.halamanloading = true;

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2",
                },
            });
            var random = Math.random();

            await mainAPI.get("parastapainnovationip-Key?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.ipnya = Response.data.randkey;
                    }
                    else {
                        this.ipnya = '';
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                this.datapesan = '';
                console.log(error);
            });

            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2" + this.ipnya,
                },
            });
            this.halamanloading = true;
            var random = Math.random();
            this.data_layer = [];
            await mainAPI2.get("maps_parastapainnovation-LayerPeta?random=" + random + "&nama=" + this.carikata).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        document.getElementById("tree1").innerHTML = '';
                        this.data_layer = Response.data.content.data;
                        //alert(JSON.stringify(this.data_layer));
                        for (var i = 0; i < this.data_layer.length; i++) {
                            if (this.data_layer[i].id_parent == null) {
                                var iclassbuttonlihat = document.createElement("i");
                                iclassbuttonlihat.classList.add("fas");
                                iclassbuttonlihat.classList.add("fa-list-ul");
                                iclassbuttonlihat.classList.add("text-info");
                                iclassbuttonlihat.title = 'Filter Data';

                                var buttonlihat = document.createElement("BUTTON");
                                buttonlihat.setAttribute("id", 'list' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                buttonlihat.classList.add("btn");
                                buttonlihat.classList.add("btn-tool");
                                buttonlihat.onclick = function () {
                                    var idselect = this.id.replace("list", "select");
                                    if (document.getElementById(idselect).style.display == 'none') {
                                        document.getElementById(idselect).style.display = 'block';
                                    } else {
                                        document.getElementById(idselect).style.display = 'none';
                                    }
                                };
                                buttonlihat.appendChild(iclassbuttonlihat);

                                var selectList = document.createElement("select");
                                selectList.setAttribute("id", 'select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);

                                var cekboxlihat = document.createElement("input");
                                cekboxlihat.type = 'checkbox';
                                cekboxlihat.setAttribute("id", this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                cekboxlihat.onclick = function () {
                                    document.getElementById('paramkodecekbox').value = this.id;
                                    document.getElementById('tombolparamkodecekbox').click();
                                };


                                var iclassbuttonradius = document.createElement("i");
                                iclassbuttonradius.classList.add("fas");
                                iclassbuttonradius.classList.add("fa-arrows-alt-h");
                                iclassbuttonradius.classList.add("text-info");
                                iclassbuttonradius.title = 'Setting Radius (m)';

                                var buttonradius = document.createElement("BUTTON");
                                buttonradius.setAttribute("id", 'listradius' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                buttonradius.classList.add("btn");
                                buttonradius.classList.add("btn-tool");
                                buttonradius.onclick = function () {
                                    var idselectradius = this.id.replace("listradius", "radius");
                                    if (document.getElementById(idselectradius).style.display == 'none') {
                                        document.getElementById(idselectradius).style.display = 'block';
                                    } else {
                                        document.getElementById(idselectradius).style.display = 'none';
                                    }
                                };
                                buttonradius.appendChild(iclassbuttonradius);

                                var inputradius = document.createElement("input");
                                inputradius.type = 'number';
                                inputradius.value = this.data_layer[i].radius;
                                inputradius.setAttribute("id", 'radius' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);

                                var node = document.createElement("li");
                                //node.classList.add("branch");
                                node.setAttribute("id", this.data_layer[i].id);
                                var textnode = document.createTextNode(" " + this.data_layer[i].nama + " ");
                                if (this.data_layer[i].namajenismenu == 'Layer') {
                                    node.appendChild(cekboxlihat);
                                }
                                node.appendChild(textnode);
                                if (this.data_layer[i].kolomfilter != '') {
                                    node.appendChild(buttonlihat);
                                    node.appendChild(selectList);
                                }
                                if (this.data_layer[i].radius > 0) {
                                    node.appendChild(buttonradius);
                                    node.appendChild(inputradius);
                                }

                                if ((this.iduser != 'null') && (this.iduser != null) && (this.iduser != '')) {
                                    document.getElementById("tree1").appendChild(node);
                                }
                                else {
                                    if (this.data_layer[i].tampilpublik == 1) {
                                        document.getElementById("tree1").appendChild(node);
                                    }
                                }

                                if (this.data_layer[i].kolomfilter != '') {
                                    try {
                                        //document.getElementById(this.data_layer[i].id).style.textAlign = 'justify';
                                        var x = document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                        //alert(this.data_layer[i].textfilter);
                                        var temparraytextfilter = this.data_layer[i].textfilter.split(",");
                                        if (temparraytextfilter.length > 0) {
                                            var option = document.createElement("option");
                                            option.value = '';
                                            option.text = 'Semua Data';
                                            x.add(option);
                                            for (var array = 0; array < temparraytextfilter.length; array++) {
                                                var option = document.createElement("option");
                                                option.value = temparraytextfilter[array];
                                                option.text = temparraytextfilter[array];
                                                x.add(option);
                                            }
                                        }
                                        x.select2();
                                    } catch (error) {

                                    }
                                }
                                try {
                                    document.getElementById('radius' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.display = 'none';

                                } catch (error) {

                                }
                                try {
                                    document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.display = 'none';
                                    document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.fontSize = 'small';
                                    document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.minWidth = '280px';
                                    document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.maxWidth = '280px';
                                    document.getElementById(this.data_layer[i].id).style.paddingBottom = '5px';
                                } catch (error) {

                                }
                            }
                            else {

                                var iclassbuttonlihat = document.createElement("i");
                                iclassbuttonlihat.classList.add("fas");
                                iclassbuttonlihat.classList.add("fa-list-ul");
                                iclassbuttonlihat.classList.add("text-info");
                                iclassbuttonlihat.title = 'Filter Data';

                                var buttonlihat = document.createElement("BUTTON");
                                buttonlihat.setAttribute("id", 'list' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                buttonlihat.classList.add("btn");
                                buttonlihat.classList.add("btn-tool");
                                buttonlihat.onclick = function () {
                                    var idselect = this.id.replace("list", "select");
                                    if (document.getElementById(idselect).style.display == 'none') {
                                        document.getElementById(idselect).style.display = 'block';
                                    } else {
                                        document.getElementById(idselect).style.display = 'none';
                                    }

                                };
                                buttonlihat.appendChild(iclassbuttonlihat);

                                var selectList = document.createElement("select");
                                selectList.setAttribute("id", 'select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);

                                var iclassbuttonradius = document.createElement("i");
                                iclassbuttonradius.classList.add("fas");
                                iclassbuttonradius.classList.add("fa-arrows-alt-h");
                                iclassbuttonradius.classList.add("text-info");
                                iclassbuttonradius.title = 'Setting Radius (m)';

                                var buttonradius = document.createElement("BUTTON");
                                buttonradius.setAttribute("id", 'listradius' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                buttonradius.classList.add("btn");
                                buttonradius.classList.add("btn-tool");
                                buttonradius.onclick = function () {
                                    var idselectradius = this.id.replace("listradius", "radius");
                                    if (document.getElementById(idselectradius).style.display == 'none') {
                                        document.getElementById(idselectradius).style.display = 'block';
                                    } else {
                                        document.getElementById(idselectradius).style.display = 'none';
                                    }
                                };
                                buttonradius.appendChild(iclassbuttonradius);

                                var cekboxlihat = document.createElement("input");
                                cekboxlihat.type = 'checkbox';
                                cekboxlihat.setAttribute("id", this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                cekboxlihat.onclick = function () {
                                    document.getElementById('paramkodecekbox').value = this.id;
                                    document.getElementById('tombolparamkodecekbox').click();
                                };

                                var inputradius = document.createElement("input");
                                inputradius.type = 'number';
                                inputradius.value = this.data_layer[i].radius;
                                inputradius.setAttribute("id", 'radius' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);

                                var node = document.createElement("li");
                                //node.classList.add("branch");
                                node.setAttribute("id", this.data_layer[i].id);
                                var textnode = document.createTextNode(" " + this.data_layer[i].nama + " ");
                                if (this.data_layer[i].namajenismenu == 'Layer') {
                                    node.appendChild(cekboxlihat);
                                }

                                if (this.data_layer[i].kolomfilter != '') {
                                    node.appendChild(buttonlihat);
                                    node.appendChild(selectList);
                                }
                                if (this.data_layer[i].radius > 0) {
                                    node.appendChild(buttonradius);
                                    node.appendChild(inputradius);
                                }
                                node.appendChild(textnode);
                                var ul = document.createElement("ul");
                                ul.setAttribute("id", "ul" + this.data_layer[i].id);
                                ul.appendChild(node);
                                if ((this.iduser != 'null') && (this.iduser != null) && (this.iduser != '')) {
                                    document.getElementById(this.data_layer[i].id_parent).appendChild(ul);
                                }
                                else {
                                    if (this.data_layer[i].tampilpublik == 1) {
                                        document.getElementById(this.data_layer[i].id_parent).appendChild(ul);
                                    }
                                }

                                //document.getElementById(this.data_layer[i].id_parent).appendChild(ul);
                                if (this.data_layer[i].kolomfilter != '') {
                                    try {
                                        //document.getElementById(this.data_layer[i].id).style.textAlign = 'justify';
                                        var x = document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                        //alert(this.data_layer[i].textfilter);
                                        var temparraytextfilter = this.data_layer[i].textfilter.split(",");
                                        if (temparraytextfilter.length > 0) {
                                            var option = document.createElement("option");
                                            option.value = '';
                                            option.text = 'Semua Data';
                                            x.add(option);
                                            for (var array = 0; array < temparraytextfilter.length; array++) {
                                                var option = document.createElement("option");
                                                option.value = temparraytextfilter[array];
                                                option.text = temparraytextfilter[array];
                                                x.add(option);
                                            }
                                        }
                                        x.select2();
                                    } catch (error) {

                                    }
                                }
                                try {
                                    document.getElementById('radius' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.display = 'none';

                                } catch (error) {

                                }
                                try {
                                    //document.getElementById(this.data_layer[i].id).style.textAlign = 'justify';
                                    document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.display = 'none';
                                    document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.fontSize = 'small';
                                    document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.minWidth = '280px';
                                    document.getElementById('select' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil).style.maxWidth = '280px';
                                    document.getElementById(this.data_layer[i].id).style.paddingBottom = '5px';
                                } catch (error) {

                                }
                            }
                        }
                        $('#tree1').treed();

                    }
                    else {
                        this.data_layer = [];
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                this.datapesan = '';
                this.data_layer = [];
                console.log(error);
                this.halamanloading = false;
            });

            this.halamanloading = true;
            var random = Math.random();
            this.data_layer = [];
            await mainAPI2.get("maps_parastapainnovation-LayerPeta?random=" + random + "&nama=" + this.carikata).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        document.getElementById("treelegenda").innerHTML = '';
                        this.data_layer = Response.data.content.data;
                        //alert(JSON.stringify(this.data_layer));
                        for (var i = 0; i < this.data_layer.length; i++) {
                            if (this.data_layer[i].id_parent == null) {

                                var node = document.createElement("li");
                                //node.classList.add("branch");
                                node.setAttribute("id", this.data_layer[i].id);
                                var textnode = document.createTextNode(" " + this.data_layer[i].nama + " ");

                                node.appendChild(textnode);

                                if ((this.iduser != 'null') && (this.iduser != null) && (this.iduser != '')) {
                                    document.getElementById("treelegenda").appendChild(node);
                                }
                                else {
                                    if (this.data_layer[i].tampilpublik == 1) {
                                        document.getElementById("treelegenda").appendChild(node);
                                    }
                                }

                                try {
                                    document.getElementById(this.data_layer[i].id).style.paddingBottom = '5px';
                                } catch (error) {

                                }
                            }
                            else {
                                var node = document.createElement("li");
                                //node.classList.add("branch");
                                //alert(this.data_layer[i].id);
                                node.setAttribute("id", this.data_layer[i].id);
                                var textnode = document.createTextNode(" " + this.data_layer[i].nama + " ");
                                node.appendChild(textnode);
                                if ((this.data_layer[i].jenis == '2') && (this.data_layer[i].legenda != '')) {
                                    //alert(atob(this.data_layer[i].legenda));
                                    //return;
                                    var arraylegenda = JSON.parse(atob(this.data_layer[i].legenda));
                                    //alert(arraylegenda.length);

                                    for (var z = 0; z < arraylegenda.length; z++) {
                                        // awal legenda
                                        if ((arraylegenda[z].keterangan == 'gambar') || (arraylegenda[z].keterangan == 'Sesuai Pengaturan Point')) {
                                            // awal gambar
                                            var nodelegenda = document.createElement("li");
                                            //node.classList.add("branch");
                                            nodelegenda.setAttribute("id", 'legenda' + this.data_layer[i].id);

                                            var gambar = document.createElement('img');
                                            if (arraylegenda[z].kolom.toString().trim().includes("http")) {
                                                gambar.src = arraylegenda[z].kolom;
                                            }
                                            else {
                                                gambar.src = this.linknya + 'maps_parastapainnovation-Ikon?f=' + arraylegenda[z].kolom;
                                            }

                                            gambar.style.height = '15px';
                                            //nodelegenda.appendChild(gambar);
                                            var buttonlihat = document.createElement("BUTTON");
                                            buttonlihat.setAttribute("id", 'listlegenda' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                            buttonlihat.classList.add("btn");
                                            buttonlihat.classList.add("btn-tool");
                                            buttonlihat.appendChild(gambar);
                                            nodelegenda.appendChild(buttonlihat);

                                            var textnodelegenda = document.createTextNode(" " + arraylegenda[z].isian + " ");
                                            nodelegenda.appendChild(textnodelegenda);

                                            var ullegenda = document.createElement("ul");
                                            ullegenda.setAttribute("id", "ullegenda" + this.data_layer[i].id);
                                            ullegenda.appendChild(nodelegenda);
                                            node.appendChild(ullegenda);

                                            // akhir gambar
                                        }
                                        else {
                                            // awal bukan gambar
                                            var nodelegenda = document.createElement("li");
                                            //node.classList.add("branch");
                                            nodelegenda.setAttribute("id", 'legenda' + this.data_layer[i].id);
                                            var iclassbuttonlihat = document.createElement("i");
                                            iclassbuttonlihat.classList.add("fas");
                                            if ((arraylegenda[z].keterangan == 'fill') || (arraylegenda[z].keterangan == 'Sesuai Pengaturan Polygon') || (arraylegenda[z].keterangan == 'Sesuai Pengaturan Radius')) {
                                                iclassbuttonlihat.classList.add("fa-square-full");
                                            }
                                            else {
                                                if (arraylegenda[z].isian.toString().trim().toUpperCase().includes("SUNGAI")) {
                                                    iclassbuttonlihat.classList.add("fa-signature");
                                                }
                                                else {
                                                    iclassbuttonlihat.classList.add("fa-minus");
                                                }

                                            }
                                            //iclassbuttonlihat.classList.add("fa-signature");
                                            //iclassbuttonlihat.classList.add("fa-bacon");
                                            //iclassbuttonlihat.classList.add("fa-square-full");
                                            //iclassbuttonlihat.classList.add("fa-chess-board");
                                            //iclassbuttonlihat.classList.add("fa-border-all");

                                            iclassbuttonlihat.style.color = arraylegenda[z].kolom;
                                            //iclassbuttonlihat.classList.add("text-info");

                                            var buttonlihat = document.createElement("BUTTON");
                                            buttonlihat.setAttribute("id", 'listlegenda' + this.data_layer[i].id + '|' + this.data_layer[i].level + '|' + this.data_layer[i].id_parent + '|' + this.data_layer[i].urut + '|' + this.data_layer[i].nama + '|' + this.data_layer[i].jenis + '|' + this.data_layer[i].namajenismenu + '|' + this.data_layer[i].asal_peta + '|' + this.data_layer[i].namaasalpeta + '|' + this.data_layer[i].api + '|' + this.data_layer[i].namaapipeta + '|' + this.data_layer[i].filenya_peta + '|' + this.data_layer[i].tipe_peta + '|' + this.data_layer[i].namatipepeta + '|' + this.data_layer[i].fill + '|' + this.data_layer[i].stroke + '|' + this.data_layer[i].fill_width + '|' + this.data_layer[i].stroke_width + '|' + this.data_layer[i].dash_start + '|' + this.data_layer[i].dash_end + '|' + this.data_layer[i].filenya_ikon + '|' + this.data_layer[i].tipe_fill + '|' + this.data_layer[i].namatipefill + '|' + this.data_layer[i].tipe_pattern + '|' + this.data_layer[i].namatipepattern + '|' + this.data_layer[i].sudut + '|' + this.data_layer[i].urutindex + '|' + this.data_layer[i].latitude + '|' + this.data_layer[i].longitude + '|' + this.data_layer[i].zoom + '|' + this.data_layer[i].radius + '|' + this.data_layer[i].kolomfilter + '|' + this.data_layer[i].textfilter + '|' + this.data_layer[i].tampilpublik + '|' + this.data_layer[i].namastatustampil);
                                            buttonlihat.classList.add("btn");
                                            buttonlihat.classList.add("btn-tool");
                                            buttonlihat.appendChild(iclassbuttonlihat);
                                            nodelegenda.appendChild(buttonlihat);

                                            var textnodelegenda = document.createTextNode(" " + arraylegenda[z].isian + " ");
                                            nodelegenda.appendChild(textnodelegenda);

                                            var ullegenda = document.createElement("ul");
                                            ullegenda.setAttribute("id", "ullegenda" + this.data_layer[i].id);
                                            ullegenda.appendChild(nodelegenda);
                                            node.appendChild(ullegenda);
                                            // akhir bukan gambar
                                        }
                                        // akhir legenda


                                    }
                                }


                                var ul = document.createElement("ul");
                                ul.setAttribute("id", "ul" + this.data_layer[i].id);
                                ul.appendChild(node);
                                //ul.appendChild(ullegenda);

                                if ((this.iduser != 'null') && (this.iduser != null) && (this.iduser != '')) {
                                    document.getElementById(this.data_layer[i].id_parent).appendChild(ul);
                                }
                                else {
                                    if (this.data_layer[i].tampilpublik == 1) {
                                        document.getElementById(this.data_layer[i].id_parent).appendChild(ul);
                                    }
                                }

                                try {
                                    document.getElementById(this.data_layer[i].id).style.paddingBottom = '5px';
                                } catch (error) {

                                }
                            }
                        }
                        $('#treelegenda').treed();
                    }
                    else {
                        this.data_layer = [];
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                this.datapesan = '';
                this.data_layer = [];
                console.log(error);
                this.halamanloading = false;
            });
        },
        ceklayer() {
            var cekbox = document.getElementById('paramkodecekbox').value;
            if (document.getElementById(cekbox).checked == true) {
                this.loadpeta();
            }
            else {
                this.loadpeta();
            }
        },
        prosesdata(layer) {
            swal.fire({
                title: "Konfirmasi",
                text: "Untuk data dalam jumlah besar memerlukan waktu loading yang mungkin lama tergantung kondisi internet dan server, Yakin Hendak Memproses Data?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Proses"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.halamanloading = true;
                    this.dataunduhlayer = [];
                    document.getElementById('paramlayerunduh').value = '';
                    document.getElementById('paramlayerunduh').value = layer;
                    document.getElementById("maps").contentWindow.document.getElementById('paramlayerunduh').click();
                    this.halamanloading = false;
                }
            });
            return false;

        },
    },
    mounted() {
        this.getOtentifikasi();
        this.waktu = this.getWaktu();
        this.ambildata();
        this.InisialisasiTree();
        //alert(this.kdsatkersistem);
    }
}
</script>
<style></style>