export default {
  watch: {
    searchString () {
      if (this.groupField) {
        if (this.searchString !== '') {
          var filteredOptions = []
          var count = 0
          var flag = false
          var changed = false
          for (var i = 0; i < this.options.length; i++) {
            flag = false
            for (var j = 0; j < this.options[i][this.groupField].length; j++) {
              if (this.options[i][this.groupField][j][this.displayBy].toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1) {
                if (!flag) {
                  filteredOptions[count] = { }
                  filteredOptions[count][this.groupLabel] = this.options[i][this.groupLabel]
                  filteredOptions[count][this.groupField] = []
                  flag = true
                  changed = true
                }
                filteredOptions[count][this.groupField].push(this.options[i][this.groupField][j])
              }
            }
            if (changed) {
              count = count + 1
              changed = false
            }
          }
          this.internalOptions = filteredOptions
        } else {
          this.internalOptions = this.options
        }
      } else {
        if (this.searchString !== '') {
          filteredOptions = []
          for (i = 0; i < this.options.length; i++) {
            if (this.options[i][this.displayBy].toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1) {
              filteredOptions.push(this.options[i])
            }
          }
          this.internalOptions = filteredOptions
        } else {
          this.internalOptions = this.options
        }
      }
    }
  }
}
