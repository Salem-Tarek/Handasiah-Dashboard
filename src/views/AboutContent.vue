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
                          v-model="aboutData.titleEn"
                          :rules="title_content.content"
                          outlined
                          no-resize
                          name="input-7-4"
                          label="المحتوى الانجليزى"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" md="6" class="pb-0">
                        <v-textarea
                          v-model="aboutData.titleAr"
                          :rules="title_content.content"
                          outlined
                          no-resize
                          name="input-7-4"
                          label="المحتوى العربى"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-btn color="success" @click="submitAbout()" class="noLetterSpace">حفظ محتوى العنوان</v-btn>
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
                        <v-file-input v-model="certificates.currentCertificates" label="صور الشهادات" show-size outlined multiple append-icon="mdi-camera"></v-file-input>
                        <template v-if="certificates.uploadedCertificatesImages.length">
                          <div class="mb-2 d-flex justify-space-between" v-for="img in certificates.uploadedCertificatesImages" :key="img.lastModified">
                            <div class="imgPreview" :style="{ 'background-image': `url(${img.image})` }"></div>
                            <div class="actions">
                              <v-icon class="red--text" @click="deleteCertificateImg(img)">mdi-delete</v-icon>
                            </div>
                          </div>
                        </template>
                        <v-btn color="success" @click="submitCertificatesFunc()" class="mt-3 noLetterSpace">حفظ صور الشهادات</v-btn>
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
                        <v-file-input v-model="companies.currentCompanies" label="صور الشركات" show-size outlined multiple append-icon="mdi-camera"></v-file-input>
                        <template v-if="companies.uploadedCompaniesImages.length">
                          <div class="mb-2 d-flex justify-space-between" v-for="img in companies.uploadedCompaniesImages" :key="img.lastModified">
                            <div class="imgPreview" :style="{ 'background-image': `url(${img.image})` }"></div>
                            <div class="actions">
                              <v-icon class="red--text" @click="deleteCompanyImg(img)">mdi-delete</v-icon>
                            </div>
                          </div>
                        </template>
                        <v-btn color="success" @click="submitCompaniesFunc()" class="mt-3 noLetterSpace">حفظ صور الشركات</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>

import axios from 'axios'
export default {
    name: "AboutContent",
    data(){
      return {
        aboutData:{
          titleEn: '',
          titleAr: '',
        },
        certificates:{
          currentCertificates:[],
          uploadedCertificatesImages:[],
          existImgs: [],
        },
        companies:{
          currentCompanies:[],
          uploadedCompaniesImages:[],
          existImgs: [],
        },
        title_content: {
          title:[
            v => !!v || 'العنوان مطلوب',
            // v => v.length >= 10 || 'Title must contain only characters',
          ],
          content:[
            v => !!v || 'المحتوى مطلوب',
            // v => v.length >= 10 || 'Content must contain only characters',
          ],

        },
      }
    },
    methods:{
      async getAboutPageData(){
        const res = await axios.get('/dashboard/aboutPage');
        if(res.status === 200){
          this.aboutData = res.data.data.setting;

          this.certificates.uploadedCertificatesImages = res.data.data.certificates;
          this.certificates.existImgs = res.data.data.certificates.length ? [...res.data.data.certificates] : [];

          this.companies.uploadedCompaniesImages = res.data.data.workedCompanies;
          this.companies.existImgs = res.data.data.workedCompanies.length ? [...res.data.data.workedCompanies] : [];
        }else{
          alert('There is SomeThing Wrong')
        }
      },
      getImgsWithUrl(bindingArr, outputArr, nameInLocaleStorage){
        for(let img of bindingArr){
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            outputArr.push({image: reader.result});
            // Store This Array below in both localStorage and Store
            localStorage.setItem(nameInLocaleStorage, JSON.stringify(outputArr))
          })
          reader.readAsDataURL(img);
        }
        // bindingArr.splice(0,bindingArr.length)
        document.activeElement.blur();
      },
      async submitCertificatesFunc(){
        let fd = new FormData();
        let uploadedImgs = [];
        uploadedImgs = this.certificates.existImgs.length ? [...this.certificates.existImgs, ...this.certificates.currentCertificates] : [...this.certificates.currentCertificates];

        for(let i = 0; i < uploadedImgs.length; i++){
          fd.append(`Images[${i}][image]`, uploadedImgs[i].image || uploadedImgs[i])
        }

        if(this.certificates.uploadedCertificatesImages.length > this.certificates.existImgs.length){
          const res = await axios.post('/dashboard/aboutPage/certificates/save', fd);
          console.log(res);
          if(res.status === 200){
            alert('تم حفظ صور الشهادات')
          }
        }else{
          alert('No Changes')
        }
      },
      async deleteCertificateImg(img){
        if(img.id){
          const res = await axios.post('/dashboard/aboutPage/certificates/delete', {id: img.id});
          console.log(res);
          if(res.status === 200){
            alert('تم حذف صورة الشهادة') 
            this.getAboutPageData();
          }
        }else{
          let choosedImgIndexInCertificatesImagesArr = this.certificates.uploadedCertificatesImages.length - this.certificates.existImgs.length - 1;

          this.certificates.currentCertificates.splice(choosedImgIndexInCertificatesImagesArr, 1);

          this.certificates.uploadedCertificatesImages = this.certificates.uploadedCertificatesImages.filter(file => file.image !== img.image);
        }
      },
      async submitCompaniesFunc(){
        let fd = new FormData();
        let uploadedImgs = [];
        uploadedImgs = this.companies.existImgs.length ? [...this.companies.existImgs, ...this.companies.currentCompanies] : [...this.companies.currentCompanies];

        for(let i = 0; i < uploadedImgs.length; i++){
          fd.append(`Images[${i}][image]`, uploadedImgs[i].image || uploadedImgs[i])
        }

        if(this.companies.uploadedCompaniesImages.length > this.companies.existImgs.length){
          const res = await axios.post('/dashboard/aboutPage/companie/save', fd);
          console.log(res);
          if(res.status === 200){
            alert('تم حفظ صور الشركات')
          }
        }else{
          alert('No Changes')
        }
      },
      async deleteCompanyImg(img){
        if(img.id){
          const res = await axios.post('/dashboard/aboutPage/companie/delete', {id: img.id});
          console.log(res);
          if(res.status === 200){
            alert('تم حذف صورة الشركة') 
            this.getAboutPageData();
          }
        }else{
          let choosedImgIndexInCompaniesImagesArr = this.companies.uploadedCompaniesImages.length - this.companies.existImgs.length - 1;

          this.companies.currentCompanies.splice(choosedImgIndexInCompaniesImagesArr, 1);

          this.companies.uploadedCompaniesImages = this.companies.uploadedCompaniesImages.filter(file => file.image !== img.image);
        }
      },
      async submitAbout(){
        const res = await axios.post('/dashboard/aboutPage/setting/save', this.aboutData);
        console.log(res);
        if(res.status === 200){
          alert('تم حفظ كلمات عننا بنجاح')
        }
      },
    },
    watch:{
      'certificates.currentCertificates': {
        handler(newVal){
          if(newVal.length){
            this.getImgsWithUrl(this.certificates.currentCertificates, this.certificates.uploadedCertificatesImages, 'certificatesSlider')
          }
        },
        deep: true,
      },
      'companies.currentCompanies': {
        handler(newVal){
          if(newVal.length){
            this.getImgsWithUrl(this.companies.currentCompanies, this.companies.uploadedCompaniesImages, 'companiesSlider')
          }
        },
        deep: true,
      },

    },
    async mounted(){
      this.getAboutPageData();
    }
}
</script>

<style>
.noLetterSpace {
  letter-spacing: 0 !important;
}
</style>