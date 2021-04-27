package com.example.mavenreactjsspringboot.repository;

import com.example.mavenreactjsspringboot.models.Room;
import org.springframework.data.repository.CrudRepository;

public interface RoomRepository extends CrudRepository<Room, Long> {
}
