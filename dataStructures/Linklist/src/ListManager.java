import java.util.Random;
import java.util.Scanner;

class ListManager {
   private static Scanner input=new Scanner(System.in);
   private static Pacient head;
   private static Pacient tail;
   private static Pacient temp;  
   private static int id;
   private static Random rand=new Random(100);

   public static void add() {
      System.out.printf("Enter with the name: ");
      String name=input.nextLine();
      System.out.printf("%nEnter with the state: ");
      String state=input.nextLine();
      System.out.println();
      id=Math.abs(1000*rand.nextInt());
      Pacient pacient=new Pacient();
      pacient.setId(id);
      pacient.setName(name);
      pacient.setState(state);
      if(head == null) {
         head=pacient;
         tail=pacient;
      }else {
         if(head.getPointer() == null) {
            head.setPointer(pacient); 
            tail=pacient;
         }else { 
            tail.setPointer(pacient);
            tail=pacient;
         }
      }
      System.out.println(("Insert okay\n"));
   }

   public static void remove() {
      Boolean find=false;
      Pacient before=null;
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         System.out.printf("\nEnter with the name: ");
         String name=input.nextLine();
         System.out.println();
         temp=head;
         while(temp!=null) {
            if(temp.getName().equals(name)) {
              before.setPointer(temp.getPointer());
              temp=null;// o que foi removido.
              find=true;
              System.out.println("\n REMOVED\n");
              break;
            }
            before=temp;
            temp=temp.getPointer();
         }
         if(!find) System.out.println("\nPatient not found!\n");
      }
   }

   public static void list() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         temp=head;
         System.out.println();
         while(temp!=null) {
            System.out.println();
            System.out.printf("%d  %s  %s%n",temp.getId(),temp.getName(),temp.getState());
            temp=temp.getPointer();
         }
         System.out.println();
      }
   }
}
