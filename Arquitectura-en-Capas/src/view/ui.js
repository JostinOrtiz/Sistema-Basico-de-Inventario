export const elements = {
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

export function renderProducts(productos, onDelete, onEdit){
    elements.lista.innerHTML='';

    productCounter(productos.length);

    if(productos.length === 0) return;
    
    productos.forEach(product=>{
        const newProduct = document.createElement('span');

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Eliminar';
        btnDelete.classList.add('btn-delete');

        btnDelete.addEventListener('click',(e)=>{
            e.preventDefault();
            onDelete(product.id);
        })

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Editar';
        btnEdit.classList.add('btn-Edit');

        btnEdit.addEventListener('click', (e)=>{
            e.preventDefault();
            onEdit(product.id);
            elements.agregar.textContent = `Editar`;
        })
                
        newProduct.textContent = `Nombre: ${product.nombre} |Precio: ${product.precio} |Stock: ${product.stock} |Categoria: ${product.categoria}
        |Total x producto: ${product.calcularTotal()} |Estado: ${product.estadoStock()}`;

        elements.lista.append(newProduct,btnEdit,btnDelete);
    });
}

export function setFormMod(mode){
    if(mode === 'edit'){
        elements.agregar.textContent = `Editar`;
    }else{
        elements.agregar.textContent = `Agregar`;
    }
}

function nombreCorrecto(nombre){
    return nombre.trim().length >=3;
}
function valorCorrecto(valor){
    return Number.isFinite(valor) && valor>=0;
}
export function initForm(onSubmit){
    elements.form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const data ={
            nombre: elements.nombre.value,
            precio: Number(elements.precio.value),
            stock: Number(elements.stock.value),
            categoria: elements.categoria.value
        }
    if(!nombreCorrecto(data.nombre) || !nombreCorrecto(data.categoria)) return alert('el nombre tiene que tener mas de 3 caracteres');
    if(!valorCorrecto(data.precio) || !valorCorrecto(data.stock)) return alert('el precio y stock no deben ser negativos');
        onSubmit(data);
        elements.form.reset();
    });
}

export function renderCategoria(categorias){
    elements.seleccion.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.textContent = 'Todos los productos';
    allOption.value = 'todos';
    elements.seleccion.append(allOption);

    categorias.forEach(cat =>{
    const option = document.createElement('option');
    option.textContent = cat;
    option.value = cat.toLowerCase().trim().replaceAll(' ','-');
    elements.seleccion.append(option);
    })
}

export function initFilter(onFilter){
    elements.seleccion.addEventListener('change',(e)=>{
        onFilter(e.target.value);
    });
}

export function fillForm(producto){
    elements.nombre.value = producto.nombre,
    elements.precio.value = producto.precio,
    elements.stock.value = producto.stock,
    elements.categoria.value = producto.categoria
}

export function renderTodo(){
    renderProducts();
    renderSelectCategorie(); 
    saveProduct();
}

function productCounter(number){
    elements.numerico.textContent = `Registros: ${number}`;
    if(number === 0) return elements.lista.textContent = `No tienes registros`;
    return;
}