import java.io.PrintWriter;
import java.util.List;

class HtmlGenerator {
   private String temp="";
   private String temp2="";
   private PrintWriter wt;
  /**
   * @param wt
   */
  public HtmlGenerator(PrintWriter wt) {
    this.wt = wt;
  }
   // Cards dos filmes.
   private String divTemplate =
            """
              <div class="row row-cols-1 row-cols-md-3 g-4">
              <div class="col">
                <div class="card h-100">
                  <img src=\"%s\" class="card-img-top" alt=\"%s\">
                  <div class="card-body">
                    <h5 class="card-title">%s</h5>
                    <p class="card-text">Nota: %s - Ano: %s</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card h-100">
                  <img src=\"%s\" class="card-img-top" alt=\"%s\">
                  <div class="card-body">
                    <h5 class="card-title">%s</h5>
                    <p class="card-text">Nota: %s - Ano: %s</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card h-100">
                  <img src=\"%s\" class="card-img-top" alt=\"%s\">
                  <div class="card-body">
                    <h5 class="card-title">%s</h5>
                    <p class="card-text">Nota: %s - Ano: %s</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card h-100">
                  <img src=\"%s\" class="card-img-top" alt="\"%s\">
                  <div class="card-body">
                    <h5 class="card-title">%s</h5>
                    <p class="card-text">Nota: %s - Ano: %s<p>
                  </div>
                </div>
              </div>
            </div>
            """;
  String divTemplate2=
      """
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card h-100">
            <img src=\"%s\" class="card-img-top" alt=\"%s\">
            <div class="card-body">
              <h5 class="card-title">%s</h5>
              <p class="card-text">Nota: %s - Ano: %s</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src=\"%s\" class="card-img-top" alt=\"%s\">
            <div class="card-body">
              <h5 class="card-title">%s</h5>
              <p class="card-text">Nota: %s - Ano: %s</p>
            </div>
          </div>
        </div>
        <div class="col" style="opacity:0;">
              <div class="card h-100">
                <img src="" class="card-img-top" alt="">
                <div class="card-body">
                  <h5 class="card-title"></h5>
                  <p class="card-text"></p>
                </div>
              </div>
            </div>
            <div class="col" style="opacity:0;">
              <div class="card h-100">
                <img src="" class="card-img-top" alt="">
                <div class="card-body">
                  <h5 class="card-title"></h5>
                  <p class="card-text"><p>
                </div>
              </div>
            </div>
    </div>
    """;
  //Preencher cada template(divTemplate) com os dados dos filmes e criar a página.
  public void generator(List<Movies> movie) {
      System.out.println("\n\nmovie "+movie.size()+" "+movie);
      System.out.println(movie.get(0).getTitle());
      System.out.println(movie.get(0).getUrlImage());
      System.out.println(movie.get(0).getRating());
      System.out.println(movie.get(0).getYear());
      for (int t = 0; t < movie.size()-3; t+=4) {
        //System.out.println("passei aqui");
          temp=temp.concat(String.format(divTemplate, movie.get(t).getUrlImage(), movie.get(t).getTitle(),
          movie.get(t).getTitle(), movie.get(t).getRating(), movie.get(t).getYear(),movie.get(t+1).getUrlImage(),
          movie.get(t+1).getTitle(),movie.get(t+1).getTitle(), movie.get(t+1).getRating(),movie.get(t+1).getYear(),
          movie.get(t+2).getUrlImage(),movie.get(t+2).getTitle(), movie.get(t+2).getTitle(),movie.get(t+2).getRating(),
          movie.get(t+2).getYear(),
          movie.get(t+3).getUrlImage(),movie.get(t+3).getTitle(),
          movie.get(t+3).getTitle(), movie.get(t+3).getRating(), movie.get(t+3).getYear()));
      }
      int t=248;
      temp2=temp2.concat(String.format(divTemplate2, movie.get(t).getUrlImage(), movie.get(t).getTitle(),
          movie.get(t).getTitle(), movie.get(t).getRating(), movie.get(t).getYear(),movie.get(t+1).getUrlImage(),
          movie.get(t+1).getTitle(),movie.get(t+1).getTitle(), movie.get(t+1).getRating(),movie.get(t+1).getYear()));
      temp=temp+temp2;

      System.out.println("\n\n"+temp+"\n");
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
     this.wt.println(String.format(html,temp));
   }
}
