<template>
    <v-container>
        <h1 class="mb-4">محتوى الصفحة الرئيسية</h1>
        <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-medium">
                <h4>السلايدر</h4>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-file-input v-model="sliderImages" label="صور السلايدر" show-size outlined multiple append-icon="mdi-camera"></v-file-input>
                        <template v-if="uploadedSliderImages.length">
                          <div class="mb-2 d-flex justify-space-between" v-for="img in uploadedSliderImages" :key="img.lastModified">
                            <div class="imgPreview" :style="{ 'background-image': `url(${img.url})` }"></div>
                            <div class="actions">
                              <v-icon class="red--text" @click="deleteSliderImg(img.name)">mdi-delete</v-icon>
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
                  <h4>المزايا</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <template v-for="n in featsCount">
                    <Fearure @featuresDataChanged="getFeatureData()" ref="FeatureComponent" :featNum="n" :key="n" />
                  </template>
                  <v-btn depressed class="AddFeat" @click="featsCount++">أضف ميزة</v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="font-weight-medium">
                  <h4>عننا</h4>
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
                            label="عننا الانجليزى"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                          <v-textarea
                            v-model="aboutData.content_ar"
                            :rules="title_content.content"
                            outlined
                            no-resize
                            name="input-7-4"
                            label="عننا العربى"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                          <v-textarea
                            v-model="aboutData.mission_en"
                            :rules="title_content.content"
                            outlined
                            no-resize
                            name="input-7-4"
                            label="المهمة الانجليزى"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                          <v-textarea
                            v-model="aboutData.mission_ar"
                            :rules="title_content.content"
                            outlined
                            no-resize
                            name="input-7-4"
                            label="المهمة العربى"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                  </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="font-weight-medium">
                  <h4>شركات تم التعامل معها</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-file-input v-model="companiesImages" label="صور الشركات" show-size outlined chips multiple append-icon="mdi-camera"></v-file-input>
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
            <v-expansion-panel>
                <v-expansion-panel-header class="font-weight-medium">
                  <h4>محتوى الفيديو</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form>
                      <v-row>
                        <v-col cols="12" class="pb-0" md="6">
                          <v-textarea
                            v-model="demoData.content_en"
                            :rules="title_content.content"
                            outlined
                            no-resize
                            name="input-7-4"
                            label="المحتوى الانجليزى"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="pb-0" md="6">
                          <v-textarea
                            v-model="demoData.content_ar"
                            :rules="title_content.content"
                            outlined
                            no-resize
                            name="input-7-4"
                            label="المحتوى العربى"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                          v-model="demoData.link"
                          outlined
                          label="لينك الفيديو"
                          required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                  </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import Fearure from '../components/Fearure.vue'
export default {
    name: "HomeContent",
    components:{
      Fearure,
    },
    data(){
      return {
        sliderImages:[],
        uploadedSliderImages:[],
        aboutData:{
          mission_en: '',
          mission_ar: '',
          content_en: '',
          content_ar: '',
        },
        companiesImages:[],
        uploadedCompaniesImages:[],
        demoData:{
          content_en: '',
          content_ar: '',
          link: '',
        },
        title_content: {
          title:[
            v => !!v || 'العنوان مطلوب',
          ],
          content:[
            v => !!v || 'المحتوى مطلوب',
          ],

        },
        featsCount: 1,
        features: [],
      }
    },
    methods:{
      deleteSliderImg(imgName){
        this.uploadedSliderImages = this.uploadedSliderImages.filter(img => img.name !== imgName);
      },
      deleteCompanyImg(imgName){
        this.uploadedCompaniesImages = this.uploadedCompaniesImages.filter(img => img.name !== imgName);
      },
      getImgsWithUrl(bindingArr, outputArr, nameInLocaleStorage){
        for(let img of bindingArr){
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            img.url = reader.result;
            outputArr.push(img)
            console.log(reader.result);
            // Store This Array below in both localStorage and Store
            localStorage.setItem(nameInLocaleStorage, JSON.stringify(outputArr.map((img) => img.url)))
          })
          reader.readAsDataURL(img);
        }
        bindingArr.splice(0,bindingArr.length)
        document.activeElement.blur();
      },
      getFeatureData(){
        this.features = this.$refs.FeatureComponent.map((comp) => comp.$data.featuresData);
      }
    },
    watch:{
      sliderImages(newVal){
        if(newVal.length){
          this.getImgsWithUrl(this.sliderImages, this.uploadedSliderImages, 'imgSlider')
        }
      },
      companiesImages(newVal){
        if(newVal.length){
          this.getImgsWithUrl(this.companiesImages, this.uploadedCompaniesImages, 'companiesSlider')
        }
      },
    },
}
</script>

<style>
.v-text-field input {
  padding:0
}

.imgPreview {
  width: 50px;
  height: 50px;
  background-size: contain;
}

.AddFeat{
  background-color: #0057a8 !important;
  color: #FFF !important;
  letter-spacing: 0 !important;
  font-weight: bold;
}
</style>