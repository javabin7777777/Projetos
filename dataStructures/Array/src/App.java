import java.util.Scanner;

class App {
    public static void main(String[] args) throws Exception {
        Scanner input= new Scanner(System.in);
        Listbuys list=new Listbuys();
        System.out.printf("%n Enter with quantify of products: ");
        int size=input.nextInt();
        list.setSize(size);
        int mark=-1;
	int in=0;
        String out="";        
        System.out.println();
        while(!(out.equalsIgnoreCase("q"))) {
            do {
                System.out.println("\n Zero to go out!");
                System.out.println(" 1.Insert products");
                System.out.println(" 2.List products");
                in=input.nextInt();
                if(in==1) {
                    for(int i=mark+1;i<size;i++) {
                        mark+=1;
                        System.out.println("Nº "+(i+1));
                        System.out.printf(" Enter with name of the product: ");
                        input.nextLine();
                        String nameProduct=input.nextLine();
                        if(nameProduct.equals("q")) break;
                    // System.out.println("name: "+nameProduct);
                        System.out.printf(" Enter with quantify from this product: ");
                        int quanty=input.nextInt();
                        list.insertProduct(nameProduct, quanty, mark);
                        System.out.println();
                    }
                    System.out.println("\n Insert okay!\n");
                }
                if(in==2) {
                    System.out.println();
                    if(list.getProduct().length==0) {
                        System.out.println(" LIST IS EMPTY!\n");
                    }else {
                        list.listProduct(mark);                       
                    }
                }

            }
            while(in==1 || in==2);
            System.out.println("Enter with Q to go out");
            input.nextLine();
            out=input.nextLine();
           // System.out.println("Out: "+out);
        }
        input.nextLine();
        input.close();
        System.out.println("See you soon!");
        //System.out.println("Hello, World!");
    }
}
