/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package principal;

import banco.Banco;
import conta.Conta;
import contacorrente.ContaCorrente;
import contapoupanca.ContaPoupanca;

/**
 *
 * @author Jupiter
 */
public class BancoPrincipal {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        // Inicialização das contas corrente e poupança.
        Banco banco = new Banco();
        Conta conta;
        ContaCorrente.chequeEspecial = 901.00;
        ContaPoupanca.taxaJuros = 0.25;
        ContaCorrente cc = new ContaCorrente(10001, 7002.60);
        banco.adicionarConta(cc);
        ContaPoupanca cp = new ContaPoupanca(20001, 4005.53);
        banco.adicionarConta(cp);
        
        // Manipulação de conta corrente.
        conta = cc;
        conta.sacar(120.00);
        conta.depositar(100.00);
        conta.transferencia(cc, cp, 500);

        // Manipulação da conta poupança.
        conta = cp;
        conta.sacar(400.00);
        conta.depositar(160.00);
        conta.transferencia(cp, cc, 300);
        System.out.printf("%n%nSaldo total do banco: %.2f", Conta.saldoTotal());
        
        // Manipulação de conta poupança e conta corrente.
        conta.sacar(3964.00);
        conta.sacar(0.53);
        conta.sacar(0.54);
        conta.sacar(0.00);
        conta.transferencia(cp, cc, 1.00);
        conta.depositar(-0.574);
        conta.transferencia(cp, cc, -1.00);
        
        conta = cc;
        conta.sacar(7683.50);
        conta.sacar(7682.61);
        conta.sacar(7682.00);
        conta.sacar(0.61);
        conta.transferencia(cc, cp, 0.61);
        conta.sacar(0.00);
        conta.transferencia(cc, cp, -0.50);
        conta.depositar(-0.01);
        
        System.out.println();
        System.out.println("\n\nContas existentes no banco: " + Banco.getContas());
        banco.removerConta(cp);
        banco.removerConta(cc);
        System.out.println("\n\nContas existentes no banco: " + Banco.getContas());
    }
}
