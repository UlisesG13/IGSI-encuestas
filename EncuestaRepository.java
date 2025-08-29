package com.igsi.encuestas.repositories;

import com.igsi.encuestas.models.EncuestaModel;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public class EncuestaRepository {
    private final JdbcTemplate template;

    public EncuestaRepository(JdbcTemplate template) {
        this.template = template;
    }

    private final RowMapper<EncuestaModel> encuestaRowMapper = (rs, rowNum) -> {
        LocalDate fechaInicio = rs.getDate("fecha_inicio") != null ? rs.getDate("fecha_inicio").toLocalDate() : null;
        LocalDate fechaFin = rs.getDate("fecha_fin") != null ? rs.getDate("fecha_fin").toLocalDate() : null;

        return new EncuestaModel(
                rs.getObject("id_encuesta", Long.class),
                rs.getString("titulo"),
                rs.getString("descripcion"),
                rs.getObject("id_departamento", Long.class),
                fechaInicio,
                fechaFin,
                rs.getString("estado"),
                rs.getBoolean("deleted"));
    };

    // Listar todas las encuestas (solo las no eliminadas)
    public List<EncuestaModel> getAll() {
        return template.query(
                "SELECT * FROM Encuestas WHERE deleted = FALSE ORDER BY id_encuesta DESC",
                encuestaRowMapper);
    }

    // Listar todas las encuestas eliminadas
    public List<EncuestaModel> getAllDeleted() {
        return template.query(
                "SELECT * FROM Encuestas WHERE deleted = TRUE ORDER BY id_encuesta DESC",
                encuestaRowMapper);
    }

    // Listar todas las encuestas habilitadas y no borradas (para que el alumno las
    // responda)
    public List<EncuestaModel> getAllHabilitadas() {
        return template.query(
                "SELECT * FROM Encuestas WHERE deleted = FALSE AND estado = 'habilitada' ORDER BY id_encuesta DESC",
                encuestaRowMapper);
    }

    // Buscar por ID
    public Optional<EncuestaModel> getById(Long id) {
        return template.query(
                "SELECT * FROM Encuestas WHERE id_encuesta = ? AND deleted = FALSE ORDER BY id_encuesta DESC",
                encuestaRowMapper,
                id).stream().findFirst();
    }

    // Buscar por Departamento
    public List<EncuestaModel> getByDepartamento(Long id) {
        return template.query(
                "SELECT * FROM Encuestas WHERE id_departamento = ? AND deleted = FALSE ORDER BY id_encuesta DESC",
                encuestaRowMapper,
                id).stream().toList();
    }

    // Crear una encuesta
    public Long save(EncuestaModel encuesta) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO Encuestas(titulo, descripcion, id_departamento, fecha_inicio, fecha_fin, estado, deleted) "
                            +
                            "VALUES (?,?,?,?,?,?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, encuesta.getTitulo());
            ps.setString(2, encuesta.getDescripcion());
            ps.setLong(3, encuesta.getIdDepartamento());
            ps.setDate(4, java.sql.Date.valueOf(encuesta.getFechaInicio()));
            ps.setDate(5, java.sql.Date.valueOf(encuesta.getFechaFin()));
            ps.setString(6, encuesta.getEstado());
            ps.setBoolean(7, encuesta.getDeleted() != null ? encuesta.getDeleted() : false);
            return ps;
        }, keyHolder);

        return keyHolder.getKey().longValue();
    }

    // Actualizar una encuesta
    public int update(Long id, EncuestaModel encuesta) {
        java.sql.Date fechaInicioSql = encuesta.getFechaInicio() != null
                ? java.sql.Date.valueOf(encuesta.getFechaInicio())
                : null;

        java.sql.Date fechaFinSql = encuesta.getFechaFin() != null
                ? java.sql.Date.valueOf(encuesta.getFechaFin())
                : null;

        return template.update(
                "UPDATE Encuestas " +
                        "SET titulo = ?, descripcion = ?, id_departamento = ?, fecha_inicio = ?, fecha_fin = ?, estado = ?, deleted = ? "
                        +
                        "WHERE id_encuesta = ?",
                encuesta.getTitulo(),
                encuesta.getDescripcion(),
                encuesta.getIdDepartamento(),
                fechaInicioSql,
                fechaFinSql,
                encuesta.getEstado(),
                encuesta.getDeleted() != null ? encuesta.getDeleted() : false,
                id);

    }

    // Eliminar una encuesta de forma permanente
    public int delete(Long id) {
        return template.update(
                "DELETE FROM Encuestas WHERE id_encuesta = ?",
                id);
    }

    // Eliminar una encuesta logicamente
    public int softDelete(Long id) {
        return template.update(
                "UPDATE Encuestas SET deleted = TRUE WHERE id_encuesta = ?",
                id);
    }

    // Restaurar una encuesta eliminada logicamente
    public int restaurar(Long id) {
        return template.update(
                "UPDATE Encuestas SET deleted = FALSE WHERE id_encuesta = ?",
                id);
    }
}
