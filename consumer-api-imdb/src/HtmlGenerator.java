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

  // Para usar bootstrap.
  String Head =
    """
         <head>
            <meta charset=\"utf-8\">
            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">
            <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css\"
               +integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">
         </head>
      """;
  // Cards dos filmes que serão exibidos.
  String divTemplate =
      """
         <div class=\"card text-white bg-dark mb-3\" style=\"max-width: 18rem;\">
            <h4 class=\"card-header\">%s</h4>
            <div class=\"card-body\">
               <img class=\"card-img\" src=\"%s\" alt=\"%s\">
               <p class=\"card-text mt-2\">Nota: %s - Ano: %s</p>
            </div>
         </div>
      """;

  public void generator(List<Movies> movie) {
      this.wt.println(Head);
      for (int t = 0; t < movie.size(); t++) {
         //Preencher a template com os dados dos filmes.
         this.wt.println(
            String.format(
               divTemplate,
               movie.get(t).getTitle(),
               movie.get(t).getUrlImage(),
               movie.get(t).getTitle(),
               movie.get(t).getRating(),
               movie.get(t).getYear()
            )
         );
      }
  }
}
