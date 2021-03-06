package com.example.mavenreactjsspringboot.repository;

import com.example.mavenreactjsspringboot.models.VisitorAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitorAppointmentRepository extends JpaRepository<VisitorAppointment, Long> {

    List<VisitorAppointment> findByPhysicianId(Long physicianId);

}
