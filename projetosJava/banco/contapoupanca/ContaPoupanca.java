/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package contapoupanca;

import conta.Conta;
import contacorrente.ContaCorrente;

/**
 *
 * @author Jupiter
 */
public class ContaPoupanca extends Conta {

    public static double taxaJuros;

    public ContaPoupanca(int numeroConta, double valor) {
        this.numeroConta = numeroConta;
        this.saldo = valor;
        System.out.printf("%nConta poupanca criada:");
        System.out.printf("%nNumero da conta: %d", this.numeroConta);
        System.out.printf("%nValor depositado: %.2f%n", this.saldo);
    }

    @Override
    public void depositar(double valor) {
        if (valor <= 0.00) {

            System.out.printf("%n%nVoce nao pode depositar na conta poupanca,valores menores ou igual a zero.");

        } else {
            saldo = saldo + valor;
            System.out.printf("%n%nVoce depositou: %.2f na sua conta poupanca", valor);
            imprimirCP();
        }
    }

    @Override
    public void sacar(double valor) { // saldo não poderá ser zero e nem negativo.
        if (valor <= 0.00) {
            System.out.printf("%n%nVoce nao pode sacar da conta poupanca,valores menores ou igual a zero.");
        } else {
            if ((saldo - valor) <= 1) {
                System.out.printf("%n%nVoce tentou sacar o valor de %.2f ,mas,nao ha saldo suficiente na sua conta poupanca.", valor);
                System.out.printf("%nSaldo na conta nao pode ser inferior a 1 real");
            } else {
                saldo = saldo - valor;
                System.out.printf("%n%nVoce sacou %.2f na sua conta poupanca ", valor);
                imprimirCP();
            }
        }

    }

    @Override
    public void transferencia(ContaPoupanca origem, ContaCorrente destino, double valor) {
        if (valor <= 0.00) {
            System.out.printf("%n%nVoce nao pode transferir da conta poupanca,valores menores ou igual a zero.");
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
                System.out.printf("%nSaldo atual conta corrente: %.2f", destino.saldoAtual());
            }
        }
    }

    @Override
    public double saldoAtual() {
        return saldo * (1 + (taxaJuros / 100));
    }
}
