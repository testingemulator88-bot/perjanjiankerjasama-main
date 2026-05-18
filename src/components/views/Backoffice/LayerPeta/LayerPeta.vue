<template>
    <div class="modal fade" id="costumModalLegendaData" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
        aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
        style="background: rgba(240, 248, 255, 0.1);">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Pengaturan Legenda Peta</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-justify">
                    <div class="row">
                        <div class="col-sm-12">
                            Pengaturan Legenda {{ nama }}
                        </div>
                        <div class="col-sm-4 float-left">
                            <label>Kolom Legenda</label>
                            <v-select :options="kolomlegenda" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedkolomlegenda" @update:modelValue="onkolomlegendaChange"
                                style="background-color: #ffffff;"></v-select>
                        </div>
                        <div class="col-sm-4 float-left">
                            <label>Text Legenda</label>
                            <v-select :options="textlegenda" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedtextlegenda" @update:modelValue="ontextlegendaChange"
                                style="background-color: #ffffff;"></v-select>
                        </div>
                        <div class="col-sm-2 float-left">
                            <label>Proses</label><br>
                            <button type="button" class="btn btn-success3 btn-sm text-white lebar4"
                                @click="prosesdata()" data-toggle="tooltip" data-placement="left"
                                title="Proses legenda..">
                                <i class="fas fa-align-justify"></i> Proses
                            </button>
                        </div>
                        <div class="col-sm-2 float-left" v-if="(legendapeta.length > 0)">
                            <label>Opsi</label><br>
                            <button type="button" class="btn btn-success3 btn-sm text-white lebar4"
                                @click="simpandata()" data-toggle="tooltip" data-placement="left"
                                title="Simpan legenda..">
                                <i class="fas fa-plus"></i> Simpan
                            </button>
                        </div>
                        <div class="col-sm-12">&nbsp;</div>
                        <div class="col-sm-12">
                            <div class="table-responsive table-wrapper">
                                <table class="table m-0" id="tabeldataadidata" style="font-size: small;">
                                    <thead>
                                        <tr>
                                            <th style="width: 10px;">No</th>
                                            <th style="width: 50px;">Kolom Legenda</th>
                                            <th style="width: 250px;">Isian Legenda</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="(legendapeta.length == 0)">
                                        <tr>
                                            <td colspan="3">Legenda masih belum ditetapkan</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <template v-for="(datalegenda, urutlegenda) in legendapeta" :key="urutlegenda">
                                            <tr>
                                                <td>
                                                    {{ urutlegenda + 1 }}
                                                </td>
                                                <td class="text-center">
                                                    <span v-if="datalegenda.keterangan == 'fill'"><i
                                                            class="fas fa-square-full"
                                                            :style="{ 'color': datalegenda.kolom }"></i></span>
                                                    <span v-else-if="datalegenda.keterangan == 'stroke'"><i
                                                            class="fas fa-minus"
                                                            :style="{ 'color': datalegenda.kolom }"></i></span>
                                                    <span
                                                        v-else-if="datalegenda.keterangan == 'Sesuai Pengaturan Polygon'"><i
                                                            class="fas fa-square-full"
                                                            :style="{ 'color': datalegenda.kolom }"></i></span>
                                                    <span
                                                        v-else-if="datalegenda.keterangan == 'Sesuai Pengaturan Line'"><i
                                                            class="fas fa-minus"
                                                            :style="{ 'color': datalegenda.kolom }"></i></span>
                                                    <span
                                                        v-else-if="datalegenda.keterangan == 'Sesuai Pengaturan Radius'"><i
                                                            class="fas fa-square-full"
                                                            :style="{ 'color': datalegenda.kolom }"></i></span>
                                                    <span
                                                        v-else-if="datalegenda.keterangan == 'Sesuai Pengaturan Point'"><img
                                                            :src="linknya + 'maps_parastapainnovation-Ikon?f=' + datalegenda.kolom"></img></span>
                                                    <span v-else-if="datalegenda.keterangan == 'gambar'">
                                                        <img v-if="datalegenda.kolom.toString().trim().includes('http')"
                                                            :src="datalegenda.kolom">
                                                        </img>
                                                        <img v-else
                                                            :src="linknya + 'maps_parastapainnovation-Ikon?f=' + datalegenda.kolom">
                                                        </img>
                                                    </span>
                                                    <span v-else-if="datalegenda.keterangan == 'images'"><img
                                                            :src="datalegenda.kolom" style="height: 50px;"></img></span>
                                                    <span v-else-if="datalegenda.keterangan == 'images2'"><img
                                                            :src="datalegenda.kolom" style="height: 50px;"></img></span>
                                                    <span v-else>{{ datalegenda.kolom }}</span>
                                                </td>
                                                <td>
                                                    {{ datalegenda.isian }}
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            Data Peta
                        </div>
                        <div class="col-sm-12">
                            <div class="table-responsive table-wrapper">
                                <table class="table m-0" id="tabeldataadidata" style="font-size: small;">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;">No</th>
                                            <template v-for="(datajudul, urutjudul) in datakeytabelunique"
                                                :key="urutjudul">
                                                <th>{{ datajudul }}</th>
                                            </template>
                                        </tr>
                                    </thead>
                                    <template v-for="(datalist, urutlist) in datavaluetabel" :key="urutlist">
                                        <tbody>
                                            <tr>
                                                <td class="text-center">
                                                    {{ (urutlist + 1) }}
                                                </td>
                                                <td class="text-justify"
                                                    v-for="(datajudul, urutjudul) in datakeytabelunique"
                                                    :key="urutjudul">
                                                    <span v-if="datajudul == 'fill'"><i class="fas fa-square-full"
                                                            :style="{ 'color': datalist[datajudul] }"></i></span>
                                                    <span v-else-if="datajudul == 'stroke'"><i class="fas fa-minus"
                                                            :style="{ 'color': datalist[datajudul] }"></i></span>
                                                    <span v-else-if="datajudul == 'gambar'">
                                                        <img v-if="datalist[datajudul].toString().trim().includes('http')"
                                                            :src="datalist[datajudul]">
                                                        </img>
                                                        <img v-else
                                                            :src="linknya + 'maps_parastapainnovation-Ikon?f=' + datalist[datajudul]">
                                                        </img>
                                                    </span>
                                                    <span v-else-if="datajudul == 'images'"><img
                                                            :src="datalist[datajudul]"
                                                            style="height: 50px;"></img></span>
                                                    <span v-else-if="datajudul == 'images2'"><img
                                                            :src="datalist[datajudul]"
                                                            style="height: 50px;"></img></span>
                                                    <span v-else>{{ datalist[datajudul] }}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal"> <i
                            class="far fa-times-circle"></i>
                        Tutup</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="costumModaldetailpeta" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
        aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
        style="background: rgba(240, 248, 255, 0.1);">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Data Layer {{ judullayer }}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-justify">
                    <p>
                    <div class="row">
                        <div class="col-sm-12">
                            <label>Judul Nama Layer: {{ judullayer }}</label>
                        </div>
                        <div class="col-sm-12">
                            <label>Sumber Layer: {{ namaasalpeta }}</label>
                        </div>
                        <div class="col-sm-12">
                            <label>API Layer: {{ namaapipeta }}</label>
                        </div>
                        <div class="col-sm-12">
                            <label>Jenis Layer: {{ namatipepeta }}</label>
                        </div>
                        <iframe :src="sourcenyapeta" class="col-sm-12 text-center" style="min-height: 45vh;"
                            frameborder="0" id="maps" scrolling="no" @load="loadpeta()"></iframe>
                    </div>
                    </p>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal"> <i
                            class="far fa-times-circle"></i>
                        Tutup</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="costumModalpeta" data-easein="flipBounceYIn" tabindex="-1" role="dialog"
        aria-labelledby="costumModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false"
        style="background: rgba(240, 248, 255, 0.1);">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Pengaturan Peta</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-justify">
                    <p>
                    <div class="row">
                        <div class="col-sm-12" style="display: none;">
                            <label>id</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-border-all"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="id" name="id"
                                    placeholder="id" v-model="id">
                            </div>
                        </div>
                        <div class="col-sm-12" style="display: none;">
                            <label>Parent</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-border-all"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="id_parent"
                                    name="id_parent" placeholder="Parent" v-model="id_parent">
                            </div>
                        </div>
                        <div class="col-sm-12" style="display: none;">
                            <label>Level</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-border-all"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="level" name="level"
                                    placeholder="Level" v-model="level">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label>Nama Layer <small class="text-info"> (*wajib
                                    diisi)</small></label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-border-all"></i></span>
                                </div>
                                <input type="text" class="form-control form-control-sm" id="nama" name="nama"
                                    placeholder="Nama Layer" v-model="nama">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label>Urutan Menu <small class="text-info"> (*wajib
                                    diisi)</small></label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-border-all"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="urut" name="urut"
                                    placeholder="Urutan Menu" v-model="urut">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label>Jenis Menu <small class="text-info"> (*wajib
                                    dipilih)</small></label>
                            <v-select :options="jenismenu" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedjenismenu" @update:modelValue="onjenismenuChange"
                                style="background-color: #ffffff;"></v-select>
                        </div>
                        <div class="col-sm-6">
                            <label>Status Tampil Data</label>
                            <v-select :options="tampilpublik" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedStatusTampil" @update:modelValue="onStatusTampilChange"
                                style="background-color: #ffffff;"></v-select>
                        </div>
                        <div class="col-sm-6 float-left" v-if="selectedjenismenu == 2">
                            <label>Sumber Peta</label>
                            <v-select :options="asalpeta" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedasalpeta" @update:modelValue="onasalpetaChange"
                                style="background-color: #ffffff;padding-bottom: 10px;"></v-select>
                        </div>
                        <div class="col-sm-12 float-left" v-if="selectedjenismenu == 2 && selectedasalpeta == 2">
                            <label>API Peta</label>
                            <v-select :options="apipeta" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedapipeta" @update:modelValue="onapipetaChange"
                                style="background-color: #ffffff;"></v-select>
                        </div>
                        <div class="col-sm-12 float-left">&nbsp;</div>
                        <!--PETA 1-->
                        <div class="col-sm-12" :style="[(selectedasalpeta == 1 ? ':block' : 'display:none')]">
                            <label>File<small class="text-info"> (*geojson files)</small>
                            </label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-file-image"></i></span>
                                </div>
                                <input type="file" class="form-control form-control-sm" id="fileToUploadfilenya_peta"
                                    name="fileToUploadfilenya_peta" placeholder="fileToUpload"
                                    style="font-size: smaller;" accept=".geojson">
                                <input type="hidden" class="form-control form-control-sm" id="filenya_peta"
                                    name="filenya_peta" placeholder="File Peta">
                            </div>
                        </div>
                        <div class="col-sm-12" :style="[(selectedasalpeta == 1 ? ':block' : 'display:none')]">
                            <label>Opsi</label>
                            <div class="row">
                                <div class="col-sm-9">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                            aria-valuemax="100" style="width:0%" id="persennyafilenya_peta">
                                            <span id="tulisanpersenfilenya_peta">0%</span>
                                        </div>
                                    </div>
                                    <br>
                                    <span class="text-success" id="suksesnyafilenya_peta"></span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <button type="button" class="btn btn-warning btn-sm lebar text-white"
                                        @click="uploadfilepeta('filenya_peta', '.geojson')">Upload
                                        File</button>
                                    <button type="button" class="btn btn-danger btn-sm lebar"
                                        @click="clearfilepeta('filenya_peta')">Hapus File</button>
                                </div>
                            </div>
                        </div>
                        <!--PETA 1 END-->
                        <div class="col-sm-12 float-left" v-if="selectedjenismenu == 2">
                            <label>Tipe Peta</label>
                            <v-select :options="tipepeta" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedTipePeta" @update:modelValue="onTipePetaChange"
                                style="background-color: #ffffff;"></v-select>
                        </div>
                        <div class="col-sm-12">&nbsp;</div>
                        <div class="col-sm-12 float-left">&nbsp;</div>
                        <!--IKON PETA 1-->
                        <div class="col-sm-12" :style="[(selectedtipepeta == 2 ? ':block' : 'display:none')]">
                            <label>Ikon<small class="text-info"> (*rekomendasi images files png
                                    transparent 25px x
                                    25px)</small>
                            </label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-file-image"></i></span>
                                </div>
                                <input type="file" class="form-control form-control-sm" id="fileToUploadfilenya_ikon"
                                    name="fileToUploadfilenya_ikon" placeholder="fileToUpload"
                                    style="font-size: smaller;" accept="image/*">
                                <input type="hidden" class="form-control form-control-sm" id="filenya_ikon"
                                    name="filenya_ikon" placeholder="File Ikon">
                            </div>
                        </div>
                        <div class="col-sm-12" :style="[(selectedtipepeta == 2 ? ':block' : 'display:none')]">
                            <label>Opsi</label>
                            <div class="row">
                                <div class="col-sm-9">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                            aria-valuemax="100" style="width:0%" id="persennyafilenya_ikon">
                                            <span id="tulisanpersenfilenya_ikon">0%</span>
                                        </div>
                                    </div>
                                    <br>
                                    <span class="text-success" id="suksesnyafilenya_ikon"></span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <button type="button" class="btn btn-warning btn-sm lebar text-white"
                                        @click="uploadfile('filenya_ikon', 'image/*')">Upload
                                        File</button>
                                    <button type="button" class="btn btn-danger btn-sm lebar"
                                        @click="clearfilepeta('filenya_ikon')">Hapus File</button>
                                </div>
                            </div>
                        </div>
                        <!--IKON PETA 1 END-->
                        <div class="col-sm-6 mb-3"
                            :style="[((selectedtipepeta == 1 || selectedtipepeta == 7) ? ':block' : 'display:none')]">
                            <label>Fill Color</label>
                            <Vue3ColorPicker v-model="fill" mode="solid" :showColorList="false" :showEyeDrop="false"
                                type="HEX" />
                        </div>
                        <div class="col-sm-6 mb-3"
                            :style="[((selectedtipepeta == 1 || selectedtipepeta == 3 || selectedtipepeta == 7) ? ':block' : 'display:none')]">
                            <label>Stroke Color</label>
                            <Vue3ColorPicker v-model="stroke" mode="solid" :showColorList="false" :showEyeDrop="false"
                                type="HEX" />
                        </div>
                        <div class="col-sm-6" :style="[((selectedtipepeta == 1) ? ':block' : 'display:none')]">
                            <label>Outline Width</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-arrows-alt-h"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="fill_width"
                                    name="fill_width" placeholder="Outline Width" v-model="fill_width">
                            </div>
                        </div>
                        <div class="col-sm-6" :style="[(selectedtipepeta == 3 ? ':block' : 'display:none')]">
                            <label>Line Width</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-arrows-alt-h"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="stroke_width"
                                    name="stroke_width" placeholder="Line Width" v-model="stroke_width">
                            </div>
                        </div>
                        <div class="col-sm-6" :style="[(selectedtipepeta == 3 ? ':block' : 'display:none')]">
                            <label>Dash Line Start</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-ellipsis-h"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="dash_start"
                                    name="dash_start" placeholder="Dash Line Start" v-model="dash_start">
                            </div>
                        </div>
                        <div class="col-sm-6" :style="[(selectedtipepeta == 3 ? ':block' : 'display:none')]">
                            <label>Dash Line End</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-ellipsis-h"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="dash_end" name="dash_end"
                                    placeholder="Dash Line End" v-model="dash_end">
                            </div>
                        </div>
                        <div class="col-sm-6" :style="[((selectedtipepeta == 1) ? ':block' : 'display:none')]">
                            <label>Tipe Fill Polygon</label>
                            <v-select :options="tipe_fill" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedTipeFill" @update:modelValue="onTipeFillChange"
                                style="background-color: #ffffff;"></v-select>
                        </div>
                        <div class="col-sm-6" :style="[((selectedtipepeta == 1) ? ':block' : 'display:none')]">
                            <label>Tipe Pattern Polygon</label>
                            <v-select :options="tipe_pattern" :reduce="(label) => label.code" label="label"
                                v-model="defaultSelectedTipePattern" @update:modelValue="onTipePatternChange"
                                style="background-color: #ffffff;"></v-select>
                        </div>
                        <div class="col-sm-6" :style="[((selectedtipepeta == 1) ? ':block' : 'display:none')]">
                            <label>Sudut Derajat Pattern</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clone"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="sudut" name="sudut"
                                    placeholder="Urutan Layer" v-model="sudut">
                            </div>
                        </div>
                        <div class="col-sm-6" :style="[((selectedtipepeta == 7) ? ':block' : 'display:none')]">
                            <label>Ukuran Radius (m)</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clone"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="radius" name="radius"
                                    placeholder="Ukuran Radius (m)" v-model="radius">
                            </div>
                        </div>
                        <div class="col-sm-6" :style="[((selectedjenismenu == 2) ? ':block' : 'display:none')]">
                            <label>Nama Kolom Filter <small class="text-info"> (*isikan Multiple untuk profil
                                    infrastruktur)</small></label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clone"></i></span>
                                </div>
                                <input type="text" class="form-control form-control-sm" id="kolomfilter"
                                    name="kolomfilter" placeholder="Nama Kolom Filter" v-model="kolomfilter">
                            </div>
                        </div>
                        <div class="col-sm-6" :style="[((selectedjenismenu == 2) ? ':block' : 'display:none')]">
                            <label>Isian Filter <small class="text-info"> (*delimiter koma)</small>
                            </label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clone"></i></span>
                                </div>
                                <input type="text" class="form-control form-control-sm" id="textfilter"
                                    name="textfilter" placeholder="Isian Filter" v-model="textfilter">
                            </div>
                        </div>
                        <div class="col-sm-6" v-if="selectedjenismenu == 2">
                            <label>Urutan Lapisan Layer</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clone"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="urutindex"
                                    name="urutindex" placeholder="Urutan Lapisan Layer" v-model="urutindex">
                            </div>
                        </div>
                        <div class="col-sm-6" v-if="selectedjenismenu == 2">
                            <label>Latitude Zoom</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clone"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="latitude" name="latitude"
                                    placeholder="Latitude Zoom" v-model="latitude">
                            </div>
                        </div>
                        <div class="col-sm-6" v-if="selectedjenismenu == 2">
                            <label>Longitude Zoom</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clone"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="longitude"
                                    name="longitude" placeholder="Longitude Zoom" v-model="longitude">
                            </div>
                        </div>
                        <div class="col-sm-6" v-if="selectedjenismenu == 2">
                            <label>Zoom Level</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clone"></i></span>
                                </div>
                                <input type="number" class="form-control form-control-sm" id="zoom" name="zoom"
                                    placeholder="Zoom Level" v-model="zoom">
                            </div>
                        </div>
                        <div class="col-sm-12">&nbsp;</div>
                        <div class="col-sm-12">&nbsp;</div>
                    </div>
                    </p>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" v-if="(this.id == null)" class="btn btn-success3 btn-sm lebar2 text-white"
                        @click="simpanlayer()"><i class="fas fa-plus-square"></i>
                        Simpan</button>
                    <button type="button" v-if="(this.id != null)" class="btn btn-success3 btn-sm lebar2 text-white"
                        @click="updatelayer()"><i class="fa fa-check-circle"></i>
                        Update</button>
                    <button type="button" class="btn btn-danger3 btn-sm lebar2 text-white" data-dismiss="modal"> <i
                            class="far fa-times-circle"></i>
                        Batal</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
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
        <div class="content-wrapper py-5">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6 wow fadeInDown">
                            <h5>Layer Data Peta</h5>
                        </div>
                        <div class="col-sm-6 wow fadeInDown">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="/Dashboard">Home </a></li>
                                <li class="breadcrumb-item active">Pengaturan Layer Data Peta</li>
                            </ol>
                        </div>
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6" style="display: none;">
                            <input type="text" class="form-control form-control-sm" id="operation" name="operation"
                                placeholder="operation">
                        </div>
                        <div class="col-sm-6" style="display: none;">
                            <input type="text" class="form-control form-control-sm" id="kode" name="kode"
                                placeholder="kode">
                        </div>
                        <div class="col-sm-12 text-center" style="display: none;">
                            <button type="button" class="btn btn-success3 btn-sm text-white lebar2" id="aturlegenda"
                                @click="aturlegenda()" data-toggle="tooltip" data-placement="left" title="Legenda..">
                                <i class="fas fa-plus"></i> Lihat
                            </button>
                        </div>
                        <div class="col-sm-12 text-center" style="display: none;">
                            <button type="button" class="btn btn-success3 btn-sm text-white lebar2" id="lihatnode"
                                @click="lihatnode()" data-toggle="tooltip" data-placement="left" title="Lihat..">
                                <i class="fas fa-plus"></i> Lihat
                            </button>
                        </div>
                        <div class="col-sm-12 text-center" style="display: none;">
                            <button type="button" class="btn btn-success3 btn-sm text-white lebar2" id="prosesnode"
                                @click="prosesnode()" data-toggle="tooltip" data-placement="left" title="Proses..">
                                <i class="fas fa-plus"></i> Proses
                            </button>
                        </div>
                        <div class="col-sm-12">
                            <button type="button" class="btn btn-success3 btn-sm text-white lebar2"
                                @click="tambahdata(null, 1)" data-toggle="tooltip" data-placement="left"
                                title="Tambah Level 1 Peta..">
                                <i class="fas fa-plus"></i> Tambah Level 1 Peta
                            </button>
                        </div>
                        <div class="col-sm-12">
                            <iframe :src="sourcenya" class="col-sm-12 text-center" style="min-height: 95vh;"
                                frameborder="0" id="treeview" scrolling="yes" @load="loadtreeview()"></iframe>
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
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import Footer from "../../componen/Footer.vue";
import NavBar from "../../componen/NavBar.vue";
import Menu from "../../componen/Menu.vue";

import VueApexCharts from "vue3-apexcharts";
window.Apex.chart = { fontFamily: "Poppins-SemiBold, Arial, sans-serif" };
export default {
    components: {
        Footer, NavBar, Menu, vSelect, swal, Vue3ColorPicker
    },
    data() {
        return {
            halamanloading: true,
            sourcenyapeta: '',
            sourcenya: '',
            linknya: process.env.VUE_APP_URL_API + JSON.parse(localStorage.getItem("datatahunaktif")) + '/',
            iduser: JSON.parse(localStorage.getItem("usistem")),
            leveluser: JSON.parse(localStorage.getItem("lsistem")),
            namauser: JSON.parse(localStorage.getItem("nmusistem")),
            datakeytabel: [],
            datakeytabelunique: [],
            datavaluetabel: [],
            legendapeta: [],
            datapesan: '',
            datamaster: [],
            carikata: '',
            tahun: '',
            nama: '',
            urut: '',
            id: '',
            id_parent: null,
            level: '',
            jenismenu: [],
            datajenismenu: [],
            defaultSelectedjenismenu: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedjenismenu: '',
            asalpeta: [],
            dataasalpeta: [],
            defaultSelectedasalpeta: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedasalpeta: '',
            apipeta: [],
            dataapipeta: [],
            defaultSelectedapipeta: {
                code: 0,
                label: 'Tidak Ada',
                tag: 0,
            },
            selectedapipeta: '',
            filenya_peta: '',

            tipepeta: [],
            datatipepeta: [],
            defaultSelectedTipePeta: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtipepeta: '',

            fill: '#00BFFF',
            stroke: '#000000',
            fill_width: '1',
            stroke_width: '1',
            dash_start: '1',
            dash_end: '1',
            filenya_ikon: '',

            tipe_fill: [],
            datatipe_fill: [],
            defaultSelectedTipeFill: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtipe_fill: 1,

            tipe_pattern: [],
            datatipe_pattern: [],
            defaultSelectedTipePattern: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtipe_pattern: 1,
            sudut: '0',
            urutindex: '1',
            latitude: '0',
            longitude: '0',
            zoom: '0',
            validasi: false,

            judullayer: '',
            namaasalpeta: '',
            namaapipeta: '',
            namatipepeta: '',
            radius: '0',
            kolomfilter: '',
            textfilter: '',

            tampilpublik: [],
            datatampilpublik: [],
            defaultSelectedStatusTampil: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtampilpublik: '',
            kolomlegenda: [],
            datakolomlegenda: [],
            defaultSelectedkolomlegenda: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedkolomlegenda: '',

            textlegenda: [],
            datatextlegenda: [],
            defaultSelectedtextlegenda: {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            },
            selectedtextlegenda: '',
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
        onkolomlegendaChange(a) {
            try {
                this.selectedkolomlegenda = this.kolomlegenda[a].tag;
            }
            catch (err) {
                return;
            }
        },
        ontextlegendaChange(a) {
            try {
                this.selectedtextlegenda = this.textlegenda[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onjenismenuChange(a) {
            try {
                this.selectedjenismenu = this.jenismenu[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onasalpetaChange(a) {
            try {
                this.selectedasalpeta = this.asalpeta[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onapipetaChange(a) {
            try {
                this.selectedapipeta = this.apipeta[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onTipePetaChange(a) {
            try {
                this.selectedtipepeta = this.tipepeta[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onTipeFillChange(a) {
            try {
                this.selectedtipe_fill = this.tipe_fill[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onTipePatternChange(a) {
            try {
                this.selectedtipe_pattern = this.tipe_pattern[a].tag;
            }
            catch (err) {
                return;
            }
        },
        onStatusTampilChange(a) {
            try {
                this.selectedtampilpublik = this.tampilpublik[a].tag;
            }
            catch (err) {
                return;
            }
        },
        prosesdata() {
            var temp = document.getElementById('kode').value.split('|');
            this.id = temp[0];
            this.nama = temp[4];
            this.selectedtipepeta = temp[12];
            this.fill = temp[14];
            this.stroke = temp[15];
            this.filenya_ikon = temp[20];

            this.legendapeta = [];
            if ((this.selectedkolomlegenda == '') || (this.selectedkolomlegenda === null) || (this.selectedkolomlegenda === undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Pilih Kolom Legenda Peta..',
                });
                return false;
            }
            if ((this.selectedtextlegenda == '') || (this.selectedtextlegenda === null) || (this.selectedtextlegenda === undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Pilih Text Legenda Peta..',
                });
                return false;
            }
            var templegenda = [];

            if ((this.selectedtipepeta == '4') || (this.selectedtipepeta == '5') || (this.selectedtipepeta == '6')) {
                this.datavaluetabel.forEach(item => {
                    templegenda.push({
                        "kolom": item[this.selectedkolomlegenda],
                        "isian": item[this.selectedtextlegenda],
                        "keterangan": this.selectedkolomlegenda,
                        "keteranganisian": this.selectedtextlegenda,
                    })
                });
            }
            if ((this.selectedtipepeta == '1')) {
                this.datavaluetabel.forEach(item => {
                    templegenda.push({
                        "kolom": this.fill,
                        "isian": this.nama,
                        "keterangan": this.selectedkolomlegenda,
                        "keteranganisian": this.selectedtextlegenda,
                    })
                });
            }
            if ((this.selectedtipepeta == '2')) {
                this.datavaluetabel.forEach(item => {
                    templegenda.push({
                        "kolom": this.filenya_ikon,
                        "isian": this.nama,
                        "keterangan": this.selectedkolomlegenda,
                        "keteranganisian": this.selectedtextlegenda,
                    })
                });
            }
            if ((this.selectedtipepeta == '3')) {
                this.datavaluetabel.forEach(item => {
                    templegenda.push({
                        "kolom": this.stroke,
                        "isian": this.nama,
                        "keterangan": this.selectedkolomlegenda,
                        "keteranganisian": this.selectedtextlegenda,
                    })
                });
            }
            if ((this.selectedtipepeta == '7')) {
                this.datavaluetabel.forEach(item => {
                    templegenda.push({
                        "kolom": this.fill,
                        "isian": this.nama,
                        "keterangan": this.selectedkolomlegenda,
                        "keteranganisian": this.selectedtextlegenda,
                    })
                });
            }

            this.legendapeta = templegenda.filter((obj, index, self) =>
                index === self.findIndex((t) => (
                    t.kolom === obj.kolom && t.isian === obj.isian // Customize comparison
                ))
            );

            this.legendapeta.sort((a, b) => a.isian - b.isian);
        },
        simpandata() {
            //alert(JSON.stringify(this.legendapeta));
            //return;
            var fd = new FormData();
            fd.append("id", this.id);
            fd.append("legendapeta", JSON.stringify(this.legendapeta));
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            mainAPI.post("parastapainnovation_adminpeta-SettingLegendaPeta", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: Response.data.message,
                        });
                        return false;
                    }
                    else {
                        swal.fire({
                            title: "Informasi",
                            text: Response.data.message,
                            icon: "success"
                        }).then(function () {
                            window.location.replace("/LayerPeta");
                        });
                        $('.swal2-container').css("z-index", '999999');
                    }
                }
            ).catch(
                error => {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: error,
                    });
                }
            )
        },
        async AmbilDataReff() {
            this.halamanloading = true;
            var mainAPIDataSingel = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });
            var random = Math.random();
            await mainAPIDataSingel.get("parastapainnovation_adminpeta-GetJenisMenu?random=" + random).then(
                Response => {
                    this.datajenismenu = [];
                    this.jenismenu = [];
                    this.datajenismenu = Response.data.content.data;
                    this.datajenismenu.forEach((item) => {
                        this.jenismenu.push({
                            label: item.nama,
                            code: this.datajenismenu.indexOf(item) + 1,
                            tag: item.id,
                        });
                    });
                    this.jenismenu.unshift({
                        label: 'Pilih Data',
                        code: 0,
                        tag: '',
                    });
                    this.halamanloading = false;
                }
            ).catch(error => {
                swal.fire('Peringatan', error, 'error');
                this.halamanloading = false;
                return false;
            })
            this.halamanloading = true;
            var random = Math.random();
            await mainAPIDataSingel.get("parastapainnovation_adminpeta-GetAsalPeta?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.dataasalpeta = [];
                        this.asalpeta = [];
                        this.dataasalpeta = Response.data.content.data;
                        this.dataasalpeta.forEach((item) => {
                            this.asalpeta.push({
                                label: item.nama,
                                code: this.dataasalpeta.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.asalpeta.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                this.ClearlocalStorage();
                this.halamanloading = false;
            });
            var random = Math.random();
            await mainAPIDataSingel.get("parastapainnovation_adminpeta-GetAPIPeta?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.dataapipeta = [];
                        this.apipeta = [];
                        this.dataapipeta = Response.data.content.data;
                        this.dataapipeta.forEach((item) => {
                            this.apipeta.push({
                                label: item.nama,
                                code: this.dataapipeta.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.apipeta.unshift({
                            label: 'Tidak Ada',
                            code: 0,
                            tag: '',
                        });
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
            await mainAPIDataSingel.get("parastapainnovation_adminpeta-GetTipePeta?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    //alert(this.datapesan);
                    if (this.datapesan == 'data diketemukan') {
                        this.datatipepeta = [];
                        this.tipepeta = [];
                        this.datatipepeta = Response.data.content.data;
                        this.datatipepeta.forEach((item) => {
                            this.tipepeta.push({
                                label: item.nama,
                                code: this.datatipepeta.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.tipepeta.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                this.ClearlocalStorage();
                this.halamanloading = false;
            });

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIDataSingel.get("parastapainnovation_adminpeta-GetPolygonTipe?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datatipe_fill = [];
                        this.tipe_fill = [];
                        this.datatipe_fill = Response.data.content.data;
                        this.datatipe_fill.forEach((item) => {
                            this.tipe_fill.push({
                                label: item.nama,
                                code: this.datatipe_fill.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.tipe_fill.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                this.ClearlocalStorage();
                this.halamanloading = false;
            });

            this.halamanloading = true;
            var random = Math.random();
            await mainAPIDataSingel.get("parastapainnovation_adminpeta-GetPolygonFill?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datatipe_pattern = [];
                        this.tipe_pattern = [];
                        this.datatipe_pattern = Response.data.content.data;
                        this.datatipe_pattern.forEach((item) => {
                            this.tipe_pattern.push({
                                label: item.nama,
                                code: this.datatipe_pattern.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.tipe_pattern.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                this.ClearlocalStorage();
                this.halamanloading = false;
            });
            this.halamanloading = true;
            var random = Math.random();
            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2",
                },
            });
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
                this.datapesan = [];
                console.log(error);
            });

            const mainAPI2 = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    Authorization: "Bearer GPMop8LQ06S0rZXcJyEH3wk8jVrINbHwn7tBq2" + this.ipnya,
                },
            });

            await mainAPI2.get("parastapainnovationreff-GetStatusTampil?random=" + random).then(
                Response => {
                    this.datapesan = Response.data.message;
                    if (this.datapesan == 'data diketemukan') {
                        this.datatampilpublik = [];
                        this.tampilpublik = [];
                        this.datatampilpublik = Response.data.content.data;
                        this.datatampilpublik.forEach((item) => {
                            this.tampilpublik.push({
                                label: item.nama,
                                code: this.datatampilpublik.indexOf(item) + 1,
                                tag: item.id,
                            });
                        });
                        this.tampilpublik.unshift({
                            label: 'Pilih Salah Satu',
                            code: 0,
                            tag: '',
                        });
                    }
                    this.halamanloading = false;
                }
            ).catch(error => {
                console.log(error);
                this.ClearlocalStorage();
                this.halamanloading = false;
            });
        },
        tambahdata(id_parent, level) {
            this.id = null;
            this.id_parent = id_parent;
            this.level = level;
            this.defaultSelectedjenismenu = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedjenismenu = '';
            this.defaultSelectedasalpeta = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedasalpeta = '';
            this.defaultSelectedapipeta = {
                code: 0,
                label: 'Tidak Ada',
                tag: '',
            };
            this.selectedapipeta = '';
            this.filenya_peta = '';
            document.getElementById('filenya_peta').value = '';

            this.defaultSelectedTipePeta = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedtipepeta = '';

            this.fill = '#00BFFF';
            this.stroke = '#000000';
            this.fill_width = '1';
            this.stroke_width = '1';
            this.dash_start = '1';
            this.dash_end = '1';
            this.filenya_ikon = '';

            this.defaultSelectedTipeFill = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedtipe_fill = 1;

            this.defaultSelectedTipePattern = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedtipe_pattern = 1;
            this.defaultSelectedStatusTampil = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            this.selectedtampilpublik = '';
            this.sudut = '0';
            this.urutindex = '1';
            this.latitude = '0';
            this.longitude = '0';
            this.zoom = '0';
            this.radius = '0';
            this.kolomfilter = '';
            this.textfilter = '';

            $('#costumModalpeta').modal('show');
        },
        aturlegenda() {
            //alert(document.getElementById('kode').value);
            this.selectedkolomlegenda = '';
            this.selectedtextlegenda = '';
            this.legendapeta = [];
            this.defaultSelectedkolomlegenda = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };

            this.defaultSelectedtextlegenda = {
                code: 0,
                label: 'Pilih Salah Satu',
                tag: '',
            };
            var temp = document.getElementById('kode').value.split('|');
            this.id = temp[0];
            this.nama = temp[4];
            this.selectedtipepeta = temp[12];
            if ((temp[35] == 'null') || (temp[35] == '') || (temp[35] === undefined) || (temp[35] === null)) {
                this.legendapeta = [];
            }
            else {
                this.legendapeta = JSON.parse(temp[35]);
            }


            var tipepetanya = temp[12];
            var linkgeojson = temp[11];
            if ((linkgeojson.includes(".geojson")) && (linkgeojson.includes("http") == false)) {
                //geojson
                this.halamanloading = true;
                try {
                    fetch(this.linknya + "maps_parastapainnovation-ViewGeojson?f=" + linkgeojson)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error');
                            }
                            return response.json(); // Parses the JSON response into a JavaScript object
                        })
                        .then(data => {
                            //console.log(data); // Work with the parsed JSON data
                            //alert(JSON.stringify(data.features));
                            var geoJsonData = data.features;
                            var features = geoJsonData;
                            //alert(features.length);
                            this.datakeytabel = [];
                            this.datavaluetabel = [];
                            this.textlegenda = [];
                            this.kolomlegenda = [];
                            features.forEach(feature => {
                                this.halamanloading = true;
                                var properties = feature.properties;
                                var objectKeys = Object.keys(properties);
                                objectKeys.forEach(judul => {
                                    this.datakeytabel.push(judul);
                                });
                                //console.log(objectKeys); // Key Array
                                //console.log(properties); // Access specific property by name
                                this.datavaluetabel.push(properties);
                                this.halamanloading = false;
                                //console.log(this.datavaluetabel);
                            });
                            this.halamanloading = true;
                            this.datakeytabelunique = [...new Set(this.datakeytabel)];
                            if ((tipepetanya == '4') || (tipepetanya == '5') || (tipepetanya == '6')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                    if ((item == 'fill') || (item == 'stroke') || (item == 'gambar')) {
                                        this.kolomlegenda.push({
                                            label: item,
                                            code: i,
                                            tag: item,
                                        });
                                        i++;
                                    }
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '1')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Polygon',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Polygon',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '2')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Point',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Point',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '3')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Line',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Line',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '7')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Radius',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Radius',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if (this.legendapeta == []) {
                            }
                            else {
                                for (var i = 0; i < 1; i++) {
                                    this.kolomlegenda.forEach((item) => {
                                        if (this.legendapeta[i].keterangan == item.label) {
                                            this.defaultSelectedkolomlegenda = {
                                                code: item.code,
                                                label: item.label,
                                                tag: item.label,
                                            };
                                            this.selectedkolomlegenda = item.label;
                                        }

                                    });
                                    this.textlegenda.forEach((item) => {
                                        if (this.legendapeta[i].keteranganisian == item.label) {
                                            this.defaultSelectedtextlegenda = {
                                                code: item.code,
                                                label: item.label,
                                                tag: item.label,
                                            };
                                            this.selectedtextlegenda = item.label;
                                        }

                                    });
                                }
                            }
                            $('#costumModalLegendaData').modal('show');
                            this.halamanloading = false;
                        })
                        .catch(error => {
                            $('#costumModalLegendaData').modal('show');
                            this.halamanloading = false;
                        });


                } catch (error) {
                    console.log(error);
                    this.halamanloading = false;
                }
                //geojson
            }
            else if (linkgeojson.includes("http")) {
                //link luar
                this.halamanloading = true;
                try {
                    fetch(linkgeojson)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error');
                            }
                            return response.json(); // Parses the JSON response into a JavaScript object
                        })
                        .then(data => {
                            //console.log(data); // Work with the parsed JSON data
                            //alert(JSON.stringify(data.features));
                            var geoJsonData = data.features;
                            var features = geoJsonData;
                            //alert(features.length);
                            this.datakeytabel = [];
                            this.datavaluetabel = [];
                            this.textlegenda = [];
                            this.kolomlegenda = [];
                            features.forEach(feature => {
                                this.halamanloading = true;
                                var properties = feature.properties;
                                var objectKeys = Object.keys(properties);
                                objectKeys.forEach(judul => {
                                    this.datakeytabel.push(judul);
                                });
                                //console.log(objectKeys); // Key Array
                                //console.log(properties); // Access specific property by name
                                this.datavaluetabel.push(properties);
                                this.halamanloading = false;
                                //console.log(this.datavaluetabel);
                            });
                            this.halamanloading = true;
                            this.datakeytabelunique = [...new Set(this.datakeytabel)];
                            if ((tipepetanya == '4') || (tipepetanya == '5') || (tipepetanya == '6')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                    if ((item == 'fill') || (item == 'stroke') || (item == 'gambar')) {
                                        this.kolomlegenda.push({
                                            label: item,
                                            code: i,
                                            tag: item,
                                        });
                                        i++;
                                    }
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '1')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Polygon',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Polygon',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '2')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Point',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Point',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '3')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Line',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Line',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '7')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Radius',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Radius',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if (this.legendapeta == []) {
                            }
                            else {
                                for (var i = 0; i < 1; i++) {

                                    this.kolomlegenda.forEach((item) => {
                                        if (this.legendapeta[i].keterangan == item.label) {
                                            this.defaultSelectedkolomlegenda = {
                                                code: item.code,
                                                label: item.label,
                                                tag: item.label,
                                            };
                                            this.selectedkolomlegenda = item.label;
                                        }

                                    });
                                    this.textlegenda.forEach((item) => {
                                        if (this.legendapeta[i].keteranganisian == item.label) {
                                            this.defaultSelectedtextlegenda = {
                                                code: item.code,
                                                label: item.label,
                                                tag: item.label,
                                            };
                                            this.selectedtextlegenda = item.label;
                                        }

                                    });
                                }
                            }
                            $('#costumModalLegendaData').modal('show');
                            this.halamanloading = false;
                        })
                        .catch(error => {
                            $('#costumModalLegendaData').modal('show');
                            this.halamanloading = false;
                        });


                } catch (error) {
                    console.log(error);
                    this.halamanloading = false;
                }
                //link luar
            }
            else {
                //link dalam
                this.halamanloading = true;
                try {
                    fetch(this.linknya + linkgeojson)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error');
                            }
                            return response.json(); // Parses the JSON response into a JavaScript object
                        })
                        .then(data => {
                            //console.log(data); // Work with the parsed JSON data
                            //alert(JSON.stringify(data.features));
                            var geoJsonData = data.features;
                            var features = geoJsonData;
                            //alert(features.length);
                            this.datakeytabel = [];
                            this.datavaluetabel = [];
                            this.textlegenda = [];
                            this.kolomlegenda = [];
                            features.forEach(feature => {
                                this.halamanloading = true;
                                var properties = feature.properties;
                                var objectKeys = Object.keys(properties);
                                objectKeys.forEach(judul => {
                                    this.datakeytabel.push(judul);
                                });
                                //console.log(objectKeys); // Key Array
                                //console.log(properties); // Access specific property by name
                                this.datavaluetabel.push(properties);
                                this.halamanloading = false;
                                //console.log(this.datavaluetabel);
                            });
                            this.halamanloading = true;
                            this.datakeytabelunique = [...new Set(this.datakeytabel)];
                            if ((tipepetanya == '4') || (tipepetanya == '5') || (tipepetanya == '6')) {
                                var i = 1;
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                    if ((item == 'fill') || (item == 'stroke') || (item == 'gambar')) {
                                        this.kolomlegenda.push({
                                            label: item,
                                            code: i,
                                            tag: item,
                                        });
                                        i++;
                                    }
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '1')) {
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Polygon',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Polygon',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '2')) {
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Point',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Point',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '3')) {
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Line',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Line',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                            }
                            if ((tipepetanya == '7')) {
                                this.datakeytabelunique.forEach((item) => {
                                    this.textlegenda.push({
                                        label: item,
                                        code: this.datakeytabelunique.indexOf(item) + 1,
                                        tag: item,
                                    });
                                });
                                this.kolomlegenda.push({
                                    label: 'Sesuai Pengaturan Radius',
                                    code: i,
                                    tag: 'Sesuai Pengaturan Radius',
                                });
                                this.kolomlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });
                                this.textlegenda.unshift({
                                    label: 'Pilih Salah Satu',
                                    code: 0,
                                    tag: '',
                                });


                            }

                            if (this.legendapeta == []) {
                            }
                            else {
                                for (var i = 0; i < 1; i++) {

                                    this.kolomlegenda.forEach((item) => {
                                        if (this.legendapeta[i].keterangan == item.label) {
                                            this.defaultSelectedkolomlegenda = {
                                                code: item.code,
                                                label: item.label,
                                                tag: item.label,
                                            };
                                            this.selectedkolomlegenda = item.label;
                                        }

                                    });
                                    this.textlegenda.forEach((item) => {
                                        if (this.legendapeta[i].keteranganisian == item.label) {
                                            this.defaultSelectedtextlegenda = {
                                                code: item.code,
                                                label: item.label,
                                                tag: item.label,
                                            };
                                            this.selectedtextlegenda = item.label;
                                        }

                                    });
                                }
                            }
                            $('#costumModalLegendaData').modal('show');
                            this.halamanloading = false;
                        })
                        .catch(error => {
                            $('#costumModalLegendaData').modal('show');
                            this.halamanloading = false;
                        });
                } catch (error) {
                    console.log(error);
                    this.halamanloading = false;
                }
                //link dalam
            }

        },
        lihatnode() {
            try {
                var temp = document.getElementById('kode').value.split('|');
                this.judullayer = temp[4];
                this.namaapipeta = temp[10];
                this.namaasalpeta = temp[8];
                this.namatipepeta = temp[13];
                this.loadpeta();
                $('#costumModaldetailpeta').modal('show');
            } catch (error) {

            }
        },
        prosesnode() {
            if (document.getElementById('operation').value == 'tambah') {
                var temp = document.getElementById('kode').value.split('|');
                if (temp[6] == '2') {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Data ini merupakan layer silahkan menambah melalui level atasnya',
                    });
                    return false;
                }
                else {
                    this.id = null;
                    this.id_parent = temp[2];
                    this.level = temp[1];
                    this.urut = '';
                    this.nama = '';
                    this.defaultSelectedjenismenu = {
                        code: 0,
                        label: 'Pilih Salah Satu',
                        tag: '',
                    };
                    this.selectedjenismenu = '';
                    this.defaultSelectedasalpeta = {
                        code: 0,
                        label: 'Pilih Salah Satu',
                        tag: '',
                    };
                    this.selectedasalpeta = '';
                    this.defaultSelectedapipeta = {
                        code: 0,
                        label: 'Tidak Ada',
                        tag: '',
                    };
                    this.selectedapipeta = '';
                    this.filenya_peta = '';
                    document.getElementById('filenya_peta').value = '';

                    this.defaultSelectedTipePeta = {
                        code: 0,
                        label: 'Pilih Salah Satu',
                        tag: '',
                    };
                    this.selectedtipepeta = '';

                    this.fill = '#00BFFF';
                    this.stroke = '#000000';
                    this.fill_width = '1';
                    this.stroke_width = '1';
                    this.dash_start = '1';
                    this.dash_end = '1';
                    this.filenya_ikon = '';

                    this.defaultSelectedTipeFill = {
                        code: 0,
                        label: 'Pilih Salah Satu',
                        tag: '',
                    };
                    this.selectedtipe_fill = 1;

                    this.defaultSelectedTipePattern = {
                        code: 0,
                        label: 'Pilih Salah Satu',
                        tag: '',
                    };
                    this.selectedtipe_pattern = 1;
                    this.defaultSelectedStatusTampil = {
                        code: 0,
                        label: 'Pilih Salah Satu',
                        tag: '',
                    };
                    this.selectedtampilpublik = '';
                    this.sudut = '0';
                    this.urutindex = '1';
                    this.latitude = '0';
                    this.longitude = '0';
                    this.zoom = '0';
                    this.radius = '0';
                    this.kolomfilter = '';
                    this.textfilter = '';
                }
            }
            else if (document.getElementById('operation').value == 'edit') {
                var temp = document.getElementById('kode').value.split('|');
                this.id = temp[0];
                this.level = temp[1];
                this.id_parent = temp[2];
                this.urut = temp[3];
                this.nama = temp[4];
                this.defaultSelectedjenismenu = {
                    code: temp[5],
                    label: temp[6],
                    tag: temp[5],
                };
                this.selectedjenismenu = temp[5];
                this.defaultSelectedasalpeta = {
                    code: temp[7],
                    label: temp[8],
                    tag: temp[7],
                };
                this.selectedasalpeta = temp[7];
                this.defaultSelectedapipeta = {
                    code: temp[9],
                    label: temp[10],
                    tag: temp[9],
                };
                this.selectedapipeta = temp[9];
                this.filenya_peta = temp[11];
                document.getElementById('filenya_peta').value = temp[11];

                this.defaultSelectedTipePeta = {
                    code: temp[12],
                    label: temp[13],
                    tag: temp[12],
                };
                this.selectedtipepeta = temp[12];

                this.fill = temp[14];
                this.stroke = temp[15];
                this.fill_width = temp[16];
                this.stroke_width = temp[17];
                this.dash_start = temp[18];
                this.dash_end = temp[19];
                this.filenya_ikon = temp[20];
                document.getElementById('filenya_ikon').value = temp[20];

                this.defaultSelectedTipeFill = {
                    code: temp[21],
                    label: temp[22],
                    tag: temp[21],
                };
                this.selectedtipe_fill = temp[21];

                this.defaultSelectedTipePattern = {
                    code: temp[23],
                    label: temp[24],
                    tag: temp[23],
                };
                this.selectedtipe_pattern = temp[23];
                this.sudut = temp[25];
                this.urutindex = temp[26];
                this.latitude = temp[27];
                this.longitude = temp[28];
                this.zoom = temp[29];
                this.radius = temp[30];
                this.kolomfilter = temp[31];
                this.textfilter = temp[32];
                this.defaultSelectedStatusTampil = {
                    code: temp[33],
                    label: temp[34],
                    tag: temp[33],
                };
                this.selectedtampilpublik = temp[33];
            }
            else {
                var temp = document.getElementById('kode').value.split('|');
                this.id = temp[0];
                swal.fire({
                    title: "Konfirmasi",
                    text: "Yakin Hendak Hapus Data?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Batal",
                    confirmButtonColor: "#15B9D9",
                    cancelButtonColor: "#ffaa05",
                    confirmButtonText: "Hapus"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const data = { kode: this.id, deletedby: JSON.parse(localStorage.getItem("usistem")) }
                        const mainAPI = axios.create({
                            baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        });
                        mainAPI.post("parastapainnovation_adminpeta-DeleteLayerPeta", data).then(
                            Response => {
                                if (Response.data.response == 'error') {
                                    swal.fire('Peringatan', Response.data.message, 'error');
                                }
                                else {
                                    swal.fire('Informasi', 'Data telah dihapus..', 'success').then(function () {
                                        window.location.replace("/LayerPeta");
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
            }
            $('#costumModalpeta').modal('show');
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
            fd.append("project_id", this.project_id);
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
                fd.append("project_id", this.project_id);
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
            fd.append("project_id", this.project_id);
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
        validasidata() {
            if (document.getElementById('nama').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('nama').focus();
                return false;
            }
            if (document.getElementById('urut').value == '') {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Mohon Isikan Data',
                });
                document.getElementById('urut').focus();
                return false;
            }
            if ((this.selectedjenismenu == '') || (this.selectedjenismenu === null) || (this.selectedjenismenu === undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Pilih Jenis Menu..',
                });
                return false;
            }
            if (this.selectedjenismenu == '2') {
                if ((this.selectedasalpeta == '') || (this.selectedasalpeta === null) || (this.selectedasalpeta === undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Pilih Sumber Peta..',
                    });
                    return false;
                }
            }
            if (this.selectedasalpeta == '2') {
                if ((this.selectedapipeta == '') || (this.selectedapipeta === null) || (this.selectedapipeta === undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Pilih API Peta..',
                    });
                    return false;
                }
            }
            if (this.selectedasalpeta == '1') {
                if ((document.getElementById('filenya_peta').value == '') || (document.getElementById('filenya_peta').value === null) || (document.getElementById('filenya_peta').value === undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Isikan File Geojson..',
                    });
                    return false;
                }
            }
            if (this.selectedjenismenu == '2') {
                if ((this.selectedtipepeta == '') || (this.selectedtipepeta === null) || (this.selectedtipepeta === undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Pilih Tipe Data Peta..',
                    });
                    return false;
                }
            }
            if ((this.selectedtipepeta == 1)) {
                if ((this.selectedtipe_fill == '') || (this.selectedtipe_pattern == '') || (this.selectedtipe_fill === null) || (this.selectedtipe_pattern === null) || (this.selectedtipe_fill === undefined) || (this.selectedtipe_pattern === undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Pilih Tipe Fill Peta..',
                    });
                    return false;
                }
            }

            if (this.selectedtipepeta == 2) {
                if ((document.getElementById('filenya_ikon').value == '') || (document.getElementById('filenya_ikon').value === null) || (document.getElementById('filenya_ikon').value === undefined)) {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: 'Isikan Ikon Point..',
                    });
                    return false;
                }
            }
            if ((this.selectedtampilpublik == '') || (this.selectedtampilpublik === null) || (this.selectedtampilpublik === undefined)) {
                swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                }).fire({
                    icon: 'warning',
                    title: 'Pilih Jenis Tampil Data Peta..',
                });
                return false;
            }
            this.validasi = true;
            return;
        },
        updatelayer() {
            this.validasidata();
            if (this.validasi == false) {
                return false;
            }
            //alert(this.selectedapipeta);
            var fd = new FormData();
            fd.append("id", this.id);
            fd.append("id_parent", this.id_parent);
            fd.append("level", this.level);
            fd.append("nama", this.nama);
            fd.append("urut", this.urut);
            fd.append("jenis", this.selectedjenismenu);
            fd.append("asal_peta", this.selectedasalpeta);
            fd.append("api", this.selectedapipeta);
            fd.append("filenya_peta", document.getElementById('filenya_peta').value);
            fd.append("tipe_peta", this.selectedtipepeta);
            fd.append("fill", this.fill);
            fd.append("stroke", this.stroke);
            fd.append("fill_width", this.fill_width);
            fd.append("stroke_width", this.stroke_width);
            fd.append("dash_start", this.dash_start);
            fd.append("dash_end", this.dash_end);
            fd.append("filenya_ikon", document.getElementById('filenya_ikon').value);
            fd.append("tipe_fill", this.selectedtipe_fill);
            fd.append("tipe_pattern", this.selectedtipe_pattern);
            fd.append("tampilpublik", this.selectedtampilpublik);
            fd.append("sudut", this.sudut);
            fd.append("urutindex", this.urutindex);
            fd.append("latitude", this.latitude);
            fd.append("longitude", this.longitude);
            fd.append("zoom", this.zoom);
            fd.append("radius", this.radius);
            fd.append("kolomfilter", this.kolomfilter);
            fd.append("textfilter", this.textfilter);
            fd.append("updatedby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            mainAPI.post("parastapainnovation_adminpeta-UpdateLayerPeta", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: Response.data.message,
                        });
                        return false;
                    }
                    else {
                        swal.fire({
                            title: "Informasi",
                            text: Response.data.message,
                            icon: "success"
                        }).then(function () {
                            window.location.replace("/LayerPeta");
                        });
                        $('.swal2-container').css("z-index", '999999');
                    }
                }
            ).catch(
                error => {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: error,
                    });
                }
            )

        },
        simpanlayer() {
            this.validasidata();
            if (this.validasi == false) {
                return false;
            }
            var fd = new FormData();
            fd.append("id_parent", this.id_parent);
            fd.append("level", this.level);
            fd.append("nama", this.nama);
            fd.append("urut", this.urut);
            fd.append("jenis", this.selectedjenismenu);
            fd.append("asal_peta", this.selectedasalpeta);
            fd.append("api", this.selectedapipeta);
            fd.append("filenya_peta", document.getElementById('filenya_peta').value);
            fd.append("tipe_peta", this.selectedtipepeta);
            fd.append("fill", this.fill);
            fd.append("stroke", this.stroke);
            fd.append("fill_width", this.fill_width);
            fd.append("stroke_width", this.stroke_width);
            fd.append("dash_start", this.dash_start);
            fd.append("dash_end", this.dash_end);
            fd.append("filenya_ikon", document.getElementById('filenya_ikon').value);
            fd.append("tipe_fill", this.selectedtipe_fill);
            fd.append("tipe_pattern", this.selectedtipe_pattern);
            fd.append("tampilpublik", this.selectedtampilpublik);
            fd.append("sudut", this.sudut);
            fd.append("urutindex", this.urutindex);
            fd.append("latitude", this.latitude);
            fd.append("longitude", this.longitude);
            fd.append("zoom", this.zoom);
            fd.append("radius", this.radius);
            fd.append("kolomfilter", this.kolomfilter);
            fd.append("textfilter", this.textfilter);
            fd.append("createdby", JSON.parse(localStorage.getItem("usistem")));

            const mainAPI = axios.create({
                baseURL: process.env.VUE_APP_URL_API + this.tahunku + '/',
                headers: {
                    "Content-Type": "form-data",
                    Authorization: "Bearer " + localStorage.getItem("tokensistem"),
                },
            });

            mainAPI.post("parastapainnovation_adminpeta-AddLayerPeta", fd).then(
                Response => {
                    if (Response.data.response == 'error') {
                        swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        }).fire({
                            icon: 'warning',
                            title: Response.data.message,
                        });
                        return false;
                    }
                    else {
                        swal.fire({
                            title: "Informasi",
                            text: Response.data.message,
                            icon: "success"
                        }).then(function () {
                            window.location.replace("/LayerPeta");
                        });
                        $('.swal2-container').css("z-index", '999999');
                    }
                }
            ).catch(
                error => {
                    swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    }).fire({
                        icon: 'warning',
                        title: error,
                    });
                }
            )
        },
        getOtentifikasi() {
            var time = Date.parse(localStorage.getItem("tsistem"));
            var timeakhir = time + (3 * 60 * 60 * 1000);
            var timesekarang = Date.parse(new Date());
            if (timesekarang > timeakhir) {
                this.ClearlocalStorage();
            }
        },
        loadtreeview() {
            this.halamanloading = true;
            const message = this.linknya + '|parastapainnovation_adminpeta-GetLayerPeta|' + localStorage.getItem("tokensistem");
            const iframe = document.getElementById("treeview");
            this.sourcenya = '';
            this.sourcenya = '/tree.html';
            iframe.contentWindow.postMessage(message, "*");
            this.halamanloading = false;
        },
        loadpeta() {
            try {
                this.halamanloading = true;
                const message = this.linknya + '**' + document.getElementById('kode').value;
                const iframe = document.getElementById("maps");
                this.sourcenyapeta = '';
                this.sourcenyapeta = '/map.html';
                iframe.contentWindow.postMessage(message, "*");
                this.halamanloading = false;
            } catch (error) {

            }
        },
    },
    mounted() {
        this.getOtentifikasi();
        this.AmbilDataReff();
    }
}
</script>
<style></style>