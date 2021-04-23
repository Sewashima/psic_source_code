package com.manager.psic.repository;

import com.manager.psic.models.Physician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhysicianRepository extends JpaRepository<Physician, Long> {
    List<Physician> findByExpertise(String expertise);

    @Query("SELECT p FROM Physician p where upper(p.firstName) LIKE CONCAT('%',?1,'%') or upper(p.lastName) like CONCAT('%',?1,'%')")
    List<Physician> findByNameIgnoreCase(String name);
}
