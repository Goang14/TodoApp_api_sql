<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing >Add</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Tên">
          <b-form-input v-model="list.name"></b-form-input>
        </b-form-group>
        
         <b-form-group label="Tuổi">
          <b-form-input  v-model="list.age"></b-form-input>
        </b-form-group>
        
         <b-form-group label="Địa Chỉ">
          <b-form-input  v-model="list.address"></b-form-input>
        </b-form-group> 
      </form>
    </b-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
      name: "AddTodo",
      props:{
        edit:{
          type: Object,
          default: null,
          }
        },
      watch:{
        edit(){
          if(this.edit){
            this.list={
              ...this.list,
              ...this.edit
            }
          }
        }
      },
      data() {
        return {
          list:{
            id: "",
            name:"",
            age: "",
            address: "",
          }
        }
      },

      methods: {
      ...mapActions(["addTodo", "editTodo"]),
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },

      resetModal() {
        this.list ={
           id: "",
            name:"",
            age: "",
            address: "",
        }
        this.$emit("closeForm");
      },

      handleOk(bvModalEvent) {
        bvModalEvent.preventDefault();
        if(this.edit){
          this.editTodo(this.list)
        }else{
          this.addTodo(this.list);
        }
        this.handleSubmit();
      },

      handleSubmit() {
        if (!this.checkFormValidity()){
          return
        }
        this.list = {
          id:"",
          name:"",
          age: "",
          address: "",
        }
        this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing');
        this.$emit("closeForm");
        })
      },
    }
  }
</script>