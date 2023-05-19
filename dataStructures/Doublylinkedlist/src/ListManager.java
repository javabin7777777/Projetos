import java.util.Random;
import java.util.Scanner;

class ListManager {
   private static Scanner input=new Scanner(System.in);
   private static Product head; // cabeça da lista.
   private static Product tail; // cauda da lista.
   private static Product temp;
   private static Random rand=new Random(10);

   // adiciona elemento na lista.
   public static void add() {

      System.out.printf("  Enter with the name: ");
      String name=input.nextLine();
      System.out.printf("%n  Enter with the price: ");
      int price=input.nextInt();
      System.out.printf("%n  Enter with the quanty: ");
      int quanty=input.nextInt();
      long code=Math.abs(1000*rand.nextInt());// barcode.
      Product product=new Product();
      product.setName(name);
      product.setBarCode(code);
      product.setprice(price);
      product.setQuanty(quanty);
      if(head == null) {
         head=product;
         tail=product;
         head.setpNext(null);
         head.setpBack(null);
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

   // remove elemento da lista.
   public static void remove() {

      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
            Boolean find=false;
            Product before=null;
            System.out.printf("\nEnter with the name: ");
            String name=input.nextLine();
            temp=head;
            if(temp.getpNext()==null) {
               head=null;
               find=true;
            }else {
                  while(temp!=null) {
                     if(temp.getName().equalsIgnoreCase(name)) { // match
                        before.setpNext(temp.getpNext());
                        temp.getpNext().setpBack(before);
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
            else System.out.println("\nPRODUCT REMOVED\n");

      }
   }

   // lista todos elemento da lista.
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

   // atualiza os componentes de um elemento da lista.
   public static void update() {

      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
            Boolean find=false;
            System.out.printf("\nEnter with the name: ");
            String name=input.nextLine();// nome do produto a ser pesquisado.
            temp=head;
            while(temp!=null) { // busca para frente(forward) do produto a ser atualizado.
               if(temp.getName().equalsIgnoreCase(name)) { // match.
                  find=true;
                  System.out.println("Product found: \n");
                  System.out.printf("%s  %d  %d  %d  %d%n",temp.getName(),temp.getQuanty(),temp.getprice(),temp.getBarCode());
                  while(true) { // atualização dos componentes do nó.
                     System.out.println("Enter with Zero to go out");
                     System.out.println("1. Name");
                     System.out.println("2. Price");
                     System.out.println("3. Quantify\n");
                     int num=input.nextInt();
                     switch(String.valueOf(num)) {
                        case "1":
                           System.out.printf(" Name: ");
                           name=input.nextLine();
                           temp.setName(name);break;
                        case "2":
                           System.out.printf("%n Price: ");
                           double price=input.nextInt();
                           temp.setprice(price);break;
                        case "3":
                           System.out.printf("% Price: ");
                           int quanty=input.nextInt();
                           temp.setQuanty(quanty);
                     }
                     if(num==0) break;
                  }
                  break;
               }
               temp=temp.getpNext();// atualiza para o próximo produto.
            }
            System.out.println();
            if(!find) System.out.println("\nProduct not found!\n");
            else System.out.println("\nProduct updated\n");
         }
   }
}
