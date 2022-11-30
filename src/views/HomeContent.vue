<template>
    <v-container>
        <h1 class="mb-4">محتوى الصفحة الرئيسية</h1>
        <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-medium">
                السلايدر
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
                  المزايا
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form>
                      <v-row>
                        <v-col cols="12" md="6" class="pb-0">
                            <v-text-field
                            v-model="featuresData.title_en"
                            :rules="title_content.title"
                            outlined
                            label="العنوان الانجليزى"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                            <v-text-field
                            v-model="featuresData.title_ar"
                            :rules="title_content.title"
                            outlined
                            label="العنوان العربى"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                          <v-textarea
                            v-model="featuresData.content_en"
                            :rules="title_content.content"
                            outlined
                            no-resize
                            name="input-7-4"
                            label="المحتوى الانجليزى"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                          <v-textarea
                            v-model="featuresData.content_ar"
                            :rules="title_content.content"
                            outlined
                            no-resize
                            name="input-7-4"
                            label="المحتوى العربى"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input v-model="featuresData.icon" label="صورة الميزة" show-size outlined chips append-icon="mdi-camera"></v-file-input>
                        </v-col>
                      </v-row>
                  </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="font-weight-medium">
                  عننا
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
                  شركات تم العمل معها
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
                  محتوى الفيديو
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-textarea
                            v-model="demoData.content_en"
                            :rules="title_content.content"
                            outlined
                            no-resize
                            name="input-7-4"
                            label="المحتوى الانجليزى"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-textarea
                            v-model="demoData.content_ar"
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
        </v-expansion-panels>
    </v-container>
</template>

<script>
// import Test from '../components/Test.vue'
export default {
    name: "HomeContent",
    components:{
      // Test,
    },
    data(){
      return {
        sliderImages:[],
        uploadedSliderImages:[],
        featuresData:{
          title_en: '',
          title_ar: '',
          content_en: '',
          content_ar: '',
          icon: []
        },
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
        },
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
</style>