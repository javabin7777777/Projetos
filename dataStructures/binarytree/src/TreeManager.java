
class TreeManager {
   private Node radix;
   private Node temp;
   private Node before;

   public void addTree() { //o nó é inserido de acordo com seu atributo Id,seja maior,menor ou igual ao outro nó da árvore.
      Node node=new Node();
      node=node.generatorNode();// geração de um novo nó.
      if(radix==null) { //adiciona o nó raiz.
         radix=node;
         return;
      }
      if(radix.getpLeft()==null & radix.getpRight()==null) { //adiciona o 2º nó
         if(node.getproductStore().getId()>radix.getproductStore().getId()) {
            radix.setpRight(node);// insere o novo nó,no lado direito do nó raiz.
         }else {
            if(node.getproductStore().getId()==radix.getproductStore().getId()) {
               node.setpLeft(radix.getpLeft());
               node.setpRight(radix.getpRight());
               radix=node;// o nó raiz é substituído.

            }else radix.setpLeft(node);// insere o novo nó,no lado esquerdo do nó raiz.
         }
         return;
      }

      //pesquisa pelo lado direito a partir do nó raiz.
      //node: novo nó a ser inserido na árvore.
      if(node.getproductStore().getId()>radix.getproductStore().getId()) {
         before=radix;//nó antecessor.
         temp=radix.getpRight();// nó atual.
         while(true) {
            if(node.getproductStore().getId()==temp.getproductStore().getId()) {//substitui o nó com o novo nó(node).
               node.setpRight(temp.getpRight());
               node.setpLeft(temp.getpLeft());
               before.setpRight(node);
               break;
            }
            if(node.getproductStore().getId()>temp.getproductStore().getId()) {
               if(temp.getpRight()==null) {
                  temp.setpRight(node);
                  break;
               }else {
                  before=temp;//guarda o nó antecessor do próximo nó.
                  temp=temp.getpRight();//atualiza para o próximo nó para continuar a pesquisa pelo lado direito.
               }

            }else {
               if(temp.getpLeft()==null) {
                  temp.setpLeft(node);
                  break;
               }else {
                  before=temp;//guarda o nó antecessor do próximo nó.
                  temp=temp.getpLeft();//atualiza para o próximo nó,para continuar a pesquisa pelo lado esquerdo.
               }
            }
         }
         return;
      }

      if(node.getproductStore().getId()==radix.getproductStore().getId()) { // substitui o nó raiz(crítico).
         node.setpLeft((radix.getpLeft()));
         node.setpRight(radix.getpRight());
         radix=node;// atualiza o raiz com novo(node) nó.
         return;
      }

      //pesquisa pelo lado esquerdo a partir do nó raiz.
      //node: nó a ser inserido na árvore.
      if(node.getproductStore().getId()<radix.getproductStore().getId()) {
         before=radix;
         temp=radix.getpLeft();
         while(true) {
            if(node.getproductStore().getId()==temp.getproductStore().getId()) { //substitui o nó com o novo nó(node).
               node.setpLeft(temp.getpLeft());
               node.setpRight(temp.getpRight());
               before.setpRight(node);
               break;
            }
            if(node.getproductStore().getId()>temp.getproductStore().getId()) {
               if(temp.getpRight()==null) {
                  temp.setpRight(node);
                  break;
               }else {
                  before=temp;// guarda o nó antecessor do próximo nó.
                  temp=temp.getpRight();//atualiza para o próximo nó para continuar a pesquisa para lado direito.
               }
            }else {
               if(temp.getpLeft()==null) {
                  temp.setpLeft(node);
                  break;
               }else {
                  before=temp;// guarda o nó antecessor do próximo nó.
                  temp=temp.getpLeft();//atualiza para o próximo nó para continuar a pesquisa para lado esquerdo.
               }
            }
         }
      }
   }

   public void removeTree() {

   }

   public void listTree() {

   }

   public void updateTree() {

   }
}
