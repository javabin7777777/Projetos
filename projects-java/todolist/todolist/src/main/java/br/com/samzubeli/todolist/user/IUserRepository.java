package br.com.samzubeli.todolist.user;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<Usermodel, UUID> {
  Usermodel findByUserName(String username); // método para encontrar o username.
  Usermodel findByid(UUID id);// método para encontrar o usuário pelo id do mesmo.
}
