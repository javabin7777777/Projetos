import java.util.Scanner;

class ListManager {
   private static Scanner input=new Scanner(System.in);
   private static Book head;

   // adiciona um livro na pilha.
   public static void add() {
      System.out.printf("Enter the name of the book: ");
      String name=input.nextLine();
      System.out.printf("%nEnter number of pages: ");
      int pageNumber=input.nextInt();
      Book book=new Book();
      book.setPageNumber(pageNumber);
      book.setBookName(name);
      // stack lifo.
      if(head == null) {
         head=book;
      }else {
         book.setPointer(head);
         head=book;
      }
      System.out.println();
      System.out.println(("Insert okay\n"));
   }

   // remove livro da pilha.
   public static void remove() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         head=head.getPointer();
         System.out.println("\nREMOVED\n");
      }
   }

   // lista todos livros da pilha.
   public static void list() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else {
         System.out.println();
         while(head!=null) {
            System.out.println();
            System.out.printf("Book: %s  Pages: %d%n",head.getBookName(),head.getPageNumber());
            head=head.getPointer();
         }
         System.out.println();
      }
   }

   // mostra o primeiro livro da pilha.
   public static void firstBook() {
      if(head==null) System.out.println("\nLIST is EMPTY\n");
      else System.out.printf("%nBook: %s  Pages: %d%n",head.getBookName(),head.getPageNumber());
   }
}
