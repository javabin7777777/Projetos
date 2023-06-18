import java.util.Scanner;

 // stack type lifo.
class ListManagerBooks {
   private static Scanner input=new Scanner(System.in);
   private static Book head;// primeiro livro da pilha.
   private static Book temp;

   // adiciona um novo livro na pilha.
   public static void add() {
      System.out.printf("%nEnter the book name: ");
      input.nextLine();
      String name=input.nextLine();
      System.out.printf("%nEnter the pages number: ");
      int pageNumber=input.nextInt();
      Book book=new Book();
      book.setPageNumber(pageNumber);
      book.setBookName(name);
      if(head == null) {// adiciona 1º elemento
         head=book;
      }else { // adiciona outros elementos.
         book.setPointer(head);
         head=book;// novo nó na cabeça da pilha.
      }
      System.out.println(("\nInsert okay\n"));
   }

   // remove um livro da pilha.
   public static void remove() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         System.out.printf("%n%s  %d",head.getBookName(),head.getPageNumber());
         head=head.getPointer();
         System.out.println("\nBOOK REMOVED\n");
      }
   }

   // lista todos livros da pilha.
   public static void list() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         temp=head;
         System.out.println();
         while(temp!=null) {
            System.out.println();
            System.out.printf("%nBook: %s  Pages: %d%n",temp.getBookName(),temp.getPageNumber());
            temp=temp.getPointer();
         }
         System.out.println();
      }
   }

   // mostra o primeiro livro ou nó da pilha.
   public static void firstBook() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else System.out.printf("%nBook: %s  Pages: %d%n",head.getBookName(),head.getPageNumber());
   }

   public static void updateBook() {
   }

}
