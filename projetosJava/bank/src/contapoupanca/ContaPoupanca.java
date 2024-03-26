/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package contapoupanca;

import conta.Conta;

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
        if ( valor < 1.00 ) {

            System.out.printf("%n%nVoce nao pode depositar na conta poupanca,valores menores a 1 real.");

        } else {

            saldo = saldo + valor;
            System.out.printf("%n%nVoce depositou: %.2f na sua conta poupanca", valor);
            super.imprimirCP();
            
        }
    }

    @Override
    public void sacar(double valor) { // saldo não poderá ser abaixo de um.
        if ( valor < 1.00 ) {

            System.out.printf("%n%nVoce nao pode sacar da conta poupanca,valores menores a 1 real.");

        } else {
            
            if ((saldo - valor) <= 1 ) {
                System.out.printf("%n%nVoce tentou sacar o valor de %.2f ,mas,nao ha saldo suficiente na sua conta poupanca.", valor);
                System.out.printf("%nSaldo na conta nao pode ser inferior a 1 real");
            } else {
                saldo = saldo - valor;
                System.out.printf("%n%nVoce sacou %.2f na sua conta poupanca ", valor);
                super.imprimirCP();
            }
            
        }

    }
    
    @Override
    public double saldoAtual() {
        
        return saldo * (1 + (taxaJuros / 100));
        
    }
}
