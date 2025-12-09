package com.predicto.auth.controller;

import com.predicto.auth.entity.Project;
import com.predicto.auth.entity.User;
import com.predicto.auth.repository.ProjectRepository;
import com.predicto.auth.repository.UserRepository;
import com.predicto.auth.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @GetMapping("/metrics")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getDashboardMetrics(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(userPrincipal.getId()).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Project> userProjects = projectRepository.findByUserId(user.getId());

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalProjects", userProjects.size());
        metrics.put("activeProjects", userProjects.stream().filter(p -> p.getStatus().equals("active")).count());
        metrics.put("completedProjects", userProjects.stream().filter(p -> p.getStatus().equals("completed")).count());
        metrics.put("totalUsers", userRepository.count());

        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/projects")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserProjects(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<Project> projects = projectRepository.findByUserId(userPrincipal.getId());

        return ResponseEntity.ok(projects);
    }

    @GetMapping("/activity")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserActivity(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        // This would typically fetch from an activity log repository
        // For now, returning a placeholder
        Map<String, Object> activity = new HashMap<>();
        activity.put("recentActivity", "User logged in");
        activity.put("timestamp", System.currentTimeMillis());

        return ResponseEntity.ok(activity);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(userPrincipal.getId()).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("email", user.getEmail());
        profile.put("firstName", user.getFirstName());
        profile.put("lastName", user.getLastName());
        profile.put("createdAt", user.getCreatedAt());
        profile.put("isActive", user.getIsActive());

        return ResponseEntity.ok(profile);
    }
}
