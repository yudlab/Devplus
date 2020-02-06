<template>
    <div>
        <div id="createnews" class="createnews animated fadeIn delay-1s">
            <!--input v-model="cwd.path" v-on:change="scanDir(cwd.path)" name="path" type="text" placeholder="path"-->
            <div class="itm1">
                <div class="primary">
                    <input id="cmpid"
                           v-model.lazy="cmpid"
                           v-on:change="newsDataChanged"
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
            <div id="nldata" style="display: none">{{newsdata.currentPid.baseURL}}</div>
            <!--<table>
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
            </table>-->
            {{nldata.currentPid.templateRoot}}
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
      preheader_link: '',
      subject: '',
      ml: '',
      tracking: '',
      lang: '',
      week: '',
      folderAvailable: true,
      newsdata: this.nldata,
      cpd: '',
    };
  },
  methods: {
    init() {
      console.clear()
      this.msg('Hello 🎉🎉🎉')
      console.log("I'd be happy for any of your suggestions ^^")
    },
    newsDataChanged() {
      this.tracking = this.cmpid
      const mycmpidarr = this.cmpid.split('_')
      if (mycmpidarr.length == 3) {
        this.date = mycmpidarr[2]
      } else if (mycmpidarr.length == 4) {
        this.date = mycmpidarr[3]
        this.lang = mycmpidarr[2]
      } else {
        console.log('Invalid date.')
        return
      }
      this.week = this.getWeek(this.date)
      this.$emit('newsDataChange', this.$data)
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
            $('#projectStatus').html(msg)
            $('#projectStatus').css('display', 'flex')
            console.log('dir @ scanDir(dir): ', dir)
            $('#cmpid-label').css('display', 'block')
            switch (msg) {
              case '-4048':
                console.log('No perm')
                sessionStorage.setItem('cpd', '403')
                $('#cmpid').removeClass('ok')
                $('#cmpid').addClass('na')
                return 403
                break
              case '-4058':
                console.log('Not found')
                sessionStorage.setItem('cpd', '404')
                $('#cmpid').removeClass('na')
                $('#cmpid').addClass('ok')
                return 404
                break
              case '[]':
                console.log('Empty')
                sessionStorage.setItem('cpd', '204')
                $('#cmpid').removeClass('ok')
                $('#cmpid').addClass('na')
                return 204
                break
              default:
                console.log(msg)
                $('#cmpid-label').css('color', '#e74c3c')
                $('#output').html(msg)
                sessionStorage.setItem('cpd', msg)
                $('#cmpid').removeClass('ok')
                $('#cmpid').addClass('na')
                return JSON.stringify(msg)
            }
          },
        })
      } else {
        this.msg('No path defined @ scanDir().')
      }
    },
    submit() {
      var _this = this
      if (this.newsdata !== '') {
        if (sessionStorage.getItem('task-status') === 'pending') {
          this.msg('A task is already running...')
          if(sessionStorage.getItem('task-msg') !==null || sessionStorage.getItem('task-msg') !=='') {
            setTimeout(() => {
            this.msg(sessionStorage.getItem('task-msg'))
            }, 3000)
          }
          return
        }
        $.ajax({
          type: 'POST',
          // make sure you respect the same origin policy with this url:
          // http://en.wikipedia.org/wiki/Same_origin_policy
          url: 'http://127.0.0.1:3000/submit-news',
          contentType: 'application/json',
          data: JSON.stringify({
            data: {
              folderData: this.cpd,
              newsData: this.newsdata,
              week: this.week,
            },
          }),
          success(msg) {
            console.log('From AJAX @subimt->res : ', msg)
            setTimeout(() => {
              $('#projectStatus').html(msg)
            }, 2000)
            $('#projectStatus').css('display', 'flex')
            if (msg == 'OK') {
              _this.fsCopy()
              $('#cmpid').removeClass('ok')
              $('#cmpid').addClass('created')
            } else {
              $('#cmpid').removeClass('ok')
              $('#cmpid').addClass('na')
            }
          },
        })
        sessionStorage.setItem('task-status', 'pending')
        $('#projectStatus').html('Waiting for exports...')
        $('#submitnews').addClass('disabled animated infinite pulse')
      } else {
        console.log('No path defined @ scanDir().')
      }
    },
    clearMsg() {
      setTimeout(() => {
        $('#projectStatus').addClass('animated fadeOut delay-2s')
      }, 2000)
      $('#projectStatus').css('display', 'none')
      $('#projectStatus').html('')
    },
    /*emit() {
      this.$socket.emit('test', 'data')
    },*/
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
    cleanNews(e){
      var parser = new DOMParser()
      var doc = parser.parseFromString( e, "text/html" )
      var tbl = doc.querySelector('table')
      $(doc).find("td").attr('valign','bottom')
      $(doc).find("td").attr('align','center')
      $(doc).find("td").removeAttr('colspan')
      $(doc).find("td").removeAttr('rowspan')
      var imgs = doc.querySelectorAll('img')
      imgs.forEach(element => {
        $(element).css('vertical-align', 'bottom')
        $(element).attr('border', '0')
      })
      var hrefs = doc.querySelectorAll('a')
      hrefs.forEach(a => {
        var titles = a.querySelector('img')
        var title = $(titles).attr('alt')
        $(a).attr('title', title)
        $(a).attr('target', '_blank')
        var thislink = $(a).attr('href')
        thislink = thislink+'?tracking=blablabli&test=ok'
        $(a).attr('href', thislink)
      })
      var html = doc.querySelector("table").outerHTML
      html = html.replace(/<tbody>|<\/tbody>/, "")
      return this.escapeHtml(html)
    },
    escapeHtml(e) {
      var entityMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        "&#39;": '\'',
        '&#x2F;': '/',
        '&#x60;': '`',
        '&#x3D;': '='
      }
      return String(e).replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x60;|&#x3D;/g, function (s) {
        return entityMap[s];
      })
    },
    fsCopy() {
      console.log("this.cpd-> ", this.cpd)
      console.log("this.nldata.currentPid.templateRoot-> ", this.nldata.currentPid.templateRoot)
      if (this.cpd !== '' && this.nldata.currentPid.templateRoot !=='') {
        $.ajax({
          type: 'POST',
          // make sure you respect the same origin policy with this url:
          // http://en.wikipedia.org/wiki/Same_origin_policy
          url: 'http://127.0.0.1:3000/fs-copy',
          contentType: 'application/json',
          data: JSON.stringify({
            data: {
              from: this.nldata.currentPid.templateRoot,
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
        console.log('error copy @ this.nldata.currentPid.templateRoot-->  ', this.nldata.currentPid.templateRoot)
      }
    },
  },
  props: {
    nldata: {
      type: Object,
    },
  },
  watch: {
    cmpid() {
      let _this = this
      _this.cmpid = _this.sanitize(_this.cmpid)
      console.log(this.cmpid)
      this.folderIsAvailable = false
      this.preheader_link = this.newsdata.currentPid.baseURL
      const path = `${this.newsdata.currentPid.nlWorkingDir}S${this.week+'\\'+this.cmpid}`
      console.log('Path-> ', path)
      this.scanDir(path)
      this.cpd = path
      sessionStorage.setItem('editorFile', path+'\\visu.html')
      sessionStorage.setItem('newsPath', path)
      sessionStorage.setItem('task-status', 'undefined')
    },
  },
  mounted() {
    this.init()
    sessionStorage.setItem('task-status', 'undefined')
  },
}
</script>

<style lang="scss" scoped>
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
            }
            .primary {
                padding-right: 10px;
                .ok {
                    border: 2px solid #f39c12;
                }
                .na {
                    border: 2px solid #e74c3c;
                }
                .created {
                    border: 2px solid #2ecc71;
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
            font-size: 1.4rem;
            
            &:last-child  {
              color: #000000;
            }
            &:first-child {
              text-align: right;
              font-size: 0.8rem;
            }
          }
        }
    }
</style>
