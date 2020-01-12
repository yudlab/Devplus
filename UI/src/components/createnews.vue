<template>
    <div>
        <div id="createnews" class="createnews">
            <!--input v-model="cwd.path" v-on:change="scanDir(cwd.path)" name="path" type="text" placeholder="path"-->
            <div class="itm1">
                <div class="primary">
                    <input id="cmpid"
                           v-model.lazy="cmpid"
                           v-on:change="newsDataChanged"
                           v-bind:class="{ available: this.folderIsAvailable == 1 }"
                           name="cmpid"
                           type="text"
                           placeholder="cmpid">   
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
                <div><a v-on:click="submit()" class="fas fa-angle-double-right next cur-unavailable"></a></div>
            </div>
            <hr>
            <div id="nldata" style="display: none">{{newsdata.currentPid.baseURL}}</div>
            <hr>
            <h1 style="display: none">{{$data}}</h1>
        </div>
    </div>
</template>



<script>
// import axios from 'axios';
// import qs from 'qs';
export default {
    data() {
        return {
        cmpid: 'nl_test_20190101',
        date: '',
        preheader_text: '',
        preheader_link: "",
        subject: '',
        ml: '',
        tracking: '',
        lang: '',
        week: '',
        folderIsAvailable: false,
        newsdata: this.nldata,
        cpd: '',
        };
    },
    methods: {
        init () {
            console.log("called->f(x): init @ methods")
            console.clear()
        },
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
        scanDir (dir) {
            if(dir) {
                $.ajax({
                type: 'POST',
                // make sure you respect the same origin policy with this url:
                // http://en.wikipedia.org/wiki/Same_origin_policy
                url: 'http://127.0.0.1:3000/getpath',
                data: { 
                    'dir': dir
                },
                success: function(msg){
                   console.log("Res from AJAX: ", msg);
                   console.log("dir @ scanDir(dir): ", dir);
                   $('#cmpid-label').css('display', 'block')
                   switch(msg){
                       case '-4048':
                           console.log("No perm")
                           sessionStorage.setItem("cpd", "403");
                           $('#cmpid').removeClass('ok')
                           $('#cmpid').addClass('na')
                           return 403
                           break
                       case '-4058':
                           console.log("Not found")
                           sessionStorage.setItem("cpd", "404");
                           $('#cmpid').removeClass('na')
                           $('#cmpid').addClass('ok')
                           return 404
                           break
                       case '[]':
                           console.log("Empty")
                           sessionStorage.setItem("cpd", "204");
                           $('#cmpid').removeClass('ok')
                           $('#cmpid').addClass('na')
                           return 204
                           break
                       default:
                           console.log(msg)
                           $('#cmpid-label').css('color', '#e74c3c')
                           $('#output').html(msg)
                           sessionStorage.setItem("cpd", msg);
                           $('#cmpid').removeClass('ok')
                           $('#cmpid').addClass('na')
                           return JSON.stringify(msg)
                    }
                }})
            }
            else {
                console.log("No path defined @ scanDir().")
            }
        },
        submit (){
            if(this.newsdata!=='') {
                $.ajax({
                type: 'POST',
                // make sure you respect the same origin policy with this url:
                // http://en.wikipedia.org/wiki/Same_origin_policy
                url: 'http://127.0.0.1:3000/submit-news',
                data: { 
                    'folderData': this.cpd,
                    'newsData': this.newsdata
                },
                success: function(msg){
                   console.log("From AJAX @subimt->res : ", msg);
                   
                }})
            }
            else {
                console.log("No path defined @ scanDir().")
            }
        },
    },
    props: {
        nldata: {
            type: Object
        }
    },
    watch: {
        cmpid: function (){
            console.log("cmpid changed.")
            this.folderIsAvailable = false
            this.preheader_link = this.newsdata.currentPid.baseURL
            var path = this.newsdata.currentPid.nlWorkingDir + 'S' + this.week + '\\' + this.cmpid
            console.log("Path-> ", path)
            this.scanDir(path)
            this.cpd = path;
        }
    },
    mounted(){
        this.init()
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
        flex-direction: column;
        justify-content: flex-start;
        position: relative;

        .itm1 {
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            transition: display ease 1s;

            .primary, .secondary {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
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
            .primary {
                .ok {
                    border: 2px solid #2ecc71;
                }
                .na {
                    border: 2px solid #e74c3c;
                }
            }
        }
    }
</style>
