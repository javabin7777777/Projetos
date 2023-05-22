import java.util.Scanner;

// lista simples encadeada de pacientes e o estado de saúde de cada um deles.
class App {
    public static void main(String[] args) throws Exception {
        Scanner input=new Scanner(System.in);
        while(true) {
            System.out.println("1. Insert Patient");
            System.out.println("2. Remove Patient");
            System.out.println("3. List Patients");
            System.out.println("4. Update Patient");
            System.out.println("0. Zero to exit");
            int in=input.nextInt();
            switch(String.valueOf(in)) {
                case "1":  ListManagerLinkList.add();break;
                case "2":  ListManagerLinkList.remove();break;
                case "3":  ListManagerLinkList.list();break;
                case "4":  ListManagerLinkList.updatePatient();break;
                case "0":  System.out.println("\nLOGOUT\n");break;
                default:   System.out.println("\nOptions 1,2,3,4 or 0 only.");
            }
            if(in==0) break;
        }
        input.close();
        System.out.println("\nSee you soon");
        //System.out.println("Hello, World!");
    }
}
