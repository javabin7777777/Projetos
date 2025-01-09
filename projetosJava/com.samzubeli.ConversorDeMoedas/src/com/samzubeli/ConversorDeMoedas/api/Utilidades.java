package com.samzubeli.ConversorDeMoedas.api;

import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.InputMismatchException;
import java.util.Scanner;

public class Utilidades {
	/*
	public boolean verificarEntrada(int valor) {
		// int[] numeros = { 1, 2, 3, 4, 5, 6, 7 };
		if (valor > 0 & valor < 8)
			return false;
		return true;
	}
	*/

	public double obterTaxaDeCambio(Conexao con, String url) {
		// System.out.println(con.conectar(url));
		String bodyJson = con.conectar(url);
		
		if (!bodyJson.isEmpty()) { //!(bodyJson.length() == 1 & Integer.parseInt(String.valueOf(bodyJson.charAt(0))) == 0)
			String str = bodyJson.substring(bodyJson.indexOf("{") + 1, bodyJson.lastIndexOf("}"));
			// System.out.println();
			// System.out.println("str: "+str);
			String[] arrayStr1 = str.split(",");
			String[] arrayStr2 = str.split(",");
			//System.out.println(Arrays.toString(arrayStr1));
			//System.out.println(Arrays.toString(arrayStr2));
			arrayStr1 = arrayStr1[0].split(":");
			//System.out.println(Arrays.toString(arrayStr1));
			//System.out.println(arrayStr1[1]);
			//System.out.println(arrayStr1[1].length());
			//System.out.println(arrayStr1[1].compareToIgnoreCase("\"error\""));
			if(arrayStr1[arrayStr1.length-1].compareToIgnoreCase("\"error\"") == 0) {
				System.out.println();
				System.out.println();
				System.out.println("retornou com status error".toUpperCase());
				System.out.println();
				System.out.println();
				return 0;
			} else {
				arrayStr2 = arrayStr2[arrayStr2.length - 1].split(":");
				//System.out.println(Arrays.toString(arrayStr2));
				return Double.parseDouble(arrayStr2[arrayStr2.length-1]);
			}
			
			// System.out.println();
			// System.out.println(Arrays.toString(array));
			// System.out.println();
			// System.out.println("Valor da taxa de
			// câmbio"+parMoedas+array[array.length-1]);
			// System.out.println("Valor"+parMoedas+moeda*Double.parseDouble(array[array.length-1]));
			// System.out.println("\n");
		}
		return 0;

	}

	public void imprimirValores(String parMoedas, double moeda, double taxaCambio) {
		if (moeda > 0) {			
			System.out.println();
			System.out.println("Valor da taxa de câmbio: " + formatarValor(taxaCambio));
			System.out.println("Valor" + parMoedas + formatarValor(moeda));
			System.out.println();
		}
	}

	public double entradaDeValores(boolean entrada) {
		Scanner ler = new Scanner(System.in);
		if (entrada) {
			try {
				System.out.println("Entre com o valor para conversão de moeda: ".toUpperCase());
				double moeda = ler.nextDouble();
				moeda = Double.parseDouble(formatarValor(moeda));
				if (moeda <= 0) {
					System.out.println();
					System.out.println();
					System.out.println(
							">>>>>>>>>>>>  somente valores maiores que zero são aceitos  <<<<<<<<<<<<<".toUpperCase());
					System.out.println();
					System.out.println();
					return 0;

				}
				return moeda;
			} catch (InputMismatchException e) {
				System.out.println();
				System.out.println();
				System.out.println(">>>>>>>>>>>>  somente valores numéricos são aceitos  <<<<<<<<<<<<<".toUpperCase());
				System.out.println();
				System.out.println();
			}

			return 0;
		}

		try {
			System.out.println("\n escolha a sua opção: \n".toUpperCase());
			int valor = ler.nextInt();		
			if (!(valor > 0 & valor < 8)) {
				System.out.println();
				System.out.println();
				System.out.println("\n >>>>>>>>>>>>>  somente valores inteiros entre 1 e 7 são aceitos  <<<<<<<<<<<<<\n"
						.toUpperCase());
				System.out.println();
				System.out.println();
				return 0;
			}
			return valor;
		} catch (InputMismatchException e) {
			System.out.println();
			System.out.println();
			System.out.println(">>>>>>>>>>>>  somente valores numéricos são aceitos   <<<<<<<<<<<<".toUpperCase());
			System.out.println();
			System.out.println();
		}
		return 0;

	}
	
	private String formatarValor(double valor) {
		DecimalFormat f = new DecimalFormat("###.####");		 
		return f.format(valor);
	}
}
