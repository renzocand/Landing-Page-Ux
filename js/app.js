
const form = document.getElementById('form');
const porcentaje = document.querySelector('.porcentaje');
const level = document.querySelector('.level');
const check = document.querySelector('#check');
const name = document.querySelector('#name');
const correo = document.querySelector('#email');
const expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;


$('#myModal').on('shown.bs.modal', function () {

    var modalContentWidthHeight = function () {

        var modalContentHeight = $('#myModal').find('#alto').outerHeight(true);
        let enpix = modalContentHeight + 'px';
        console.log('la altura es ' + enpix);
        porcentaje.style.height = enpix;
    };

    $(window).resize(modalContentWidthHeight);

    modalContentWidthHeight()

});

form.addEventListener('blur', (e) => {
    if (e.target.nodeName === 'INPUT') {
        validacion();
    }
}, true)


let validacion = () => {
    let nameV = name.value;
    let correoV = correo.value;

    if (nameV.length >= 2) {
        level.classList.add("treinta")
        if (expresion.test(correoV)) {
            level.classList.add("setenta")
            if (check.checked == true) {
                level.classList.add("cien")
                return true;
            } else {
                level.classList.remove("cien")
                return false;
            }
        } else {
            level.classList.remove("setenta")
            level.classList.remove("cien")
            return false;
        }
    } else {
        level.classList.remove("treinta")
        level.classList.remove("setenta")
        level.classList.remove("cien")
        return false;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validacion()) {

        let body = {
            nombre: name.value,
            correo: email.value
        }

        let init = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let URI = 'https://landing-page-uxsimple.herokuapp.com/api/usuarios'

        fetch(URI, init)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', response)
                alert('bien hecho')
                location.href ="./destino.html";
            });



    } else {
        console.log('NO ENTRO');
    }

})

