class Listbuys {
      private  String [] product;// nome do produto.
      private  int [] quanty;// quantidade de produto.

     /**
       * @param size the size to set
      */
      public void setSize(int size) {
            this.product=new String[size];
            this.quanty= new int [size];
      }


            /**
       * @return the product
       */
      public String[] getProduct() {
            return product;
      }


      /**
       * @return the quanty
       */
      public int[] getquanty() {
            return quanty;
      }


      // inserir produto.
      public void insertProduct(String nameProduct, int quantyProduct,int mark) {
            product[mark]=nameProduct;
            quanty[mark]=quantyProduct;
     }

     // listar os produtos.
     public void listProduct(int mark) {
            for(int i=0;i<mark;i++) {
                  System.out.printf(" %s  %d  ",product[i],quanty[i]);
            }
            System.out.println("\n");
     }
}

