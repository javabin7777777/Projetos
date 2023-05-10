import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.awt.Desktop;

// Responsável por gerar o html que será executado pelo browser.
class HtmlGenerator {
   private PrintWriter wt;
  /**
   * @param wt
   */
  public HtmlGenerator(PrintWriter wt) {
      this.wt = wt;
  }
  //Gerador de página dos filmes.
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
               <div class="card" style="width: 18rem;margin: 20px auto;">
                  <img src=\"https://img.freepik.com/vetores-premium/poster-de-cinema-realista-pipoca-balde-fita-de-filme-de-claquete-e-bobina-pipoca-voando-em-movimento_208581-1714.jpg
                  \" class="card-img-top" alt="imagem de poster de cinema,balde de pipoca ,fita de filme,claquete,bobina pipoca" tilte="poster de cinema">
                  <div class="card-body">
                     <h5 class="card-title">FILMES DO IMDB</h5>
                     <p  class="card-text">Quantidade:</p>
                     <a  class="btn btn-primary">%d</a>
                  </div>
               </div>
            </body>
         </html>
      """;
     Template obj=new Template();
     obj=obj.genTemplate(movie);
     this.wt.println(String.format(html,obj.getTemp1(),obj.getCount()));
     File file=new File("Path name of the file html");
     Desktop open= Desktop.getDesktop();
     if(file.exists())
      try {
         open.open(file);
      } catch (IOException e) {
         e.printStackTrace();
      }
   }
}
