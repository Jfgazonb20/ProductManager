document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://127.0.0.1:8000/api/categories/";

    const loadCategories = async () => {
        try {
            const response = await fetch(API_URL);
            const categories = await response.json();
            const tableBody = document.getElementById("category-table");
            tableBody.innerHTML = ""; // Limpia la tabla antes de agregar nuevas filas
    
            if (categories.results && categories.results.length > 0) {
                categories.results.forEach((category) => {
                    // Asegúrate de que los botones estén en la columna de acciones
                    const row = `
                    <tr>
                        <td>${category.id}</td>
                        <td>${category.name}</td>
                        <td>${category.encargado || "Sin encargado"}</td>
                        <td>
                            <button class="btn btn-warning btn-sm btn-edit" data-id="${category.id}">Editar</button>
                            <button class="btn btn-danger btn-sm btn-delete" data-id="${category.id}">Eliminar</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
                                    
                });
                addEventListenersToButtons(); // Vincula los eventos a los botones después de agregar las filas
            } else {
                tableBody.innerHTML = '<tr><td colspan="4">No hay categorías disponibles.</td></tr>';
            }
        } catch (error) {
            console.error("Error al cargar las categorías:", error);
        }
    };
    

    const addEventListenersToButtons = () => {
        document.querySelectorAll(".btn-edit").forEach((button) => {
            button.addEventListener("click", () => {
                const categoryId = button.dataset.id;
                loadCategoryForEditing(categoryId);
            });
        });

        document.querySelectorAll(".btn-delete").forEach((button) => {
            button.addEventListener("click", () => {
                const categoryId = button.dataset.id;
                deleteCategory(categoryId);
            });
        });
    };

    const loadCategoryForEditing = async (id) => {
        try {
            const response = await fetch(`${API_URL}${id}/`);
            if (response.ok) {
                const category = await response.json();
                document.getElementById("category-name").value = category.name;
                document.getElementById("encargado").value = category.encargado;

                const submitButton = document.getElementById("submit-button");
                submitButton.textContent = "Guardar";
                submitButton.dataset.id = id;

                document.getElementById("cancel-button").style.display = "inline-block";
            } else {
                alert("Error al cargar la categoría.");
            }
        } catch (error) {
            console.error("Error al cargar la categoría:", error);
        }
    };

    const deleteCategory = async (id) => {
        if (!confirm("¿Estás seguro de que deseas eliminar esta categoría?")) return;

        try {
            const response = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
            if (response.ok) {
                alert("Categoría eliminada con éxito.");
                loadCategories();
            } else {
                alert("Error al eliminar la categoría.");
            }
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const name = document.getElementById("category-name").value.trim();
        const encargado = document.getElementById("encargado").value.trim();
        const submitButton = document.getElementById("submit-button");
        const id = submitButton.dataset.id;
        const method = id ? "PUT" : "POST";
        const url = id ? `${API_URL}${id}/` : API_URL;

        if (!name || !encargado) {
            alert("El nombre y el encargado son obligatorios.");
            return;
        }

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, encargado }),
            });

            if (response.ok) {
                alert(id ? "Categoría actualizada con éxito" : "Categoría agregada con éxito");
                resetForm();
                loadCategories();
            } else {
                alert("Error al guardar la categoría.");
            }
        } catch (error) {
            console.error("Error al guardar la categoría:", error);
        }
    };

    const resetForm = () => {
        document.getElementById("category-form").reset();
        const submitButton = document.getElementById("submit-button");
        const cancelButton = document.getElementById("cancel-button");
        submitButton.textContent = "Agregar";
        delete submitButton.dataset.id;
        cancelButton.style.display = "none";
    };

    document.getElementById("cancel-button").addEventListener("click", resetForm);
    document.getElementById("category-form").addEventListener("submit", handleFormSubmit);

    loadCategories();
});
