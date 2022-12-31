import axios from "axios"
const state = {
    sliderImgs: [],
    features: [],
    aboutUs: {},
    companiesImgs: [],
    videoDemo: {}
}

const getters = {

}


const actions = {
    async submitSliderImgs({commit}, payload){
        console.log(payload)

        let formData = new FormData();
        
        for(let i = 0 ; i < payload.length ; i++){
            formData.append(`image`, payload[i])
        }
        
        const res = await axios.post('/dashboard/homePage/slider/save', {
            data: {Images: payload},
        });
        commit('submitSliderImgs', payload)
        console.log(res);
    }
    
}


const mutations = {
    submitSliderImgs(state, payload){
        state.sliderImgs = payload;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}