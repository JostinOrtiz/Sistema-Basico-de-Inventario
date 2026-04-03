export class Producto{
    constructor(id,nombre,precio,stock,categoria){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }

    estadoStock(){
        if(this.stock===0) return `❌`;
        if(this.stock<=6) return `⚠️`;
        return `✅`;
    }

    calcularTotal(){
        return this.stock * this.precio;
    }
}