<template>
    <div class="titleComponent">
        <span class="title">NO PROXY</span>
        <span class="questiontext">What would you like to do?</span>
        <div class="HomeButtons">
            <button class="BtnHome">
                <RouterLink to="/login"> Teacher's Login</RouterLink>
            </button>
            <button class=" BtnHome">
                <RouterLink to="/Applyleaves">Apply for a Leave</RouterLink>
            </button>
            <button class="BtnHome">
                <RouterLink to="/checkleaves">Check your Leave</RouterLink>
            </button>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.titleComponent {
    text-align: center;
    color: white;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    height: auto;
}

.title {
    font-size: 9rem;
    font-family: var(--font-face);
}

.questiontext {
    font-size: 1.5rem;
    margin-top: -3rem;
}

.HomeButtons {
    justify-content: center;
    gap: 10rem;
    display: flex;
    margin-top: 2rem;

}

.BtnHome {
    height: 5rem;
    width: 12rem;
    border-radius: 15px;
    background-color: #ff9820;
    border: 1px solid #ff9820;
    font-size: 18px;
    box-shadow: 1px 1px 10px #0d2726;
}

.BtnHome a {
    text-decoration: none;
    color: white;
}

.BtnHome:hover {
    border: 1px solid white;
    scale: 1.1;
    box-shadow: 0px 0px 7px white;
    transition: .2s ease-in-out;
}
</style>