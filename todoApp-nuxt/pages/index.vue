<template>
    <div class="product">  
      <h1 text-align="center">TodoApp</h1>
      <FormView :edit="itemEdit" @closeForm="itemEdit = null" /> <br>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th> 
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Address</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in allTodos" :key="todo.id">
            <th>{{ todo.id }}</th>
            <td>{{ todo.name }}</td>
            <td>{{ todo.age }}</td>
            <td>{{ todo.address }}</td>
             <td><button v-on:click="deleteTodo(todo.id)">Delete</button></td>
            <td><button @click = "()=>clickEdit(todo)" >Edit</button></td>
          </tr>   
        </tbody>
      </table>
      <br><br>
      <Pagination
        small
        layout="prev, pager, next"
        @current-change="get"
        :total="100">
      </Pagination>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FormView from '../components/FormView.vue'
import 'element-ui/lib/theme-chalk/index.css';
import {Pagination} from 'element-ui'

export default {
  components:{
    FormView,
  Pagination
  },
  name: "TodoApp",
  methods:{
    ...mapActions(["fetchTodos","deleteTodo","editTodo"]),

    clickEdit(item) {
      this.$bvModal.show("modal-prevent-closing");
      this.itemEdit = item;
    },
    get (page, limit=5) {
    
     this.fetchTodos({page,limit})
    }
        },
  data(){
    return{
      itemEdit:null,
      pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1
      },
    }
  },
  computed: {
    ...mapGetters(["allTodos"])
  },
    
  mounted() {
     this.fetchTodos({page:this.pagination.current_page,limit:5})
  },
    
};
</script>
