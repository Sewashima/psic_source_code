package com.manager.psic.repository;

import com.manager.psic.models.ConsultationTime;
import com.manager.psic.models.Physician;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultationTimeRepository extends JpaRepository<ConsultationTime, Long> {
    List<ConsultationTime> findByPhysicianId(Long physicianId);
}
