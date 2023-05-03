import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.net.URI;
import java.io.IOException;

class ConnectToApi { // resçponsável por fazer a conexão com a Api e devolver a resposta da mesma.
   public String connection(String url) {
      try {
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
            String body= response.body();
            return body;
      }catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
      }
   }
}


