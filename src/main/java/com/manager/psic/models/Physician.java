package com.manager.psic.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "physicians")
public class Physician {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @NotEmpty(message = "title must not be empty")
    private String title;

    @NotEmpty(message = "first name must be provided")
    @Size(min = 3, max = 30, message = "min of 3 and max of 30 characters")
    private String firstName;

    @NotEmpty(message = "last name must be provided")
    @Size(min = 3, max = 30, message = "min of 3 and max of 30 characters")
    private String lastName;

    @NotEmpty(message = "Please provide an address")
    private String address;

    @NotEmpty(message = "Please provide phone number")
    private String phoneNumber;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    @JsonIgnore
//    @OneToMany(mappedBy = "physician", fetch = FetchType.LAZY)
    @OneToMany(targetEntity = Appointment.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "physician_id")
    private List<Appointment> appointments;

    @NotEmpty(message = "Please provide a consultation time")
    @Column(length = 5)
    private String consultationTime;

//    @Enumerated(EnumType.STRING)
    @Column(name = "expertise")
    @NotNull(message = "Expertise must not be null and of the type Physio, Osteo, or Rehab")
//    private Expertise expertise;
    private String expertise;
}
