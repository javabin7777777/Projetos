import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

class App {
  public static void main(String[] args) throws Exception {
      List<Movies> movies = new ArrayList<>();// Lista de filmes.
      String key ="";
      ConnectToApi con=new ConnectToApi();
      String body=con.connection(key);      
      Data getListData=new Data();
      movies=getListData.getData(body);

      //Exibir no browser a lista com os filmes.
      PrintWriter wt=new PrintWriter(new File("index.html"));
      HtmlGenerator genHtml=new HtmlGenerator(wt);
      genHtml.generator(movies);// Geração do html.
      wt.close();
  }
}