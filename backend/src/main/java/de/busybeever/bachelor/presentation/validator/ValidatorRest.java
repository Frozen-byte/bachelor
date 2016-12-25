package de.busybeever.bachelor.presentation.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.busybeever.bachelor.service.ValidationService;

@RestController
@RequestMapping("validation")
public class ValidatorRest {

	
	@Autowired
	private ValidationService validationService;
	
	@GetMapping("allowed")
	public String[] getAllowedMethods() {
		return validationService.getAllowedMethods();
	}
	
}
