package com.bridgelabz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.bridgelabz.model.StudentRegistration;
import com.bridgelabz.serviceimplement.Services;
import com.bridgelabz.util.Utility;

@Controller
public class RegistrationController
{
	@RequestMapping("/Registration")
	public String resistrationPage()
	{
		System.out.println("inside cont");
		return	"Registration";
		
	}

	@Autowired
	Services service;
	
	@Autowired
	Utility utility;
	
	@RequestMapping(value = "/registrationpage", method = RequestMethod.POST)
	public ModelAndView doregister(@ModelAttribute StudentRegistration student)
	{
		String password=student.getPassword();
		String ePass=utility.encryptPassword(password);
		System.out.println(ePass);
		student.setPassword(ePass);
		int result=service.register(student);
		if (result>0)
		{
		 return new ModelAndView("RegistrationSuccess");	
		}
		else 
		{
			return new ModelAndView("index");
		}
		
	}
}
