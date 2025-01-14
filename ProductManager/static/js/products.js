document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://127.0.0.1:8000/api/products/";

    const loadProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const products = await response.json();
            const tableBody = document.getElementById("product-table");
            tableBody.innerHTML = "";

            products.results.forEach((product) => {
                const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.description || "Sin descripción"}</td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                        <td>${product.category}</td>
                        <td>
                            <button class="btn btn-warning btn-sm btn-edit" data-id="${product.id}">Editar</button>
                            <button class="btn btn-danger btn-sm btn-delete" data-id="${product.id}">Eliminar</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });

            addEventListenersToButtons();
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    };

    const addEventListenersToButtons = () => {
        document.querySelectorAll(".btn-edit").forEach((button) => {
            button.addEventListener("click", () => {
                const productId = button.dataset.id;
                loadProductForEditing(productId);
            });
        });

        document.querySelectorAll(".btn-delete").forEach((button) => {
            button.addEventListener("click", () => {
                const productId = button.dataset.id;
                deleteProduct(productId);
            });
        });
    };

    const loadProductForEditing = async (id) => {
        try {
            const response = await fetch(`${API_URL}${id}/`);
            const product = await response.json();

            document.getElementById("name").value = product.name;
            document.getElementById("description").value = product.description || "";
            document.getElementById("price").value = product.price;
            document.getElementById("stock").value = product.stock;
            document.getElementById("category").value = product.category;

            const submitButton = document.querySelector("#product-form button");
            const cancelButton = document.getElementById("cancel-btn");
            submitButton.textContent = "Guardar";
            submitButton.dataset.id = id;

            cancelButton.style.display = "inline-block";
        } catch (error) {
            console.error("Error al cargar el producto:", error);
        }
    };

    const deleteProduct = async (id) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

        try {
            const response = await fetch(`${API_URL}${id}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Producto eliminado con éxito.");
                loadProducts();
            } else {
                alert("Error al eliminar el producto.");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const id = e.target.querySelector("button").dataset.id;
        const name = document.getElementById("name").value.trim();
        const description = document.getElementById("description").value.trim();
        const price = parseFloat(document.getElementById("price").value);
        const stock = parseInt(document.getElementById("stock").value);
        const category = parseInt(document.getElementById("category").value);

        if (!name) {
            alert("El nombre del producto es obligatorio.");
            return;
        }
        if (price <= 0 || isNaN(price)) {
            alert("El precio debe ser mayor a 0.");
            return;
        }
        if (stock < 0 || isNaN(stock)) {
            alert("El stock no puede ser negativo.");
            return;
        }
        if (isNaN(category)) {
            alert("Selecciona una categoría válida.");
            return;
        }

        const method = id ? "PUT" : "POST";
        const url = id ? `${API_URL}${id}/` : API_URL;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description, price, stock, category }),
            });

            if (response.ok) {
                alert(id ? "Producto actualizado con éxito" : "Producto agregado con éxito");
                resetForm();
                loadProducts();
            } else {
                alert("Error al guardar el producto.");
            }
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    const resetForm = () => {
        document.getElementById("product-form").reset();
        const submitButton = document.querySelector("#product-form button");
        const cancelButton = document.getElementById("cancel-btn");
        submitButton.textContent = "Agregar";
        cancelButton.style.display = "none";
        delete submitButton.dataset.id;
    };

    document.getElementById("cancel-btn").addEventListener("click", resetForm);
    document.getElementById("product-form").addEventListener("submit", handleFormSubmit);

    loadProducts();
});
