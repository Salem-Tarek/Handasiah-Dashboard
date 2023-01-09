<template>
    <div>
        <h3 class="mb-3">الخدمة {{ `#${serviceNum}` }}</h3>
        <v-form>
            <v-row>
                <v-col cols="12">
                    <v-file-input v-model="services.currentServices" label="صور الخدمة" show-size outlined multiple append-icon="mdi-camera"></v-file-input>
                    <template v-if="services.uploadedServicesImages.length">
                    <div class="mb-2 d-flex justify-space-between" v-for="(img, index) in services.uploadedServicesImages" :key="img.lastModified">
                        <div class="imgPreview" :style="{ 'background-image': `url(${img.image})` }"></div>
                        <div class="actions">
                        <v-icon class="red--text" @click="deleteServiceImg(img, index)">mdi-delete</v-icon>
                        </div>
                    </div>
                    </template>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-text-field
                    v-model="isServiceDataExist.titleEn"
                    :rules="title_content.title"
                    outlined
                    label="العنوان الانجليزى"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-text-field
                    v-model="isServiceDataExist.titleAr"
                    :rules="title_content.title"
                    outlined
                    label="العنوان العربى"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-textarea
                    v-model="isServiceDataExist.descriptionEn"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="المحتوى الانجليزى"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-textarea                    
                    v-model="isServiceDataExist.descriptionAr"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="المحتوى العربى"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-text-field
                    v-model="isServiceDataExist.acceptTitleEn"
                    :rules="title_content.title"
                    outlined
                    label="العنوان الفرعى الانجليزى"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-text-field
                    v-model="isServiceDataExist.acceptTitleAr"
                    :rules="title_content.title"
                    outlined
                    label="العنوان الفرعى العربى"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-textarea                   
                    v-model="isServiceDataExist.acceptDescriptionEn"
                    :rules="title_content.content"
                    outlined
                    no-resize
                    name="input-7-4"
                    label="إمتيازات الشركة الانجليزى"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                    <v-textarea                  
                    v-model="isServiceDataExist.acceptDescriptionAr"
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
import axios from 'axios'
export default {
    name: "Service",
    props:{
      serviceNum: {
        type: Number,
      },
      serviceData: {
        type: Object,
        required: false
      }
    },
    data(){
        return {
            services:{
                currentServices: [],
                uploadedServicesImages: [],
                existImgs: [],
            },
            
            uploadedImgs: [],

            servicesData:{
                titleEn: '',
                titleAr: '',
                descriptionEn: '',
                descriptionAr: '',
                acceptTitleEn: '',
                acceptTitleAr: '',
                acceptDescriptionEn: '',
                acceptDescriptionAr: '',
                images: null,
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
        // getImgsWithUrl(bindingArr, outputArr, nameInLocaleStorage){
        //     for(let img of bindingArr){
        //     const reader = new FileReader();
        //     reader.addEventListener('load', () => {
        //         outputArr.push({image: reader.result});
        //         // Store This Array below in both localStorage and Store
        //         localStorage.setItem(nameInLocaleStorage, JSON.stringify(outputArr))
        //     })
        //     reader.readAsDataURL(img);
        //     }
        //     // bindingArr.splice(0,bindingArr.length)
        //     document.activeElement.blur();
        // },
        trackImgs(bindingArr, outputArr, nameInLocaleStorage){
            console.log(this.services.existImgs);
            alert('stop')
            for(let img of bindingArr){
                let myPromise = new Promise(function(myResolve, myReject) {
                    const reader = new FileReader();

                    reader.onload = () => {
                        if (reader.result) {
                            if(!outputArr.some(img => img.image === reader.result)){
                                myResolve({isNotExist: true, val: reader.result});
                            }
                        } else {
                            myReject("Error");
                        }
                    }
                    reader.readAsDataURL(img)
                });

                myPromise.then((vals) => {
                    if(vals.isNotExist){
                        outputArr.push({image: vals.val});
                    }
                    localStorage.setItem(nameInLocaleStorage, JSON.stringify(outputArr))
                }, (error) => {
                    console.log(error);
                })

            }
        },
        handleImages(){
            this.services.existImgs = this.services.existImgs.filter(img => Object.keys(img).length > 1);
            this.uploadedImgs =[...this.services.existImgs, ...this.services.currentServices];
            
            // this.servicesData.images = this.uploadedImgs;
            let lastServiceData = this.serviceData !== null ? Object.values(this.serviceData) : false;
            // let lastServiceData = Object.values(this.serviceData);

            let isNotProp = lastServiceData ? lastServiceData.every(val => val === '' || val === 0 || val === null) : true;
            console.log(isNotProp);

            if(isNotProp){
                this.servicesData.images = this.uploadedImgs;
            }else{
                this.serviceData.media = this.uploadedImgs;
            }
        },
        async deleteServiceImg(img, index){
            if(img.id){
                const res = await axios.post('/dashboard/servicesPage/Items/delete/image', {id: img.id});
                console.log(res);
                if(res.status === 200){
                    alert('تم حذف صورة الخدمه') 
                    this.$emit('imgDeleted')
                }
            }else{
                this.services.existImgs = this.services.existImgs.filter(img => Object.keys(img).length > 1);

                this.services.uploadedServicesImages.splice(index, 1);
                this.services.currentServices.splice(index - this.services.existImgs.length, 1);
            }
        },  
    },
    computed: {
        isServiceDataExist(){
            return this.serviceData ? this.serviceData : this.servicesData;
        }
    },
    watch:{
        'services.currentServices': {
            handler(newVal){
                console.log(this.services.existImgs);
                if(newVal.length){
                    this.trackImgs(this.services.currentServices, this.services.uploadedServicesImages, 'servicesSlider');
                    this.handleImages()
                }
            },
            deep: true,
        },
        servicesData:{
            handler(){
                this.$emit('serviceDataChanged')
            },
            deep: true
        },
        serviceData: {
           handler(){
                this.$emit('servicePropChanged')
            },
            deep: true 
        }
    },
    mounted(){
        if(this.serviceData){
            // alert('Here is')
            this.services.existImgs = this.serviceData.media;
            console.log(this.services.existImgs);
            this.services.uploadedServicesImages = this.serviceData.media;
            // console.log(this.serviceData);
        }
    },
}
</script>

<style>

</style>