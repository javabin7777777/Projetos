package com.samzubeli.ConversorDeMoedas.principal;

import com.samzubeli.ConversorDeMoedas.api.Conexao;
import com.samzubeli.ConversorDeMoedas.api.Utilidades;

public class Principal {

	public static void main(String[] args) {	;
		Conexao con = new Conexao();
		Utilidades util = new Utilidades();
		while (true) {
			System.out.println("\n***************************************\n");
			System.out.println("    conversor de moedas".toUpperCase());
			System.out.println();
			System.out.println("    1. usd para brl(dolar para real brasileiro)".toUpperCase());
			System.out.println("    2. brl para usd".toUpperCase());
			System.out.println("    3. usd para cop(dolar para peso colombiano)".toUpperCase());
			System.out.println("    4. cop para usd".toUpperCase());
			System.out.println("    5. usd para ars(dolar para peso argentino)".toUpperCase());
			System.out.println("    6. ars para usd".toUpperCase());
			System.out.println("    7. sair\n".toUpperCase());
			System.out.println("***************************************\n");			
			int valor = (int) util.entradaDeValores(false);			
			if (valor == 7)
				break;
			String url = "";
			String parMoedas = "";
			double moeda = 0.0;
			double taxaCambio = 0.0;

			switch (valor) {

			case 1:
				url = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/BRL";
				parMoedas = " usd - brl: ".toUpperCase();
				moeda = util.entradaDeValores(true);				
				taxaCambio = util.obterTaxaDeCambio(con, url);			
				moeda = moeda * taxaCambio;
				util.imprimirValores(parMoedas, moeda, taxaCambio);
				break;

			case 2:
				url = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/BRL";
				parMoedas = " brl - usd: ".toUpperCase();
				moeda = util.entradaDeValores(true);								
				taxaCambio = util.obterTaxaDeCambio(con, url);
				moeda = moeda / taxaCambio;
				util.imprimirValores(parMoedas, moeda, taxaCambio);
				break;

			case 3:
				url = "https://v6.exchangerate-api.com/YOUR-API-KEY/pair/USD/COP";
				parMoedas = " usd - cop: ".toUpperCase();
				moeda = util.entradaDeValores(true);								
				taxaCambio = util.obterTaxaDeCambio(con, url);
				moeda = moeda * taxaCambio;
				util.imprimirValores(parMoedas, moeda, taxaCambio);
				break;

			case 4:
				url = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/COP";
				parMoedas = " cop - usd: ".toUpperCase();
				moeda = util.entradaDeValores(true);								
				taxaCambio = util.obterTaxaDeCambio(con, url);
				moeda = moeda / taxaCambio;
				util.imprimirValores(parMoedas, moeda, taxaCambio);
				break;

			case 5:
				url = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/ARS";
				parMoedas = " usd - ars: ".toUpperCase();
				moeda = util.entradaDeValores(true);								
				taxaCambio = util.obterTaxaDeCambio(con, url);
				moeda = moeda * taxaCambio;
				util.imprimirValores(parMoedas, moeda, taxaCambio);
				break;

			case 6:
				url = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/ARS";
				parMoedas = " ars - usd: ".toUpperCase();
				moeda = util.entradaDeValores(true);								
				taxaCambio = util.obterTaxaDeCambio(con, url);
				moeda = moeda / taxaCambio;
				util.imprimirValores(parMoedas, moeda, taxaCambio);
				break;
			}

		}		
		System.out.println("\n\n terminou seu programa".toUpperCase());
	}

}
