package com.example.mavenreactjsspringboot.controller;

import com.example.mavenreactjsspringboot.models.Room;
import com.example.mavenreactjsspringboot.repository.RoomRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/rooms")
public class RoomController {

    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public ResponseEntity<Iterable<Room>> getAllRooms() {
        return ResponseEntity.ok().body(roomRepository.findAll());
    }
}
