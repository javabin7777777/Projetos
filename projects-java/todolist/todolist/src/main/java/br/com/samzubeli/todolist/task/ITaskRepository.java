package br.com.samzubeli.todolist.task;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITaskRepository extends JpaRepository<Taskmodel, UUID> {
  List<Taskmodel> findByIdUser(UUID idUser); // devolve uma lista com todas tarefas criadas por um usuário.
  Taskmodel findByid(UUID id);// devolve a tarefa conforme id do usuário,fornecido.
}
