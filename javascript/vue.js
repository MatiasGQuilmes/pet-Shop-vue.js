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
     agradecimiento(){
        Swal.fire('SEND!', '', 'success')
      },


  },
  computed:{
    filtroSearch(){
      let search = this.backupProducts.filter(product => product.nombre.toLowerCase().includes(this.textSearch.toLowerCase()))
      this.products = search
      if (this.checkbox.length > 0) {
          let checkbox = this.backupProducts.filter(product => product.tipo == this.checkbox)
          this.products= search.filter(products => {return checkbox.includes(products)})
      }
    },

  }

}).mount('#app')
