const { createApp } = Vue

createApp({
  data() {
    return {
        products: [],
        juguetes:[],
        farmacia:[],
        message: "hola",
        api:"https://apipetshop.herokuapp.com/api/articulos"
        

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
              console.log(products)



            })
        ).catch(err => console.log(err.message))
    }


  },
  computed:{
  /*   filtroSearch(){
        let filtroSearch = this.products.filter(product => product.name.toLowerCase().includes(this.textSearch.toLowerCase()))    
        if(this.filterCategory.length){
            this.products = checkDesk.filter(e => this.filterCategory.includes(e.category))
        }else{
            this.products = primerFiltro
           
    } */


    
  }

}).mount('#app')