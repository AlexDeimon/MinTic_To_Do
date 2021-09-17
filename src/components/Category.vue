<template>
<section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex align-items-center justify-content-around h-100">
        <div class="col-md-4 col-lg-3 col-xl-4 flex-column d-flex justify-content-between">
          <button type="button" class="btn btn1" data-toggle="modal" data-target="#newModal">New Category</button>
          <button type="button" class="btn btn1" data-toggle="modal" data-target="#deleteModal">Delete Category</button>
        </div>
        <div class="col-md-4 col-lg-6 col-xl-8 ">
          <img src="../assets/category.png" class="img-fluid" alt="Category img"/>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="deleteCategory">
                        <div class="form-group">
                            <h4><label for="recipient-name" class="col-form-label">Category Name:</label></h4>
                            <input type="search" class="form-control rounded" aria-label="Search" aria-describedby="search-addon"  id="buscar-categoria" v-model="deleteCategoryCategory.categoryName">
                        </div>
                        <button type="submit" class="btn">Delete Category</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="newModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" >New Category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="newCategory">
                        <div class="form-group">
                            <h4><label  class="col-form-label">Category Name:</label></h4>
                            <input type="text" class="form-control rounded" id="category-name" v-model="createCategoryCategory.categoryName">
                        </div>
                        <div class="form-group">
                            <h4><label  class="col-form-label">Category Color:</label></h4>
                            <input type="text" class="form-control rounded" id="color-category" v-model="createCategoryCategory.categoryColor">
                        </div>
                        <button type="submit" class="btn">Add Category</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Category",
  data: function () {
    return{
      createCategoryCategory: {
        userId: localStorage.getItem("user_id"),
        categoryName: "",
        categoryColor: "",
      },
      deleteCategoryCategory: {
        userId: localStorage.getItem("user_id"),
        categoryName: "",
      }
    };
  },
  methods: {
    newCategory: async function () {
      await this.$apollo.mutate({
        mutation: gql`
        mutation Mutation($createCategoryCategory: CategoryInput!) {
          createCategory(category: $createCategoryCategory) {
            categoryId
            userId
            categoryName
            categoryColor
          }
        }
        `,
        variables: {
          createCategoryCategory: this.createCategoryCategory
        },
      }).then((result) => {
        alert("Se ha añadido la categoria")
      }).catch((error) => {
        alert("No se ha añadido la categoria, es posible que ya exista");
      });
    },
    deleteCategory: async function () {
      await this.$apollo.mutate({
        mutation: gql`
        mutation DeleteCategoryMutation($deleteCategoryUserId: String!, $deleteCategoryCategoryName: String!) {
          deleteCategory(userId: $deleteCategoryUserId, categoryName: $deleteCategoryCategoryName) {
            response
          }
        }
        `,
        variables: {
          deleteCategoryUserId: this.deleteCategoryCategory.userId,
          deleteCategoryCategoryName: this.deleteCategoryCategory.categoryName
        },
      }).then((result) => {
        alert("Se ha eliminado la categoria")
      }).catch((error) => {
        alert("No se ha eliminado la categoria, es posible que no exista");
      });
    },
  }
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
.container{
  padding-bottom: 1vh;
}
.btn{
  background-color: #5264ef;
  color: #fff;
  margin: 5vh 0vh 0vh 0vh;
}
.btn1{
  margin: 10vh 0vh;
}
.modal-header {
    background-color: #5264ef;
    color: white;
 }

</style>
