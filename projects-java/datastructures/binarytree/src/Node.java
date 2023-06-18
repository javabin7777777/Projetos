import java.util.Random;
import java.util.Scanner;

class Node {
   private Scanner input=new Scanner(System.in);
   private Random rand=new Random(50);
   private Node pLeft;// ponteiro esquerdo.
   private Node pRight;// ponteiro direito.
   private Store productStore;// ponteiro do nó em si.



   /**
    *
    */
   public Node() {
   }


   /**
    * @param pLeft
    * @param pRight
    * @param obj
    */
   public Node(Node pLeft, Node pRight, Store productStore) {
      this.pLeft = pLeft;// aponta para nó que está no lado esquerdo.
      this.pRight = pRight;// aponta para nó que está no lado direito.
      this.productStore = productStore;// referência para o produto.
   }


   /**
    * @return the pLeft
    */
   public Node getpLeft() {
      return pLeft;
   }


   /**
    * @param pLeft the pLeft to set
    */
   public void setpLeft(Node pLeft) {
      this.pLeft = pLeft;
   }


   /**
    * @return the pRight
    */
   public Node getpRight() {
      return pRight;
   }


   /**
    * @param pRight the pRight to set
    */
   public void setpRight(Node pRight) {
      this.pRight = pRight;
   }


   /**
    * @return the productStore
    */
   public Store getproductStore() {
      return productStore;
   }


   public Node generatorNode() {
      System.out.printf("%n Enter with the product name: ");
      input.nextLine();
      String name=input.nextLine();
      System.out.printf("%n  Enter with the product quanty: ");
      int quanty=input.nextInt();
      Long code=Math.abs(1000*rand.nextLong());// código do produto,seu Id.
      Store product=new Store(code,name,quanty);// cria o produto no estoque.
      Node node= new Node(null,null,product);//cria um novo nó.
      return node;
   }
}
