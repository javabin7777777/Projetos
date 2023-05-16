class Pacient {
   private int id;
   private String name;
   private String state;
   private Pacient pointer;


   /**
    * @return the id
    */
   public int getId() {
      return id;
   }
   /**
    * @param id the id to set
    */
   public void setId(int id) {
      this.id = id;
   }
   /**
    * @return the name
    */
   public String getName() {
      return name;
   }
   /**
    * @param name the name to set
    */
   public void setName(String name) {
      this.name = name;
   }
   /**
    * @return the state
    */
   public String getState() {
      return state;
   }
   /**
    * @param state the state to set
    */
   public void setState(String state) {
      this.state = state;
   }
   /**
    * @return the pointer
    */
   public Pacient getPointer() {
      return pointer;
   }
   /**
    * @param pointer the pointer to set
    */
   public void setPointer(Pacient pointer) {
      this.pointer = pointer;
   }

}
