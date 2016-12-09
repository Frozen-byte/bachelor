package de.busybeever.bachelor.websockets;


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
		SocketIOServer server = new SocketIOServer(cfg);
		server.start();
		return server;
	}
	
	
	
	
}
