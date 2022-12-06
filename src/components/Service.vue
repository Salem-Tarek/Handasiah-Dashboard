<template>
    <div>
        <h3 class="mb-3">الخدمة {{ `#${serviceNum}` }}</h3>
        <v-form>
            <v-row>
                <v-col cols="12">
                    <v-file-input v-model="serviceImages" label="صور الخدمة" show-size outlined chips multiple append-icon="mdi-camera"></v-file-input>
                    <template v-if="serviceData.uploadedServiceImages.length">
                    <div class="mb-2 d-flex justify-space-between" v-for="img in serviceData.uploadedServiceImages" :key="img.lastModified">
                        <div class="imgPreview" :style="{ 'background-image': `url(${img.url})` }"></div>
                        <div class="actions">
                        <v-icon class="red--text" @click="deleteServiceImg(img.name)">mdi-delete</v-icon>
                        </div>
                    </div>
                    </template>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-text-field
                    v-model="serviceData.title_en"
                    :rules="title_content.title"
                    outlined
                    label="العنوان الانجليزى"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-text-field
                    v-model="serviceData.title_ar"
                    :rules="title_content.title"
                    outlined
                    label="العنوان العربى"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-textarea
                    v-model="serviceData.content_en"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="المحتوى الانجليزى"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-textarea                    
                    v-model="serviceData.content_ar"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="المحتوى العربى"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-textarea                   
                    v-model="serviceData.Privileges_en"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="إمتيازات الشركة الانجليزى"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-textarea                  
                    v-model="serviceData.Privileges_ar"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="إمتيازات الشركة العربى"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    name: "Service",
    props:{
      serviceNum: {
        type: Number,
      }
    },
    data(){
        return {
            serviceImages: [],
            serviceData:{
                uploadedServiceImages: [],
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
                ],
                content:[
                    v => !!v || 'المحتوى مطلوب',
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
            // Images Uploaded Array Not showing 
            // let test = [...outputArr]
            // console.log(test);
            document.activeElement.blur();
        },
        deleteServiceImg(imgName){
            this.serviceData.uploadedServiceImages = this.serviceData.uploadedServiceImages.filter(img => img.name !== imgName);
        },  
    },
    watch:{
        serviceImages(newVal){
            if(newVal.length){
                this.getImgsWithUrl(this.serviceImages, this.serviceData.uploadedServiceImages)
            }
        },
        serviceData:{
            handler(){
                this.$emit('serviceDataChanged')
            },
            deep: true
        }
    },
}
</script>

<style>

</style>