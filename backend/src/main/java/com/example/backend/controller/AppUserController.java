package com.example.backend.controller;

import com.example.backend.model.AppUser;
import com.example.backend.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/app-users")
public class AppUserController {
    private final AppUserService appUserService;

    // create = signup
    @PostMapping
    public AppUser create (@RequestBody AppUser appUser) {
        return appUserService.create(appUser);
    }

    @PostMapping("/login")
    public Optional<AppUser> login() {
        return me();
    }

    @GetMapping("/me")
    public Optional<AppUser> me() {
        return appUserService.findByUsernameWithoutPassword(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @GetMapping("/logout")
    public void logout (HttpSession httpSession) {
        httpSession.invalidate();
    }
}
