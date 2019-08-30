package com.bridgelabz.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.bridgelabz.model.StudentLogin;
import com.bridgelabz.model.StudentRegistration;

@Component
public class StudentDao {
	@Autowired
	JdbcTemplate jdbcTemplate;

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public int register(StudentRegistration registration) {

		String sql = "INSERT INTO student (name, email, mobno, password)" + " VALUES ('" + registration.getName()
				+ "','" + registration.getEmail() + "','" + registration.getMobno() + "', '"
				+ registration.getPassword() + "')";
		return jdbcTemplate.update(sql);

	}

	public int login(StudentLogin login) {

		String sql = "select * from student where email='" + login.getEmail() + "' and password='" + login.getPassword()
				+ "'";
		List<StudentRegistration> users = jdbcTemplate.query(sql, new RowMapper<StudentRegistration>()

		{

			@Override
			public StudentRegistration mapRow(ResultSet rs, int rowNum) throws SQLException {
				StudentRegistration student = new StudentRegistration();
				student.setEmail(rs.getString("email"));
				student.setPassword(rs.getString("password"));
				return student;
			}
		});

		System.out.println("inside lgoinmethod_:-" + users.get(0));
		System.out.println("inside lgoinmethod_:-" + users.get(0));
		if (users.size() > 0) {
			return 1;
		} else

			return 0;
	
	}

}
