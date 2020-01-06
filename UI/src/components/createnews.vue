<template>
  <div>
      <div>{{output}}</div>
      <div id="createnews" class="createnews">
        <div class="primary">
            <input v-model="cmpid" v-on:change="newsDataChanged" name="cmpid" type="text" placeholder="cmpid">
            <div class="secondary" v-if="cmpid.length > 7">
            <input v-model="tracking" name="tracking" type="text" placeholder="tracking">
            <input v-model="date" name="date" type="text" placeholder="date">
            <input v-if="lang" v-model="lang" name="lang" type="text" placeholder="lang">
        </div>
        </div>
        
        <div class="secondary" v-if="cmpid.length > 7">
            <input v-model="preheader_text" name="preheader_text" type="text" placeholder="preheader text">
            <input v-model="preheader_link" name="preheader_link" type="text" placeholder="preheader link">
            <input v-model="subject" name="subject" type="text" placeholder="subject">
            <input v-model="ml" name="ml" type="text" placeholder="ML">
        </div>
        <div><a v-on:click="submitData2Api" class="fas fa-angle-double-right next cur-unavailable"></a></div>  
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
    data() {
        return {
        cmpid: 'nl_test_20190101',
        date: '',
        preheader_text: '',
        preheader_link: this.baseURL,
        subject: '',
        ml: '',
        tracking: '',
        lang: '',
        week: '',
        output: '',
        cwd: 'C:\www'
        };
    },
    methods: {
        newsDataChanged () {
            this.tracking = this.cmpid;
            var mycmpidarr = this.cmpid.split('_');
                if(mycmpidarr.length==3){
                this.date = mycmpidarr[2];
                }
                if(mycmpidarr.length==4){
                this.date = mycmpidarr[3];
                this.lang = mycmpidarr[2];
                }
            this.week = this.getWeek(this.date);
            this.$emit('newsDataChange', this.$data);
        },
        getWeek (rawdate) {
            if (rawdate.length == '8') {
            var year = parseInt(rawdate.slice(0, 4));
            var month = parseInt(rawdate.slice(4, 6));
            var date = parseInt(rawdate.slice(6, 8));
            var thatDay = new Date(year, month-1, date);
            var dateReset = new Date(thatDay.getFullYear(), 0, 1);
            var week = Math.ceil((((thatDay - dateReset) / 86400000) + dateReset.getDay() + 1) / 7);
                if(week<10){
                    return '0' + week;
                } else {
                    return week;
                }
            }
            return new Error("Need to be in the format: YYYYMMDD !");
        },
        submitData2Api () {
            console.log("fileman clicked");
            let api1res = this;
            let data = {
                dir: this.cwd
            };
            let axiosConfig = {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                }
            };
            this.axios.post('http://127.0.0.1:3000/getpath', data, axiosConfig)
            .then(function (response) {
                api1res.output = response.data;
            })
            .catch(function (error) {
                api1res.output = error;
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log("Err1:"+error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Err2:', error.message);
                }
                console.log('Err3:',error.config);
            });
        },
    },
    props: {
        baseURL: {
            type: String,
        }
    }
};
</script>
<style lang="scss" scoped>
    .next {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        position: absolute;
        top: -70px;
        width: 55px;
        height: 55px;
        background-color: #3498db;
        border-radius: 50%;
        cursor: pointer;
        cursor: url('/assets/cursors/help.cur'), pointer;

        &:hover {
            background-color: #FFFFFF;
            width: 55.5px;
            height: 55.5px;
            transition: ease 0.5s;
            border: 1px solid #3498db;
        }
    }
    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.createnews {
        margin: 100px 0 50px 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        position: relative;

        .primary, .secondary {
            display: flex;
            flex-direction: column;
            transition: display ease 1s;
        }

        input {
            border: 1px solid #2c3e50;
            padding-left: 5px;
            height: 40px;
            width: 250px;
            margin-bottom: 5px;
            border-radius: 5px;
            margin: 5px;
            position: relative;
        }
    }
</style>
