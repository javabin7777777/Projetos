import java.util.Scanner;

// Pontuação para jogadores
class App {
    public static void main(String[] args) throws Exception {
        Scanner input=new Scanner(System.in);
        while(true) {
            System.out.println("1. Insert Player");
            System.out.println("2. Update player");
            System.out.println("3. Remove player");
            System.out.println("4. List players");
            System.out.println("0. zero to go\n");
            int in=input.nextInt();
            switch(String.valueOf(in)) {
                case "1":   Map.add();break;
                case "2":   Map.updatek();break;
                case "3":   Map.remove();break;
                case "4":   Map.list();break;
                case "0":   System.out.println("\nLOGOUT\n");break;
                default:    System.out.println("Options 1,2,3 or 4 only.");
            }
            if(in==0) break;
        }
        input.close();
        System.out.println("\nSee you soon");
       // System.out.println("Hello, World!");
    }
}
