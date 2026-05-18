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
        <div class="content-wrapper py-3">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6 wow fadeInDown">
                            <h5>Pengaturan</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Home </a></li>
                                <li class="breadcrumb-item"><a href="/User">Pengguna</a></li>
                                <li class="breadcrumb-item active">Pengaturan Pengguna</li>
                            </ol>
                        </div>
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="card cardputih">
                                <div class="card-header border-transparent">
                                    <h3 class="card-title">Form Input Pengguna</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>Unit Organisasi<small class="text-info"> (*wajib
                                                    dipilih)</small></label>
                                            <v-select :options="kdunor" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedkdunor" @update:modelValue="onkdunorChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Pusat / Balai<small class="text-info"> (*wajib
                                                    dipilih)</small></label>
                                            <v-select :options="kategorisatker" :reduce="(label) => label.code"
                                                label="label" v-model="defaultSelectedkategorisatker"
                                                @update:modelValue="onkategorisatkerChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Satker<small class="text-info"> (*wajib
                                                    dipilih)</small></label>
                                            <v-select :options="satker" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedsatker" @update:modelValue="onsatkerChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Jenis<small class="text-info"> (*wajib
                                                    dipilih)</small></label>
                                            <v-select :options="jenis_piu" :reduce="(label) => label.code" label="label"
                                                v-model="defaultSelectedjenis_piu"
                                                @update:modelValue="onjenis_piuChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Level User<small class="text-info"> (*wajib
                                                    dipilih)</small></label>
                                            <v-select multiple :options="leveluser" :reduce="(label) => label.code"
                                                label="label" @option:selected="onuserChangeSelect($event)"
                                                @option:deselected="onuserChangeDeselect($event)"
                                                v-model="arraynamauser"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12"
                                            v-if="!paramselecteduser.includes('7') && !paramselecteduser.includes('8')"
                                            style="display: none;">
                                            <label>Melakukan Verifikasi Kepada</label>
                                            <v-select multiple :options="evaluasi" :reduce="(label) => label.code"
                                                label="label" @option:selected="onevaluasiChangeSelect($event)"
                                                @option:deselected="onevaluasiChangeDeselect($event)"
                                                v-model="arraynamaevaluasi"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12"
                                            v-if="!paramselecteduser.includes('1') && !paramselecteduser.includes('2')">
                                            <label>Verifikasi ke-1 Ke</label>
                                            <v-select multiple :options="pelaksana" :reduce="(label) => label.code"
                                                label="label" @option:selected="onpelaksanaChangeSelect($event)"
                                                @option:deselected="onpelaksanaChangeDeselect($event)"
                                                v-model="arraynamapelaksana"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12"
                                            v-if="!paramselecteduser.includes('1') && !paramselecteduser.includes('2')">
                                            <label>Verifikasi ke-2 Ke</label>
                                            <v-select multiple :options="pelaksana2" :reduce="(label) => label.code"
                                                label="label" @option:selected="onpelaksana2ChangeSelect($event)"
                                                @option:deselected="onpelaksana2ChangeDeselect($event)"
                                                v-model="arraynamapelaksana2"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12"
                                            v-if="!paramselecteduser.includes('1') && !paramselecteduser.includes('2')">
                                            <label>Verifikasi ke-3 Ke</label>
                                            <v-select multiple :options="pelaksana3" :reduce="(label) => label.code"
                                                label="label" @option:selected="onpelaksana3ChangeSelect($event)"
                                                @option:deselected="onpelaksana3ChangeDeselect($event)"
                                                v-model="arraynamapelaksana3"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-12"
                                            v-if="!paramselecteduser.includes('7') && !paramselecteduser.includes('8')">
                                            <label>Evaluator LKE Pusat</label>
                                            <v-select multiple :options="satkerwewenangpusat"
                                                :reduce="(label) => label.code" label="label"
                                                @option:selected="onsatkerwewenangPusatChangeSelect($event)"
                                                @option:deselected="onsatkerwewenangPusatChangeDeselect($event)"
                                                v-model="arraysatkerwewenangpusat"
                                                style="background-color: #ffffff;padding-bottom: 10px;">
                                            </v-select>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Nama User<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="namadata"
                                                    name="namadata" placeholder="Nama User" v-model="namadata">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Jabatan <small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="jabatandata"
                                                    name="jabatandata" placeholder="Jabatan" v-model="jabatandata">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Pangkat <small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="pangkatdata"
                                                    name="pangkatdata" placeholder="Pangkat" v-model="pangkatdata">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>NIP <small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="nipdata"
                                                    name="nipdata" placeholder="NIP" v-model="nipdata">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Nomor Telp. <small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="telpdata"
                                                    name="telpdata" placeholder="Nomor Telp." v-model="telpdata"
                                                    @keypress="onlyNumberKey(event)" @keydown="onlyNumberKey(event)">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Alamat <small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="alamatdata"
                                                    name="alamatdata" placeholder="Alamat" v-model="alamatdata">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Email <small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="email" class="form-control form-control-sm" id="emaildata"
                                                    name="emaildata" placeholder="Email" v-model="emaildata">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Username <small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="usernamedata" name="usernamedata" placeholder="Username"
                                                    v-model="usernamedata">
                                                <input type="hidden" class="form-control form-control-sm"
                                                    id="usernamedatatmp" name="usernamedatatmp" placeholder="Username"
                                                    v-model="usernamedatatmp">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Password User<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input :type="[showPassword ? 'text' : 'password']"
                                                    class="form-control form-control-sm" id="passworddata"
                                                    name="passworddata" placeholder="Password User"
                                                    v-model="passworddata" @keyup="cekkekuatan()">
                                                <div class="input-group-append">
                                                    <button type="button" class="btn" @click="toggleShow">
                                                        <i
                                                            :class="{ 'fas fa-eye-slash text-muted': showPassword, 'fas fa-eye text-muted': !showPassword }"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Kekuatan kata sandi<small class="text-info"> (*minimal
                                                    skor 60%)</small></label>
                                            <div class="progress">
                                                <div class="progress-bar" role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width:0%"
                                                    id="persennyapassworddata">
                                                    <span id="tulisanpersennyapassworddata">0%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            &nbsp;
                                        </div>
                                        <div class="col-sm-12">
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer p-3">
                                    <button type="button" class="btn btn-sm btn-success3 float-left text-white lebar2"
                                        @click="simpan()" v-if="(secretencData == 'Tambah')" data-toggle="tooltip"
                                        data-placement="left" title="Simpan data.." :disabled="(strengthdata < 60)"><i
                                            class="fas fa-plus-square"></i>
                                        Simpan</button>
                                    <button type="button" class="btn btn-sm btn-success3 float-left text-white lebar2"
                                        v-if="(secretencData != 'Tambah')" @click="update()" data-toggle="tooltip"
                                        data-placement="left" title="Update data.." :disabled="(strengthdata < 60)"><i
                                            class="fa fa-check-circle"></i>
                                        Update</button>
                                    <button type="button" class="btn btn-sm btn-danger3 float-left text-white lebar2"
                                        @click="batalproses()" data-toggle="tooltip" data-placement="left"
                                        title="Batalkan proses.."><i class="fas fa-window-close"></i> Batal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
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
            iduser: JSON.parse(localStorage.getItem("usistem")),
            dleveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            levelkabkot: JSON.parse(localStorage.getItem("bdlsistem")),
            levelkelurahan: JSON.parse(localStorage.getItem("sbdsistem")),
            secretencData: decodeURIComponent(CryptoJS.AES.decrypt(this.route.params.id, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString(CryptoJS.enc.Utf8)),
            showPassword: false,
            usernamedata: '',
            usernamedatatmp: '',
            namainstansi: '',
            namadata: '',
            passworddata: '',
            jabatandata: '',
            pangkatdata: '',
            nipdata: '',
            telpdata: '',
            alamatdata: '',
            emaildata: '',

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

            satker: [],
            datasatker: [],
            defaultSelectedsatker: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            },
            selectedsatker: '',

            satkerwewenangpusat: [],
            datasatkerwewenangpusat: [],
            defaultSelectedsatkerwewenangpusat: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '0',
            },
            selectedsatkerwewenangpusat: '',
            paramselectedsatkerwewenangpusat: [],
            paramselectedsatkerwewenangpusatcode: [],
            paramselectedsatkerwewenangpusatlabel: [],
            arraysatkerwewenangpusat: [],


            leveluser: [],
            dataleveluser: [],
            defaultSelectedleveluser: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedleveluser: '',

            paramselecteduser: [],
            paramselectedusercode: [],
            paramselecteduserlabel: [],
            arraynamauser: [],

            pelaksana: [],
            datapelaksana: [],
            defaultSelectedpelaksana: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedpelaksana: '',
            paramselectedpelaksana: [],
            paramselectedpelaksanacode: [],
            paramselectedpelaksanalabel: [],
            arraynamapelaksana: [],

            pelaksana2: [],
            datapelaksana2: [],
            defaultSelectedpelaksana2: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedpelaksana2: '',
            paramselectedpelaksana2: [],
            paramselectedpelaksana2code: [],
            paramselectedpelaksana2label: [],
            arraynamapelaksana2: [],

            pelaksana3: [],
            datapelaksana3: [],
            defaultSelectedpelaksana3: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedpelaksana3: '',
            paramselectedpelaksana3: [],
            paramselectedpelaksana3code: [],
            paramselectedpelaksana3label: [],
            arraynamapelaksana3: [],

            evaluasi: [],
            dataevaluasi: [],
            defaultSelectedevaluasi: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedevaluasi: '',
            paramselectedevaluasi: [],
            paramselectedevaluasicode: [],
            paramselectedevaluasilabel: [],
            arraynamaevaluasi: [],

            jenis_piu: [],
            datajenis_piu: [],
            defaultSelectedjenis_piu: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedjenis_piu: '',

            validasi: false,
            strengthdata: 0,
            tahunku: JSON.parse(localStorage.getItem("datatahunaktif")),
        }
    },
    methods: {
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        onpelaksanaChangeSelect(events) {
            this.paramselectedpelaksana = [];
            this.paramselectedpelaksanacode = [];
            this.paramselectedpelaksanalabel = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedpelaksana.push((events[i].tag));
                this.paramselectedpelaksanacode.push((events[i].code));
                this.paramselectedpelaksanalabel.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselectedpelaksana));
        },
        onpelaksanaChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedpelaksana);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedpelaksana.length; i++) {
                if (this.paramselectedpelaksana[i] !== yghilang) {
                    temparray.push(this.paramselectedpelaksana[i]);
                }
            }
            for (let i = 0; i < this.paramselectedpelaksanacode.length; i++) {
                if (this.paramselectedpelaksanacode[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedpelaksanacode[i]);
                }
            }
            for (let i = 0; i < this.paramselectedpelaksanalabel.length; i++) {
                if (this.paramselectedpelaksanalabel[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedpelaksanalabel[i]);
                }
            }
            this.paramselectedpelaksana = temparray;
            this.paramselectedpelaksanacode = temparraycode;
            this.paramselectedpelaksanalabel = temparraylabel;
            //alert(JSON.stringify(this.paramselectedpelaksanalabel));
        },
        onpelaksana2ChangeSelect(events) {
            this.paramselectedpelaksana2 = [];
            this.paramselectedpelaksana2code = [];
            this.paramselectedpelaksana2label = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedpelaksana2.push((events[i].tag));
                this.paramselectedpelaksana2code.push((events[i].code));
                this.paramselectedpelaksana2label.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselectedpelaksana2));
        },
        onpelaksana2ChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedpelaksana2);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedpelaksana2.length; i++) {
                if (this.paramselectedpelaksana2[i] !== yghilang) {
                    temparray.push(this.paramselectedpelaksana2[i]);
                }
            }
            for (let i = 0; i < this.paramselectedpelaksana2code.length; i++) {
                if (this.paramselectedpelaksana2code[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedpelaksana2code[i]);
                }
            }
            for (let i = 0; i < this.paramselectedpelaksana2label.length; i++) {
                if (this.paramselectedpelaksana2label[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedpelaksana2label[i]);
                }
            }
            this.paramselectedpelaksana2 = temparray;
            this.paramselectedpelaksana2code = temparraycode;
            this.paramselectedpelaksana2label = temparraylabel;
            //alert(JSON.stringify(this.paramselectedpelaksana2label));
        },
        onpelaksana3ChangeSelect(events) {
            this.paramselectedpelaksana3 = [];
            this.paramselectedpelaksana3code = [];
            this.paramselectedpelaksana3label = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedpelaksana3.push((events[i].tag));
                this.paramselectedpelaksana3code.push((events[i].code));
                this.paramselectedpelaksana3label.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselectedpelaksana3));
        },
        onpelaksana3ChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedpelaksana3);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedpelaksana3.length; i++) {
                if (this.paramselectedpelaksana3[i] !== yghilang) {
                    temparray.push(this.paramselectedpelaksana3[i]);
                }
            }
            for (let i = 0; i < this.paramselectedpelaksana3code.length; i++) {
                if (this.paramselectedpelaksana3code[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedpelaksana3code[i]);
                }
            }
            for (let i = 0; i < this.paramselectedpelaksana3label.length; i++) {
                if (this.paramselectedpelaksana3label[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedpelaksana3label[i]);
                }
            }
            this.paramselectedpelaksana3 = temparray;
            this.paramselectedpelaksana3code = temparraycode;
            this.paramselectedpelaksana3label = temparraylabel;
            //alert(JSON.stringify(this.paramselectedpelaksana3label));
        },
        onevaluasiChangeSelect(events) {
            this.paramselectedevaluasi = [];
            this.paramselectedevaluasicode = [];
            this.paramselectedevaluasilabel = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedevaluasi.push((events[i].tag));
                this.paramselectedevaluasicode.push((events[i].code));
                this.paramselectedevaluasilabel.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselectedevaluasi));
        },
        onevaluasiChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedevaluasi);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedevaluasi.length; i++) {
                if (this.paramselectedevaluasi[i] !== yghilang) {
                    temparray.push(this.paramselectedevaluasi[i]);
                }
            }
            for (let i = 0; i < this.paramselectedevaluasicode.length; i++) {
                if (this.paramselectedevaluasicode[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedevaluasicode[i]);
                }
            }
            for (let i = 0; i < this.paramselectedevaluasilabel.length; i++) {
                if (this.paramselectedevaluasilabel[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedevaluasilabel[i]);
                }
            }
            this.paramselectedevaluasi = temparray;
            this.paramselectedevaluasicode = temparraycode;
            this.paramselectedevaluasilabel = temparraylabel;
            //alert(JSON.stringify(this.paramselectedevaluasilabel));
        },
        onsatkerwewenangPusatChangeSelect(events) {
            this.paramselectedsatkerwewenangpusat = [];
            this.paramselectedsatkerwewenangpusatcode = [];
            this.paramselectedsatkerwewenangpusatlabel = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselectedsatkerwewenangpusat.push((events[i].tag));
                this.paramselectedsatkerwewenangpusatcode.push((events[i].code));
                this.paramselectedsatkerwewenangpusatlabel.push((events[i].label));
            }
            // alert(JSON.stringify(this.paramselectedsatkerwewenangpusat));
        },
        onsatkerwewenangPusatChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselectedpelaksana);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselectedsatkerwewenangpusat.length; i++) {
                if (this.paramselectedsatkerwewenangpusat[i] !== yghilang) {
                    temparray.push(this.paramselectedsatkerwewenangpusat[i]);
                }
            }
            for (let i = 0; i < this.paramselectedsatkerwewenangpusatcode.length; i++) {
                if (this.paramselectedsatkerwewenangpusatcode[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedsatkerwewenangpusatcode[i]);
                }
            }
            for (let i = 0; i < this.paramselectedsatkerwewenangpusatlabel.length; i++) {
                if (this.paramselectedsatkerwewenangpusatlabel[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselectedsatkerwewenangpusatlabel[i]);
                }
            }
            this.paramselectedsatkerwewenangpusat = temparray;
            this.paramselectedsatkerwewenangpusatcode = temparraycode;
            this.paramselectedsatkerwewenangpusatlabel = temparraylabel;
            // alert(JSON.stringify(this.paramselectedsatkerwewenangpusatlabel));
        },
        onlyNumberKey(evt) {
            // Only ASCII character in that range allowed
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            } return;
        },
        onuserChangeSelect(events) {
            this.paramselecteduser = [];
            this.paramselectedusercode = [];
            this.paramselecteduserlabel = [];
            for (let i = 0; i < events.length; i++) {
                this.paramselecteduser.push((events[i].tag));
                this.paramselectedusercode.push((events[i].code));
                this.paramselecteduserlabel.push((events[i].label));
            }
            //alert(JSON.stringify(this.paramselecteduser));
        },
        onuserChangeDeselect(events) {
            //alert(JSON.stringify(events));
            var temp = [];
            temp.push(events);
            //alert(JSON.stringify(temp));
            //alert(this.paramselecteduser);
            var yghilang = '';
            var yghilangcode = '';
            var yghilanglabel = '';
            for (let i = 0; i < temp.length; i++) {
                yghilang = (temp[i].tag);
                yghilangcode = parseInt(temp[i].code);
                yghilanglabel = (temp[i].label);
            }
            var temparray = [];
            var temparraycode = [];
            var temparraylabel = [];

            for (let i = 0; i < this.paramselecteduser.length; i++) {
                if (this.paramselecteduser[i] !== yghilang) {
                    temparray.push(this.paramselecteduser[i]);
                }
            }
            for (let i = 0; i < this.paramselectedusercode.length; i++) {
                if (this.paramselectedusercode[i] !== yghilangcode) {
                    temparraycode.push(this.paramselectedusercode[i]);
                }
            }
            for (let i = 0; i < this.paramselecteduserlabel.length; i++) {
                if (this.paramselecteduserlabel[i] !== yghilanglabel) {
                    temparraylabel.push(this.paramselecteduserlabel[i]);
                }
            }
            this.paramselecteduser = temparray;
            this.paramselectedusercode = temparraycode;
            this.paramselecteduserlabel = temparraylabel;
            //alert(JSON.stringify(this.paramselecteduserlabel));
        },
        cekkekuatan() {
            //alert(this.passworddata);
            this.strengthdata = 0;
            var lowerCase = this.passworddata.match(/[a-z]/);
            var upperCase = this.passworddata.match(/[A-Z]/);
            var numbers = this.passworddata.match(/[0-9]/);
            var width = this.passworddata.length;
            var specialCharacters = this.passworddata.match(/[\!\~\@\&\#\$\%\^\&\*\(\)\{\}\?\-\_\+\=]/);
            if (width > 8) {
                this.strengthdata = this.strengthdata + 20;
            }
            if (lowerCase) {
                this.strengthdata = this.strengthdata + 20;
            }
            if (upperCase) {
                this.strengthdata = this.strengthdata + 20;
            }
            if (numbers) {
                this.strengthdata = this.strengthdata + 20;
            }
            if (specialCharacters) {
                this.strengthdata = this.strengthdata + 20;
            }
            document.getElementById('persennyapassworddata').style.width = this.strengthdata + "%";
            document.getElementById('tulisanpersennyapassworddata').innerHTML = this.strengthdata + "%";
        },
        getOtentifikasi() {
            var time = Date.parse(localStorage.getItem("tsistem"));
            var timeakhir = time + (3 * 60 * 60 * 1000);
            var timesekarang = Date.parse(new Date());
            if (timesekarang > timeakhir) {
                this.ClearlocalStorage();
            }
            this.halamanloading = false;
        },
        onleveluserChange(a) {
            try {
                this.selectedleveluser = this.leveluser[a].tag;
            }
            catch (err) {
                return;
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

        },
        onjenis_piuChange(a) {
            try {
                this.selectedjenis_piu = this.jenis_piu[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onsatkerChange(a) {
            try {
                this.selectedsatker = this.satker[a].tag;
            }
            catch (err) {
                return;
            }
        },
        batalproses() {
            window.location.replace("/User");
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
            await mainAPI2.get("parastapainnovationreff-GetMasterSatker?random=" + random + "&kdunor=" + this.selectedkdunor + "&kategorisatker=" + this.selectedkategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatker = [];
                        this.satker = [];
                        this.datasatker = Response.data.content.data;
                        this.datasatker.forEach((item) => {
                            this.satker.push({
                                label: item.nama,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.satker.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '0',
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
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
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
            await mainAPIData.get("parastapainnovation-GetAllLevel?level=" + this.dleveluser + "&random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.dataleveluser = [];
                        this.leveluser = [];
                        this.dataleveluser = Response.data.content.data;
                        this.dataleveluser.forEach((item) => {
                            this.leveluser.push({
                                label: item.nama,
                                code: this.dataleveluser.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.leveluser.unshift({
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
            await mainAPIData.get("parastapainnovationreff-GetKategoriSatker?random=" + random).then(
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

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetMasterSatker?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatker = [];
                        this.satker = [];
                        this.datasatker = Response.data.content.data;
                        this.datasatker.forEach((item) => {
                            this.satker.push({
                                label: item.nama,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.id,
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

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetLevelPIU?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datajenis_piu = [];
                        this.jenis_piu = [];
                        this.datajenis_piu = Response.data.content.data;
                        this.datajenis_piu.forEach((item) => {
                            this.jenis_piu.push({
                                label: item.nama,
                                code: this.datajenis_piu.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.jenis_piu.unshift({
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
            await mainAPIData.get("parastapainnovationreff-GetLevelPIU?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
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

                        this.datapelaksana2 = [];
                        this.pelaksana2 = [];
                        this.datapelaksana2 = Response.data.content.data;
                        this.datapelaksana2.forEach((item) => {
                            this.pelaksana2.push({
                                label: item.nama,
                                code: this.datapelaksana2.indexOf(item),
                                tag: item.id,
                            });
                        });

                        this.datapelaksana3 = [];
                        this.pelaksana3 = [];
                        this.datapelaksana3 = Response.data.content.data;
                        this.datapelaksana3.forEach((item) => {
                            this.pelaksana3.push({
                                label: item.nama,
                                code: this.datapelaksana3.indexOf(item),
                                tag: item.id,
                            });
                        });

                        this.dataevaluasi = [];
                        this.evaluasi = [];
                        this.dataevaluasi = Response.data.content.data;
                        this.dataevaluasi.forEach((item) => {
                            this.evaluasi.push({
                                label: item.nama,
                                code: this.dataevaluasi.indexOf(item),
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
            await mainAPIData.get("parastapainnovationreff-GetMasterSatkerEvaluasiPusat?random=" + random + "&iduser=" + this.kode_user).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datasatkerwewenangpusat = [];
                        this.satkerwewenangpusat = [];
                        this.datasatkerwewenangpusat = Response.data.content.data;
                        this.datasatkerwewenangpusat.forEach((item) => {
                            this.satkerwewenangpusat.push({
                                label: '[' + item.kode_satker + '] ' + item.nama,
                                code: this.datasatkerwewenangpusat.indexOf(item) + 1,
                                tag: item.kode_satker,
                            });
                        });
                        this.satkerwewenangpusat.unshift({
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
        async AmbilDataSingel() {
            this.halamanloading = true;
            var mainAPIData = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPIData.get("parastapainnovation-GetAllLevel?level=" + this.dleveluser + "&random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.dataleveluser = [];
                        this.leveluser = [];
                        this.dataleveluser = Response.data.content.data;
                        this.dataleveluser.forEach((item) => {
                            this.leveluser.push({
                                label: item.nama,
                                code: this.dataleveluser.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.leveluser.unshift({
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
            var mainAPIDataSingel = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();

            await mainAPIDataSingel.get("parastapainnovationuserNonMD5-GetUser?kduser=" + this.secretencData + "&random=" + random).then(
                Response => {
                    this.jabatandata = Response.data.content.data[0].jabatan;
                    this.pangkatdata = Response.data.content.data[0].pangkat;
                    this.nipdata = Response.data.content.data[0].nip;
                    this.telpdata = Response.data.content.data[0].notelp;
                    this.alamatdata = Response.data.content.data[0].alamat;
                    this.emaildata = Response.data.content.data[0].email;

                    this.usernamedata = Response.data.content.data[0].username;
                    this.usernamedatatmp = Response.data.content.data[0].username;
                    this.namadata = Response.data.content.data[0].nama;
                    this.passworddata = Response.data.content.data[0].password;

                    this.cekkekuatan();

                    this.defaultSelectedleveluser = {
                        code: Response.data.content.data[0].level,
                        label: Response.data.content.data[0].namaleveluser,
                        tag: Response.data.content.data[0].level,
                    };
                    this.selectedleveluser = Response.data.content.data[0].level;
                    this.selectedpelaksana = Response.data.content.data[0].verif;
                    this.selectedpelaksana2 = Response.data.content.data[0].verif2;
                    this.selectedpelaksana3 = Response.data.content.data[0].verif3;
                    this.selectedevaluasi = Response.data.content.data[0].evaluasi;

                    this.defaultSelectedkdunor = {
                        code: Response.data.content.data[0].unor,
                        label: Response.data.content.data[0].nama_unor,
                        tag: Response.data.content.data[0].unor,
                    };
                    this.selectedkdunor = Response.data.content.data[0].unor;

                    this.defaultSelectedkategorisatker = {
                        code: Response.data.content.data[0].kategori_satker,
                        label: Response.data.content.data[0].nama_kategori_satker,
                        tag: Response.data.content.data[0].kategori_satker,
                    };
                    this.selectedkategorisatker = Response.data.content.data[0].kategori_satker;
                    this.defaultSelectedsatker = {
                        code: Response.data.content.data[0].satker,
                        label: Response.data.content.data[0].nama_satker,
                        tag: Response.data.content.data[0].satker,
                    };
                    this.selectedsatker = Response.data.content.data[0].satker;

                    this.defaultSelectedjenis_piu = {
                        code: Response.data.content.data[0].jenis_piu,
                        label: Response.data.content.data[0].namajenis_piu,
                        tag: Response.data.content.data[0].jenis_piu,
                    };
                    this.selectedjenis_piu = Response.data.content.data[0].jenis_piu;

                    this.paramselecteduser = [];
                    this.paramselectedusercode = [];
                    this.paramselecteduserlabel = [];
                    this.arraynamauser = [];

                    try {
                        if ((Response.data.content.data[0].level != '') && (Response.data.content.data[0].level != null)) {
                            var tempuser = Response.data.content.data[0].level.split(',');
                            for (let i = 0; i < tempuser.length; i++) {
                                this.paramselecteduser.push(tempuser[i]);
                            }

                            var tempusercode = Response.data.content.data[0].levelcode.split(',');
                            for (let i = 0; i < tempusercode.length; i++) {
                                this.paramselectedusercode.push(tempusercode[i]);
                            }

                            var tempuserlabel = Response.data.content.data[0].levellabel.split(',');
                            for (let i = 0; i < tempuserlabel.length; i++) {
                                this.paramselecteduserlabel.push(tempuserlabel[i]);
                            }

                            if ((tempuserlabel != '') && (tempuserlabel != null)) {
                                var myArray = Response.data.content.data[0].level.split(",");
                                var myArraylabel = Response.data.content.data[0].levellabel.split(",");
                                var myArraycode = Response.data.content.data[0].levelcode.split(",");
                                //alert(myArray.length);
                                this.arraynamauser = [];
                                for (let i = 0; i < myArray.length; i++) {
                                    this.arraynamauser.push({
                                        label: myArraylabel[i],
                                        code: parseInt(myArraycode[i]),
                                        tag: myArray[i],
                                    });
                                }
                            }
                        }
                    } catch (error) {

                    }
                    this.paramselectedpelaksana = [];
                    this.paramselectedpelaksanacode = [];
                    this.paramselectedpelaksanalabel = [];
                    this.arraynamapelaksana = [];

                    this.paramselectedpelaksana2 = [];
                    this.paramselectedpelaksana2code = [];
                    this.paramselectedpelaksana2label = [];
                    this.arraynamapelaksana2 = [];

                    this.paramselectedpelaksana3 = [];
                    this.paramselectedpelaksana3code = [];
                    this.paramselectedpelaksana3label = [];
                    this.arraynamapelaksana3 = [];

                    this.paramselectedevaluasi = [];
                    this.paramselectedevaluasicode = [];
                    this.paramselectedevaluasilabel = [];
                    this.arraynamaevaluasi = [];

                    try {
                        if ((Response.data.content.data[0].verif != '') && (Response.data.content.data[0].verif != null)) {
                            var temppelaksana = Response.data.content.data[0].verif.split(',');
                            for (let i = 0; i < temppelaksana.length; i++) {
                                this.paramselectedpelaksana.push(temppelaksana[i]);
                            }

                            var temppelaksanacode = Response.data.content.data[0].verifcode.split(',');
                            for (let i = 0; i < temppelaksanacode.length; i++) {
                                this.paramselectedpelaksanacode.push(temppelaksanacode[i]);
                            }

                            var temppelaksanalabel = Response.data.content.data[0].veriflabel.split(',');
                            for (let i = 0; i < temppelaksanalabel.length; i++) {
                                this.paramselectedpelaksanalabel.push(temppelaksanalabel[i]);
                            }

                            if ((temppelaksanalabel != '') && (temppelaksanalabel != null)) {
                                var myArray = Response.data.content.data[0].verif.split(",");
                                var myArraylabel = Response.data.content.data[0].veriflabel.split(",");
                                var myArraycode = Response.data.content.data[0].verifcode.split(",");
                                //alert(myArray.length);
                                this.arraynamapelaksana = [];
                                for (let i = 0; i < myArray.length; i++) {
                                    this.arraynamapelaksana.push({
                                        label: myArraylabel[i],
                                        code: parseInt(myArraycode[i]),
                                        tag: myArray[i],
                                    });
                                }
                            }
                        }
                    } catch (error) {

                    }
                    //alert(Response.data.content.data[0].verif2label);
                    try {
                        if ((Response.data.content.data[0].verif2 != '') && (Response.data.content.data[0].verif2 != null)) {
                            var temppelaksana2 = Response.data.content.data[0].verif2.split(',');
                            for (let i = 0; i < temppelaksana2.length; i++) {
                                this.paramselectedpelaksana2.push(temppelaksana2[i]);
                            }

                            var temppelaksana2code = Response.data.content.data[0].verif2code.split(',');
                            for (let i = 0; i < temppelaksana2code.length; i++) {
                                this.paramselectedpelaksana2code.push(temppelaksana2code[i]);
                            }

                            var temppelaksana2label = Response.data.content.data[0].verif2label.split(',');
                            for (let i = 0; i < temppelaksana2label.length; i++) {
                                this.paramselectedpelaksana2label.push(temppelaksana2label[i]);
                            }

                            if ((temppelaksana2label != '') && (temppelaksana2label != null)) {
                                var myArray2 = Response.data.content.data[0].verif2.split(",");
                                var myArray2label = Response.data.content.data[0].verif2label.split(",");
                                var myArray2code = Response.data.content.data[0].verif2code.split(",");
                                //alert(myArray.length);
                                this.arraynamapelaksana2 = [];
                                for (let i = 0; i < myArray2.length; i++) {
                                    this.arraynamapelaksana2.push({
                                        label: myArray2label[i],
                                        code: parseInt(myArray2code[i]),
                                        tag: myArray2[i],
                                    });
                                }
                            }
                        }
                    } catch (error) {

                    }


                    try {
                        if ((Response.data.content.data[0].verif3 != '') && (Response.data.content.data[0].verif3 != null)) {
                            var temppelaksana3 = Response.data.content.data[0].verif3.split(',');
                            for (let i = 0; i < temppelaksana3.length; i++) {
                                this.paramselectedpelaksana3.push(temppelaksana3[i]);
                            }

                            var temppelaksana3code = Response.data.content.data[0].verif3code.split(',');
                            for (let i = 0; i < temppelaksana3code.length; i++) {
                                this.paramselectedpelaksana3code.push(temppelaksana3code[i]);
                            }

                            var temppelaksana3label = Response.data.content.data[0].verif3label.split(',');
                            for (let i = 0; i < temppelaksana3label.length; i++) {
                                this.paramselectedpelaksana3label.push(temppelaksana3label[i]);
                            }

                            if ((temppelaksana3label != '') && (temppelaksana3label != null)) {
                                var myArray3 = Response.data.content.data[0].verif3.split(",");
                                var myArray3label = Response.data.content.data[0].verif3label.split(",");
                                var myArray3code = Response.data.content.data[0].verif3code.split(",");
                                //alert(myArray.length);
                                this.arraynamapelaksana3 = [];
                                for (let i = 0; i < myArray3.length; i++) {
                                    this.arraynamapelaksana3.push({
                                        label: myArray3label[i],
                                        code: parseInt(myArray3code[i]),
                                        tag: myArray3[i],
                                    });
                                }
                            }
                        }
                    } catch (error) {

                    }

                    try {
                        if ((Response.data.content.data[0].evaluasi != '') && (Response.data.content.data[0].evaluasi != null)) {
                            var tempevaluasi = Response.data.content.data[0].evaluasi.split(',');
                            for (let i = 0; i < tempevaluasi.length; i++) {
                                this.paramselectedevaluasi.push(tempevaluasi[i]);
                            }

                            var tempevaluasicode = Response.data.content.data[0].evaluasicode.split(',');
                            for (let i = 0; i < tempevaluasicode.length; i++) {
                                this.paramselectedevaluasicode.push(tempevaluasicode[i]);
                            }

                            var tempevaluasilabel = Response.data.content.data[0].evaluasilabel.split(',');
                            for (let i = 0; i < tempevaluasilabel.length; i++) {
                                this.paramselectedevaluasilabel.push(tempevaluasilabel[i]);
                            }

                            if ((tempevaluasilabel != '') && (tempevaluasilabel != null)) {
                                var myArray2evaluasi = Response.data.content.data[0].evaluasi.split(",");
                                var myArray2evaluasilabel = Response.data.content.data[0].evaluasilabel.split(",");
                                var myArray2evaluasicode = Response.data.content.data[0].evaluasicode.split(",");
                                //alert(myArray.length);
                                this.arraynamaevaluasi = [];
                                for (let i = 0; i < myArray2evaluasi.length; i++) {
                                    this.arraynamaevaluasi.push({
                                        label: myArray2evaluasilabel[i],
                                        code: parseInt(myArray2evaluasicode[i]),
                                        tag: myArray2evaluasi[i],
                                    });
                                }
                            }
                        }
                    } catch (error) {

                    }

                    this.paramselectedsatkerwewenangpusat = [];
                    this.paramselectedsatkerwewenangpusatcode = [];
                    this.paramselectedsatkerwewenangpusatlabel = [];
                    this.arraynamasatkerwewenangpusat = [];

                    try {
                        if ((Response.data.content.data[0].hakaksesevaluatorlke != '') && (Response.data.content.data[0].hakaksesevaluatorlke != null)) {
                            var tempsatkerwewenangpusat = Response.data.content.data[0].hakaksesevaluatorlke.split(',');
                            for (let i = 0; i < tempsatkerwewenangpusat.length; i++) {
                                this.paramselectedsatkerwewenangpusat.push(tempsatkerwewenangpusat[i]);
                            }

                            var tempsatkerwewenangpusatcode = Response.data.content.data[0].hakaksesevaluatorlkecode.split(',');
                            for (let i = 0; i < tempsatkerwewenangpusatcode.length; i++) {
                                this.paramselectedsatkerwewenangpusatcode.push(tempsatkerwewenangpusatcode[i]);
                            }

                            var tempsatkerwewenangpusatlabel = Response.data.content.data[0].hakaksesevaluatorlkelabel.split(',');
                            for (let i = 0; i < tempsatkerwewenangpusatlabel.length; i++) {
                                this.paramselectedsatkerwewenangpusatlabel.push(tempsatkerwewenangpusatlabel[i]);
                            }

                            if ((tempsatkerwewenangpusatlabel != '') && (tempsatkerwewenangpusatlabel != null)) {
                                var myArray = Response.data.content.data[0].hakaksesevaluatorlke.split(",");
                                var myArraylabel = Response.data.content.data[0].hakaksesevaluatorlkelabel.split(",");
                                var myArraycode = Response.data.content.data[0].hakaksesevaluatorlkecode.split(",");
                                //alert(myArray.length);
                                this.arraysatkerwewenangpusat = [];
                                for (let i = 0; i < myArray.length; i++) {
                                    this.arraysatkerwewenangpusat.push({
                                        label: myArraylabel[i],
                                        code: parseInt(myArraycode[i]),
                                        tag: myArray[i],
                                    });
                                }
                            }
                        }
                    } catch (error) {

                    }


                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        validasidata() {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if ((this.selectedkdunor == '') || (this.selectedkdunor == null) || (this.selectedkdunor == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Unit Organisasi',
                });
                return false;
            }
            if ((this.selectedkategorisatker == '') || (this.selectedkategorisatker == null) || (this.selectedkategorisatker == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Balai / Kategori Satker',
                });
                return false;
            }
            if ((this.selectedsatker == '') || (this.selectedsatker == null) || (this.selectedsatker == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Satker',
                });
                return false;
            }
            if ((this.paramselectedusercode == '') || (this.paramselectedusercode == null) || (this.paramselectedusercode == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Level Pengguna',
                });
                return false;
            }
            if ((this.selectedjenis_piu == '') || (this.selectedjenis_piu == null) || (this.selectedjenis_piu == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Jenis PIU',
                });
                return false;
            }
            if (document.getElementById('namadata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('namadata').focus();
                return false;
            }
            if (document.getElementById('jabatandata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('jabatandata').focus();
                return false;
            }
            if (document.getElementById('pangkatdata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('pangkatdata').focus();
                return false;
            }
            if (document.getElementById('nipdata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('nipdata').focus();
                return false;
            }
            if (document.getElementById('telpdata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('telpdata').focus();
                return false;
            }
            if (document.getElementById('alamatdata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('alamatdata').focus();
                return false;
            }
            if (document.getElementById('emaildata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('emaildata').focus();
                return false;
            }

            if (!document.getElementById('emaildata').value.match(validRegex)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Format Email Dengan Benar',
                });
                document.getElementById('emaildata').focus();
                return false;
            }

            if (document.getElementById('usernamedata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('usernamedata').focus();
                return false;
            }
            if (document.getElementById('passworddata').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('passworddata').focus();
                return false;
            }
            this.validasi = true;
            return;
        },
        simpan() {
            this.validasidata();
            if (this.validasi == false) {
                return false;
            }
            var fd = new FormData();
            fd.append("unor", this.selectedkdunor);
            fd.append("kategori_satker", this.selectedkategorisatker);
            fd.append("jenis_piu", this.selectedjenis_piu);
            fd.append("satker", this.selectedsatker);
            fd.append("level", this.paramselecteduser);
            fd.append("levelcode", this.paramselectedusercode);
            fd.append("levellabel", this.paramselecteduserlabel);
            fd.append("username", this.usernamedata);
            fd.append("password", this.passworddata);
            fd.append("nama", this.namadata);
            fd.append("jabatan", this.jabatandata);
            fd.append("pangkat", this.pangkatdata);
            fd.append("nip", this.nipdata);
            fd.append("notelp", this.telpdata);
            fd.append("alamat", this.alamatdata);
            fd.append("email", this.emaildata);
            fd.append("verif", this.paramselectedpelaksana);
            fd.append("verifcode", this.paramselectedpelaksanacode);
            fd.append("veriflabel", this.paramselectedpelaksanalabel);
            fd.append("verif2", this.paramselectedpelaksana2);
            fd.append("verif2code", this.paramselectedpelaksana2code);
            fd.append("verif2label", this.paramselectedpelaksana2label);
            fd.append("verif3", this.paramselectedpelaksana3);
            fd.append("verif3code", this.paramselectedpelaksana3code);
            fd.append("verif3label", this.paramselectedpelaksana3label);
            fd.append("evaluasi", this.paramselectedevaluasi);
            fd.append("evaluasicode", this.paramselectedevaluasicode);
            fd.append("evaluasilabel", this.paramselectedevaluasilabel);
            fd.append("hakaksesevaluatorlke", this.paramselectedsatkerwewenangpusat);
            fd.append("hakaksesevaluatorlkecode", this.paramselectedsatkerwewenangpusatcode);
            fd.append("hakaksesevaluatorlkelabel", this.paramselectedsatkerwewenangpusatlabel);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationuser-AddUser", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                            window.location.replace("/User");
                        });
                    }
                }
            ).catch(function (error) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: error
                });
            }
            )
        },
        update() {
            //alert(this.paramselectedusercode);
            //alert(this.paramselectedpelaksanacode);
            //alert(this.paramselecteduserlabel);
            //return;
            this.validasidata();
            if (this.validasi == false) {
                return false;
            }
            //alert(this.usernamedatatmp);
            //alert(this.usernamedata);
            var fd = new FormData();
            fd.append("unor", this.selectedkdunor);
            fd.append("kategori_satker", this.selectedkategorisatker);
            fd.append("jenis_piu", this.selectedjenis_piu);
            fd.append("satker", this.selectedsatker);
            fd.append("level", this.paramselecteduser);
            fd.append("levelcode", this.paramselectedusercode);
            fd.append("levellabel", this.paramselecteduserlabel);
            fd.append("username", this.usernamedata);
            fd.append("usernamedatatmp", this.usernamedatatmp);
            fd.append("password", this.passworddata);
            fd.append("nama", this.namadata);
            fd.append("jabatan", this.jabatandata);
            fd.append("pangkat", this.pangkatdata);
            fd.append("nip", this.nipdata);
            fd.append("notelp", this.telpdata);
            fd.append("alamat", this.alamatdata);
            fd.append("email", this.emaildata);
            fd.append("verif", this.paramselectedpelaksana);
            fd.append("verifcode", this.paramselectedpelaksanacode);
            fd.append("veriflabel", this.paramselectedpelaksanalabel);
            fd.append("verif2", this.paramselectedpelaksana2);
            fd.append("verif2code", this.paramselectedpelaksana2code);
            fd.append("verif2label", this.paramselectedpelaksana2label);
            fd.append("verif3", this.paramselectedpelaksana3);
            fd.append("verif3code", this.paramselectedpelaksana3code);
            fd.append("verif3label", this.paramselectedpelaksana3label);
            fd.append("evaluasi", this.paramselectedevaluasi);
            fd.append("evaluasicode", this.paramselectedevaluasicode);
            fd.append("evaluasilabel", this.paramselectedevaluasilabel);
            fd.append("hakaksesevaluatorlke", this.paramselectedsatkerwewenangpusat);
            fd.append("hakaksesevaluatorlkecode", this.paramselectedsatkerwewenangpusatcode);
            fd.append("hakaksesevaluatorlkelabel", this.paramselectedsatkerwewenangpusatlabel);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));
            fd.append("id", this.secretencData);
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationuser-EditUser", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah terupdate..', 'success').then(function () {
                            window.location.replace("/User");
                        });
                    }
                }
            ).catch(function (error) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: error
                });
            }
            )
            return false;
        },
    },
    mounted() {
        this.getOtentifikasi();
        this.AmbilDataReff();
        if (this.secretencData != 'Tambah') {
            this.AmbilDataSingel();
        }
    }
}
</script>
<style></style>