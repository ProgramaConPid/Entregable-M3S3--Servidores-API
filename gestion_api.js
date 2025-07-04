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
const searchMessage = document.getElementById("searchMessage")

// Elements from the section btns__actions
const btnShowProducts = document.getElementById("btnShowProducts")
const btnClearProducts = document.getElementById("btnClearProducts")

// Element to list all the results
const containerResults = document.getElementById("results")

btnClearProducts.addEventListener("click", clearProducts)

// Async function to get the data from the server db.json
const fetchData = async () => {
  
  try {
    const response = await fetch("http://localhost:3000/productos")
    
    if (!response.ok) {
      throw new Error("Error al conectar con el servidor.")
    } else {
      let data = await response.json()
      return data
    }
  } catch(error) {
    console.error(error);
  }
}

// Function to obtain the data from fetchData() function
async function getDataResult() {
  let dataObtained = await fetchData()
  showProducts(dataObtained)
}

btnShowProducts.addEventListener("click", getDataResult)

// Function to search a specific product from db.json
async function searchProduct(event) {
  event.preventDefault()
  
  const inputValue = inputSearchName.value.trim().toLowerCase()
  const data = await fetchData()
  
  if (inputValue == "" || inputValue == "undefined" || inputValue == null) {
    searchMessage.innerHTML = "Enter the name of the product to search"
    searchMessage.setAttribute("class", "errorMessage")
    return
  } else {
    let foundProduct = data.find(product => product.nombre.toLowerCase() == inputValue)

    if (!foundProduct) {
      searchMessage.innerHTML = `The product ${inputValue} does not exist in the inventory.`
      searchMessage.setAttribute("class", "errorMessage")
    } else {
      searchMessage.innerHTML = `Product found successfully`
      searchMessage.setAttribute("class", "succesMessage")

      containerResults.innerHTML = `
        <div class="productInfo">
          <p class="productId">
            <span>ID Product:</span> #${foundProduct.id}
          </p>
          <p class="productName">
            <span>Product Name:</span> ${foundProduct.nombre}
          </p>
          <p class="productPrice">
            <span>Product Price:</span> $${foundProduct.precio}
          </p>
        </div>
      `
    }
  }
  // Refresh the form once the user click button Search
  formSearch.reset()
}

formSearch.addEventListener("submit", searchProduct)

// Function to list all the products registered in the inventory
function showProducts(dataInfo) {

  containerResults.innerHTML = ""
  searchMessage.innerHTML = ""
  searchMessage.setAttribute("class", "")

  // If the inventory has products, show them.
  if (dataInfo) {

    dataInfo.map(product => {
      
      searchMessage.innerHTML = ""

      containerResults.innerHTML += `
        <div class="productInfo">
          <p class="productId">
            <span>ID Product:</span> #${product.id}
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

    console.log("Products registered in the inventory", dataInfo);
  } else {
    containerResults.innerHTML = "There are not products to show"
  }
}

// Function to clear the results from container__results
function clearProducts() {
 
  const infoMessage = document.createElement("p")
  searchMessage.innerHTML = ""
  searchMessage.setAttribute("class", "")

  if (containerResults.childElementCount > 0) {
    infoMessage.textContent = "Lista de productos limpiada con exito."
    containerResults.innerHTML = infoMessage.textContent
    return
  } else {
    infoMessage.textContent = "No hay elementos en la lista para eliminar."
    containerResults.innerHTML = infoMessage.textContent
  }
}