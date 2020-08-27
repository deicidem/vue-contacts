<template>
<div>
  <ul class="list-group">
    <router-link 
      :to="'/contacts/' + item.id" 
      :key="item.id" 
      v-for="(item, index) in list"
      v-slot="{href, route, navigate}">
      <li
        class="list-group-item list-item" 
        >
        <!-- Выводим имя и используем ссылку в качестве router-link -->
          <a :href="href" @click="navigate">{{item.info[0].value}}</a>
          <button class="btn btn-danger" type="button" @click="onRemove(index)">
            <i class="fas fa-trash"></i>
          </button>
      </li>
    </router-link>

  </ul>
</div>
</template>

<script>
import { mapGetters, mapActions} from "vuex";
export default {
  computed: {
    ...mapGetters(['list'])
  },
  methods: {
    ...mapActions(['remove']),
    onRemove(index) {
      // Запрашиваем подтверждение
      if (confirm('Вы действительно хотите удалить?')) {
        // Удаляем контакт
        this.remove(index)
      }
    },
  }
}
</script>

<style scoped>
.list-group {
  width: 600px;
}
.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.list-item span {
  width: 400px;
  display: block;
}
.form {
  width: 400px;
}
.btn {
  margin-left: 15px;
}
</style>
