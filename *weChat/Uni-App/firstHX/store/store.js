import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
var state = {
      count:1
    }
    /**2，mutations 主要放的是方法，用于改变state中的数据 */
    var mutations = {
      increseCount(){
        state.count++;
      },
      setCountNumber(state, value){ // 直接修改count数值 注意参数
        state.count = value;
      }
    }
    const store = new Vuex.Store({
      state,
      mutations
    })
    export default store