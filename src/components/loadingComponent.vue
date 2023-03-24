<script setup>

</script>

<template>
    <div class="loadingContainer">
        <div class="loadingitem">
            <div class="one common"></div>
            <div class="two common"></div>
            <div class="three common"></div>
            <div class="four common"></div>
            <div class="five common"></div>
            <div class="six common"></div>
        </div>
    </div>
</template>

<style scoped>
.loadingContainer {
    height: auto;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loadingitem {
    height: 10rem;
    width: 10rem;
    position: relative;
    transform: scale(3);
    animation: loading 1.5s infinite;
    animation-timing-function: ease-in-out;

}

@keyframes loading {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.one {
    transform: rotate(60deg);
    background-color: mintcream;
    position: absolute;
    top: 25%;
    left: 72.5%;
}

.two {
    transform: rotate(120deg);
    background-color: red;
    position: absolute;
    top: 25%;
    left: 28%;
}

.three {
    transform: rotate(180deg);
    background-color: yellow;
    position: absolute;
    top: 60%;
    left: 50%;
}

.four {

    transform: rotate(240deg);
    background-color: green;
    position: absolute;
    top: 50%;
    left: 28%;
}

.five {

    transform: rotate(300deg);
    background-color: blue;
    position: absolute;
    top: 50%;
    left: 72.5%;
}

.six {

    transform: rotate(360deg);
    background-color: pink;
    position: absolute;
    top: 12%;
    left: 50%;
}

.common {
    height: 3rem;
    width: .5rem;
    background-image: linear-gradient(109.6deg, rgba(156, 252, 248, 1) 11.2%, rgba(110, 123, 251, 1) 91.1%);
    border-radius: 100px;
}

@media screen and (max-width:890px) {
    .loadingitem {
        height: 5rem;
        width: 5rem;
    }

    .common {
        height: 30%;
        width: 5%;
    }
}
</style>