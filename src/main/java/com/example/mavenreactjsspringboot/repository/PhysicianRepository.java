package com.example.mavenreactjsspringboot.repository;

import com.example.mavenreactjsspringboot.models.Physician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhysicianRepository extends JpaRepository<Physician, Long> {
    /*@Query(value= "SELECT p.* FROM Physicians p left join physician_expertise e on p.id = e.physician_id " +
            "left join expertise d on d.id = e.expertise_id = d.id WHERE e.expertise_id = :expertiseId",
            nativeQuery=true)*/
    @Query(value= "SELECT p.*, e.* FROM Physicians p left join physician_expertise pe on p.id = pe.physician_id " +
            "left join expertise e on d.id = pe.expertise_id WHERE pe.expertise_id = :expertiseId",
            nativeQuery=true)
    List<Physician> findByExpertiseId(Long expertiseId);

    @Query("SELECT p FROM Physician p where upper(p.firstName) LIKE CONCAT('%',?1,'%') or upper(p.lastName) like CONCAT('%',?1,'%')")
    List<Physician> findByNameIgnoreCase(String name);
}
