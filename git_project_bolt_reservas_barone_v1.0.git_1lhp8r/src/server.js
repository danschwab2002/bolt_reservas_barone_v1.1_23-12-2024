import express from 'express';
    import { supabase } from './supabaseClient';

    const app = express();
    app.use(express.json());

    // Endpoint para obtener todas las reservas
    app.get('/api/reservations', async (req, res) => {
      const { data, error } = await supabase.from('reservations').select();
      if (error) return res.status(500).json({ error: error.message });
      res.json(data);
    });

    // Endpoint para agregar una nueva reserva
    app.post('/api/reservations', async (req, res) => {
      const { table_id, name, date, time } = req.body;
      const { data, error } = await supabase.from('reservations').insert([{ table_id, name, date, time }]);
      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json(data);
    });

    // Endpoint para modificar una reserva existente
    app.put('/api/reservations/:id', async (req, res) => {
      const { id } = req.params;
      const { table_id, name, date, time } = req.body;
      const { data, error } = await supabase.from('reservations').update({ table_id, name, date, time }).eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      res.json(data);
    });

    // Endpoint para eliminar una reserva
    app.delete('/api/reservations/:id', async (req, res) => {
      const { id } = req.params;
      const { error } = await supabase.from('reservations').delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      res.status(204).send();
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
