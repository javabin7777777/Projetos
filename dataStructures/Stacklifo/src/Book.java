class Book {
   private int pageNumber;// quantidade de páginas.
   private String BookName;// nome do livro.
   private Book pointer;// aponta para o próximo nó.


   /**
    * @return the pageNumber
    */
   public int getPageNumber() {
      return pageNumber;
   }
   /**
    * @param pageNumber the pageNumber to set
    */
   public void setPageNumber(int pageNumber) {
      this.pageNumber = pageNumber;
   }
   /**
    * @return the bookName
    */
   public String getBookName() {
      return BookName;
   }
   /**
    * @param bookName the bookName to set
    */
   public void setBookName(String bookName) {
      BookName = bookName;
   }
   /**
    * @return the pointer
    */
   public Book getPointer() {
      return pointer;
   }
   /**
    * @param pointer the pointer to set
    */
   public void setPointer(Book pointer) {
      this.pointer = pointer;
   }

}
