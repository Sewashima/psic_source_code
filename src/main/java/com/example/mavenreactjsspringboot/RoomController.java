package com.example.mavenreactjsspringboot;

import com.example.mavenreactjsspringboot.errorhandling.ResourceNotFoundException;
import com.example.mavenreactjsspringboot.models.Room;
import com.example.mavenreactjsspringboot.repository.PhysicianRoomRepository;
import com.example.mavenreactjsspringboot.repository.RoomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

//@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RoomController {

    public final Logger log = LoggerFactory.getLogger(RoomController.class);
    private RoomRepository roomRepository;
    private PhysicianRoomRepository physicianRoomRepository;

    public RoomController(RoomRepository roomRepository, PhysicianRoomRepository physicianRoomRepository) {
        this.roomRepository = roomRepository;
        this.physicianRoomRepository = physicianRoomRepository;
    }

    @GetMapping
    public ResponseEntity<Iterable<Room>> getAllRooms() {
        log.info("Called rooms now...");
        return ResponseEntity.ok().body(roomRepository.findAll());
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        log.info("This is some test, ok?");
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RoomById", "id", id));
    }

    @PostMapping
    public Room create(@Valid @RequestBody Room roomDto) {
        log.info("physician body" + roomDto);
        return roomRepository.save(roomDto);
    }
}
