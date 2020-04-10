var localDatabase = window.localStorage;
var pageUser = "";
var loggedIn;

function _dce(t)
{
	return document.createElement(t);
}

function _dce2(t, contenido)
{
	tmp = document.createElement(t);
	tmp.appendChild(contenido);
	return tmp;
}

function _texto(str)
{
	return document.createTextNode(str);
}

function _loadPagPrincipal(listOfUsers)
{
    console.log(listOfUsers);
    const cols = document.getElementById('listOfCols');
    cols.innerHTML = "";

    $('#divMenuAdmin').hide('slow');
    $('#divIniciarSesion').hide('slow');
    $('#divAgregarPuesto').hide('slow');
    $('#divCrearunusuario').hide('slow');
    $('#divPagPrincipal').show('slow');
}

function _loadPrimerLoad()
{
    const cols = document.getElementById('listOfCols');
    cols.innerHTML = "";
    
    $('#divMenuAdmin').hide();
    $('#divIniciarSesion').hide();
    $('#divAgregarPuesto').hide();
    $('#divCrearunusuario').hide();
    $('#divPagPrincipal').show();
}

function _loadIniciarSesion()
{
    $('#divMenuAdmin').hide('slow');
    $('#divPagPrincipal').hide('slow');
    $('#divAgregarPuesto').hide('slow');
    $('#divCrearunusuario').hide('slow');
    $('#divIniciarSesion').show('slow');
}

function _loadMenuAdmin()
{
    $('#divPagPrincipal').hide('slow');
    $('#divAgregarPuesto').hide('slow');
    $('#divIniciarSesion').hide('slow');
    $('#divCrearunusuario').hide('slow');
    $('#divMenuAdmin').show('slow');
}

function _loadCrearUsuario()
{
    $('#divPagPrincipal').hide('slow');
    $('#divAgregarPuesto').hide('slow');
    $('#divIniciarSesion').hide('slow');
    $('#divMenuAdmin').hide('slow');
    $('#divCrearunusuario').show('slow');
}

function _login()
{
    username = document.getElementById('usuario').value;
    password = document.getElementById('contraseña').value;

    var listOfUsers = JSON.parse(localDatabase.getItem("listOfUsers"));

    for( i = 0 ; i < listOfUsers.length ; i++ )
    {
        const user = listOfUsers[i];
        console.log(user);

        if( user.username == username )
        {
            if( user.password == password )
            {
                pageUser = username;
                document.getElementById('pagetitle').innerHTML = ("BUSQUEDA DE PERSONAS " + username);
                loggedIn = true;
                _loadPagPrincipal(listOfUsers);
            }
            else
            {
                alert("Contraseña incorrecta.");
            }
        }
        else
        {
            alert("Usuario incorrecto.");
        }

        if( username == 'admin' && password == 'admin')
        {
            loggedIn = true;
            _loadMenuAdmin();
        }
        else
        {
            alert("Usuario o contraseña incorrecta.");
        }
    }
}

async function _crearUsuario()
{
    var user =
    {
        username: document.getElementById('usuarioCrear').value,
        email: document.getElementById('emailCrear').value,
        password: document.getElementById('contraseñaCrear').value
    }

    var listOfUsers = JSON.parse(localDatabase.getItem("listOfUsers"));
    var users = [];

    if( listOfUsers == null )
    {
        localDatabase.setItem('listOfUsers', 0);
        users.push(user);
        localDatabase.setItem('users', JSON.stringify(users));
        alert("Usuario creado exitosamente.");
        _loadPagPrincipal(listOfUsers);
    }

    else
    {
        users = JSON.parse(localDatabase.getItem("users"));
        users.push(user);
        localDatabase.setItem("users", JSON.stringify(users));
        listOfUsers = JSON.parse(localDatabase.getItem("listOfUsers"));
        localDatabase.setItem("listOfUsers", listOfUsers + 1);
        console.log(users);
        alert("Usuario creado exitosamente.");
        _loadPagPrincipal(listOfUsers);
    }
}

function _uploadPicture()
{
    if( loggedIn == true )
    {

    }
    else
    {
        alert("Necesita iniciar sesión para poder subir una imagen.");
    }
}

function _showJob()
{
    var listOfJobs = JSON.parse(localDatabase.getItem("listOfJobs"));

    var listOfCols = document.getElementById("listOfCols");

    for( i = 0; i < listOfJobs.length ; i++ )
    {
        const element = listOfJobs[i];
        console.log(element);

        var appColumn = document.createElement("div");
        appColumn.setAttribute("class", "col-10 col-sm-9 col-md-6 col-lg-5 col-xl-4");

        var appCard = document.createElement("div");
        appCard.setAttribute("class", "card mb-4 shadow-sm");

        var appCardBody = document.createElement("div");
        appCard.setAttribute("class", "card-body");

        var appCardTitle = document.createElement("h4");
        appCardTitle.setAttribute("class", "card-title");
        appCardTitle.innerText = element.jobTitulo;

        var pTag1 = document.createElement("p");
        pTag1.setAttribute("class", "p-0 m-0");
        pTag1.innerText = "Posición: " + element.jobPosicion;
        var pTag2 = document.createElement("p");
        pTag2.setAttribute("class", "p-0 m-0");
        pTag2.innerText = "Localidad: " + element.jobLocalizacion;
        var pTag3 = document.createElement("p");
        pTag3.setAttribute("class", "p-0 m-0");
        pTag3.innerText = "Categoria: " + element.jobCategoria;
        var pTag4 = document.createElement("p");
        pTag4.setAttribute("class", "p-0 m-0");
        pTag4.innerText = "Categoria: " + element.jobDescripcion;

        var buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", "d-flex justify-content-between align-items-center");

        var buttonGroup = document.createElement("div");
        buttonGroup.setAttribute("class", "btn-group");

        var cardButton1 = document.createElement("button");
        cardButton1.innerText = "";
        cardButton1.setAttribute("class", "btn btn-sm btn-outline-secondary");
        cardButton1.setAttribute("onclick", "editUser(" + i + ")");
        var cardButton2 = document.createElement("button");
        cardButton2.innerText = "";
        cardButton2.setAttribute("class", "btn btn-sm btn-outline-secondary");
        cardButton2.setAttribute("onclick", "deleteUser(" + i + ")");

        appCard.appendChild(appCardBody);
        appCardBody.appendChild(appCardTitle);
        appCardBody.appendChild(pTag1);
        appCardBody.appendChild(pTag2);
        appCardBody.appendChild(pTag3);
        appCardBody.appendChild(pTag4);
        appCardBody.appendChild(buttonContainer);
        buttonContainer.appendChild(buttonGroup);
        buttonGroup.appendChild(cardButton1);
        buttonGroup.appendChild(cardButton2);
        appColumn.appendChild(appCard);
        listOfCols.appendChild(appColumn);
    }
}