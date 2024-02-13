package br.com.samzubeli.todolist.task.utilities;

import java.beans.PropertyDescriptor;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class Utils {

  // método de uso geral. // source é o objeto,de onde devemos selecionar as propriedades do objeto.
  public static String[] getNullPropertiesNames(Object source) {
    final BeanWrapper src = new BeanWrapperImpl(source);
    PropertyDescriptor[] propers = src.getPropertyDescriptors();
    Set<String> emptyNames = new HashSet<>();

    for (PropertyDescriptor proper : propers) {
      if (src.getPropertyValue(proper.getName()) == null) {
        emptyNames.add(proper.getName());
      }
    }

    String[] result = new String[emptyNames.size()]; // array de string que conterá as propriedades do objeto com valores nulos.

    return emptyNames.toArray(result); // devolve as propriedades com valores nulos.
  }

  // método que faz cópia de um objeto para outro,descartando as proriedades com valores nulas.
  public static void copyNonNullProperties(Object source, Object target) {
    BeanUtils.copyProperties(source, target, getNullPropertiesNames(source));
  }
}
