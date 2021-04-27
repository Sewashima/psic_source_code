package com.example.mavenreactjsspringboot.repository;

import com.example.mavenreactjsspringboot.models.ConsultationTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultationTimeRepository extends JpaRepository<ConsultationTime, Long> {
    List<ConsultationTime> findByPhysicianId(Long physicianId);
}
