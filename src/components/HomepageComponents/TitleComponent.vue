<template>
    <div class="titleComponent">
        <span class="title">NO PROXY</span>
        <span class="title2">Our Aim is to reduce load of teachers so they can devote more time on students rather than
            creating Attendance sheets, Assinging fine and being fed up.</span>

        <div class="HomeButtons">
            <button class="BtnHome">
                <RouterLink to="/login"> Teacher's Login</RouterLink>
            </button>
            <button class=" BtnHome applyLeave">
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
    margin-top: 4rem;
}

.title {
    font-size: 9rem;
    font-family: var(--font-face);
}

.title2 {
    font-size: 2rem;
    padding: 0 20rem 0 20rem;
    font-family: var(--font-face);
    margin-top: -1rem;

}


.HomeButtons {
    justify-content: center;
    gap: 10rem;
    display: flex;
    margin-top: 3rem;

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

@media screen and (max-width: 1410px) {
    .title {
        font-size: 7rem;
    }

    .title2 {
        font-size: 1.5rem;
    }

    .HomeButtons {
        gap: 3rem;
    }
}

@media screen and (max-width:890px) {
    .title {
        font-size: 5rem;
    }

    .title2 {
        font-size: 1rem;
        padding: 0 1rem 0 1rem;
    }

    .HomeButtons {
        flex-direction: column;
        gap: 3rem;
        padding: 0 2rem;
        align-items: center;
    }

    .BtnHome {
        height: 4rem;
        width: 10.5rem;
        font-size: 16.5px;
    }
}
</style>