#include <stdio.h>
#include <string.h>

int *descriptografar(int A[])
{
    int aux = 0;

    if (A[6] == 1)
        A[6] = 0;
    else
        A[6] = 1;

    if (A[7] == 1)
        A[7] = 0;
    else
        A[7] = 1;

    for (int i = 0; i < 4; i++)
    {
        aux = A[i];
        A[i] = A[i + 4];
        A[i + 4] = aux;
    }
    return A;
}

int conversorBinDec(int E[])
{
    int x = 0;
    int y = 1;
    for (int i = 0; i < 8; i++)
    {
        x = x + E[i] * (128 / y);
        y *= 2;        
    }
    return x;
}

int *obterByte(int a, int D[], char C[])
{
    int k = 0;
    for (int i = a; i < (a + 8); i++)
    {
        D[k] = C[i] - '0';
        k++;      
    }
    return D;
}

int main()
{
    int B[8];
    char *mensagem = "10010110111101110101011000000001000101110010011001010111000000010001011101110110010101110011011011110111110101110101011100000011";
    int tamString = strlen(mensagem);
    printf("\nmensagem: ");
    for (int i = 0; i < tamString; i += 8)
    {
        printf("%c", conversorBinDec(descriptografar(obterByte(i, B, mensagem))));
    }
    printf("\n\n");   
    puts("ok,terminou.");    
}
