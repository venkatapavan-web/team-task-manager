package com.teamtaskmanager.controller;

import com.teamtaskmanager.entity.Task;
import com.teamtaskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        // If user is ADMIN, they might want all tasks or just their own. 
        // For simplicity, ADMIN sees all, MEMBER sees only assigned.
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return ResponseEntity.ok(taskService.getAllTasks());
        } else {
            return ResponseEntity.ok(taskService.getTasksByUser(email));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_MEMBER')")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> payload) {
        String status = payload.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().build();
        }
        Task.Status taskStatus = Task.Status.valueOf(status.toUpperCase().replace("\"", ""));
        return ResponseEntity.ok(taskService.updateTaskStatus(id, taskStatus));
    }
}
