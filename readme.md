# 2FA



## Autores:

| Número | Nome |
|--------|------|
|  20190908 | João Alves |
|  20190800 | Rafael Santos |

## Enquadramento
Neste projeto vamos abordar uma temática de Sistemas Distribuídos focada num projeto de 2FA (Two-Factor Authentication). Este desafio foi proposto na cadeira de Sistemas Distribuidos de forma a implementar não só uma aplicação, mas também toda a sua arquitetura de forma a relacionar-se com o conteúdo lecionado na cadeira.
A arquitetura tem de apresentar uma tolerância a falhas, isto é que será necessário existir alguma forma de proteger o sistema de apresentar falhas por exemplo caso um servidor falhe exista sempre forma de não ter a aplicação em “baixo”.
Vamos abordar várias abordagens e técnicas caso o projeto tivesse sido feito localmente falando da configuração Master-Master ou Ativo/Ativo em Bases de Dados, Azure (Cloud).

## Descrição dos ficheiros

### SD3000
**Descrição:** \
Site que recebe o secret do utilizador e devolve o respetivo token para conseguir acessar ao site (SD3001).
Este código é corrido nas máquinas VM02 E VM03, a arquitetura pode ser vista no ficheiro PDF presente neste repositório.

### SD3001
**Descrição:** \
Site client que disponibiliza o Login e o registo de um utilizador onde este poderá ativar o 2FA a partir da página do seu perfil.
Este código corre na na máquina VM01, sendo que é a unica que tem o ip público.


## Para aceder ao PDF com todas as informações:
[a relative link](Relatorio_SD_20190800_20190908.pdf)
