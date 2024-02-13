package br.com.samzubeli.todolist.task;

import at.favre.lib.crypto.bcrypt.BCrypt;
import br.com.samzubeli.todolist.user.IUserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

// autenticar o usuário para permití-lo  criar/atualizar  tarefas tarefas.

@Component
public class Authuser extends OncePerRequestFilter {

  @Autowired
  private IUserRepository userRepository; 

  @Override
  protected void doFilterInternal(
    HttpServletRequest request, // é o que vem do requisitante.
    HttpServletResponse response, // é o que vai para o requisitante.
    FilterChain filterChain // é o que sai deste método: request e response.
  ) throws ServletException, IOException {
    var servletPath = request.getServletPath();

    if (servletPath.startsWith("/tasksUser")) { 
      var authorization = request.getHeader("Authorization");
      if (authorization == null) {
        response.sendError(401);
        return;
      }
      // authorization: Basic ............ -> caracter cifrado.
      var authEncoder = authorization.substring("Basic".length()).trim();     
      byte[] authDecode = Base64.getDecoder().decode(authEncoder);   
      var authString = new String(authDecode);     
      String[] credentials = authString.split(":");    
      String userName = credentials[0];
      String passWord = credentials[1];    
      var user = this.userRepository.findByUserName(userName);    

      if (user == null) {
        response.sendError(401); // usuário não existe.

      } else { // o usuário existe,agora verificar a senha.
        var passWordVerify = BCrypt
          .verifyer()
          .verify(passWord.toCharArray(), user.getPassWord());        
        if (passWordVerify.verified) { // senha autenticada,seguir adiante.
          request.setAttribute("idUser", user.getId()); // request é atualizado: idUser(chave estrangeira) é da tarefa.
          filterChain.doFilter(request, response);
        } else { // senha não autenticada,responder error.
          response.sendError(401);
        }
      }
    } else {
      filterChain.doFilter(request, response); // não é criar/atualizar tarefa,então siga normalmente.
    }
  }
}
