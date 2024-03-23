package com.epiroom.api.repository;

import com.epiroom.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByMail(String mail);
}
