import java.util.Random;
import java.util.Scanner;

class ListManager {
   private static Scanner input=new Scanner(System.in);
   private static Product head; // cabeça.
   private static Product tail; // cauda.
   private static Product temp;
   private static long code;
   private static Random rand=new Random(10);

   public static void add() {
      System.out.printf("  Enter with the name: ");
      String name=input.nextLine();
      System.out.printf("%n  Enter with the price: ");
      int price=input.nextInt();
      System.out.printf("%n  Enter with the quanty: ");
      int quanty=input.nextInt();
      code=Math.abs(1000*rand.nextInt());// barcode.
      Product product=new Product();
      product.setName(name);
      product.setBarCode(code);
      product.setprice(price);
      product.setQuanty(quanty);
      if(head == null) {
         head=product;
         head.setpNext(null);
         head.setpBack(null);
         tail=product;
         tail.setpNext(null);
         tail.setpBack(null);
      }else {
         if(head.getpNext() == null) { 
            head.setpNext(product);
            tail=product;
            tail.setpBack(head);
            tail.setpNext(null);
         }else { 
            tail.setpNext(product);
            product.setpBack(tail);
            product.setpNext(null);
            tail=product;
         }
      }
      System.out.println();
      System.out.println(("Insert okay\n"));
   }

   public static void remove() {
      Boolean find=false;
      Product before=null;
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
            System.out.printf("\nEnter with the name: ");
            String name=input.nextLine();
            temp=head;
            if(temp.getpNext()==null) {
               head=null;// nó removido.
               find=true;
            }else {
                  while(temp!=null) { 
                     if(temp.getName().equalsIgnoreCase(name)) {
                        before.setpNext(temp.getpNext());// nó antecessor ao nó removido,aponta para o nó sucessor ao nó removido.
                        temp.getpNext().setpBack(before);// nó sucessor ao nó removido,aponta para o nó antecessor ao nó removido.
                        temp=null;
                        before=null;
                        find=true;
                        break;
                     }
                     before=temp;
                     temp=temp.getpNext();
                  }
            }
            System.out.println();
            if(!find) System.out.println("\nProduct not found!\n");
            else System.out.println("\nREMOVED\n");

      }
   }

   public static void list() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         temp=head;
         System.out.println();
         while(temp!=null) {
            System.out.println();
            System.out.printf("%s  %d  %d  %d  %d%n",temp.getName(),temp.getQuanty(),temp.getprice(),temp.getBarCode());
            temp=temp.getpNext();
         }
         System.out.println();
      }
   }
}
