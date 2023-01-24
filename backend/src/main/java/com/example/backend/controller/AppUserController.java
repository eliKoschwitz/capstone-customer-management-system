package com.example.backend.controller;

import com.example.backend.model.AppUser;
import com.example.backend.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/app-users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @PostMapping
    public AppUser post (@RequestBody AppUser appUser) {
        return appUserService.create(appUser);
    }

    @PostMapping("/login")
    public Optional<AppUser> login() {
        return appUserService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @GetMapping("/me")
    public Optional<AppUser> me() {
        return appUserService.findByUsernameWithoutPassword(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
