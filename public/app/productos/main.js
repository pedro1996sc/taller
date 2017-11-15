$(document).ready(function() {
    hola();

    $('#saveButtonP').click(function(event) {
        var nombre = $('#nombre').val();
        var proveedor = $('#proveedor').val();
        var precio = $('#precio').val();
        var cantidad = $('#cantidad').val();
        $.post('/api/productos', { nombre: nombre, proveedor: proveedor, precio: precio, cantidad: cantidad }, function(data, textStatus, xhr) {
            hola();
            $('#modal-id').modal('hide');

        });
    });
    $('#saveButtonPu').click(function(event) {
        console.log('me hicieron click, como se cual es el id?????')
    });

});

function eliminar(element) {
    var id = $(element).parent().siblings().first().text();
    if (confirm("Desea Eliminar El Registro?")) {


        console.log(id)
        $.ajax({
                url: '/api/productos',
                type: 'DELETE',
                dataType: 'json',
                data: { id: id }
            })
            .done(function(productos) {
                hola();
            })
            .fail(function(err) {
                console.log(err);
            });
    } else {
        console.log("no acepto");
    }
};

function actualizar(element) {
    var id = $(element).parent().siblings().first().text();
    var nombre = $(element).parent().siblings().first().next().text();
    var proveedor = $(element).parent().siblings().first().next().next().text();
    var precio = $(element).parent().siblings().first().next().next().next().text();
    var cantidad = $(element).parent().siblings().first().next().next().next().next().text();
    $('#id1').val(id);
    $('#nombre1').val(nombre);
    $('#proveedor1').val(proveedor);
    $('#precio1').val(precio);
    $('#cantidad1').val(cantidad);
    

    console.log('holi')
    $('#modal_update').modal('show');
    // $.ajax({
    //         url: '/api/productos',
    //         type: 'PATCH',
    //         dataType: 'json',
    //         data: { id: id, nombre: nombre, proveedor: proveedor, precio: precio, cantidad: cantidad }
    //     })
    //     .done(function(productos) {

    //         $('#modal_update').modal('show');

    //         hola();


    //     })
    //     .fail(function(err) {
    //         console.log(err);
    //     });

};

function hola() {
    $.ajax({
            url: '/api/productos',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(productos) {
            if (productos) {
                var html = '';
                for (var i = 0; i < productos.length; i++) {
                    var usersObj = productos[i];
                    html += '<tr>';
                    html += '<td class="text-center">' + usersObj.id + '</td>';
                    html += '<td class="text-center">' + usersObj.nombre + '</td>';
                    html += '<td class="text-center">' + usersObj.proveedor + '</td>';
                    html += '<td class="text-center">' + usersObj.precio + '</td>';
                    html += '<td class="text-center">' + usersObj.cantidad + '</td>';
                    html += '<td class="text-center"><i  class="fa fa-pencil "  onclick ="actualizar(this)" style="color:blue;cursor: pointer;" aria-hidden="true"></i></td>';
                    html += '<td class="text-center"><i onclick="eliminar(this)" class="fa fa-window-close" style="color: red; cursor: pointer;" aria-hidden="true"></i></td>';
                    html += '</tr>';
                }
                $('#body-table').html(html);
            }
        })
        .fail(function(err) {
            console.log(err);
        });
};