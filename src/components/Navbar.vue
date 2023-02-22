<template>
    <div class="Navbar">
        <RouterLink to="/"><img src="assets/logo.svg" class="logo"></RouterLink>
        <div class="helpandsupport">
        <span class="contactus">Help & support &nbsp <img src="assets/helo and support.svg" />&nbsp| </span> 
        <span class="contactus">Contact us &nbsp <img src="assets/contactus.svg" />&nbsp</span>
    </div>
    </div>
    </template>
    
    <script setup>
   
    </script>
    
    <style scoped>
    .Navbar{
        width:93%;
        height:4.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
    }
    .logo{
        scale:1.3;
        width:13.875rem;
        height:4.294rem;
        margin-top: 2rem;
        margin-left: 2rem;
    }
    .logo:hover{
        scale:1.5;
        transition:.2s ease-in-out;
    }
    .helpandsupport{
        display:flex;
        justify-content: space-between;
        margin-top: .5rem;
        
    }
    .contactus{
        display:flex; 
        align-items: center;
        color:lavender;
        font-size: 18px;
        margin: 0 .5rem;
        text-shadow: 2px 2px 2px black;
    }
    .contactus img{
        margin-top: 1rem;
        scale: 1.5;
       
    }
    .contactus:hover{
        scale:1.1;
        cursor:pointer;
        transition: .2s ease;
    }
    </style>