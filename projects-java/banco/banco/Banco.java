/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package banco;

import conta.Conta;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Jupiter
 */
public class Banco {    
    private static List<Conta> contas = new ArrayList<>();       

    public static List<Conta> getContas() {
        return contas;
    }   
    
    public void adicionarConta(Conta conta) {
       contas.add(conta);
       System.out.printf("Conta adicionada: %d%n",conta.getNumeroConta());

    }    
    
    public void removerConta(Conta conta){
        if(contas.isEmpty()) System.out.printf("%n%nNao ha contas no banco");
        else {
                if(contas.contains(conta)) 
                    for(int i=0; i<contas.size(); i++ ) { 
                        if(conta == contas.get(i)){
                            contas.remove(i);
                            System.out.printf("%nConta removida: %d",conta.getNumeroConta());
                        }
                    }
                else {
                    System.out.printf("%nEsta conta nao existe");
                }
        }
    }
}
