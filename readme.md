# Product Management App

This project is a simple web application for managing products using a RESTful API and a local JSON database. Users can add, search, modify, and delete products through an intuitive interface. The app is designed to be responsive and user-friendly on both desktop and mobile devices.

## Main Purpose

- Register new products with ID, name, and price.
- Search for products by name.
- Modify or delete existing products.
- Display all products in a clear, organized list.

## Project Structure

```
├── db.json              # Local JSON database (used by JSON Server)
├── gestion_api.js       # Main JavaScript logic (CRUD operations, DOM manipulation)
├── index.html           # Main HTML file (UI structure)
├── style.css            # Main stylesheet (responsive design, UI styles)
├── readme.md            # Project documentation
```

## Important Sections

- **index.html**: Contains the forms for adding and searching products, action buttons, and the results area.
- **gestion_api.js**: Handles all product operations (add, search, modify, delete) and updates the UI dynamically. Uses event delegation for product actions.
- **style.css**: Provides a modern, responsive design for the app, including forms, buttons, and results area.
- **db.json**: Stores product data. Used as a mock backend with [JSON Server](https://github.com/typicode/json-server).

## How to Run the Project

1. **Install JSON Server** (if not already installed):
   ```sh
   npm install -g json-server
   ```
2. **Start the JSON Server** (from the project directory):
   ```sh
   json-server --watch db.json --port 3000
   ```
3. **Open `index.html` in your browser** (you can simply double-click the file or use a local server for best results).
4. **Use the app** to add, search, modify, and delete products. All changes are reflected in `db.json`.

## Notes

- Make sure JSON Server is running on port 3000, or update the fetch URLs in `gestion_api.js` if you use a different port.
- The app is fully client-side and does not require any backend code besides JSON Server.

---

Feel free to customize and extend this project as needed!
