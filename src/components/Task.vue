<template>
  <section class="vh-100 py-5 ">
    <div class="container h-100">
      <div class="row d-flex align-items-center justify-content-around h-100">
        <div class="col-md-4 col-lg-3 col-xl-4 flex-column d-flex justify-content-between">
          <div class="input-group inputfecha">
            <input type="date" id="input-date" class="form-control rounded" aria-label="Search" aria-describedby="search-addon"/>
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#searchModal">Check Tasks</button>
          </div>
          <button type="button" class="btn btn1" data-toggle="modal" data-target="#newModal">New Task</button>
          <button type="button" class="btn btn1" data-toggle="modal" data-target="#updateModal">Update Task</button>
          <button type="button" class="btn btn1" data-toggle="modal" data-target="#deleteModal">Delete Task</button>
        </div>
        <div class="col-md-4 col-lg-6 col-xl-8 ">
          <img src="../assets/calendar.png" class="img-fluid" alt="Calendar task"/>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="deleteTask">
              <div class="form-group">
                <h4>Task Name:</h4>
                <input type="text" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" id="buscar-tarea" v-model="deleteTaskTask.taskTittle"/>
              </div>
              <button type="submit" class="btn">Delete Task</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateTask">
              <div class="form-group">
                <h4><label class="col-form-label">Task Name:</label></h4>
                <div class="input-group">
                  <input type="text" class="form-control" v-model="updateTaskTask.taskTittle">
                  <div class="input-group-append">
                    <button class="btn" type="button" v-on:click="getTask">Search</button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Task Category:</label></h4>
                <input type="text" class="form-control rounded" id="task-category" v-model="updateTaskTask.taskCategory"/>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Task Description:</label></h4>
                <textarea rows="4" class="form-control rounded" id="task-description" v-model="updateTaskTask.description"></textarea>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Status:</label></h4>
                <select class="form-control rounded" v-model="updateTaskTask.taskStatus" required>
                  <option value="To Do" selected>To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Task Date:</label></h4>
                <input type="date" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" id="buscar-tarea" v-model="updateTaskTask.finalDate"/>
              </div>
              <button type="submit" class="btn">Update Task</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="newModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nueva tarea</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="newTask">
              <div class="form-group">
                <h4><label class="col-form-label">Name:</label></h4>
                <input type="text" class="form-control rounded" id="task-name" v-model="task.taskTittle" required/>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Category:</label></h4>
                <input type="text" class="form-control rounded" id="task-category" v-model="task.taskCategory" required/>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Description:</label></h4>
                <textarea rows="4" class="form-control rounded" id="task-description" v-model="task.taskDescription" required></textarea>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Status:</label></h4>
                <select class="form-control rounded" v-model="task.taskStatus" required>
                  <option value="To Do" selected>To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Fecha de entrega:</label></h4>
                <input type="date" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" id="buscar-tarea" v-model="task.taskDate" required/>
              </div>
              <button type="submit" class="btn">Añadir tarea</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="searchModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tareas</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <ul v-for="task in taskByTaskDate" :key="task.taskTitle">>
              <li class="itemTask">
                <ul>
                  <li>{{task.taskTittle}}</li>
                  <li>{{task.status}}</li>
                  <li>{{task.description}}</li>
                  <li>{{task.taskCategory}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Task",

  data: function () {
    return{
      task: {
        userId: localStorage.getItem("user_id"),
        taskTittle:"",
        taskCategory:"",
        taskDescription:"",
        taskStatus:"",
        taskDate:"",
      },
      updateTaskTask:{
        taskId: "",
        userId: localStorage.getItem("user_id"),
        taskTittle:"",
        taskCategory:"",
        taskDescription:"",
        taskStatus:"",
        taskDate:"",
      },
      deleteTaskTask:{
        userId: localStorage.getItem("user_id"),
        taskTittle:"",
        response: "",
      },
      taskByTaskDate: [],
      userId: localStorage.getItem("user_id"),
      taskDate: "",
    };
  },
  methods:{
    newTask: async function () {
      await this.$apollo.mutate({
        mutation: gql`
        mutation Mutation($createTaskTask: TaskInput!) {
          createTask(task: $createTaskTask) {
            taskId
            userId
            taskTittle
            taskCategory
            taskDescription
            taskStatus
            taskDate
          }
        }
        `,
        variables: {
          createTaskTask: this.task
        },
      }).then((result) => {
        alert("Se ha añadido la tarea")
      }).catch((error) => {
        alert("No se ha añadido la tarea, es posible que ya haya una tarea en esa fecha con ese nombre o que la categoria no exista");
      });
    },
    updateTask: async function () {
      await this.$apollo.mutate({
        mutation: gql`
        mutation Mutation($updateTaskTaskId: String!, $updateTaskTask: TaskInput!) {
          updateTask(taskId: $updateTaskTaskId, task: $updateTaskTask) {
            taskId
            userId
            taskTittle
            taskCategory
            taskDescription
            taskStatus
            taskDate
          }
        }
        `,
        variables: {
          updateTaskTaskId: this.updateTaskTask.taskId,
          updateTaskTask: this.updateTaskTask
        },
      }).then((result) => {
        alert("Se ha actualizado la tarea")
      }).catch((error) => {
        alert("No se ha actualizado la tarea, es posible que la tarea o la categoria no exista");
      });
    },
    deleteTask: async function () {
      await this.$apollo.mutate({
        mutation: gql`
        mutation DeleteTaskMutation($deleteTaskUserId: String!, $deleteTaskTaskTittle: String!) {
          deleteTask(userId: $deleteTaskUserId, taskTittle: $deleteTaskTaskTittle) {
            response
          }
        }
        `,
        variables: {
          deleteTaskUserId: this.deleteTaskTask.userId,
          deleteTaskTaskTittle: this.deleteTaskTask.taskTittle
        },
      }).then((result) => {
        alert("Se ha eliminado la tarea")
      }).catch((error) => {
        alert("No se ha eliminado la tarea, es posible que no exista");
      });
    }
  },
  // apollo:{
  //   taskByTaskDate:{
  //     query: gql`
  //     query Query($taskByUserIdAndTaskDateUserId: String!, $taskByUserIdAndTaskDateTaskDate: String!) {
  //       taskByUserIdAndTaskDate(userId: $taskByUserIdAndTaskDateUserId, taskDate: $taskByUserIdAndTaskDateTaskDate) {
  //         taskId
  //         userId
  //         taskTittle
  //         taskCategory
  //         taskDescription
  //         taskStatus
  //         taskDate
  //       }
  //     }
  //     `,
  //     variables: {
        
  //     },
  //   }
  // }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  color: #5264ef;
}

h4 {
  font-weight: normal;
  color: #5264ef;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.container {
  padding-bottom: 1vh;
}
.inputfecha{
  margin: 5vh 0vh;
}
.btn{
  background-color: #5264ef;
  color: #fff;
}
.btn1{
  margin: 5vh 0vh;
}
.modal-header {
  background-color: #5264ef;
  color: white;
}
.itemTask {
  border: 1px solid #000;
  border-radius: 10px;
}
</style>
