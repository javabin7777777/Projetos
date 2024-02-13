import java.util.Comparator;
import java.util.HashMap;
import java.util.Scanner;
import java.util.Set;
import java.util.Map.Entry;

import javax.xml.crypto.dsig.keyinfo.KeyValue;

class MapPlayer {
   private static HashMap<String, Integer> map=new HashMap<String, Integer>();
   private static Set<Entry<String, Integer>> set;
   private static Scanner input=new Scanner(System.in);
   private static Boolean find=false;


   // adiciona um jogador no map.
   public static void add() {
      System.out.printf("Enter the player name: ");
      input.nextLine();
      String name=input.nextLine();
      System.out.printf("%nEnter the score: ");
      int score=input.nextInt();
      map.put(name, score);
      System.out.println(("\nInsert okay\n"));
   }

   // remove um jogador do mapa.
   public static void remove() {
      set=map.entrySet();// criar e/ou atualiza a lista set(collection view of map).
      find=false;
      if(map.isEmpty()) System.out.printf("%n%S","Map is Empty");
      else {
         System.out.printf("%nEnter the player name: ");
         input.nextLine();
         String name=input.nextLine();
         for(Entry<String, Integer> kv: set) { // pesquisa pelo nome do jogador que será removido da lista.
            if(kv.getKey().equalsIgnoreCase(name)) { // match
               String player=kv.getKey();
               int value=kv.getValue();
               if(map.remove(kv.getKey(), kv.getValue())) {
                  System.out.printf("%n%S %s  %d","player removed:",player,value);// mostra o nó removido: o jogador e sua pontuação.
                  find=true;
               }else System.out.printf("%n%S","player not removed");
            }
         }
         if(!find) System.out.printf(" %n%S","player not found");
      }
   }

   // lista todos jogadores ordenando por pontuação em ordem decrescente.
   public static void list() {
      if(map.isEmpty()) System.out.printf("%S","Map is Empty");
      else {
         map.entrySet().stream().sorted(Entry.comparingByValue(Comparator.reverseOrder())).forEach(System.out::println);
         System.out.println("\n");
      }
   }

   // Atualiza um jogador do mapa.
   public static void updatePlayer() {
      set=map.entrySet();
      find=false;
      if(map.isEmpty()) System.out.printf("%S","map is empty");
      else {
         String name;
         int score;
         while(true) {
            System.out.println("1. Update name the Player");
            System.out.println("2. Update score the player");
            System.out.println("0. zero to go\n");
            int in=input.nextInt();
            switch(String.valueOf(in)) {
               case "1":   System.out.printf("Enter new player name: ");
                           input.nextLine();
                           name=input.nextLine();
                           for(Entry<String, Integer> kv: set) { // pesquisa o nome do jogador,caso encontrado atualiza o seu nome.
                              if(kv.getKey().equalsIgnoreCase(name)) {
                                 map.put(name,kv.getValue());
                                 map.remove(kv.getKey(),kv.getValue());
                                 System.out.printf(" %n%S %s  %d","updated to:",name,kv.getValue());
                                 find=true;
                              }
                           };break;


               case "2":   System.out.printf("Enter player name: "); // pesquisa pelo nome,caso encontrado atualiza sua pontuação.
                           input.nextLine();
                           name=input.nextLine();
                           System.out.printf("Enter new player score: ");
                           score=input.nextInt();
                           for(Entry<String, Integer> kv: set) {
                              if(kv.getKey().equalsIgnoreCase(name)) {
                                 map.replace(kv.getKey(),score);
                                 System.out.printf(" %n%S %s  %d","updated to:",kv.getKey(),score);
                                 find=true;
                              }
                           };break;
               case "0":   System.out.printf("%n%S%n","logout");break;

               default:    System.out.println("Options 1,2 or 0(zero) only.");
            }
            if(in==0) break;
         }
         if(!find) System.out.printf(" %n%S%n","player not found");
      }
   }
}
