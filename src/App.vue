<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import Calculator from './components/Calculator'
export default {
  name: 'App',
  components:{
    Calculator,
  }
}
</script>

<style>

</style>
