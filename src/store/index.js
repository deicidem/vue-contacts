import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    // Список контактов
    list: [
      // Создадим один контакт
      {
        id: 0,
        // Создаем массив для полей
        info: [
          {
            title: "Имя",
            value: "Андрей"
          }
        ],
        // Создаем массив для предыдущего состояния полей
        infoPrev: []
      }
    ],
    // Счетчик для ID
    cnt: 1
  },
  getters: {
    // Геттер для получаения списка контактов
    list(state) {
      return state.list;
    }
  },
  mutations: {
    add(state, value) {
      // Добавляем пустой контанкт в массив
      state.list.push({id: state.cnt, info: []});
      // Добавляем поле "Имя"
      state.list[state.cnt].info.push({title: "Имя", value: value});
      // Увеличиваем счетчик
      state.cnt++;
    },
    remove(state, index) {
      // Удаляем контакт из массива
      state.list.splice(index, 1);
    },
    editField(state, payload) {
      // Обновляем предыдущее состояние
      refresh(state, payload.contactId);
      
      // Обновляем поле контакта
      state.list[payload.contactId].info[payload.fieldId].title = payload.value.title;
      state.list[payload.contactId].info[payload.fieldId].value = payload.value.value;
    },
    removeField(state, payload) {
      // Обновляем предыдущее состояние
      refresh(state, payload.contactId);

      // Удаляем поле контакта
      state.list[payload.contactId].info.splice(payload.fieldId, 1);
    },
    addField(state, payload) {
      // Обновляем предыдущее состояние
      refresh(state, payload.id);

      // Добавляем поле контакта
      state.list[payload.id].info.push(payload.value);
    },
    goBack(state, id) {
      // Очищаем поля контакта
      Vue.set(state.list[id], 'info', []);
      // Записываем в текущие поля значения из предыдущего состояния
      state.list[id].infoPrev.forEach((el, i) => {
        Vue.set(state.list[id].info, i, {
          title: el.title,
          value: el.value
        });
      });
      // Очищаем предыдущее состояние
      state.list[id].infoPrev = [];
    }
  },
  actions: {
    add(store, value) {
      store.commit('add', value);
    },
    remove(store, index) {
      store.commit('remove', index);
    },
    editField(store, payload) {
      store.commit('editField', payload);
    },
    removeField(store, payload) {
      store.commit('removeField', payload);
    },
    addField(store, payload) {
      store.commit('addField', payload);
    },
    goBack(store, id) {
      store.commit('goBack', id);
    }
  }
});
function refresh(state, id) {
  // Очищаем предыдущее состояние
  state.list[id].infoPrev = [];
  // Записываем в предыдущее состояние поля из текущего
  state.list[id].info.forEach(el => {
    let title = el.title;
    let value = el.value;
    state.list[id].infoPrev.push({title: title, value: value});
  });
}