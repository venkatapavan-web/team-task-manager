package com.teamtaskmanager.repository;

import com.teamtaskmanager.entity.Task;
import com.teamtaskmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedTo(User user);
    List<Task> findByProjectId(Long projectId);
}
