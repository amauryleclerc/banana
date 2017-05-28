package fr.aleclerc.banana.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import fr.aleclerc.banana.entities.Absence;


public class AbsenceValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return Absence.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		Absence abs = (Absence) obj;
		if(abs.getStart() ==null){
			errors.rejectValue("start", "start.empty");
		}
		if(abs.getEnd()==null){
			errors.rejectValue("start", "start.empty");
		}
		if(abs.getStart().isAfter(abs.getEnd())){
			errors.rejectValue("start", "start.empty", "The start date need to be before the end date");
		}
	}

}
