/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package contacorrente;

import conta.Conta;
import contapoupanca.ContaPoupanca;

/**
 *
 * @author Jupiter
 */
public class ContaCorrente extends Conta {

    public static double chequeEspecial;

    public ContaCorrente(int numeroConta, double valor) {
        this.numeroConta = numeroConta;
        this.saldo = valor;
        System.out.printf("%nConta corrente criada:");
        System.out.printf("%nNumero da conta: %d", this.numeroConta);
        System.out.printf("%nValor depositado: %.2f%n", this.saldo);
    }

    @Override
    public void depositar(double valor) {
        if (valor <= 0.00) {

            System.out.printf("%n%nVoce nao pode depositar na conta corrente,valores menores ou igual a zero.");

        } else {
            saldo = saldo + valor;
            System.out.printf("%n%nVoce depositou: %.2f na sua conta corrente", valor);
            imprimirCC();
        }
    }

    @Override
    public void sacar(double valor) { // saldo(incluindo o cheque especial) não poderá ser zero e nem negativo.
        if (valor <= 0.00) {

            System.out.printf("%n%nVoce nao pode sacar da conta corrente,valores menores ou igual a zero.");

        } else {
            if ((saldoAtual() - valor) <= 1) {

                System.out.printf("%n%nVoce tentou sacar o valor de %.2f ,mas,nao ha saldo suficiente na sua conta corrente.", valor);
                System.out.printf("%nSaldo na conta nao pode ser inferior a 1 real.");

            } else {

                saldo = saldo - valor;
                System.out.printf("%n%nVoce sacou: %.2f da sua conta corrente ", valor);
                imprimirCC();

            }
        }
    }

    @Override
    public void transferencia(ContaCorrente origem, ContaPoupanca destino, double valor) {
        if (valor <= 0.00) {

            System.out.printf("%n%nVoce nao pode transferir da conta corrente,valores menores ou igual a zero.");

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
                System.out.printf("%nSaldo atual conta poupanca: %.2f", destino.saldoAtual());
            }
        }
    }

    @Override
    public double saldoAtual() {
        return saldo + chequeEspecial;
    }
}
