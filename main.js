const goods = [
    { title: 'Shirt', price : 50},
    { title: 'T-Shirt', price : 100},
    { title: 'Some', price : 150},
    { title: 'Socks', price : 200},
    { title: 'Shoes', price : 250},
]
const renderGoodsItem = (title = 'Item title', price='Item price') => {
        return `
        <div class="goods-item">
            <img src="" alt=""> 
            <h3>${title}</h3>
            <p>${price}</p>
        </div>
    `
}
const renderGoodsList = ( [...rest] ) => {
    let goodsList = rest.map(({title, price} = item) => {
        return renderGoodsItem(title, price)        
    }).join('')
    let box = document.querySelector('.goods')
    box.innerHTML = goodsList
}

renderGoodsList(goods)