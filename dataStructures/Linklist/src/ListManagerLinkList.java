import java.util.Random;
import java.util.Scanner;

// lista encadeada simples.
class ListManagerLinkList {
   private static Scanner input=new Scanner(System.in);
   private static Random rand=new Random(100);
   private static Pacient head;
   private static Pacient tail;
   private static Pacient temp;
   private static Boolean find;


   // adiciona um paciente.
   public static void add() {
      System.out.printf("Enter with the patient name: ");
      String name=input.nextLine();
      System.out.printf("%nEnter with the patient state: ");
      String state=input.nextLine();
      System.out.println();
      int id=Math.abs(1000*rand.nextInt());// id do paciente.
      Pacient pacient=new Pacient();
      pacient.setId(id);
      pacient.setName(name);
      pacient.setState(state);
      if(head == null) {// adiciona 1º elemento.
         head=pacient; // cabeça da lista.
         tail=pacient;// cauda da lista aponta para o 1º elemento.
      }else {
         if(head.getPointer() == null) {
            head.setPointer(pacient); // adiciona 2º elemento.
            tail=pacient;// atualiza a cauda da lista que agora aponta para o  2º elemento.
         }else { // adiciona outros elementos.
            tail.setPointer(pacient);
            tail=pacient;//atualiza a cauda da lista.
         }
      }
      System.out.println(("\nInsert okay\n"));
   }

   // remove um paciente.
   public static void remove() {
      find=false;
      Pacient before=null;
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         System.out.printf("\nEnter with the name: ");
         input.nextLine();
         String name=input.nextLine();
         temp=head;before=head;
         while(temp!=null) {
            if(temp.getName().equalsIgnoreCase(name)) { // match
              before.setPointer(null);// nó atual(temp) removido.
              before.setPointer(temp.getPointer());//temp.getPointer é o novo próximo do anterior ao que foi removido.
              temp=null;
              before=null;
              find=true;
              break;
            }
            before=temp;// guarda o anterior.
            temp=temp.getPointer();// atualiza para o próximo nó.
         }
         System.out.println();
         if(!find) System.out.printf("%n%s","Patient not found.");
         else System.out.printf("%n%S","patient removed.");
      }
   }

   // lista todos os pacientes.
   public static void list() {
      if(head==null) System.out.printf("%n%S","list is empty");
      else {
         temp=head;// primeiro nó.
         System.out.println();
         while(temp!=null) {
            System.out.println();
            System.out.printf("%d  %s  %s%n",temp.getId(),temp.getName(),temp.getState());
            temp=temp.getPointer();// atualiza para o próximo nó.
         }
         System.out.println();
      }
   }

   // atualiza um paciente.
   public static void updatePatient() {
      find=false;
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         temp=head;
         System.out.printf("\nEnter the patient name: ");
         input.nextLine();
         String name=input.nextLine();
         while(temp!=null) {
            if(temp.getName().equalsIgnoreCase(name)) { // match
               System.out.printf("%n%S %d  %s  %s ","found: ",temp.getId(),temp.getName(),
                                 temp.getState());
               while(true) {
                  System.out.println("1. Update name the patient");
                  System.out.println("2. Update state the patient");
                  System.out.println("0. zero to go\n");
                  int in=input.nextInt();
                  switch(String.valueOf(in)) {
                     case "1":   System.out.printf("Enter new patient name: ");
                                 input.nextLine();
                                 name=input.nextLine();
                                 temp.setName(name);find=true;break;

                     case "2":   System.out.printf("Enter new patient state: ");
                                 input.nextLine();
                                 String state=input.nextLine();
                                 temp.setState(state);find=true;break;

                     case "0":   System.out.printf("%n%S%n","logout");

                     default:    System.out.println("Options 1,2 or 0(zero) only.");
                  }
                  if(in==0) break;
               }
            }
            temp=temp.getPointer();
         }
         if(find) System.out.printf("%n %S %d  %s  %s   %S ","patient: ",temp.getId(),
                                    temp.getName(),temp.getState(),"updated");
         else System.out.printf(" %n %S%n","patient not found");
      }
   }
}
