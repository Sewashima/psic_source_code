package com.example.mavenreactjsspringboot.repository;

import com.example.mavenreactjsspringboot.models.Physician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhysicianRepository extends JpaRepository<Physician, Long> {
    List<Physician> findByExpertiseId(Long expertiseId);

    @Query("SELECT p FROM Physician p where upper(p.firstName) LIKE CONCAT('%',?1,'%') or upper(p.lastName) like CONCAT('%',?1,'%')")
    List<Physician> findByNameIgnoreCase(String name);
}
