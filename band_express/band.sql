-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Band
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Band
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Band` DEFAULT CHARACTER SET utf8 ;
USE `Band` ;

-- -----------------------------------------------------
-- Table `Band`.`tipos_perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`tipos_perfil` (
  `id_tipos_perfil` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_tipos_perfil`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `senha` VARCHAR(256) NOT NULL,
  `data_cadastro` DATETIME NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  `avatar` VARCHAR(256) NULL,
  `wallpaper` VARCHAR(256) NULL,
  `link_perfil` VARCHAR(100) NULL,
  `perfil_id_perfil` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC) VISIBLE,
  INDEX `fk_usuarios_perfil1_idx` (`perfil_id_perfil` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_perfil1`
    FOREIGN KEY (`perfil_id_perfil`)
    REFERENCES `Band`.`tipos_perfil` (`id_tipos_perfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`musico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`musico` (
  `id_musico` INT NOT NULL AUTO_INCREMENT,
  `sexo` CHAR(1) NOT NULL,
  `sobre` VARCHAR(2200) NULL,
  `estado` VARCHAR(2) NOT NULL,
  `cidade` VARCHAR(50) NOT NULL,
  `site` VARCHAR(100) NULL,
  `canal` VARCHAR(100) NULL,
  `canto` TINYINT(1) NULL DEFAULT 0,
  `toco` TINYINT(1) NULL DEFAULT 0,
  `tecnico` TINYINT(1) NULL DEFAULT 0,
  `id_usuario` INT NOT NULL,
  INDEX `fk_musico_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  PRIMARY KEY (`id_musico`),
  CONSTRAINT `fk_musico_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`estabelecimento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`estabelecimento` (
  `id_estab` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(45) NOT NULL,
  `sobre` VARCHAR(2200) NULL,
  `estado` VARCHAR(2) NOT NULL,
  `cidade` VARCHAR(50) NOT NULL,
  `site` VARCHAR(200) NULL,
  `email` VARCHAR(200) NULL,
  `telefone` INT NULL,
  `funcionamento` TINYINT(1) NULL DEFAULT 0,
  `id_usuario` INT NOT NULL,
  INDEX `fk_estabelecimento_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  PRIMARY KEY (`id_estab`),
  CONSTRAINT `fk_estabelecimento_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`banda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`banda` (
  `id_banda` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `genero` VARCHAR(100) NULL,
  `sobre` VARCHAR(2200) NULL,
  `estado` VARCHAR(2) NOT NULL,
  `cidade` VARCHAR(50) NOT NULL,
  `site` VARCHAR(200) NULL,
  `canal` VARCHAR(200) NULL,
  `email` VARCHAR(200) NULL,
  INDEX `fk_usuario_banda_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  PRIMARY KEY (`id_banda`),
  CONSTRAINT `fk_usuario_banda_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`integrantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`integrantes` (
  `id_integrantes` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_integrantes`),
  INDEX `fk_integrantes_usuarios1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_integrantes_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`post` (
  `id_posts` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `texto` VARCHAR(2220) NOT NULL,
  `imagem` VARCHAR(256) NULL,
  `video` VARCHAR(256) NULL,
  `curtir` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id_posts`),
  INDEX `fk_publicacao_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_publicacao_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`comentario` (
  `idcomentarios` INT NOT NULL AUTO_INCREMENT,
  `id_publicacao` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`idcomentarios`),
  INDEX `fk_comentarios_publicacao1_idx` (`id_publicacao` ASC) VISIBLE,
  INDEX `fk_comentarios_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_comentarios_publicacao1`
    FOREIGN KEY (`id_publicacao`)
    REFERENCES `Band`.`post` (`id_posts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentarios_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`vagas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`vagas` (
  `idvagas` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(50) NOT NULL,
  `descricao` VARCHAR(200) NOT NULL,
  `local` VARCHAR(50) NOT NULL,
  `tipo_vaga` VARCHAR(15) NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`idvagas`),
  INDEX `fk_vagas_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_vagas_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`minha_rede`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`minha_rede` (
  `idminha_rede` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_usuario_seguido` INT NOT NULL,
  PRIMARY KEY (`idminha_rede`),
  INDEX `fk_minha_rede_seguindo_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_minha_rede_usuario1_idx` (`id_usuario_seguido` ASC) VISIBLE,
  CONSTRAINT `fk_minha_rede_seguindo_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_minha_rede_usuario1`
    FOREIGN KEY (`id_usuario_seguido`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`fale_conosco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`fale_conosco` (
  `id_fale_conosco` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `assunto` VARCHAR(50) NOT NULL,
  `mensagem` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id_fale_conosco`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`bate_papo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`bate_papo` (
  `id_bate_papo` INT NOT NULL AUTO_INCREMENT,
  `mensagem` VARCHAR(500) NULL,
  `imagem` VARCHAR(250) NULL,
  `hora_data` DATETIME NOT NULL,
  `id_usuario_destinatario` INT NOT NULL,
  `id_usuario_remetente` INT NOT NULL,
  PRIMARY KEY (`id_bate_papo`),
  INDEX `fk_bate_papo_usuario1_idx` (`id_usuario_remetente` ASC) VISIBLE,
  INDEX `fk_bate_papo_usuario2_idx` (`id_usuario_destinatario` ASC) VISIBLE,
  CONSTRAINT `fk_bate_papo_usuario1`
    FOREIGN KEY (`id_usuario_remetente`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bate_papo_usuario2`
    FOREIGN KEY (`id_usuario_destinatario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`instrumento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`instrumento` (
  `id_instrumento` INT NOT NULL AUTO_INCREMENT,
  `instrumento` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_instrumento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`tecnico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`tecnico` (
  `id_tecnico` INT NOT NULL AUTO_INCREMENT,
  `habilidade_tecnica` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_tecnico`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`funcionamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`funcionamento` (
  `id_funcionamento` INT NOT NULL AUTO_INCREMENT,
  `dia` VARCHAR(45) NOT NULL,
  `horario_abertura` VARCHAR(45) NOT NULL,
  `horario_fechamento` VARCHAR(45) NOT NULL,
  `id_estab` INT NOT NULL,
  PRIMARY KEY (`id_funcionamento`),
  INDEX `fk_funcionamento_estabelecimento1_idx` (`id_estab` ASC) VISIBLE,
  CONSTRAINT `fk_funcionamento_estabelecimento1`
    FOREIGN KEY (`id_estab`)
    REFERENCES `Band`.`estabelecimento` (`id_estab`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`banda_integrantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`banda_integrantes` (
  `id_banda` INT NOT NULL,
  `id_integrantes` INT NOT NULL,
  `funcao` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_banda`, `id_integrantes`),
  INDEX `fk_banda_has_integrantes_integrantes1_idx` (`id_integrantes` ASC) VISIBLE,
  INDEX `fk_banda_has_integrantes_banda1_idx` (`id_banda` ASC) VISIBLE,
  CONSTRAINT `fk_banda_has_integrantes_banda1`
    FOREIGN KEY (`id_banda`)
    REFERENCES `Band`.`banda` (`id_banda`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_banda_has_integrantes_integrantes1`
    FOREIGN KEY (`id_integrantes`)
    REFERENCES `Band`.`integrantes` (`id_integrantes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`curtida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`curtida` (
  `id_curtidas` INT NOT NULL AUTO_INCREMENT,
  `id_posts` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_curtidas`),
  INDEX `fk_curtidas_posts1_idx` (`id_posts` ASC) VISIBLE,
  INDEX `fk_curtidas_usuarios1_idx` (`id_usuario` ASC) INVISIBLE,
  UNIQUE INDEX `curtida_unica` (`id_posts` ASC, `id_usuario` ASC) INVISIBLE,
  CONSTRAINT `fk_curtidas_posts1`
    FOREIGN KEY (`id_posts`)
    REFERENCES `Band`.`post` (`id_posts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_curtidas_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`audio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`audio` (
  `id_audio` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(256) NOT NULL,
  `titulo` VARCHAR(256) NOT NULL,
  `caminho` VARCHAR(256) NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_audio`),
  INDEX `fk_audio_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_audio_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`video` (
  `id_video` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(256) NOT NULL,
  `titulo` VARCHAR(256) NOT NULL,
  `caminho` VARCHAR(256) NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_video`),
  INDEX `fk_audio_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_audio_usuario10`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`anuncie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`anuncie` (
  `id_anuncie` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(50) NOT NULL,
  `descricao` VARCHAR(200) NOT NULL,
  `local` VARCHAR(50) NOT NULL,
  `valor` FLOAT NOT NULL,
  `img_anuncio` VARCHAR(256) NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id_anuncie`),
  INDEX `fk_vagas_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_vagas_usuario10`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `Band`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`musico_instrumentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`musico_instrumentos` (
  `id_musico` INT NOT NULL,
  `id_instrumento` INT NOT NULL,
  PRIMARY KEY (`id_musico`, `id_instrumento`),
  INDEX `fk_musico_has_instrumento_instrumento1_idx` (`id_instrumento` ASC) VISIBLE,
  INDEX `fk_musico_has_instrumento_musico1_idx` (`id_musico` ASC) VISIBLE,
  CONSTRAINT `fk_musico_has_instrumento_musico1`
    FOREIGN KEY (`id_musico`)
    REFERENCES `Band`.`musico` (`id_musico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_musico_has_instrumento_instrumento1`
    FOREIGN KEY (`id_instrumento`)
    REFERENCES `Band`.`instrumento` (`id_instrumento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Band`.`musico_tecnicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Band`.`musico_tecnicos` (
  `id_musico` INT NOT NULL,
  `id_tecnico` INT NOT NULL,
  PRIMARY KEY (`id_musico`, `id_tecnico`),
  INDEX `fk_musico_has_tecnico_tecnico1_idx` (`id_tecnico` ASC) VISIBLE,
  INDEX `fk_musico_has_tecnico_musico1_idx` (`id_musico` ASC) VISIBLE,
  CONSTRAINT `fk_musico_has_tecnico_musico1`
    FOREIGN KEY (`id_musico`)
    REFERENCES `Band`.`musico` (`id_musico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_musico_has_tecnico_tecnico1`
    FOREIGN KEY (`id_tecnico`)
    REFERENCES `Band`.`tecnico` (`id_tecnico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
