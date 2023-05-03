import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

class App {

  public static void main(String[] args) throws Exception {
      List<Movies> movies = new ArrayList<>();
      String url = "https://imdb-api.com/en/API/Top250Movies/";
      ConnectToApi con=new ConnectToApi();
      String body=con.connection(url);
      //String body = response.body(); // String recebida da API Imdb.
      System.out.println("\nBody: " + body.length() + " " + body + "\n");
      Data getListData=new Data();
      movies=getListData.getData(body);
      //System.out.println("\nMovies: " + movies.size() + " " + movies + "\n");// lista dos objetos da classe Movies.
      //Exibir a lista com os filmes no browser.
      PrintWriter wt=new PrintWriter(new File("index.html"));
      HtmlGenerator genHtml=new HtmlGenerator(wt);
      genHtml.generator(movies);
      wt.close();
    System.out.println("\nHello, World!");
  }
}