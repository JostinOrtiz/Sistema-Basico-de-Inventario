
import { Producto } from "./models/producto.js";
import { saveProducts, getProducts } from "./services/storage.js"; 
import { renderProducts, initForm,fillForm, setFormMod, renderCategoria, initFilter} from "./view/ui.js";   

let productos = [];
let editandoID = null;

function init(){
    const data = getProducts();
    productos = data.map(p=> new Producto(p.id,p.nombre,p.precio,p.stock,p.categoria));
    const categorias = getUniqueCategories(productos);
    renderCategoria(categorias);
    initFilter(handleFilter)
    renderProducts(productos, handleDelete, handleEdit);
}
init();

function handleSubmit(data){
        if(editandoID===null){
            const newRegister = new Producto(Date.now(),data.nombre,data.precio,data.stock,data.categoria);
            productos.push(newRegister);
        }
        else{
            productos = productos.map(p=>{
                if(p.id === editandoID){
                    return new Producto(editandoID,data.nombre,data.precio,data.stock,data.categoria);
                }
                return p;
                })
            setFormMod('Agregar')
            editandoID = null;
        }
        saveProducts(productos);
        renderProducts(productos, handleDelete, handleEdit);
}
initForm(handleSubmit)

function handleDelete(id){
    productos = productos.filter(p=>p.id !== id);
    saveProducts(productos);
    renderProducts(productos, handleDelete, handleEdit);
}

function getUniqueCategories(productos){
    const categorias = productos.map(p=>p.categoria);

    return categorias.filter((cat,posc)=>{
        return categorias.indexOf(cat) === posc;
    })
}

function formatCategorie(cat){
    return cat.toLowerCase().trim().replaceAll(' ','-');
}

function filterByCategory(productos,categoria){
    if(categoria === 'todos') return productos;

    return productos.filter(c=>{
        return formatCategorie(c.categoria) === categoria;
    })
}

function handleFilter(value){
    const filtrados = filterByCategory(productos,value);
    renderProducts(filtrados,handleDelete,handleEdit);
}

function handleEdit(id){
    editandoID = id;
    const seach = productos.some(p=>p.id === id);
    if(!seach) return;

    const producto = productos.find(p=>p.id === id);
    fillForm(producto);
    setFormMod('edit');
}