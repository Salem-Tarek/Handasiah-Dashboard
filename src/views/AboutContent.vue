<template>
    <v-container>
        <h1 class="mb-4">محتوى صفحة عننا</h1>
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header class="font-weight-medium">
                  محتوى العنوان
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form>
                    <v-row>
                      <v-col cols="12" md="6" class="pb-0">
                        <v-textarea
                          v-model="aboutData.content_en"
                          :rules="title_content.content"
                          outlined
                          no-resize
                          name="input-7-4"
                          label="المحتوى الانجليزى"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" md="6" class="pb-0">
                        <v-textarea
                          v-model="aboutData.content_ar"
                          :rules="title_content.content"
                          outlined
                          no-resize
                          name="input-7-4"
                          label="المحتوى العربى"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="font-weight-medium">
                  الشهادات
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-file-input v-model="certificatesImages" label="صور الشهادات" outlined show-size chips multiple append-icon="mdi-camera"></v-file-input>
                        <template v-if="uploadedCertificatesImages.length">
                          <div class="mb-2 d-flex justify-space-between" v-for="img in uploadedCertificatesImages" :key="img.lastModified">
                            <div class="imgPreview" :style="{ 'background-image': `url(${img.url})` }"></div>
                            <div class="actions">
                              <v-icon class="red--text" @click="deleteCertificateImg(img.name)">mdi-delete</v-icon>
                            </div>
                          </div>
                        </template>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="font-weight-medium">
                  شركات تم العمل معها
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-file-input v-model="companiesImages" label="صور الشركات" outlined show-size chips multiple append-icon="mdi-camera"></v-file-input>
                        <template v-if="uploadedCompaniesImages.length">
                          <div class="mb-2 d-flex justify-space-between" v-for="img in uploadedCompaniesImages" :key="img.lastModified">
                            <div class="imgPreview" :style="{ 'background-image': `url(${img.url})` }"></div>
                            <div class="actions">
                              <v-icon class="red--text" @click="deleteCompanyImg(img.name)">mdi-delete</v-icon>
                            </div>
                          </div>
                        </template>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
// import Test from '../components/Test.vue'
export default {
    name: "AboutContent",
    components:{
      // Test
    },
    data(){
      return {
        aboutData:{
          content_en: '',
          content_ar: '',
        },
        certificatesImages:[],
        uploadedCertificatesImages:[],
        companiesImages:[],
        uploadedCompaniesImages:[],
        title_content: {
          title:[
            v => !!v || 'العنوان مطلوب',
            v => v.length <= 10 || 'Title must contain only characters',
          ],
          content:[
            v => !!v || 'المحتوى مطلوب',
            v => v.length <= 10 || 'Content must contain only characters',
          ],

        },
      }
    },
    methods:{
      getImgsWithUrl(bindingArr, outputArr){
        for(let img of bindingArr){
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            img.url = reader.result;
            outputArr.push(img)
          })
          reader.readAsDataURL(img);
        }
        bindingArr.splice(0,bindingArr.length)
        document.activeElement.blur();
      },
      deleteCompanyImg(imgName){
        this.uploadedCompaniesImages = this.uploadedCompaniesImages.filter(img => img.name !== imgName);
      },
      deleteCertificateImg(imgName){
        this.uploadedCertificatesImages = this.uploadedCertificatesImages.filter(img => img.name !== imgName);
      },
    },
    watch:{
      certificatesImages(newVal){
        if(newVal.length){
          this.getImgsWithUrl(this.certificatesImages, this.uploadedCertificatesImages)
        }
      },
      companiesImages(newVal){
        if(newVal.length){
          this.getImgsWithUrl(this.companiesImages, this.uploadedCompaniesImages)
        }
      },

    }
}
</script>

<style>

</style>