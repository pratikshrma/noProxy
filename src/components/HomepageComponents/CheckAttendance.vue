<template>
    <div class="checkAttendance">
        <span class="checkText">You can check your attendance here :</span>
        <div class="DiffSemesters">
        <div class="semester" v-for="sem in sems" :key="sem.id">
            <RouterLink  :to="`/attendance/${sem.id}`" class="routetoAttendence"><div class="icon"><img src="/Vector.svg"></div>
            <span class="semText">{{ sem.name }}</span></RouterLink>
       
        </div>
        </div>
    </div>
</template>

<script setup>
const sems=[
    {name:"1st semester",id:1},
    {name:"2nd semester",id:2},
    {name:"3rd semester",id:3},
    {name:"4th semester",id:4},
    {name:"5th semester",id:5},
    {name:"6th semester",id:6}

]
</script>

<style  scoped>
.checkAttendance{
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.DiffSemesters{
    display:flex;
    width: 80%;
    justify-content: space-evenly;
    border-top: 2px solid teal;
    border-bottom: 2px solid teal;
    margin-top: 1rem;
    
}
.routetoAttendence{
    text-decoration: none;
}
.semester{
    
    padding:1rem 1rem;
}
.icon{
    background-color: teal;
    height:5rem;
    width:5rem;
    border-radius: 50px;
    display:flex;
    align-items: center;
    justify-content: center;
    
}
.icon:hover{
    background-color: #ff9820;
    cursor:pointer;
    transition: .2s ease-in-out;
}
.icon img{
    height:4rem;
    width:4rem;
    margin-top: .7rem;
}
.semText{
    color: teal;
}
.checkText{
    padding: 1.5rem 0;
    font-size: 22px;
    font-weight: bold;
    color:teal;
}
</style>