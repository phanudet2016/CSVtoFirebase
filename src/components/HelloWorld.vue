<template>
  <div class="hello">
    <input type="file" id="fileUpload">
    <!-- v-on:change !-->
    <button @click="Upload()">อัพโหลด</button>
    <br><br>
    <table id="tableHeader">
      <tr>
        <th>ชื่ออุปกรณ์</th>
        <th>ชื่อภาษาอังกฤษ</th>
        <th>ราคา (ต่อหน่วย)</th>
        <th>หน่วย</th>
        <th>คำอธิบาย</th>
        <th>ประเภทเครื่องมือแพทย์</th>
        <th>จำนวน</th>
      </tr>
      <tr v-for="data of datas">
        <td>{{data.nameEqm}}</td>
        <td>{{data.nameEng}}</td>
        <td>{{data.priceUnit}}</td>
        <td>{{data.unitEqm}}</td>
        <td>{{data.description}}</td>
        <td>{{data.categoryEqm}}</td>
        <td>{{data.amountEqm}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {dataRef} from './firebase'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'dd',
      cells: [],
      rows: [],
      sh: '',
      strRows: [],
      showname: [],
      count: ''
    }
  },
  created () {
  },
  firebase: {
    datas: dataRef
  },
  methods: {
    Upload () {
      var data = this.datas
      var fileUpload = document.getElementById('fileUpload')
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/
      if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) !== 'undefined') {
          var reader = new FileReader()
          reader.onload = function (e) {
            this.rows = e.target.result.split('\n')
            for (var i = 1; i < this.rows.length; i++) {
              this.strRows = this.rows[i].substring(0, this.rows[i].length - 1)
              this.cells = this.strRows.split(',')
              if (data.find(data => data.nameEqm === this.cells[0])) {
                console.log('T')
              } else {
                var amount = []
                var s
                if (this.cells[5] === 'สนับสนุน') {
                  s = 'Sup'
                } else if (this.cells[5] === 'วินิจฉัยและรักษา') {
                  s = 'DxRx'
                } else if (this.cells[5] === 'รักษา') {
                  s = 'Rx'
                } else if (this.cells[5] === 'วินิจฉัย') {
                  s = 'Dx'
                }
                this.count = this.cells[6] * 1 + 1
                for (var c = 1; c < this.count; c++) {
                  var insertID = {
                    id: s + c,
                    number: c,
                    lastnameLend: '',
                    nameLend: '',
                    status: 'พร้อมใช้งาน'
                  }
                  amount.push(insertID)
                }

                dataRef.push({
                  nameEqm: this.cells[0],
                  nameEng: this.cells[1],
                  description: this.cells[4],
                  amountEqm: this.cells[6],
                  balanceEqm: this.cells[6],
                  unitEqm: this.cells[3],
                  categoryEqm: this.cells[5],
                  borrowedEqm: 0,
                  priceUnit: this.cells[2],
                  equipmentID: amount
                })
              }
            }
          }
          reader.readAsText(fileUpload.files[0], 'tis-620') // ทำให้ภาษาไทยไม่เพี้ยน
        } else {
          alert('This browser does not support HTML5.')
        }
      } else {
        alert('Please upload a valid CSV file.')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
td {
  border: 1px solid #dddddd
}
th {
  border: 1px solid #dddddd
}

#tableHeader {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
</style>
