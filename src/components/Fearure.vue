<template>
    <div>
      <h5 class="my-3">الميزة {{ `#${featNum}` }}</h5>
      <v-form>
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
              v-model="isFeatDataExist.titleEn"
              :rules="title_content.title"
              outlined
              label="العنوان الانجليزى"
              required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
              v-model="isFeatDataExist.titleAr"
              :rules="title_content.title"
              outlined
              label="العنوان العربى"
              required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-textarea
                v-model="isFeatDataExist.descriptionEn"
                :rules="title_content.content"
                outlined
                no-resize
                name="input-7-4"
                label="المحتوى الانجليزى"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-textarea
                v-model="isFeatDataExist.descriptionAr"
                :rules="title_content.content"
                outlined
                no-resize
                name="input-7-4"
                label="المحتوى العربى"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="isFeatDataExist.icon" label="أيقونة الميزة" outlined></v-text-field>
            </v-col>
            <!-- <v-col cols="12">
              <div class="icons_wrapper">
                <v-btn depressed v-for="icon in icons.iconsArr" :key="icon.id">
                  <v-icon>{{ "mdi-" + icon.name }}</v-icon>
                </v-btn>
              </div>
            </v-col> -->
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
      },
      featData: {
        type: Object,
        required: false
      }
    },
    data: () => ({
      icons: [],
      valid: false,
      featuresData:{
        titleEn: '',
        titleAr: '',
        descriptionEn: '',
        descriptionAr: '',
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
      },
      featData:{
        handler(){
          this.$emit('featDataPropChanged')
        },
        deep: true
      },

    },
    computed: {
      isFeatDataExist(){
        return this.featData ? this.featData : this.featuresData
      }
    },
  }
</script>

<style>
.icons_wrapper {
  max-height: 400px; 
}
</style>