package com.biswa.gateway_service.repository;

import com.biswa.gateway_service.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Integer> {

    Optional<User> findByEmail(String email);
}
