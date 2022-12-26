package com.alexxue.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {
    private final StudentDao studentDao;

    @Autowired
    public StudentService(StudentDao studentDao) {
        this.studentDao = studentDao;
    }

    public List<Student> getAllStudents() {
        return studentDao.selectAllStudents();
    }

    void addNewStudent(Student student) {
        UUID newStudentId = UUID.randomUUID();
        // TODO: Verify that email is not taken
        studentDao.insertStudent(newStudentId, student);
    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
        // TODO: Verify that email is not taken
        studentDao.insertStudent(newStudentId, student);
    }
}
