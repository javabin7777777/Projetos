package br.com.samzubeli.todolist.task;

import br.com.samzubeli.todolist.task.utilities.Utils;
import br.com.samzubeli.todolist.user.IUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TaskController {

  @Autowired
  private ITaskRepository taskRepository; // referência da interface ITaskRepository.

  @Autowired
  private IUserRepository userRepository;

  // cadastrar a tarefa.
  @PostMapping("tasksUser")
  public ResponseEntity createTask(
    @RequestBody Taskmodel task,
    HttpServletRequest request
  ) { // cria a tarefa.
    // seta na tarefa que está sendo criada,o id do usuário que está cadastrando a tarefa.
    task.setIdUser((UUID) request.getAttribute("idUser")); // request é o que veio de Authuser.java

    // validar a data inicial e final da tarefa.
    // validar se a data inicial é maior que a data final.
    if (
      ((LocalDateTime.now()).isAfter(task.getStartAt())) |
      ((LocalDateTime.now()).isAfter(task.getEndAt()))
    ) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body("data inicial e final devem ser maior que a data atual");
    } else {
      if (task.getStartAt().isAfter(task.getEndAt())) {
        return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body("data inicial deve ser menor que data final");
      } else {
        Taskmodel Task = this.taskRepository.save(task); // salva a tarefa criada.
        return ResponseEntity.status(HttpStatus.OK).body(Task);
      }
    }
  }

  // listar as tarefas de um usuário.
  @GetMapping("tasksUser")
  public List<Taskmodel> listTaskUser(HttpServletRequest request) {
    var listTaskUser =
      this.taskRepository.findByIdUser((UUID) request.getAttribute("idUser"));
    return listTaskUser;
  }

  // Atualizar a tarefa de um usuário.
  // http://localhost:8080/tasksUser/<aqui é o id da tarefa>(tipo UUID) que deverá ser fornecido.
  @PutMapping("tasksUser/{id}")
  public ResponseEntity updateTaskUser(
    @RequestBody Taskmodel task,
    HttpServletRequest request,
    @PathVariable UUID id // id é da tarefa que vai ser alterada.
  ) {
    
    // procura pela tarefa de acordo com o id fornecido.
    var taskFound = taskRepository.findByid(id);
  
    // procura pelo usuário autenticado usando o id do mesmo.
    var user = userRepository.findByid((UUID) request.getAttribute("idUser"));

    if (taskFound != null) {
      // garante que somente o usuário dono da tarefa,possa atualizá-la.
      // idUser é setado em Authuser.java.
      if (request.getAttribute("idUser").equals(taskFound.getIdUser())) {
        //Mescla task(proriedades atualizadas) com taskFound(propriedades encontradas e a serem atualizadas).
        Utils.copyNonNullProperties(task, taskFound);
        return ResponseEntity
          .status(HttpStatus.OK)
          .body(this.taskRepository.save(taskFound)); // Atualiza a tarefa.
      } else {
        return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(
            "Usuário " +
            user.getUserName().toUpperCase() +
            " sem autorização para atualizar esta tarefa."
          );
      }
    }
    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(
        "A tarefa a ser atualizada pelo usuário " +
        user.getUserName().toUpperCase() +
        " não existe."
      );
  }
}
