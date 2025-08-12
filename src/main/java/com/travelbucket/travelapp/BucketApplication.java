package com.travelbucket.travelapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BucketApplication implements CommandLineRunner {
	public static void main(String[] args) {SpringApplication.run(BucketApplication.class, args);}
	public void run(String... args) throws Exception {}
}
