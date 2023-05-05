import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.net.URI;
import java.io.IOException;

class ConnectToApi { // Responsável por fazer a conexão com a Api e devolver a resposta da mesma.
   public String connection(String key) {
      try {
            String url="https://imdb-api.com/en/API/Top250Movies/";
            url=url.concat(key);
            HttpRequest request = HttpRequest
            .newBuilder()
            .uri(URI.create(url))
            .GET()
            .build();
            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(
            request,
            BodyHandlers.ofString()
            ); // Exigi 'exception'.
            String body= response.body();
            return body;
      }catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
      }
   }
}


