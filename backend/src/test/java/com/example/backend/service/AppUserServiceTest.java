package com.example.backend.service;

import com.example.backend.model.AppUser;
import com.example.backend.repository.AppUserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserServiceTest {

    @Test
    void whenCreateNewAppUser_returnNewAppUser(){
        // GIVEN
        AppUser newAppUser = new AppUser("1","Elias","user",null);
        AppUser newAppUserExpected = new AppUser("1","Elias","","BASIC");

        AppUserRepository mockAppUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(mockAppUserRepository, new BCryptPasswordEncoder());
        Mockito.when(mockAppUserRepository.findByUsername(newAppUser.getUsername())).thenReturn(Optional.empty());

        // WHEN
        AppUser actual = appUserService.create(newAppUser);
        // THEN
        Assertions.assertEquals(actual,newAppUserExpected);
        // VERIFY
        Mockito.verify(mockAppUserRepository).findByUsername("Elias");
    }

    @Test
    void whenCreateNewAppUser_alreadyExists_thenReturnCONFLICT(){
        // GIVEN
        AppUser newAppUser = new AppUser("1","Elias","user",null);
        AppUser newAppUserExpected = new AppUser("1","Elias","","BASIC");

        AppUserRepository mockAppUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(mockAppUserRepository, new BCryptPasswordEncoder());
        Mockito.when(mockAppUserRepository.findByUsername(newAppUser.getUsername()))
                .thenReturn(Optional.of(newAppUserExpected));

        try {
            appUserService.create(newAppUser); // WHEN
            Assertions.fail(); // THEN
        } catch (ResponseStatusException error) {
            Assertions.assertEquals(HttpStatus.CONFLICT, error.getStatus());
        }
        //VERIFY
        Mockito.verify(mockAppUserRepository).findByUsername("Elias");
    }


}