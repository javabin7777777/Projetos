
import java.util.List;
// Geradora das templates que compôem a página,esta última,gerada pela classe HtmlGenerator.
class Template {
   private int count=0; // Quantidade de filmes que preencherão as templates.
   private String temp1="";// São as templates preenchidas.
   private String temp2="";// São as templates preenchidas faltantes.


   /**
    *
    */
   public Template() {
   }

   /**
    * @param count
    * @param temp1
    */
    public Template(int count, String temp1) {
      this.count = count;
      this.temp1 = temp1;
   }

   /**
    * @return the count
    */
   public int getCount() {
      return count;
   }

   /**
    * @param count the count to set
    */
   public void setCount(int count) {
      this.count = count;
   }
   /**
    * @param temp1 the temp1 to set
    */
   public void setTemp1(String temp1) {
      this.temp1 = temp1;
   }
   /**
    * @return the temp1
    */
   public String getTemp1() {
      return temp1;
   }

   // Os filmes preencherão template A.
   // Template B é complemento(padding) para linha,caso seja necessário.
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

      // Gerador das templates que serão preenchidas com os filmes.São 4 templates para cada linha.
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
    //Preencher as templates com os filmes,que serão posteriormente exibidos pela classe HtmlGenerator.
   public Template genTemplate(List<Movies> movie) {
      //template: Quatro card's para cada linha da página.
      int row=(movie.size()/4)-((movie.size()%4)/4);// Quantidade de linhas.
      for(int s=0;s<row;s++) {
         temp1=temp1.concat(String.format(template(A,B,4), movie.get(count).getUrlImage(),movie.get(count).getTitle(),
         movie.get(count).getTitle(), movie.get(count).getRating(), movie.get(count).getYear(),
         movie.get(count+1).getUrlImage(),movie.get(count+1).getTitle(),movie.get(count+1).getTitle(),
         movie.get(count+1).getRating(),movie.get(count+1).getYear(),
         movie.get(count+2).getUrlImage(),movie.get(count+2).getTitle(),movie.get(count+2).getTitle(),movie.get(count+2).getRating(),
         movie.get(count+2).getYear(),
         movie.get(count+3).getUrlImage(),movie.get(count+3).getTitle(),movie.get(count+3).getTitle(),movie.get(count+3).getRating(),
         movie.get(count+3).getYear()));
         count+=4;
      }
      // Os filmes faltantes,casos existam.
      int x= movie.size()-(movie.size()%4);
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
      Template temp =new Template(count,temp1);
      return temp;
   }
}
