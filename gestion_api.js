// gestion_api.js
// Main logic for product management (CRUD) in the app.

// Select DOM elements
// - Forms, buttons, and results area
// - Error and success messages

// ! Select the elements from the DOM to work with them

// Elements from the Section FormAdd
const formAdd = document.getElementById("formAdd");
const inputAddProduct = document.getElementById("btnAddProduct");

// Elements from the section formSearch
const formSearch = document.getElementById("formSearch");
const inputSearchName = document.getElementById("searchName");
const inputSearchProduct = document.getElementById("searchProduct");
const searchMessage = document.getElementById("searchMessage");

// Elements from the section btns__actions
const btnShowProducts = document.getElementById("btnShowProducts");
const btnClearProducts = document.getElementById("btnClearProducts");

// Element to list all the results
const containerResults = document.getElementById("results");

btnClearProducts.addEventListener("click", clearProducts);

// Async function to get the data from the server db.json
// Function to get data from the server (GET)
const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/productos");

    if (!response.ok) {
      throw new Error("Error connecting to the server.");
    } else {
      let data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to obtain the data from fetchData() function
// Function to show all products
async function getDataResult() {
  let dataObtained = await fetchData();
  showProducts(dataObtained);
}

// Event listener for the button to show all products
// Event to show all products
btnShowProducts.addEventListener("click", getDataResult);

// Evento para agregar un producto (POST)
// Event to add a product (POST)
formAdd.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevents page reload
  const inputId = document.getElementById("productId").value;
  const inputName = document.getElementById("productName").value;
  const inputPrice = document.getElementById("productPrice").value;

  // Hide previous error messages
  document.getElementById("errorIdMessage").style.display = "none";
  document.getElementById("errorNameMessage").style.display = "none";
  document.getElementById("errorPriceMessage").style.display = "none";

  if (!inputId || isNaN(inputId) || inputId <= 0) {
    const errorIdMessage = document.getElementById("errorIdMessage");
    errorIdMessage.textContent = "Error, did not enter a valid ID";
    errorIdMessage.style.display = "block";
    errorIdMessage.setAttribute("class", "errorMessage");
    return;
  }

  // Fetch products and check for duplicate ID
  const products = await fetchData();
  const idExists = products.some((product) => product.id == inputId);
  if (idExists) {
    const errorIdMessage = document.getElementById("errorIdMessage");
    errorIdMessage.textContent = "Error, this ID already exists";
    errorIdMessage.style.display = "block";
    errorIdMessage.setAttribute("class", "errorMessage");
    return;
  }

  if (!inputName || inputName.trim() === "") {
    const errorNameMessage = document.getElementById("errorNameMessage");
    errorNameMessage.textContent = "Error, did not enter a valid name";
    errorNameMessage.style.display = "block";
    errorNameMessage.setAttribute("class", "errorMessage");
    return;
  }

  if (!inputPrice || isNaN(inputPrice) || inputPrice <= 0) {
    const errorPriceMessage = document.getElementById("errorPriceMessage");
    errorPriceMessage.textContent = "Error, did not enter a valid price";
    errorPriceMessage.style.display = "block";
    errorPriceMessage.setAttribute("class", "errorMessage");
    return;
  }

  const newProduct = {
    id: inputId,
    nombre: inputName,
    precio: parseFloat(inputPrice),
  };

  postData(newProduct);
  formAdd.reset();
});

// Función para enviar un nuevo producto al servidor
// Function to send a new product to the server
async function postData(product) {
  try {
    const response = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Error sending data to the server.");
    } else {
      const dataProduct = await response.json();
      console.log("Product added successfully:", dataProduct);
      alert("Product added successfully");

      console.log("Product added successfully:", dataProduct);
    }
  } catch (error) {
    console.error("Error, The server failed.");
  }
}

// Función para buscar un producto específico
// Function to search for a specific product
async function searchProduct(event) {
  event.preventDefault();

  const inputValue = inputSearchName.value.trim().toLowerCase();
  const data = await fetchData();

  if (inputValue == "" || inputValue == "undefined" || inputValue == null) {
    searchMessage.innerHTML = "Enter the name of the product to search";
    searchMessage.setAttribute("class", "errorMessage");
    return;
  } else {
    let foundProduct = data.find(
      (product) => product.nombre.toLowerCase() == inputValue
    );

    if (!foundProduct) {
      searchMessage.innerHTML = `The product ${inputValue} does not exist in the inventory.`;
      searchMessage.setAttribute("class", "errorMessage");
      containerResults.innerHTML = "";
    } else {
      searchMessage.innerHTML = `Product found successfully`;
      searchMessage.setAttribute("class", "succesMessage");

      containerResults.innerHTML = `
        <div class="productInfo" data-id="${foundProduct.id}">
          <p class="productId">
            <span>ID Product:</span> #${foundProduct.id}
          </p>
          <p class="productName">
            <span>Product Name:</span> ${foundProduct.nombre}
          </p>
          <p class="productPrice">
            <span>Product Price:</span> $${foundProduct.precio}
          </p>
          <button type="button" class="btnModify">Modificar</button>
          <button type="button" class="btnDelete">Eliminar</button>
        </div>
      `;
    }
  }
  // Refresh the form once the user click button Search
  formSearch.reset();
}

formSearch.addEventListener("submit", searchProduct);

// Función para mostrar productos en el área de resultados
// Function to show products in the results area
function showProducts(dataInfo) {
  containerResults.innerHTML = "";
  searchMessage.innerHTML = "";
  searchMessage.setAttribute("class", "");

  if (dataInfo) {
    dataInfo.map((product) => {
      searchMessage.innerHTML = "";
      containerResults.innerHTML += `
        <div class="productInfo" data-id="${product.id}">
          <p class="productId">
            <span>ID Product:</span> #${product.id}
          </p>
          <p class="productName">
            <span>Product Name:</span> ${product.nombre}
          </p>
          <p class="productPrice">
            <span>Product Price:</span> $${product.precio}
          </p>
          <button type="button" class="btnModify">Modificar</button>
          <button type="button" class="btnDelete">Eliminar</button>
        </div>
      `;
    });
    console.log("Products registered in the inventory", dataInfo);
  } else {
    containerResults.innerHTML = "There are not products to show";
  }
}

// Delegación de eventos para los botones de modificar y eliminar
// Event delegation for modify and delete buttons
containerResults.addEventListener("click", async function (event) {
  const target = event.target;
  const productDiv = target.closest(".productInfo");
  if (!productDiv) return;
  const productId = productDiv.getAttribute("data-id");

  // Delete product
  // Check if the clicked button is the delete button
  if (target.classList.contains("btnDelete")) {
    if (confirm("¿Are you sure want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/productos/${productId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Product deleted successfully");
          productDiv.remove();
        } else {
          alert("Error to delete the product");
        }
      } catch (error) {
        alert("Error to connect to the server while deleting");
      }
    }
  }

  // Modify product
  // Check if the clicked button is the modify button
  if (target.classList.contains("btnModify")) {
    const currentName = productDiv
      .querySelector(".productName")
      .innerText.replace("Product Name:", "")
      .trim();
    const currentPrice = productDiv
      .querySelector(".productPrice")
      .innerText.replace("Product Price:", "")
      .replace("$", "")
      .trim();
    const newName = prompt("New name for the product:", currentName);
    if (newName === null || newName.trim() === "") return;
    const newPrice = prompt("Nuevo precio del producto:", currentPrice);
    if (newPrice === null || isNaN(newPrice) || newPrice <= 0) return;
    try {
      const response = await fetch(
        `http://localhost:3000/productos/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: productId,
            nombre: newName,
            precio: parseFloat(newPrice),
          }),
        }
      );
      if (response.ok) {
        alert("Producto modificado correctamente");
        productDiv.querySelector(
          ".productName"
        ).innerHTML = `<span>Product Name:</span> ${newName}`;
        productDiv.querySelector(
          ".productPrice"
        ).innerHTML = `<span>Product Price:</span> $${parseFloat(newPrice)}`;

        console.log("Product modified successfully", {
          id: productId,
          nombre: newName,
          precio: parseFloat(newPrice),
        });
      } else {
        alert("Error to modify the product");
      }
    } catch (error) {
      alert("Error to connect to the server while modifying");
    }
  }

  event.preventDefault(); // Prevent default action of the button
});

// Función para limpiar el área de resultados
// Function to clear the results area
function clearProducts() {
  const infoMessage = document.createElement("p");
  searchMessage.innerHTML = "";
  searchMessage.setAttribute("class", "");

  if (containerResults.childElementCount > 0) {
    infoMessage.textContent = "Product list successfully cleaned.";
    containerResults.innerHTML = infoMessage.textContent;
    return;
  } else {
    infoMessage.textContent =
      "There are not products in the inventory to show.";
    containerResults.innerHTML = infoMessage.textContent;
  }
}
