import java.util.Scanner;


// gerenciamento de estoque de loja online.
class App {
    public static void main(String[] args) throws Exception {
        Scanner input=new Scanner(System.in);
        TreeManager tree=new TreeManager();
        while(true) {
            System.out.println("1. Insert");
            System.out.println("2. Remove");
            System.out.println("3. List");
            System.out.println("4. Update");
            System.out.println("0. Zero to go");
            int in=input.nextInt();
            switch(String.valueOf(in)) {
                case "1":  tree.addTree();break;
                case "2":  tree.removeTree();break;
                case "3":  tree.listTree();break;
                case "4":  tree.updateTree();break;
                case "0":  System.out.println("\nLOGOUT\n");break;
                default: System.out.println("Options 1,2,3,4 or 0(zero) only.");
            }
            if(in==0) break;
        }
        input.close();
        System.out.println("\nSee you soon");
        System.out.println("Hello, World!");
    }
}
