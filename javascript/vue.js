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
	category:[]
	
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






            })
        ).catch(err => console.log(err.message))
 



    },



  },
  computed:{
      filtroSearch(){
	let search = this.backupProducts.filter(product => product.nombre.toLowerCase().includes(this.textSearch.toLowerCase()))
	      console.log();
	      if (this.checkbox.length > 0) {
		let checkbox = this.backupProducts.filter(product => product.tipo.includes(this.checkbox.at(-1)))
			this.products= search.filter(products => {return checkbox.includes(products)})
		 
	 }
	      else{
		      this.products = this.backupProducts
	      }


      },
	

  }

}).mount('#app')
