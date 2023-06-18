class Store {
   private Long id; //código do produto.
   private String nameProduct; //nome do produto.
   private Integer quantyProduct; //quantidade do produto.

   /**
    * @param id
    * @param nameProduct
    * @param quantyProduct
    */
   public Store(Long id, String nameProduct, Integer quantyProduct) {
      this.id = id;
      this.nameProduct = nameProduct;
      this.quantyProduct = quantyProduct;
   }

   /**
    * @return the id
    */
   public Long getId() {
      return id;
   }

   

}