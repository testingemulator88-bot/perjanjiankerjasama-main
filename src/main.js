import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import '../src/assets/plugins/fontawesome-free/css/all.min.css';
import '../src/assets/lib/animate/animate.min.css';
import '../src/assets/lib/owlcarousel/assets/owl.carousel.min.css';
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/css/style.css';
import '../src/assets/css/theme1.css'

//import adminlte scripts

import "../node_modules/admin-lte/dist/js/adminlte.min.js"
import "../node_modules/admin-lte/plugins/select2/js/select2.full.min.js"
import "../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js"
import "../node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"
import "../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.js"
import "../node_modules/admin-lte/plugins/jquery-knob/jquery.knob.min.js"
import "../node_modules/admin-lte/plugins/sparklines/sparkline.js"
import "../node_modules/admin-lte/plugins/jquery/jquery.min.js"
import "../node_modules/admin-lte/plugins/jquery-ui/jquery-ui.min.js"
import "../node_modules/admin-lte/plugins/inputmask/jquery.inputmask.min.js"
import "../node_modules/admin-lte/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
import "../node_modules/admin-lte/plugins/bs-stepper/js/bs-stepper.min.js"
import "../node_modules/admin-lte/plugins/dropzone/min/dropzone.min.js"
import "../node_modules/admin-lte/plugins/sweetalert2/sweetalert2.min.js"
import "../node_modules/admin-lte/plugins/toastr/toastr.min.js"
import "../node_modules/moment/dist/moment.js"
import "../node_modules/admin-lte/plugins/fullcalendar/main.js"


import "jszip";
import "pdfmake";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css";
import "datatables.net-buttons/js/buttons.colVis";
import "datatables.net-buttons/js/buttons.flash";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";


//import adminlte styles
import "../node_modules/admin-lte/dist/css/adminlte.min.css";
import "../node_modules/admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "../node_modules/admin-lte/plugins/summernote/summernote-bs4.min.css";
import "../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.css";
import "../node_modules/admin-lte/plugins/jqvmap/jqvmap.min.css";
import "../node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "../node_modules/admin-lte/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css";
import "../node_modules/admin-lte/plugins/bs-stepper/css/bs-stepper.min.css";
import "../node_modules/admin-lte/plugins/dropzone/min/dropzone.min.css";
import "../node_modules/admin-lte/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css";
import "../node_modules/admin-lte/plugins/toastr/toastr.min.css";

import "../node_modules/admin-lte/plugins/select2/css/select2.min.css";
import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import '@cyhnkckali/vue3-color-picker/dist/style.css';
import "../node_modules/admin-lte/plugins/fullcalendar/main.css";
import "../node_modules/vue-calendar-3/dist/style.css";
import "../node_modules/vue3-jstree-component/node_modules/vue3-jstree-component/dist/style.css";


import "vue-select/dist/vue-select.css";


import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueApexCharts from "vue3-apexcharts";
import App from './App.vue';
import swal from 'sweetalert2';
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import VueCryptojs from 'vue-cryptojs';
import { RootTree } from "vue3-jstree-component";

import router from "./assets/router";
import QrcodeVue, { Level, RenderAs } from 'qrcode.vue';
import { quillEditor } from 'vue3-quill';
import LoadScript from "vue-plugin-load-script";
import { SingleFileUpload, MultipleFileUpload } from '@canopassoftware/vue-file-upload'
import { Calendar } from "vue-calendar-3";
import CKEditor from 'ckeditor4-vue';

createApp(App).use(router, VueAxios, axios, VueApexCharts, swal, VueCryptojs, Vue3ColorPicker, QrcodeVue, quillEditor, LoadScript, SingleFileUpload, MultipleFileUpload, Calendar, RootTree, CKEditor).mixin({
    methods: {
        pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        },
        getWaktu() {
            const jam = new Date().getHours();
            if (jam >= 5 && jam < 12) {
                return "pagi";
            } else if (jam >= 12 && jam < 18) {
                return "siang";
            } else {
                return "malam";
            }
        },
        Enkriptext(value) {
            if (value === null) {
                return value;
            }
            else {
                let val = btoa(value);
                return val;
            }
        },
        Dekriptext(value) {
            if (value === null) {
                return value;
            }
            else {
                let val = atob(value);
                return val;
            }
        },
        DekriptextArray(value) {
            if (value === null) {
                return value;
            }
            else {
                let val = JSON.parse(atob(value));
                const groupedBy = Object.groupBy(val, data => data.namahistory);
                return groupedBy;
            }
        },
        SingkatanBalai(value) {
            if (value === null) {
                return value;
            }
            else {
                let val = value.replace("Balai Besar Wilayah Sungai", "BBWS");
                val = val.replace("Balai Wilayah Sungai", "BWS");
                return val;
            }
        },
        G_numFormat(value) {
            if (typeof value === "string" && value.length === 0) {
                const formattedValue = '';
                return formattedValue;
            }
            let val = (value / 1).toFixed(0).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        G_numFormatKoma(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        G_numKomaTambahNol(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            if (val.length == 4) {
                val = '0' + val;
            }
            return val;
        },
        G_numKoma(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val;
        },
        G_formatDate(dates) {

            if (typeof dates === "string" && dates.length === 0) {
                const formattedToday = 'Belum';
                return formattedToday;
            }
            else if (dates === null) {
                const formattedToday = 'Belum';
                return formattedToday;
            }
            else {
                const date = new Date(dates);
                const yyyy = date.getFullYear();

                var monthNames = [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                ];

                let mm = date.getMonth(); // Months start at 0!
                let dd = date.getDate();

                let hour = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();

                if (dd < 10) dd = '0' + dd;
                //if (mm < 10) mm = '0' + mm;
                const formattedToday = dd + ' ' + monthNames[mm] + ' ' + yyyy + ', ' + hour + ':' + minute + ':' + second + ' WIB';
                return formattedToday;
            }

        },
        G_formatDateNonWIB(dates) {
            if (dates == '0000-00-00') {
                return "-";
            }
            if (dates == 0) {
                return "-";
            }
            else if (dates == null) {
                return "-";
            }
            else {
                const date = new Date(dates);
                const yyyy = date.getFullYear();
                var monthNames = [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                ];

                let mm = date.getMonth(); // Months start at 0!
                let dd = date.getDate();

                if (dd < 10) dd = '0' + dd;
                //if (mm < 10) mm = '0' + mm;
                const formattedToday = dd + ' ' + monthNames[mm] + ' ' + yyyy;
                return formattedToday;
            }

        },
        G_formatDate_Tanpa_WIB(dates) {
            var monthNames = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ];

            if (dates != '') {
                const tanggal = dates.split('-');
                return tanggal[2] + ' ' + monthNames[tanggal[1] - 1] + ' ' + tanggal[0];
            }
            else { return dates; }

        },
        G_AmbilTahun(dates) {
            if (dates == null) {
                return new Date().getFullYear();
            }
            else {
                const date = new Date(dates);
                const yyyy = date.getFullYear();
                const formattedToday = yyyy;
                return formattedToday;
            }

        },
        removeTags(str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();

            // Regular expression to identify HTML tags in
            // the input string. Replacing the identified
            // HTML tag with a null string.
            return decodeURI(str);
        },
        removeHTMLTags(htmlString) {
            // Create a new DOMParser instance
            const parser = new DOMParser();
            // Parse the HTML string into a DOM document
            const doc = parser.parseFromString(htmlString, 'text/html');
            // Extract the text content from the parsed document
            const textContent = doc.body.textContent || "";
            return textContent.trim(); // Trim any leading or trailing whitespace
        },
        makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result.toUpperCase();
        },
        ClearlocalStorage() {
            localStorage.removeItem('tokensistem');
            localStorage.removeItem('usistem');
            localStorage.removeItem('lsistem');
            localStorage.removeItem('nmlsistem');
            localStorage.removeItem('ksatkersistem');
            localStorage.removeItem('nmksatkersistem');
            localStorage.removeItem('satkersistem');
            localStorage.removeItem('kdsatkersistem');
            localStorage.removeItem('nmsatkersistem');
            localStorage.removeItem('nmusistem');
            localStorage.removeItem('d5sistem');
            localStorage.removeItem('jbtsistem');
            localStorage.removeItem('imgsistem');
            localStorage.removeItem('tsistem');
            localStorage.removeItem('statsistem');
            localStorage.removeItem('levpiusistem');
            localStorage.removeItem('verifsistem');
            localStorage.removeItem('verifsistem2');
            localStorage.removeItem('evaluasisistem');
            localStorage.removeItem('levpiubalaisistem');
            localStorage.removeItem('jenis_piusistem');
            localStorage.removeItem('datatahunaktif');
            window.location.replace("/");
        },
        JustClearlocalStorage() {
            localStorage.removeItem('tokensistem');
            localStorage.removeItem('usistem');
            localStorage.removeItem('lsistem');
            localStorage.removeItem('nmlsistem');
            localStorage.removeItem('ksatkersistem');
            localStorage.removeItem('nmksatkersistem');
            localStorage.removeItem('satkersistem');
            localStorage.removeItem('kdsatkersistem');
            localStorage.removeItem('nmsatkersistem');
            localStorage.removeItem('nmusistem');
            localStorage.removeItem('d5sistem');
            localStorage.removeItem('jbtsistem');
            localStorage.removeItem('imgsistem');
            localStorage.removeItem('statsistem');
            localStorage.removeItem('levpiusistem');
            localStorage.removeItem('verifsistem');
            localStorage.removeItem('verifsistem2');
            localStorage.removeItem('evaluasisistem');
            localStorage.removeItem('levpiubalaisistem');
            localStorage.removeItem('jenis_piusistem');
            localStorage.removeItem('datatahunaktif');
            localStorage.removeItem('tsistem');
        },
    }
}).mount('#app');
