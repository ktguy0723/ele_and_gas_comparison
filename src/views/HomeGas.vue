<template>
  <div>
    <div class="alert alert-light my-3" role="alert">
      一人暮らしの平均的なガス使用量は 6 ㎥ です。
    </div>
    <div class="my-3 border">
      <Form unit="ｍ³ / 月" MAX_VAL="80" type="gas" init-val="6" @range="getFormData">
        <h5>
          🔥毎月のガス使用量 (ｍ³ / 月)
        </h5>
      </Form>
    </div>
   
    <div class="border">
      <List :range="range" type="gas">
        {{range.median}} ｍ³ / 月
      </List>
      <Graph :range="range" x-title="ガス使用量 / ｍ³" type="gas"></Graph>
    </div>
  </div>
</template>

<script>
import Form from '../components/Form'
import List from '../components/List'
import Graph from '../components/Graph'

export default {
  name: 'HomeGas',
  components:{
    Form,
    List,
    Graph
  },
  data() {
    return {
      range:{
        median: 0,
        maxRange: 0,
        minRange: 0,
      }
    }
  },
  methods:{
    getFormData(val) {
      this.range.median = val.median;
      this.range.maxRange = val.maxRange;
      this.range.minRange = val.minRange;
    }
  }
}
</script>
