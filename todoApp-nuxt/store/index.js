import axios from 'axios'
const state ={
  todos:[],
  total: 0
};

const getters = {
  allTodos: (state) =>{
    return state.todos
  }
};

const mutations = {
  setTodos: (state, data) => {
    state.todos = data.data;
    state.total = data.total;
  },

  removeTodo:(state,data) => {
    state.data = state.todos.filter((todo) => todo.id !== data.id);
    state.total = data.total --;
  },
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      state.todos[index]= updatedTodo;
      state.todos = [...state.todos];
    }
  },
  addTodo:(state, newTodo) => {
    state.todos = [newTodo,...state.todos]  
  }
};

const actions = {
  //lay du lieu
  async fetchTodos({ commit },{page,limit}){
    const params = `?page=${page}&limit=${limit}`

    const {data} = await axios.get(`http://localhost:7000/student`+ params);
    commit('setTodos', data);
  },
  //sua
  async editTodo({ commit }, updatedTodo) {
    const {data} = await axios.put(`http://localhost:7000/student/${updatedTodo.id}`, updatedTodo);
    commit('updateTodo', data);
  },
  //xoa
  async deleteTodo({ commit }, id) {
    const {data} = await axios.delete(`http://localhost:7000/student/${id}`);
    commit('removeTodo', data);
  },
  //them
  async addTodo({commit},model){
    const {data} = await axios.post(`http://localhost:7000/student/create`, model);
    commit('addTodo', data)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
};

