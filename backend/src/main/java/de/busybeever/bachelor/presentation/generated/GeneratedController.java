package de.busybeever.bachelor.presentation.generated;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.busybeever.bachelor.data.entity.ScriptEntity;
import de.busybeever.bachelor.service.ScriptService;

/**
 * 
 * @author Patrick
 *	RestController for all generated scripts
 */

@RestController
@RequestMapping("generated")
public class GeneratedController {

	@Autowired
	private ScriptService scriptService;
	
	
	@GetMapping("mathjax.js")
	public String getMathjax() {
		return scriptService.getMathjaxScript();
	}
	
	@GetMapping("variables.js")
	public String getVariables() {
		return scriptService.getVariableScript();
	}
	
	@PostMapping("construct")
	public String constructScript(@RequestBody ScriptEntity entity) {

		return scriptService.constructScript(entity);
	}
}
