package com.biswajit.authentication_service.repository;


import com.biswajit.authentication_service.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Integer> {

    Optional<User> findByEmail(String email);
}
