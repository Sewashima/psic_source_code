package com.manager.psic.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "please provide a time")
    private Date time;

    @NotEmpty(message = "Please provide a room")
    private String room;

    @NotEmpty(message = "Please supply a note")
    private String note;

    @JsonBackReference
    @JsonIgnore
    @JoinColumn(name = "physician_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = Physician.class, fetch = FetchType.EAGER)
    private Physician physician;

    @Column(name = "physician_id")
    private Long physicianId;

    @NotNull(message = "please supply a patient")
    @Column(name = "patient_id")
    private Long patientId;

    @JsonIgnore
    @JsonBackReference
    @JoinColumn(name = "patient_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = Patient.class, fetch = FetchType.EAGER)
    private Patient patient;

    // @Transient
    @JsonIgnore
    @JsonBackReference
    @OneToOne(targetEntity = TreatmentType.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "treatment_type_id", insertable = false, updatable = false)
    private TreatmentType treatmentType;

    @NotNull(message = "Please provide a treatment type")
    @Column(name = "treatment_type_id")
    private Long treatmentTypeId;

    private String status;  // cancelled, attended, open

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;
}
