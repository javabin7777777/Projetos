import java.util.Random;
import java.util.Scanner;

// lista duplamente encadeada.
class ListManagerProduct {
   private static Scanner input=new Scanner(System.in);
   private static Random rand=new Random(10);
   private static Boolean find;
   private static Product head; // cabeça da lista.
   private static Product tail; // cauda da lista.
   private static Product temp;


   // adiciona um novo nó(ou produto) na lista.
   public static void add() {
      System.out.printf("  Enter with the product name: ");
      input.nextLine();
      String name=input.nextLine();
      System.out.printf("%n  Enter with the product price: ");
      Double price=input.nextDouble();
      System.out.printf("%n  Enter with the product quanty: ");
      int quanty=input.nextInt();
      Long code=Math.abs(1000*rand.nextLong());// barcode.
      Product product=new Product();// cria um novo nó com os atributos vazios.
      product.setName(name);
      product.setPrice(price);
      product.setQuanty(quanty);
      product.setBarCode(code);
      if(head == null) {// adiciona 1º elemento(cabeça da lista).
         head=product;
         tail=product;//cauda da lista aponta para o 1º elemento.
         head.setpNext(null);
         head.setpBack(null);
         tail.setpNext(null);
         tail.setpBack(null);
      }else {
         if(head.getpNext() == null) { // adiciona 2º elemento.
            head.setpNext(product);// aponta para o 2º elemento.
            tail=product;// atualiza a cauda da lista que agora aponta para o 2º elemento.
            tail.setpBack(head);// aponta para o primeiro elemento da lista,a cabeça.
            tail.setpNext(null);
         }else { // adiciona outros elementos.
            tail.setpNext(product);
            product.setpBack(tail);
            product.setpNext(null);
            tail=product;// atualiza a cauda com o novo elemento inserido.
         }
      }
      System.out.println(("\nInsert okay\n"));
   }


   // remove um nó da lista,conforme o nome do produto inserido,caso for encontrado.
   public static void remove() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         find=false;
         Product before=null;
         System.out.printf("\nEnter with the product name: ");
         input.nextLine();
         String name=input.nextLine();// nome do produto a ser pesquisado.
         temp=head;
         if(temp.getpNext()==null) {
            System.out.printf("%n%S %s %d %.2f %l%n","product removed:",temp.getName(),
            temp.getQuanty(),temp.getPrice(),temp.getBarCode());
            head=null;// nó removido.
            find=true;
         }else {
               while(temp!=null) { // busca para frente(forward) do produto a ser removido.
                  if(temp.getName().equalsIgnoreCase(name)) { // match
                     find=true;
                     System.out.printf("%n%S  %s  %d  %.2f  %l%n","product removed:",
                     temp.getName(),temp.getQuanty(),temp.getPrice(),temp.getBarCode());
                     before.setpNext(temp.getpNext());// nó antecessor ao nó removido,aponta para o nó sucessor ao nó removido.
                     temp.getpNext().setpBack(before);// nó sucessor ao nó removido,aponta para o nó antecessor ao nó removido.
                     temp=null;
                     before=null;
                     break;
                  }
                  before=temp;// guarda o nó anterior.
                  temp=temp.getpNext();// atualiza para o próximo nó.
               }
         }
         if(!find) System.out.println("\nProduct not found!\n");
      }
   }


   // lista todos os nós.
   public static void list() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         temp=head;// primeiro nó(cabeça da lista).
         System.out.println(" List The Products");
         while(temp!=null) {
            System.out.println();
            System.out.printf("%n%s  %d  %.2f  %l%n",temp.getName(),temp.getQuanty(),temp.getPrice(),
            temp.getBarCode());
            temp=temp.getpNext();
         }
         System.out.println();
      }
   }

   // atualiza os componentes de um nó.
   public static void updateProduct() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
            find=false;
            System.out.printf("\nEnter with the product name: ");
            input.nextLine();
            String name=input.nextLine();// nome do produto a ser pesquisado.
            temp=head;
            while(temp!=null) { // busca para frente(forward) do produto a ser atualizado.
               if(temp.getName().equalsIgnoreCase(name)) { // match.
                  find=true;
                  System.out.println("\nProduct found: \n");
                  System.out.printf("%n %s  %d  %.2f  %l%n%n",temp.getName(),temp.getQuanty(),
                  temp.getPrice(),temp.getBarCode());
                  while(true) { // atualização dos componentes do nó.
                     System.out.println("1. Name");
                     System.out.println("2. quanty");
                     System.out.println("3. Price");
                     System.out.println("0. Zero to go\n");
                     int num=input.nextInt();
                     switch(String.valueOf(num)) {
                        case "1":
                           System.out.printf("%n Name: ");
                           name=input.nextLine();
                           temp.setName(name);break;
                        case "2":
                           System.out.printf("%n Quanty: ");
                           int quanty=input.nextInt();
                           temp.setQuanty(quanty);break;
                        case "3":
                           System.out.printf("%n Price: ");
                           Double price=input.nextDouble();
                           temp.setPrice(price);
                        case  "0":  System.out.printf("%n%S%n","logout");
                        default:    System.out.println("\nOptions:1,2,3 or 0 only");
                     }
                     System.out.println("\nProduct updated: \n");
                     System.out.printf("%n %s  %d  %.2f  %l%n",temp.getName(),temp.getQuanty(),
                     temp.getPrice(),temp.getBarCode());
                     if(num==0) break;
                  }
                  break;
               }
            temp=temp.getpNext();
         }
         if(!find) System.out.println("\nProduct not found!\n");
      }
   }

}
