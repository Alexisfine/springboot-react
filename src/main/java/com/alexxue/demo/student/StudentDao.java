package com.alexxue.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.alexxue.demo.student.Student.Gender.FEMALE;
import static com.alexxue.demo.student.Student.Gender.MALE;

@Repository
public class StudentDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> selectAllStudents() {
        String sql = "" +
                "SELECT student_id, " +
                " first_name," +
                " last_name, " +
                " email" +
                " gender " +
                "FROM student";
        List<Student> students = jdbcTemplate.query(sql, mapStudentFromDb());
        return students;
    }

    private static RowMapper<Student> mapStudentFromDb() {
        return (resultSet, rowNum) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);

            return new Student(
                    studentId,
                    firstName,
                    lastName,
                    email,
                    gender);
        };
    }
}
