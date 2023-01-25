package com.example.backend.service;

import com.example.backend.model.AppUser;
import com.example.backend.repository.AppUserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserServiceTest {

    // tests line 22 - 24 & 30 - 33 & 45 - 54
    @Test
    void whenCreateNewAppUser_thenReturnNewAppUser(){
        // GIVEN
        AppUser newAppUser = new AppUser(
                "1","Elias","user",null
        );
        AppUser newAppUserExpected = new AppUser(
                "1","Elias","","BASIC"
        );
        AppUserRepository mockAppUserRepository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(mockAppUserRepository, new BCryptPasswordEncoder());
        Mockito.when(mockAppUserRepository.findByUsername(newAppUser.getUsername())).thenReturn(Optional.empty());

        // WHEN
        AppUser actual = appUserService.create(newAppUser);
        // THEN
        Assertions.assertEquals(actual,newAppUserExpected);

        Mockito.verify(mockAppUserRepository).findByUsername("Elias");
    }

    // tests line 22 - 28
    @Test
    void whenCreateNewAppUser_alreadyExists_thenReturnCONFLICT(){
        // GIVEN
        AppUser newAppUser = new AppUser(
                "1","Elias","user",null
        );
        AppUser newAppUserExpected = new AppUser(
                "1","Elias","","BASIC"
        );
        AppUserRepository mockAppUserRepository = Mockito.mock(AppUserRepository.class);

        AppUserService appUserService = new AppUserService(mockAppUserRepository, new BCryptPasswordEncoder());
        Mockito.when(mockAppUserRepository.findByUsername(newAppUser.getUsername())).thenReturn(Optional.of(newAppUserExpected));

        try {
            appUserService.create(newAppUser); // WHEN
            Assertions.fail(); // THEN
        } catch (ResponseStatusException error) {
            Assertions.assertEquals(HttpStatus.CONFLICT, error.getStatus());
        }

        Mockito.verify(mockAppUserRepository).findByUsername("Elias");
    }

    @Test
    @WithMockUser(username = "user", roles = "ADMIN")
    void whenCreateNewAppUserRoleAdmin_thenReturnUserWithAdminRole() {
        // GIVEN
        AppUser user = new AppUser("1", "Elias", "user", "ADMIN");
        AppUser expectedUser = new AppUser("1", "Elias", "", "ADMIN");

        AppUserRepository repository = Mockito.mock(AppUserRepository.class);
        Mockito.when(repository.findByUsername("user")).thenReturn(Optional.empty());

        AppUserService appUserService = new AppUserService(repository, new BCryptPasswordEncoder());

        // WHEN
        AppUser actual = appUserService.create(user);

        // THEN
        Assertions.assertEquals(actual, expectedUser);
    }

    /*
    @Test
    @WithMockUser(username = "user", roles = "ADMIN")
    void getAuthenticatedUser_whenUserExists_thenReturnUser() {
        // GIVEN
        AppUser user = new AppUser("1", "Elias", "user", "BASIC");
        AppUser expectedUser = new AppUser("1", "UserName", "", "BASIC");

        AppUserRepository repository = Mockito.mock(AppUserRepository.class);
        Mockito.when(repository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        //SecurityContextHolder securityContextHolder = Mockito.mock(SecurityContextHolder.class);
        //Mockito.when(securityContextHolder.getContext().getAuthentication().getName().thenReturn("Elias");

        AppUserService appUserService = new AppUserService(repository, new BCryptPasswordEncoder());

        // WHEN
        AppUser actual = appUserService.getAuthenticatedUser();

        // THEN
        Assertions.assertEquals(actual, Optional.of(expectedUser));
    }

     */
}