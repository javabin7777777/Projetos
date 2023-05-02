import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class App {

  public static void main(String[] args) throws Exception {
    try {
      List<String> id = new ArrayList<>();
      List<String> rank = new ArrayList<>();
      List<String> title = new ArrayList<>();
      List<String> fullTitle = new ArrayList<>();
      List<String> year = new ArrayList<>();
      List<String> urlImage = new ArrayList<>();
      List<String> crew = new ArrayList<>();
      List<String> rating = new ArrayList<>();
      List<String> score = new ArrayList<>();
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
      //System.out.println("\nstr: "+str.length()+" "+str+"\n");
      String[] arr = str.split("},"); // Obter strings da string str.
      // System.out.println("Array: "+arr.length+" "+Arrays.toString(arr));
      // System.out.println("\narr-first: " + arr[0] + "\n");
      // System.out.println("arr-last: " + arr[249] + "\n");

      // Preencher as listas: title,urlImage,year e score.
      // Cada elemento de arr é um filme com suas descrições.
      // Para cada elemento de arr,extrai a string antes do ':',as aspas e a última vírgula,caso a tenha.
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
        // Preencher as listas com os títulos,as url's das imagens,os anos e as pontuações para cada filme.
        for (int a = 1; a < temp.length; a++) {
          switch (String.valueOf(a)) {
            case "1":
              id.add(temp[a]);
              break;
            case "2":
              rank.add(temp[a]);
              break;
            case "3":
              title.add(temp[a]);
              break;
            case "4":
              fullTitle.add(temp[a]);
              break;
            case "5":
              year.add(temp[a]);
              break;
            case "6":
              urlImage.add(temp[a]);
              break;
            case "7":
              crew.add(temp[a]);
              break;
            case "8":
              rating.add(temp[a]);
              break;
            case "9":
              score.add(temp[a]);
          }
        }
      }
      System.out.println("\nId: " + id.size() + " " + id + "\n");
      System.out.println("\nRank: " + rank.size() + " " + rank + "\n");
      System.out.println("\nTitle: " + title.size() + " " + title + "\n");
      System.out.println("\nFullTitle: " + fullTitle.size() + " " + fullTitle + "\n");
      System.out.println("Year: " + year.size() + " " + year + "\n");
      System.out.println("Image: " + urlImage.size() + " " + urlImage + "\n");
      System.out.println("crew: " + crew.size() + " " + crew + "\n");
      System.out.println("Rating: " + rating.size() + " " + rating + "\n");
      System.out.println("Score: " + score.size() + " " + score + "\n");

    } catch (IOException | InterruptedException e) {
      // System.out.println(e);
      throw new RuntimeException(e);
    }
    System.out.println("\nHello, World!");
  }
}
/*
             *
             * for(int j=0;j<temp.length;j++) {
             * String str2=temp[j];
             * str2.replaceAll("\"","");
             * str2.replaceAll(String.valueOf(str2.charAt(str2.lastIndexOf(","))),"");
             * temp[j]=str2;
             * }
             * for(int i=0;i<temp.length;i++) {
             * if(temp[i].equals("title")) {
             * System.out.println("Title: "+temp[i+1]+"\n");
             * }
             * if(temp[i]=="image") {
             * System.out.println("Image: "+temp[i+1]);
             * }
             * }
             * if(temp[i]=="\"title") {
             * System.out.println("Title: "+temp[i+1]+"\n");
             * }
             * if(temp[i]=="\"image") {
             * System.out.println("Image: "+temp[i+1]);
             * }
             * for(String item0:arr) {
             * String [] array=item0.split(",");
             * for(String item1:array) {
             *
             * }
            // System.out.println("Array-size: "+arr.length+"\n");
            // System.out.println("Array: "+Arrays.toString(arr)+"\n");
            // System.out.println("Array-first: "+arr[0]+"\n");
            // System.out.println("Array-last:"+arr[arr.length-1]);

            // str=str.replace("]","");
            // str=str.replace("{","");
            // System.out.println("\n\nindice : "+ str.lastIndexOf('}')+"\n\n");
            // str=str.substring(0,str.lastIndexOf('}'));
            // System.out.println("str: "+str+"\n\n");

            // System.out.println("Arr-size= "+arr.length+"\n\n");
            // System.out.println("arr= "+Arrays.toString(arr));
            // String temporary=arr[0];
            // System.out.println("temporary= "+temporary+"\n\n");
            // String [] array=temporary.split(":");
            // System.out.println(Arrays.toString(array));
            // System.out.println(Arrays.toString(arr));
            // System.out.println(body);
            // return response.body();
*/
