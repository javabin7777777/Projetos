package br.com.samzubeli.todolist.task;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

// classe que será a tabela tb_tasks no banco.

@Data
@Entity(name = "tb_tasks")
public class Taskmodel {

  /*
   * o que uma tarefa deve conter:
   * ID
   * usuário(seu nome)
   * descrição
   * título
   * data inicial
   * data final
   * prioridade
   * iduser
   */
  @Id
  @GeneratedValue(generator = "UUID")
  private UUID id; // id da tarefa(chave primária).

  private String name;
  private String description;

  @Column(length = 53) // limita o tamanho deste campo.
  private String title;

  private LocalDateTime startAt;
  private LocalDateTime endAt;

  @Column(length = 53)
  private String prior;

  @CreationTimestamp
  private LocalDateTime createAt; // data e hora em que a tarefa for criada.formato yyyy-mm-ddThh:mm:ss

  private UUID idUser; // id do usuário(chave estrangeira).

  // customização do método setTitle (lombok).
  public void setTitle(String title) throws Exception {
    if (title.length() > 50) {
      throw new Exception("Título deve ter até 50 caracteres"); // execeção tratada no pacote errors.
    }
    this.title = title;
  }
}
