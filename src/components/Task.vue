<template>
  <section class="vh-100 py-5 ">
    <div class="container h-100">
      <div class="row d-flex align-items-center justify-content-around h-100">
        <div class="col-md-4 col-lg-3 col-xl-4 flex-column d-flex justify-content-between">
          <div class="input-group inputfecha">
            <input type="date" id="input-date" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" v-model="taskDate"/>
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#searchModal" v-on:click="searchTaskByTaskDate">Check Tasks</button>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"  v-on:click="limpiarCampos"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="deleteTask">
              <div class="form-group">
                <h4>Task Name:</h4>
                <input type="text" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" v-model="deleteTaskTask.taskTittle"/>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"  v-on:click="limpiarCampos2"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateTask">
              <div class="form-group">
                <h4><label class="col-form-label">Task Name:</label></h4>
                <input type="text" class="form-control rounded" id="task-title" v-model="taskByUserIdAndTaskTittle.taskTittle"/>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Task Category:</label></h4>
                <input type="text" class="form-control rounded" id="task-category" v-model="taskByUserIdAndTaskTittle.taskCategory"/>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Task Description:</label></h4>
                <textarea rows="4" class="form-control rounded" id="task-description" v-model="taskByUserIdAndTaskTittle.taskDescription"></textarea>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Task Status:</label></h4>
                <select class="form-control rounded" v-model="taskByUserIdAndTaskTittle.taskStatus" id="task-status" required>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Task Date:</label></h4>
                <input type="date" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" id="task-date" v-model="taskByUserIdAndTaskTittle.taskDate"/>
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
            <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"  v-on:click="limpiarCampos"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="newTask">
              <div class="form-group">
                <h4><label class="col-form-label">Name:</label></h4>
                <input type="text" class="form-control rounded" v-model="task.taskTittle" required/>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Category:</label></h4>
                <input type="text" class="form-control rounded" v-model="task.taskCategory" required/>
              </div>
              <div class="form-group">
                <h4><label class="col-form-label">Description:</label></h4>
                <textarea rows="4" class="form-control rounded" v-model="task.taskDescription" required></textarea>
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
                <h4><label class="col-form-label">Date:</label></h4>
                <input type="date" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" v-model="task.taskDate" required/>
              </div>
              <button type="submit" class="btn">Add Task</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="searchModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tasks {{taskDate}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"  v-on:click="limpiarCampos"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <ul v-for="task in taskByUserIdAndTaskDate" :key="task.taskTittle">
              <li class="itemTask">
                <ul>
                  <li><span>Name: </span>{{task.taskTittle}}</li>
                  <li><span>Status: </span>{{task.taskStatus}}</li>
                  <li><span>Description: </span>{{task.taskDescription}}</li>
                  <li><span>Category: </span>{{task.taskCategory}}</li>
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
      deleteTaskTask:{
        userId: localStorage.getItem("user_id"),
        taskTittle:"",
        response: "",
      },
      taskByUserIdAndTaskDate: [],
      taskByUserIdAndTaskTittle: {
        taskId: "",
        userId: localStorage.getItem("user_id"),
        taskTittle:"",
        taskCategory:"",
        taskDescription:"",
        taskStatus:"",
        taskDate:"",
      },
      updateTaskTask: {
        userId: localStorage.getItem("user_id"),
        taskTittle: "",
        taskCategory:"",
        taskDescription:"",
        taskStatus:"",
        taskDate:"",
      },
      userId: localStorage.getItem("user_id"),
      taskDate: "",
    };
  },
  apollo: {
    taskByUserIdAndTaskDate: {
      query: gql`
        query Query($taskByUserIdAndTaskDateUserId: String!, $taskByUserIdAndTaskDateTaskDate: String!) {
          taskByUserIdAndTaskDate(userId: $taskByUserIdAndTaskDateUserId, taskDate: $taskByUserIdAndTaskDateTaskDate) {
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
        variables() {
          return{
            taskByUserIdAndTaskDateUserId: this.userId,
            taskByUserIdAndTaskDateTaskDate: this.taskDate
          }
        }
    },
    taskByUserIdAndTaskTittle: {
      query: gql`
        query Query($taskByUserIdAndTaskTittleUserId: String!, $taskByUserIdAndTaskTittleTaskTittle: String!) {
          taskByUserIdAndTaskTittle(userId: $taskByUserIdAndTaskTittleUserId, taskTittle: $taskByUserIdAndTaskTittleTaskTittle) {
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
        variables() {
          return{
            taskByUserIdAndTaskTittleUserId: this.taskByUserIdAndTaskTittle.userId,
            taskByUserIdAndTaskTittleTaskTittle: this.taskByUserIdAndTaskTittle.taskTittle
          }
        }
    }
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
      this.updateTaskTask.userId = this.taskByUserIdAndTaskTittle.userId
      this.updateTaskTask.taskTittle = document.getElementById('task-title').value
      this.updateTaskTask.taskCategory = document.getElementById('task-category').value
      this.updateTaskTask.taskDescription = document.getElementById('task-description').value
      this.updateTaskTask.taskStatus = document.getElementById('task-status').value
      this.updateTaskTask.taskDate = document.getElementById('task-date').value
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
          updateTaskTaskId: this.taskByUserIdAndTaskTittle.taskId,
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
    },
    limpiarCampos: function(){
      this.task.taskTittle= "",
      this.task.taskCategory="",
      this.task.taskDescription="",
      this.task.taskStatus="",
      this.task.taskDate="",
      this.deleteTaskTask.taskTittle="",
      this.taskByUserIdAndTaskDate="",
      this.taskByUserIdAndTaskTittle.taskId="",
      this.taskByUserIdAndTaskTittle.taskTittle= "",
      this.taskByUserIdAndTaskTittle.taskCategory="",
      this.taskByUserIdAndTaskTittle.taskDescription="",
      this.taskByUserIdAndTaskTittle.taskStatus="",
      this.taskByUserIdAndTaskTittle.taskDate="",
      this.updateTaskTask.taskTittle="",
      this.updateTaskTask.taskCategory="",
      this.updateTaskTask.taskDescription="",
      this.updateTaskTask.taskStatus="",
      this.updateTaskTask.taskDate="",
      this.taskDate=""
    },
    limpiarCampos2: function(){
      location.reload()
    }
  },
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
.itemTask li{
  display: block;
}
.itemTask li span{
  color: #5264ef;
  font-weight: bold;
}
</style>
