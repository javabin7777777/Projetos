class Listbuys {
      private int size;
      private  String [] product;
      private  int [] quantify;
     // private  String [] productTemp;
     // private  int [] quantifyTemp;

     /**
       * @param size the size to set
      */
      public void setSize(int size) {            
            this.product=new String[size];
            this.quantify= new int [size];
      }


            /**
       * @return the product
       */
      public String[] getProduct() {
            return product;
      }


      /**
       * @return the quantify
       */
      public int[] getQuantify() {
            return quantify;
      }

      public void insertProduct(String name, int quanty,int mark) {          
            product[mark]=name;
            quantify[mark]=quanty;
      //return "";
     }
     public void listProduct(int mark) {
            for(int i=0;i<mark;i++) {
                  System.out.printf(" %s  %d  ",product[i],quantify[i]);
            }
            System.out.println("\n");
     }
}

