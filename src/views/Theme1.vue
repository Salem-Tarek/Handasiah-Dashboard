<template>
  <div class="theme1 grey lighten-3">
    <v-container>
      <span class="display-2 mb-3">Dashboard</span>
      <v-row class="my-2">
        <v-col cols="6" lg="3" sm="6" class="pa-2">
          <v-card color="primary white--text">
            <div class="py-5 px-3 card-content d-flex justify-center justify-sm-space-between">
              <v-card-title class="d-flex flex-column">
                <span class="display-1 mb-2">15</span>
                <span class="body-2 font-weight-black white--text">Orders</span>
              </v-card-title>
              <v-icon class="display-4 d-none d-sm-block">
                mdi-briefcase-outline
              </v-icon>
            </div>
            <v-card-actions class="pa-0">
              <v-btn block bottom color="blue darken-3 white--text" to="/orders">
                More Info
                <v-icon right color="white">mdi-arrow-right-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6" lg="3" sm="6" class="pa-2">
          <v-card color="success white--text">
            <div class="py-5 px-3 card-content d-flex justify-center justify-sm-space-between">
              <v-card-title class="d-flex flex-column">
                <span class="display-1 mb-2">54%</span>
                <span class="body-2 font-weight-black white--text">Bounce Rate</span>
              </v-card-title>
              <v-icon class="display-4 d-none d-sm-block">
                mdi-poll
              </v-icon>
            </div>
            <v-card-actions class="pa-0">
              <v-btn block bottom color="green darken-3 white--text">
                <span>More Info</span>
                <v-icon right color="white">mdi-arrow-right-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6" lg="3" sm="6" class="pa-2">
          <v-card color="warning white--text">
            <div class="py-5 px-3 card-content d-flex justify-center justify-sm-space-between">
              <v-card-title class="d-flex flex-column">
                <span class="display-1 mb-2">44</span>
                <span class="body-2 font-weight-black white--text">User Registrations</span>
              </v-card-title>
              <v-icon class="display-4 d-none d-sm-block">
                mdi-account-plus
              </v-icon>
            </div>
            <v-card-actions class="pa-0">
              <v-btn block bottom color="yellow darken-3 white--text">
                <span>More Info</span>
                <v-icon right color="white">mdi-arrow-right-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6" lg="3" sm="6" class="pa-2">
          <v-card color="error white--text">
            <div class="py-5 px-3 card-content d-flex justify-center justify-sm-space-between">
              <v-card-title class="d-flex flex-column">
                <span class="display-1 mb-2">65</span>
                <span class="body-2 font-weight-black white--text">Unique Visitors</span>
              </v-card-title>
              <v-icon class="display-4 d-none d-sm-block">
                mdi-chart-pie
              </v-icon>
            </div>
            <v-card-actions class="pa-0">
              <v-btn block bottom color="red darken-3 white--text">
                <span>More Info</span>
                <v-icon right color="white">mdi-arrow-right-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <span class="display-1">Graphs</span>
      <v-row class="my-1">
        <v-col cols="12" sm="6">
          <v-card>
            <Doughnut />
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <Bars />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="py-2">
            <Pie />
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="py-2">
            <LineChart />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Doughnut from '../components/chartss/Doughnut.vue';
import Bars from '../components/chartss/Bars.vue';
import Pie from '../components/chartss/Pie.vue';
import LineChart from '../components/chartss/LineChart.vue';

export default {
  name: "Theme1",
  components:{
    Doughnut,
    Bars,
    Pie,
    LineChart,
  },
};
</script>
<style scoped>
.mdi {
  opacity: 0.4;
  transition:0.5s
}

.v-card:hover .card-content .mdi {
  transform:scale(1.1) ;
}

.user-registeration {
  font-size: 0.9rem !important;
}
</style>
