package com.alexxue.demo.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import static com.alexxue.demo.student.Student.Gender.FEMALE;
import static com.alexxue.demo.student.Student.Gender.MALE;

@RestController
public class StudentController {
    @GetMapping("students")
    public List<Student> getAllStudents() {
        return List.of(
                new Student(UUID.randomUUID(), "James","Bond", "jamesbond@gmail.com", MALE),
                new Student(UUID.randomUUID(), "Elisa","Tamara", "elisatamara@gmail.com", FEMALE)
        );
    }
}
