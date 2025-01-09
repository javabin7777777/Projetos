package com.samzubeli.ConversorDeMoedas.api;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

public class Conexao {
	public String conectar(String endereco) {
	
		try {
			// Preparação da requisição.			
			HttpClient client = HttpClient.newHttpClient();
			HttpRequest request = HttpRequest.newBuilder().uri(URI.create(endereco)).GET().build();
			// Envio da requisição e obter a resposta. 
			HttpResponse<String> resposta = client.send(request, BodyHandlers.ofString());
			//System.out.println( "STATUS: "+resposta.statusCode());
			//System.out.println("RESPOSTA: "+resposta.body());
			
			return resposta.body();
			
		} catch ( IOException | InterruptedException  e) {
			System.out.println();
			System.out.println();
			System.out.println("Houve um erro de comunicacao com a API WEB".toUpperCase());
			System.out.println();
			System.out.println();
			//System.out.println(e.getMessage());			
			//throw new RuntimeException(e);
		}
		
		return "";
		
	}
}

/*
 * https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP -> devolve no
 * json a taxa de câmbio
 * 
 * EUR -> moeda base USD -> moeda alvo key =
 * "YOUR-API-KEY8/pair/EUR/GBP" ou
 * "YOUR-API-KEY/pair/EUR/GBP/AMOUNT"
 * 
 * GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP/AMOUNT ->
 * devolve no json moeda alvo já convertida.
 * 
 * Ex: https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD ->
 * devolve todas moedas convertidas em relação ao dollar.
 */