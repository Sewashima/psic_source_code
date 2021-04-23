package com.manager.psic.repository;

import com.manager.psic.models.Appointment;
import com.manager.psic.models.VisitorAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitorAppointmentRepository extends JpaRepository<VisitorAppointment, Long> {

    List<VisitorAppointment> findByPhysicianId(Long physicianId);

}
