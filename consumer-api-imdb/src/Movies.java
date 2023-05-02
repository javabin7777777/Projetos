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
    * @param title the title to set
    */
   public void setTitle(String title) {
      this.title = title;
   }
   /**
    * @return the year
    */
   public String getYear() {
      return year;
   }
   /**
    * @param year the year to set
    */
   public void setYear(String year) {
      this.year = year;
   }
   /**
    * @return the urlImage
    */
   public String getUrlImage() {
      return urlImage;
   }
   /**
    * @param urlImage the urlImage to set
    */
   public void setUrlImage(String urlImage) {
      this.urlImage = urlImage;
   }
   /**
    * @return the rating
    */
   public String getRating() {
      return rating;
   }
   /**
    * @param rating the rating to set
    */
   public void setRating(String rating) {
      this.rating = rating;
   }

}
