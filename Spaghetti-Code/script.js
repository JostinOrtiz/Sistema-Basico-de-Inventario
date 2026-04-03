let productos =[];
let editandoID = null;

const elements = {
form: document.querySelector('#form-register'),
contador: document.querySelector('#numberProducts'),
lista: document.querySelector('#listProducts'),
numerico: document.querySelector('#numberProducts'),
btnfilter: document.querySelector('.buton-filter'),

nombre: document.querySelector('#nombre'),
precio: document.querySelector('#precio'),
stock: document.querySelector('#stock'),
categoria: document.querySelector('#categoria'),
seleccion: document.querySelector('#opcions'),
agregar: document.querySelector('.butons')
}

function nombreCorrecto(nombre){
    return nombre.trim().length >=3;
}

function valorCorrecto(valor){
    return Number.isFinite(valor) && valor>=0;
}

function categorizarProducto(cantidad){
    if(cantidad === 0) return "❌";
    if(cantidad<=6) return "⚠️";
    return "✅";
}

function deleteProduct(idproduct){
    const seach = productos.some(pid => pid.id === idproduct);
    if(!seach) return;
    productos = productos.filter(p=>p.id !== idproduct);
    renderTodo();
    return;
}

function editProduct(idproduct){
    const seach = productos.some(pid =>pid.id === idproduct);
    if(!seach) return;

    const product = productos.find(p=>p.id === idproduct);
    elements.nombre.value = product.nombre;
    elements.precio.value = product.precio;
    elements.stock.value = product.stock;
    elements.categoria.value = product.categoria;
    editandoID = idproduct;
    elements.agregar.textContent = 'Actualizar Producto';
    renderTodo();   
    return;
}

function productCounter(number){
    elements.numerico.textContent = `Registros: ${number}`;
    if(number === 0) return elements.lista.textContent = `No tienes registros`;
    return;
}

function getUniqueCategories(product){
    const listcategorie = product.map(p=>p.categoria);
    const filtercategorie = product.filter((p,i)=>{
        return listcategorie.indexOf(p.categoria) === i;
    })
    return filtercategorie.map(p=>p.categoria);
}

function filterCategorie(valueCategorie){
    if(valueCategorie === "todos") return productos;

    return productos.filter(p=>{
        const formatCategorie = p.categoria.toLowerCase().trim().replaceAll(' ','-');
        return formatCategorie === valueCategorie;
    })
}

function valueCateogorie(listProduct){
    const nameCategorie = getUniqueCategories(listProduct);
    return nameCategorie.map(n=>n.toLowerCase().trim().replaceAll(' ','-'));
}

function saveProduct(){
    localStorage.setItem('products',JSON.stringify(productos));
}

function renderTodo(){
    renderProducts();
    renderSelectCategorie(); 
    saveProduct();
}

document.addEventListener('DOMContentLoaded',()=>{
    productos = JSON.parse(localStorage.getItem('products')) || [];
    renderTodo();
})

function renderSelectCategorie(){
    elements.seleccion.innerHTML='';
    const cateogireFilter = getUniqueCategories(productos);
    const categorieValue = valueCateogorie(productos);
    const allOption = document.createElement('option');
    allOption.textContent = 'Todos los productos';
    allOption.value = 'todos';
    elements.seleccion.append(allOption);
    cateogireFilter.forEach((p,i) => {
        const option = document.createElement('option');
        option.textContent = p;
        option.value = categorieValue[i];
        elements.seleccion.append(option);
    });
}

elements.btnfilter.addEventListener('click',()=>{
    const select = elements.seleccion.value;
    const listFilter = filterCategorie(select);
    renderProducts(listFilter);
})

function renderProducts(fact = productos){
    elements.lista.innerHTML='';

    productCounter(fact.length);

    if(fact.length === 0) return;
    
    fact.forEach(product=>{
        const newProduct = document.createElement('span');
        const productEstade = categorizarProducto(product.stock);

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Eliminar';
        btnDelete.classList.add('btn-delete');

        btnDelete.addEventListener('click',()=>{
            deleteProduct(product.id);
        })

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Editar';
        btnEdit.classList.add('btn-Edit');

        btnEdit.addEventListener('click', ()=>{
            editProduct(product.id);
        })

        newProduct.textContent = `Nombre: ${product.nombre} |Precio: ${product.precio} |Stock: ${product.stock} |Categoria: ${product.categoria}
        |Total x producto: ${product.stock * product.precio} |Estado: ${productEstade}`;

        elements.lista.append(newProduct,btnEdit,btnDelete);
    });
}
elements.form.addEventListener('submit', function(event){
    event.preventDefault();

    const nombre = elements.nombre.value;
    const precio = Number(elements.precio.value);
    const stock = Number(elements.stock.value);
    const categoria = elements.categoria.value;

    if(!nombreCorrecto(nombre) || !nombreCorrecto(categoria)) return alert('el nombre tiene que tener mas de 3 caracteres');
    if(!valorCorrecto(precio) || !valorCorrecto(stock)) return alert('el precio y stock no deben ser negativos');

        if(editandoID===null){
            const newRegister = {id:Date.now(),nombre,precio,stock,categoria};
            productos = [...productos,newRegister];
        }
        else{
            const editRegister = productos.findIndex(p=>p.id === editandoID);
            productos[editRegister] = {...productos[editRegister], nombre,precio,stock,categoria};

            editandoID = null;
            elements.agregar.textContent = 'Agregar';
        }
        console.log(productos)
        renderTodo();
        elements.form.reset();
});