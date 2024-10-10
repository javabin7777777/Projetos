package com.samzubeli.ConversorDeMoedas.api;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

public class Conexao {
	public String conectar(String key) {
		try {
			// Preparação da requisição.
			String url = "https://v6.exchangerate-api.com/v6/";
			url = url.concat(key);
			HttpClient client = HttpClient.newHttpClient();
			HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
			// Envio da requisição e obter a resposta. 
			HttpResponse<String> resposta = client.send(request, BodyHandlers.ofString());
			
			return resposta.body();
			
		} catch (IOException | InterruptedException e) {
			System.out.println("Houve um erro de comunicacao com a API WEB");
			System.out.println(e.getMessage());
			throw new RuntimeException(e);
		}
		
	}
}

/*
 * https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP -> devolve no
 * json a taxa de câmbio
 * 
 * EUR -> moeda base USD -> moeda alvo key =
 * "6f7d444c2c79803d656753f8/pair/EUR/GBP" ou
 * "6f7d444c2c79803d656753f8/pair/EUR/GBP/AMOUNT"
 * 
 * GET https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP/AMOUNT ->
 * devolve no json moeda alvo já convertida.
 * 
 * Ex: https://v6.exchangerate-api.com/v6/6f7d444c2c79803d656753f8/latest/USD ->
 * devolve todas moedas convertidas em relação ao dollar.
 */