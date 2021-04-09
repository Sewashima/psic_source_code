package com.manager.psic.repository;

import com.manager.psic.models.Physician;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhysicianRepository extends JpaRepository<Physician, Long> {
    List<Physician> findByExpertise(String expertise);
}
