package com.epiroom.api.repository;

import com.epiroom.api.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, String> {
    Promotion findByYear(int year);
}
