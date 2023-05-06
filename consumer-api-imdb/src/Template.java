import java.util.List;

   // Geradora das templates que compôem a página,esta última,gerada pela classe HtmlGenerator.
class Template {
   private int x=0;
   private String temp1="";
   private String temp2="";
   private final String A=
         """
            <div class="col">
               <div class="card h-100">
                  <img src=\"%s\" class="card-img-top" alt=\"%s\">
                  <div class="card-body">
                  <h5 class="card-title">%s</h5>
                  <p class="card-text">Nota: %s - Ano: %s</p>
                  </div>
               </div>
            </div>
               """;
   private final String B=
         """
         <div class="col" style="opacity:0;">
            <div class="card h-100">
               <img src="" class="card-img-top" alt="">
               <div class="card-body">
               <h5 class="card-title"></h5>
               <p class="card-text"></p>
               </div>
            </div>
         </div>
          """;
      // Gerador das templates que serão preenchidas com os filmes.
   private String template(String A,String B,int c) {
      String divTemplate=
      """
         <div class="row row-cols-1 row-cols-md-3 g-4">
               %s
               %s
               %s
               %s
         </div>
            """;
      switch(String.valueOf(c)) {
         case "1":
            divTemplate=String.format(divTemplate,A,B,B,B);
            break;

         case "2":
            divTemplate=String.format(divTemplate,A,A,B,B);
            break;

         case "3":
            divTemplate=String.format(divTemplate,A,A,A,B);
            break;
         case "4":
            divTemplate=String.format(divTemplate,A,A,A,A);
            break;
      }
      return divTemplate;
   }
      // Preenche as templates com os filmes.
   public String genTemplate(List<Movies> movie) {
      //template: 4 card's para cada linha da página.
      int count=0;// Quantidade de filmes que preenchem as templates e posteriormente serão exibidos.
      for (int t = 0; t < (movie.size()-4); t+=4) {
         temp1=temp1.concat(String.format(template(A,B,4), movie.get(t).getUrlImage(), movie.get(t).getTitle(),
         movie.get(t).getTitle(), movie.get(t).getRating(), movie.get(t).getYear(),movie.get(t+1).getUrlImage(),
         movie.get(t+1).getTitle(),movie.get(t+1).getTitle(), movie.get(t+1).getRating(),movie.get(t+1).getYear(),
         movie.get(t+2).getUrlImage(),movie.get(t+2).getTitle(), movie.get(t+2).getTitle(),movie.get(t+2).getRating(),
         movie.get(t+2).getYear(),
         movie.get(t+3).getUrlImage(),movie.get(t+3).getTitle(),
         movie.get(t+3).getTitle(), movie.get(t+3).getRating(), movie.get(t+3).getYear()));
         count=t+4;
      }
      x= movie.size()-movie.size()%4;// Os filmes faltantes.
      switch(String.valueOf(movie.size()%4)) {
         case "1":
            temp2=temp2.concat(String.format(template(A,B,1),movie.get(x).getUrlImage(),movie.get(x).getTitle(),movie.get(x).getTitle(),
                  movie.get(x).getRating(),movie.get(x).getYear()));count+=1;
            break;

         case "2":
            temp2=temp2.concat(String.format(template(A,B,2),movie.get(x).getUrlImage(),movie.get(x).getTitle(),movie.get(x).getTitle(),
                  movie.get(x).getRating(),movie.get(x).getYear(),
                  movie.get(x+1).getUrlImage(),movie.get(x+1).getTitle(),movie.get(x+1).getTitle(), movie.get(x+1).getRating(),
                  movie.get(x+1).getYear()));count+=2;
            break;

         case "3":
            temp2=temp2.concat(String.format(template(A,B,3),movie.get(x).getUrlImage(),movie.get(x).getTitle(),movie.get(x).getTitle(),
               movie.get(x).getRating(),movie.get(x).getYear(),
               movie.get(x+1).getUrlImage(),movie.get(x+1).getTitle(),movie.get(x+1).getTitle(), movie.get(x+1).getRating(),
               movie.get(x+1).getYear(),
               movie.get(x+2).getUrlImage(),movie.get(x+2).getTitle(),movie.get(x+2).getTitle(), movie.get(x+2).getRating(),
               movie.get(x+2).getYear()));count+=3;
            break;
      }
      temp1=temp1.concat(temp2);
      return temp1;
   }
}
