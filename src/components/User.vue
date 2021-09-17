<template>
<section class="vh-100 py-5 ">
    <div class="container h-100">
      <div class="row d-flex align-items-center justify-content-around h-100">
        <div class="col-md-4 col-lg-3 col-xl-4 flex-column d-flex justify-content-between">
          <div id="User">
            <h1>Hi <span> {{username}}, </span> ¡Welcome!</h1>
            </div>
        </div>
        <div class="col-md-4 col-lg-6 col-xl-8 ">
          <img src="../assets/calendar.png" class="img-fluid" alt="Calendar task"/>
        </div>
      </div>
    </div>
  </section>
    
</template>
<script>
export default {
    name: "User",
    data:function(){
        return {
            username: "none"
        }
    },
    created: function(){
        this.username = this.$route.params.username
    }
}
</script>
<style scoped>
h1{
  color: black;
}
span{
    color: #5264ef;
}
#User{
    align-items: center;
    display: flex;
    justify-content: center;
}
</style>
