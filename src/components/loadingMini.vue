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
    width: 100%;
    display: flex;
    justify-content: center;
    transform: scale(.5);
    align-items: center;
}

.loadingitem {
    height: 5rem;
    width: 5rem;
    position: relative;
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
    position: absolute;
    top: 25%;
    left: 72.5%;
}

.two {
    transform: rotate(120deg);
    position: absolute;
    top: 25%;
    left: 28%;
}

.three {
    transform: rotate(180deg);
    position: absolute;
    top: 60%;
    left: 50%;
}

.four {

    transform: rotate(240deg);
    position: absolute;
    top: 50%;
    left: 28%;
}

.five {

    transform: rotate(300deg);
    position: absolute;
    top: 50%;
    left: 72.5%;
}

.six {

    transform: rotate(360deg);
    position: absolute;
    top: 12%;
    left: 50%;
}

.common {
    height: 3rem;
    width: .5rem;
    /* background: linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%); */
    background-image: linear-gradient(to right, #8360c3, #2ebf91);
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