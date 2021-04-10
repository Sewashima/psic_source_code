package com.manager.psic.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private int age;
    private String phoneNumber;
    private String address;
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "updated_at")

    @JsonIgnore
//    @JsonBackReference
    @OneToMany(targetEntity = Appointment.class, cascade = CascadeType.ALL)
//    @JoinColumn(name = "patient_id")
    private List<Appointment> appointments;

    private Date updatedAt;
}
