package com.alexxue.demo.student;

import com.alexxue.demo.exception.ApiRequestException;
import com.alexxue.demo.validation.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {
    private final StudentDao studentDao;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentService(StudentDao studentDao, EmailValidator emailValidator) {
        this.studentDao = studentDao;
        this.emailValidator = emailValidator;
    }

    public List<Student> getAllStudents() {
        return studentDao.selectAllStudents();
    }

    void addNewStudent(Student student) {
        UUID newStudentId = UUID.randomUUID();
        // Verify that email is not taken
        if (!emailValidator.test(student.getEmail()))  {
            throw new ApiRequestException(student.getEmail() + " is not valid");
        }
        // TODO: Validate email
        if (studentDao.isEmailTaken(student.getEmail())) {
            throw new ApiRequestException(student.getEmail() + " is already taken");
        }
        studentDao.insertStudent(newStudentId, student);
    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
        // Verify that email is not taken
        if (!emailValidator.test(student.getEmail()))  {
            throw new ApiRequestException(student.getEmail() + " is not valid");
        }
        // TODO: Verify that email is not taken
        studentDao.insertStudent(newStudentId, student);
    }
}
