package br.com.samzubeli.todolist.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity(name = "tab_users") // a classe Usermodel será a tabela tab_users,no banco em memória(h2-base).
public class Usermodel {

  @Id
  @GeneratedValue(generator = "UUID")
  private UUID id; // chave primaria do tipo UUID

  @Column(name = "nome")
  private String name;

  @Column(name = "usuario")
  private String userName;

  @Column(name = "senha")
  private String passWord;

  @CreationTimestamp
  private LocalDateTime createAt; // data e hora em que os dados foram criados no banco.
}
