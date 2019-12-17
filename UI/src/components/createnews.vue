<template>
  <div class="createnews">
    <div class="primary">
        <input v-model="cmpid" v-on:change="computecmpid" name="cmpid" type="text" placeholder="cmpid">
    </div>
    <div class="secondary" v-if="cmpid.length > 7">
        <input v-model="tracking" name="tracking" type="text" placeholder="tracking">
        <input v-model="date" v-on:change="computeWeek" name="date" type="text" placeholder="date">
        <input v-if="lang" v-model="lang" name="lang" type="text" placeholder="lang">
    </div>
    <div class="secondary" v-if="cmpid.length > 7">
        <input v-model="preheader_text" name="preheader_text" type="text" placeholder="preheader text">
        <input v-model="preheader_link" name="preheader_link" type="text" placeholder="preheader link">
        <input v-model="subject" name="subject" type="text" placeholder="subject">
        <input v-model="ml" name="ml" type="text" placeholder="ML">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cmpid: 'nl_test_20191217',
      date: '',
      preheader_text: '',
      preheader_link: '',
      subject: '',
      ml: '',
      tracking: '',
      lang: '',
      weeknum: ''

    };
  },
    methods: {
        computecmpid () {
            this.tracking = this.cmpid;
            var mycmpidarr = this.cmpid.split('_');
            console.log(mycmpidarr);
            if(mycmpidarr.length==3){
            this.date = mycmpidarr[2];
            }
            if(mycmpidarr.length==4){
            this.date = mycmpidarr[3];
            this.lang = mycmpidarr[2];
            }
        },
        computeWeek () {
            this.$emit('dateChanged', getWeek(this.date));
        }
    },
    getWeek () {
            if (rawdate.length == '8') {
            var year = parseInt(rawdate.slice(0, 4));
            var month = parseInt(rawdate.slice(4, 6));
            var date = parseInt(rawdate.slice(6, 8));
            var thatDay = new Date(year, month-1, date);
            var dateReset = new Date(thatDay.getFullYear(), 0, 1);
            var week = Math.ceil((((thatDay - dateReset) / 86400000) + dateReset.getDay() + 1) / 7);
            this.weeknum = week;
            console.log(week);
            return week;
            }
            return new Error("Need to be in the format: YYYYMMDD !");
        },
};
</script>

<style lang="scss" scoped>
    .createnews {
        margin: 20px 0 0 50px;
        display: flex;
        flex-direction: row;

        .primary, .secondary {
            display: flex;
            flex-direction: column;
            margin: 5px;
        }

        input {
            border: 2px solid #3498db;
            padding-left: 5px;
            height: 35px;
            width: 200px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
    }
</style>
