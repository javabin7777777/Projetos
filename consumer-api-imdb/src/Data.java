import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


// Responsável por obter a lista de filmes.
class Data {
   private String temporary;
   private List<Movies> movies = new ArrayList<>();

   public List<Movies> getData(String body) {
      String str = body.substring(
        (body.indexOf('[') + 1),
        (body.lastIndexOf(']') - 1)
      );
      // Obter strings(os filmes) da string str.
      String[] arr = str.split("},");
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
         movies.add(new Movies(temp[3], temp[5], temp[6], temp[8]));
      }
      // Ordenar a lista de filmes
      Comparator<Movies> compare=(obj1,obj2) -> obj1.getTitle().compareTo(obj2.getTitle());
      movies.sort(compare.reversed());// Ordenação reversa.
      // movies.sort(compare);
      return movies;
   }
}
