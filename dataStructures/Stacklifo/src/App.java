import java.util.Scanner;

class App {
    public static void main(String[] args) throws Exception {
        Scanner input=new Scanner(System.in);
        while(true) {
            System.out.println("1. Insert Book");
            System.out.println("2. Remove Book");
            System.out.println("3. List Books");
            System.out.println("4. See The First Book");
            System.out.println("0. Zero to go\n");
            int in=input.nextInt();
            switch(String.valueOf(in)) {
                case "1":   ListManagerBooks.add();break;
                case "2":   ListManagerBooks.remove();break;
                case "3":   ListManagerBooks.list();break;
                case "4":   ListManagerBooks.firstBook();break;
                case "0":   System.out.println("\nLOGOUT\n");
                default:    System.out.println("\nOptions 1,2,3,4 or 0 only.\n");
            }
            if(in==0) break;
        }
        input.close();
        System.out.println("\nSee you soon");
       // System.out.println("Hello, World!");
    }
}
