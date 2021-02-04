# OCMSoliServer

Los pasos a seguir para ejecutar todo localmente es ejecutar en la raiz del proyecto el siguiente comando:

Localmente ejecutamos npm install para tener las dependencias localmente [package.json](package.json).

    npm install
    cd server && npm install

Luego para ejecutar todo usando docker, ejecutamos el siguiente comando desde la raiz del proyecto:

    docker-compose -f docker-compose.yml up --build

Para actualizar el proyecto en produccion ejecutamos el siguiente comando:
entramos a la consola del VPS y luego entramos en la carpeta home/mam

    cd /home/mam/OCMsolicitudes

Luego ya posicionado en la carpeta ejecutamos el siguiente comando

    git pull

Luego nos pide nuestro usuario y contraseña de github

Esperamos a que se actualice el repositorio local. Luego ejecutamos el comando docker para
actualizar el proyecto en produccion.

    docker-compose -f docker-compose.yml up --build -d



    BrowserSync
    http://localhost:3001/

    [Browsersync] Proxying: http://localhost:9060
