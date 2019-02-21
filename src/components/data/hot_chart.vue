<template>
<div>
  <calendar-heatmap class="map" :no-data-text="a"    tooltip-unit="commits"  :endDate="endDate" :values='list' :range-color="['rgba(179, 192, 244,0.1)', 'rgba(179, 192, 244,0.4)', 'rgba(179, 192, 244,0.6)', 'rgba(179, 192, 244,0.8)', 'rgba(179, 192, 244,1)']"/>
</div>
</template>
<script>

export default {
    data() {
        return {
            endDate:'',
            a:'no data for this day'
        };
    },
    props:{
        list:{
            default:[],
            type:Array
        }
    },
    created() {
        console.log(this.list)
        var myDate = new Date();
        this.endDate = myDate.getFullYear()+'-'+(myDate.getMonth()*1+1)+'-'+myDate.getDate();  
        this.a = '12121'
    },
    mounted() {

    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.map{
    margin-top: 35px;
    width: 100%;
    padding-right:260px;
    box-sizing: border-box; 
}
</style>



