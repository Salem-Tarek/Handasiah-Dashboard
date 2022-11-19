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
        companiesImages:[],
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
    }
}
</script>

<style>

</style>