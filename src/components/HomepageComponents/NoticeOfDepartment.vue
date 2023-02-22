<template>
    <div class="container">
        <span class="noticeText">Notices from the Department :</span>
            <ul class="notices">
                <li v-for="(notice,index) in notices" :key="index">
                {{ notice.data }}
                </li>
            </ul>
    </div>
</template>

<script setup>
const notices=[{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"},
{data:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, facilis?"}]
</script>

<style scoped>
.noticeText{
    color: teal;
    display: flex;
    justify-content: center;
    font-weight: bold;
}
.notices{
    height: 10rem;
    border: 2px solid teal;
    overflow-y: scroll;
    color: teal;
    font-size: 18px;
    padding: 1rem 3rem;
    border-radius: 20px;
}
</style>