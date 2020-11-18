<template>
  <div class="input-control">
    <label><slot /></label>
    <input
      v-if="controlType === 'input'"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)">
    <textarea
      v-if="controlType === 'textarea'"
      rows="10"
      :v-model="pretext"
      :value="pretext"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"></textarea>
    <input
     v-if="controlType === 'file'"
     ref="file"
     type="file"
     @change="imageChange">
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    pretext: {
      type: String,
      default: ''
    },
    name: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String
    }
  },
  methods: {
    getBase64(file) {
      return new Promise((res, rej) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => res(reader.result)
        reader.onerror = error => rej(error)
      })
    },
    imageChange(event) {
      const files = event.target.files || event.dataTransfer.files
      const file = files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const image = reader.result
      this.$emit('input', image)
    }
  }
}
</script>

<style scoped>
.input-control {
  margin: 10px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: #eee;
  outline: none;
}
</style>


