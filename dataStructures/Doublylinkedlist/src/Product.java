class Product {
   private String name;
   private long barCode;
   private double price;
   private int quanty;
   private Product pNext;
   private Product pBack;
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
    * @param barCode the barCode to set
    */
   public void setBarCode(long barCode) {
      this.barCode = barCode;
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
   public void setprice(int price) {
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
