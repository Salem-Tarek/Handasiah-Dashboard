<template>
    <div>
      <h5 class="mb-3">الميزة {{ `#${featNum}` }}</h5>
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
              <v-text-field v-model="featuresData.icon" label="أيقونة الميزة" outlined></v-text-field>
            </v-col>
          </v-row>
      </v-form>
    </div>
</template>

<script>
  export default {
    name:"Fearure",
    props:{
      featNum: {
        type: Number,
      }
    },
    data: () => ({
      valid: false,
      featuresData:{
        title_en: '',
        title_ar: '',
        content_en: '',
        content_ar: '',
        icon: ''
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
    }),
    watch:{
      featuresData:{
        handler(){
            this.$emit('featuresDataChanged')
        },
        deep: true
      }
    }
  }
</script>

<style>

</style>