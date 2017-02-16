package de.busybeever.bachelor.websockets;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;


@org.springframework.context.annotation.Configuration
public class WebsocketConfig {

	@Value("${socketio.port}")
	private int port;
	
	@Bean
	public SocketIOServer socketIOServer() {

		Configuration cfg = new Configuration();
		cfg.setPort(port);
		cfg.setKeyStorePassword("bachelor");
		cfg.setKeyStoreFormat("PKCS12");
		try {
			cfg.setKeyStore(new FileInputStream(new File("keystore.p12")));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			System.err.println("The SSL-key could not be found. This error is CRITICAL. The application will quit");
			System.exit(-1);
		}
		SocketIOServer server = new SocketIOServer(cfg);
		server.start();
		return server;
	}
	
	
	
	
}
