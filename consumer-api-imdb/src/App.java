import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.ArrayList;
import java.util.List;

class App {

  public static void main(String[] args) throws Exception {
    try {
      /*
      List<String> title = new ArrayList<>();
      List<String> year = new ArrayList<>();
      List<String> urlImage = new ArrayList<>();
      */
      String temporary;
      List<Movies> movies = new ArrayList<>();
      String url = "https://imdb-api.com/en/API/Top250Movies/k_zicszmxy";
      HttpRequest request = HttpRequest
        .newBuilder()
        .uri(URI.create(url))
        .GET()
        .build();
      HttpClient client = HttpClient.newHttpClient();
      HttpResponse<String> response = client.send(
        request,
        BodyHandlers.ofString()
      ); // exigi 'exception'.
      String body = response.body(); // String recebida da API Imdb.
      System.out.println("\nBody: " + body.length() + " " + body + "\n");
      String str = body.substring(
        (body.indexOf('[') + 1),
        (body.lastIndexOf(']') - 1)
      );
      String[] arr = str.split("},"); // Obter strings da string str.

      // Preencher a lista movie com os objetos da classe Movies.
      // Cada elemento de arr é um filme com suas descrições.
      // Para cada elemento de arr,extrai a string antes do ':',aspas e as vírgulas.
      for (int i = 0; i < arr.length; i++) {
        temporary=arr[i];
        String[] temp = temporary.split("\"[a-zA-z]{2,50}\":");
        for (int t = 0; t < temp.length; t++) {
          temp[t] = temp[t].replaceAll("\"", "");
          temp[t] = temp[t].replaceAll(",", "");
        }
        movies.add(new Movies(temp[3], temp[5],temp[6],temp[8]));
      }
      //System.out.println("\nMovies: " + movies.size() + " " + movies + "\n");// lista dos objetos da classe Movies.
      //Exibir a lista com os filmes no browser.
      PrintWriter wt=new PrintWriter(new File("index.html"));
      HtmlGenerator genHtml=new HtmlGenerator(wt);
      genHtml.generator(movies);
      wt.close();

    } catch (IOException | InterruptedException e) {
      // System.out.println(e);
      throw new RuntimeException(e);
    }
    System.out.println("\nHello, World!");
  }
}