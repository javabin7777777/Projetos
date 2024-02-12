/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package conta;

import banco.Banco;
import contacorrente.ContaCorrente;
import contapoupanca.ContaPoupanca;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Jupiter
 */
public class Conta {

    protected int numeroConta;
    protected double saldo;
    private static List<Conta> conta = new ArrayList<>();

    public int getNumeroConta() {
        return numeroConta;
    }

    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }

    public double getSaldo() {
        return saldo;
    }

    public void sacar(double valor) {}

    public void depositar(double valor) {}

    public void transferencia(ContaCorrente origem, ContaPoupanca destino, double valor) {}    
    
    public void transferencia(ContaPoupanca origem, ContaCorrente destino, double valor) {}
    
    public double saldoAtual() {
        return 0;
    }

    public static double saldoTotal() {
        conta = Banco.getContas();
        if (!(conta.isEmpty())) {
            double total = 0.0;
            for (Conta conta : conta) { // A lista conta,contém objetos conta corrente e conta poupança.
                total += conta.saldoAtual();
            }
            return total;
        }
        return 0;
    }

    protected void imprimirCC() {
        System.out.printf("%nNumero da conta corrente: %d",this.numeroConta);
        System.out.printf("%nSeu saldo: %.2f",this.saldo);
        System.out.printf("%nCheque especial: %.2f",ContaCorrente.chequeEspecial);
        System.out.printf("%nSeu saldo atual: %.2f",saldoAtual());
    }

    protected void imprimirCP() {
        System.out.printf("%nNumero da conta poupanca: %d",this.numeroConta);
        System.out.printf("%nSeu saldo: %.2f",this.saldo);
        System.out.printf("%nTaxa de remuneracao: %.2f%%",ContaPoupanca.taxaJuros);
        System.out.printf("%nSeu saldo atual: %.2f",saldoAtual());
    }
}
