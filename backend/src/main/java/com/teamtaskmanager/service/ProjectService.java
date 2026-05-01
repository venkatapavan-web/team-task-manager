package com.teamtaskmanager.service;

import com.teamtaskmanager.entity.Project;
import com.teamtaskmanager.entity.User;
import com.teamtaskmanager.repository.ProjectRepository;
import com.teamtaskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public Project createProject(Project project, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        project.setCreatedBy(user);
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
