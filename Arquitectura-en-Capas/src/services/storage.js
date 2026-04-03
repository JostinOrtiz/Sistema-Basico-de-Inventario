
export function saveProducts(productos){
    localStorage.setItem('products',JSON.stringify(productos));
}

export function getProducts(){
    return JSON.parse(localStorage.getItem('products')) || [];
}
