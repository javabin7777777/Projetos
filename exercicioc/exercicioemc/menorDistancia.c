#include <stdio.h>
#include <stdlib.h>
#include <time.h>

const int tamArray = 10;
int array1[10];
int array2[10];

void geradorArray(int tamanho, int limitador, int arr[]) /*gera o array*/
{
    srand(time(NULL));
    for (int i = 0; i < tamanho; i++)
    {
        arr[i] = tamanho + rand() % limitador;
    }
}

void mostrarArray()  /* mostra os arrays gerados*/
{ 
    printf("Array1 -> [ ");
    for (int i = 0; i < tamArray; i++)
    {
        printf("%d ", array1[i]);
    }
    printf("]");
    printf("\n\nArray2 -> [ ");
    for (int i = 0; i < tamArray; i++)
    {
        printf("%d ", array2[i]);
    }
    printf(" ]");
}

int maiorMenor(int seletor)   /* determinar os indices maior elemento do array1 e do menor elemento do array2 */
{
    if (seletor)
    {
        int maior = 0;
        for (int i = 1; i < 10; i++) 
        {
            if (!(array1[maior] > array1[i])) /* indice do maior elemento do array1 */
            {
                maior = i;
            }
        }
        return maior;
    }
    else
    {
        int menor = 0;
        for (int i = 0; i < 10; i++)
        {
            if (!(array2[menor] < array2[i])) /* indice do menor elemento do array2 */
            {
                menor = i;
            }
        }
        return menor;
    }
}

int main()
{
    geradorArray(tamArray, 150, array1);
    geradorArray(tamArray, 70, array2);
    mostrarArray();

    printf("\n\nMaior numero do array1: %d", array1[maiorMenor(1)]);
    printf("\nMenor numero do array2 : %d", array2[maiorMenor(0)]);
    printf("\nDistancia: %d", abs(array2[maiorMenor(0)]-array1[maiorMenor(1)]));
    printf("\n");
    puts("ok,terminou.");
}
