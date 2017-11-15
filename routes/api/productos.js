module.exports = [{
        method: 'GET',
        path: '/api/productos',
        handler: function(request, reply) {
            var sql = "SELECT * FROM productos";
            request.pg.client.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                    return reply([]);
                }
                return reply(result.rows);
            })
        }
    },
    {
        method: 'POST',
        path: '/api/productos',
        handler: function(request, reply) {
            var nombre = request.payload.nombre;
            var proveedor = request.payload.proveedor;
            var precio = request.payload.precio;
            var cantidad = request.payload.cantidad;


            var sql = "INSERT INTO productos (nombre, proveedor, precio, cantidad) VALUES ('" + nombre + "', '" + proveedor + "','" + precio + "', '" + cantidad + "') RETURNING *";
            request.pg.client.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                    return reply([]);
                }
                return reply(result.rows);

            })
        }
    },
    {
        method: 'DELETE',
        path: '/api/productos',
        handler: function(request, reply) {
            var id = request.payload.id;


            var sql = " DELETE FROM productos WHERE id=" + id;
            request.pg.client.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                    return reply([]);
                }
                return reply(result.rows);

            })
        }
    },
    {
        method: 'PATCH',
        path: '/api/productos',
        handler: function(request, reply) {
            var id = request.payload.id;
            var nombre = request.payload.nombre;
            var proveedor = request.payload.proveedor;
            var precio = request.payload.precio;
            var cantidad = request.payload.cantidad;

            var sql = "UPDATE productos SET nombre=" + nombre + ", proveedor=" + proveedor + ", precio=" + precio + ", cantidad=" + cantidad + ", WHERE id =" + id;
            request.pg.client.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                    return reply([]);
                }
                return reply(result.rows);

            })
        }
    }
];