package com.example.mavenreactjsspringboot.repository;

import com.example.mavenreactjsspringboot.models.Physician;
import com.example.mavenreactjsspringboot.models.PhysicianExpertise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhysicianExpertiseRepository extends JpaRepository<PhysicianExpertise, Long> {
    List<Physician> findByExpertiseId(Long expertiseId);

}
