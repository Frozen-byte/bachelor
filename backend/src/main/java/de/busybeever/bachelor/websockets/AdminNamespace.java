package de.busybeever.bachelor.websockets;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;

import de.busybeever.bachelor.presentation.generator.UpdateOverviewObject;
import de.busybeever.bachelor.security.UserEntity;
import de.busybeever.bachelor.security.UserRepository;
import de.busybeever.bachelor.security.jwt.AuthenticationRequest;
import de.busybeever.bachelor.service.GameStatusService;
import de.busybeever.bachelor.service.GeneratorService;

@Service
public class AdminNamespace {

	@Value("${socketio.admin.namespace}")
	private String adminNamespace;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private GameStatusService gameStatusService;

	@Autowired
	private SocketIOServer server;
	
	@Autowired
	private GeneratorService generatorService;
	
	
	private static final List<SocketIOClient> authenticatedAdmins = new ArrayList<>();
	
	@PostConstruct
	public void setup() {
		SocketIONamespace nsp = server.addNamespace(adminNamespace);
		nsp.addEventListener("register", AuthenticationRequest.class, (client, auth, ack) -> onRegister(auth, client));
		nsp.addDisconnectListener((client)-> onDisconnect(client));
	}
	
	private static final Md5PasswordEncoder encoder = new Md5PasswordEncoder();
	
	public void onRegister(AuthenticationRequest auth, SocketIOClient client) {
		
		UserEntity user = userRepository.findByUserName(auth.getUsername());	
		String encodedPass = encoder.encodePassword(auth.getPassword(),null);
		if (user!=null && user.getPassword().equals(encodedPass) &&!authenticatedAdmins.contains(client)) {
			authenticatedAdmins.add(client);

			client.sendEvent("authenticated");
			client.sendEvent("running",generatorService.getRunningGeneratorName());
			client.sendEvent("init", gameStatusService.generateUpdate());
			
		} else {
			client.sendEvent("denied", "Wrong username/password");
		}

	}
	
	private void onDisconnect(SocketIOClient client) {
		if(authenticatedAdmins.contains(client)) {
			authenticatedAdmins.remove(client);
		}
	}
	
	@Scheduled(fixedRate=1000)
	public void update() {
		UpdateOverviewObject obj = gameStatusService.generateUpdate();
		if(obj!=null) {
			authenticatedAdmins.forEach(e-> {
				e.sendEvent("update", obj);
			});
		}
	}
	
	public void informAboutEnd() {
		authenticatedAdmins.forEach(e-> {
			e.sendEvent("end");
		});
	}
	
}
