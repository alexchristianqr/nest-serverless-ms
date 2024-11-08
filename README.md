# Serverless NestJS

Plantilla con arquitectura hexagonal para desplegar una aplicación NestJS en AWS Lambda con Serverless Framework. (
NestJS v10 + Serverless v3 + AWS)

## Instalación

```bash
npm install # Instalar dependencias 
```

## Configurar archivo .env

```bash
cp .env.example .env # Copiar archivo de configuración
```

## Ejecutar aplicación

### Modo local

```bash
npm run start:dev # Iniciar aplicación NestJS
npm run sls:local # Iniciar aplicación Serverless en modo local
npm run sls:debug # Iniciar aplicación Serverless en modo local con debug
npm run sls:remove # Eliminar aplicación Serverless en modo local
```

### Configurar AWS

```bash
# aws_cli_profile = "perfil_01"
# aws_iam_user = "usuario_01"

# Necesario para configurar credenciales de AWS
aws configure --profile <aws_cli_profile> # Configurar credenciales de AWS por perfil
aws configure # Configurar credenciales de AWS por defecto

# Otras configuraciones opcionales de AWS
aws configure set region us-east-1 --profile <aws_cli_profile> # Configurar región de AWS
aws configure get region --profile <aws_cli_profile> # Obtener región de AWS
aws configure list --profile <aws_cli_profile> # Listar configuración de AWS
aws configure set aws_session_token "token" --profile <aws_cli_profile> # Eliminar token de sesión de AWS
aws iam list-attached-user-policies --user-name <aws_iam_user> --profile <aws_cli_profile> # Listar políticas de usuario
aws iam list-groups-for-user --user-name <aws_iam_user> --profile <aws_cli_profile> # Listar grupos de usuario.
aws iam list-attached-group-policies --group-name <nombre_del_grupo> --profile <aws_cli_profile> # Listar políticas de grupo.
aws sts get-caller-identity --profile <aws_cli_profile> # Obtener identidad de llamante. Ejemplo: arn:aws:iam::123456789012:user/usuario_01
```

### Desplegar en AWS en modo desarrollo

```bash
npm run sls:deploy # Desplegar aplicación en AWS
npm run sls:remove # Eliminar aplicación en AWS
```

### Desplegar en AWS en modo producción

```bash
npm run sls:build # Desplegar aplicación en AWS
npm run sls:remove # Eliminar aplicación en AWS
```

## Arquitectura Modular NestJS

```bash
my-app/ 
├── src/ 
├──── common/ # Carpeta común
├──── modules/ # Carpeta de módulos
├────── samples/ # Carpeta de muestra
├──────── samples.module.ts # Archivo de módulo de muestra
├──────── middlewares/ # Carpeta de middlewares
├──────── guards/ # Carpeta de guards
├──────── controllers/ # Carpeta de controladores
├────────── samples.controller.ts # Archivo de controlador de muestra
├──────── dtos/ # Carpeta DTOs (Data Transfer Objects)
├────────── sample.dto.ts # Archivo DTO de creación de muestra
├──────── serverless/ # Carpeta de configuración de serverless
├────────── events.yaml # Archivo de eventos de serverless
├────────── lambda.ts # Archivo de lambda handler
├──────── services/ # Carpeta de casos de uso
├────────── sample.service.ts # Archivo de caso de uso de muestra
├──────── entities/ # Carpeta de entidades
├────────── sample.entity.ts # Archivo de entidad de muestra
├──────── ports/ # Carpeta de puertos
├────────── input/ # Carpetas de entrada de puertos
├──────────── sample-input.usecase.ts # Archivo de entrada de caso de uso de muestra
├────────── output/ # Carpeta de salida de puertos
├──────────── sample-interface.repository.ts # Archivo de salida de repositorio de muestra
├──────── database/ # Carpeta de base de datos
├────────── repositories/ # Carpeta de repositorios
├──────────── sample.repository.ts # Archivo de repositorio de muestra
```

### Diagrama

[![Texto alternativo](assets/single-hexagonal-aws.png)]()

## Fuente

https://serverlessland.com/content/service/lambda/guides/effectively-running-java-on-serverless/hexagonal