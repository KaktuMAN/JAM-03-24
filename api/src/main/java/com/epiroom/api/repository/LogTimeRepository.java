package com.epiroom.api.repository;

import com.epiroom.api.model.LogTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface LogTimeRepository extends JpaRepository<LogTime, String> {
    List<LogTime> findByDateBetween(Date startDate, Date endDate);
}