<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <h5>📈他社比較</h5>
    </div>
    <div class="row justify-content-center">
      <apexchart class="col-md-8" type="line" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
// json import
import electricityJson from '../assets/ratePlan_electricity.json';
import gasJson from '../assets/ratePlan_gas.json';

export default {
  name: 'Graph',
  props: ["range", "type", "x-title"], // [median, maxRange, minRange], type
  data(){
    return {
      // jsonの定義
      electricityJson: electricityJson,
      gasJson: gasJson,
      // graph data
      // apexgraph data
      options: {
        legend:{
          show: false
        },
        chart: {
          id: 'vuechart-example'
        },
        // 軸
        xaxis: {
          type: 'numeric',
          title: {
            text: this.xTitle,
            offsetY: 0,
          }
        },
        yaxis: {
          type: 'numeric',
          title: {
            text: "料金 / 円",
            offsetX: 0,
          }
        },
        // 線の設定
        stroke: {
          show: true,
          width: 1.2
        },
        tooltip: {
          enabled: true
        }
      },
      series: [{
        data: []
      }]
    }
  },
  watch:{
    range:{
      handler:function() {
        // 変数宣言
        let newData = []; // 新しくグラフで表示するデータ
        let newDataName = []; // 新しくグラフに表示する会社名とプラン名
        let maxRange = this.range.maxRange; // グラフx軸最大値
        let minRange = this.range.minRange; // グラフx軸最小値
        let median = Number(this.range.median); // グラフのx軸の中心の値

        // jsonTypeの選択とx軸の値の設定
        let jsonData = '';
        if(this.type === 'electricity') {
          jsonData = this.electricityJson
          maxRange = maxRange > 1000 ? 1000 :maxRange;
          maxRange = minRange < 0 ? 0 :maxRange;
          median = median > 995 ? 995 : median;
          median = median < 5 ? 5 : median;
        }
        else if(this.type === 'gas'){
          jsonData = this.gasJson;
          maxRange = maxRange > 80 ? 80 :maxRange;
          maxRange = minRange < 0 ? 0 :maxRange;
          median = median > 75 ? 75 : median;
          median = median < 5 ? 5 : median;
        }

        // jsonデータを全探索
        jsonData.forEach(companyData => {
          let tmpData = []; // 料金一時格納Array

          newDataName.push(`${companyData.name} ${companyData.plan}`); //会社名とプラン名を登録

          // max-minの幅が10以下の場合は±5表示させるためにとする
          if(maxRange - minRange < 10 ) {
            maxRange = median + 5;
            minRange = median - 5;
          }

          // minからmaxの料金を計算
          for(let x = minRange; x <= maxRange; x++) {        
            
            let base = 0; // 基本料金
            let chargeTmp = 0; // 使用料金

            companyData.using.forEach(val => {
              // 中央値より最高値が低い場合(電気)
              if(val.high < x && this.type ==='electricity') {
                chargeTmp += val.charge * (val.high - val.low);
              }
              // 中央値が範囲内の場合（電気）
              if(val.low < x && x <= val.high && this.type ==='electricity') {
                chargeTmp += val.charge * (x - val.low);
                base = val.base;
              }
              // 中央値が範囲内の場合 (ガス)
              if(val.low < x && x <= val.high && this.type === 'gas') {
                chargeTmp += val.charge * x;
                base = val.base; 
              }
            })
            // 基本料金を加える
            chargeTmp += base;

            // seriesに格納するデータをためる
            tmpData.push([x, chargeTmp.toFixed(0)]);
          }

          // 全データ格納後、nullでなければ新しくグラフに表示するデータとして格納
          if(tmpData !== null) {
            newData.push(tmpData);
          }
        })
        

        // 新しく格納するデータの設定
        const newSeries = newData.map((val, i) => {
          const tmpObj = {
            name : newDataName[i],
            data : val
          }
          return tmpObj;
        });
        this.series = newSeries;
      
      },
      deep: true
    } 
  } 
}
</script>
