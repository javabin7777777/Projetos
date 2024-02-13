package br.com.samzubeli.todolist.user;

import at.favre.lib.crypto.bcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class Usercontroller {

  @Autowired
  private IUserRepository userRepository;

  // Cadastrar usuário.
  @PostMapping("users") 
  public ResponseEntity create(@RequestBody Usermodel user) {
    var userName = this.userRepository.findByUserName(user.getUserName());

    if (userName == null) {
      var passWordCrypt = BCrypt
        .withDefaults()
        .hashToString(12, user.getPassWord().toCharArray()); //criptografia da senha
      user.setPassWord(passWordCrypt);
      var userCreated = this.userRepository.save(user);
      return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
    }
    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body("Usuário " + user.getUserName().toUpperCase() +" já existe");
  }
}
