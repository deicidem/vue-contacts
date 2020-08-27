<template>
  <form @submit.prevent="submit">
    <div class="input-group flex-nowrap">
      <div class="input-group-prepend">
        <button class="btn btn-success" :disabled="!isCorrect"><i class="fas fa-plus"></i></button>
      </div>
      <input type="text" class="form-control" v-model="value" placeholder="Имя">
    </div>
  </form>
</template>

<script>



export default {
  data() {
    return {
      value: ''
    }
  },
  computed: {
    isCorrect() {
      // Проверка инпутов
      return /.+/.test(this.value)
    }
  },
  methods: {
    submit() {
      // Проброс события и переда значения родитель
      this.$emit('submit', this.value);
      // Обнуление инпута
      this.value = '';
    }
  }
}
</script>