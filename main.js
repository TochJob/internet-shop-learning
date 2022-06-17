const goods = [
    { title: 'Shirt', price : 50},
    { title: 'T-Shirt', price : 100},
    { title: 'Some', price : 150},
    { title: 'Socks', price : 200},
    { title: 'Shoes', price : 250},
]

const BASE_URL = 'http://localhost:8000'
const GOODS = `${BASE_URL}/goods.json`
const BASKET_GOODS = `${BASE_URL}/basket`
const form = document.querySelector('form')
const search = document.querySelector('.search-input')



function service(url, callback){
    return new Promise((resolve)=>{
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url);
        const loadHandler = () => {
            resolve(JSON.parse(xhr.response))
        }
        xhr.onload = loadHandler

        xhr.send();
    })
}

class GoodsItem {
    constructor({product_name = 'Item title', price='Item price'}){
        this.title = product_name;
        this.price = price;
    }
    
}

class GoodsList {
    items = []
    filtredItems = []
    fetchGoods(){
        const prom = service(GOODS)
        prom.then((data)=>{
            this.items = data;
            this.filtredItems = data;
        })
        return prom
    }
    filter(str){
        this.filtredItems = this.items.filter(({product_name})=>{
            return (new RegExp(str, 'i')).test(product_name)
        })
    }
    getCount(){
        this.items.reduce((sum, {price}) => sum + price, 0);
    }
    render(){
        let goodsList = this.items.map(item => {
            const goodsItem = new GoodsItem(item)
            return goodsItem.render()
        }).join('')
        let box = document.querySelector('.goods')
        box.innerHTML = goodsList
    };
   
}


window.onload = () => {
    Vue.component('search-input',{
        template:`<input type="text" class="search-input" @input="$emit('input', $event.target.value)">`
    })
    
    Vue.component('custom-button',{
        template:`
        <button class="button" @click="$emit('click')">
            <slot></slot>
        </button>` 
    })
    
    Vue.component('good', {
        props:[
            'item'
        ],
        template:`
        <div class="goods-item">
            <img src="" alt=""> 
            <h3>{{item.product_name}}</h3>
            <p>{{item.price}}</p>
        </div>
        `
    })

    Vue.component('basketItem', {
        template:`
            <div class="basketItem">
                <img src="" alt=""> 
                <h3>{{item.product_name}}</h3>
                <p>{{item.price}}</p>

                <div class="count">
                    <button class="minusCount">-</button>
                    <p>{{item.count}}</p>
                    <button class="plusCount">+</button>
                </div>


            </div>
        `
    })

    const basketGoods = Vue.component('basket', {
        data(){
            return{
                basketGoodsItems: []
            }
        },

        template:`
        <div class="basketBox"> 
            <div class="basketWrapper">
                <button class="closeBtn" @click="$emit('close')">X</button>
            </div>
        </div>
        `,
        mounted(){
            service(BASKET_GOODS).then((data)=>{
                this.basketGoodsItems = data
            })
        }
    })

    const app = new Vue({
        el: '#root',
        data:{
            items:[],
            searchValue:'',
            isCardVisible:false,
        },
        mounted() {
            const prom = service(GOODS)
            prom.then((data)=>{
                this.items = data;
            })
            return prom
        },
        computed:{
            getCount(){
                this.items.reduce((sum, {price}) => sum + price, 0);
            },
            filtredItems(){
                return this.items.filter(({product_name})=>{
                    return (new RegExp(this.searchValue, 'i')).test(product_name)
                })

            }
        },
        methods: {
            cardVisibleToggler(){
               this.isCardVisible=!this.isCardVisible;
            },
        },
    })
}