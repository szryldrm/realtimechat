require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'

Vue.use(Toaster, {timeout: 5000})

import 'v-toaster/dist/v-toaster.css'

Vue.component('message', require('./components/message.vue'));

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)))

const app = new Vue({
    el: '#app',
    data:{
        message:'',

        chat:{
            message:[],
            user:[],
            color:[],
            time:[],
            date:[]
        },

        typing:'',

        numberOfUsers:0
    },

    watch:{

        message(){
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },

    methods:{
        send(){
            if (this.message.length != 0){
                this.chat.message.push(this.message);
                this.chat.user.push('Siz');
                this.chat.color.push('success text-right');
                this.chat.time.push(this.getTime());
                this.chat.date.push(this.getDate());
                axios.post('/send', {
                    message : this.message
                })
                    .then(response => {
                        console.log(response);
                        this.message = ''
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        getTime(){
            let time = new Date();
            return time.getHours() + ':' + time.getMinutes();
        },

        getDate(){
            let date = new Date();
            return date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear();
        }
    },
    mounted(){
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());
                this.chat.date.push(this.getDate());
                // console.log(e);
            })

            .listenForWhisper('typing', (e) => {
                if (e.name != ''){
                    this.typing = 'yazıyor...'
                }
                else{
                    this.typing = ''
                }

        });

        Echo.join(`chat`)
            .here((users) => {
                this.numberOfUsers = users.length;
            })
            .joining((user) => {
                this.numberOfUsers += 1;
                this.$toaster.success(user.name + ' odaya katıldı.');
            })
            .leaving((user) => {
                this.numberOfUsers -= 1;
                this.$toaster.warning(user.name + ' odadan ayrıldı.');

            });

    }
});
