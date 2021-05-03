<template>
  <div>
    <h5 class="mt-5">👑 最安値ランキング ({{median}}<slot></slot>) 👑</h5>
    <ul class="list-group list-group-flush mx-5">
      <li v-for="rank in rankingList" :key="rank.no" class="list-group-item">
        <span class="badge badge-pill">{{rank.medal}}</span>
        {{rank.companyName}} {{rank.planName}} {{rank.charge}}円/月
      </li>
    </ul>
    <p><small>(燃料費調整額は含まれていません)</small></p>
  </div>
</template>

<script>
// json import
import electricityJson from '../assets/ratePlan_electricity.json';
import gasJson from '../assets/ratePlan_gas.json';

export default {
  name: 'List',
  props: ["range", "type"], // [median, maxRange, minRange], type
  data() {
    return {
      // jsonの定義
      electricityJson: electricityJson,
      gasJson: gasJson,
      // 月の使用量
      median: 0,
      // ランキングデータの定義
      rankingList:[
        {
          no: 1,
          medal : '🥇',
          companyName : '---',
          planName: '---' ,
          charge: '0',
        },
        {
          no: 2,
          medal : '🥈',
          companyName : '---',
          planName: '---',
          charge: '0'
        },
        {
          no: 3,
          medal : '🥉',
          companyName : '---',
          planName: '---',
          charge: '0'
        },
      ]
    }
  },
  watch:{
    range:{
      handler:function() {      
        console.log('list change')
        // ランキングの計算
        // 料金比較
        // 変数宣言
        let nox = [] // 1~3位までのデータ
        nox[0] = {companyName:'',planName: '',charge:1000000,}
        nox[1] = {companyName:'',planName: '',charge:1000000,}
        nox[2] = {companyName:'',planName: '',charge:1000000,}
        
        // jsonTypeの選択と中央値の設定
        let jsonData = '';
        let median = this.range.median;
        if(this.type === 'electricity') {
          jsonData = this.electricityJson
          median = median > 1000 ? 1000 : median;
          median = median < 0 ? 0 : median; 
          this.median = median;
        }
        else if(this.type === 'gas'){
          jsonData = this.gasJson;
          median = median > 80 ? 80 : median;
          median = median < 0 ? 0 : median;
          this.median = median;
        }

        // jsonデータを全探索
        jsonData.forEach(obj => {
          let base = 0; // 基本料金
          let chargeTmp = 0; // 使用料金
          
          obj.using.forEach(val => {            
            // 中央値より最高値が低い場合(電気)
            if(val.high < median && this.type ==='electricity') {
              chargeTmp += val.charge * (val.high - val.low);
            }
            // 中央値が範囲内の場合（電気）
            if(val.low < median && median <= val.high && this.type ==='electricity') {
              chargeTmp += val.charge * (median - val.low);
              base = val.base;
            }
            // 中央値が範囲内の場合 (ガス)
            if(val.low < median && median <= val.high && this.type === 'gas') {
              chargeTmp += val.charge * median;
              base = val.base; 
            }
          });
          // 基本料金を加える
          chargeTmp += base;

          // 比較
          if(nox[0].charge > chargeTmp) {
            nox[2] = JSON.parse(JSON.stringify(nox[1]));
            nox[1] = JSON.parse(JSON.stringify(nox[0]));
            nox[0] = {companyName:obj.name, planName: obj.plan, charge: chargeTmp};
          }
          else if (nox[1].charge > chargeTmp) {
            nox[2] = JSON.parse(JSON.stringify(nox[1]));
            nox[1] = {companyName:obj.name, planName: obj.plan, charge: chargeTmp};
          }
          else if (nox[2].charge > chargeTmp) {
            nox[2] = {companyName:obj.name, planName: obj.plan, charge: chargeTmp};
          }
        })
        // data()に結果を代入
        this.rankingList.forEach((val,index) => {
          this.rankingList[index].companyName = nox[index].companyName;
          this.rankingList[index].planName = nox[index].planName;
          this.rankingList[index].charge = Math.floor(nox[index].charge);
        })
      },
      deep: true
    } 
  }
}
</script>