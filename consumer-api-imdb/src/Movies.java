class Movies {
   private String title;
   private String year;
   private String urlImage;
   private String rating;
   /**
    * @param title
    * @param year
    * @param urlImage
    * @param rating
    */
   public Movies(String title, String year, String urlImage, String rating) {
      this.title = title;
      this.year = year;
      this.urlImage = urlImage;
      this.rating = rating;
   }

   /**
    * @return the title
    */
   public String getTitle() {
      return title;
   }

   /**
    * @return the year
    */
   public String getYear() {
      return year;
   }

   /**
    * @return the urlImage
    */
   public String getUrlImage() {
      return urlImage;
   }
   /**
    * @return the rating
    */
   public String getRating() {
      return rating;
   }
}
