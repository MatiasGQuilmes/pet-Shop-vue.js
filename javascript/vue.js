const app = Vue.createApp({
  data() {
    return {
        products: [],
        backupProducts: [],
        juguetes:[],
        farmacia:[],
        categorias: [],
        api:"https://apipetshop.herokuapp.com/api/articulos",
        
        id: new URLSearchParams(location.search).get("id"),
        textSearch: "", 
        detailProduct: []

    }
  },
  created(){
    this.loadData(this.api) 
  },
  methods:{
    loadData(url){
        fetch(url)
        .then(response => response.json()
            .then(data => {
              this.products = data.response
              this.backupProducts = this.products

              this.detailProduct = this.products.find( e => e._id == this.id)

              
              this.juguetesFiltered()
             
             
             

            })
        ).catch(err => console.log(err.message))
    },juguetesFiltered(){

      let categoryFiltered = [] 
      
      this.categorias.filter(e => e.tipo)
      console.log(categoryFiltered);
      
      categoryFiltered.foreach(i =>{
        this.products.forEach(e => {
          if(e.tipo == i){
            this.juguetes.push(e)
          }
        })

      
        this.products.forEach(e => {
          if(e.tipo == i){
            this.farmacia.push(e)
          }
        })
      })
      
        
    }
  
    },
  computed:{
      filtroSearch(){
        let search = this.backupProducts.filter(product => product.nombre.toLowerCase().includes(this.textSearch.toLowerCase()))
        this.products = search
      }
    
  }

}).mount('#app')