package com.example.mavenreactjsspringboot.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "visitor_appointments")
public class VisitorAppointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "please provide a time")
    private String time;

    @NotEmpty(message = "Please provide a reason")
    private String reason;

    @NotEmpty(message = "Please provide a room")
    private String room;

//    @NotEmpty(message = "Please supply a note")
    private String note;

    @JsonBackReference
    @JsonIgnore
    @JoinColumn(name = "physician_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = Physician.class, fetch = FetchType.EAGER)
    private Physician physician;

    @Column(name = "physician_id")
    private Long physicianId;

    @NotEmpty(message = "first name must be provided")
    @Size(min = 3, max = 30, message = "min of 3 and max of 30 characters")
    private String firstName;

    @NotEmpty(message = "last name must be provided")
    @Size(min = 3, max = 30, message = "min of 3 and max of 30 characters")
    private String lastName;

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
