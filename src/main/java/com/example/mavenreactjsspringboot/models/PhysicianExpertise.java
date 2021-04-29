package com.example.mavenreactjsspringboot.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "physician_expertise")
public class PhysicianExpertise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Please provide a physician")
    @Column(name = "physician_id")
    private Long physicianId;

    @NotNull(message = "Please provide an expertise")
    @Column(name = "expertise_id")
    private Long expertiseId;

    @JsonIgnore
    @JsonBackReference
    @OneToOne(targetEntity = Expertise.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "expertise_id", insertable = false, updatable = false)
    private Expertise expertise;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;
}
