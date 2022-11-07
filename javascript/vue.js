const app = Vue.createApp({
  data() {
    return {
        products: [],
        backupProducts: [],
        juguetes:[],
        farmacia:[],
        checkbox:[],
        api:"https://apipetshop.herokuapp.com/api/articulos",

        id: new URLSearchParams(location.search).get("id"),
        textSearch: "", 
        detailProduct: [],
       
	      test:{},
	      category:[],

	      carrito:[],

    }
  },
  created(){

    this.loadData(this.api) 


  },mounted(){


    let local = JSON.parse(localStorage.getItem('carrito'))

    if(local !== null){
	    this.carrito = local
    }
    
  },



  methods:{
    loadData(url){
        fetch(url)
        .then(response => response.json()
            .then(data => {
              this.products = data.response
          
              this.backupProducts = this.products

              this.detailProduct = this.products.find( e => e._id == this.id)
             





            })
        ).catch(err => console.log(err.message))




    },
     agradecimiento(){
        swal.fire('SEND!', '', 'success')
      },
      agregarAlCarrito(elemento){

      
        

        let existe = this.carrito.some( item => item.nombre == elemento.nombre)

        if(existe){

          this.carrito.forEach(producto =>{
            if(producto.nombre == elemento.nombre){
              producto.cantidad++
              if(producto.cantidad > producto.stock){
                producto.cantidad = producto.stock
              }
            }

          })


        }
        else{
        this.carrito.push({

          nombre:elemento.nombre,
          imagen: elemento.imagen,
          precio:elemento.precio,
          cantidad: 1,
          stock: elemento.stock,
          alertaStock: '',
        
        })}

        
        this.alertaCarrito(elemento)

        this.guardarCarrito
        
      },vaciarCarrito(){
        this.carrito = []
        this.guardarCarrito
    },sumarCantidad(producto){

      this.carrito.forEach( item =>{
        if(item.nombre == producto.nombre){

          item.cantidad++

          if(item.cantidad >= item.stock){
            item.cantidad = item.stock
            item.alertaStock = `Maximo de stock disponible: ${item.stock}`
          }
          
          

        }
      })
      this.guardarCarrito
    },restarCantidad(producto){

      this.carrito.forEach( item =>{

        if(item.nombre == producto.nombre){

          item.cantidad--

          if(item.cantidad == 0){

            this.carrito = this.carrito.filter(items => items.nombre != producto.nombre)

          }

          if(item.cantidad <= item.stock){
            
            item.alertaStock = ``
          }
        }
      })

      this.guardarCarrito
    },borrarProducto(producto){

      let arrayFiltrado = this.carrito.filter( items => items.nombre != producto.nombre)

      this.carrito = arrayFiltrado
      this.guardarCarrito

    },alertaCarrito(producto){

      let item = this.carrito.find(elemento => elemento.nombre == producto.nombre)

      if(producto.stock == item.cantidad ){
        swal("Oops!", "Parece que excediste el limite de stock disponible", "error");
      } else{
        swal( "El producto ha sido agregado al carrito")
      }
    },guardarCarrito(){
      localStorage.setItem('carrito',JSON.stringify(this.carrito))
    }

  },
  computed:{
    filtroSearch(){

      let search = this.backupProducts.filter(product => product.nombre.toLowerCase().includes(this.textSearch.toLowerCase()))
      this.products = search
      if (this.checkbox.length > 0) {
          let checkbox = this.backupProducts.filter(product => product.tipo == this.checkbox)
          this.products= search.filter(products => {return checkbox.includes(products)})
      }
    },subTotal(){

      acu = 0
      this.carrito.forEach(item => {
       acu +=  item.cantidad*item.precio

      })

     
      return acu
    },total(){

      total = this.subTotal *1.21
      return total.toFixed(2)

    },guardarCarrito(){
      localStorage.setItem('carrito',JSON.stringify(this.carrito))
    },totalCarrito(){
      
      let acu = 0
       this.carrito.forEach( item => acu+= item.cantidad)
       return acu
    }


  }

}).mount('#app')



