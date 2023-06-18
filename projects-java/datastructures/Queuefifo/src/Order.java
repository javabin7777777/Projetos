class Order {
   private int id;// número da mesa.
   private String name;// nome do prato.
   private Order pointer;// aponta para o próximo nó


   /**
    * @return the id
    */
   public int getId() {
      return id;
   }
   /**
    * @param id the id to set
    */
   public void setId(int id) {
      this.id = id;
   }

   /**
    * @return the name
    */
   public String getName() {
      return name;
   }
   /**
    * @param name the name to set
    */
   public void setName(String name) {
      this.name = name;
   }

   /**
    * @return the pointer
    */
   public Order getPointer() {
      return pointer;
   }
   /**
    * @param pointer the pointer to set
    */
   public void setPointer(Order pointer) {
      this.pointer = pointer;
   }
}
