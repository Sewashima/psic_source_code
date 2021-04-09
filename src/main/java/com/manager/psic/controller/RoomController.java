package com.manager.psic.controller;

import com.manager.psic.models.Room;
import com.manager.psic.repository.RoomRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
