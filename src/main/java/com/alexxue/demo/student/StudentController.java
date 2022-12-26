package com.alexxue.demo.student;

import com.alexxue.demo.exception.ApiRequestException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.alexxue.demo.student.Student.Gender.FEMALE;
import static com.alexxue.demo.student.Student.Gender.MALE;

@RestController
@RequestMapping("students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    void addNewStudent(@RequestBody @Valid Student student) {
        studentService.addNewStudent(student);
    }
}
