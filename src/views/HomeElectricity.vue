<template>
<div>
  <div class="alert alert-light my-3" role="alert">
    一人暮らしの平均的な電気使用量は 154kW です。
  </div>
  <div class="my-3 border">
    <Form unit="kWh/月" type="electricity" MAX_VAL="1000" init-val="154" @range="getFormData">
      <h5>
        💡毎月の電気使用量 (kWh/月)
      </h5>
    </Form>
  </div>
  <div class="border">
    <List :range="range" type="electricity">
      kWh/月
    </List>
    <Graph :range="range" x-title="電気使用量/kWh" type="electricity"></Graph>
  </div>
</div>
</template>

<script>
import Form from '../components/Form'
import List from '../components/List'
import Graph from '../components/Graph'

export default {
  name: 'HomeElectricity',
  components:{
    Form,
    List,
    Graph
  },
  data() {
    return {
      range:{
        median: 0, // 中央値(= 使用量)
        maxRange: 0,
        minRange: 0,
      }
    }
  },
  methods:{
    getFormData(val) {
      this.range.maxRange = val.maxRange;
      this.range.minRange = val.minRange;
      this.range.median = val.median;
      console.log(this.range.median)
    }
  }
}
</script>