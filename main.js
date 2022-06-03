const goods = [
    { title: 'Shirt', price : 50},
    { title: 'T-Shirt', price : 100},
    { title: 'Some', price : 150},
    { title: 'Socks', price : 200},
    { title: 'Shoes', price : 250},
]

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const GOODS = `${BASE_URL}/catalogData.json`
const BASKET_GOODS = `${BASE_URL}/getBasket.json`
const form = document.querySelector('form')
const search = document.querySelector('.search-input')
console.log(search);



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
    render () {
        return `
            <div class="goods-item">
                <img src="" alt=""> 
                <h3>${this.title}</h3>
                <p>${this.price}</p>
            </div>
        `
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
            debugger

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

class BasketGoodsList{
    items = [];
    fetchData(callback){
        service(BASKET_GOODS, (data)=>{
            this.items = data;
            callback()
        })
    }
}




const goodsList = new GoodsList(goods)

goodsList.fetchGoods().then(()=>{
    goodsList.getCount()
    goodsList.render()
})

const basketGoods= new BasketGoodsList();
    basketGoods.fetchData(()=>{
})

form.addEventListener('submit', function(event){
    event.preventDefault();
    goodsList.filter(search.value)
    goodsList.render()
})