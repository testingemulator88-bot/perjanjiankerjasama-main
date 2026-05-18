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
        <div class="modal fade" id="costumModalverifikasi" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Verifikasi PK</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
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
                                        <v-select :options="verifikasi" :reduce="(label) => label.code" label="label"
                                            v-model="defaultSelectedverifikasi" @update:modelValue="onverifikasiChange"
                                            style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                                    </div>
                                    <div class="col-sm-4" style="display: none;">
                                        <label>Batas Tanggal Perbaikan</label>
                                        <input type="date" class="form-control form-control-sm" id="tanggal_batas_verif"
                                            name="tanggal_batas_verif" placeholder="Tanggal"
                                            v-model="tanggal_batas_verif">
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
                        <div class="col-sm-12">
                            <iframe src="" id="iframefileverifikasi" @load="loadpdfverifikasi()"
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
                        <h4 class="modal-title text-white">Cetak PK</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
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
                                <div class="table-responsive table-wrapper" style="font-size: smaller !important;">
                                    <table class="table m-0" id="tabeldata">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">Tahun</th>
                                                <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian"
                                                    v-if="hitungan_pk == 1">
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom1 != ''">{{
                                                        dataisian.m_kolom1 }}</th>
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom2 != ''">{{
                                                        dataisian.m_kolom2 }}</th>
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom3 != ''">{{
                                                        dataisian.m_kolom3 }}</th>
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom4 != ''">{{
                                                        dataisian.m_kolom4 }}</th>
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom5 != ''">
                                                        {{ dataisian.m_kolom5 }}
                                                    </th>
                                                    <th v-if="dataisian.m_isian_kolom != ''" style="width: 250px;">
                                                        {{ dataisian.m_isian_kolom }}
                                                    </th>
                                                </template>
                                                <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian"
                                                    v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                                    <template v-for="(datajudul, urutjudul) in dataisian.kolomkomponen"
                                                        :key="urutjudul">
                                                        <th style="width: 50px;" v-if="datajudul.rumus != ''">
                                                            {{ datajudul.rumus }}
                                                        </th>
                                                    </template>
                                                </template>
                                            </tr>
                                        </thead>
                                        <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian">
                                            <tr>
                                                <td class="text-left levelsubsubkegiatan"
                                                    v-if="hitungan_pk == 1 || hitungan_pk == 2 || hitungan_pk == 3">
                                                    Baseline*
                                                    <input type="hidden" class="form-control form-control-sm"
                                                        id="kode_balai" name="kode_balai" placeholder="kode_balai"
                                                        :value="dataisian.kode_balai">
                                                </td>
                                                <template v-if="hitungan_pk == 1">
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom1 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="baselinekolom1" name="baselinekolom1"
                                                            placeholder="Data baseline" :value="dataisian.kolom1"
                                                            @keyup="formattulisrupiah('baselinekolom1')"
                                                            @keydown="formattulisrupiah('baselinekolom1')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom2 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="baselinekolom2" name="baselinekolom2"
                                                            placeholder="Data baseline" :value="dataisian.kolom2"
                                                            @keyup="formattulisrupiah('baselinekolom2')"
                                                            @keydown="formattulisrupiah('baselinekolom2')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom3 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="baselinekolom3" name="baselinekolom3"
                                                            placeholder="Data baseline" :value="dataisian.kolom3"
                                                            @keyup="formattulisrupiah('baselinekolom3')"
                                                            @keydown="formattulisrupiah('baselinekolom3')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom4 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="baselinekolom4" name="baselinekolom4"
                                                            placeholder="Data baseline" :value="dataisian.kolom4"
                                                            @keyup="formattulisrupiah('baselinekolom4')"
                                                            @keydown="formattulisrupiah('baselinekolom4')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom5 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            id="baselinekolom5" name="baselinekolom5"
                                                            placeholder="Data baseline" :value="dataisian.kolom5"
                                                            @keyup="formattulisrupiah('baselinekolom5')"
                                                            @keydown="formattulisrupiah('baselinekolom5')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_isian_kolom != ''">
                                                    </td>
                                                </template>
                                                <template v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                                    <template v-for="(dataisian, urutisian) in isiandata"
                                                        :key="urutisian" v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                                        <template
                                                            v-for="(datajudul, urutjudul) in dataisian.masterrumus"
                                                            :key="urutjudul">
                                                            <td class="text-center levelsubsubkegiatan"
                                                                v-if="datajudul.rumus != ''">
                                                                <input type="text" class="form-control form-control-sm"
                                                                    :name="'baselinerumus_' + urutjudul"
                                                                    :id="'baselinerumus_' + urutjudul"
                                                                    placeholder="Data baseline" disabled value="0"
                                                                    @keyup="formattulisrupiah('baselinerumus_' + urutjudul)"
                                                                    @keydown="formattulisrupiah('baselinerumus_' + urutjudul)"
                                                                    style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                            </td>
                                                        </template>
                                                    </template>
                                                </template>
                                            </tr>
                                        </template>
                                        <template v-for="(dataisiandetail, urutisiandetail) in isiandatadetail"
                                            :key="urutisiandetail">
                                            <tr>
                                                <td class="text-center">
                                                    {{ dataisiandetail.tahun }}
                                                </td>
                                                <template v-for="(isi, urutisi) in dataisiandetail.detail"
                                                    :key="urutisi" v-if="hitungan_pk == 1">
                                                    <td class="text-center" v-if="isi.m_kolom1 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'kolom1' + dataisiandetail.tahun"
                                                            :name="'kolom1' + dataisiandetail.tahun" placeholder=""
                                                            :value="isi.kolom1" :disabled="isi.m_rumuskolom1 != 'input'"
                                                            @keyup="formattulisrupiah('kolom1' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom1' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_kolom2 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'kolom2' + dataisiandetail.tahun"
                                                            :name="'kolom2' + dataisiandetail.tahun" placeholder=""
                                                            :value="isi.kolom2" :disabled="isi.m_rumuskolom2 != 'input'"
                                                            @keyup="formattulisrupiah('kolom2' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom2' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_kolom3 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'kolom3' + dataisiandetail.tahun"
                                                            :name="'kolom3' + dataisiandetail.tahun" placeholder=""
                                                            :value="isi.kolom3" :disabled="isi.m_rumuskolom3 != 'input'"
                                                            @keyup="formattulisrupiah('kolom3' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom3' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_kolom4 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'kolom4' + dataisiandetail.tahun"
                                                            :name="'kolom4' + dataisiandetail.tahun" placeholder=""
                                                            :value="isi.kolom4" :disabled="isi.m_rumuskolom4 != 'input'"
                                                            @keyup="formattulisrupiah('kolom4' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom4' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_kolom5 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'kolom5' + dataisiandetail.tahun"
                                                            :name="'kolom5' + dataisiandetail.tahun" placeholder=""
                                                            :value="isi.kolom5" :disabled="isi.m_rumuskolom5 != 'input'"
                                                            @keyup="formattulisrupiah('kolom5' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom5' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_isian_kolom != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'isian_kolom' + dataisiandetail.tahun"
                                                            :name="'isian_kolom' + dataisiandetail.tahun" placeholder=""
                                                            :value="isi.isian_kolom"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                </template>
                                                <template v-for="(isi, urutisi) in dataisiandetail.detail"
                                                    :key="urutisi" v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                                    <template v-for="(datajudul, urutjudul) in isi.nilai"
                                                        :key="urutjudul">
                                                        <td class="text-center">
                                                            <input type="text" class="form-control form-control-sm"
                                                                :id="'kolom_' + urutjudul + dataisiandetail.tahun"
                                                                :name="'kolom_' + urutjudul + dataisiandetail.tahun"
                                                                placeholder=""
                                                                :value="G_numFormatKoma(isi.nilai[urutjudul].nilai)"
                                                                :disabled="(!datajudul.rumus.includes('input') && !datajudul.rumus.includes('entry')) || dataisiandetail.tahun != tahunsekarang"
                                                                @keyup="formattulisrupiah('kolom_' + urutjudul + dataisiandetail.tahun)"
                                                                @keydown="formattulisrupiah('kolom_' + urutjudul + dataisiandetail.tahun)"
                                                                style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                        </td>
                                                    </template>
                                                </template>
                                            </tr>
                                        </template>
                                    </table>
                                </div>
                            </div>
                        </div>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <div class="col-sm-12 text-center">
                            <button type="button" class="btn btn-primary btn-sm lebar2 text-white" @click="simpan()">
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
        <div class="modal fade" id="costumModallihat" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Lihat Data</h4>
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
                                <div class="table-responsive table-wrapper" style="font-size: smaller !important;">
                                    <table class="table m-0" id="tabeldata">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">Tahun</th>
                                                <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian"
                                                    v-if="hitungan_pk == 1">
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom1 != ''">{{
                                                        dataisian.m_kolom1 }}</th>
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom2 != ''">{{
                                                        dataisian.m_kolom2 }}</th>
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom3 != ''">{{
                                                        dataisian.m_kolom3 }}</th>
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom4 != ''">{{
                                                        dataisian.m_kolom4 }}</th>
                                                    <th style="width: 50px;" v-if="dataisian.m_kolom5 != ''">
                                                        {{ dataisian.m_kolom5 }}
                                                    </th>
                                                    <th v-if="dataisian.m_isian_kolom != ''" style="width: 250px;">
                                                        {{ dataisian.m_isian_kolom }}
                                                    </th>
                                                </template>
                                                <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian"
                                                    v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                                    <template v-for="(datajudul, urutjudul) in dataisian.kolomkomponen"
                                                        :key="urutjudul">
                                                        <th style="width: 50px;" v-if="datajudul.rumus != ''">
                                                            {{ datajudul.rumus }}
                                                        </th>
                                                    </template>
                                                </template>
                                            </tr>
                                        </thead>
                                        <template v-for="(dataisian, urutisian) in isiandata" :key="urutisian">
                                            <tr>
                                                <td class="text-left levelsubsubkegiatan"
                                                    v-if="hitungan_pk == 1 || hitungan_pk == 2 || hitungan_pk == 3">
                                                    Baseline*
                                                    <input type="hidden" class="form-control form-control-sm"
                                                        :value="dataisian.kode_balai">
                                                </td>
                                                <template v-if="hitungan_pk == 1">
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom1 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            placeholder="Data baseline" :value="dataisian.kolom1"
                                                            @keyup="formattulisrupiah('baselinekolom1')"
                                                            @keydown="formattulisrupiah('baselinekolom1')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom2 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            placeholder="Data baseline" :value="dataisian.kolom2"
                                                            @keyup="formattulisrupiah('baselinekolom2')"
                                                            @keydown="formattulisrupiah('baselinekolom2')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom3 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            placeholder="Data baseline" :value="dataisian.kolom3"
                                                            @keyup="formattulisrupiah('baselinekolom3')"
                                                            @keydown="formattulisrupiah('baselinekolom3')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom4 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            placeholder="Data baseline" :value="dataisian.kolom4"
                                                            @keyup="formattulisrupiah('baselinekolom4')"
                                                            @keydown="formattulisrupiah('baselinekolom4')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_kolom5 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            placeholder="Data baseline" :value="dataisian.kolom5"
                                                            @keyup="formattulisrupiah('baselinekolom5')"
                                                            @keydown="formattulisrupiah('baselinekolom5')" readonly
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center levelsubsubkegiatan"
                                                        v-if="dataisian.m_isian_kolom != ''">
                                                    </td>
                                                </template>
                                                <template v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                                    <template v-for="(dataisian, urutisian) in isiandata"
                                                        :key="urutisian" v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                                        <template
                                                            v-for="(datajudul, urutjudul) in dataisian.masterrumus"
                                                            :key="urutjudul">
                                                            <td class="text-center levelsubsubkegiatan"
                                                                v-if="datajudul.rumus != ''">
                                                                <input type="text" class="form-control form-control-sm"
                                                                    placeholder="Data baseline" disabled value="0"
                                                                    @keyup="formattulisrupiah('baselinerumus_' + urutjudul)"
                                                                    @keydown="formattulisrupiah('baselinerumus_' + urutjudul)"
                                                                    style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                            </td>
                                                        </template>
                                                    </template>
                                                </template>
                                            </tr>
                                        </template>
                                        <template v-for="(dataisiandetail, urutisiandetail) in isiandatadetail"
                                            :key="urutisiandetail">
                                            <tr>
                                                <td class="text-center">
                                                    {{ dataisiandetail.tahun }}
                                                </td>
                                                <template v-for="(isi, urutisi) in dataisiandetail.detail"
                                                    :key="urutisi" v-if="hitungan_pk == 1">
                                                    <td class="text-center" v-if="isi.m_kolom1 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :value="isi.kolom1" disabled
                                                            @keyup="formattulisrupiah('kolom1' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom1' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_kolom2 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :value="isi.kolom2" disabled
                                                            @keyup="formattulisrupiah('kolom2' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom2' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_kolom3 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :value="isi.kolom3" disabled
                                                            @keyup="formattulisrupiah('kolom3' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom3' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_kolom4 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :value="isi.kolom4" disabled
                                                            @keyup="formattulisrupiah('kolom4' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom4' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_kolom5 != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :value="isi.kolom5" disabled
                                                            @keyup="formattulisrupiah('kolom5' + dataisiandetail.tahun)"
                                                            @keydown="formattulisrupiah('kolom5' + dataisiandetail.tahun)"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                    <td class="text-center" v-if="isi.m_isian_kolom != ''">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :value="isi.isian_kolom" disabled
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                    </td>
                                                </template>
                                                <template v-for="(isi, urutisi) in dataisiandetail.detail"
                                                    :key="urutisi" v-if="hitungan_pk == 2 || hitungan_pk == 3">
                                                    <template v-for="(datajudul, urutjudul) in isi.nilai"
                                                        :key="urutjudul">
                                                        <td class="text-center">
                                                            <input type="text" class="form-control form-control-sm"
                                                                placeholder=""
                                                                :value="G_numFormatKoma(isi.nilai[urutjudul].nilai)"
                                                                disabled
                                                                @keyup="formattulisrupiah('kolom_' + urutjudul + dataisiandetail.tahun)"
                                                                @keydown="formattulisrupiah('kolom_' + urutjudul + dataisiandetail.tahun)"
                                                                style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;">
                                                        </td>
                                                    </template>
                                                </template>
                                            </tr>
                                        </template>
                                    </table>
                                </div>
                            </div>
                        </div>
                        </p>
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
        <div class="content-wrapper py-3">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6 wow fadeInDown">
                            <h5>Perjanjian Kinerja Balai</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Perjanjian Kinerja Balai</li>
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
                                                    type="checkbox" id="customCheckboxCapaian" value="optionCapaian"
                                                    checked @click="showCapaian = !showCapaian">
                                                <label for="customCheckboxCapaian" class="custom-control-label">
                                                    Capaian
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <div class="col-sm-12 wow fadeInDown" v-if="datamaster.length > 0">&nbsp;</div>
                        <div class="col-sm-12 wow fadeInDown" v-if="datamaster.length > 0 && ((this.jenis_piusistem != 34) && (this.jenis_piusistem != 36)
                            && (this.jenis_piusistem != 13) && (this.jenis_piusistem != 14) && (this.jenis_piusistem != 26)
                            && (this.jenis_piusistem != 37) && (this.jenis_piusistem != 38) && (this.jenis_piusistem != 42)
                            && (this.jenis_piusistem != 43) && (this.jenis_piusistem != 44))">
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
                                style="font-size: smaller !important;" :disabled="cekverif[0].disabled"
                                @click="proseslanjut(tesverif, cekverif[0].status_ajuan, cekverif[0].dari, cekverif[0].kepada)"
                                v-if="datamaster.length > 0 && cekverif[0].kepada == jenis_piusistem && cekverif[0].sudahsemuasatker.includes('Belum Semua')">
                                <i class="fas fa-angle-double-up"></i>
                                <span
                                    v-if="cekverif[0].sudahsemuasatker.includes('Belum Semua') && cekverif[0].jumlahtotalverifikasi == 1">
                                    Satker Belum Semua Verif 2
                                </span>
                            </button>
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white" id="tombolverif"
                                style="font-size: smaller !important;" :disabled="cekverif[0].disabled"
                                @click="proseslanjut(tesverif, cekverif[0].status_ajuan, cekverif[0].dari, cekverif[0].kepada)"
                                v-if="datamaster.length > 0 && cekverif[0].kepada == jenis_piusistem && cekverif[0].sudahsemuasatker.includes('Sudah Semua')">
                                <i class="fas fa-angle-double-up"></i>
                                <span
                                    v-if="(cekverif[0].status_ajuan.includes('Belum Verifikasi') || cekverif[0].status_ajuan.includes('Revisi')) && cekverif[0].jumlahtotalverifikasi == 1">
                                    Ajukan Verifikasi
                                </span>
                                <span
                                    v-if="cekverif[0].status_ajuan.includes('Pengajuan PK') && cekverif[0].jumlahtotalverifikasi == 1">
                                    Verifikasi PK
                                </span>
                                <span
                                    v-if="cekverif[0].status_ajuan.includes('Selesai') && cekverif[0].jumlahtotalverifikasi == 1">
                                    Verifikasi Selesai
                                </span>
                            </button>

                            <button type="button" class="btn btn-success btn-sm lebar2 text-white" id="tombolverif"
                                style="font-size: smaller !important;" disabled
                                v-if="datamaster.length > 0 && cekverif[0].kepada != jenis_piusistem">
                                <i class="fas fa-angle-double-up"></i>
                                <span v-if="cekverif[0].status_ajuan.includes('Belum Verifikasi')">
                                    Belum Verifikasi
                                </span>
                                <span v-if="cekverif[0].status_ajuan.includes('Revisi')">
                                    Proses Revisi PK
                                </span>
                                <span
                                    v-if="cekverif[0].status_ajuan.includes('Pengajuan PK') && cekverif[0].jumlahtotalverifikasi == 1">
                                    Proses Verifikasi PK
                                </span>
                                <span
                                    v-if="cekverif[0].status_ajuan.includes('Selesai') && cekverif[0].jumlahtotalverifikasi == 1">
                                    Verifikasi Selesai
                                </span>
                            </button>
                        </div>
                        <div class="col-sm-6 text-center wow fadeInDown">
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white" @click="cetakpk()"
                                v-if="datamaster.length > 0" style="font-size: smaller !important;">
                                <i class="fas fa-print"></i>
                                Cetak PK
                            </button>
                        </div>
                        <div class="col-sm-12 text-justify wow fadeInDown"
                            v-if="cekverif.length > 0 && (cekverif[0].hasil_verif == 2 || cekverif[0].hasil_verif == 1) && (leveluser.includes(6))">
                            &nbsp;
                        </div>
                        <div class="col-sm-12 text-justify wow fadeInDown"
                            v-if="cekverif.length > 0 && (cekverif[0].hasil_verif == 2 || cekverif[0].hasil_verif == 1) && (leveluser.includes(6))">
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
                                            <th style="width: 50px;" v-if="showSatuan">TARGET</th>
                                            <th style="width: 50px;" v-if="showCapaian">CAPAIAN</th>
                                        </tr>
                                    </thead>
                                    <template v-for="(datalist, urutlist) in datamaster" :key="urutlist">
                                        <tbody>
                                            <tr>
                                                <td class="text-center" :class="datalist.class" v-if="showOpsi">
                                                    <button type="button"
                                                        v-if="datalist.level == 'ISP' && ((!leveluser.includes(1) && (!leveluser.includes(2))))
                                                            && (jenis_piusistem != 34) && (jenis_piusistem != 36) && (jenis_piusistem != 37) && (jenis_piusistem != 38)
                                                            && (jenis_piusistem != 42) && (jenis_piusistem != 43) && (jenis_piusistem != 44)"
                                                        class="btn btn-primary3 lebar4 btn-sm text-white"
                                                        style="font-size: smaller !important;"
                                                        :disabled="hasilakhir.includes('Selesai') && shortcutinput == '0'"
                                                        @click="prosesdata(datalist.id, datalist.hitungan_pk)"
                                                        data-toggle="tooltip" data-placement="left"
                                                        title="Edit data.."><i class="fas fa-edit"></i>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit
                                                        Data</button>
                                                    <button type="button"
                                                        v-if="(datalist.level == 'ISP') && ((leveluser.includes(1) || (leveluser.includes(2)))
                                                            || (jenis_piusistem == 34) || (jenis_piusistem == 36) || (jenis_piusistem == 37) || (jenis_piusistem == 38)
                                                            || (jenis_piusistem == 42) || (jenis_piusistem == 43) || (jenis_piusistem == 44))"
                                                        class="btn btn-success btn-sm text-white lebar4"
                                                        data-toggle="tooltip" data-placement="left" title="Cek Detail.."
                                                        style="font-size: smaller !important;"
                                                        @click="lihatdetail(datalist.id, datalist.hitungan_pk)">
                                                        <i class="far fa-check-circle"></i>
                                                        <span> Cek Detail</span>
                                                    </button>
                                                </td>
                                                <td :class="datalist.class" v-if="showOpsi" class="text-center">
                                                    <input type="checkbox" :checked="datalist.terpilih == 0"
                                                        :disabled="hasilakhir.includes('Selesai') && shortcutinput == '0'"
                                                        v-if="(datalist.level == 'ISP' || datalist.level == 'SP') && (leveluser.includes(6))"
                                                        :id="'customSwitchAuth' + '_' + datalist.id"
                                                        @click="rubahpilihan('customSwitchAuth' + '_' + datalist.id, datalist.id)">
                                                    <input type="checkbox" :checked="datalist.terpilih == 0"
                                                        v-if="(datalist.level == 'ISP' || datalist.level == 'SP') && (leveluser.includes(1) || leveluser.includes(2)
                                                            || (jenis_piusistem == 34) || (jenis_piusistem == 36) || (jenis_piusistem == 37) || (jenis_piusistem == 38)
                                                            || (jenis_piusistem == 42) || (jenis_piusistem == 43) || (jenis_piusistem == 44))" disabled>
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showTipe">
                                                    {{ datalist.level }}
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showKode">
                                                    {{ datalist.kode }}
                                                </td>
                                                <td :class="datalist.class" v-if="showIndikator">
                                                    {{ datalist.textindikator }}
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showSatuan">
                                                    <span v-if="datalist.level == 'ISP'">{{ datalist.targetkumulatif
                                                        }}</span> <span v-html="datalist.namasatuan"></span>
                                                </td>
                                                <td class="text-left" :class="datalist.class" v-if="showCapaian">
                                                    <span
                                                        v-if="datalist.level == 'ISP' && ((!leveluser.includes(1) && (!leveluser.includes(2))))
                                                            && (jenis_piusistem != 34) && (jenis_piusistem != 36) && (jenis_piusistem != 37) && (jenis_piusistem != 38)
                                                            && (jenis_piusistem != 42) && (jenis_piusistem != 43) && (jenis_piusistem != 44)">
                                                        <input type="text" class="form-control form-control-sm"
                                                            :id="'capaian' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + tempkodebalai"
                                                            :value="datalist.capaian"
                                                            :disabled="hasilakhir == 'Verifikasi Selesai'"
                                                            style="border: solid 1px #778899;height: 20px !important;font-size: 11px !important;"
                                                            @keyup="formattulisrupiah('capaian' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + tempkodebalai)"
                                                            @keydown="formattulisrupiah('capaian' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + tempkodebalai)"
                                                            @change="shortcutinputtarget('capaian' + '|' + datalist.id + '|' + datalist.hitungan_pk + '|' + tempkodebalai)">
                                                    </span>
                                                    <span
                                                        v-if="(datalist.level == 'ISP') && ((leveluser.includes(1) || (leveluser.includes(2)))
                                                            || (jenis_piusistem == 34) || (jenis_piusistem == 36) || (jenis_piusistem == 37) || (jenis_piusistem == 38)
                                                            || (jenis_piusistem == 42) || (jenis_piusistem == 43) || (jenis_piusistem == 44))">
                                                        {{ datalist.capaian }}
                                                    </span>
                                                    <span v-html="datalist.namasatuan"></span>
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
            folder_ttd: process.env.VUE_APP_URL_API + JSON.parse(localStorage.getItem("datatahunaktif")) + '/' + 'ttdpk-Gambar?f=',
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
        async shortcutinputtarget(kode) {
            //alert(kode);
            var tempkode = kode.split('|');
            var kolom = 'capaian';
            var tabel = 'tb_data_pk_balai_akhir';
            var isi = document.getElementById(kode).value;
            var id_indikator = tempkode[1];
            var id_balai = tempkode[3];
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
                        id_balai: id_balai,
                        updateby: JSON.parse(localStorage.getItem("usistem"))
                    }
                    const mainAPI = axios.create({
                        baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    mainAPI.post("shortcutpkbalai-Update", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                console.log(Response.data.message);
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
        proseslanjut(ke, tahap, dari, kepada) {
            if (tahap.includes('Belum Verifikasi') || tahap.includes('Ajukan Verifikasi') || tahap.includes('Pengajuan Revisi')) {
                this.ajukanverif(ke, dari, kepada);
            }
            if (tahap.includes('Pengajuan PK') || tahap.includes('Tahapan Verifikasi')) {
                this.verifpk();
            }
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
                    mainAPI.post("pksatkerakhir-VerifUpdate", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire({
                                    title: "Informasi",
                                    text: "Verifikasi Telah Disimpan..",
                                    icon: "success"
                                }).then(function () {
                                    window.location.reload();
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
            });
            return false;
        },
        loadpdfverifikasi() {
            this.halamanloading = false;
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
        async ajukanverif(ke, dari, kepada) {
            //alert(ke);
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
                        if (this.leveluser.includes(1) || this.leveluser.includes(2)) {
                            if ((this.selectedsatker == temp[0]) && this.selectedsatker == '') {
                                var pelaksana = temp[0];
                            }
                            else {
                                var pelaksana = this.selectedkategorisatker;
                            }
                        }
                        if (this.leveluser.includes(6)) {
                            var pelaksana = this.jenis_piusistem;
                        }
                    }
                    else {
                        if (this.leveluser.includes(1) || this.leveluser.includes(2)) {
                            var pelaksana = this.selectedsatker;
                        }
                        if (this.leveluser.includes(6)) {
                            var pelaksana = this.jenis_piusistem;
                        }

                    }
                    var tempkdsatker = this.selectedkategorisatker.split("]");
                    if (!this.leveluser.includes(6)) {
                        var kode_satker = this.selectedkategorisatker;
                    }
                    else {
                        var kode_satker = this.kdsatkersistem;
                    }
                    //alert(pelaksana);
                    //alert(this.jenis_piusistem);
                    //return;

                    if (dari == 45 || dari == 32) {
                        this.verifsistem = 35;
                        this.verif2sistem = 35;
                    }

                    const data = {
                        dari: this.jenis_piusistem,
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
                    mainAPI.post("pksatkerakhir-AjukanVerif", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire({
                                    title: "Informasi",
                                    text: "Verifikasi Telah Diajukan..",
                                    icon: "success"
                                }).then(function () {
                                    window.location.reload()
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
            });
            return false;
        },
        async verifpk() {
            if (this.secretencData.includes("_")) {
                var temp = this.secretencData.split("_");
                if (this.leveluser.includes(1) || this.leveluser.includes(2)) {
                    if ((this.selectedkategorisatker == temp[0]) && this.selectedkategorisatker == '') {
                        var pelaksana = temp[0];
                    }
                    else {
                        var pelaksana = temp[0];
                    }
                }
            }
            else {
                if (this.leveluser.includes(1) || this.leveluser.includes(2)) {
                    var pelaksana = this.selectedkategorisatker;
                }
            }
            //alert(pelaksana);
            //return;
            this.halamanloading = true;
            var kode_satker = '';
            var jenis_satker = '';
            const mainAPIKODE = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            await mainAPIKODE.get("parastapainnovationkategorisatker-GetByID?random=" + random + "&id=" + pelaksana).then(
                Response => {
                    this.datapesanreff = Response.data.message;
                    if (this.datapesanreff == 'data diketemukan') {
                        kode_satker = Response.data.content.data[0].kdbalai;
                        jenis_satker = Response.data.content.data[0].level_piu;
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

            //alert(kode_satker);
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
            //alert(jenis_satker);
            await mainAPI.get("pksatkerakhir-DataVerif?random=" + random + "&kode_satker=" + kode_satker + "&tahun=" + this.selectedtahun + "&pelaksana=" + jenis_satker).then(
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

                        document.getElementById('iframefileverifikasi').src = "";
                        //alert(process.env.VUE_APP_URL_API+this.tahunku+'/' + foldernya + '?f=' + filenya);
                        document.getElementById('iframefileverifikasi').src = process.env.VUE_APP_URL_API + this.tahunku + '/' + "pkbalaiakhir-cetakPK?kodebalai=" + btoa(pelaksana) + "&tahun=" + btoa(this.selectedtahun) + "&pelaksana=" + btoa(pelaksana);
                        $('#costumModalverifikasi').modal('show');

                    }
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })

        },
        lihatdetail(id, hitungan_pk) {
            this.id = id;
            //alert(this.id);
            this.hitungan_pk = hitungan_pk;
            //alert(this.hitungan_pk);
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            //alert(this.id);
            if (this.hitungan_pk == 1) {
                var random = Math.random();
                mainAPI.get("pkbalaiakhir-GetBaseline?random=" + random + "&tahun=" + this.selectedtahun + "&id=" + this.id + "&kdbalai=" + this.selectedkategorisatker + "&hitungan_pk=" + this.hitungan_pk).then(
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
                        $('#costumModallihat').modal('show');
                        this.halamanloading = false;
                    }
                ).catch(error => {
                    console.log(error);
                    //this.ClearlocalStorage();
                    this.halamanloading = false;
                });
            }
            else {
                var random = Math.random();
                mainAPI.get("pkbalaiakhirhitungan-GetBaseline?random=" + random + "&tahun=" + this.selectedtahun + "&id=" + this.id + "&kdbalai=" + this.selectedkategorisatker + "&hitungan_pk=" + this.hitungan_pk).then(
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
                        $('#costumModallihat').modal('show');
                        this.halamanloading = false;
                    }
                ).catch(error => {
                    console.log(error);
                    //this.ClearlocalStorage();
                    this.halamanloading = false;
                });
            }
        },
        prosesdata(id, hitungan_pk) {
            this.id = id;
            //alert(this.id);
            this.hitungan_pk = hitungan_pk;
            //alert(this.hitungan_pk);
            this.halamanloading = true;
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            //alert(this.id);
            if (this.hitungan_pk == 1) {
                var random = Math.random();
                mainAPI.get("pkbalaiakhir-GetBaseline?random=" + random + "&tahun=" + this.selectedtahun + "&id=" + this.id + "&kdbalai=" + this.selectedkategorisatker + "&hitungan_pk=" + this.hitungan_pk).then(
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
            }
            else {
                var random = Math.random();
                mainAPI.get("pkbalaiakhirhitungan-GetBaseline?random=" + random + "&tahun=" + this.selectedtahun + "&id=" + this.id + "&kdbalai=" + this.selectedkategorisatker + "&hitungan_pk=" + this.hitungan_pk).then(
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
        rubahpilihan(id, kode) {
            var kategorisatker = '';
            if (this.leveluser != 1) {
                kategorisatker = this.secretencData;
            }
            else {
                kategorisatker = this.selectedkategorisatker;
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
                        const data = { kode: kode, isi: '0', kode_satker: kategorisatker, id_satker: kategorisatker, kode_tahun: this.selectedtahun, updateby: JSON.parse(localStorage.getItem("usistem")) }
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        });
                        mainAPI.post("indikatorAkhir-SetActive", data).then(
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
                var kategorisatker = '';
                if (this.leveluser != 1) {
                    kategorisatker = this.secretencData;
                }
                else {
                    kategorisatker = this.selectedkategorisatker;
                }
                const data = { kode: kode, isi: '1', kode_satker: kategorisatker, id_satker: kategorisatker, kode_tahun: this.selectedtahun, updateby: JSON.parse(localStorage.getItem("usistem")) }
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                mainAPI.post("indikatorAkhir-SetActive", data).then(
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
        cetakpk() {
            this.halamanloading = true;
            var kategorisatker = '';
            if ((this.leveluser != 1) && (!this.leveluser.includes(2))) {
                kategorisatker = this.secretencData;
            }
            else {
                kategorisatker = this.selectedkategorisatker;
            }

            document.getElementById('iframefile').src = "";
            //alert(process.env.VUE_APP_URL_API+this.tahunku+'/' + foldernya + '?f=' + filenya);
            if (kategorisatker == 1) {
                document.getElementById('iframefile').src = process.env.VUE_APP_URL_API + this.tahunku + '/' + "pkdirjenakhir-cetakPK?kodebalai=" + btoa(kategorisatker) + "&tahun=" + btoa(this.selectedtahun);
            }
            else {
                document.getElementById('iframefile').src = process.env.VUE_APP_URL_API + this.tahunku + '/' + "pkbalaiakhir-cetakPK?kodebalai=" + btoa(kategorisatker) + "&tahun=" + btoa(this.selectedtahun);
            }
            $('#costumModalcetak').modal('show');
        },
        simpan() {
            //alert(JSON.stringify(this.isiandata));
            var baselinekolom1 = "";
            var baselinekolom2 = "";
            var baselinekolom3 = "";
            var baselinekolom4 = "";
            var baselinekolom5 = "";
            var nilaibaseline = "";
            for (let i = 0; i < this.isiandata.length; i++) {
                //alert(this.isiandata[i].masterrumus.length);
                if (this.hitungan_pk == 2 || this.hitungan_pk == 3) {
                    for (let c = 0; c < this.isiandata[i].masterrumus.length; c++) {
                        try {
                            var bb = document.getElementById('baselinerumus_' + c).value;
                            if (bb == '') {
                                bb = '0';
                            }
                            if (c == 0) {
                                nilaibaseline = nilaibaseline + bb;
                            }
                            else {
                                nilaibaseline = nilaibaseline + "|" + bb;
                            }
                        } catch (error) {
                            if (c == 0) {
                                nilaibaseline = nilaibaseline + '0';
                            }
                            else {
                                nilaibaseline = nilaibaseline + "|" + '0';
                            }

                        }
                    }

                }
                var m_kolom1 = this.isiandata[i].m_rumuskolom1;
                var m_kolom2 = this.isiandata[i].m_rumuskolom2;
                var m_kolom3 = this.isiandata[i].m_rumuskolom3;
                var m_kolom4 = this.isiandata[i].m_rumuskolom4;
                var m_kolom5 = this.isiandata[i].m_rumuskolom5;
                if (this.isiandata[i].m_kolom1 != "") {
                    try {
                        baselinekolom1 = baselinekolom1 + document.getElementById('baselinekolom1').value;
                    } catch (error) {
                        baselinekolom1 = baselinekolom1 + '0';
                    }
                }
                if (this.isiandata[i].m_kolom2 != "") {
                    try {
                        baselinekolom2 = baselinekolom2 + document.getElementById('baselinekolom2').value;
                    } catch (error) {
                        baselinekolom2 = baselinekolom2 + '0';
                    }
                }
                if (this.isiandata[i].m_kolom3 != "") {
                    try {
                        baselinekolom3 = baselinekolom3 + document.getElementById('baselinekolom3').value;
                    } catch (error) {
                        baselinekolom3 = baselinekolom3 + '0';
                    }
                }
                if (this.isiandata[i].m_kolom4 != "") {
                    try {
                        baselinekolom4 = baselinekolom4 + document.getElementById('baselinekolom4').value;
                    } catch (error) {
                        baselinekolom4 = baselinekolom4 + '0';
                    }
                }
                if (this.isiandata[i].m_kolom5 != "") {
                    try {
                        baselinekolom5 = baselinekolom5 + document.getElementById('baselinekolom5').value;
                    } catch (error) {
                        baselinekolom5 = baselinekolom5 + '0';
                    }
                }
            }


            var x = 1;
            var kolom1 = "";
            var kolom2 = "";
            var kolom3 = "";
            var kolom4 = "";
            var kolom5 = "";
            var isian_kolom = "";
            var isinilai = "";
            //alert(this.isiandata[0].kolomkomponen.length);
            var jumlahlooping = 0;
            try {
                jumlahlooping = this.isiandata[0].kolomkomponen.length;
            } catch (error) {

            }

            //alert(this.isiandatadetail.length);
            for (let i = this.tahun_awal; i <= this.tahun_akhir; i++) {
                if (this.hitungan_pk == 2 || this.hitungan_pk == 3) {
                    if (i > this.tahun_awal) {
                        isinilai = isinilai + "?";
                    }
                    for (let m = 0; m < jumlahlooping; m++) {
                        //alert(this.isiandatadetail[m].detail.length);
                        if (m == 0) {
                            try {
                                isinilai = isinilai + document.getElementById('kolom_' + m + '' + i).value;
                            } catch (error) {
                                isinilai = isinilai + "0";
                            }
                        }
                        else {
                            try {
                                isinilai = isinilai + "|" + document.getElementById('kolom_' + m + '' + i).value;
                            } catch (error) {
                                isinilai = isinilai + "|" + "0";
                            }
                        }
                    }

                }
                if (x == 1) {
                    if (m_kolom1 != "") {
                        try {
                            kolom1 = kolom1 + document.getElementById('kolom1' + i).value;
                        } catch (error) {
                            kolom1 = kolom1 + "0";
                        }
                    }
                    if (m_kolom2 != "") {
                        try {
                            kolom2 = kolom2 + document.getElementById('kolom2' + i).value;
                        } catch (error) {
                            kolom2 = kolom2 + "0";
                        }
                    }
                    if (m_kolom3 != "") {
                        try {
                            kolom3 = kolom3 + document.getElementById('kolom3' + i).value;
                        } catch (error) {
                            kolom3 = kolom3 + "0";
                        }
                    }
                    if (m_kolom4 != "") {
                        try {
                            kolom4 = kolom4 + document.getElementById('kolom4' + i).value;
                        } catch (error) {
                            kolom4 = kolom4 + "0";
                        }
                    }
                    if (m_kolom5 != "") {
                        try {
                            kolom5 = kolom5 + document.getElementById('kolom5' + i).value;
                        } catch (error) {
                            kolom5 = kolom5 + "0";
                        }
                    }

                    try {
                        isian_kolom = isian_kolom + document.getElementById('isian_kolom' + i).value;
                    } catch (error) {
                        isian_kolom = isian_kolom + "";
                    }

                }
                else {
                    if (m_kolom1 != "") {
                        try {
                            kolom1 = kolom1 + '|' + document.getElementById('kolom1' + i).value;
                        } catch (error) {
                            kolom1 = kolom1 + '|' + '0';
                        }
                    }
                    if (m_kolom2 != "") {
                        try {
                            kolom2 = kolom2 + '|' + document.getElementById('kolom2' + i).value;
                        } catch (error) {
                            kolom2 = kolom2 + '|' + '0';
                        }
                    }
                    if (m_kolom3 != "") {
                        try {
                            kolom3 = kolom3 + '|' + document.getElementById('kolom3' + i).value;
                        } catch (error) {
                            kolom3 = kolom3 + '|' + '0';
                        }
                    }
                    if (m_kolom4 != "") {
                        try {
                            kolom4 = kolom4 + '|' + document.getElementById('kolom4' + i).value;
                        } catch (error) {
                            kolom4 = kolom4 + '|' + '0';
                        }
                    }
                    if (m_kolom5 != "") {
                        try {
                            kolom5 = kolom5 + '|' + document.getElementById('kolom5' + i).value;
                        } catch (error) {
                            kolom5 = kolom5 + '|' + '0';
                        }
                    }

                    try {
                        isian_kolom = isian_kolom + '|' + document.getElementById('isian_kolom' + i).value;
                    } catch (error) {
                        isian_kolom = isian_kolom + '|' + "";
                    }

                }
                x++;
            }

            if (nilaibaseline == '') {
                nilaibaseline = '0';
            }
            //alert(this.hitungan_pk);
            //alert(isinilai);
            //alert(nilaibaseline);
            //alert(kolom1);
            //alert(kolom2);
            //alert(kolom3);
            //alert(kolom4);
            //alert(kolom5);
            //return;

            var fd = new FormData();
            fd.append("id_indikator", this.id);
            fd.append("id_balai", this.selectedkategorisatker);
            fd.append("kode_tahun", this.selectedtahun);
            fd.append("m_rumuskolom1", m_kolom1);
            fd.append("m_rumuskolom2", m_kolom2);
            fd.append("m_rumuskolom3", m_kolom3);
            fd.append("m_rumuskolom4", m_kolom4);
            fd.append("m_rumuskolom5", m_kolom5);
            fd.append("baselinekolom1", baselinekolom1);
            fd.append("baselinekolom2", baselinekolom2);
            fd.append("baselinekolom3", baselinekolom3);
            fd.append("baselinekolom4", baselinekolom4);
            fd.append("baselinekolom5", baselinekolom5);
            fd.append("tahun_awal", this.tahun_awal);
            fd.append("tahun_akhir", this.tahun_akhir);
            fd.append("kolom1", kolom1);
            fd.append("kolom2", kolom2);
            fd.append("kolom3", kolom3);
            fd.append("kolom4", kolom4);
            fd.append("kolom5", kolom5);
            fd.append("isian_kolom", isian_kolom);
            fd.append("nilaibaseline", nilaibaseline);
            fd.append("isinilai", isinilai);
            fd.append("hitungan_pk", this.hitungan_pk);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            mainAPI.post("pkbalaiakhir-Update", fd).then(
                Response => {
                    var kode = encodeURIComponent(CryptoJS.AES.encrypt(this.selectedkategorisatker + "_" + this.selectedlabelsatker, 'GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2').toString());
                    if (Response.data.response == 'error') {
                        swal.fire('Peringatan', Response.data.message, 'error');
                    }
                    else {
                        swal.fire('Informasi', 'Data telah tersimpan..', 'success').then(function () {
                            window.location.replace("/PerjanjianKinerjaBalaiAkhir/" + kode);
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
            mainAPI.post("pksatkerakhir-SimpanTTD", fd).then(
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
        ubahlokasi(id, kolom, idisian, cek) {
            var isian = document.getElementById(idisian).value;
            var kolom = kolom;
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
                mainAPI.post("pksatkerakhir-LatLongUpdate", data).then(
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
                    mainAPI.post("pksatkerakhir-DeleteTagging", data).then(
                        Response => {
                            if (Response.data.response == 'error') {
                                swal.fire('Peringatan', Response.data.message, 'error');
                            }
                            else {
                                swal.fire('Informasi', 'Data telah dihapus..', 'success').then(function () {
                                    var row = document.getElementById("baris" + id);
                                    if (row) {
                                        row.remove();
                                    }
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
            await mainAPI.get("pksatkerakhir-GetEmon?random=" + random + "&id=" + id + "&kodesatker=" + kodesatker + "&tahun=" + tahun + "&kodekegiatan=" + kodekegiatan).then(
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
            await mainAPIData.get("parastapainnovationreff-GetKategoriSatker?random=" + random + "&kdbalai=" + id).then(
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
            await mainAPI.get("parastapainnovationreff-GetKategoriSatker?random=" + random + "&kdbalai=" + id).then(
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
            //alert(kategorisatker);
            this.tempkodebalai = kategorisatker;
            await mainAPI.get("pkbalaiakhir-GetData?random=" + random + "&tahun=" + this.selectedtahun + "&kodebalai=" + kategorisatker).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datamaster = [];
                        this.datamaster = Response.data.content.data;
                        this.cekverif = [];
                        this.cekverif = Response.data.content.verif;
                        this.shortcutinput = '0';
                        this.shortcutinput = Response.data.content.shortcutinput;
                        this.pk_aktif = '3';
                        this.pk_aktif = Response.data.content.pk_aktif;
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
                            this.pk_aktif = '3';
                            this.shortcutinput = '0';
                            this.tesverif = 1;
                            this.disablednya = false;
                            this.hasilakhir = '';
                        }
                    }
                    else {
                        this.ttd = '0';
                        this.pk_aktif = '3';
                        this.shortcutinput = '0';
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
            await mainAPI.get("pkbalaiakhir-GetTTD?random=" + random + "&kode_satker=" + kategorisatker).then(
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
                        this.level_pejabat = 'Balai';
                        this.kode_satker_pejabat = kategorisatker;
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
    },
    mounted() {
        this.getOtentifikasi();
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