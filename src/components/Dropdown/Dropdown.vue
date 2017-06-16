<template>
  <div class="Dropdown__Wrapper">
    <div class="Dropdown__Content" >
      <div class="Dropdown__Filter_text" v-if="showSearch">
        <input type="text" class="form-control" v-model="searchString" v-bind:placeholder="placeholder" @keyup.up.stop="arrowUpPressed()" @keyup.down.stop="arrowDownPressed()" @keyup.enter.stop="enterKeyPressed()">
        <i class="fa fa-times" v-on:click="searchString = ''"></i>
      </div>
      <div class="Dropdown__Element" v-for="option in internalOptions">
        <!-- If dropdown shows group object -->
        <div v-if="groupField" >
          <div class="Dropdown__GroupLabel">{{ option[groupLabel] }}</div>
          <div v-for="tag in option[groupField]">
            <div class="Dropdown__value" @click="toggleItem(tag)">
              <i class="fa" v-bind:class="getOptionClass(tag)"></i> {{ tag[displayBy] }}
            </div>
          </div>
        </div>
        <div v-else class="Dropdown__value" @click="toggleItem(option)" :class="getSelectedClass(option)">
          <i class="fa" v-bind:class="getOptionClass(option)"></i> {{ option[displayBy] }}
        </div>
        <!-- If dropdown shows simple object -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .Dropdown__Wrapper {
    max-width: 350px;
    background: white;
    border: 1px solid #e8e8e8;
    font-weight: 600;
    .Dropdown__Content {
      .Dropdown__Filter_text {
          position: relative;
        input {}
        i {
          position: absolute;
          top: 10px;
          right: 10px;
        }
      }
      .Dropdown__Element {
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        .Dropdown__GroupLabel {
          font-size: 12px;
          color: #9e9e9e;
          padding: 12px 12px 0 12px;
        }
        .Dropdown__value {
          padding: 12px 12px;
          &.active {
            background: #ddd;
          }
          &:hover {
            background: #ececec;
          }
          .fa {
            padding-right: 10px;
            color: #a2a2a2;
            font-size: 16px;
            &.fa-check-square-o {
              color: #00a65a;
            }
          }
        }
        .Dropdown__cross {
          margin-left: 30px;
        }
      }
    }
  }
  .selectedOption {
    background: #d3d3d3
  }
</style>

<script>
  import _ from 'lodash'
  import DropdownMixin from './DropdownMixin'
  export default {
    mixins: [DropdownMixin],
    props: {
      options: {
        type: Array,
        default: null
      },
      trackBy: {
        type: String,
        default: 'id'
      },
      displayBy: {
        type: String,
        default: 'name'
      },
      placeholder: {
        type: String,
        default: 'Select'
      },
      filterText: {
        type: String,
        default: 'Filter'
      },
      value: {
        type: [Array, Object]
      },
      groupLabel: {
        type: String
      },
      groupField: {
        type: String
      },
      eventName: {
        type: String,
        default: 'selected-dropdown'
      },
      multiple: {
        type: Boolean,
        default: false
      },
      showSearch: {
        type: Boolean,
        default: true
      }
    },
    created () {
      this.internalValue = this.value
      this.internalOptions = this.options
      window.eventBus.$on('arrowDownEvent', () => {
        this.arrowDownPressed()
      })
      window.eventBus.$on('arrowUpEvent', () => {
        this.arrowUpPressed()
      })
      window.eventBus.$on('enterKeyEvent', () => {
        this.enterKeyPressed()
      })
    },
    data () {
      return {
        internalOptions: [],
        internalValue: null,
        searchString: '',
        selectedOption: '',
        pointerPosition: 0
      }
    },
    methods: {
      toggleItem (option) {
        _.includes(this.internalValue, option)
          ? this.removeItem(option)
          : this.addToList(option)
      },
      addToList (optionToAdd) {
        if (this.multiple === true) {
          this.internalValue.push(optionToAdd)
        } else {
          this.internalValue = []
          this.internalValue.push(optionToAdd)
        }
        window.eventBus.$emit(this.eventName + '-add', this.internalValue)
      },
      removeItem (optionToRemove) {
        _.forEach(this.internalValue, (option, key) => {
          if (option[this.trackBy] === optionToRemove[this.trackBy]) {
            this.internalValue.splice(key, 1)
            return false
          }
        })
        window.eventBus.$emit(this.eventName + '-remove', this.internalValue)
      },
      getOptionClass (option) {
        if (_.includes(this.internalValue, option)) {
          return 'fa-check-square-o'
        } else {
          return 'fa-square-o'
        }
      },
      getSelectedClass (option) {
        if (this.selectedOption === option) {
          return 'selectedOption'
        }
      },
      arrowUpPressed () {
        this.pointerPosition = this.pointerPosition - 1
        if (this.pointerPosition < 1) {
          this.pointerPosition = 1
        }
        this.selectedOption = this.internalOptions[this.pointerPosition - 1]
      },
      arrowDownPressed () {
        this.pointerPosition = this.pointerPosition + 1
        if (this.pointerPosition > this.internalOptions.length) {
          this.pointerPosition = this.internalOptions.length
        }
        this.selectedOption = this.internalOptions[this.pointerPosition - 1]
      },
      enterKeyPressed () {
        this.toggleItem(this.internalOptions[this.pointerPosition - 1])
      }
    },
    watch: {
      options () {
        this.internalOptions = this.options
      },
      internalValue () {
        this.$emit('input', this.internalValue)
      }
    }
  }
</script>
