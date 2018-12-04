<template>

    <div>
        <li class="list-group-item" :class="className">
            <slot></slot>
            <span class="badge badge-secondary tips">{{ time }}
                <span class="tooltiptext">{{ date }}</span>
            </span>
        </li>
        <small class="badge float-right" :class="badgeClass">{{ user }}</small>
        <br>
    </div>
</template>

<script>
    export default {
        props: [
            'color',
            'user',
            'time',
            'date'
        ],

        computed: {
            className() {
                return 'list-group-item-' + this.color
            },
            badgeClass(){
                return 'badge-' + this.color
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style>
    .tips {
        font-size: 9px;
        margin-top: 10px;
        color: white;
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
    }

    /* Tooltip text */
    .tips .tooltiptext {
        visibility: hidden;
        width: 50px;
        background-color: #555;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;

        /* Position the tooltip text */
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;

        /* Fade in tooltip */
        opacity: 0;
        transition: opacity 0.3s;
    }

    /* Tooltip arrow */
    .tips .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .tips:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }
</style>

