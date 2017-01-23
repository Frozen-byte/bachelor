package de.busybeever.bachelor.presentation.error;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.busybeever.bachelor.service.GlobalErrorService;

@RestController
@RequestMapping("errors")
public class ErrorRest {

	@Autowired
	private GlobalErrorService globalErrorService;
	
	@GetMapping("/all")
	public List<String> getErrors () {
		return globalErrorService.getErrors();
	}
	
	@PostMapping("/clear")
	public void clearErrors() {
		globalErrorService.clear();
	}
}
