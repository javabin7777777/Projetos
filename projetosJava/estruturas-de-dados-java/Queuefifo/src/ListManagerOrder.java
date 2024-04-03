import java.util.Scanner;

// queue fifo.
class ListManagerOrder {
   private static Scanner input=new Scanner(System.in);
   private static Order head;
   private static Order temp;
   private static Boolean find=false;

   // adiciona pedido.
   public static void add() {
      System.out.printf("%nEnter the table number: ");
      int tableNumber=input.nextInt();
      System.out.printf("Enter the  dish name: ");
      input.nextLine();
      String name=input.nextLine();
      Order request=new Order();
      request.setId(tableNumber);
      request.setName(name);
      if(head == null) {// adiciona 1º elemento.
         head=request;
         temp=head;
      }else { //adiciona outros elementos após o nó cabeça da fila.
         temp.setPointer(request);
         temp=request;
      }
      System.out.println(("\nInsert okay\n"));
   }

   // remove pedido.
   public static void remove() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         System.out.printf("%n %s  %d  %s  %s  %n","Table:",head.getId(),
         "Dish:",head.getName());
         head=head.getPointer();// novo nó na cabeça da fila.
         System.out.printf("%n%S","order removed");
      }
   }

   // lista todos pedidos.
   public static void list() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         temp=head;// primeiro nó,ou cabeça da fila.
         System.out.println();
         while(temp!=null) {
            System.out.println();
            System.out.printf(" Table nº: %d  Dish: %s%n",temp.getId(),temp.getName());
            temp=temp.getPointer();
         }
         System.out.println();
      }
   }

   //atualiza o número da mesa e/ou nome do prato.
   public static void updateRequest() {
      find=false;
      System.out.printf("% s "," Enter the table number: ");
      int tableNumber=input.nextInt();
      temp=head;
      while(temp!=null) {
         if(temp.getId()==tableNumber) { // match
            System.out.printf("%n%S %s  %d  %s  %s ","found: ","Table:",temp.getId(),
            "Dish:",temp.getName());
            while(true) {
               System.out.println("1. Update table number");
               System.out.println("2. Update dish name");
               System.out.println("0. zero to go\n");
               int in=input.nextInt();
               switch(String.valueOf(in)) {
                  case "1":   System.out.printf(" Enter new table number: ");
                              tableNumber= input.nextInt();
                              temp.setId(tableNumber);
                              System.out.printf("%n %s %d  %s  %s   %S ","Table:",temp.getId(),
                              "Dish:",temp.getName(),"updated");
                              find=true;break;

                  case "2":   System.out.printf(" Enter new dish name: ");
                              input.nextLine();
                              String name=input.nextLine();
                              temp.setName(name);
                              System.out.printf("%n %s %d  %s  %s   %S ","Table:",temp.getId(),
                              "Dish:",temp.getName(),"updated");
                              find=true;break;

                  default:    System.out.println(" Options 1,2 or 0(zero) only.");
               }
               if(in==0) break;
            }
         }
         temp=temp.getPointer();
      }
      if(!find) System.out.printf(" %n %S%n","player not found");
   }
}
