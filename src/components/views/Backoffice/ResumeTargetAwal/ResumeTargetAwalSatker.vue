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
        <div class="modal fade" id="costumModalopsihitungan1" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Detail Data {{ textindikator }}, {{ nama_balai }}, {{
                            nama_satker }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row px-3">
                            <div class="col-sm-12 text-center">
                                <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                    @click="eksportdetailhitungan1('_DetailIndikator_')"
                                    style="font-size: smaller !important;">
                                    <i class="fas fa-file-excel"></i>
                                    Eksport Excel
                                </button>
                            </div>
                            <div class="col-sm-12 text-center">&nbsp;</div>
                            <div class="col-sm-12">
                                <div class="table-responsive table-wrapper">
                                    <table class="table m-0" id="tabeldata" style="font-size: x-small;">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">Kode</th>
                                                <th style="width: 450px;">Paket Emon</th>
                                                <th style="width: 100px;">Pagu</th>
                                                <th style="width: 100px;">Volume<br>Satuan</th>
                                                <th style="width: 70px;">Target / Output<br>(<span
                                                        v-html="namaoutput"></span>)</th>
                                                <th style="width: 70px;">Outcome<br>(<span v-html="namaoutcome"></span>)
                                                </th>
                                                <th style="width: 70px;">Capaian Target / Output<br>(<span
                                                        v-html="namaoutput"></span>)</th>
                                                <th style="width: 70px;">Capaian Outcome<br>(<span
                                                        v-html="namaoutcome"></span>)</th>
                                            </tr>
                                        </thead>
                                        <template v-for="(datalist, urutlist) in datadetail" :key="urutlist">
                                            <tbody>
                                                <tr>
                                                    <td class="levelsubkegiatan" colspan="4">
                                                        {{ datalist.textindikator }} {{ datalist.satker }}
                                                    </td>
                                                    <td class="levelsubkegiatan text-right">
                                                        {{ datalist.volume }}
                                                    </td>
                                                    <td class="levelsubkegiatan text-right">
                                                        {{ datalist.target }}
                                                    </td>
                                                    <td class="levelsubkegiatan text-right">
                                                        {{ datalist.capaian }}
                                                    </td>
                                                    <td class="levelsubkegiatan text-right">
                                                        {{ datalist.capaian_outcome }}
                                                    </td>
                                                </tr>
                                                <template v-for="(dataemon, urutemon) in datalist.emon" :key="urutemon">
                                                    <tr>
                                                        <td>
                                                            {{ dataemon.kode }}
                                                        </td>
                                                        <td>
                                                            {{ dataemon.nmpaket }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ G_numFormat(dataemon.pgrupiah) }}
                                                        </td>
                                                        <td class="text-center">
                                                            {{ dataemon.vol }} {{ dataemon.sat }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ dataemon.outcome }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ dataemon.target }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ dataemon.capaian }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ dataemon.capaian_outcome }}
                                                        </td>
                                                    </tr>
                                                </template>
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
                            <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="costumModalopsihitungan2" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
            aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
            style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Detail Data {{ textindikator }}, {{ nama_balai }}, {{
                            nama_satker }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row px-3">
                            <div class="col-sm-12 text-center">
                                <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                    @click="eksportdetailhitungan2('_DetailIndikator_')"
                                    style="font-size: smaller !important;">
                                    <i class="fas fa-file-excel"></i>
                                    Eksport Excel
                                </button>
                            </div>
                            <div class="col-sm-12 text-center">&nbsp;</div>
                            <div class="col-sm-12">
                                <div class="table-responsive table-wrapper">
                                    <table class="table m-0" id="tabeldata" style="font-size: x-small;">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">Kode</th>
                                                <th style="width: 450px;">Paket Emon</th>
                                                <th style="width: 100px;">Pagu</th>
                                                <th style="width: 100px;">Volume<br>Satuan</th>
                                                <template v-for="(datalist, urutlist) in datadetail" :key="urutlist">
                                                    <template v-for="(dataheader, urutheader) in datalist.header"
                                                        :key="urutheader">
                                                        <th style="width: 70px;">
                                                            {{ dataheader.header }}
                                                        </th>
                                                    </template>
                                                </template>
                                                <th style="width: 70px;">Capaian</th>
                                            </tr>
                                        </thead>
                                        <template v-for="(datalist, urutlist) in datadetail" :key="urutlist">
                                            <tbody>
                                                <tr>
                                                    <td class="levelsubkegiatan" colspan="4">
                                                        {{ datalist.textindikator }} {{ datalist.satker }}
                                                    </td>
                                                    <template
                                                        v-for="(dataisiannilai, urutisiannilai) in datalist.isiannilai"
                                                        :key="urutisiannilai">
                                                        <td class="levelsubkegiatan text-right">
                                                            {{ dataisiannilai.isiannilai }}
                                                        </td>
                                                    </template>
                                                    <td class="levelsubkegiatan text-right">
                                                        {{ datalist.capaian }}
                                                    </td>
                                                </tr>
                                                <template v-for="(dataemon, urutemon) in datalist.emon" :key="urutemon">
                                                    <tr>
                                                        <td>
                                                            {{ dataemon.kode }}
                                                        </td>
                                                        <td>
                                                            {{ dataemon.nmpaket }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ G_numFormat(dataemon.pgrupiah) }}
                                                        </td>
                                                        <td class="text-center">
                                                            {{ dataemon.vol }} {{ dataemon.sat }}
                                                        </td>
                                                        <template v-for="(datanilai, urutnilai) in dataemon.nilai"
                                                            :key="urutnilai">
                                                            <td class="text-right">
                                                                {{ datanilai.nilai }}
                                                            </td>
                                                        </template>
                                                        <td class="text-right">
                                                            {{ dataemon.capaian }}
                                                        </td>
                                                    </tr>
                                                </template>
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
                            <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="costumModalindikatorhitungan1" data-easein="flipBounceYIn" tabindex="-1"
            role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static"
            data-keyboard="false" style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Detail Data</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row px-3">
                            <div class="col-sm-12 text-center">
                                <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                    @click="eksportdetailindikator1('_DetailIndikator_')"
                                    style="font-size: smaller !important;">
                                    <i class="fas fa-file-excel"></i>
                                    Eksport Excel
                                </button>
                            </div>
                            <div class="col-sm-12 text-center">&nbsp;</div>
                            <div class="col-sm-12">
                                <div class="table-responsive table-wrapper">
                                    <table class="table m-0" id="tabeldata" style="font-size: x-small;">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">Kode</th>
                                                <th style="width: 450px;">Paket Emon</th>
                                                <th style="width: 100px;">Pagu</th>
                                                <th style="width: 100px;">Volume<br>Satuan</th>
                                                <th style="width: 70px;">Target / Output<br>(<span
                                                        v-html="namaoutput"></span>)
                                                </th>
                                                <th style="width: 70px;">Outcome<br>(<span v-html="namaoutcome"></span>)
                                                </th>
                                                <th style="width: 70px;">Capaian Target / Output<br>(<span
                                                        v-html="namaoutput"></span>)</th>
                                                <th style="width: 70px;">Capaian Outcome<br>(<span
                                                        v-html="namaoutcome"></span>)
                                                </th>
                                            </tr>
                                        </thead>
                                        <template v-for="(datalist, urutlist) in datadetail" :key="urutlist">
                                            <tbody>
                                                <template v-for="(dataemon, urutemon) in datalist.emon" :key="urutemon">
                                                    <tr>
                                                        <td>
                                                            {{ dataemon.kode }}
                                                        </td>
                                                        <td>
                                                            {{ dataemon.nmpaket }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ G_numFormat(dataemon.pgrupiah) }}
                                                        </td>
                                                        <td class="text-center">
                                                            {{ dataemon.vol }} {{ dataemon.sat }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ dataemon.outcome }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ dataemon.target }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ dataemon.capaian }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ dataemon.capaian_outcome }}
                                                        </td>
                                                    </tr>
                                                </template>
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
                            <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal">
                                <i class="far fa-times-circle"></i>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="costumModalindikatorhitungan2" data-easein="flipBounceYIn" tabindex="-1"
            role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static"
            data-keyboard="false" style="background: rgba(240, 248, 255, 0.1);">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Detail Data</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-justify">
                        <p>
                        <div class="row px-3">
                            <div class="col-sm-12 text-center">
                                <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                    @click="eksportdetailindikator2('_DetailIndikator_')"
                                    style="font-size: smaller !important;">
                                    <i class="fas fa-file-excel"></i>
                                    Eksport Excel
                                </button>
                            </div>
                            <div class="col-sm-12 text-center">&nbsp;</div>
                            <div class="col-sm-12">
                                <div class="table-responsive table-wrapper">
                                    <table class="table m-0" id="tabeldata" style="font-size: x-small;">
                                        <thead>
                                            <tr>
                                                <th style="width: 50px;">Kode</th>
                                                <th style="width: 450px;">Paket Emon</th>
                                                <th style="width: 100px;">Pagu</th>
                                                <th style="width: 100px;">Volume<br>Satuan</th>
                                                <template v-for="(datalist, urutlist) in datadetail" :key="urutlist">
                                                    <template v-for="(dataheader, urutheader) in datalist.header"
                                                        :key="urutheader">
                                                        <th style="width: 70px;">
                                                            {{ dataheader.header }}
                                                        </th>
                                                    </template>
                                                </template>
                                                <th style="width: 70px;">Capaian</th>
                                            </tr>
                                        </thead>
                                        <template v-for="(datalist, urutlist) in datadetail" :key="urutlist">
                                            <tbody>
                                                <template v-for="(dataemon, urutemon) in datalist.emon" :key="urutemon">
                                                    <tr>
                                                        <td>
                                                            {{ dataemon.kode }}
                                                        </td>
                                                        <td>
                                                            {{ dataemon.nmpaket }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ G_numFormat(dataemon.pgrupiah) }}
                                                        </td>
                                                        <td class="text-center">
                                                            {{ dataemon.vol }} {{ dataemon.sat }}
                                                        </td>
                                                        <template v-for="(datanilai, urutnilai) in dataemon.nilai"
                                                            :key="urutnilai">
                                                            <td class="text-right">
                                                                {{ datanilai.nilai }}
                                                            </td>
                                                        </template>
                                                        <td class="text-right">
                                                            {{ dataemon.capaian }}
                                                        </td>
                                                    </tr>
                                                </template>
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
                            <h5>Resume Target PK Awal</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Beranda </a></li>
                                <li class="breadcrumb-item active">Resume Target PK Awal</li>
                            </ol>
                        </div>
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
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
                        <div class="col-sm-12 wow fadeInDown">
                            <label>Kata Kunci Pencarian</label>
                            <input type="text" v-model="carikata" class="form-control form-control-sm"
                                placeholder="Masukkan Kata Kunci Pencarian">
                        </div>
                        <div class="col-sm-12 wow fadeInDown">&nbsp;</div>
                        <div class="col-sm-12 text-center wow fadeInDown">
                            <button type="button" class="btn btn-warning btn-sm lebar2 text-white" @click="ambildata()"
                                style="font-size: smaller !important;">
                                <i class="fas fa-search"></i>
                                Lihat Data
                            </button>
                            <button type="button" class="btn btn-success btn-sm lebar2 text-white"
                                @click="eksportresumepk('_ResumeIndikator_')" style="font-size: smaller !important;">
                                <i class="fas fa-file-excel"></i>
                                Eksport Excel
                            </button>
                        </div>
                        <div class="col-sm-12 wow fadeInDown">&nbsp;</div>
                        <div class="col-sm-12 wow fadeInDown">
                            <div class="table-responsive table-wrapper">
                                <table class="table m-0" id="tabeldata" style="font-size: x-small;">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;" v-if="showTipe" rowspan="3">NO</th>
                                            <th style="width: 50px;" v-if="showKodeUnique" rowspan="3">KODE</th>
                                            <th style="width: 550px;" v-if="showIndikator" rowspan="3">UNIT ORGANISASI /
                                                SASARAN
                                                STRATEGIS / PROGRAM / SASARAN
                                                PROGRAM / INDIKATOR SASARAN PROGRAM / KEGIATAN / SASARAN KEGIATAN /
                                                INDIKATOR
                                                SASARAN KEGIATAN / KRO / RO
                                            </th>
                                            <th style="width: 150px;" v-if="showOuput" colspan="2">OUTPUT</th>
                                            <th style="width: 150px;" v-if="showOutcome" colspan="2">OUTCOME</th>
                                        </tr>
                                        <tr>
                                            <th colspan="2">
                                                Target
                                            </th>
                                            <th colspan="2">
                                                Target
                                            </th>
                                        </tr>
                                        <tr>
                                            <th style="width: 60px;">
                                                Volume
                                            </th>
                                            <th style="width: 60px;">
                                                Satuan
                                            </th>
                                            <th style="width: 60px;">
                                                Volume
                                            </th>
                                            <th style="width: 60px;">
                                                Satuan
                                            </th>
                                        </tr>
                                    </thead>
                                    <template v-for="(datalist, urutlist) in filteredKataData" :key="urutlist">
                                        <tbody>
                                            <tr>
                                                <td class="text-center" :class="datalist.class" v-if="showTipe">
                                                    {{ urutlist + 1 }}
                                                </td>
                                                <td class="text-center" :class="datalist.class" v-if="showKodeUnique">
                                                    <a href="javascript:void(0)" data-toggle="tooltip"
                                                        v-if="datalist.kode_unique.includes('IKSK')"
                                                        data-placement="left" title="Lihat Detail.."
                                                        @click="bukadetailindikator(datalist.id, datalist.hitungan_pk, datalist.namasatuan, datalist.namaoutput, datalist.namaoutcome,)">
                                                        {{ datalist.kode_unique }}
                                                    </a>
                                                    <span v-else>
                                                        {{ datalist.kode_unique }}
                                                    </span>
                                                </td>
                                                <td :class="datalist.class" v-if="showIndikator" colspan="5">
                                                    <a href="javascript:void(0)" data-toggle="tooltip"
                                                        v-if="datalist.kode_unique.includes('IKSK')"
                                                        data-placement="left" title="Lihat Detail.."
                                                        @click="bukadetailindikator(datalist.id, datalist.hitungan_pk, datalist.namasatuan, datalist.namaoutput, datalist.namaoutcome,)">
                                                        {{ datalist.textindikator }}
                                                    </a>
                                                    <span v-else>
                                                        {{ datalist.textindikator }}
                                                    </span>
                                                </td>
                                            </tr>
                                            <template v-if="datalist.level = 'IKSK'"
                                                v-for="(databalai, urutbalai) in datalist.balai" :key="urutbalai">
                                                <tr>
                                                    <td class="levelbalai text-center">
                                                        {{ urutbalai + 1 }}
                                                    </td>
                                                    <td colspan="6" class="levelbalai">
                                                        {{ databalai.balai }}
                                                    </td>
                                                </tr>
                                                <template v-if="datalist.level = 'IKSK'"
                                                    v-for="(datasatker, urutsatker) in databalai.satker"
                                                    :key="urutsatker">
                                                    <tr>
                                                        <td class="text-center">
                                                            {{ urutbalai + 1 }}.{{ urutsatker + 1 }}
                                                        </td>
                                                        <td colspan="2">
                                                            <a href="javascript:void(0)" data-toggle="tooltip"
                                                                data-placement="left" title="Lihat Detail.."
                                                                @click="bukadetail(datalist.id, datalist.namasatuan, datalist.namaoutput, datalist.namaoutcome, datalist.hitungan_pk, datalist.textindikator, datalist.jumlahkomponen, datalist.kolomkomponen, datalist.bobotkomponen, datalist.rumuskomponen, datasatker.kode_satker, datasatker.satker, databalai.balai)">
                                                                {{ datasatker.satker }}
                                                            </a>
                                                        </td>
                                                        <td class="text-center" v-if="showOuput">
                                                            <span v-if="datalist.hitungan_pk == 1">
                                                                {{ datasatker.volume }}
                                                            </span>
                                                            <span v-else>
                                                                {{ datasatker.nilai }}
                                                            </span>
                                                        </td>
                                                        <td class="text-center" v-if="showOuput">
                                                            <span v-html="datalist.namaoutput"></span>
                                                        </td>
                                                        <td class="text-center" v-if="showOutcome">
                                                            <span v-if="datalist.hitungan_pk == 1">
                                                                {{ datasatker.target }}
                                                            </span>
                                                            <span v-else>
                                                                {{ datasatker.nilai }}
                                                            </span>
                                                        </td>
                                                        <td class="text-center" v-if="showOutcome">
                                                            <span v-html="datalist.namaoutcome"></span>
                                                        </td>
                                                    </tr>
                                                    <template v-if="datalist.level = 'IKSK'"
                                                        v-for="(dataemon, urutemon) in datasatker.emon" :key="urutemon">
                                                        <tr>
                                                            <td class="text-center">
                                                                {{ dataemon.kode_emon }}
                                                            </td>
                                                            <td colspan="2">
                                                                {{ dataemon.nmpaket }}
                                                            </td>
                                                            <td class="text-center" v-if="showOuput">
                                                                {{ dataemon.target }}
                                                            </td>
                                                            <td class="text-center" v-if="showOuput">
                                                                <span v-html="datalist.namaoutput"></span>
                                                            </td>
                                                            <td class="text-center" v-if="showOutcome">
                                                                {{ dataemon.outcome }}
                                                            </td>
                                                            <td class="text-center" v-if="showOutcome">
                                                                <span v-html="datalist.namaoutcome"></span>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </template>
                                            </template>
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
        Footer, NavBar, Menu, vSelect, swal
    },
    data() {
        return {
            halamanloading: true,
            showOpsi: true,
            showTipe: true,
            showKode: true,
            showKodeUnique: true,
            showIndikator: true,
            showSatuan: true,
            showOuput: true,
            showOutcome: true,
            showPelaksana: true,
            showRumus: true,
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
            mode: '',
            kode: '',
            kode_unique: '',
            opsi: '',
            id: '',
            parent: '',
            level: '',
            nama: '',
            urut: 1,
            tahun: new Date().getFullYear(),
            kdunor: [],
            datakdunor: [],
            defaultSelectedkdunor: {
                code: 0,
                label: 'Semua Data',
                tag: '',
            },
            selectedkdunor: '',

            kategorisatker: [],
            datakategorisatker: [],
            defaultSelectedkategorisatker: {
                code: 0,
                label: 'Semua Data',
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

            cetak: [],
            datacetak: [],
            defaultSelectedcetak: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedcetak: '',
            paramselectedcetak: [],
            paramselectedcetakcode: [],
            paramselectedcetaklabel: [],
            arraynamacetak: [],

            verif: [],
            dataverif: [],
            defaultSelectedverif: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedverif: '',
            paramselectedverif: [],
            paramselectedverifcode: [],
            paramselectedveriflabel: [],
            arraynamaverif: [],

            verif2: [],
            dataverif2: [],
            defaultSelectedverif2: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedverif2: '',
            paramselectedverif2: [],
            paramselectedverif2code: [],
            paramselectedverif2label: [],
            arraynamaverif2: [],

            isSelectDisabled: true,

            hitungan_pk: [],
            datahitungan_pk: [],
            defaultSelectedhitungan_pk: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedhitungan_pk: '',
            kolom1: '',
            kolom2: '',
            kolom3: '',
            kolom4: '',
            kolom5: '',
            rumuskolom1: '',
            rumuskolom2: '',
            rumuskolom3: '',
            rumuskolom4: '',
            rumuskolom5: '',
            isian_kolom: '',
            jumlahkomponen: 0,
            tmpjumlahkomponen: 0,
            kolomkomponen: '',
            bobotkomponen: '',
            rumuskomponen: '',
            validasikomponen: [],
            validasi: false,
            belakangkoma: 2,
            satker: [],
            datasatker: [],
            defaultSelectedsatker: {
                code: 0,
                label: 'Semua Data',
                tag: '0',
            },
            selectedsatker: '',
            selectedlabelsatker: '',
            id: '',
            namasatuan: '',
            namaoutput: '',
            namaoutcome: '',
            hitungan_pk: '',
            textindikator: '',
            jumlahkomponen: '',
            kolomkomponen: '',
            bobotkomponen: '',
            rumuskomponen: '',
            kode_satker: '',
            nama_satker: '',
            nama_balai: '',
            datadetail: [],
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
        bukadetailindikator(id, hitungan_pk, namasatuan, namaoutput, namaoutcome) {
            this.id = id;
            this.hitungan_pk = hitungan_pk;
            this.namasatuan = namasatuan;
            this.namaoutput = namaoutput;
            this.namaoutcome = namaoutcome;
            //alert(id);
            //alert(this.selectedkategorisatker);
            var tempkdsatker = this.selectedlabelsatker.split("]");
            var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
            if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                var kode_satker = tempkodesatker.trim();
            }
            else {
                var kode_satker = this.kdsatkersistem;
            }
            //alert(kode_satker);
            if (this.hitungan_pk == 1) {
                const mainAPI2 = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                this.halamanloading = true;
                var random = Math.random();
                mainAPI2.get("DetailIndikatorPKAwal-HitunganTarget?random=" + random + "&id_indikator=" + this.id + "&kode_satker=" + kode_satker + "&kategorisatker=" + this.selectedkategorisatker).then(
                    Response => {
                        this.datapesan = Response.data.message;
                        if (this.datapesan == 'data diketemukan') {
                            this.datadetail = [];
                            this.datadetail = Response.data.content.data;
                            $('#costumModalindikatorhitungan1').modal('show');
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
                const mainAPI2 = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                this.halamanloading = true;
                var random = Math.random();
                mainAPI2.get("DetailIndikatorPKAwal-HitunganSubKomponen?random=" + random + "&id_indikator=" + this.id + "&kode_satker=" + kode_satker + "&kategorisatker=" + this.selectedkategorisatker).then(
                    Response => {
                        this.datapesan = Response.data.message;
                        if (this.datapesan == 'data diketemukan') {
                            this.datadetail = [];
                            this.datadetail = Response.data.content.data;
                            $('#costumModalindikatorhitungan2').modal('show');
                        }
                        this.halamanloading = false;
                    }
                ).catch(error => {
                    swal.fire('Peringatan', error, 'error');
                    this.halamanloading = false;
                    return false;
                })
            }
        },
        bukadetail(id, namasatuan, namaoutput, namaoutcome, hitungan_pk, textindikator, jumlahkomponen, kolomkomponen, bobotkomponen, rumuskomponen, kode_satker, nama_satker, nama_balai) {
            this.id = id;
            this.namasatuan = namasatuan;
            this.namaoutput = namaoutput;
            this.namaoutcome = namaoutcome;
            this.hitungan_pk = hitungan_pk;
            this.textindikator = textindikator;
            this.jumlahkomponen = jumlahkomponen;
            this.kolomkomponen = kolomkomponen;
            this.bobotkomponen = bobotkomponen;
            this.rumuskomponen = rumuskomponen;
            this.kode_satker = kode_satker;
            this.nama_satker = nama_satker;
            this.nama_balai = nama_balai;

            if (this.hitungan_pk == 1) {
                const mainAPI2 = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                this.halamanloading = true;
                var random = Math.random();
                mainAPI2.get("DetailDataAkhirPKAwal-HitunganTarget?random=" + random + "&id_indikator=" + this.id + "&kode_satker=" + this.kode_satker).then(
                    Response => {
                        this.datapesan = Response.data.message;
                        if (this.datapesan == 'data diketemukan') {
                            this.datadetail = [];
                            this.datadetail = Response.data.content.data;
                            $('#costumModalopsihitungan1').modal('show');
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
                const mainAPI2 = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                this.halamanloading = true;
                var random = Math.random();
                mainAPI2.get("DetailDataAkhirPKAwal-HitunganSubKomponen?random=" + random + "&id_indikator=" + this.id + "&kode_satker=" + this.kode_satker).then(
                    Response => {
                        this.datapesan = Response.data.message;
                        if (this.datapesan == 'data diketemukan') {
                            this.datadetail = [];
                            this.datadetail = Response.data.content.data;
                            $('#costumModalopsihitungan2').modal('show');
                        }
                        this.halamanloading = false;
                    }
                ).catch(error => {
                    swal.fire('Peringatan', error, 'error');
                    this.halamanloading = false;
                    return false;
                })
            }
        },
        async eksportdetailindikator1(namefile) {
            this.halamanloading = true;
            var tempkdsatker = this.selectedlabelsatker.split("]");
            var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
            if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                var kode_satker = tempkodesatker.trim();
            }
            else {
                var kode_satker = this.kdsatkersistem;
            }
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
            paramurl = "EksportExcelIndikatorPKAwal-Hitungan?random=" + random + "&id_indikator=" + this.id + "&kode_satker=" + kode_satker + "&kategorisatker=" + this.selectedkategorisatker;
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
        async eksportdetailindikator2(namefile) {
            this.halamanloading = true;
            var tempkdsatker = this.selectedlabelsatker.split("]");
            var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
            if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                var kode_satker = tempkodesatker.trim();
            }
            else {
                var kode_satker = this.kdsatkersistem;
            }
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
            paramurl = "EksportExcelIndikatorPKAwal-Detail2?random=" + random + "&id_indikator=" + this.id + "&kode_satker=" + kode_satker + "&kategorisatker=" + this.selectedkategorisatker;
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
        async eksportresumepk(namefile) {
            if (this.filteredKataData.length == 0) {
                swal.fire('Informasi', 'Silahkan klik lihat data terlebih dahulu', 'warning');
                return false;
            }
            if (this.selectedkategorisatker == '' || this.selectedsatker == '') {
                swal.fire({
                    title: "Konfirmasi",
                    text: "Export seluruh data membutuhkan waktu untuk perhitungan dan membuat file excel, yakin pilih seluruh data??",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Batal",
                    confirmButtonColor: "#003d68",
                    cancelButtonColor: "#ffaa05",
                    confirmButtonText: "Yakin"
                }).then((result) => {
                    if (result.isConfirmed) {
                        var tempkdsatker = this.selectedlabelsatker.split("]");
                        var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
                        if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                            var kode_satker = tempkodesatker.trim();
                        }
                        else {
                            var kode_satker = this.kdsatkersistem;
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
                        paramurl = "EksportExcelPKAwal-Satker?random=" + random + "&tahun=" + this.selectedtahun + "&kategorisatker=" + this.selectedkategorisatker + "&kode_satker=" + kode_satker;
                        mainAPI5.get(paramurl).then(
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
                                swal.fire('Informasi', 'Silahkan tunggu file excel terunduh', 'warning');
                            }
                        ).catch(error => {
                            swal.fire('Peringatan', 'Export gagal: ' + error, 'error');
                            // this.ClearlocalStorage();
                            console.log(error);
                            this.halamanloading = false;
                        });
                    }
                });
                return false;
            }
            else {
                var tempkdsatker = this.selectedlabelsatker.split("]");
                var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
                if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                    var kode_satker = tempkodesatker.trim();
                }
                else {
                    var kode_satker = this.kdsatkersistem;
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
                paramurl = "EksportExcelPKAwal-Satker?random=" + random + "&tahun=" + this.selectedtahun + "&kategorisatker=" + this.selectedkategorisatker + "&kode_satker=" + kode_satker;
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
            }
        },
        async eksportdetailhitungan2(namefile) {
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
            paramurl = "EksportExcelPKAwal-Detail2?random=" + random + "&id_indikator=" + this.id + "&kode_satker=" + this.kode_satker;
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
        async eksportdetailhitungan1(namefile) {
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
            paramurl = "EksportExcelPKAwal-Hitungan?random=" + random + "&id_indikator=" + this.id + "&kode_satker=" + this.kode_satker;
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
        onkdunorChange(a) {
            try {
                this.selectedkdunor = this.kdunor[a].tag;
            }
            catch (err) {
                return;
            }

            this.defaultSelectedkategorisatker = {
                code: 0,
                label: 'Semua Data',
                tag: '',
            };
            this.selectedkategorisatker = '';
            this.AmbilDatakategorisatker();
            this.defaultSelectedsatker = {
                code: 0,
                label: 'Semua Data',
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
                label: 'Semua Data',
                tag: '0',
            };
            this.selectedsatker = '';
            this.selectedlabelsatker = 'Semua Data';
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
            //alert(this.selectedlabelsatker);

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
                            label: 'Semua Data',
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
            await mainAPI2.get("parastapainnovationsatker-NonDirjen?random=" + random + "&kdunor=" + this.selectedkdunor + "&kategorisatker=" + this.selectedkategorisatker).then(
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
                            label: 'Semua Data',
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
                            label: 'Semua Data',
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

                        this.datacetak = [];
                        this.cetak = [];
                        this.datacetak = Response.data.content.data;
                        this.datacetak.forEach((item) => {
                            this.cetak.push({
                                label: item.nama,
                                code: this.datacetak.indexOf(item),
                                tag: item.id,
                            });
                        });

                        this.dataverif = [];
                        this.verif = [];
                        this.dataverif = Response.data.content.data;
                        this.dataverif.forEach((item) => {
                            this.verif.push({
                                label: item.nama,
                                code: this.dataverif.indexOf(item),
                                tag: item.id,
                            });
                        });

                        this.dataverif2 = [];
                        this.verif2 = [];
                        this.dataverif2 = Response.data.content.data;
                        this.dataverif2.forEach((item) => {
                            this.verif2.push({
                                label: item.nama,
                                code: this.dataverif2.indexOf(item),
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
                            label: 'Semua Data',
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
            await mainAPIData.get("parastapainnovationsatker-NonDirjen?random=" + random + "&kategorisatker=" + pilihkategorisatker + "&cantekbalai=" + this.jenis_piusistem).then(
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
                            label: 'Semua Data',
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
            if (this.selectedkategorisatker == '' && this.selectedsatker == '') {
                swal.fire({
                    title: "Konfirmasi",
                    text: "Load seluruh data membutuhkan waktu untuk perhitungan, yakin pilih seluruh data??",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Batal",
                    confirmButtonColor: "#003d68",
                    cancelButtonColor: "#ffaa05",
                    confirmButtonText: "Yakin"
                }).then((result) => {
                    if (result.isConfirmed) {
                        var tempkdsatker = this.selectedlabelsatker.split("]");
                        var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
                        if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                            var kode_satker = tempkodesatker.trim();
                        }
                        else {
                            var kode_satker = this.kdsatkersistem;
                        }
                        this.halamanloading = true;
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                            },
                        });
                        var random = Math.random();
                        mainAPI.get("DataAkhirPKAwal-Satker?random=" + random + "&tahun=" + this.selectedtahun + "&kategorisatker=" + this.selectedkategorisatker + "&kode_satker=" + kode_satker).then(
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
                            this.ClearlocalStorage();
                            this.halamanloading = false;
                        });
                    }
                });
                return false;
            }
            else {
                var tempkdsatker = this.selectedlabelsatker.split("]");
                var tempkodesatker = tempkdsatker[0].replaceAll("[", "");
                if (this.leveluser != 7 && !this.leveluser.includes(3) && !this.leveluser.includes(4) && !this.leveluser.includes(9) && !this.leveluser.includes(8)) {
                    var kode_satker = tempkodesatker.trim();
                }
                else {
                    var kode_satker = this.kdsatkersistem;
                }
                this.halamanloading = true;
                const mainAPI = axios.create({
                    baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                    },
                });
                var random = Math.random();
                await mainAPI.get("DataAkhirPKAwal-Satker?random=" + random + "&tahun=" + this.selectedtahun + "&kategorisatker=" + this.selectedkategorisatker + "&kode_satker=" + kode_satker).then(
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
                    this.ClearlocalStorage();
                    this.halamanloading = false;
                });
            }
        },
    },
    mounted() {
        this.getOtentifikasi();
        this.AmbilDataReff();
        //this.ambildata();
    }
}
</script>
<style></style>