class Product {
   private String name;// nome do produto.
   private long barCode;// código do produto.
   private double price;// preço do produto.
   private int quanty;// quantidade do produto.
   private Product pNext;// aponta para o próximo nó.
   private Product pBack;// aponta para o nó anterior.
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
    * @return the barCode
    */
   public long getBarCode() {
      return barCode;
   }
   /**
    * @param code the barCode to set
    */
   public void setBarCode(long code) {
      this.barCode = code;
   }
   /**
    * @return the price
    */
   public double getprice() {
      return price;
   }
   /**
    * @param price the price to set
    */
   public void setprice(double price) {
      this.price = price;
   }
   /**
    * @return the quanty
    */
   public int getQuanty() {
      return quanty;
   }
   /**
    * @param quanty the quanty to set
    */
   public void setQuanty(int quanty) {
      this.quanty = quanty;
   }
   /**
    * @return the pNext
    */
   public Product getpNext() {
      return pNext;
   }
   /**
    * @param pNext the pNext to set
    */
   public void setpNext(Product pNext) {
      this.pNext = pNext;
   }
   /**
    * @return the pBack
    */
   public Product getpBack() {
      return pBack;
   }
   /**
    * @param pBack the pBack to set
    */
   public void setpBack(Product pBack) {
      this.pBack = pBack;
   }
}
