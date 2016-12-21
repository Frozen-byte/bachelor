package de.busybeever.bachelor.presentation.error;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.busybeever.bachelor.service.GlobalErrorServiceImpl;

@RestController
@RequestMapping("errors")
public class ErrorRest {

	@Autowired
	private GlobalErrorServiceImpl globalErrorService;
	
	@GetMapping("/all")
	public List<String> getErrors () {
		return globalErrorService.getErrors();
	}
}
