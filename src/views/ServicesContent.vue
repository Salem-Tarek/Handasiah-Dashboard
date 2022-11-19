<template>
  <v-container>
    <h1 class="mb-4">محتوى صفحات الخدمات</h1>
    <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-medium">
            صور الميزة
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-file-input v-model="featData.featImages" label="صور الميزة" show-size outlined chips multiple append-icon="mdi-camera"></v-file-input>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-medium">
            عنوان الميزة
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row>
                <v-col cols="12" md="6" class="pb-0">
                  <v-text-field
                    v-model="featData.title_en"
                    :rules="title_content.title"
                    outlined
                    label="العنوان الانجليزى"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                  <v-text-field
                    v-model="featData.title_ar"
                    :rules="title_content.title"
                    outlined
                    label="العنوان العربى"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-medium">
            محتوى الميزة
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row>
                <v-col cols="12" md="6" class="pb-0">
                  <v-textarea
                    v-model="featData.content_en"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="المحتوى الانجليزى"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                  <v-textarea
                    v-model="featData.content_ar"
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
            إمتيازات الشركة
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row>
                <v-col cols="12" md="6" class="pb-0">
                  <v-textarea
                    v-model="featData.Privileges_en"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="إمتيازات الشركة الانجليزى"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                  <v-textarea
                    v-model="featData.Privileges_ar"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="إمتيازات الشركة العربى"
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
export default {
  name: "ServicesContent",
  data(){
    return {
      featData:{
        featImages: [],
        title_en: '',
        title_ar: '',
        content_en: '',
        content_ar: '',
        Privileges_en: '',
        Privileges_ar: '',
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
  }
}
</script>

<style>

</style>