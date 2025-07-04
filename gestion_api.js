// ! Select the elements from the DOM to work with them

// Elements from the Section FormAdd
const form = document.getElementById("formAdd")
const inputId = document.getElementById("productId")
const inputName = document.getElementById("productName")
const inputPrice = document.getElementById("productPrice")
const inputAddProduct = document.getElementById("btnAddProduct")

// Elements from the section formSearch
const formSearch = document.getElementById("formSearch")
const inputSearchName = document.getElementById("searchName")
const inputSearchProduct = document.getElementById("searchProduct")

// Elements from the section btns__actions
const btnShowProducts = document.getElementById("btnShowProducts")
const btnClearProducts = document.getElementById("btnClearProducts")

// Element to list all the results
const containerResults = document.getElementById("results")

btnClearProducts.addEventListener("click", clearProducts)

// Async function to get the data from the server db.json
const getData = async () => {
  
  try {
    const response = await fetch("http://localhost:3000/productos")
    
    if (!response.ok) {
      throw new Error("Error al conectar con el servidor.")
    } else {
      let data = await response.json()
      showProducts(data)
    }
  } catch(error) {
    console.error(error);
  }
}

btnShowProducts.addEventListener("click", getData)

// Function to list all the products registered in the inventory
function showProducts(dataInfo) {

  if (dataInfo) {
    dataInfo.map(product => {
  
      containerResults.innerHTML += `
        <div class="productInfo">
          <p class="productId">
            <span>ID Product:</span> ${product.id}
          </p>
          <p class="productName">
            <span>Product Name:</span> ${product.nombre}
          </p>
          <p class="productPrice">
            <span>Product Price:</span> $${product.precio}
          </p>
        </div>
      `
    })
  } else {
    containerResults.innerHTML = "No hay elementos para mostrar."
  }
}

// Function to clear the results from container__results
function clearProducts() {
 
  if (containerResults.childElementCount > 0) {
    containerResults.innerHTML = ""
    return
  } else {
    const infoMessage = document.createElement("p")
    infoMessage.textContent = "No hay elementos en la lista para eliminar."
    containerResults.append(infoMessage)
  }
}
