import java.io.IOException;
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

      List<Movies> movies = new ArrayList<>();
      List<String> listOut = new ArrayList<>();
      String url = "https://imdb-api.com/en/API/Top250Movies/";
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
        String temporary = arr[i];
        // System.out.println("temporary: "+temporary+"\n");
        String[] temp = temporary.split("\"[a-zA-z]{2,50}\":");
        // System.out.println("temp: "+temp.length+" "+Arrays.toString(temp));
        for (int t = 0; t < temp.length; t++) {
          temp[t] = temp[t].replaceAll("\"", "");
          temp[t] = temp[t].replaceAll(",", "");
          //System.out.println("index: " + t + " " + temp[t]);
        }
        movies.add(new Movies(temp[3], temp[5],temp[6],temp[8]));
      }
      System.out.println("\nMovies: " + movies.size() + " " + movies + "\n");// lista dos objetos da classe Movies.
      //listOut é a lista de saída com os atributos(título,an,imagem e classificação) de cada filme.
      int a=0;//quantidade de elementos(filmes) da lista de saída que é igual ao tamanho de arr,que é o que foi buscado na API-Imdb.
      for(int t=0;t<movies.size();t++) {
        listOut.add(movies.get(t).getTitle()+" "+ "year: "+movies.get(t).getYear()+" "+ "image: "+movies.get(t).getUrlImage()+" "+
        "rating: "+movies.get(t).getRating());
         ++a;
      }
      System.out.println("\n Listout: "+a+" "+listOut);
    } catch (IOException | InterruptedException e) {
      // System.out.println(e);
      throw new RuntimeException(e);
    }
    System.out.println("\nHello, World!");
  }
}