package com.manager.psic.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "physician_rooms")
public class PhysicianRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "physician ID must not be empty")
    @Column(name = "physician_id")
    private Long physicianId;

    @NotEmpty(message = "room ID must be provided")
    @Column(name = "room_id")
    private Long roomId;

    @JsonIgnore
    @JsonManagedReference
    @OneToOne(targetEntity = Room.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", insertable = false, updatable = false)
    private Room room;

    /*@JsonIgnore
    @JsonManagedReference
    @OneToOne(targetEntity = Physician.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "physician_id", insertable = false, updatable = false)
    private Physician physician;*/

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    /*@JsonIgnore
    @OneToMany(targetEntity = Room.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "physician_id")
    private List<Physician> rooms;

    @JsonIgnore
    @JsonBackReference
    @OneToOne(targetEntity = TreatmentType.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "treatment_type_id", insertable = false, updatable = false)
    private Room room;*/

}
