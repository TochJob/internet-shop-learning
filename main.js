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


function service(url, callback){
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url);
    const loadHandler = () => {
        callback(JSON.parse(xhr.response))
    }
    xhr.onload = loadHandler

    xhr.send();
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
    fetchGoods(callback){
        service(GOODS, (data)=>{
            this.list = data;
            callback()
        })
    }
    getCount(){
        this.list.reduce((sum, {price}) => sum + price, 0);
    }
    render(){
        let goodsList = this.list.map(item => {
            const goodsItem = new GoodsItem(item)
            return goodsItem.render()
        }).join('')
        let box = document.querySelector('.goods')
        box.innerHTML = goodsList
    }
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
goodsList.fetchGoods(()=>{
    goodsList.getCount()
    goodsList.render()
})

const basketGoods= new BasketGoodsList();
basketGoods.fetchData(()=>{
    
})