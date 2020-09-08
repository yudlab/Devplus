<template>
    <div>
      <!--pre class="debug">{{a}}</pre-->
        <div id="createnews" class="createnews animated fadeIn delay-1s">
            <div class="itm1">
              <a class="path"
                v-if="cpd"
                @click="openExplorer(cpd)">Will be saved in:<br>{{cpd}}</a>
                <div class="primary">
                  <select class="pid-select"
                          v-model="a"
                          >
                    <option v-for="pid in pids"
                            v-bind:key="pid.id"
                            v-bind:value="pid">{{pid.name}}
                    </option>
                  </select>
                  <select class="pid-select nltype-select"
                    v-if="a.newsletterTypes"
                    v-model="newsletterType"
                    :disabled="Object.keys(this.a.newsletterTypes).length==1">
                    <option v-for="nlType in a.newsletterTypes"
                            v-bind:key="nlType.path"
                            v-bind:value="nlType">{{nlType.path}}
                    </option>
                  </select>
                  <input id="cmpid"
                          v-model.lazy="cmpid"
                          name="cmpid"
                          type="text"
                          placeholder="cmpid">
                  <div class="secondary" v-if="cmpid.length > 7">
                      <input v-model="tracking" name="tracking" type="text" placeholder="tracking">
                      <input v-model="trackingLink" name="trackingLink" type="text" placeholder="trackingLink">
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
                <div>
                    <a @click="submit()"
                       id="submitnews"
                       v-bind:class="{ disabled: folderAvailable === false }"
                       class="fas fa-angle-double-right next"></a>
                    <div
                        id="projectStatus"
                        class="animated rotateInUpRight delay-.5s"
                        @click="clearMsg"></div>
                </div>
            </div>
            <table>
              <tr>
                <td>preheader text</td>
                <td>- {{preheader_text}}</td>
              </tr>
              <tr>
                <td>preheader link</td>
                <td>- {{preheader_link}}</td>
              </tr>
              <tr>
                <td>cmpid</td>
                <td>- {{cmpid}}</td>
              </tr>
              <tr>
                <td>cpd</td>
                <td>- {{cpd}}</td>
              </tr>
              <tr>
                <td>subject</td>
                <td>- {{subject}}</td>
              </tr>
              <tr>
                <td>ml</td>
                <td>- {{ml}}</td>
              </tr>
              <tr>
                <td>week / date</td>
                <td>- {{week}} / {{date}}</td>
              </tr>
              <tr>
                <td>tracking</td>
                <td>- {{tracking}}</td>
              </tr>
              <tr>
                <td>trackingLink</td>
                <td>- {{trackingLink}}</td>
              </tr>
              <tr>
                <td>newsletterType</td>
                <td>- {{newsletterType.path}}</td>
              </tr>
              <tr>
                <td>templateSrc</td>
                <td>- {{templateSrc}}</td>
              </tr>
            </table>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
// import qs from 'qs';
export default {
  data() {
    return {
      cmpid: 'nl_test_20200101',
      currentPid: '',
      date: '',
      preheader_text: '***preheader text***',
      preheader_link: '',
      subject: '***subject***',
      ml: '*mention legales .....',
      tracking: '',
      trackingLink: '',
      lang: '',
      week: '',
      folderAvailable: true,
      cpd: '',
      newsletterType: '',
      templateSrc: '',
      pids: 'need fetch...',
      a: 'need fetch...',
      obj: {},
    };
  },
  methods: {
    init() {
      console.clear()
      this.msg('Hello 🎉🎉🎉')
      console.log("I'd be happy for any of your suggestions ^^")
    },
    getWeek(rawdate) {
      rawdate = rawdate
      if ( rawdate.length>4 && rawdate.length == '8' ) {
        const year = parseInt(rawdate.slice(0, 4))
        const month = parseInt(rawdate.slice(4, 6))
        const date = parseInt(rawdate.slice(6, 8))
        const thatDay = new Date(year, month - 1, date)
        const dateReset = new Date(thatDay.getFullYear(), 0, 1)
        const week = Math.ceil((((thatDay - dateReset) / 86400000) + dateReset.getDay() + 1) / 7)
        if (week < 10) {
          return `0${week}`
        }
        return week
      }
      this.msg("Date is invalid. Actual date was suggested instead.")
      return this.getDate()
    },
    msg(e){
        if($('#projectStatus').css('display')=='none'){$('#projectStatus').css('display', 'flex')}
        $('#projectStatus').html(e)
    },
    sanitize(e) {
        var regexp = /(<|>|:|"|\/|\\|\||\?|\*| |')/gi;
        return e.replace(regexp, "")
    },
    scanDir(dir) {
      var _this = this
      if (dir) {
        $.ajax({
          type: 'POST',
          // make sure you respect the same origin policy with this url:
          // http://en.wikipedia.org/wiki/Same_origin_policy
          url: 'http://127.0.0.1:3000/getpath',
          data: {
            dir,
          },
          success(msg) {
            console.log('Res from AJAX: ', msg)
            console.log('dir @ scanDir(dir): ', dir)
            console.log(msg)
            _this.msg(msg)
            //should be '[]' or -4058
            if (msg=='[]' || msg=='-4058') {
              $('#cmpid').removeClass('na').addClass('ok')
            } else {
              $('#cmpid').removeClass('ok').addClass('na')
            }
          },
        })
      } else {
        this.msg('No path defined @ scanDir().')
      }
    },
    submit() {
      var _this = this
      if (typeof this.a.id != '') {
        $.ajax({
          type: 'POST',
          // make sure you respect the same origin policy with this url:
          // http://en.wikipedia.org/wiki/Same_origin_policy
          url: 'http://127.0.0.1:3000/submit-news',
          contentType: 'application/json',
          data: JSON.stringify({
            data: {
              templateSrc: this.templateSrc,
              newsletterType: this.newsletterType.path,
              tracking: this.tracking,
              nlWorkingDir: this.a.nlWorkingDir,
              cpd: this.cpd,
              trackingLink: this.trackingLink,
              trackingLinkSplio: this.trackingLink + "_$origin$_$suborigin$&tk=$token$",
              preheader: this.preheader_text,
              preheaderLink: this.preheader_link,
              subject: this.subject,
              ml: this.ml,
              week: this.week
            },
          }),
          success(msg) {
            console.log('From AJAX @subimt->res : ', msg)
            $('#projectStatus').html(msg)
          },
        })
      } else {
        _this.msg('Invalid data. Check console.')
        console.error('Invalid data: this.a != Object \n'+ this.a)
      }
    },
    clearMsg() {
      setTimeout(() => {
        $('#projectStatus').addClass('animated fadeOut delay-2s')
      }, 2000)
      $('#projectStatus').css('display', 'none')
      $('#projectStatus').html('')
    },
    getDate(){
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth()+1 
        var yyyy = today.getFullYear()
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        } 
        return dd+mm+yyyy
    },
    fsCopy() {
      console.log("this.cpd-> ", this.cpd)
      console.log("this.a.templateRoot-> ", this.a.templateRoot)
      if (this.cpd !== '' && this.a.templateRoot !=='') {
        $.ajax({
          type: 'POST',
          url: 'http://127.0.0.1:3000/fs-copy',
          contentType: 'application/json',
          data: JSON.stringify({
            data: {
              from: this.a.templateRoot,
              to: this.cpd
            },
          }),
          success(msg) {
            console.log('From AJAX @fs-copy->res : ', msg)
            if (msg == 'OK') {
              $('#cmpid').removeClass('ok')
              $('#cmpid').addClass('created')
              $('#projectStatus').html("Files were generated.")
            } else {
              $('#cmpid').removeClass('ok')
              $('#cmpid').addClass('na')
              $('#projectStatus').html(msg)
            }
          },
        })
      } else {
        //console.log('error copy @ this.a.templateRoot-->  ', this.a.templateRoot)
      }
    },
    openExplorer(e) {
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3000/open',
        contentType: 'application/json',
        data: JSON.stringify({
          data: {
            cwd: e,
          },
        }),
        success(msg) {
          console.log('From AJAX @subimt->res : ', msg);
          if (msg == '202') {
            $('#cmpid').removeClass('ok');
            $('#cmpid').addClass('created');
          } else {
            $('#cmpid').removeClass('ok');
            $('#cmpid').addClass('na');
          }
        },
      });
    },
  },
  props: {
  },
  created() {
    axios
      .get('http://127.0.0.1:3000/pids')
      .then((res) => {
        this.pids = res.data;
      });
  },
  watch: {
    a() {
      //alert(this.a.newsletterTypes[Object.keys(this.a.newsletterTypes)])
      if(Object.keys(this.a.newsletterTypes).length==1){
        this.newsletterType = this.a.newsletterTypes[Object.keys(this.a.newsletterTypes)]
      }
      this.preheader_link = this.a.baseURL
    },
    cmpid() {
      this.cmpid = this.sanitize(this.cmpid)
      this.tracking = this.cmpid.replace(/\s/gmui, "")
      const mycmpidarr = this.cmpid.split('_')
      if (mycmpidarr.length == 3) {
        this.date = mycmpidarr[2]
      } else if (mycmpidarr.length == 4) {
        this.date = mycmpidarr[3]
        this.lang = mycmpidarr[2]
      } else {
        alert('Invalid date.')
      }
      this.week = this.getWeek(this.date)
      const path = `${this.a.nlWorkingDir}S${this.week+'\\'+this.cmpid}`
      this.cpd = path
      this.scanDir(path)
      this.templateSrc = this.a.templateRoot+this.newsletterType.path
    },
    tracking() {
      this.tracking = this.tracking.replace(/\s/gmui, "")
      this.trackingLink = this.newsletterType.tracking.replace("<<<CMPID>>>", this.tracking)
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
    .debug {
      position: fixed;
      top: 100px;
      left: 50px;
      width: 400px;
      color: blue;
    }
    .pid-select {
      height: 40px;
      width: 250px;
      font-family: 'brownprolight';
      font-size: 14px;
      border: 2px solid #3498db;
      padding-left: 15px;
      height: 40px;
      margin-bottom: 5px;
      border-radius: 5px;
      margin: 5px;
      position: relative;
    }
    .pid {
      background-color: #2c3e50;
      color: #FFFFFF;
      width: 100%;
      height: 100%;
    }
    select {
      border: 2px solid #FFFFFF;
      border-radius: 5px;
      height: 48px !important;
      width: 271px !important;
    }
    .next {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        position: absolute;
        top: -18px;
        right: -27px;
        width: 55px;
        height: 55px;
        background-color: #3498db;
        border-radius: 50%;
        z-index: 1;
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
    #projectStatus{
        position: absolute;
        top: -75px;
        right: 12px;
        padding: 9px 66px 10px 21px;
        color: #34495e;
        display: none;
        align-items: center;
        justify-content: center;
        font-family: 'brownprolight';
        border: 1px solid #ecf0f1;
        border-radius: 4px;
        background-color: #ecf0f1;
        z-index: 0;
        border-bottom-left-radius: 21px;
        border-top-left-radius: 21px;
        transition: width ease 0.5s;

        &:hover {
            cursor: no-drop;
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
        border: 1px solid #ecf0f1;
        background-color: #ecf0f1;
        padding: 30px;
        border-radius: 24px;

        .itm1 {
            .path {
              color: black !important;
              cursor: pointer !important;
              position: absolute;
              top: -70px;
              text-align: left;
              width: 77%;
            }
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
                font-family: 'brownprolight';
                font-size: 14px;
                border: 2px solid #3498db;
                padding-left: 15px;
                height: 40px;
                width: 250px;
                margin-bottom: 5px;
                border-radius: 5px;
                margin: 5px;
                position: relative;
                &:focus, &:active {
                  border-color: transparent;
                }
            }
            .primary {
                padding-right: 10px;
                .ok {
                    border: 2px solid #008035 !important;
                }
                .na {
                    border: 2px solid #e74c3c !important;
                }
                .created {
                    border: 2px solid #00ff6a !important;
                }
            }
            .disabled {
                cursor: progress;
            }
        }
        table tr {

          td {
            font-family: 'brownprolight';
            color: #000000;
            font-size: 0.8rem;
            
            &:last-child  {
              color: #000000;
            }
            &:first-child {
              text-align: right;
            }
          }
        }
    }
</style>
