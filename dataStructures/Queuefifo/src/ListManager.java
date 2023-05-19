import java.util.Scanner;

class ListManager {
   private static Scanner input=new Scanner(System.in);
   private static Order head;
   private static Order temp;

   // adiciona elemento na fila.
   public static void add() {
      System.out.printf("Enter the name: ");
      String name=input.nextLine();
      System.out.printf("%nEnter the table number: ");
      int tableNumber=input.nextInt();
      Order request=new Order();
      request.setId(tableNumber);
      request.setName(name);
      // queue fifo.
      if(head == null) {
         head=request;
         temp=head;
      }else {
         temp.setPointer(request);
         temp=request;
      }
      System.out.println(("\nInsert okay\n"));
   }

   // retira elemento da fila.
   public static void remove() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         head=head.getPointer();
         System.out.println("\n ORDER REMOVED\n");
      }
   }

   // lista todos pedidos.
   public static void list() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         temp=head;
         System.out.println();
         while(temp!=null) {
            System.out.println();
            System.out.printf("Table nº: %d  Dish: %s%n",temp.getId(),temp.getName());
            temp=temp.getPointer();
         }
         System.out.println();
      }
   }
}
