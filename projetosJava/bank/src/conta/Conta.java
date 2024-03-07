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

    public void sacar(double valor) {
    }

    public void depositar(double valor) {
    }

    public void transferencia(Conta origem, Conta destino, double valor, boolean tipoConta) {
        if (tipoConta) { // Transferencia conta corrente
            if (valor <= 1.00) {

                System.out.printf("%n%nVoce nao pode transferir da conta corrente,valores menores ou igual a um.");

            } else {

                if ((origem.saldoAtual() - valor) <= 1) {
                    System.out.printf("%n%nVoce tentou transferir %.2f ,mas,nao ha saldo suficiente na conta"
                            + " corrente para transferencia.", valor);
                    System.out.printf("%nSaldo na sua conta nao pode ser inferior a 1 real.");
                } else {
                    destino.setSaldo(destino.getSaldo() + valor);
                    origem.setSaldo(origem.saldo - valor);
                    System.out.printf("%n%nTransferencia da sua conta corrente para sua conta poupanca");
                    System.out.printf("%nValor transferido: %.2f", valor);
                    imprimirCC();
                    System.out.printf("%nSaldo atualizado conta poupanca: %.2f", destino.saldoAtual());
                }
            }

        }else {
            if (valor <= 1.00) { // Transferencia conta poupanca

                System.out.printf("%n%nVoce nao pode transferir da conta poupanca,valores menores ou igual a um.");

            } else {
                if ((origem.saldo - valor) <= 1) {

                    System.out.printf("%n%nvoce tentou transferir %.2f ,mas,nao ha saldo suficiente na conta poupanca"
                            + " para transferencia.", valor);
                    System.out.printf("%nSaldo na sua conta nao pode ser inferior a 1 real.");

                } else {

                    destino.setSaldo(destino.getSaldo() + valor);
                    origem.setSaldo(origem.getSaldo() - valor);
                    System.out.printf("%n%nTransferencia da sua conta poupanca para sua conta corrente");
                    System.out.printf("%nValor transferido: %.2f", valor);
                    imprimirCP();
                    System.out.printf("%nSaldo conta corrente: %.2f", destino.getSaldo());
                    System.out.printf("%nSaldo atualizado conta corrente: %.2f", destino.saldoAtual());

                }
            }
        }
    }

    // public void transferencia(ContaCorrente origem, ContaPoupanca destino, double valor) {}    
    // public void transferencia(ContaPoupanca origem, ContaCorrente destino, double valor) {}
    
    
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
        System.out.printf("%nNumero da conta corrente: %d", this.numeroConta);
        System.out.printf("%nSeu saldo: %.2f", this.saldo);
        System.out.printf("%nCheque especial: %.2f", ContaCorrente.chequeEspecial);
        System.out.printf("%nSeu saldo atual: %.2f", saldoAtual());
    }

    protected void imprimirCP() {
        System.out.printf("%nNumero da conta poupanca: %d", this.numeroConta);
        System.out.printf("%nSeu saldo: %.2f", this.saldo);
        System.out.printf("%nTaxa de remuneracao: %.2f%%", ContaPoupanca.taxaJuros);
        System.out.printf("%nSeu saldo atual: %.2f", saldoAtual());
    }
}
