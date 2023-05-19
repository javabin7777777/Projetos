import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {
        Scanner input=new Scanner(System.in);
        System.out.println("Enter with Zero to go out\n");
        int out=1;
        while(out!=0) {
            System.out.println("1. Insert Order");
            System.out.println("2. Remove Order");
            System.out.println("3. List Order\n");
            int in=input.nextInt();
            out=in;
            switch(String.valueOf(in)) {
                case "1":  ListManager.add();break;
                case "2":  ListManager.remove();break;
                case "3":  ListManager.list();break;
                case "0":  System.out.println("\nLOGOUT\n");
                default: System.out.println("Options 1,2 or 3 only.");
            }
        }
        input.close();
        System.out.println("\nSee you soon");
       // System.out.println("Hello, World!");
    }
}
