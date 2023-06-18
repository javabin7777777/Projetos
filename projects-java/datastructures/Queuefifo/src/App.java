import java.util.Scanner;

class App {
    public static void main(String[] args) throws Exception {
        Scanner input=new Scanner(System.in);
        while(true) {
            System.out.println("1. Insert Order");
            System.out.println("2. Remove Order");
            System.out.println("3. List Order\n");
            int in=input.nextInt();
            switch(String.valueOf(in)) {
                case "1":  ListManagerOrder.add();break;
                case "2":  ListManagerOrder.remove();break;
                case "3":  ListManagerOrder.list();break;
                case "0":  System.out.println("\nLOGOUT\n");
                default: System.out.println("Options 1,2,3 or 0(zero) only.");
            }
            if(in==0) break;
        }
        input.close();
        System.out.println("\nSee you soon");
       // System.out.println("Hello, World!");
    }
}
