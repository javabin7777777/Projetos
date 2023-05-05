import java.io.PrintWriter;
import java.util.List;

class HtmlGenerator {
   private PrintWriter wt;
  /**
   * @param wt
   */
  public HtmlGenerator(PrintWriter wt) {
    this.wt = wt;
  }
  //Preencher cada template(divTemplate) com os dados dos filmes e criar a página.
  public void generator(List<Movies> movie) {
      // template que será exibida.
      String html =
      """
         <!doctype html>
         <html lang=\"en\">
            <head>
               <meta charset=\"utf-8\">
               <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">
               <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"
                  +integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">
            </head>
            <body>
              %s
            </body>
         </html>
      """;
     this.wt.println(String.format(html,new Template().genTemplate(movie)));
   }
}