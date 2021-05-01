<template>
  <div class="container mt-3 input-space">
    <div class="row justify-content-center">
      <slot></slot>
    </div>
    <div class="m-3 justify-content-center row">
      <div class="input-group col-md-8">
        <input type="number" :max="MAX_VAL" min="0" class="form-control" v-model="charge">
        <div class="input-group-append">
          <span class="input-group-text"> ± </span>
        </div>
        <input type="number" :max="MAX_VAL" min="0" class="form-control" v-model="diff">
        <div class="input-group-append">
          <span class="input-group-text">{{unit}}</span>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-primary btn-lg m-3" @click='$emit("range",range)'>
      ランキング表示！
    </button>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props:['unit', 'type', 'MAX_VAL', 'initVal'],
  data() {
    return {
      charge: this.initVal, // 使用量
      diff: this.initVal / 2,      // 差分量（± の値）
      range: {
        median: this.initVal, // 中央値(= 使用量)
        maxRange: this.initVal * 3 / 2, // レンジの最大
        minRange: this.initVal / 2, // レンジの最小
      } 
    }
  },
  watch: {
    // 使用量が変化したらバリデーション＋rangeへデータを格納
    charge(val) {
      let max = 0;
      let min = 0;
      val = Number(val);

      if(val !== 'NaN') {
        max = val + Number(this.diff);
        min = val - Number(this.diff);
        if(max >= min && max >= 0 && min >= 0) {
          this.range.maxRange = max;
          this.range.minRange = min;
          this.range.median = val;
        } 
      }
    },
    // 差分が変化したらバリデーション＋rangeへデータを格納
    diff(val) {
      let max = 0;
      let min = 0;
      val = Number(val);
      if(val !== 'NaN') {
        max = Number(this.charge) + val;
        min = Number(this.charge) - val;
        if(max >= min && max >= 0 && min >= 0) {
          this.range.maxRange = max;
          this.range.minRange = min;
          this.range.median = this.charge;
        } 
      } 
    }
  },
}
</script>

