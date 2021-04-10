package com.manager.psic.repository;

import com.manager.psic.models.PhysicianRoom;
import com.manager.psic.models.Room;
import org.springframework.data.repository.CrudRepository;

public interface PhysicianRoomRepository extends CrudRepository<PhysicianRoom, Long> {
}
