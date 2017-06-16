<template>
  <div>
    <button @click.stop="toggle()">Toggle Dropdown</button>
    <dropdown v-model="selectedOptions" :options="options" trackBy="name" v-if="show"></dropdown>
    {{selectedOptions}}
  </div>
</template>
<script>
  import dropdown from './Dropdown/Dropdown'
  export default {
    data () {
      return {
        options: [
          {name: 'one'},
          {name: 'two'},
          {name: 'three'},
          {name: 'four'}
        ],
        selectedOptions: null,
        show: false
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
      }
    },
    components: {
      dropdown
    }
  }
</script>
