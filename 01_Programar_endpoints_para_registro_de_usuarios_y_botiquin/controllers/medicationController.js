const pool = require('../config/db');

// CREATE: Añadir medicamento
const addMedication = async (req, res) => {
    const { nombre, dosis, cantidad, fecha_caducidad } = req.body;
    const usuarioId = req.usuario.id; 

    try {
        const [result] = await pool.query(
            'INSERT INTO medicamentos (usuario_id, nombre, dosis, cantidad, fecha_caducidad) VALUES (?, ?, ?, ?, ?)',
            [usuarioId, nombre, dosis, cantidad, fecha_caducidad]
        );
        res.status(201).json({ 
            mensaje: 'Medicamento registrado', 
            id: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al registrar el medicamento' 
        });
    }
};

// READ: Obtener todos los medicamentos del usuario
const getMedications = async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
        const [rows] = await pool.query('SELECT * FROM medicamentos WHERE usuario_id = ?', [usuarioId]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el botiquín' 
        });
    }
};

// UPDATE: Actualizar un medicamento
const updateMedication = async (req, res) => {
    const { id } = req.params;
    const { nombre, dosis, cantidad, fecha_caducidad } = req.body;
    const usuarioId = req.usuario.id;

    try {
        const [result] = await pool.query(
            'UPDATE medicamentos SET nombre = ?, dosis = ?, cantidad = ?, fecha_caducidad = ? WHERE id = ? AND usuario_id = ?',
            [nombre, dosis, cantidad, fecha_caducidad, id, usuarioId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Medicamento no encontrado o sin permisos' 
            });
        }
        res.status(200).json({ 
            mensaje: 'Medicamento actualizado' 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al actualizar el medicamento' 
        });
    }
};

// DELETE: Borrar un medicamento
const deleteMedication = async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    try {
        const [result] = await pool.query('DELETE FROM medicamentos WHERE id = ? AND usuario_id = ?', [id, usuarioId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Medicamento no encontrado o sin permisos' 
            });
        }
        res.status(200).json({ 
            mensaje: 'Medicamento eliminado del botiquín' 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al eliminar el medicamento' 
        });
    }
};

module.exports = { 
    addMedication, 
    getMedications, 
    updateMedication, 
    deleteMedication 
};