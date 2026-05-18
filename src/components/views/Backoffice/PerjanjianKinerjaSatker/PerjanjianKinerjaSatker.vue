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
        <div class="modal fade" id="costumModalcetaktanpaverif" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Opsi PK</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <div class="col-sm-12"
                            v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)">
                            &nbsp;</div>
                        <div class="col-sm-12">
                            <iframe src="" id="iframefilecetak" @load="loadpdf()"
                                style="width: 100%;height: 75vh;"></iframe>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="costumModalcetak" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Opsi PK</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <div class="col-sm-12"
                            v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)">
                            <div class="card cardputih collapsed-card">
                                <div class="card-header border-transparent bg-yellow" data-card-widget="collapse"
                                    style="cursor: pointer;">
                                    <label>Verifikasi</label>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-plus" style="color: black;"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body px-3">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label>Verifikasi ke</label>
                                            <v-select :options="jumlahverifikasi" :reduce="(label) => label.code"
                                                label="label" v-model="defaultSelectedjumlahverifikasi"
                                                @update:modelValue="onjumlahverifikasiChange" :disabled="true"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>Hasil Verifikasi</label>
                                            <v-select :options="verifikasi" :reduce="(label) => label.code"
                                                label="label" v-model="defaultSelectedverifikasi"
                                                @update:modelValue="onverifikasiChange"
                                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                        </div>
                                        <div class="col-sm-4" style="display: none;">
                                            <label>Batas Tanggal Perbaikan</label>
                                            <input type="date" class="form-control form-control-sm"
                                                id="tanggal_batas_verif" name="tanggal_batas_verif"
                                                placeholder="Tanggal" v-model="tanggal_batas_verif">
                                        </div>
                                        <div class="col-sm-12">
                                            <label>Catatan</label>
                                            <quill-editor v-model:value="catatan_verif"
                                                style="height: 25vh;"></quill-editor>
                                        </div>
                                        <div class="col-sm-12 text-center">&nbsp;</div>
                                        <div class="col-sm-12 text-center">
                                            <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                                @click="simpanverivikasi()">
                                                <i class="fas fa-plus-square"></i>
                                                Simpan
                                            </button>
                                        </div>
                                        <div class="col-sm-12 text-center">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12"
                            v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)">
                            &nbsp;</div>
                        <div class="col-sm-12">
                            <iframe src="" id="iframefile" @load="loadpdf()" style="width: 100%;height: 75vh;"></iframe>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="costumModalopsi" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Opsi Data</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row px-3">
                            <input type="hidden" class="form-control form-control-sm" id="id" name="id" placeholder="id"
                                v-model="id">
                            <div class="col-sm-12 px-3">
                                <template v-for="(datakolom, urutkolom) in validasikomponen" :key="urutkolom"
                                    v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                    <div class="table-responsive table-wrapper" style="font-size: smaller !important;"
                                        v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                        <table class="table m-0" :id="'tabeldata' + urutkolom"
                                            v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                            <thead>
                                                <tr>
                                                    <th style="width: 50px;">Tahun</th>
                                                    <th style="width: 450px;">Proyek</th>
                                                    <template v-for="(datatempkolom, uruttempkolom) in datakolom.detail"
                                                        :key="uruttempkolom">
                                                        <th style="width: 100px;">{{ datatempkolom.kolom }}</th>
                                                    </template>
                                                    <th style="width: 50px;" colspan="2">
                                                        Paket<br>eMon<br>(Jumlah)<br>
                                                        <input type="checkbox" id="custompilihan"
                                                            :disabled="disabelkolomnya"
                                                            @click="akftifkanpilihanhapus()"> Opsi Hapus
                                                        Tagging
                                                        <br><button type="button" v-if="showDelete"
                                                            style="font-size: x-small !important;"
                                                            class="btn btn-danger btn-sm text-white"
                                                            @click="hapusmultitaggingemon()"
                                                            :disabled="disabelkolomnya">
                                                            <i class="fas fa-trash-alt"></i>
                                                            Hapus Tagging
                                                        </button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian">
                                                <tr>
                                                    <td class="text-left levelsubsubkegiatan" colspan="2">
                                                        Baseline*
                                                        <input type="hidden" class="form-control form-control-sm"
                                                            id="kode_satker" name="kode_satker"
                                                            placeholder="kode_satker" :value="dataisian.kode_satker">
                                                    </td>
                                                    <template v-for="(datatempkolom, uruttempkolom) in datakolom.detail"
                                                        :key="uruttempkolom"
                                                        v-if="dataisian.nilai == '' || dataisian.nilai == null">
                                                        <td class="text-center levelsubsubkegiatan">
                                                            <input type="text" class="form-control form-control-sm"
                                                                :disabled="!datatempkolom.rumus.includes('input') || disabelkolomnya"
                                                                :id="'baseline' + datakolom.data_ke + uruttempkolom"
                                                                name="baseline" placeholder="Data baseline"
                                                                @keyup="formattulisrupiah('baseline' + datakolom.data_ke + uruttempkolom)"
                                                                @keydown="formattulisrupiah('baseline' + datakolom.data_ke + uruttempkolom)"
                                                                style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;background-color: #ffffff;">
                                                        </td>
                                                    </template>
                                                    <template v-else
                                                        v-for="(databaseline, urutbaseline) in dataisian.nilai"
                                                        :key="urutbaseline">
                                                        <td class="text-center levelsubsubkegiatan">
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'baseline' + databaseline.data_ke + urutbaseline"
                                                                name="baseline" placeholder="Data baseline"
                                                                :disabled="disabelkolomnya"
                                                                @keyup="formattulisrupiah('baseline' + databaseline.data_ke + urutbaseline)"
                                                                @keydown="formattulisrupiah('baseline' + databaseline.data_ke + urutbaseline)"
                                                                :value="G_numFormatKoma(databaseline.nilai)"
                                                                style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;background-color: #ffffff;">
                                                        </td>
                                                    </template>
                                                    <td class="text-left levelsubsubkegiatan" colspan="2"></td>
                                                </tr>
                                            </template>
                                            <template v-for="(dataisiandetail, urutisiandetail) in isiandatadetail"
                                                :key="urutisiandetail">
                                                <tr>
                                                    <td class="text-center leveldetailsubunitpekerjaan">
                                                        {{ dataisiandetail.tahun }}
                                                    </td>
                                                    <template v-for="(isi, urutisi) in dataisiandetail.detail">
                                                        <td class="text-left leveldetailsubunitpekerjaan">
                                                            <span :id="'proyek' + dataisiandetail.tahun">{{ isi.proyek
                                                                }}</span>
                                                        </td>
                                                        <template v-for="(datatempkolom, uruttempkolom) in isi.nilai"
                                                            :key="uruttempkolom">
                                                            <td class="text-center leveldetailsubunitpekerjaan">
                                                                <input type="text" class="form-control form-control-sm"
                                                                    disabled
                                                                    :id="'isian' + '_' + datatempkolom.data_ke + '_' + uruttempkolom + '_' + dataisiandetail.tahun"
                                                                    name="isian" placeholder=""
                                                                    :value="G_numFormatKoma(datatempkolom.nilai)"
                                                                    @keyup="formattulisrupiah('isian' + '_' + datatempkolom.data_ke + '_' + uruttempkolom + '_' + dataisiandetail.tahun)"
                                                                    @keydown="formattulisrupiah('isian' + '_' + datatempkolom.data_ke + '_' + uruttempkolom + '_' + dataisiandetail.tahun)"
                                                                    style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                            </td>
                                                        </template>

                                                        <td class="text-center leveldetailsubunitpekerjaan" colspan="2">
                                                            <a href="javascript:void(0)" data-toggle="tooltip"
                                                                data-placement="left" title="tagging data emon.."
                                                                v-if="!disabelkolomnya"
                                                                @click="bukaemon(isi.id, dataisiandetail.tahun, isi.kode_satker, isi.kodekegiatan)">
                                                                <span :id="'daftaremon' + dataisiandetail.tahun"
                                                                    class="right badge badge-danger">
                                                                    {{ G_numFormat(isi.jumlahdataemon) }}
                                                                </span>
                                                            </a>
                                                        </td>
                                                    </template>
                                                </tr>
                                                <template v-for="(emon, urutemon) in dataisiandetail.dataemon"
                                                    :key="urutemon">
                                                    <tr :id="'baris' + emon.id">
                                                        <td class="text-center leveldetailsubunitpekerjaan"
                                                            style="font-size: x-small !important;">
                                                            {{ emon.vol }} {{ emon.sat }}
                                                        </td>
                                                        <td class="leveldetailsubunitpekerjaan"
                                                            style="font-size: x-small !important;">
                                                            {{ emon.nmpaketdata }}
                                                        </td>
                                                        <template v-for="(nilaiemon, urutnilaiemon) in emon.nilai"
                                                            :key="urutnilaiemon">
                                                            <td class="text-center"
                                                                :class="[nilaiemon.disabled ? 'leveldetailsubunitpekerjaan' : '']">
                                                                <input type="text" class="form-control form-control-sm"
                                                                    :disabled="nilaiemon.disabled || disabelkolomnya"
                                                                    :id="'detailisian' + '_' + datakolom.data_ke + '_' + urutnilaiemon + '_' + dataisiandetail.tahun + '_' + emon.id"
                                                                    name="detailisian" placeholder=""
                                                                    :value="G_numFormatKoma(nilaiemon.nilai)"
                                                                    style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                                    @keyup="formattulisrupiah('detailisian' + '_' + datakolom.data_ke + '_' + urutnilaiemon + '_' + dataisiandetail.tahun + '_' + emon.id)"
                                                                    @keydown="formattulisrupiah('detailisian' + '_' + datakolom.data_ke + '_' + urutnilaiemon + '_' + dataisiandetail.tahun + '_' + emon.id)"
                                                                    @change="ubahisian_outcome_target_persen(emon.id, 'nilai', 'detailisian' + '_' + datakolom.data_ke + '_' + urutnilaiemon + '_' + dataisiandetail.tahun + '_' + emon.id, emon.tahun, emon.nilai.length, urutnilaiemon)">
                                                            </td>
                                                        </template>
                                                        <td class=""
                                                            style="font-size: x-small !important;width: 100px;">
                                                            <input type="number" class="form-control form-control-sm"
                                                                :id="'latitude' + emon.tahun + emon.id"
                                                                :name="'latitude' + emon.tahun" placeholder="Latitude"
                                                                :value="emon.latitude" :disabled="disabelkolomnya"
                                                                style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                                @change="ubahlokasi(emon.id, 'latitude', 'latitude' + emon.tahun + emon.id, 'longitude' + emon.tahun + emon.id)">
                                                            <input type="number" class="form-control form-control-sm"
                                                                :id="'longitude' + emon.tahun + emon.id"
                                                                :name="'longitude' + emon.tahun" placeholder="Longitude"
                                                                :value="emon.longitude" :disabled="disabelkolomnya"
                                                                style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                                @change="ubahlokasi(emon.id, 'longitude', 'longitude' + emon.tahun + emon.id, 'latitude' + emon.tahun + emon.id)">
                                                        </td>
                                                        <td class="text-center leveldetailsubunitpekerjaan"
                                                            style="font-size: x-small !important;width: 20px;">
                                                            <input type="checkbox" v-if="showDelete"
                                                                :disabled="disabelkolomnya"
                                                                :id="'customHapus' + '_' + emon.id"
                                                                @click="cekarrayhapustagging('customHapus' + '_' + emon.id)">
                                                            <button type="button" @click="hapustaggingemon(emon.id)"
                                                                v-if="!disabelkolomnya" data-toggle="tooltip"
                                                                data-placement="left" title="hapus tagging data emon.."
                                                                :disabled="emon.tahun != tahunsekarang || disabelkolomnya"
                                                                class="btn btn-danger text-red">
                                                                <i class="far fa-times-circle"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </template>
                                        </table>
                                    </div>
                                </template>
                                <div class="table-responsive table-wrapper" style="font-size: smaller !important;"
                                    v-if="hitungan_pk == 1">
                                    <table class="table m-0" id="tabeldata" v-if="hitungan_pk == 1">
                                        <thead v-if="hitungan_pk == 1">
                                            <tr>
                                                <th style="width: 50px;" v-if="hitungan_pk == 1">Tahun</th>
                                                <th style="width: 350px;" v-if="hitungan_pk == 1">Proyek</th>
                                                <th style="width: 100px;" v-if="hitungan_pk == 1">
                                                    Target / <br>Output<br>(<span v-html="namaoutput"></span>)
                                                </th>
                                                <th style="width: 10px;" v-if="hitungan_pk == 1">
                                                    Outcome<br>(<span v-html="namaoutcome"></span>)</th>
                                                <th style="width: 100px;" v-if="hitungan_pk == 1">
                                                    Paket<br>eMon<br>(Jumlah)<br>
                                                    <input type="checkbox" id="custompilihan"
                                                        :disabled="disabelkolomnya" @click="akftifkanpilihanhapus()">
                                                    Opsi Hapus tagging
                                                    <br><button type="button" v-if="showDelete"
                                                        style="font-size: x-small !important;"
                                                        class="btn btn-danger btn-sm text-white"
                                                        @click="hapusmultitaggingemon()" :disabled="disabelkolomnya">
                                                        <i class="fas fa-trash-alt"></i>
                                                        Hapus Tagging
                                                    </button>
                                                </th>
                                                <th style="width: 100px;" v-if="hitungan_pk == 1">
                                                    Target<br>IKSK<br>(<span v-html="namasatuan"></span>)</th>
                                            </tr>
                                        </thead>
                                        <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian"
                                            v-if="hitungan_pk == 1">
                                            <tr>
                                                <td class="text-left levelsubsubkegiatan" colspan="4"
                                                    v-if="hitungan_pk == 1">
                                                    Baseline*
                                                    <input type="hidden" class="form-control form-control-sm"
                                                        id="kode_satker" name="kode_satker" placeholder="kode_satker"
                                                        :value="dataisian.kode_satker">
                                                </td>
                                                <td class="text-center levelsubsubkegiatan" v-if="hitungan_pk == 1">

                                                </td>
                                                <td class="text-center levelsubsubkegiatan" v-if="hitungan_pk == 1">
                                                    <input type="text" class="form-control form-control-sm"
                                                        id="baseline" name="baseline" placeholder="Data baseline"
                                                        :value="dataisian.baseline" :disabled="disabelkolomnya"
                                                        @keyup="formattulisrupiah('baseline')"
                                                        @keydown="formattulisrupiah('baseline')"
                                                        style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;background-color: #ffffff;">
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-for="(dataisiandetail, urutisiandetail) in isiandatadetail"
                                            :key="urutisiandetail" v-if="hitungan_pk == 1">
                                            <tr>
                                                <td class="text-center leveldetailsubunitpekerjaan"
                                                    v-if="hitungan_pk == 1">
                                                    {{ dataisiandetail.tahun }}
                                                </td>
                                                <template v-for="(isi, urutisi) in dataisiandetail.detail"
                                                    :key="urutisi" v-if="hitungan_pk == 1">
                                                    <td class="text-left leveldetailsubunitpekerjaan">
                                                        <span :id="'proyek' + dataisiandetail.tahun">{{ isi.proyek
                                                        }}</span>
                                                    </td>
                                                    <td class="text-center leveldetailsubunitpekerjaan">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'volume' + dataisiandetail.tahun"
                                                            :name="'volume' + dataisiandetail.tahun"
                                                            placeholder="Volume" :value="isi.volume"
                                                            @keyup="formattulisrupiah('volume' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('volume' + dataisiandetail.tahun)"
                                                            readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center leveldetailsubunitpekerjaan">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'target' + dataisiandetail.tahun"
                                                            :name="'target' + dataisiandetail.tahun"
                                                            placeholder="Target" :value="isi.target"
                                                            @keyup="formattulisrupiah('target' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('target' + dataisiandetail.tahun)"
                                                            readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center leveldetailsubunitpekerjaan">
                                                        <a href="javascript:void(0)" data-toggle="tooltip"
                                                            v-if="!disabelkolomnya" data-placement="left"
                                                            title="tagging data emon.."
                                                            @click="bukaemon(isi.id, dataisiandetail.tahun, isi.kode_satker, isi.kodekegiatan)">
                                                            <span :id="'daftaremon' + dataisiandetail.tahun"
                                                                class="right badge badge-danger">
                                                                {{ G_numFormat(isi.jumlahdataemon) }}
                                                            </span>
                                                        </a>
                                                    </td>
                                                    <td class="text-center leveldetailsubunitpekerjaan">
                                                        {{ isi.tambahbaseline }}
                                                    </td>
                                                </template>
                                            </tr>
                                            <template v-for="(emon, urutemon) in dataisiandetail.dataemon"
                                                v-if="hitungan_pk == 1" :key="urutemon">
                                                <tr :id="'baris' + emon.id">
                                                    <td class="text-center leveldetailsubunitpekerjaan"
                                                        style="font-size: x-small !important;">
                                                        {{ emon.vol }} {{ emon.sat }}
                                                    </td>
                                                    <td class="leveldetailsubunitpekerjaan"
                                                        style="font-size: x-small !important;">
                                                        {{ emon.nmpaketdata }}
                                                    </td>
                                                    <td class="" style="font-size: x-small !important;">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'outcome' + emon.tahun + emon.id"
                                                            :name="'outcome' + emon.tahun" placeholder="Outcome"
                                                            :value="emon.outcome"
                                                            :disabled="emon.tahun != tahunsekarang || disabelkolomnya"
                                                            @keyup="formattulisrupiah('outcome' + emon.tahun + emon.id)"
                                                            @keydown="formattulisrupiah('outcome' + emon.tahun + emon.id)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                            @change="ubahisian_outcome_target(emon.id, 'outcome', 'outcome' + emon.tahun + emon.id, emon.tahun)">
                                                    </td>
                                                    <td class="text-center " style="font-size: x-small !important;">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'target' + emon.tahun + emon.id"
                                                            :name="'target' + emon.tahun" placeholder="Target"
                                                            :value="emon.target"
                                                            :disabled="emon.tahun != tahunsekarang || disabelkolomnya"
                                                            @keyup="formattulisrupiah('target' + emon.tahun + emon.id)"
                                                            @keydown="formattulisrupiah('target' + emon.tahun + emon.id)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                            @change="ubahisian_outcome_target(emon.id, 'target', 'target' + emon.tahun + emon.id, emon.tahun)">
                                                    </td>
                                                    <td class="" style="font-size: x-small !important;">
                                                        <input type="number" class="form-control form-control-sm"
                                                            :id="'latitude' + emon.tahun + emon.id"
                                                            :name="'latitude' + emon.tahun" placeholder="Latitude"
                                                            :value="emon.latitude"
                                                            :disabled="emon.tahun != tahunsekarang || disabelkolomnya"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                            @change="ubahlokasi(emon.id, 'latitude', 'latitude' + emon.tahun + emon.id, 'longitude' + emon.tahun + emon.id)">
                                                        <input type="number" class="form-control form-control-sm"
                                                            :id="'longitude' + emon.tahun + emon.id"
                                                            :name="'longitude' + emon.tahun" placeholder="Longitude"
                                                            :value="emon.longitude"
                                                            :disabled="emon.tahun != tahunsekarang || disabelkolomnya"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                            @change="ubahlokasi(emon.id, 'longitude', 'longitude' + emon.tahun + emon.id, 'latitude' + emon.tahun + emon.id)">
                                                    </td>
                                                    <td class="text-center leveldetailsubunitpekerjaan"
                                                        style="font-size: x-small !important;">
                                                        <input type="checkbox" v-if="showDelete"
                                                            :disabled="disabelkolomnya"
                                                            :id="'customHapus' + '_' + emon.id"
                                                            @click="cekarrayhapustagging('customHapus' + '_' + emon.id)">
                                                        <button type="button" @click="hapustaggingemon(emon.id)"
                                                            v-if="!disabelkolomnya" data-toggle="tooltip"
                                                            data-placement="left" title="hapus tagging data emon.."
                                                            :disabled="emon.tahun != tahunsekarang || disabelkolomnya"
                                                            class="btn btn-danger text-red">
                                                            <i class="far fa-times-circle"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </template>
                                        </template>
                                    </table>
                                </div>
                            </div>
                        </div>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-primary btn-sm lebar2 text-white" @click="simpan()"
                                :disabled="disabelkolomnya">
                                <i class="fas fa-plus-square"></i>
                                Simpan
                            </button>
                            <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="costumModalemon" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Data Emon</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row px-3">
                            <div class="col-sm-12 px-3">
                                <input type="text" v-model="carikata" class="form-control form-control-sm"
                                    placeholder="Masukkan Kata Kunci Pencarian">
                            </div>
                            <div class="col-sm-12 px-3">&nbsp;</div>
                            <div class="col-sm-12 px-3">
                                <div class="table-responsive table-wrapper" style="font-size: x-small !important;">
                                    <table class="table m-0" id="tabelemon">
                                        <thead>
                                            <tr>
                                                <th style="width: 20px;">No</th>
                                                <th style="width: 10px;">
                                                    Pilih<br>semua
                                                    <br><input type="checkbox" id="customallSwitchAuth"
                                                        @click="pilihsemua()">
                                                </th>
                                                <th style="width: 10px;">Kode</th>
                                                <th style="width: 150px;">Paket</th>
                                                <th style="width: 50px;">Pagu</th>
                                                <th style="width: 50px;">Realisasi</th>
                                                <th style="width: 20px;">Keu. (%)</th>
                                                <th style="width: 20px;">Fisik (%)</th>
                                                <th style="width: 20px;">Volume</th>
                                                <th style="width: 20px;">Satuan</th>
                                            </tr>
                                        </thead>
                                        <template v-for="(dataisianemon, urutemon) in filteredKataData" :key="urutemon">
                                            <tbody class="mailbox-messages">
                                                <tr>
                                                    <td class="text-left">
                                                        {{ urutemon + 1 }}
                                                    </td>
                                                    <td class="text-center">
                                                        <input type="checkbox"
                                                            :checked="arraypaketemon.includes(dataisianemon.kode + '_' + dataisianemon.pgrupiah + '_' + dataisianemon.realisasi + '_' + dataisianemon.persenkeu + '_' + dataisianemon.persenfisik + '_' + dataisianemon.tanggaldata)"
                                                            :disabled="dataisianemon.checked"
                                                            :id="'customSwitchAuth' + '_' + dataisianemon.kode + '_' + dataisianemon.pgrupiah + '_' + dataisianemon.realisasi + '_' + dataisianemon.persenkeu + '_' + dataisianemon.persenfisik + '_' + dataisianemon.tanggaldata"
                                                            @click="cekarrayemon('customSwitchAuth' + '_' + dataisianemon.kode + '_' + dataisianemon.pgrupiah + '_' + dataisianemon.realisasi + '_' + dataisianemon.persenkeu + '_' + dataisianemon.persenfisik + '_' + dataisianemon.tanggaldata)">
                                                    </td>
                                                    <td class="text-left">
                                                        {{ dataisianemon.kode }}
                                                    </td>
                                                    <td class="text-left">
                                                        {{ dataisianemon.nmpaket }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ G_numFormat(dataisianemon.pgrupiah) }}
                                                    </td>
                                                    <td class="text-right">
                                                        {{ G_numFormat(dataisianemon.realisasi) }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ G_numFormatKoma(dataisianemon.persenkeu) }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ G_numFormatKoma(dataisianemon.persenfisik) }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ dataisianemon.vol }}
                                                    </td>
                                                    <td class="text-center">
                                                        {{ dataisianemon.sat }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </table>
                                </div>
                            </div>
                        </div>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white" @click="pilihemon()">
                                <i class="fas fa-plus-square"></i>
                                Pilih
                            </button>
                            <button type="button" class="btn btn-danger btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i>
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-wrapper py-3">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6 wow fadeInDown">
                            <h5>Perjanjian Kinerja Satker</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Perjanjian Kinerja Satker</li>
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
                            <div class="card cardputih collapsed-card">
                                <div class="card-header border-transparent bg-white" data-card-widget="collapse"
                                    style="cursor: pointer;">
                                    <label>Filter Kolom</label>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-plus" style="color: black;"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body px-3">
                                    <div class="row">
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxOpsi" value="optionOpsi" checked
                                                    @click="showOpsi = !showOpsi">
                                                <label for="customCheckboxOpsi" class="custom-control-label">
                                                    Opsi
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxTipe" value="optionTipe" checked
                                                    @click="showTipe = !showTipe">
                                                <label for="customCheckboxTipe" class="custom-control-label">
                                                    Tipe
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxKode" value="optionKode" checked
                                                    @click="showKode = !showKode">
                                                <label for="customCheckboxKode" class="custom-control-label">
                                                    Kode
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1" style="display: none;">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxKodeUnik" value="optionKodeUnik"
                                                    @click="showKodeUnique = !showKodeUnique">
                                                <label for="customCheckboxKodeUnik" class="custom-control-label">
                                                    Kode Unik
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxIndikator" value="optionIndikator"
                                                    checked @click="showIndikator = !showIndikator">
                                                <label for="customCheckboxIndikator" class="custom-control-label">
                                                    Indikator
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxSatuan" value="optionSatuan"
                                                    checked @click="showSatuan = !showSatuan">
                                                <label for="customCheckboxSatuan" class="custom-control-label">
                                                    Target
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxOuput" value="optionOuput" checked
                                                    @click="showOuput = !showOuput">
                                                <label for="customCheckboxOuput" class="custom-control-label">
                                                    Ouput
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input custom-control-input-warning"
                                                    type="checkbox" id="customCheckboxOutcome" value="optionOutcome"
                                                    checked @click="showOutcome = !showOutcome">
                                                <label for="customCheckboxOutcome" class="custom-control-label">
                                                    Outcome
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 wow fadeInDown"
                            v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)"
                            style="display: none;">
                            <label>Unit Organisasi</label>
                            <v-select :options="kdunor" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedkdunor" @update:modelValue="onkdunorChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 wow fadeInDown"
                            v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)">
                            <label>Pusat / Balai</label>
                            <v-select :options="kategorisatker" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedkategorisatker" @update:modelValue="onkategorisatkerChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 wow fadeInDown"
                            v-if="leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5) || leveluser.includes(6)">
                            <label>Satker</label>
                            <v-select :options="satker" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedsatker" @update:modelValue="onsatkerChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">
                            <label>Pilihan Data Tahun</label>
                            <v-select :options="listtahun" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedtahun" @update:modelValue="ontahunChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 wow fadeInDown" v-if="datamaster.length > 0">&nbsp;</div>
                        <div class="col-sm-12 wow fadeInDown"
                            v-if="datamaster.length > 0 && (leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(7) || leveluser.includes(8) || leveluser.includes(9))">
                            <div class="card cardputih collapsed-card">
                                <div class="card-header border-transparent bg-white" data-card-widget="collapse"
                                    style="cursor: pointer;">
                                    <label>Pengaturan Tandatangan</label>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-plus" style="color: black;"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body px-3">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label>Nama<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="nama_pejabat" name="nama_pejabat" placeholder="Nama"
                                                    v-model="nama_pejabat">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>Pangkat<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="pangkat_pejabat" name="pangkat_pejabat" placeholder="Pangkat"
                                                    v-model="pangkat_pejabat">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>Jabatan<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="jabatan_pejabat" name="jabatan_pejabat" placeholder="Jabatan"
                                                    v-model="jabatan_pejabat">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>NIP<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm" id="nip_pejabat"
                                                    name="nip_pejabat" placeholder="NIP" v-model="nip_pejabat">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>Lokasi Tandatangan<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="lokasi_pejabat" name="lokasi_pejabat"
                                                    placeholder="Lokasi Tandatangan" v-model="lokasi_pejabat">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>Tanggal Tandatangan<small class="text-info"> (*wajib
                                                    diisi)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="fab fa-creative-commons-share"></i></span>
                                                </div>
                                                <input type="date" class="form-control form-control-sm"
                                                    id="tanggal_pejabat" name="tanggal_pejabat"
                                                    placeholder="Tanggal Tandatangan" v-model="tanggal_pejabat">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <span v-if="filenya_ttd != '' && ttd == 1"> <a
                                                    :href="folder_ttd + filenya_ttd" target="_blank">Lihat
                                                    Ttd</a></span>
                                        </div>
                                        <div class="col-sm-12" :style="[(ttd == 1 ? ':block' : 'display:none')]">
                                            <label>Ttd<small class="text-info"> (*rekomendasi images files gambar 100px
                                                    x
                                                    100px)</small></label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i
                                                            class="far fa-file-image"></i></span>
                                                </div>
                                                <input type="file" class="form-control form-control-sm"
                                                    id="fileToUploadfilenya_ttd" name="fileToUploadfilenya_ttd"
                                                    placeholder="fileToUpload" style="font-size: smaller;"
                                                    accept="image/*">
                                                <input type="hidden" class="form-control form-control-sm"
                                                    id="filenya_ttd" name="filenya_ttd" placeholder="File Ttd">
                                            </div>
                                        </div>
                                        <div class="col-sm-12" :style="[(ttd == 1 ? ':block' : 'display:none')]">
                                            <label>Opsi</label>
                                            <div class="row">
                                                <div class="col-sm-9">
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" aria-valuenow="0"
                                                            aria-valuemin="0" aria-valuemax="100" style="width:0%"
                                                            id="persennyafilenya_ttd">
                                                            <span id="tulisanpersenfilenya_ttd">0%</span>
                                                        </div>
                                                    </div>
                                                    <br>
                                                    <span class="text-success" id="suksesnyafilenya_ttd"></span>
                                                </div>
                                                <div class="col-sm-3 text-center">
                                                    <button type="button"
                                                        class="btn btn-warning btn-sm lebar text-white"
                                                        @click="uploadfile('filenya_ttd', 'image/*')">Upload
                                                        File</button>
                                                    <button type="button" class="btn btn-danger btn-sm lebar"
                                                        @click="clearfilepeta('filenya_ttd')">Hapus File</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12 text-center">
                                            <button type="button" class="btn btn-primary btn-sm lebar2 text-white"
                                                @click="simpanttd()">
                                                <i class="fas fa-plus-square"></i>
                                                Simpan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 text-center wow fadeInDown" v-if="datamaster.length > 0">
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white" id="tombolverif"
                                style="font-size: smaller !important;"
                                :disabled="cekverif[0].status_ajuan.includes('Verifikasi Selesai')"
                                @click="proseslanjut(tesverif, cekverif[0].status_ajuan, cekverif[0].hasil_verif, cekverif[0].dari, cekverif[0].kepada)"
                                v-if="datamaster.length > 0 && cekverif[0].kepada == jenis_piusistem">
                                <i class="fas fa-angle-double-up"></i>
                                <span
                                    v-if="(cekverif[0].status_ajuan.includes('Belum Verifikasi')) && cekverif[0].jumlahtotalverifikasi == 2">
                                    Ajukan Verifikasi {{ cekverif[0].verifikasi_ke }}
                                </span>
                                <span
                                    v-if="cekverif[0].status_ajuan.includes('Belum Verifikasi') && cekverif[0].jumlahtotalverifikasi == 1">
                                    Ajukan Verifikasi
                                </span>
                                <span v-if="(cekverif[0].hasil_verif == 2) && cekverif[0].jumlahtotalverifikasi == 2">
                                    Ajukan Revisi PK {{ cekverif[0].verifikasi_ke }}
                                </span>
                                <span v-if="cekverif[0].hasil_verif == 2 && cekverif[0].jumlahtotalverifikasi == 1">
                                    Ajukan Revisi PK
                                </span>
                                <span
                                    v-if="(cekverif[0].hasil_verif == 1) && cekverif[0].jumlahtotalverifikasi == 2 && cekverif[0].status_ajuan.includes('Ajukan Verifikasi')">
                                    Ajukan Verifikasi {{ cekverif[0].verifikasi_ke }}
                                </span>
                                <span
                                    v-if="(cekverif[0].status_ajuan.includes('Pengajuan PK') || cekverif[0].status_ajuan.includes('Tahapan Verifikasi')) && cekverif[0].jumlahtotalverifikasi == 2">
                                    Verifikasi {{ cekverif[0].verifikasi_ke }}
                                </span>
                                <span
                                    v-if="(cekverif[0].status_ajuan.includes('Verifikasi Selesai')) && cekverif[0].jumlahtotalverifikasi == 2">
                                    Verifikasi Selesai
                                </span>
                                <span
                                    v-if="(cekverif[0].status_ajuan.includes('Verifikasi Selesai')) && cekverif[0].jumlahtotalverifikasi == 1">
                                    Verifikasi Selesai
                                </span>
                                <span
                                    v-if="cekverif[0].status_ajuan.includes('Pengajuan PK') && cekverif[0].jumlahtotalverifikasi == 1">
                                    Verifikasi
                                </span>
                                <span
                                    v-if="(cekverif[0].verifikasi_ke == null && cekverif[0].status_ajuan.trim() == '' && cekverif[0].jumlahtotalverifikasi == 2 && cekverif[0].dari == 43 && cekverif[0].kepada == 42)">
                                    Verifikasi 2
                                </span>
                                <span
                                    v-if="(cekverif[0].verifikasi_ke == null && cekverif[0].status_ajuan.trim() == '' && cekverif[0].jumlahtotalverifikasi == 2 && cekverif[0].dari == 42 && cekverif[0].kepada == 37)">
                                    Verifikasi 2
                                </span>
                            </button>
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white" id="tombolverif"
                                style="font-size: smaller !important;" disabled
                                v-if="datamaster.length > 0 && cekverif[0].kepada != jenis_piusistem">
                                <i class="fas fa-angle-double-up"></i>
                                <span v-if="cekverif[0].status_ajuan.includes('Belum Verifikasi')">
                                    Belum Verifikasi
                                </span>
                                <span
                                    v-if="(cekverif[0].status_ajuan.includes('Pengajuan PK') || cekverif[0].status_ajuan.includes('Tahapan Verifikasi')) && cekverif[0].jumlahtotalverifikasi == 2">
                                    Proses Verifikasi {{ cekverif[0].verifikasi_ke }}
                                </span>
                                <span
                                    v-if="cekverif[0].status_ajuan.includes('Pengajuan PK') && cekverif[0].jumlahtotalverifikasi == 1">
                                    Proses Verifikasi
                                </span>
                                <span v-if="cekverif[0].hasil_verif == 2 && cekverif[0].jumlahtotalverifikasi == 2">
                                    Revisi PK {{ cekverif[0].verifikasi_ke }}
                                </span>
                                <span
                                    v-if="(cekverif[0].status_ajuan.includes('Verifikasi Selesai')) && cekverif[0].jumlahtotalverifikasi == 2">
                                    Verifikasi Selesai
                                </span>
                                <span v-if="cekverif[0].hasil_verif == 2 && cekverif[0].jumlahtotalverifikasi == 1">
                                    Revisi PK
                                </span>
                                <span
                                    v-if="cekverif[0].hasil_verif == 1 && cekverif[0].jumlahtotalverifikasi == 2 && cekverif[0].status_ajuan.includes('Ajukan Verifikasi')">
                                    Verifikasi PK ke {{ cekverif[0].verifikasi_ke - 1 }} Disetujui
                                </span>
                                <span
                                    v-if="(cekverif[0].verifikasi_ke == null && cekverif[0].status_ajuan.trim() == '' && cekverif[0].jumlahtotalverifikasi == 2 && cekverif[0].dari == 43 && cekverif[0].kepada == 42)">
                                    Verifikasi 2 Cantek Irwa
                                </span>
                                <span
                                    v-if="(cekverif[0].verifikasi_ke == null && cekverif[0].status_ajuan.trim() == '' && cekverif[0].jumlahtotalverifikasi == 2 && cekverif[0].dari == 42 && cekverif[0].kepada == 37)">
                                    Verifikasi 2 Cantek Supan
                                </span>
                                <span
                                    v-if="(cekverif[0].status_ajuan.includes('Verifikasi Selesai')) && cekverif[0].jumlahtotalverifikasi == 1">
                                    Verifikasi Selesai
                                </span>
                            </button>
                        </div>
                        <div class="col-sm-6 text-center wow fadeInDown" v-if="datamaster.length > 0">
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white" @click="cetakpk()"
                                style="font-size: smaller !important;">
                                <i class="fas fa-print"></i>
                                Cetak PK
                            </button>
                        </div>
                        <div class="col-sm-12 text-justify wow fadeInDown"
                            v-if="cekverif.length > 0 && (cekverif[0].hasil_verif == 2 || cekverif[0].hasil_verif == 1) && (leveluser.includes(7) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(9) || leveluser.includes(8))">
                            &nbsp;
                        </div>
                        <div class="col-sm-12 text-justify wow fadeInDown"
                            v-if="cekverif.length > 0 && (cekverif[0].hasil_verif == 2 || cekverif[0].hasil_verif == 1) && (leveluser.includes(7) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(9) || leveluser.includes(8))">
                            <div class="position-relative p-3 bg-adit" style="min-height: 120px"
                                v-if="Dekriptext(cekverif[0].catatan) != ''">
                                <div class="ribbon-wrapper ribbon-lg">
                                    <div class="ribbon bg-danger">
                                        Catatan
                                    </div>
                                </div>
                                <small>
                                    <span class="text-success">{{ cekverif[0].nama }}, {{
                                        G_formatDate(cekverif[0].createddate)
                                        }}</span>
                                    <span v-html="Dekriptext(cekverif[0].catatan)"></span>
                                </small>
                            </div>
                        </div>
                        <div class="col-sm-12 wow fadeInDown" v-if="datamaster.length > 0">&nbsp;</div>
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="table-responsive table-wrapper">
                                <table class="table m-0" id="tabeldata" style="font-size: smaller;">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;" v-if="showOpsi">Opsi</th>
                                            <th style="width: 50px;" v-if="showOpsi">Check</th>
                                            <th style="width: 50px;" v-if="showTipe">TIPE</th>
                                            <th style="width: 50px;" v-if="showKode">KODE</th>
                                            <th style="width: 50px;" v-if="showKodeUnique">KODE UNIK</th>
                                            <th style="width: 450px;" v-if="showIndikator">
                                                PROGRAM/SASARAN
                                                PROGRAM/INDIKATOR SASARAN PROGRAM/KEGIATAN/SASARAN KEGIATAN/INDIKATOR
                                                SASARAN KEGIATAN
                                            </th>
                                            <th style="width: 50px;" v-if="showSatuan">TARGET KUMULATIF</th>
                                            <th style="width: 50px;" v-if="showOuput">OUTPUT<br></br>(Tahun Berjalan)
                                            </th>
                                            <th style="width: 50px;" v-if="showOutcome">OUTCOME<br></br>(Tahun Berjalan)
                                            </th>
                                        </tr>
                                    </thead>
                                    <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
                                        <tbody>
                                            <tr>
                                                <td class="text-center" :class="datalist.class" v-if="showOpsi">
                                                    <button type="button"
                                                        v-if="datalist.level == 'IKSK' && hasilakhir != 'Verifikasi Selesai' && (leveluser.includes(7) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(9) || leveluser.includes(8))"
                                                        class="btn btn-primary3 lebar4 btn-sm text-white"
                                                        style="font-size: smaller !important;"
                                                        @click="prosesdata(datalist.id, datalist.namasatuan, datalist.namaoutput, datalist.namaoutcome, datalist.hitungan_pk, datalist.textindikator, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, false)"
                                                        data-toggle="tooltip" data-placement="left"
                                                        title="Edit data.."><i class="fas fa-edit"></i>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit
                                                        Data</button>
                                                    <button type="button"
                                                        v-if="datalist.level == 'IKSK' && hasilakhir == 'Verifikasi Selesai' && (leveluser.includes(7) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(9) || leveluser.includes(8))"
                                                        class="btn btn-success btn-sm text-white lebar4"
                                                        style="font-size: smaller !important;" data-toggle="tooltip"
                                                        data-placement="left" title="Lihat Detail.."
                                                        @click="prosesdata(datalist.id, datalist.namasatuan, datalist.namaoutput, datalist.namaoutcome, datalist.hitungan_pk, datalist.textindikator, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, true)">
                                                        <i class="far fa-check-circle"></i>
                                                        <span> &nbsp;&nbsp;&nbsp;&nbsp;Lihat Detail</span>
                                                    </button>
                                                    <button type="button"
                                                        v-if="(datalist.level == 'IKSK') && ((leveluser.includes(6) || (leveluser.includes(5)) || (leveluser.includes(1)) || (leveluser.includes(2))))"
                                                        class="btn btn-success btn-sm text-white lebar4"
                                                        style="font-size: smaller !important;" data-toggle="tooltip"
                                                        data-placement="left" title="Lihat Detail.."
                                                        @click="prosesdata(datalist.id, datalist.namasatuan, datalist.namaoutput, datalist.namaoutcome, datalist.hitungan_pk, datalist.textindikator, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, true)">
                                                        <i class="far fa-check-circle"></i>
                                                        <span> &nbsp;&nbsp;&nbsp;&nbsp;Lihat Detail</span>
                                                    </button>
                                                </td>
                                                <td :class="datalist.class" v-if="showOpsi" class="text-center">
                                                    <input type="checkbox" :checked="datalist.terpilih == 0"
                                                        v-if="(datalist.level == 'IKSK' || datalist.level == 'SK') && (leveluser.includes(7) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(9) || leveluser.includes(8))"
                                                        :id="'customSwitchAuth' + '_' + datalist.id"
                                                        :disabled="hasilakhir == 'Verifikasi Selesai'"
                                                        @click="rubahpilihan('customSwitchAuth' + '_' + datalist.id, datalist.id)">
                                                    <input type="checkbox" :checked="datalist.terpilih == 0"
                                                        v-if="(datalist.level == 'IKSK' || datalist.level == 'SK') && (leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5))"
                                                        disabled>
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showTipe">
                                                    {{ datalist.level }}
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showKode">
                                                    {{ datalist.kode_unique }}
                                                </td>
                                                <td :class="datalist.class" v-if="showIndikator">
                                                    {{ datalist.textindikator }}
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showSatuan">
                                                    <span v-if="datalist.level == 'IKSK'">
                                                        {{ datalist.targetkumulatif }}
                                                    </span>
                                                    &nbsp;<span v-html="datalist.namasatuan"></span>
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showOuput">
                                                    <span v-if="datalist.level == 'IKSK' && shortcutinput == '0'">
                                                        {{ datalist.output_tahun_berjalan }}
                                                    </span>
                                                    <span
                                                        v-if="datalist.level == 'IKSK' && shortcutinput == '1' && (leveluser.includes(7) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(9) || leveluser.includes(8))">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'output_tahun_berjalan' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + temppelaksana + '|' + tempkode_satker"
                                                            :value="datalist.output_tahun_berjalan"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                            @keyup="formattulisrupiah('output_tahun_berjalan' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + temppelaksana + '|' + tempkode_satker)"
                                                            @keydown="formattulisrupiah('output_tahun_berjalan' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + temppelaksana + '|' + tempkode_satker)"
                                                            @change="shortcutinputtarget('output_tahun_berjalan' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + temppelaksana + '|' + tempkode_satker)">
                                                    </span>
                                                    <span
                                                        v-if="datalist.level == 'IKSK' && shortcutinput == '1' && (leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5))">
                                                        {{ datalist.output_tahun_berjalan }}
                                                    </span>
                                                    &nbsp;<span v-html="datalist.namaoutput"></span>
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showOutcome">
                                                    <span v-if="datalist.level == 'IKSK' && shortcutinput == '0'">
                                                        {{ datalist.target_tahun_berjalan }}
                                                    </span>
                                                    <span
                                                        v-if="datalist.level == 'IKSK' && shortcutinput == '1' && (leveluser.includes(7) || leveluser.includes(3) || leveluser.includes(4) || leveluser.includes(9) || leveluser.includes(8))">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'target_tahun_berjalan' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + temppelaksana + '|' + tempkode_satker"
                                                            :value="datalist.target_tahun_berjalan"
                                                            :disabled="datalist.hitungan_pk != 1"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                            @keyup="formattulisrupiah('target_tahun_berjalan' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + temppelaksana + '|' + tempkode_satker)"
                                                            @keydown="formattulisrupiah('target_tahun_berjalan' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + temppelaksana + '|' + tempkode_satker)"
                                                            @change="shortcutinputtarget('target_tahun_berjalan' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + temppelaksana + '|' + tempkode_satker)">
                                                    </span>
                                                    <span
                                                        v-if="datalist.level == 'IKSK' && shortcutinput == '1' && (leveluser.includes(1) || leveluser.includes(2) || leveluser.includes(5))">
                                                        {{ datalist.target_tahun_berjalan }}
                                                    </span>
                                                    &nbsp;<span v-html="datalist.namaoutcome"></span>
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
            showDelete: false,
            arrayDeletepaketemon: [],
            carikata: '',
            iduser: JSON.parse(localStorage.getItem("usistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            levpiusistem: JSON.parse(localStorage.getItem("levpiusistem")),
            levpiubalaisistem: JSON.parse(localStorage.getItem("levpiubalaisistem")),
            kdsatkersistem: JSON.parse(localStorage.getItem("kdsatkersistem")),
            ksatkersistem: JSON.parse(localStorage.getItem("ksatkersistem")),
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
            tahun: JSON.parse(localStorage.getItem("tahunpkrevisi")),
            tahunsekarang: JSON.parse(localStorage.getItem("tahunpkrevisi")),
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
            selectedtahun: '',

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
            textindikator: '',
            level_pejabat: 'Satker',
            kode_satker_pejabat: '',
            lokasi_pejabat: '',
            nama_pejabat: '',
            pangkat_pejabat: '',
            jabatan_pejabat: '',
            nip_pejabat: '',
            tanggal_pejabat: '',

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

            jumlahkomponen: 0,
            kolomkomponen: '',
            bobotkomponen: '',
            rumuskomponen: '',
            validasikomponen: [],
            validasikolomkomponen: [],
            validasibobotkomponen: [],
            validasirumuskomponen: [],
            hasilakhir: '',
            disabelkolomnya: false,
            arraypaketemon: [],
            shortcutinput: '0',
            temppelaksana: '',
            tempkode_satker: '',
            pk_aktif: '2',
            ttd: '0',
            filenya_ttd: '',
            folder_ttd: process.env.VUE_APP_URL_API + JSON.parse(localStorage.getItem("datatahunaktif")) + 'ttdpk-Gambar?f=',
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
        akftifkanpilihanhapus() {
            this.showDelete = !this.showDelete;
        },
        uploadfile(idnya, tipenya) {
            var elmnt = document.getElementById("fileToUpload" + idnya);
            try {
                var namanya = elmnt.files[0].name;
                //alert(elmnt.files[0]['type'].toUpperCase());
                if (tipenya == 'image/*') {
                    if ((elmnt.files[0]['type'].toUpperCase() != 'IMAGE/JPG') && (elmnt.files[0]['type'].toUpperCase() != 'IMAGE/JPEG') && (elmnt.files[0]['type'].toUpperCase() != 'IMAGE/PNG') && (elmnt.files[0]['type'].toUpperCase() != 'IMAGE/GIF')) {
                        document.getElementById('suksesnya' + idnya).innerHTML = '*file harus format gambar';
                        return;
                    }
                }
                else {
                    if (elmnt.files[0]['type'] != tipenya) {
                        document.getElementById('suksesnya' + idnya).innerHTML = '*file harus format pdf';
                        return;
                    }
                }
            } catch (error) {
                document.getElementById('suksesnya' + idnya).innerHTML = '*pilih file terlebih dahulu';
                return;
            }
            var fd = new FormData();
            fd.append("fileToUpload", elmnt.files[0], elmnt.files[0].name);

            fd.append("folderToUpload", idnya);
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationpeta-FilesUpload", fd, {
                onUploadProgress: function (uploadEvent) {
                    document.getElementById('persennya' + idnya).style.width = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                    document.getElementById('tulisanpersen' + idnya).innerHTML = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                }
            }).then(
                function (res) {
                    document.getElementById('suksesnya' + idnya).innerHTML = res.data.message;
                    if (res.data.filename != undefined) {
                        document.getElementById(idnya).value = res.data.filename;
                    }
                }
            ).catch(function (e) {
                document.getElementById('suksesnya' + idnya).innerHTML = res.data.message;
                document.getElementById(idnya).value = '';
                console.log(e);
            }
            )
        },
        uploadfilepeta(idnya, tipenya) {
            var elmnt = document.getElementById("fileToUpload" + idnya);
            //alert(elmnt.files[0].name);
            //alert(elmnt.files[0].name.slice(-7));
            try {
                if (elmnt.files[0].name == '') {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Isikan File geojson..',
                    });
                    return false;
                }
                if (elmnt.files[0].name === undefined) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Isikan File geojson..',
                    });
                    return false;
                }
                if (elmnt.files[0].name.slice(-7).toUpperCase() != 'GEOJSON') {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Kesalahan Format Data Peta..',
                    });
                    return false;
                }

                var fd = new FormData();
                fd.append("fileToUpload", elmnt.files[0], elmnt.files[0].name);
                fd.append("folderToUpload", idnya);

                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        "Content-Type": "form-data",
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                mainAPI.post("parastapainnovationpeta-FilesUpload", fd, {
                    onUploadProgress: function (uploadEvent) {
                        document.getElementById('persennya' + idnya).style.width = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                        document.getElementById('tulisanpersen' + idnya).innerHTML = Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
                    }
                }).then(
                    function (res) {
                        document.getElementById('suksesnya' + idnya).innerHTML = res.data.message;
                        if (res.data.filename != undefined) {
                            document.getElementById(idnya).value = res.data.filename;
                            //this.filenya_peta = document.getElementById(idnya).value;
                        }
                    }
                ).catch(function (e) {
                    document.getElementById('suksesnya' + idnya).innerHTML = res.data.message;
                    document.getElementById(idnya).value = '';
                    console.log(e);
                }
                )
            } catch (error) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Isikan File geojson..',
                });
                return false;
            }

        },
        clearfilepeta(idnya) {
            if (document.getElementById(idnya).value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'File Tidak Tersedia',
                });
                return false;
            }

            var fd = new FormData();
            fd.append("folderToUpload", idnya);
            fd.append("filenya", document.getElementById(idnya).value);

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("parastapainnovationpeta-FilesDeleted", fd).then(
                Response => {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: Response.data.message,
                    });
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

            document.getElementById('fileToUpload' + idnya).value = '';
            document.getElementById(idnya).value = '';
            document.getElementById('persennya' + idnya).style.width = "0%";
            document.getElementById('tulisanpersen' + idnya).innerHTML = "0%";
            document.getElementById('suksesnya' + idnya).innerHTML = '';
            return false;
        },
        async shortcutinputtarget(kode) {
            var tempkode = kode.split('|');
            var kolom = '';
            var tabel = '';
            var isi = document.getElementById(kode).value;
            var id_indikator = tempkode[1];
            var kode_satker = tempkode[4];
            if (tempkode[2] == '1') {
                if (tempkode[0] == 'output_tahun_berjalan') {
                    kolom = 'volume';
                }
                else {
                    kolom = 'target';
                }
            }
            else {
                kolom = 'nilai';
            }

            if (this.pk_aktif == '1') {
                tabel = 'tb_data_pk_awal';
            }
            else if (this.pk_aktif == '2') {
                tabel = 'tb_data_pk';
            }
            else {
                tabel = 'tb_data_pk_akhir';
            }

            swal.fire({
                title: "Konfirmasi",
                text: "Rubah Data?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Rubah"
            }).then((result) => {
                if (result.isConfirmed) {

                    const data = {
                        tabel: tabel,
                        id_indikator: id_indikator,
                        kode_tahun: this.selectedtahun,
                        kolom: kolom,
                        isi: isi,
                        kode_satker: kode_satker,
                        updateby: JSON.parse(localStorage.getItem("usistem"))
                    }
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    mainAPI.post("shortcutpksatker-Update", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000
                                }).fire({
                                    icon: 'warning',
                                    title: 'Data indikator telah diupdate',
                                });
                                return false;
                            }
                        }
                    ).catch(
                        error => {
                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                        }
                    )
                }
            });
            return false;

        },
        proseslanjut(ke, tahap, hasil, dari, kepada) {
            if (tahap.includes('Belum Verifikasi') || tahap.includes('Ajukan Verifikasi')) {
                if (hasil == 2) {
                    this.ajukanverif(ke, kepada, dari);
                    this.verif2sistem = dari;
                }
                else {
                    this.ajukanverif(ke, dari, kepada);
                }
            }
            if (tahap.includes('Pengajuan PK') || tahap.includes('Tahapan Verifikasi')) {
                this.verifpk();
            }
            if (tahap.trim() == '' && ke == null) {
                this.verifpk();
            }
        },
        rubahpilihan(id, kode) {
            if (this.secretencData.includes("_")) {
                var temp = this.secretencData.split("_");
                if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                    if ((this.selectedsatker == temp[2]) && this.selectedsatker == '') {
                        var pelaksana = temp[2];
                    }
                    else {
                        var pelaksana = this.selectedsatker;
                    }
                }
                if (this.leveluser == 7 || this.leveluser.includes(3)) {
                    if (this.leveluser == 7) {
                        var pelaksana = this.jenis_piusistem;
                    }
                    else {
                        var pelaksana = this.levpiusistem;
                    }
                }
                if (this.leveluser.includes(4)) {
                    var pelaksana = this.jenis_piusistem;
                }
            }
            else {
                if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                    var pelaksana = this.selectedsatker;
                }
                if (this.leveluser == 7 || this.leveluser.includes(3)) {
                    if (this.leveluser == 7) {
                        var pelaksana = this.jenis_piusistem;
                    }
                    else {
                        var pelaksana = this.levpiusistem;
                    }
                }
                if (this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8)) {
                    var pelaksana = this.jenis_piusistem;
                }
            }
            var tempkdsatker = this.selectedlabelsatker.split("]");
            var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
            if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                var kode_satker = tempkodesatker.trim();
            }
            else {
                var kode_satker = this.kdsatkersistem;
            }
            //alert(document.getElementById(id).checked);
            if (document.getElementById(id).checked == false) {
                swal.fire({
                    title: "Konfirmasi",
                    text: "Yakin data terpilih tidak ditampilkan di Cetak PK?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Batal",
                    confirmButtonColor: "#003d68",
                    cancelButtonColor: "#ffaa05",
                    confirmButtonText: "Yakin"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //alert(kode);
                        const data = { kode: kode, isi: '0', kode_satker: kode_satker, id_satker: pelaksana, kode_tahun: this.selectedtahun, updateby: JSON.parse(localStorage.getItem("usistem")) }
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        });
                        mainAPI.post("indikator-SetActive", data).then(
                            Response => {
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000
                                    }).fire({
                                        icon: 'warning',
                                        title: 'Data indikator telah dinonaktifkan',
                                    });
                                    return false;
                                }
                            }
                        ).catch(
                            error => {
                                swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                            }
                        )
                    }
                    else {
                        if (document.getElementById(id).checked == true) {
                            document.getElementById(id).checked = false;
                        }
                        else {
                            document.getElementById(id).checked = true;
                        }
                    }
                });
                return false;
            }
            else {
                const data = { kode: kode, isi: '1', kode_satker: kode_satker, id_satker: pelaksana, kode_tahun: this.selectedtahun, updateby: JSON.parse(localStorage.getItem("usistem")) }
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                mainAPI.post("indikator-SetActive", data).then(
                    Response => {
                        if (Response.data.response == 'error') {
                            swal.fire('Peringatan', Response.data.message, 'error');
                        }
                        else {
                            swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000
                            }).fire({
                                icon: 'warning',
                                title: 'Data indikator telah diaktifkan',
                            });
                            return false;
                        }
                    }
                ).catch(
                    error => {
                        swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                    }
                )
            }

        },
        async simpanverivikasi() {
            if ((this.selectedverifikasi == '') || (this.selectedverifikasi == null) || (this.selectedverifikasi == undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Pilih Hasil Verifikasi',
                });
                return false;
            }

            swal.fire({
                title: "Konfirmasi",
                text: "Verifikasi PK?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Verifikasi"
            }).then((result) => {
                if (result.isConfirmed) {
                    //alert(this.id_verif);
                    //alert(this.leveluser);
                    //alert(this.selectedjumlahverifikasi);
                    //alert(this.id_pelaksana_verif);
                    //return;
                    if (this.dari == '42') {
                        this.kepada = '2';
                    }
                    const data = {
                        id: this.id_verif,
                        kode_tahun: this.selectedtahun,
                        tahun: this.tahun_verif,
                        level_verif: this.leveluser,
                        id_pelaksana: this.id_pelaksana_verif,
                        kode_pelaksana: this.kode_satker_verif,
                        dari: this.dari,
                        kepada: this.kepada,
                        hasil_verif: this.selectedverifikasi,
                        tanggal_batas: this.tanggal_batas_verif,
                        catatan: this.catatan_verif,
                        verifikasi_ke: this.selectedjumlahverifikasi,
                        updateby: JSON.parse(localStorage.getItem("usistem"))
                    }
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    mainAPI.post("pksatker-VerifUpdate", data).then(
                        Response => {
                            var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.selectedkategorisatker + "_" + this.selectedlabelsatker + "_" + this.selectedsatker, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                if ((this.id_pelaksana_verif == '2') && (this.selectedverifikasi == '1') && (this.dari == '43')) {
                                    const data2 = {
                                        id: this.id_verif,
                                        kode_tahun: this.selectedtahun,
                                        tahun: this.tahun_verif,
                                        level_verif: this.leveluser,
                                        id_pelaksana: this.id_pelaksana_verif,
                                        kode_pelaksana: this.kode_satker_verif,
                                        dari: this.dari,
                                        kepada: 42,
                                        hasil_verif: 0,
                                        tanggal_batas: this.tanggal_batas_verif,
                                        catatan: this.catatan_verif,
                                        verifikasi_ke: this.selectedjumlahverifikasi,
                                        updateby: JSON.parse(localStorage.getItem("usistem"))
                                    }
                                    const mainAPI2 = axios.create({
                                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                            "Content-Type": "application/x-www-form-urlencoded",
                                        },
                                    });

                                    mainAPI2.post("pksatker-VerifUpdate", data2).then(
                                        Response => {
                                            if (Response.data.response == 'error') {
                                                swal.fire('Peringatan', Response.data.message, 'error');
                                            }
                                            else {
                                                swal.fire({
                                                    title: "Informasi",
                                                    text: "Verifikasi Telah Dikirimkan ke Dit. Irwa..",
                                                    icon: "success"
                                                }).then(function () {
                                                    window.location.replace("/PerjanjianKinerjaSatker/" + kode);
                                                });
                                                $('.swal2-container').css("z-index", '999999');
                                            }
                                        }
                                    ).catch(
                                        error => {
                                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                                        }
                                    )
                                }
                                else if ((this.id_pelaksana_verif == '47') && (this.selectedverifikasi == '1') && (this.dari == '42')) {
                                    const data2 = {
                                        id: this.id_verif,
                                        kode_tahun: this.selectedtahun,
                                        tahun: this.tahun_verif,
                                        level_verif: this.leveluser,
                                        id_pelaksana: this.id_pelaksana_verif,
                                        kode_pelaksana: this.kode_satker_verif,
                                        dari: this.dari,
                                        kepada: 37,
                                        hasil_verif: 0,
                                        tanggal_batas: this.tanggal_batas_verif,
                                        catatan: this.catatan_verif,
                                        verifikasi_ke: this.selectedjumlahverifikasi,
                                        updateby: JSON.parse(localStorage.getItem("usistem"))
                                    }
                                    const mainAPI2 = axios.create({
                                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                            "Content-Type": "application/x-www-form-urlencoded",
                                        },
                                    });

                                    mainAPI2.post("pksatker-VerifUpdate", data2).then(
                                        Response => {
                                            if (Response.data.response == 'error') {
                                                swal.fire('Peringatan', Response.data.message, 'error');
                                            }
                                            else {
                                                swal.fire({
                                                    title: "Informasi",
                                                    text: "Verifikasi Telah Dikirimkan ke Dit. Supan..",
                                                    icon: "success"
                                                }).then(function () {
                                                    window.location.replace("/PerjanjianKinerjaSatker/" + kode);
                                                });
                                                $('.swal2-container').css("z-index", '999999');
                                            }
                                        }
                                    ).catch(
                                        error => {
                                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                                        }
                                    )
                                }
                                else {
                                    swal.fire({
                                        title: "Informasi",
                                        text: "Verifikasi Telah Disimpan..",
                                        icon: "success"
                                    }).then(function () {
                                        window.location.replace("/PerjanjianKinerjaSatker/" + kode);
                                    });
                                    $('.swal2-container').css("z-index", '999999');
                                }
                            }
                        }
                    ).catch(
                        error => {
                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                        }
                    )
                }
            });
            return false;
        },
        loadpdf() {
            this.halamanloading = false;
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
        async ajukanverif(ke, dari, kepada) {
            //alert(ke);
            //alert(dari);
            //alert(kepada);
            //alert(this.levpiusistem);
            //alert(document.getElementById("tombolverif").innerHTML);
            if (document.getElementById("tombolverif").innerHTML.includes('Selesai')) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Proses Verifikasi Telah Selesai',
                });
                return false;
            }
            //return;
            swal.fire({
                title: "Konfirmasi",
                text: "Ajukan Verifikasi?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Ajukan"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.secretencData.includes("_")) {
                        var temp = this.secretencData.split("_");
                        if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                            if ((this.selectedsatker == temp[2]) && this.selectedsatker == '') {
                                var pelaksana = temp[2];
                            }
                            else {
                                var pelaksana = this.selectedsatker;
                            }
                        }
                        if (this.leveluser == 7 || this.leveluser.includes(3)) {
                            if (this.leveluser == 7) {
                                var pelaksana = this.jenis_piusistem;
                            }
                            else {
                                var pelaksana = this.levpiusistem;
                            }
                        }
                        if (this.leveluser.includes(4)) {
                            var pelaksana = this.jenis_piusistem;
                        }
                        if (this.leveluser.includes(8)) {
                            var pelaksana = this.levpiusistem;
                        }
                    }
                    else {
                        if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                            var pelaksana = this.selectedsatker;
                        }
                        if (this.leveluser == 7 || this.leveluser.includes(3)) {
                            if (this.leveluser == 7) {
                                var pelaksana = this.jenis_piusistem;
                            }
                            else {
                                var pelaksana = this.levpiusistem;
                            }
                        }
                        if (this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8)) {
                            var pelaksana = this.jenis_piusistem;
                        }
                    }
                    var tempkdsatker = this.selectedlabelsatker.split("]");
                    var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
                    if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                        var kode_satker = tempkodesatker.trim();
                    }
                    else {
                        var kode_satker = this.kdsatkersistem;
                    }
                    //alert(this.levpiusistem);
                    //alert(this.jenis_piusistem);
                    //return;
                    if (this.levpiusistem == 21) {
                        this.verifsistem = 35;
                        this.verif2sistem = 35;
                    }
                    if ((ke == 1) && (this.levpiusistem == 8)) {
                        this.verifsistem = 36;
                    }
                    if ((ke == 2) && (this.levpiusistem == 8)) {
                        this.verifsistem = 35;
                    }
                    if ((ke == 1) && (this.levpiusistem == 39)) {
                        this.verifsistem = 38;
                    }
                    if ((ke == 2) && (this.levpiusistem == 39)) {
                        this.verifsistem = 35;
                    }
                    if ((ke == 2) && (this.levpiusistem == 33)) {
                        this.verifsistem = 35;
                    }
                    if ((ke == 2) && ((this.levpiusistem == 8) || (this.levpiusistem == 12)
                        || (this.levpiusistem == 13) || (this.levpiusistem == 14) || (this.levpiusistem == 26)
                        || (this.levpiusistem == 28) || (this.levpiusistem == 29) || (this.levpiusistem == 30)
                        || (this.levpiusistem == 31) || (this.levpiusistem == 32) || (this.levpiusistem == 39))) {
                        this.verifsistem = 35;
                        ke = 2;
                    }

                    //alert(this.leveluser);
                    //return;
                    if ((ke == 1) && ((this.leveluser == 4) || (this.leveluser == 3))) {
                        this.verifsistem = 35;
                        this.verif2sistem = 35;
                    }
                    if ((ke == 1) && (this.jenis_piusistem == 9)) {
                        this.verifsistem = 35;
                        this.verif2sistem = 35;
                    }

                    //alert(ke);
                    //alert(this.jenis_piusistem);
                    //return;

                    if (dari == 42 && kepada == 2) {
                        ke = 2;
                        this.verifsistem = 42;
                        this.levpiusistem = 2;
                        this.verifsistem = 42;
                        const data = {
                            dari: this.levpiusistem,
                            kepada: this.verifsistem,
                            kepada2: this.verif2sistem,
                            evaluasi: this.evaluasisistem,
                            kode_tahun: this.selectedtahun,
                            id_pelaksana: pelaksana,
                            kode_pelaksana: kode_satker,
                            verifikasi_ke: ke,
                            updateby: JSON.parse(localStorage.getItem("usistem"))
                        }
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        });
                        mainAPI.post("pksatker-AjukanKeIrwaVerif", data).then(
                            Response => {
                                if (this.leveluser.includes(3) || this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8)) {
                                    var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.secretencData, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                                }
                                else {
                                    var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.selectedkategorisatker + "_" + this.selectedlabelsatker + "_" + this.selectedsatker, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                                }
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.fire({
                                        title: "Informasi",
                                        text: "Verifikasi Telah Diajukan..",
                                        icon: "success"
                                    }).then(function () {
                                        window.location.replace("/PerjanjianKinerjaSatker/" + kode);
                                    });
                                    $('.swal2-container').css("z-index", '999999');
                                }
                            }
                        ).catch(
                            error => {
                                swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                            }
                        )
                    }
                    else if (dari == 47 && kepada == 37) {
                        ke = 2;
                        this.verifsistem = 37;
                        this.levpiusistem = 47;
                        this.verifsistem = 37;
                        const data = {
                            dari: this.levpiusistem,
                            kepada: this.verifsistem,
                            kepada2: this.verif2sistem,
                            evaluasi: this.evaluasisistem,
                            kode_tahun: this.selectedtahun,
                            id_pelaksana: pelaksana,
                            kode_pelaksana: kode_satker,
                            verifikasi_ke: ke,
                            updateby: JSON.parse(localStorage.getItem("usistem"))
                        }
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        });
                        mainAPI.post("pksatker-AjukanKeSupanVerif", data).then(
                            Response => {
                                if (this.leveluser.includes(3) || this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8)) {
                                    var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.secretencData, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                                }
                                else {
                                    var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.selectedkategorisatker + "_" + this.selectedlabelsatker + "_" + this.selectedsatker, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                                }
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.fire({
                                        title: "Informasi",
                                        text: "Verifikasi Telah Diajukan..",
                                        icon: "success"
                                    }).then(function () {
                                        window.location.replace("/PerjanjianKinerjaSatkerAwal/" + kode);
                                    });
                                    $('.swal2-container').css("z-index", '999999');
                                }
                            }
                        ).catch(
                            error => {
                                swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                            }
                        )
                    }
                    else {
                        const data = {
                            dari: this.levpiusistem,
                            kepada: this.verifsistem,
                            kepada2: this.verif2sistem,
                            evaluasi: this.evaluasisistem,
                            kode_tahun: this.selectedtahun,
                            id_pelaksana: pelaksana,
                            kode_pelaksana: kode_satker,
                            verifikasi_ke: ke,
                            updateby: JSON.parse(localStorage.getItem("usistem"))
                        }
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        });
                        mainAPI.post("pksatker-AjukanVerif", data).then(
                            Response => {
                                if (this.leveluser.includes(3) || this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8)) {
                                    var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.secretencData, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                                }
                                else {
                                    var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.selectedkategorisatker + "_" + this.selectedlabelsatker + "_" + this.selectedsatker, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                                }
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.fire({
                                        title: "Informasi",
                                        text: "Verifikasi Telah Diajukan..",
                                        icon: "success"
                                    }).then(function () {
                                        window.location.replace("/PerjanjianKinerjaSatker/" + kode);
                                    });
                                    $('.swal2-container').css("z-index", '999999');
                                }
                            }
                        ).catch(
                            error => {
                                swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                            }
                        )
                    }
                    //alert(ke);
                    //return;
                }
            });
            return false;
        },
        async verifpk() {
            if (this.secretencData.includes("_")) {
                var temp = this.secretencData.split("_");
                if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                    if ((this.selectedsatker == temp[2]) && this.selectedsatker == '') {
                        var pelaksana = temp[2];
                    }
                    else {
                        var pelaksana = this.selectedsatker;
                    }
                }
                if (this.leveluser == 7) {
                    var pelaksana = this.levpiusistem;
                }
            }
            else {
                if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                    var pelaksana = this.selectedsatker;
                }
                if (this.leveluser == 7) {
                    var pelaksana = this.levpiusistem;
                }
            }
            var tempkdsatker = this.selectedlabelsatker.split("]");
            var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
            if (this.leveluser != 7) {
                var kode_satker = tempkodesatker.trim();
            }
            else {
                var kode_satker = this.kdsatkersistem;
            }
            if ((this.verifsistem != null && this.verifsistem.includes(pelaksana)) && this.leveluser != 1) {
                this.halamanloading = true;
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                this.id_verif = '';
                this.level_verif = '';
                this.tahun_verif = '';
                this.id_pelaksana_verif = '';
                this.kode_satker_verif = '';
                this.jumlah_verif = '';
                this.hasil_verif = '';
                this.akan_verif_ke = '';
                this.tanggal_batas_verif = '';
                this.catatan_verif = '';
                this.verifikasi_ke = '';
                this.halamanloading = true;
                var random = Math.random();
                await mainAPI.get("pksatker-DataVerif?random=" + random + "&kode_satker=" + kode_satker + "&tahun=" + this.selectedtahun + "&pelaksana=" + pelaksana).then(
                    Response => {
                        this.datapesanreff = Response.data.message;
                        if (this.datapesanreff == 'data diketemukan') {
                            this.id_verif = Response.data.content.data[0].id;
                            this.level_verif = Response.data.content.data[0].level_verif;
                            this.tahun_verif = Response.data.content.data[0].tahun;
                            this.id_pelaksana_verif = Response.data.content.data[0].id_pelaksana;
                            this.kode_satker_verif = Response.data.content.data[0].kode_satker;
                            this.jumlah_verif = Response.data.content.data[0].jumlah_verif;
                            this.hasil_verif = Response.data.content.data[0].hasil_verif;
                            this.akan_verif_ke = Response.data.content.data[0].akan_verif_ke;
                            this.tanggal_batas_verif = Response.data.content.data[0].tanggal_batas;
                            this.catatan_verif = atob(Response.data.content.data[0].catatan);
                            this.verifikasi_ke = Response.data.content.data[0].akan_verif_ke;

                            this.jumlahverifikasi.forEach((item) => {
                                if (item.tag == this.akan_verif_ke) {
                                    this.selectedjumlahverifikasi = item.tag;
                                    this.defaultSelectedjumlahverifikasi = {
                                        code: item.code,
                                        label: item.label,
                                        tag: item.tag,
                                    };
                                }
                            });

                            this.verifikasi.forEach((item) => {
                                if (item.tag == this.hasil_verif) {
                                    this.selectedverifikasi = item.tag;
                                    this.defaultSelectedverifikasi = {
                                        code: item.code,
                                        label: item.label,
                                        tag: item.tag,
                                    };
                                }
                            });

                            document.getElementById('iframefile').src = "";
                            //alert(process.env.VUE_APP_URL_API+this.tahunku+'/' + foldernya + '?f=' + filenya);
                            document.getElementById('iframefile').src = process.env.VUE_APP_URL_API + this.tahunku + '/' + "pksatker-cetakPK?kode_satker=" + btoa(kode_satker) + "&tahun=" + btoa(this.selectedtahun) + "&pelaksana=" + btoa(pelaksana);
                            $('#costumModalcetak').modal('show');

                        }

                        this.halamanloading = false;
                    }
                ).catch(error => {
                    swal.fire('Peringatan', error, 'error');
                    this.halamanloading = false;
                    return false;
                })
            }
            else if (this.leveluser == 1) {
                this.halamanloading = true;
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                this.id_verif = '';
                this.level_verif = '';
                this.tahun_verif = '';
                this.id_pelaksana_verif = '';
                this.kode_satker_verif = '';
                this.jumlah_verif = '';
                this.hasil_verif = '';
                this.akan_verif_ke = '';
                this.tanggal_batas_verif = '';
                this.catatan_verif = '';
                //alert(pelaksana);

                this.halamanloading = true;
                var random = Math.random();
                await mainAPI.get("pksatker-DataVerif?random=" + random + "&kode_satker=" + kode_satker + "&tahun=" + this.selectedtahun + "&pelaksana=" + pelaksana).then(
                    Response => {
                        this.datapesanreff = Response.data.message;
                        if (this.datapesanreff == 'data diketemukan') {
                            //alert(JSON.stringify(Response.data.content.data));
                            this.id_verif = Response.data.content.data[0].id;
                            this.level_verif = Response.data.content.data[0].level_verif;
                            this.tahun_verif = Response.data.content.data[0].tahun;
                            this.id_pelaksana_verif = Response.data.content.data[0].id_pelaksana;
                            this.kode_satker_verif = Response.data.content.data[0].kode_satker;
                            this.jumlah_verif = Response.data.content.data[0].jumlah_verif;
                            this.hasil_verif = Response.data.content.data[0].hasil_verif;
                            this.akan_verif_ke = Response.data.content.data[0].akan_verif_ke;
                            this.tanggal_batas_verif = Response.data.content.data[0].tanggal_batas;
                            this.catatan_verif = atob(Response.data.content.data[0].catatan);
                            this.verifikasi_ke = Response.data.content.data[0].akan_verif_ke;
                            //alert(this.id_verif);
                            this.jumlahverifikasi.forEach((item) => {
                                if (item.tag == this.akan_verif_ke) {
                                    this.selectedjumlahverifikasi = item.tag;
                                    this.defaultSelectedjumlahverifikasi = {
                                        code: item.code,
                                        label: item.label,
                                        tag: item.tag,
                                    };
                                }
                            });

                            this.verifikasi.forEach((item) => {
                                if (item.tag == this.hasil_verif) {
                                    this.selectedverifikasi = item.tag;
                                    this.defaultSelectedverifikasi = {
                                        code: item.code,
                                        label: item.label,
                                        tag: item.tag,
                                    };
                                }
                            });

                            document.getElementById('iframefile').src = "";
                            //alert(process.env.VUE_APP_URL_API+this.tahunku+'/' + foldernya + '?f=' + filenya);
                            document.getElementById('iframefile').src = process.env.VUE_APP_URL_API + this.tahunku + '/' + "pksatker-cetakPK?kode_satker=" + btoa(kode_satker) + "&tahun=" + btoa(this.selectedtahun) + "&pelaksana=" + btoa(pelaksana);
                            $('#costumModalcetak').modal('show');

                        }

                        this.halamanloading = false;
                    }
                ).catch(error => {
                    swal.fire('Peringatan', error, 'error');
                    this.halamanloading = false;
                    return false;
                })
            }
            else if (this.leveluser != 1) {
                this.halamanloading = true;
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });

                this.id_verif = '';
                this.level_verif = '';
                this.tahun_verif = '';
                this.id_pelaksana_verif = '';
                this.kode_satker_verif = '';
                this.jumlah_verif = '';
                this.hasil_verif = '';
                this.akan_verif_ke = '';
                this.tanggal_batas_verif = '';
                this.catatan_verif = '';
                //alert(pelaksana);
                //alert(kode_satker);
                //alert(pelaksana);
                //return;

                this.halamanloading = true;
                var random = Math.random();
                await mainAPI.get("pksatker-DataVerif?random=" + random + "&kode_satker=" + kode_satker + "&tahun=" + this.selectedtahun + "&pelaksana=" + pelaksana).then(
                    Response => {
                        this.datapesanreff = Response.data.message;
                        if (this.datapesanreff == 'data diketemukan') {
                            //alert(JSON.stringify(Response.data.content.data));
                            this.id_verif = Response.data.content.data[0].id;
                            this.level_verif = Response.data.content.data[0].level_verif;
                            this.tahun_verif = Response.data.content.data[0].tahun;
                            this.id_pelaksana_verif = Response.data.content.data[0].id_pelaksana;
                            this.kode_satker_verif = Response.data.content.data[0].kode_satker;
                            this.jumlah_verif = Response.data.content.data[0].jumlah_verif;
                            this.hasil_verif = Response.data.content.data[0].hasil_verif;
                            this.akan_verif_ke = Response.data.content.data[0].akan_verif_ke;
                            this.tanggal_batas_verif = Response.data.content.data[0].tanggal_batas;
                            this.catatan_verif = atob(Response.data.content.data[0].catatan);
                            this.verifikasi_ke = Response.data.content.data[0].akan_verif_ke;
                            //alert(this.id_verif);
                            this.jumlahverifikasi.forEach((item) => {
                                if (item.tag == this.akan_verif_ke) {
                                    this.selectedjumlahverifikasi = item.tag;
                                    this.defaultSelectedjumlahverifikasi = {
                                        code: item.code,
                                        label: item.label,
                                        tag: item.tag,
                                    };
                                }
                            });

                            this.verifikasi.forEach((item) => {
                                if (item.tag == this.hasil_verif) {
                                    this.selectedverifikasi = item.tag;
                                    this.defaultSelectedverifikasi = {
                                        code: item.code,
                                        label: item.label,
                                        tag: item.tag,
                                    };
                                }
                            });

                            document.getElementById('iframefile').src = "";
                            //alert(process.env.VUE_APP_URL_API+this.tahunku+'/' + foldernya + '?f=' + filenya);
                            document.getElementById('iframefile').src = process.env.VUE_APP_URL_API + this.tahunku + '/' + "pksatker-cetakPK?kode_satker=" + btoa(kode_satker) + "&tahun=" + btoa(this.selectedtahun) + "&pelaksana=" + btoa(pelaksana);
                            $('#costumModalcetak').modal('show');

                        }

                        this.halamanloading = false;
                    }
                ).catch(error => {
                    swal.fire('Peringatan', error, 'error');
                    this.halamanloading = false;
                    return false;
                })
            }
            else {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Tidak berhak melakukan verifikasi',
                });
            }

        },
        cetakpk() {
            this.halamanloading = true;
            if (this.secretencData.includes("_")) {
                var temp = this.secretencData.split("_");
                if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                    if ((this.selectedsatker == temp[2]) && this.selectedsatker == '') {
                        var pelaksana = temp[2];
                    }
                    else {
                        var pelaksana = this.selectedsatker;
                    }
                }
                if (this.leveluser.includes(3)) {
                    var pelaksana = this.levpiusistem;
                }
                if (this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8) || this.leveluser.includes(7)) {
                    var pelaksana = this.jenis_piusistem;
                }
            }
            else {
                if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                    var pelaksana = this.selectedsatker;
                }
                if (this.leveluser.includes(3)) {
                    var pelaksana = this.levpiusistem;
                }
                if (this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8) || this.leveluser.includes(7)) {
                    var pelaksana = this.jenis_piusistem;
                }
            }
            var tempkdsatker = this.selectedlabelsatker.split("]");
            var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
            if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                var kode_satker = tempkodesatker.trim();
            }
            else {
                var kode_satker = this.kdsatkersistem;
            }

            //alert(pelaksana);
            //alert(kode_satker);
            document.getElementById('iframefilecetak').src = "";
            //alert(process.env.VUE_APP_URL_API+this.tahunku+'/' + foldernya + '?f=' + filenya);
            document.getElementById('iframefilecetak').src = process.env.VUE_APP_URL_API + this.tahunku + '/' + "pksatker-cetakPK?kode_satker=" + btoa(kode_satker) + "&tahun=" + btoa(this.selectedtahun) + "&pelaksana=" + btoa(pelaksana);
            $('#costumModalcetaktanpaverif').modal('show');
        },
        ubahisian_outcome_target_persen(id, kolom, idisian, tahun, jumlah, urutan) {
            //alert(jumlah);
            try {
                var isikolom = document.getElementById(idisian).value;
            } catch (error) {
                var isikolom = 0;
            }

            var ygdirubahtemp = idisian.split("_");

            var isisemua = "";
            for (let i = 0; i < jumlah; i++) {
                if (i == 0) {
                    isisemua = isisemua + document.getElementById("detailisian_" + ygdirubahtemp[1] + "_" + i + "_" + ygdirubahtemp[3] + "_" + ygdirubahtemp[4]).value;
                }
                else {
                    isisemua = isisemua + "@" + document.getElementById("detailisian_" + ygdirubahtemp[1] + "_" + i + "_" + ygdirubahtemp[3] + "_" + ygdirubahtemp[4]).value;
                }
            }
            var baris = urutan;
            var ygdirubah = "isian_" + ygdirubahtemp[1] + "_" + ygdirubahtemp[2] + "_" + ygdirubahtemp[3];
            var isian = document.getElementById(idisian).value;
            var kolom = kolom;
            var tahun = ygdirubahtemp[3];
            var explode = ygdirubahtemp[2];
            //alert('kode ' + id);
            //alert('kolom ' + kolom);
            //alert('isi ' + isian);
            //alert('idisian ' + idisian);
            //alert('isisemua ' + isisemua);
            //alert('urutan ' + baris);
            //alert('tahun ' + tahun);
            //alert('ygdirubah ' + ygdirubah);
            //alert('tahundiubah ' + tahun);
            //alert('id ' + this.id);
            //return;
            const data = { kode: id, id_indikator: this.id, kolom: kolom, isi: isian, idisian: idisian, isisemua: isisemua, urutan: baris, tahundiubah: tahun, explode: explode, updateby: JSON.parse(localStorage.getItem("usistem")) }
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            mainAPI.post("pksatkerpersen-LatLongUpdate", data).then(
                Response => {
                    //alert(Response.data.sql);
                    //alert(Response.data.jumlahnya);
                    document.getElementById(ygdirubah).value = Response.data.jumlahnya;
                    //alert(JSON.stringify(Response.data.jumlahnya));
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: 'Data telah terupdate',
                        });
                    }
                }
            ).catch(
                error => {
                    swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                }
            )
        },
        ubahisian_outcome_target(id, kolom, idisian, tahun) {

            var isian = document.getElementById(idisian).value;
            var kolom = kolom;
            const data = { kode: id, kolom: kolom, isi: isian, updateby: JSON.parse(localStorage.getItem("usistem")) }
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            mainAPI.post("pksatker-LatLongUpdate", data).then(
                Response => {
                    if (kolom == 'outcome') {
                        document.getElementById('volume' + tahun).value = Response.data.jumlahnya;
                    }
                    if (kolom == 'target') {
                        document.getElementById('target' + tahun).value = Response.data.jumlahnya;
                    }
                    //alert(JSON.stringify(Response.data.jumlahnya));
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: 'Data telah terupdate',
                        });
                    }
                }
            ).catch(
                error => {
                    swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                }
            )
        },
        ubahlokasi(id, kolom, idisian, cek) {
            var isian = document.getElementById(idisian).value;
            var kolom = kolom;
            //alert(kolom);
            //return;
            var isicek = document.getElementById(cek).value;
            if (isian != '' && isian != '0') {
                const data = { kode: id, kolom: kolom, isi: isian, updateby: JSON.parse(localStorage.getItem("usistem")) }
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                mainAPI.post("pksatker-LatLongUpdate", data).then(
                    Response => {
                        if (Response.data.response == 'error') {
                            swal.fire('Peringatan', Response.data.message, 'error');
                        }
                        else {
                            if (kolom == 'latitude') {
                                if (isicek == '' || isicek == '0') {
                                    swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000
                                    }).fire({
                                        icon: 'warning',
                                        title: 'Data telah terupdate, Mohon Isikan Kolom Longitude',
                                    });
                                }
                                else {
                                    swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000
                                    }).fire({
                                        icon: 'success',
                                        title: 'Data telah terupdate',
                                    });
                                }
                            }
                            else if (kolom == 'longitude') {
                                if (isicek == '' || isicek == '0') {
                                    swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000
                                    }).fire({
                                        icon: 'warning',
                                        title: 'Data telah terupdate, Mohon Isikan Kolom Latitude',
                                    });
                                }
                                else {
                                    swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000
                                    }).fire({
                                        icon: 'success',
                                        title: 'Data telah terupdate',
                                    });
                                }
                            }
                        }
                    }
                ).catch(
                    error => {
                        swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                    }
                )
            }

        },
        hapusmultitaggingemon() {
            if (this.arrayDeletepaketemon.length == 0) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Silahkan pilih paket iemon yang hendak dihapus',
                });
                $('.swal2-container').css("z-index", '999999');
                return false;
            }
            var tabelgabung = "";
            for (let i = 0; i < this.arrayDeletepaketemon.length; i++) {
                if (i == 0) {
                    tabelgabung = tabelgabung + this.arrayDeletepaketemon[i];
                }
                else {
                    tabelgabung = tabelgabung + "|" + this.arrayDeletepaketemon[i];
                }
            }
            swal.fire({
                title: "Konfirmasi",
                text: "Yakin Hendak Hapus Tagging Data Emon ?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Hapus"
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = { kode: tabelgabung, deletedby: JSON.parse(localStorage.getItem("usistem")) }
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    mainAPI.post("pksatker-HapusMultiTagging", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                $('#costumModalopsi').modal('hide');
                                this.showDelete = false;
                                try {
                                    document.getElementById('custompilihan').checked = false;
                                } catch (error) {

                                }
                                this.prosesdata(this.id, this.namasatuan, this.namaoutput, this.namaoutcome, this.hitungan_pk, this.textindikator, this.jumlahkomponen, this.kolomkomponen, this.bobotkomponen, this.rumuskomponen, this.disabelkolomnya);
                            }
                        }
                    ).catch(
                        error => {
                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                        }
                    )

                }
            });
            return false;
        },
        hapustaggingemon(id) {
            swal.fire({
                title: "Konfirmasi",
                text: "Yakin Hendak Hapus Tagging Data Emon ?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Hapus"
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = { kode: id, deletedby: JSON.parse(localStorage.getItem("usistem")) }
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    mainAPI.post("pksatker-DeleteTagging", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                $('#costumModalopsi').modal('hide');
                                this.prosesdata(this.id, this.namasatuan, this.namaoutput, this.namaoutcome, this.hitungan_pk, this.textindikator, this.jumlahkomponen, this.kolomkomponen, this.bobotkomponen, this.rumuskomponen, this.disabelkolomnya);
                            }
                        }
                    ).catch(
                        error => {
                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                        }
                    )

                }
            });
            return false;

        },
        pilihsemua() {
            if (document.getElementById('customallSwitchAuth').checked == true) {
                $('.mailbox-messages input[type=\'checkbox\']').prop('checked', true);
                var checkedCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="customSwitchAuth_"]:checked');
                checkedCheckboxes.forEach(checkbox => {
                    var cek = checkbox.id.replaceAll("customSwitchAuth_", "");
                    if (!this.arraypaketemon.includes(cek)) {
                        this.arraypaketemon.push(cek);
                    }
                });
            }
            else {
                $('.mailbox-messages input[type=\'checkbox\']').prop('checked', false);
                this.arraypaketemon = [];
            }
        },
        async bukaemon(id, tahun, kodesatker, kodekegiatan) {
            //alert(kodesatker);
            //return;
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
                        this.arraypaketemon = [];
                        this.arraypaketemon = Response.data.content.detail;
                        //alert(JSON.stringify(this.arraypaketemon));
                    }
                    else {
                        this.dataemon = [];
                        this.arraypaketemon = [];
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
        },
        onsatkerChange(a) {
            try {
                this.selectedsatker = this.satker[a].tag;
                this.selectedlabelsatker = this.satker[a].label;
            }
            catch (err) {
                return;
            }
            this.ambildata();
        },
        onverifikasiChange(a) {
            try {
                this.selectedverifikasi = this.verifikasi[a].tag;
                this.selectedlabelverifikasi = this.verifikasi[a].label;
            }
            catch (err) {
                return;
            }
        },
        onjumlahverifikasiChange(a) {
            try {
                this.selectedjumlahverifikasi = this.jumlahverifikasi[a].tag;
                this.selectedlabeljumlahverifikasi = this.jumlahverifikasi[a].label;
            }
            catch (err) {
                return;
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
                                tag: item.level_piu,
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
            //alert(this.jenis_piusistem);
            var pilihkategorisatker = '';
            var kodekategorisatker = '';
            //alert(this.secretencData);
            if (this.secretencData.includes("_")) {
                var temp = this.secretencData.split("_");
                pilihkategorisatker = temp[0];
                this.selectedkategorisatker = pilihkategorisatker;
                var tempsatker = temp[1].split("]");
                var ceksatker = tempsatker[0].trim().replace("[", "");
                //alert(ceksatker);
                var pilihsatker = ceksatker;
            }
            else {
                if (this.leveluser.includes("6")) {
                    pilihkategorisatker = this.ksatkersistem;
                    kodekategorisatker = this.ksatkersistem;
                }
                else if (this.leveluser.includes("5")) {
                    //alert(this.jenis_piusistem);
                    if ((this.jenis_piusistem == '34') || (this.jenis_piusistem == '35') || (this.jenis_piusistem == '36')
                        || (this.jenis_piusistem == '37') || (this.jenis_piusistem == '38') || (this.jenis_piusistem == '42')
                        || (this.jenis_piusistem == '43') || (this.jenis_piusistem == '44')) {
                        pilihkategorisatker = this.selectedkategorisatker;
                    }
                    else {
                        pilihkategorisatker = this.ksatkersistem;
                        kodekategorisatker = this.ksatkersistem;
                    }

                }
                else {
                    pilihkategorisatker = this.selectedkategorisatker;
                }
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

            var random = Math.random();
            await mainAPIData.get("parastapainnovationreff-GetKategoriSatker?random=" + random + "&kdbalai=" + kodekategorisatker + "&cantekbalai=" + this.jenis_piusistem).then(
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
            //alert(this.jenis_piusistem);
            this.halamanloading = true;
            var random = Math.random();
            await mainAPIData.get("parastapainnovationsatker-GetAll?random=" + random + "&kategorisatker=" + pilihkategorisatker + "&cantekbalai=" + this.jenis_piusistem).then(
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
                                    tag: item.level_piu,
                                };
                            }
                            this.satker.push({
                                label: '[' + item.kode_satker + '] ' + item.nama_satker,
                                code: this.datasatker.indexOf(item) + 1,
                                tag: item.level_piu,
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
            if (this.secretencData.includes("_")) {
                //alert('222');
                var temp = this.secretencData.split("_");
                if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(3) || this.leveluser.includes(4) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                    if ((this.selectedsatker == temp[2]) && this.selectedsatker == '') {
                        var pelaksana = temp[2];
                    }
                    else {
                        var pelaksana = this.selectedsatker;
                    }
                }
                if (this.leveluser.includes(3)) {
                    var pelaksana = this.levpiusistem;
                }
                if (this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8) || this.leveluser.includes(7)) {
                    var pelaksana = this.jenis_piusistem;
                }
                if (this.leveluser.includes(9) || this.leveluser.includes(8)) {
                    var pelaksana = this.jenis_piusistem;
                }
            }
            else {
                if (this.leveluser.includes(1) || this.leveluser.includes(2) || this.leveluser.includes(5) || this.leveluser.includes(6)) {
                    var pelaksana = this.selectedsatker;
                }
                if (this.leveluser == 7 || this.leveluser.includes(3)) {

                    //alert(this.jenis_piusistem);
                    if (this.leveluser == 7) {
                        var pelaksana = this.jenis_piusistem;
                    }
                    else {
                        var pelaksana = this.levpiusistem;
                    }
                }
                if (this.leveluser.includes(4) || this.leveluser.includes(9) || this.leveluser.includes(8)) {
                    var pelaksana = this.jenis_piusistem;
                }
                if (this.leveluser.includes(9) || this.leveluser.includes(8)) {
                    var pelaksana = this.jenis_piusistem;
                }
            }

            var tempkdsatker = this.selectedlabelsatker.split("]");
            var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
            if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                var kode_satker = tempkodesatker.trim();
            }
            else {
                var kode_satker = this.kdsatkersistem;
            }
            //alert(pelaksana);
            //alert(kode_satker);
            //alert(this.selectedtahun);
            //alert(this.jenis_piusistem);
            this.temppelaksana = pelaksana;
            this.tempkode_satker = kode_satker;
            await mainAPI.get("pksatker-GetData?random=" + random + "&tahun=" + this.selectedtahun + "&pelaksana=" + pelaksana + "&kode_satker=" + kode_satker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                        this.cekverif = [];
                        this.cekverif = Response.data.content.verif;
                        this.shortcutinput = '0';
                        this.shortcutinput = Response.data.content.shortcutinput;
                        this.pk_aktif = '2';
                        this.pk_aktif = Response.data.content.pk_aktif;
                        //alert(JSON.stringify(this.cekverif));
                        this.ttd = '0';
                        this.ttd = Response.data.content.ttd;
                        if (Response.data.content.verif.length > 0) {
                            this.tesverif = Response.data.content.verif[0].verifikasi_ke;
                            this.disablednya = Response.data.content.verif[0].disabled;
                            this.dari = Response.data.content.verif[0].kepada;
                            this.kepada = Response.data.content.verif[0].dari;
                            this.hasilakhir = Response.data.content.verif[0].status_ajuan.trim();
                            //alert(JSON.stringify(this.cekverif));
                            //alert(this.hasilakhir);
                        }
                        else {
                            this.ttd = '0';
                            this.shortcutinput = '0';
                            this.pk_aktif = '2';
                            this.tesverif = 1;
                            this.disablednya = false;
                            this.hasilakhir = '';
                        }

                    }
                    else {
                        this.ttd = '0';
                        this.shortcutinput = '0';
                        this.pk_aktif = '2';
                        this.datamaster = [];
                        this.cekverif = [];
                        this.tesverif = 1;
                        this.hasilakhir = '';
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                //this.ClearlocalStorage();
                this.halamanloading = false;
            });

            this.halamanloading = true;
            var random = Math.random();
            await mainAPI.get("pksatker-GetTTD?random=" + random + "&kode_satker=" + kode_satker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.level_pejabat = Response.data.content.data[0].level_pejabat;
                        this.kode_satker_pejabat = Response.data.content.data[0].kode_satker_pejabat;
                        this.lokasi_pejabat = Response.data.content.data[0].lokasi_pejabat;
                        this.nama_pejabat = Response.data.content.data[0].nama_pejabat;
                        this.pangkat_pejabat = Response.data.content.data[0].pangkat_pejabat;
                        this.jabatan_pejabat = Response.data.content.data[0].jabatan_pejabat;
                        this.nip_pejabat = Response.data.content.data[0].nip_pejabat;
                        this.tanggal_pejabat = Response.data.content.data[0].tanggal_pejabat;
                        try {
                            document.getElementById('filenya_ttd').value = Response.data.content.data[0].filenya_ttd;
                        } catch (error) {

                        }

                        this.filenya_ttd = Response.data.content.data[0].filenya_ttd;
                        this.halamanloading = false;
                    }
                    else {
                        this.level_pejabat = 'Satker';
                        this.kode_satker_pejabat = kode_satker;
                        this.lokasi_pejabat = '';
                        this.nama_pejabat = '';
                        this.pangkat_pejabat = '';
                        this.jabatan_pejabat = '';
                        this.nip_pejabat = '';
                        this.tanggal_pejabat = '';
                        this.halamanloading = false;
                    }

                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
        },
        prosesdata(id, namasatuan, namaoutput, namaoutcome, hitungan_pk, textindikator, jumlahkomponen, kolomkomponen, bobotkomponen, rumuskomponen, disabelkolomnya) {
            this.showDelete = false;
            try {
                document.getElementById('custompilihan').checked = false;
            } catch (error) {

            }
            this.disabelkolomnya = disabelkolomnya;
            this.textindikator = textindikator;
            this.namasatuan = namasatuan;
            this.namaoutput = namaoutput;
            this.namaoutcome = namaoutcome;
            this.hitungan_pk = hitungan_pk;
            this.tahun_awal = 0;
            this.tahun_akhir = 0;
            this.id = id;
            this.jumlahkomponen = jumlahkomponen;
            this.kolomkomponen = kolomkomponen;
            this.bobotkomponen = bobotkomponen;
            this.rumuskomponen = rumuskomponen;
            this.validasikomponen = [];
            this.tahun = this.selectedtahun;
            var kolomkomponentmp = kolomkomponen.split("#");
            var bobotkomponentmp = bobotkomponen.split("#");
            var rumuskomponentmp = rumuskomponen.split("#");
            for (let i = 0; i < this.jumlahkomponen; i++) {
                this.validasikolomkomponen = [];
                this.validasibobotkomponen = [];
                this.validasirumuskomponen = [];
                var isikolomkomponentmp = kolomkomponentmp[i].split("|");
                var isibobotkomponentmp = bobotkomponentmp[i].split("|");
                var isirumuskomponentmp = rumuskomponentmp[i].split("|");
                for (let x = 0; x < isikolomkomponentmp.length; x++) {
                    this.validasikolomkomponen.push({
                        kolom: isikolomkomponentmp[x],
                        bobot: isibobotkomponentmp[x],
                        rumus: isirumuskomponentmp[x],
                    });
                }
                this.validasikomponen.push({
                    data_ke: i,
                    detail: this.validasikolomkomponen,
                });

            }
            var temp = this.selectedlabelsatker.split("]");
            var tempkodesatker = temp[0].replaceAll("[", "");
            if (this.leveluser != 7) {
                var kode_satker = tempkodesatker.trim();
            }
            if (this.leveluser.includes(5) || this.leveluser == 1) {
                var tempkdsatker = this.selectedlabelsatker.split("]");
                var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
                var kode_satker = tempkodesatker;
            }
            else {
                var kode_satker = this.kdsatkersistem;
            }
            this.kode_satker = kode_satker;
            //alert(this.leveluser);
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            //alert(this.id);
            //alert(kode_satker);
            mainAPI.get("pksatker-GetBaseline?random=" + random + "&tahun=" + this.selectedtahun + "&id=" + this.id + "&kode_satker=" + kode_satker + "&hitungan_pk=" + this.hitungan_pk + "&textindikator=" + this.textindikator).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.isiandata = [];
                        this.isiandatadetail = [];
                        this.isiandata = Response.data.content.baseline;
                        this.isiandatadetail = Response.data.content.data;
                        this.tahun_awal = Response.data.content.tahun_awal;
                        this.tahun_akhir = Response.data.content.tahun_akhir;
                    }
                    else {
                        this.isiandata = [];
                        this.isiandatadetail = [];
                    }
                    $('#costumModalopsi').modal('show');
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                //this.ClearlocalStorage();
                this.halamanloading = false;
            });

        },
        cekarrayhapustagging(id) {
            var cek = id.replaceAll("customHapus_", "");
            if (document.getElementById(id).checked == true) {
                if (!this.arrayDeletepaketemon.includes(cek)) {
                    this.arrayDeletepaketemon.push(cek);
                }
            }
            else {
                var valueToRemove = cek;
                var index = this.arrayDeletepaketemon.indexOf(valueToRemove);
                if (index !== -1) {
                    this.arrayDeletepaketemon.splice(index, 1); // Removes 1 element at the found index
                }
            }
            //alert(JSON.stringify(this.arrayDeletepaketemon));
        },
        cekarrayemon(id) {
            var cek = id.replaceAll("customSwitchAuth_", "");
            if (document.getElementById(id).checked == true) {
                if (!this.arraypaketemon.includes(cek)) {
                    this.arraypaketemon.push(cek);
                }
            }
            else {
                var valueToRemove = cek;
                var index = this.arraypaketemon.indexOf(valueToRemove);
                if (index !== -1) {
                    this.arraypaketemon.splice(index, 1); // Removes 1 element at the found index
                }
            }
            //alert(JSON.stringify(this.arraypaketemon));
        },
        pilihemon() {
            var tabelgabung = "";
            for (let i = 0; i < this.arraypaketemon.length; i++) {
                if (i == 0) {
                    tabelgabung = tabelgabung + this.arraypaketemon[i];
                }
                else {
                    tabelgabung = tabelgabung + "|" + this.arraypaketemon[i];
                }
            }
            // The 'length' property of the NodeList will give you the count
            if (this.arraypaketemon.length <= 0) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Pilih Checkbox Paket Emon Yang Akan Ditagging',
                });
                return false;
            }
            this.halamanloading = false;
            //alert(this.kodekegiatanemon);
            //return;
            this.halamanloading = true;
            var fd = new FormData();
            fd.append("id_pk", this.id_datapk);
            fd.append("id_indikator", this.id);
            fd.append("kode_tahun", this.selectedtahun);
            fd.append("tahun", this.tahunemon);
            fd.append("kode_satker", this.kodesatkeremon);
            fd.append("kodekegiatanemon", this.kodekegiatanemon);
            fd.append("kode_emon", tabelgabung);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("pksatker-TaggingEmon", fd).then(
                Response => {
                    var tahunnya = this.tahunemon;
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                        $('.swal2-container').css("z-index", '999999');
                        this.halamanloading = false;
                    }
                    else {
                        swal.fire('Peringatan', Response.data.message, 'success');
                        $('.swal2-container').css("z-index", '999999');
                        document.getElementById('daftaremon' + tahunnya).innerHTML = this.arraypaketemon.length;
                        $('#costumModalemon').modal('hide');
                        //document.location.reload();
                        this.prosesdata(this.id, this.namasatuan, this.namaoutput, this.namaoutcome, this.hitungan_pk, this.textindikator, this.jumlahkomponen, this.kolomkomponen, this.bobotkomponen, this.rumuskomponen, false);
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
                $('.swal2-container').css("z-index", '999999');
                this.halamanloading = false;
            }
            )
        },
        simpanttd() {
            if (this.level_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi data tandatangan'
                });
                return false;
            }
            if (this.kode_satker_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi data tandatangan'
                });
                return false;
            }
            if (this.tanggal_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi data tandatangan'
                });
                return false;
            }
            if (this.lokasi_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi data tandatangan'
                });
                return false;
            }
            if (this.nama_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi data tandatangan'
                });
                return false;
            }
            if (this.pangkat_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi data tandatangan'
                });
                return false;
            }
            if (this.jabatan_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi data tandatangan'
                });
                return false;
            }
            if (this.nip_pejabat == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Lengkapi data tandatangan'
                });
                return false;
            }

            var ttd = '';
            try {
                ttd = document.getElementById('filenya_ttd').value;
            } catch (error) {
                ttd = '';
            }

            var fd = new FormData();
            fd.append("level_pejabat", this.level_pejabat);
            fd.append("kode_satker_pejabat", this.kode_satker_pejabat);
            fd.append("tanggal_pejabat", this.tanggal_pejabat);
            fd.append("lokasi_pejabat", this.lokasi_pejabat);
            fd.append("nama_pejabat", this.nama_pejabat);
            fd.append("pangkat_pejabat", this.pangkat_pejabat);
            fd.append("jabatan_pejabat", this.jabatan_pejabat);
            fd.append("nip_pejabat", this.nip_pejabat);
            fd.append("filenya_ttd", ttd);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("pksatker-SimpanTTD", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Peringatan', 'Data pengaturan tandatangan telah tersimpan', 'success');
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
        simpan() {
            //alert(this.leveluser);
            //return;
            setTimeout(() => {
                if (this.hitungan_pk == 1) {
                    var x = 1;
                    var proyek = "";
                    var volume = "";
                    var target = "";

                    for (let i = this.tahun_awal; i <= this.tahun_akhir; i++) {
                        //alert(document.getElementById('proyek' + i).value);
                        //alert(document.getElementById('volume' + i).value);
                        //alert(document.getElementById('target' + i).value);
                        if (x == 1) {
                            proyek = proyek + document.getElementById('proyek' + i).innerHTML;
                            volume = volume + document.getElementById('volume' + i).value;
                            target = target + document.getElementById('target' + i).value;
                        }
                        else {
                            proyek = proyek + '|' + document.getElementById('proyek' + i).innerHTML;
                            volume = volume + '|' + document.getElementById('volume' + i).value;
                            target = target + '|' + document.getElementById('target' + i).value;
                        }
                        x++;
                    }

                    var fd = new FormData();
                    fd.append("id_indikator", this.id);
                    fd.append("hitungan_pk", this.hitungan_pk);
                    fd.append("id_satker", this.selectedsatker);
                    fd.append("kode_tahun", this.selectedtahun);
                    fd.append("kode_satker", document.getElementById('kode_satker').value);
                    fd.append("baseline", document.getElementById('baseline').value);
                    fd.append("tahun_awal", this.tahun_awal);
                    fd.append("tahun_akhir", this.tahun_akhir);
                    fd.append("proyek", proyek);
                    fd.append("volume", volume);
                    fd.append("target", target);
                    fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            "Content-Type": "form-data",
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                        },
                    });
                    mainAPI.post("pksatker-Update", fd).then(
                        Response => {

                            if (this.leveluser == 9) {
                                var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.secretencData, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                            }
                            else {
                                var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.selectedkategorisatker + "_" + this.selectedlabelsatker + "_" + this.selectedsatker, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                            }
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                                    document.location.reload();
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
                }
                if (this.hitungan_pk == 2 || this.hitungan_pk == 3) {
                    var x = 1;
                    var proyek = "";
                    var baseline = "";
                    var nilai = "";
                    for (let i = 0; i < this.jumlahkomponen; i++) {
                        if (i == 0) {
                            for (let z = 0; z < this.validasikomponen[0].detail.length; z++) {
                                if (z == 0) {
                                    var nilaibaseline = document.getElementById('baseline' + i + z).value;
                                    if (nilaibaseline == '') {
                                        nilaibaseline = '0';
                                    }
                                    baseline = baseline + nilaibaseline;
                                }
                                else {
                                    var nilaibaseline = document.getElementById('baseline' + i + z).value;
                                    if (nilaibaseline == '') {
                                        nilaibaseline = '0';
                                    }
                                    baseline = baseline + '|' + nilaibaseline;
                                }
                            }
                        }
                        else {
                            for (let z = 0; z < this.validasikomponen[0].detail.length; z++) {
                                if (z == 0) {
                                    var nilaibaseline = document.getElementById('baseline' + i + z).value;
                                    if (nilaibaseline == '') {
                                        nilaibaseline = '0';
                                    }
                                    baseline = baseline + '#' + nilaibaseline;
                                }
                                else {
                                    var nilaibaseline = document.getElementById('baseline' + i + z).value;
                                    if (nilaibaseline == '') {
                                        nilaibaseline = '0';
                                    }
                                    baseline = baseline + '|' + nilaibaseline;
                                }
                            }
                        }
                    }

                    for (let i = 0; i < this.jumlahkomponen; i++) {
                        if (i == 0) {
                            for (let z = this.tahun_awal; z <= this.tahun_akhir; z++) {
                                if (z == this.tahun_awal) {
                                    for (let y = 0; y < this.validasikomponen[0].detail.length; y++) {
                                        if (y == 0) {
                                            var nilaiproyek = document.getElementById('isian_' + i + '_' + y + '_' + z).value;
                                            if (nilaiproyek == '') {
                                                nilaiproyek = '0';
                                            }
                                            nilai = nilai + nilaiproyek;
                                        }
                                        else {
                                            var nilaiproyek = document.getElementById('isian_' + i + '_' + y + '_' + z).value;
                                            if (nilaiproyek == '') {
                                                nilaiproyek = '0';
                                            }
                                            nilai = nilai + '|' + nilaiproyek;
                                        }
                                    }
                                }
                                else {
                                    for (let y = 0; y < this.validasikomponen[0].detail.length; y++) {
                                        if (y == 0) {
                                            var nilaiproyek = document.getElementById('isian_' + i + '_' + y + '_' + z).value;
                                            if (nilaiproyek == '') {
                                                nilaiproyek = '0';
                                            }
                                            nilai = nilai + '?' + nilaiproyek;
                                        }
                                        else {
                                            var nilaiproyek = document.getElementById('isian_' + i + '_' + y + '_' + z).value;
                                            if (nilaiproyek == '') {
                                                nilaiproyek = '0';
                                            }
                                            nilai = nilai + '|' + nilaiproyek;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            for (let z = this.tahun_awal; z <= this.tahun_akhir; z++) {
                                if (z == this.tahun_awal) {
                                    for (let y = 0; y < this.validasikomponen[0].detail.length; y++) {
                                        if (y == 0) {
                                            var nilaiproyek = document.getElementById('isian_' + i + '_' + y + '_' + z).value;
                                            if (nilaiproyek == '') {
                                                nilaiproyek = '0';
                                            }
                                            nilai = nilai + '#' + nilaiproyek;
                                        }
                                        else {
                                            var nilaiproyek = document.getElementById('isian_' + i + '_' + y + '_' + z).value;
                                            if (nilaiproyek == '') {
                                                nilaiproyek = '0';
                                            }
                                            nilai = nilai + '|' + nilaiproyek;
                                        }
                                    }
                                }
                                else {
                                    for (let y = 0; y < this.validasikomponen[0].detail.length; y++) {
                                        if (y == 0) {
                                            var nilaiproyek = document.getElementById('isian_' + i + '_' + y + '_' + z).value;
                                            if (nilaiproyek == '') {
                                                nilaiproyek = '0';
                                            }
                                            nilai = nilai + '?' + nilaiproyek;
                                        }
                                        else {
                                            var nilaiproyek = document.getElementById('isian_' + i + '_' + y + '_' + z).value;
                                            if (nilaiproyek == '') {
                                                nilaiproyek = '0';
                                            }
                                            nilai = nilai + '|' + nilaiproyek;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for (let i = this.tahun_awal; i <= this.tahun_akhir; i++) {
                        if (x == 1) {
                            proyek = proyek + document.getElementById('proyek' + i).innerHTML;
                        }
                        else {
                            proyek = proyek + '|' + document.getElementById('proyek' + i).innerHTML;
                        }
                        x++;
                    }

                    //alert(this.id);
                    //alert(proyek);
                    //alert(baseline);
                    //alert(nilai);
                    //alert(this.tahun_awal);
                    //alert(this.tahun_akhir);
                    //alert(this.validasikomponen.length);
                    //alert(this.validasikomponen[0].detail.length);
                    //alert(this.validasikomponen[0].detail.length);
                    //console.log(nilai);
                    //return;
                    var fd = new FormData();
                    fd.append("id_satker", this.selectedsatker);
                    fd.append("id_indikator", this.id);
                    fd.append("hitungan_pk", this.hitungan_pk);
                    fd.append("jumlahkomponen", this.jumlahkomponen);
                    fd.append("jumlahkolom", this.validasikomponen[0].detail.length);
                    fd.append("kode_tahun", this.selectedtahun);
                    fd.append("kode_satker", document.getElementById('kode_satker').value);
                    fd.append("baseline", baseline);
                    fd.append("nilai", nilai);
                    fd.append("tahun_awal", this.tahun_awal);
                    fd.append("tahun_akhir", this.tahun_akhir);
                    fd.append("proyek", proyek);
                    fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            "Content-Type": "form-data",
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                        },
                    });
                    mainAPI.post("pksatker-Update", fd).then(
                        Response => {
                            if (this.leveluser == 9) {
                                var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.secretencData, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                            }
                            else {
                                var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.selectedkategorisatker + "_" + this.selectedlabelsatker + "_" + this.selectedsatker, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                            }
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                                    window.location.replace("/PerjanjianKinerjaSatker/" + kode);
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
                }
            }, 500);
        },
        hapus(id) {
            swal.fire({
                title: "Konfirmasi",
                text: "Yakin Hendak Hapus Data?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Batal",
                confirmButtonColor: "#003d68",
                cancelButtonColor: "#ffaa05",
                confirmButtonText: "Hapus"
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = { id: id, deletedby: JSON.parse(localStorage.getItem("usistem")) }
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    mainAPI.post("indikator-Delete", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire('Informasi', 'Data telah dihapus..', 'success').then(function () {
                                    window.location.replace("/Indikator");
                                });
                            }
                        }
                    ).catch(
                        error => {
                            swal.fire('Peringatan', 'Terjadi Kesalahan Format Data', 'error');
                        }
                    )

                }
            });
            return false;
        },
    },
    mounted() {
        this.getOtentifikasi();
        var temp = this.secretencData.split("_");
        if (this.secretencData.includes("_")) {
            this.selectedsatker = temp[2];
            this.selectedlabelsatker = temp[1];
        }
        //alert(this.ksatkersistem);
        this.getOtentifikasi();
        this.AmbilDataReff();
        this.ambildata();
    }
}
</script>
<style></style>