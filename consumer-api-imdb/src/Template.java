import java.util.List;

class Template {
   private int x=0;
   private String temp1="";
   private String temp2="";
   public String genTemplate(List<Movies> movie) {
      // Cards dos filmes.
      final String divTemplate1=
               """
               <div class="row row-cols-1 row-cols-md-3 g-4">
               <div class="col">
                  <div class="card h-100">
                     <img src=\"%s\" class="card-img-top" alt=\"%s\">
                     <div class="card-body">
                     <h5 class="card-title">%s</h5>
                     <p class="card-text">Nota: %s - Ano: %s</p>
                     </div>
                  </div>
               </div>
               <div class="col">
                  <div class="card h-100">
                     <img src=\"%s\" class="card-img-top" alt=\"%s\">
                     <div class="card-body">
                     <h5 class="card-title">%s</h5>
                     <p class="card-text">Nota: %s - Ano: %s</p>
                     </div>
                  </div>
               </div>
               <div class="col">
                  <div class="card h-100">
                     <img src=\"%s\" class="card-img-top" alt=\"%s\">
                     <div class="card-body">
                     <h5 class="card-title">%s</h5>
                     <p class="card-text">Nota: %s - Ano: %s</p>
                     </div>
                  </div>
               </div>
               <div class="col">
                  <div class="card h-100">
                     <img src=\"%s\" class="card-img-top" alt="\"%s\">
                     <div class="card-body">
                     <h5 class="card-title">%s</h5>
                     <p class="card-text">Nota: %s - Ano: %s<p>
                     </div>
                  </div>
               </div>
               </div>
               """;
   final String divTemplate2=
         """
      <div class="row row-cols-1 row-cols-md-3 g-4">
         <div class="col">
            <div class="card h-100">
               <img src=\"%s\" class="card-img-top" alt=\"%s\">
               <div class="card-body">
               <h5 class="card-title">%s</h5>
               <p class="card-text">Nota: %s - Ano: %s</p>
               </div>
            </div>
         </div>
         <div class="col">
            <div class="card h-100">
               <img src=\"%s\" class="card-img-top" alt=\"%s\">
               <div class="card-body">
               <h5 class="card-title">%s</h5>
               <p class="card-text">Nota: %s - Ano: %s</p>
               </div>
            </div>
         </div>
         <div class="col" style="opacity:0;">
               <div class="card h-100">
                  <img src="" class="card-img-top" alt="">
                  <div class="card-body">
                     <h5 class="card-title"></h5>
                     <p class="card-text"></p>
                  </div>
               </div>
               </div>
               <div class="col" style="opacity:0;">
               <div class="card h-100">
                  <img src="" class="card-img-top" alt="">
                  <div class="card-body">
                     <h5 class="card-title"></h5>
                     <p class="card-text"><p>
                  </div>
               </div>
               </div>
      </div>
      """;
      //template: 4 card's para cada linha da página.
      for (int t = 0; t < (movie.size()-4); t+=4) {
            temp1=temp1.concat(String.format(divTemplate1, movie.get(t).getUrlImage(), movie.get(t).getTitle(),
            movie.get(t).getTitle(), movie.get(t).getRating(), movie.get(t).getYear(),movie.get(t+1).getUrlImage(),
            movie.get(t+1).getTitle(),movie.get(t+1).getTitle(), movie.get(t+1).getRating(),movie.get(t+1).getYear(),
            movie.get(t+2).getUrlImage(),movie.get(t+2).getTitle(), movie.get(t+2).getTitle(),movie.get(t+2).getRating(),
            movie.get(t+2).getYear(),
            movie.get(t+3).getUrlImage(),movie.get(t+3).getTitle(),
            movie.get(t+3).getTitle(), movie.get(t+3).getRating(), movie.get(t+3).getYear()));
      }
      x= movie.size()-movie.size()%4;// Os filmes faltantes.
      switch(String.valueOf(movie.size()%4)) {
         case "2":
            temp2=temp2.concat(String.format(divTemplate2,movie.get(x).getUrlImage(),movie.get(x).getTitle(),movie.get(x).getTitle(),
                  movie.get(x).getRating(),movie.get(x).getYear(),
                  movie.get(x+1).getUrlImage(),movie.get(x+1).getTitle(),movie.get(x+1).getTitle(), movie.get(x+1).getRating(),
                  movie.get(x+1).getYear()));
            temp1=temp1.concat(temp2);
            break;
         case "1":
            temp2=temp2.concat(String.format(divTemplate2,movie.get(x).getUrlImage(),movie.get(x).getTitle(),movie.get(x).getTitle(),
                  movie.get(x).getRating(),movie.get(x).getYear()));
            temp1=temp1.concat(temp2);
            break;
      }
      System.out.println("\n\n"+temp1+"\n");
      return temp1;
   }
}
