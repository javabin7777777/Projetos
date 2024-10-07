package com.samzubeli.ConversorDeMoedas.principal;

import java.util.Scanner;

import com.samzubeli.ConversorDeMoedas.api.Conexao;
import com.samzubeli.ConversorDeMoedas.api.Utilidades;

public class Principal {

	public static void main(String[] args) {
		Scanner lerEntrada = new Scanner(System.in);
		Conexao con = new Conexao();
		Utilidades util = new Utilidades();
		while (true) {
			System.out.println("***************************************\n");
			System.out.println("    conversor de moedas".toUpperCase());
			System.out.println();
			System.out.println("    1. usd para brl(dolar para real brasileiro)".toLowerCase());
			System.out.println("    2. brl para usd".toLowerCase());
			System.out.println("    3. usd para cop(dolar para peso colombiano)".toLowerCase());
			System.out.println("    4. cop para usd".toLowerCase());
			System.out.println("    5. usd para ars(dolar para peso argentino)".toLowerCase());
			System.out.println("    6. ars para usd".toLowerCase());
			System.out.println("    7. sair\n".toLowerCase());
			System.out.println("***************************************\n");
			int valor = lerEntrada.nextInt();
			if (valor == 7)
				break;
			if (util.verificarEntrada(valor))
				System.out.println("\nsomente numeros entre 1 e 7\n".toUpperCase());
			else {
				String key = "";
				String parMoedas = "";
				double moeda = 0.0;
				double taxaCambio = 0.0;

				switch (valor) {

				case 1:
					key = "YOUR-API-KEY/pair/USD/BRL";
					parMoedas = " usd - brl: ".toUpperCase();
					System.out.println("Entre com o valor para conversão de moeda: ");
					moeda = lerEntrada.nextDouble();
					taxaCambio = util.obterTaxaDeCambio(con, key);
					moeda = moeda * taxaCambio;
					util.imprimirValores(parMoedas, moeda, taxaCambio);
					break;

				case 2:
					key = "YOUR-API-KEY/pair/USD/BRL";
					parMoedas = " brl - usd: ".toUpperCase();
					System.out.println("Entre com o valor para conversão de moeda: ");
					moeda = lerEntrada.nextDouble();
					taxaCambio = util.obterTaxaDeCambio(con, key);
					moeda = moeda / taxaCambio;
					util.imprimirValores(parMoedas, moeda, taxaCambio);
					break;

				case 3:
					key = "YOUR-API-KEY/pair/USD/COP";
					parMoedas = " usd - cop: ".toUpperCase();
					System.out.println("Entre com o valor para conversão de moeda: ");
					moeda = lerEntrada.nextDouble();
					taxaCambio = util.obterTaxaDeCambio(con, key);
					moeda = moeda * taxaCambio;
					util.imprimirValores(parMoedas, moeda, taxaCambio);
					break;

				case 4:
					key = "YOUR-API-KEY/pair/USD/COP";
					parMoedas = " cop - usd: ".toUpperCase();
					System.out.println("Entre com o valor para conversão de moeda: ");
					moeda = lerEntrada.nextDouble();
					taxaCambio = util.obterTaxaDeCambio(con, key);
					moeda = moeda / taxaCambio;
					util.imprimirValores(parMoedas, moeda, taxaCambio);
					break;

				case 5:
					key = "YOUR-API-KEY/pair/USD/ARS";
					parMoedas = " usd - ars: ".toUpperCase();
					System.out.println("Entre com o valor para conversão de moeda: ");
					moeda = lerEntrada.nextDouble();
					taxaCambio = util.obterTaxaDeCambio(con, key);
					moeda = moeda * taxaCambio;
					util.imprimirValores(parMoedas, moeda, taxaCambio);
					break;

				case 6:
					key = "YOUR-API-KEY/pair/USD/ARS";
					parMoedas = " ars - usd: ".toUpperCase();
					System.out.println("Entre com o valor para conversão de moeda: ");
					moeda = lerEntrada.nextDouble();
					taxaCambio = util.obterTaxaDeCambio(con, key);
					moeda = moeda / taxaCambio;
					util.imprimirValores(parMoedas, moeda, taxaCambio);
					break;
				}
			}
		}
		lerEntrada.close();
		System.out.println("\n\n terminou seu programa".toUpperCase());
	}

}
