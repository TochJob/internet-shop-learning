const goods = [
    { title: 'Shirt', price : 50},
    { title: 'T-Shirt', price : 100},
    { title: 'Some', price : 150},
    { title: 'Socks', price : 200},
    { title: 'Shoes', price : 250},
]

class GoodsItem {
    constructor({title = 'Item title', price='Item price'}){
        this.title = title;
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

    fetchData(){
        this.list = goods;
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




const goodsList = new GoodsList(goods)
goodsList.fetchData()
goodsList.getCount()
goodsList.render()