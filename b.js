let db = new Dexie('newShop')
db.version(1).stores({items:"id++,Name,Price,Quantity,purchased"})

let form = document.querySelector('#form')


let displayItemsFunction = async () => { 
 
    let dataBase = await db.items.toArray()
    let allItems = document.querySelector('.items')

      allItems.innerHTML = dataBase.map( item =>

     `<div class="item-container">

    <div class="pcont ${item.purchased ==true?'purchased':""}">

    <div>
       <input type="checkbox" class="checkbox" onchange="purchasedOrNot(event,${item.id})">
     </div>

    <div>
       <p class="item-name">${item.Name}</p>
       <p class="total-single-price">$${item.Price} X ${item.Quantity}</p>
    </div>

    <div class="btn-con">
       <button class="cancel" onclick="deleteItem(event.target,${item.id})">X</button>
       <button class="edit-btn" onclick="editItem(${item.id},'${item.Name}',${item.Price},${item.Quantity})">Edit</button>
    </div>
    </div>
  
    </div>`
      ).join(' ')



   
         let total = document.querySelector('.total')
        let item =  dataBase.map( item => item.Price * item.Quantity)
        total.innerHTML = item.reduce((a,b) => a+b,0)
   


}

let addTodb = async () => {
    let itemName = document.querySelector('.item-name').value
    let itemPrice = document.querySelector('.item-price').value
    let itemquantity = document.querySelector('.item-quantity').value
    db.items.add({Name:itemName, Price:itemPrice, Quantity:itemquantity, purchased:false})
   //  await displayItemsFunction()

}
let submitButton = document.querySelector('.submit-btn')
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    addTodb()
    await displayItemsFunction()

})
// displayItemsFunction()

window.onload = displayItemsFunction()


let purchasedOrNot = async (event,id) => {
   await db.items.update(id, {purchased: !!event.target.checked})
   console.log(event.target)
   await displayItemsFunction()

}


let deleteItem =async (event,id)=> {
   await db.items.delete(id)
   await displayItemsFunction()
}

let deleteAll = async() => {
   await db.items.clear()
   await displayItemsFunction()
}

document.querySelector('.clear-all').onclick = deleteAll


let editItem = async (id,itemName,itemPrice,itemQuantity) => {
   let editFormContainer = document.querySelector('.edit-form-container')
   let formAll = document.querySelector('.formToEdit')
   editFormContainer.style.display = 'block'
   let name = document.querySelector('.edit-item-name')
   let price = document.querySelector('.edit-item-price')
   let quantity = document.querySelector('.edit-item-quantity')

   name.value = itemName
   price.value = itemPrice
   quantity.value = itemQuantity
    
   // db.items.update({Name:name.value, Price:price.value, Quantity: quantity.value})

      formAll.addEventListener('submit', async(e) => {
         e.preventDefault()
         db.items.update(id,{Name:name.value,Price:price.value,Quantity:quantity.value})
         editFormContainer.style.display = 'none'
         await displayItemsFunction()
   
      })
   

   await displayItemsFunction()

}


















