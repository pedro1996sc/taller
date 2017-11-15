module.exports = [{
    method: 'GET',
    path: '/productos',
    handler: function(request, reply) {
        return reply.view('app/productos');
    }
}]